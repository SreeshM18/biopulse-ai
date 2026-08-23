import { 
  UniversalSubstanceRecord, 
  ForensicToxRecord, 
  CounterfeitIntelligenceRecord,
  NovaSubstanceLegalStatus,
  PharmaDosageForm,
  ReleaseKineticsType,
  SpecificInjectionRoute
} from '../types/biotech';
import { 
  UNIVERSAL_SUBSTANCES_DATABASE, 
  NOVA_FORENSIC_TOX_DATABASE, 
  COUNTERFEIT_INTELLIGENCE_REGISTRY 
} from '../data/novaUniversalPharmaDatabase';

/* =========================================================================
   1. SEARCH RESULT SCHEMAS & ROUTER INTERFACES
   ========================================================================= */

export type UniversalSearchResultType = 
  | 'VERIFIED_SUBSTANCE' 
  | 'FORENSIC_TOX_SUBSTANCE' 
  | 'COUNTERFEIT_ALERT' 
  | 'SYMPTOM_DISEASE_CATEGORY' 
  | 'INJECTION_ROUTE_GROUP';

export interface UniversalSearchResultItem {
  id: string;
  resultType: UniversalSearchResultType;
  title: string;
  subtitle: string;
  badgeLabel: string;
  badgeColor: 'emerald' | 'blue' | 'yellow' | 'orange' | 'red' | 'purple' | 'cyan' | 'slate' | 'pink';
  verifiedRecord?: UniversalSubstanceRecord;
  forensicRecord?: ForensicToxRecord;
  counterfeitRecord?: CounterfeitIntelligenceRecord;
  matchedStrengthsDisplay?: string;
  matchedRoutes?: string[];
  clinicalHighlight?: string;
  safetyAlertSnippet?: string;
}

export interface UniversalSearchResponse {
  query: string;
  correctedQuery?: string;
  intentCategory: 'DIRECT_MEDICINE' | 'PREFIX_SUGGESTION' | 'TYPO_CORRECTED' | 'SYMPTOM_PROBLEM' | 'INJECTION_FILTER' | 'FORENSIC_TOXICOLOGY' | 'COUNTERFEIT_CHECK';
  resultsCount: number;
  items: UniversalSearchResultItem[];
  suggestedCategories?: string[];
  regulatoryDisclaimer: string;
}

/* =========================================================================
   2. LEVENSHTEIN DISTANCE & FUZZY TYPO TOLERANCE UTILITY
   ========================================================================= */

export function calculateLevenshteinDistance(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: bn + 1 }, (_, i) => [i]);
  for (let j = 0; j <= an; j++) matrix[0][j] = j;

  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1) // insertion / deletion
        );
      }
    }
  }
  return matrix[bn][an];
}

/* =========================================================================
   3. UNIVERSAL SEARCH ENGINE CORE (PREFIX, TYPO, SYMPTOM & FORENSIC ROUTER)
   ========================================================================= */

export class UniversalPharmaSearchEngine {
  
  public search(rawQuery: string): UniversalSearchResponse {
    const query = rawQuery.trim().toLowerCase();

    if (!query) {
      // Default initial view: Return prominent verified substances
      return {
        query: '',
        intentCategory: 'DIRECT_MEDICINE',
        resultsCount: UNIVERSAL_SUBSTANCES_DATABASE.length,
        items: UNIVERSAL_SUBSTANCES_DATABASE.map(sub => this.mapSubstanceToResult(sub)),
        regulatoryDisclaimer: 'Verified pharmaceutical products catalog. Review indications and contraindications with a licensed clinician.'
      };
    }

    // 1. Check for FORENSIC / ILLICIT Keywords
    const forensicKeywords = ['illegal', 'illicit', 'stimulant', 'fetty', 'fentanyl street', 'crystal meth', 'meth', 'ice', 'molly', 'ecstasy', 'mdma', 'heroin', 'overdose', 'naloxone', 'tox'];
    const isForensicQuery = forensicKeywords.some(kw => query.includes(kw));

    if (isForensicQuery) {
      const forensicHits = NOVA_FORENSIC_TOX_DATABASE.filter(f => 
        f.substanceName.toLowerCase().includes(query) ||
        f.streetAliases.some(alias => alias.toLowerCase().includes(query)) ||
        f.substanceCategory.toLowerCase().includes(query)
      );

      const items = (forensicHits.length > 0 ? forensicHits : NOVA_FORENSIC_TOX_DATABASE).map(f => this.mapForensicToResult(f));

      return {
        query: rawQuery,
        intentCategory: 'FORENSIC_TOXICOLOGY',
        resultsCount: items.length,
        items,
        regulatoryDisclaimer: '⚠️ NOVA TOX / FORENSIC DATABASE: Contains emergency toxicology profiles, forensic markers, and reversal protocols. Strictly does not provide synthesis or recreational dosing instructions.'
      };
    }

    // 2. Check for INJECTION / INFUSION Filter Keywords
    if (query === 'injection' || query === 'injections' || query.startsWith('inj') || query.includes('iv drip') || query.includes('infusion')) {
      const injectionHits = UNIVERSAL_SUBSTANCES_DATABASE.filter(sub => 
        sub.dosageForm === 'Injections' || 
        sub.dosageForm === 'Auto-injectors' || 
        sub.dosageForm === 'Prefilled syringes' ||
        sub.primaryRoute.includes('Intravenous') ||
        sub.primaryRoute.includes('Intramuscular') ||
        sub.primaryRoute.includes('Subcutaneous')
      );

      return {
        query: rawQuery,
        intentCategory: 'INJECTION_FILTER',
        resultsCount: injectionHits.length,
        items: injectionHits.map(sub => this.mapSubstanceToResult(sub)),
        suggestedCategories: ['Intravenous (IV)', 'Intramuscular (IM)', 'Subcutaneous (SC)', 'Emergency Auto-Injectors', 'Hospital-Only Antibiotics'],
        regulatoryDisclaimer: 'Parenteral medicines hub: Route specificity (IV vs IM vs SC), concentration, and dilution requirements are critical to prevent fatal medication errors.'
      };
    }

    // 3. Check for SYMPTOM / DISEASE Problem Keywords
    const symptomMap: Record<string, { term: string; categories: string[]; relatedIds: string[] }> = {
      'fever': { term: 'Fever / Pyrexia', categories: ['Antipyretics', 'Analgesics'], relatedIds: ['sub-paracetamol'] },
      'pain': { term: 'Acute & Chronic Pain', categories: ['Analgesics', 'NSAIDs', 'Opioid Analgesics'], relatedIds: ['sub-paracetamol', 'sub-fentanyl-transdermal'] },
      'blood pressure': { term: 'Hypertension', categories: ['Calcium Channel Blockers', 'ACE Inhibitors'], relatedIds: ['sub-amlodipine'] },
      'bp': { term: 'Hypertension', categories: ['Calcium Channel Blockers', 'ACE Inhibitors'], relatedIds: ['sub-amlodipine'] },
      'asthma': { term: 'Asthma & Bronchospasm', categories: ['SABA Bronchodilators', 'Inhaled Corticosteroids'], relatedIds: ['sub-salbutamol-master'] },
      'wheezing': { term: 'Asthma & Wheezing', categories: ['SABA Bronchodilators'], relatedIds: ['sub-salbutamol-master'] },
      'ed': { term: 'Erectile Dysfunction', categories: ['PDE5 Inhibitors'], relatedIds: ['sub-sildenafil'] },
      'diabetes': { term: 'Type 2 Diabetes Mellitus', categories: ['GLP-1 Receptor Agonists', 'Oral Antidiabetics'], relatedIds: ['sub-semaglutide-master'] },
      'sepsis': { term: 'Severe Sepsis & Bacterial Infection', categories: ['Hospital Carbapenems', 'Broad-Spectrum Antibiotics'], relatedIds: ['sub-meropenem'] },
      'anaphylaxis': { term: 'Severe Allergic Anaphylaxis', categories: ['Emergency Resuscitation', 'Alpha/Beta Agonists'], relatedIds: ['sub-epinephrine'] }
    };

    for (const [key, mapping] of Object.entries(symptomMap)) {
      if (query.includes(key)) {
        const matchingSubs = UNIVERSAL_SUBSTANCES_DATABASE.filter(sub => mapping.relatedIds.includes(sub.id));
        return {
          query: rawQuery,
          intentCategory: 'SYMPTOM_PROBLEM',
          resultsCount: matchingSubs.length,
          items: matchingSubs.map(sub => this.mapSubstanceToResult(sub)),
          suggestedCategories: mapping.categories,
          regulatoryDisclaimer: `Showing verified medicines for ${mapping.term}. Consult a healthcare practitioner before taking any pharmacological treatment.`
        };
      }
    }

    // 4. Exact, Prefix, and Fuzzy Match on Generic & Brand Names
    let exactOrPrefixHits: UniversalSubstanceRecord[] = [];
    let typoCorrectedHits: { sub: UniversalSubstanceRecord; distance: number; matchedWord: string }[] = [];

    UNIVERSAL_SUBSTANCES_DATABASE.forEach(sub => {
      const allNames = [sub.genericName, ...sub.brandNames, ...sub.aliases, ...sub.activeIngredients].map(n => n.toLowerCase());

      // Exact or Prefix Match (e.g. "sil..." -> Sildenafil)
      const hasPrefixMatch = allNames.some(name => name.startsWith(query) || name.includes(query));
      if (hasPrefixMatch) {
        exactOrPrefixHits.push(sub);
        return;
      }

      // Fuzzy Typo Distance (e.g. "paracetmol" -> Paracetamol, distance = 1)
      allNames.forEach(name => {
        const words = name.split(/[\s,()/-]+/);
        words.forEach(w => {
          if (w.length >= 4 && query.length >= 4) {
            const dist = calculateLevenshteinDistance(query, w);
            if (dist <= 2) {
              typoCorrectedHits.push({ sub, distance: dist, matchedWord: sub.genericName });
            }
          }
        });
      });
    });

    if (exactOrPrefixHits.length > 0) {
      return {
        query: rawQuery,
        intentCategory: 'PREFIX_SUGGESTION',
        resultsCount: exactOrPrefixHits.length,
        items: exactOrPrefixHits.map(sub => this.mapSubstanceToResult(sub)),
        regulatoryDisclaimer: 'Verified product records with approved commercial strengths and formulation subtypes.'
      };
    }

    if (typoCorrectedHits.length > 0) {
      typoCorrectedHits.sort((a, b) => a.distance - b.distance);
      const uniqueSubs = Array.from(new Set(typoCorrectedHits.map(h => h.sub)));
      const topMatch = typoCorrectedHits[0].matchedWord;

      return {
        query: rawQuery,
        correctedQuery: topMatch,
        intentCategory: 'TYPO_CORRECTED',
        resultsCount: uniqueSubs.length,
        items: uniqueSubs.map(sub => this.mapSubstanceToResult(sub)),
        regulatoryDisclaimer: `Did you mean "${topMatch}"? Showing verified pharmacological monographs.`
      };
    }

    // 5. Fallback: Search in Counterfeit Registry
    const counterfeitHits = COUNTERFEIT_INTELLIGENCE_REGISTRY.filter(c => 
      c.suspectedBrandName.toLowerCase().includes(query) ||
      c.claimedIngredientOnBox.toLowerCase().includes(query) ||
      c.actualLabDetectedContent.toLowerCase().includes(query)
    );

    if (counterfeitHits.length > 0) {
      return {
        query: rawQuery,
        intentCategory: 'COUNTERFEIT_CHECK',
        resultsCount: counterfeitHits.length,
        items: counterfeitHits.map(c => this.mapCounterfeitToResult(c)),
        regulatoryDisclaimer: '🚨 COUNTERFEIT / DARK PHARMACY WARNING: Active regulatory alerts for falsified lots or contaminated batches.'
      };
    }

    // No matches
    return {
      query: rawQuery,
      intentCategory: 'DIRECT_MEDICINE',
      resultsCount: 0,
      items: [],
      regulatoryDisclaimer: 'No verified substance records matched your query. Please check spelling or search by symptom/therapeutic category.'
    };
  }

  /* =========================================================================
     MAPPING HELPERS
     ========================================================================= */

  private mapSubstanceToResult(sub: UniversalSubstanceRecord): UniversalSearchResultItem {
    const badgeColorMap: Record<NovaSubstanceLegalStatus, UniversalSearchResultItem['badgeColor']> = {
      'OTC': 'emerald',
      'Prescription': 'blue',
      'Pharmacist-only': 'yellow',
      'High-alert': 'orange',
      'Controlled': 'red',
      'Hospital-only': 'purple',
      'Biologic': 'cyan',
      'Investigational': 'pink',
      'Illicit': 'slate',
      'Banned / Withdrawn': 'red',
      'Counterfeit / Falsified': 'orange',
      'Toxic Chemical': 'red'
    };

    return {
      id: sub.id,
      resultType: 'VERIFIED_SUBSTANCE',
      title: sub.genericName,
      subtitle: `${sub.dosageForm} (${sub.dosageSubtype || sub.releaseType}) • Brands: ${sub.brandNames.slice(0, 3).join(', ')}`,
      badgeLabel: sub.primaryLegalStatus,
      badgeColor: badgeColorMap[sub.primaryLegalStatus] || 'blue',
      verifiedRecord: sub,
      matchedStrengthsDisplay: sub.concentrationDisplay || `${sub.strengthValue} ${sub.strengthUnit}`,
      matchedRoutes: sub.allAvailableRoutes,
      clinicalHighlight: sub.approvedUses[0],
      safetyAlertSnippet: sub.seriousAdverseEffects[0]
    };
  }

  private mapForensicToResult(f: ForensicToxRecord): UniversalSearchResultItem {
    return {
      id: f.id,
      resultType: 'FORENSIC_TOX_SUBSTANCE',
      title: f.substanceName,
      subtitle: `Street Aliases: ${f.streetAliases.join(', ')} • Class: ${f.chemicalClass}`,
      badgeLabel: f.legalClassification,
      badgeColor: 'slate',
      forensicRecord: f,
      clinicalHighlight: `Toxicity: ${f.toxicityProfile}`,
      safetyAlertSnippet: f.reversalAntidoteProtocol
    };
  }

  private mapCounterfeitToResult(c: CounterfeitIntelligenceRecord): UniversalSearchResultItem {
    return {
      id: c.id,
      resultType: 'COUNTERFEIT_ALERT',
      title: `⚠️ COUNTERFEIT: ${c.suspectedBrandName}`,
      subtitle: `Type: ${c.falsifiedProductType} • Detected: ${c.actualLabDetectedContent}`,
      badgeLabel: 'Counterfeit / Falsified',
      badgeColor: 'orange',
      counterfeitRecord: c,
      clinicalHighlight: c.clinicalHazardDescription,
      safetyAlertSnippet: c.regulatoryAgencyAlert
    };
  }
}

export const universalPharmaEngine = new UniversalPharmaSearchEngine();
