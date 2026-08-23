import { MasterDrugRecord } from '../types/biotech';
import { MASTER_DRUG_DATABASE, POISONING_ANTIDOTE_REGISTRY } from '../data/novaPharmaUniverseData';

/* =========================================================================
   1. SEARCH SYNONYM & NATURAL LANGUAGE INTENT DICTIONARY
   ========================================================================= */

export interface SymptomDiseaseKnowledge {
  id: string;
  name: string;
  aliases: string[];
  category: 'Symptom' | 'Disease' | 'Condition';
  bodySystem: string;
  description: string;
  commonTreatmentCategories: string[];
  recommendedDosageForms: string[];
  clinicalSafetyGuidance: string;
  redFlagsEmergency: string[];
  relatedDrugIds: string[];
  antibioticMisuseWarning?: string;
}

export const SYMPTOM_DISEASE_KNOWLEDGE_BASE: SymptomDiseaseKnowledge[] = [
  {
    id: 'cond-fever',
    name: 'Fever (Pyrexia)',
    aliases: ['fever', 'pyrexia', 'high temperature', 'feverish', 'febrile', 'chills', 'elevated temp', 'fevr', 'fevere'],
    category: 'Symptom',
    bodySystem: 'Systemic / Thermoregulatory',
    description: 'Elevated core body temperature above normal baseline (typically >38.0°C or >100.4°F), commonly in response to viral or bacterial infection, inflammatory disease, or tissue injury.',
    commonTreatmentCategories: ['Antipyretics', 'Simple Analgesics', 'Hydration Therapies'],
    recommendedDosageForms: ['Tablets', 'Syrups', 'Suspensions', 'Oral solutions', 'Drops', 'Suppositories', 'Injections'],
    clinicalSafetyGuidance: 'Treatment aims at patient comfort and preventing dehydration rather than completely suppressing mild fever. Consult a healthcare provider if fever exceeds 39.5°C (103°F) or lasts >3 days.',
    redFlagsEmergency: [
      'Stiff neck with severe headache and photophobia (Meningismus)',
      'Petechial or purpuric non-blanching rash',
      'Altered mental status, confusion, or lethargy',
      'Infant under 3 months with temperature ≥ 38.0°C (100.4°F)',
      'Severe respiratory distress or cyanosis'
    ],
    relatedDrugIds: ['drug-atorvastatin']
  },
  {
    id: 'cond-common-cold',
    name: 'Common Cold (Acute Upper Respiratory Infection)',
    aliases: ['cold', 'common cold', 'rhinitis', 'runny nose', 'nasal congestion', 'coryza', 'sneezing', 'head cold'],
    category: 'Condition',
    bodySystem: 'Respiratory & ENT',
    description: 'Self-limiting viral infection of the upper respiratory tract primarily caused by rhinoviruses, coronaviruses, and adenoviruses.',
    commonTreatmentCategories: ['Pain/Fever Relief (Analgesics)', 'Saline Nasal Preparations', 'Antihistamines (where appropriate)', 'Decongestants (short-term)', 'Cough Preparations / Lozenges'],
    recommendedDosageForms: ['Tablets', 'Capsules', 'Syrups', 'Nasal sprays', 'Lozenges', 'Drops', 'Oral dissolving films'],
    clinicalSafetyGuidance: 'Supportive hydration, rest, and targeted symptomatic relief. Avoid OTC multi-symptom cold medications in young children under 6 years without pediatric guidance.',
    antibioticMisuseWarning: '⚠️ CLINICAL SAFETY NOTICE: Antibiotics generally ARE NOT used for an uncomplicated viral common cold because antibiotics do not kill viruses. Use only if a clinician identifies secondary bacterial complications (e.g. bacterial sinusitis, otitis media, or pneumonia).',
    redFlagsEmergency: [
      'Shortness of breath, wheezing, or stridor',
      'High persistent fever > 38.5°C beyond 4 days',
      'Severe sore throat with inability to swallow saliva',
      'Chest pain or hemoptysis (coughing blood)'
    ],
    relatedDrugIds: []
  },
  {
    id: 'cond-headache',
    name: 'Headache & Cephalea',
    aliases: ['headache', 'head ache', 'head pain', 'cephalea', 'migraine', 'tension headache', 'throbbing head', 'headake'],
    category: 'Symptom',
    bodySystem: 'Neurological',
    description: 'Pain or discomfort in the head, scalp, or neck arising from pain-sensitive cranial structures, ranging from primary headaches (tension, migraine) to secondary etiologies.',
    commonTreatmentCategories: ['Simple Analgesics (Paracetamol)', 'NSAID-type Medicines (Ibuprofen, Naproxen)', 'Migraine-Specific Triptans (5-HT1B/1D agonists for diagnosed migraine)', 'CGRP Receptor Antagonists'],
    recommendedDosageForms: ['Tablets', 'Capsules', 'Oral dissolving films', 'Nasal sprays', 'Injections'],
    clinicalSafetyGuidance: 'Overuse of acute headache medications (>10-15 days/month) can cause Medication-Overuse Headache (rebound cephalea). Seek neurological evaluation for frequent or changing patterns.',
    redFlagsEmergency: [
      'Sudden "Thunderclap" headache reaching maximal intensity within seconds (Subarachnoid Hemorrhage)',
      'Headache accompanied by focal neurological deficit, unilateral weakness, or speech impairment',
      'Headache with high fever, neck stiffness, and rash',
      'New-onset headache in patients >50 years or with cancer/HIV',
      'Headache following recent significant head trauma'
    ],
    relatedDrugIds: []
  },
  {
    id: 'cond-dysmenorrhea',
    name: 'Dysmenorrhea (Menstrual Pain & Period Cramps)',
    aliases: ['period pain', 'menstrual pain', 'period cramps', 'menstrual cramps', 'dysmenorrhea', 'painful periods', 'cramping period', 'cramps'],
    category: 'Condition',
    bodySystem: 'Gynecological / Reproductive',
    description: 'Painful menstrual cramps originating from uterine prostaglandin-induced myometrial contractions and ischemia during menstruation.',
    commonTreatmentCategories: ['NSAID-type Medicines (COX-1/COX-2 Inhibitors)', 'Simple Analgesics', 'Hormonal Contraceptives (Combined Oral / Progestin-only)', 'Antispasmodics'],
    recommendedDosageForms: ['Tablets', 'Capsules', 'Transdermal patches', 'Vaginal rings', 'Implants'],
    clinicalSafetyGuidance: 'Initiate NSAID therapy at the onset of bleeding or cramping for optimal inhibition of endometrial prostaglandin synthesis. Maintain adequate hydration and heat therapy.',
    redFlagsEmergency: [
      'Sudden acute unilateral lower quadrant pelvic pain (rule out ovarian torsion or ectopic pregnancy)',
      'Severe pelvic pain accompanied by high fever and purulent vaginal discharge (Pelvic Inflammatory Disease)',
      'Excessive vaginal hemorrhage soaking >2 pads per hour for consecutive hours',
      'Dizziness, orthostasis, or syncope'
    ],
    relatedDrugIds: ['drug-clomiphene-fertility']
  },
  {
    id: 'cond-erectile-dysfunction',
    name: 'Erectile Dysfunction (ED)',
    aliases: ['viagra', 'sildenafil', 'tadalafil', 'cialis', 'erectile dysfunction', 'ed', 'impotence', 'pde5 inhibitor', 'pde-5'],
    category: 'Condition',
    bodySystem: 'Urological / Men’s Sexual Health',
    description: 'Consistent or recurrent inability to attain and/or maintain a penile erection sufficient for satisfactory sexual performance.',
    commonTreatmentCategories: ['Phosphodiesterase-5 (PDE-5) Inhibitors (Sildenafil, Tadalafil, Vardenafil, Avanafil)', 'Vacuum Erection Devices', 'Intracavernosal Injections (Alprostadil)'],
    recommendedDosageForms: ['Tablets', 'Oral dissolving films', 'Injections', 'Gels'],
    clinicalSafetyGuidance: 'Requires physician prescription and comprehensive cardiovascular assessment. PDE-5 inhibitors are medical prescription drugs that enhance nitric oxide-mediated cyclic GMP vascular relaxation.',
    redFlagsEmergency: [
      '⚠️ ABSOLUTE CONTRAINDICATION: NEVER take with Nitrates (Nitroglycerin, Isosorbide) or soluble guanylate cyclase stimulators - triggers catastrophic, potentially fatal hypotension.',
      'Priapism: Prolonged painful erection lasting >4 hours requires emergency urological intervention to prevent permanent penile tissue necrosis.',
      'Sudden loss of vision (Non-Arteritic Anterior Ischemic Optic Neuropathy NAION) or sudden hearing loss.'
    ],
    relatedDrugIds: []
  },
  {
    id: 'cond-asthma',
    name: 'Asthma & Bronchospasm',
    aliases: ['asthma', 'bronchospasm', 'wheezing', 'shortness of breath', 'inhaler', 'inhalers', 'chest tightness asthma', 'asthmatic'],
    category: 'Disease',
    bodySystem: 'Respiratory',
    description: 'Chronic inflammatory airway disorder characterized by recurrent episodes of wheezing, breathlessness, chest tightness, and reversible airflow limitation.',
    commonTreatmentCategories: [
      'Short-Acting Beta2-Agonists (SABA - Reliever)',
      'Inhaled Corticosteroids (ICS - Controller)',
      'Long-Acting Beta2-Agonists (LABA in combination)',
      'Long-Acting Muscarinic Antagonists (LAMA)',
      'Leukotriene Receptor Antagonists',
      'Biologic Therapies (Anti-IL5, Anti-IL4/IL13, Anti-IgE mAbs)'
    ],
    recommendedDosageForms: ['Inhalers', 'Inhaler / MDI', 'Nebulizer solutions', 'Tablets', 'Injections', 'Biologic medicines'],
    clinicalSafetyGuidance: 'Ensure proper inhaler spacer technique. Overreliance on SABA relievers (>2 canisters/year) indicates uncontrolled inflammation requiring stepped-up daily ICS controller.',
    redFlagsEmergency: [
      'Silent Chest (absence of wheezing due to near-total airway occlusion) with severe dyspnea',
      'Cyanosis (blue lips/fingers) and inability to speak full sentences',
      'Paradoxical thoracoabdominal breathing with drowsiness / exhaustion',
      'Peak Expiratory Flow (PEF) < 50% of personal best with no response to bronchodilators'
    ],
    relatedDrugIds: []
  },
  {
    id: 'cond-diabetes',
    name: 'Diabetes Mellitus (Type 1 & Type 2)',
    aliases: ['diabetes', 'sugar', 'blood sugar', 'high sugar', 'type 2 diabetes', 't2d', 't1d', 'hyperglycemia', 'diabetic', 'insulin'],
    category: 'Disease',
    bodySystem: 'Endocrine & Metabolic',
    description: 'Metabolic disorder characterized by chronic hyperglycemia resulting from defects in insulin secretion, insulin action, or both, leading to microvascular and macrovascular complications.',
    commonTreatmentCategories: [
      'Insulin Therapies (⚠️ High-Alert Medicine)',
      'Biguanides (Metformin)',
      'GLP-1 Receptor Agonists (Semaglutide, Dulaglutide)',
      'SGLT2 Inhibitors (Empagliflozin, Dapagliflozin)',
      'DPP-4 Inhibitors (Sitagliptin)',
      'Sulfonylureas (Glipizide)'
    ],
    recommendedDosageForms: ['Tablets', 'Auto-injectors', 'Prefilled syringes', 'Infusion pumps/cartridges', 'Injections'],
    clinicalSafetyGuidance: 'Regular self-monitoring of blood glucose and periodic HbA1c testing (target typically <7.0%). Maintain strict foot care, renal panel monitoring, and annual retinal exams.',
    redFlagsEmergency: [
      'Severe Hypoglycemia (Blood glucose < 54 mg/dL with confusion, diaphoresis, seizure) - Treat with oral fast-acting glucose or emergency Glucagon.',
      'Diabetic Ketoacidosis (DKA): Kussmaul breathing, fruity acetone breath, vomiting, altered consciousness.',
      'Hyperosmolar Hyperglycemic State (HHS): Severe dehydration, glucose > 600 mg/dL, profound lethargy.'
    ],
    relatedDrugIds: ['drug-semaglutide-glp1']
  },
  {
    id: 'cond-hypertension',
    name: 'Hypertension (High Blood Pressure)',
    aliases: ['hypertension', 'high bp', 'blood pressure', 'high blood pressure', 'bp', 'htn', 'cardiac pressure'],
    category: 'Disease',
    bodySystem: 'Cardiovascular',
    description: 'Persistent elevation of systemic arterial blood pressure (Systolic ≥ 130 mmHg or Diastolic ≥ 80 mmHg per clinical guidelines), a primary driver of stroke, MI, heart failure, and CKD.',
    commonTreatmentCategories: [
      'ACE Inhibitors (Lisinopril, Enalapril)',
      'Angiotensin II Receptor Blockers (ARBs - Losartan, Valsartan)',
      'Calcium-Channel Blockers (CCBs - Amlodipine)',
      'Thiazide & Loop Diuretics',
      'Beta Blockers (Metoprolol, Bisoprolol)'
    ],
    recommendedDosageForms: ['Tablets', 'Capsules', 'Oral solutions', 'Injections (Hospital-only hypertensive emergencies)'],
    clinicalSafetyGuidance: 'Lifestyle modifications (DASH diet, sodium restriction <2g/day, exercise) combined with pharmacotherapy. Avoid abrupt discontinuation of antihypertensives to prevent rebound hypertension.',
    redFlagsEmergency: [
      'Hypertensive Emergency (BP > 180/120 mmHg WITH acute target organ damage: severe chest pain, shortness of breath, acute visual loss, or encephalopathy) - Requires immediate emergency ICU IV titration.',
      'Acute severe headache with nausea, vomiting, and visual papilledema.'
    ],
    relatedDrugIds: ['drug-lisinopril', 'drug-atorvastatin']
  }
];

/* =========================================================================
   2. COMMON MISSPELLINGS & PHONETIC TYPO CORRECTIONS
   ========================================================================= */

export const COMMON_TYPO_CORRECTIONS: Record<string, string> = {
  // Paracetamol / Acetaminophen
  paracetmol: 'paracetamol',
  paracitamol: 'paracetamol',
  paracetamole: 'paracetamol',
  paracetemol: 'paracetamol',
  paracetmol650: 'paracetamol',
  paracitmol: 'paracetamol',
  acetaminofen: 'acetaminophen',
  acetaminophene: 'acetaminophen',
  parcetamol: 'paracetamol',
  dolo: 'paracetamol',
  dolo650: 'paracetamol',
  tylenol: 'acetaminophen',
  panadol: 'paracetamol',
  crocin: 'paracetamol',

  // Sildenafil / Viagra
  sildinafil: 'sildenafil',
  sildenifil: 'sildenafil',
  sildenafill: 'sildenafil',
  sildnafil: 'sildenafil',
  viagera: 'viagra',
  viagrah: 'viagra',
  viagraa: 'viagra',
  cialis: 'tadalafil',
  tadalafill: 'tadalafil',
  tadalifil: 'tadalafil',

  // Antibiotics
  amoxcillin: 'amoxicillin',
  amoxillin: 'amoxicillin',
  amoxycillin: 'amoxicillin',
  amoxicilin: 'amoxicillin',
  augmentin: 'amoxicillin-clavulanate',
  azithromicin: 'azithromycin',
  azithromycan: 'azithromycin',
  azithromycine: 'azithromycin',
  azithro: 'azithromycin',
  vancomicin: 'vancomycin',
  vancamycine: 'vancomycin',
  doxycyclin: 'doxycycline',
  doxycicline: 'doxycycline',
  ciprofloxin: 'ciprofloxacin',
  ciprofloxacine: 'ciprofloxacin',

  // Cardiovascular & Statins
  atorvastin: 'atorvastatin',
  atorvastatincalcium: 'atorvastatin',
  atorva: 'atorvastatin',
  lipiter: 'atorvastatin',
  lipitor: 'atorvastatin',
  lisinoprill: 'lisinopril',
  lisonopril: 'lisinopril',
  lisnopril: 'lisinopril',
  metoprololsuccinate: 'metoprolol',
  metaprolol: 'metoprolol',
  amlodipin: 'amlodipine',
  amlodepine: 'amlodipine',

  // Diabetes & GLP-1
  ozempic: 'semaglutide',
  ozempik: 'semaglutide',
  ozampic: 'semaglutide',
  semaglutid: 'semaglutide',
  semaglutied: 'semaglutide',
  wegovy: 'semaglutide',
  rybelsus: 'semaglutide',
  metformin: 'metformin',
  metformine: 'metformin',
  metformn: 'metformin',
  insuline: 'insulin',

  // Symptoms & Conditions
  fevr: 'fever',
  feaver: 'fever',
  fevere: 'fever',
  hedache: 'headache',
  headake: 'headache',
  headpain: 'headache',
  diabtes: 'diabetes',
  diabetis: 'diabetes',
  hipertension: 'hypertension',
  hypertention: 'hypertension',
  asthm: 'asthma',
  asmath: 'asthma',
  periodpain: 'dysmenorrhea',
  cramps: 'dysmenorrhea'
};

/* =========================================================================
   3. LEVENSHTEIN DISTANCE & FUZZY MATCHING UTILITIES
   ========================================================================= */

export function calculateLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function isFuzzyMatch(query: string, target: string, maxDistance: number = 2): boolean {
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();

  if (t.includes(q)) return true;
  if (q.length < 3) return t.startsWith(q);

  const dist = calculateLevenshteinDistance(q, t);
  return dist <= maxDistance;
}

/* =========================================================================
   4. SEARCH RESULT DATA STRUCTURES
   ========================================================================= */

export type MedSearchFilterCategory = 
  | 'All' 
  | 'Medicines' 
  | 'Conditions & Diseases' 
  | 'Symptoms' 
  | 'Drug Classes' 
  | 'Brands' 
  | 'Dosage Forms' 
  | 'Vaccines & Biologics' 
  | 'Emergency & Antidotes';

export interface UniversalMedSearchResult {
  queryCleaned: string;
  detectedCorrection?: { original: string; corrected: string };
  matchedConditions: SymptomDiseaseKnowledge[];
  matchedDrugs: MasterDrugRecord[];
  matchedAntidotes: typeof POISONING_ANTIDOTE_REGISTRY;
  matchedDrugClasses: { className: string; drugsCount: number; sampleIndications: string[] }[];
  matchedDosageForms: string[];
  matchedBrands: { brandName: string; genericName: string; drugRecord: MasterDrugRecord }[];
  totalMatchesCount: number;
}

/* =========================================================================
   5. MASTER UNIVERSAL SEARCH FUNCTION
   ========================================================================= */

export function executeUniversalMedSearch(rawQuery: string): UniversalMedSearchResult {
  const query = rawQuery.toLowerCase().trim();

  if (!query) {
    return {
      queryCleaned: '',
      matchedConditions: [],
      matchedDrugs: MASTER_DRUG_DATABASE,
      matchedAntidotes: [],
      matchedDrugClasses: [],
      matchedDosageForms: [],
      matchedBrands: [],
      totalMatchesCount: MASTER_DRUG_DATABASE.length
    };
  }

  // 1. Check typo dictionary
  let effectiveQuery = query;
  let detectedCorrection: { original: string; corrected: string } | undefined;

  if (COMMON_TYPO_CORRECTIONS[query]) {
    effectiveQuery = COMMON_TYPO_CORRECTIONS[query];
    detectedCorrection = { original: rawQuery, corrected: effectiveQuery };
  } else {
    for (const [typo, fix] of Object.entries(COMMON_TYPO_CORRECTIONS)) {
      if (calculateLevenshteinDistance(query, typo) <= 1 && query.length > 3) {
        effectiveQuery = fix;
        detectedCorrection = { original: rawQuery, corrected: effectiveQuery };
        break;
      }
    }
  }

  // 2. Search Symptom & Disease Knowledge Base
  const matchedConditions = SYMPTOM_DISEASE_KNOWLEDGE_BASE.filter(cond => {
    const nameMatch = cond.name.toLowerCase().includes(effectiveQuery) || isFuzzyMatch(effectiveQuery, cond.name);
    const aliasMatch = cond.aliases.some(alias => alias.toLowerCase().includes(effectiveQuery) || isFuzzyMatch(effectiveQuery, alias));
    const descMatch = cond.description.toLowerCase().includes(effectiveQuery);
    const catMatch = cond.commonTreatmentCategories.some(cat => cat.toLowerCase().includes(effectiveQuery));
    return nameMatch || aliasMatch || descMatch || catMatch;
  });

  // 3. Search Master Drug Records
  const matchedDrugs = MASTER_DRUG_DATABASE.filter(drug => {
    const genericMatch = drug.genericName.toLowerCase().includes(effectiveQuery) || isFuzzyMatch(effectiveQuery, drug.genericName);
    const brandMatch = drug.brandNames.some(b => b.toLowerCase().includes(effectiveQuery) || isFuzzyMatch(effectiveQuery, b));
    const classMatch = drug.drugClass.toLowerCase().includes(effectiveQuery) || isFuzzyMatch(effectiveQuery, drug.drugClass);
    const indicationMatch = drug.indications.some(ind => ind.toLowerCase().includes(effectiveQuery));
    const dosageMatch = drug.dosageForms.some(df => df.toLowerCase().includes(effectiveQuery));
    const routeMatch = drug.routes.some(r => r.toLowerCase().includes(effectiveQuery));
    const statusMatch = drug.legalStatus.toLowerCase().includes(effectiveQuery) || drug.substanceCategory.toLowerCase().includes(effectiveQuery);
    const mechMatch = drug.mechanismOfAction.toLowerCase().includes(effectiveQuery);

    return genericMatch || brandMatch || classMatch || indicationMatch || dosageMatch || routeMatch || statusMatch || mechMatch;
  });

  // 4. Search Poison & Antidote Registry
  const matchedAntidotes = POISONING_ANTIDOTE_REGISTRY.filter(ant => {
    const toxinMatch = ant.toxinName.toLowerCase().includes(effectiveQuery) || isFuzzyMatch(effectiveQuery, ant.toxinName);
    const antidoteMatch = ant.primaryAntidote.toLowerCase().includes(effectiveQuery) || isFuzzyMatch(effectiveQuery, ant.primaryAntidote);
    const symMatch = ant.clinicalSymptoms.some(s => s.toLowerCase().includes(effectiveQuery));
    return toxinMatch || antidoteMatch || symMatch;
  });

  // 5. Aggregate Matched Drug Classes
  const classMap = new Map<string, { className: string; drugsCount: number; sampleIndications: string[] }>();
  matchedDrugs.forEach(drug => {
    if (!classMap.has(drug.drugClass)) {
      classMap.set(drug.drugClass, {
        className: drug.drugClass,
        drugsCount: 1,
        sampleIndications: drug.indications.slice(0, 3)
      });
    } else {
      const existing = classMap.get(drug.drugClass)!;
      existing.drugsCount += 1;
    }
  });
  const matchedDrugClasses = Array.from(classMap.values());

  // 6. Aggregate Matched Brands
  const matchedBrands: { brandName: string; genericName: string; drugRecord: MasterDrugRecord }[] = [];
  MASTER_DRUG_DATABASE.forEach(drug => {
    drug.brandNames.forEach(b => {
      if (b.toLowerCase().includes(effectiveQuery) || isFuzzyMatch(effectiveQuery, b)) {
        matchedBrands.push({
          brandName: b,
          genericName: drug.genericName,
          drugRecord: drug
        });
      }
    });
  });

  // 7. Aggregate Matched Dosage Forms
  const dosageSet = new Set<string>();
  matchedDrugs.forEach(drug => {
    drug.dosageForms.forEach(df => {
      if (df.toLowerCase().includes(effectiveQuery) || effectiveQuery.length <= 3) {
        dosageSet.add(df);
      }
    });
  });
  const matchedDosageForms = Array.from(dosageSet);

  const totalMatchesCount = matchedConditions.length + matchedDrugs.length + matchedAntidotes.length + matchedBrands.length;

  return {
    queryCleaned: effectiveQuery,
    detectedCorrection,
    matchedConditions,
    matchedDrugs,
    matchedAntidotes,
    matchedDrugClasses,
    matchedDosageForms,
    matchedBrands,
    totalMatchesCount
  };
}
