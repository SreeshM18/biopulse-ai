import { 
  MasterDrugRecord, 
  MedGuardDrugItem, 
  MedGuardPatientContext, 
  MedGuardFinding, 
  MedGuardAnalysisReport, 
  MedGuardRiskLevel,
  PharmaDosageForm,
  PharmaAdministrationRoute
} from '../types/biotech';
import { MASTER_DRUG_DATABASE } from '../data/novaPharmaUniverseData';
import { calculateLevenshteinDistance } from './medSearchEngine';

/* =========================================================================
   1. BRAND / GENERIC CANONICAL KNOWLEDGE BASE & RESOLUTION
   ========================================================================= */

interface CanonicalDrugLookup {
  canonicalGenericName: string;
  brandAliases: string[];
  activeIngredient: string;
  drugClass: string;
  standardStrengths: { value: number; unit: string }[];
  defaultDosageForm: PharmaDosageForm;
  defaultRoute: PharmaAdministrationRoute;
  maxSingleDoseMg: number;
  maxDailyDoseMg: number;
  isHighAlert: boolean;
  isControlled: boolean;
  linkedMasterId?: string;
}

export const CANONICAL_DRUGS: CanonicalDrugLookup[] = [
  {
    canonicalGenericName: 'Paracetamol',
    brandAliases: ['dolo', 'dolo 650', 'dolo650', 'crocin', 'crocin 650', 'calpol', 'panadol', 'tylenol', 'acetaminophen', 'paracip'],
    activeIngredient: 'Paracetamol / Acetaminophen',
    drugClass: 'Analgesic / Antipyretic',
    standardStrengths: [{ value: 500, unit: 'mg' }, { value: 650, unit: 'mg' }, { value: 1000, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 4000,
    isHighAlert: false,
    isControlled: false
  },
  {
    canonicalGenericName: 'Sildenafil Citrate',
    brandAliases: ['viagra', 'revatio', 'manforce', 'cenforce', 'kamagra', 'silagra', 'sildenafil'],
    activeIngredient: 'Sildenafil Citrate',
    drugClass: 'Phosphodiesterase-5 (PDE-5) Inhibitor',
    standardStrengths: [{ value: 25, unit: 'mg' }, { value: 50, unit: 'mg' }, { value: 100, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 100,
    maxDailyDoseMg: 100,
    isHighAlert: false,
    isControlled: false
  },
  {
    canonicalGenericName: 'Atorvastatin Calcium',
    brandAliases: ['lipitor', 'atorva', 'storvas', 'atorlip', 'atorvastatin'],
    activeIngredient: 'Atorvastatin Calcium',
    drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
    standardStrengths: [{ value: 10, unit: 'mg' }, { value: 20, unit: 'mg' }, { value: 40, unit: 'mg' }, { value: 80, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 80,
    maxDailyDoseMg: 80,
    isHighAlert: false,
    isControlled: false,
    linkedMasterId: 'drug-atorvastatin'
  },
  {
    canonicalGenericName: 'Lisinopril',
    brandAliases: ['prinivil', 'zestril', 'lisoril', 'lisinopril'],
    activeIngredient: 'Lisinopril',
    drugClass: 'Angiotensin-Converting Enzyme (ACE) Inhibitor',
    standardStrengths: [{ value: 5, unit: 'mg' }, { value: 10, unit: 'mg' }, { value: 20, unit: 'mg' }, { value: 40, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 40,
    maxDailyDoseMg: 40,
    isHighAlert: false,
    isControlled: false,
    linkedMasterId: 'drug-lisinopril'
  },
  {
    canonicalGenericName: 'Semaglutide',
    brandAliases: ['ozempic', 'wegovy', 'rybelsus', 'semaglutide'],
    activeIngredient: 'Semaglutide',
    drugClass: 'GLP-1 Receptor Agonist',
    standardStrengths: [{ value: 0.25, unit: 'mg' }, { value: 0.5, unit: 'mg' }, { value: 1.0, unit: 'mg' }, { value: 2.0, unit: 'mg' }],
    defaultDosageForm: 'Auto-injectors',
    defaultRoute: 'Subcutaneous (SC)',
    maxSingleDoseMg: 2.4,
    maxDailyDoseMg: 2.4,
    isHighAlert: false,
    isControlled: false,
    linkedMasterId: 'drug-semaglutide-glp1'
  },
  {
    canonicalGenericName: 'Vancomycin Hydrochloride',
    brandAliases: ['vancocin', 'firvanq', 'vanlid', 'vancomycin'],
    activeIngredient: 'Vancomycin Hydrochloride',
    drugClass: 'Glycopeptide Antibacterial Agent',
    standardStrengths: [{ value: 500, unit: 'mg' }, { value: 1000, unit: 'mg' }, { value: 125, unit: 'mg' }],
    defaultDosageForm: 'Injections',
    defaultRoute: 'Intravenous (IV)',
    maxSingleDoseMg: 2000,
    maxDailyDoseMg: 4000,
    isHighAlert: true,
    isControlled: false,
    linkedMasterId: 'drug-vancomycin-iv'
  },
  {
    canonicalGenericName: 'Warfarin Sodium',
    brandAliases: ['coumadin', 'jantoven', 'warf', 'marevan', 'warfarin'],
    activeIngredient: 'Warfarin Sodium',
    drugClass: 'Vitamin K Antagonist Anticoagulant',
    standardStrengths: [{ value: 1, unit: 'mg' }, { value: 2, unit: 'mg' }, { value: 2.5, unit: 'mg' }, { value: 5, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 10,
    maxDailyDoseMg: 10,
    isHighAlert: true,
    isControlled: false
  },
  {
    canonicalGenericName: 'Nitroglycerin',
    brandAliases: ['nitrostat', 'nitrolingual', 'nitro-dur', 'angispan', 'sorbitrate', 'nitroglycerin', 'glyceryl trinitrate'],
    activeIngredient: 'Nitroglycerin (Glyceryl Trinitrate)',
    drugClass: 'Nitrate Vasodilator',
    standardStrengths: [{ value: 0.4, unit: 'mg' }, { value: 0.3, unit: 'mg' }],
    defaultDosageForm: 'Sublingual Tablet',
    defaultRoute: 'Sublingual',
    maxSingleDoseMg: 1.2,
    maxDailyDoseMg: 4.8,
    isHighAlert: true,
    isControlled: false
  },
  {
    canonicalGenericName: 'Spironolactone',
    brandAliases: ['aldactone', 'aldactide', 'spirotone', 'spironolactone'],
    activeIngredient: 'Spironolactone',
    drugClass: 'Potassium-Sparing Aldosterone Antagonist Diuretic',
    standardStrengths: [{ value: 25, unit: 'mg' }, { value: 50, unit: 'mg' }, { value: 100, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 100,
    maxDailyDoseMg: 400,
    isHighAlert: false,
    isControlled: false
  },
  {
    canonicalGenericName: 'Ibuprofen',
    brandAliases: ['advil', 'motrin', 'brufen', 'nurofen', 'combiflam', 'ibuprofen'],
    activeIngredient: 'Ibuprofen',
    drugClass: 'Non-Steroidal Anti-Inflammatory Drug (NSAID)',
    standardStrengths: [{ value: 200, unit: 'mg' }, { value: 400, unit: 'mg' }, { value: 600, unit: 'mg' }, { value: 800, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 800,
    maxDailyDoseMg: 3200,
    isHighAlert: false,
    isControlled: false
  },
  {
    canonicalGenericName: 'Metformin Hydrochloride',
    brandAliases: ['glucophage', 'glycomet', 'fortamet', 'riomet', 'metformin'],
    activeIngredient: 'Metformin Hydrochloride',
    drugClass: 'Biguanide Antidiabetic Agent',
    standardStrengths: [{ value: 500, unit: 'mg' }, { value: 850, unit: 'mg' }, { value: 1000, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 2550,
    isHighAlert: false,
    isControlled: false
  },
  {
    canonicalGenericName: 'Diazepam',
    brandAliases: ['valium', 'calmpose', 'valpam', 'diazepam'],
    activeIngredient: 'Diazepam',
    drugClass: 'Benzodiazepine Central Nervous System Depressant',
    standardStrengths: [{ value: 2, unit: 'mg' }, { value: 5, unit: 'mg' }, { value: 10, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 10,
    maxDailyDoseMg: 40,
    isHighAlert: true,
    isControlled: true
  },
  {
    canonicalGenericName: 'Morphine Sulfate',
    brandAliases: ['ms contin', 'kadian', 'roxanol', 'morphine', 'morcontin'],
    activeIngredient: 'Morphine Sulfate',
    drugClass: 'Opioid Analgesic / Mu-Opioid Agonist',
    standardStrengths: [{ value: 10, unit: 'mg' }, { value: 15, unit: 'mg' }, { value: 30, unit: 'mg' }],
    defaultDosageForm: 'Injections',
    defaultRoute: 'Intravenous (IV)',
    maxSingleDoseMg: 30,
    maxDailyDoseMg: 120,
    isHighAlert: true,
    isControlled: true
  },
  {
    canonicalGenericName: 'Amoxicillin-Clavulanate',
    brandAliases: ['augmentin', 'clamoxyl', 'moxclav', 'augmentin duo', 'amoxicillin'],
    activeIngredient: 'Amoxicillin + Clavulanic Acid',
    drugClass: 'Beta-Lactam / Penicillin Antibiotic',
    standardStrengths: [{ value: 625, unit: 'mg' }, { value: 1000, unit: 'mg' }, { value: 375, unit: 'mg' }],
    defaultDosageForm: 'Tablets',
    defaultRoute: 'Oral',
    maxSingleDoseMg: 1000,
    maxDailyDoseMg: 2000,
    isHighAlert: false,
    isControlled: false
  }
];

/* =========================================================================
   2. FUZZY DRUG & STRENGTH PARSER
   ========================================================================= */

export function parseAndNormalizeDrugInput(rawInput: string): MedGuardDrugItem {
  const cleanInput = rawInput.toLowerCase().trim();

  // 1. Extract numeric strength if present (e.g. "dolo 650", "lisinopril 20mg", "paracetamol 500 mg")
  const strengthMatch = cleanInput.match(/(\d+(\.\d+)?)\s*(mg|mcg|g|ml|units)?/i);
  let parsedStrength = 0;
  let parsedUnit = 'mg';

  if (strengthMatch) {
    parsedStrength = parseFloat(strengthMatch[1]);
    if (strengthMatch[3]) {
      parsedUnit = strengthMatch[3].toLowerCase();
    }
  }

  // 2. Find closest canonical drug
  let bestMatch: CanonicalDrugLookup | null = null;
  let lowestDistance = 999;

  for (const drug of CANONICAL_DRUGS) {
    // Check canonical name
    if (cleanInput.includes(drug.canonicalGenericName.toLowerCase())) {
      bestMatch = drug;
      break;
    }

    // Check aliases
    for (const alias of drug.brandAliases) {
      if (cleanInput.includes(alias.toLowerCase()) || alias.toLowerCase().includes(cleanInput.replace(/\d+/g, '').trim())) {
        bestMatch = drug;
        break;
      }
    }

    if (bestMatch) break;

    // Fuzzy distance check on main words
    const queryWord = cleanInput.replace(/\d+/g, '').replace(/(mg|tab|tablet|tablt|cap|capsule|syrup|inj|injection)/g, '').trim();
    for (const alias of [drug.canonicalGenericName, ...drug.brandAliases]) {
      const dist = calculateLevenshteinDistance(queryWord, alias.toLowerCase());
      if (dist < lowestDistance && dist <= 2) {
        lowestDistance = dist;
        bestMatch = drug;
      }
    }
  }

  // Fallback to default or matched
  const matched = bestMatch || CANONICAL_DRUGS[0]; // fallback to Paracetamol

  const strengthVal = parsedStrength > 0 
    ? parsedStrength 
    : (matched.standardStrengths[0]?.value || 500);

  const matchedMaster = matched.linkedMasterId 
    ? MASTER_DRUG_DATABASE.find(d => d.id === matched.linkedMasterId)
    : undefined;

  return {
    id: `medguard-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    rawInput,
    genericName: matched.canonicalGenericName,
    brandName: rawInput.split(' ')[0],
    activeIngredient: matched.activeIngredient,
    drugClass: matched.drugClass,
    strengthValue: strengthVal,
    strengthUnit: parsedUnit,
    dosageForm: matched.defaultDosageForm,
    route: matched.defaultRoute,
    frequency: 'QD (Daily)',
    isHighAlert: matched.isHighAlert,
    legalStatus: matched.isControlled ? 'Controlled prescription' : (matched.isHighAlert ? 'High-alert' : 'Prescription'),
    originalDrugRecord: matchedMaster
  };
}

/* =========================================================================
   3. MULTI-DIMENSIONAL MEDGUARD RULES ENGINE
   ========================================================================= */

export function executeMedGuardSafetyAudit(
  drugs: MedGuardDrugItem[],
  patient: MedGuardPatientContext
): MedGuardAnalysisReport {
  const findings: MedGuardFinding[] = [];
  const duplicateAlerts: MedGuardAnalysisReport['duplicateIngredientAlerts'] = [];

  // =========================================================================
  // 1. DUPLICATE INGREDIENT & CUMULATIVE TOXICITY DETECTION
  // =========================================================================
  const ingredientMap = new Map<string, MedGuardDrugItem[]>();
  drugs.forEach(d => {
    const ing = d.activeIngredient.toLowerCase();
    if (!ingredientMap.has(ing)) {
      ingredientMap.set(ing, [d]);
    } else {
      ingredientMap.get(ing)!.push(d);
    }
  });

  ingredientMap.forEach((drugList, ing) => {
    if (drugList.length > 1) {
      const totalDose = drugList.reduce((acc, curr) => acc + curr.strengthValue, 0);
      const isParacetamol = ing.includes('paracetamol') || ing.includes('acetaminophen');
      const maxDaily = isParacetamol ? '4000 mg/day' : 'Refer to clinical monograph';

      duplicateAlerts.push({
        ingredient: drugList[0].activeIngredient,
        drugNames: drugList.map(d => `${d.rawInput} (${d.strengthValue}${d.strengthUnit})`),
        cumulativeDose: `${totalDose} mg`,
        maxDailySafeDose: maxDaily,
        warning: `⚠️ DUPLICATE THERAPY DETECTED: Multiple products contain ${drugList[0].activeIngredient}. High risk of inadvertent overdose and toxic organ injury.`
      });

      findings.push({
        id: `dup-${Math.random()}`,
        category: 'DUPLICATE_INGREDIENT',
        severity: isParacetamol && totalDose > 1000 ? 'HIGH' : 'CAUTION',
        title: `Duplicate Active Ingredient: ${drugList[0].activeIngredient}`,
        involvedItems: drugList.map(d => d.genericName),
        whatMayHappen: `Co-administration of ${drugList.map(d => d.rawInput).join(' and ')} leads to cumulative ${drugList[0].activeIngredient} intake (${totalDose} mg).`,
        pharmacologicalMechanism: `Overlapping pharmacological exposure exceeds safe metabolic clearance pathways, saturating phase II glucuronidation/sulfation and generating toxic electrophilic metabolites.`,
        whoIsAtGreaterRisk: `Patients taking OTC combination cold products alongside prescription analgesics, elderly patients, and those with hepatic impairment.`,
        symptomsToWatchFor: ['Nausea & Anorexia', 'Right Upper Quadrant Abdominal Pain', 'Unexplained Jaundice', 'Acute Malaise'],
        recommendedClinicalAction: `Discontinue one of the duplicate preparations. Do not exceed the maximum daily therapeutic threshold (${maxDaily}).`,
        evidenceSources: ['DailyMed / FDA Labeling', 'WHO Essential Medicines Safety Guide', 'RxNorm Ingredient Clustering']
      });
    }
  });

  // =========================================================================
  // 2. DRUG ↔ DRUG INTERACTION MATRIX
  // =========================================================================
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const d1 = drugs[i];
      const d2 = drugs[j];
      const name1 = d1.genericName.toLowerCase();
      const name2 = d2.genericName.toLowerCase();

      // A. Sildenafil + Nitrates (CRITICAL CONTRAINDICATION)
      if (
        (name1.includes('sildenafil') && name2.includes('nitroglycerin')) ||
        (name1.includes('nitroglycerin') && name2.includes('sildenafil'))
      ) {
        findings.push({
          id: `ddi-sildenafil-nitrate`,
          category: 'DRUG_DRUG',
          severity: 'CRITICAL',
          title: '🚨 CRITICAL CONTRAINDICATION: Sildenafil + Nitroglycerin',
          involvedItems: [d1.rawInput, d2.rawInput],
          whatMayHappen: 'Severe, profound, and potentially fatal systemic hypotension and cardiovascular collapse.',
          pharmacologicalMechanism: 'Synergistic amplification of the nitric oxide - cyclic GMP pathway: Nitroglycerin drives massive NO generation while Sildenafil blocks cGMP breakdown via PDE-5 inhibition, causing profound refractory arteriolar vasodilation.',
          whoIsAtGreaterRisk: 'Patients with coronary artery disease, heart failure, and volume depletion.',
          symptomsToWatchFor: ['Profound Dizziness / Syncope', 'Cold Clammy Diaphoresis', 'Chest Pain / Acute Coronary Ischemia', 'Loss of Consciousness'],
          recommendedClinicalAction: 'ABSOLUTELY CONTRAINDICATED. Do NOT co-administer. Ensure a minimum 24-hour wash-out after sildenafil (48 hours for tadalafil) before administering nitrates.',
          evidenceSources: ['FDA Boxed Warning', 'American College of Cardiology (ACC/AHA) CDSS Standards', 'DrugBank DB00203']
        });
      }

      // B. Lisinopril + Spironolactone (Hyperkalemia)
      if (
        (name1.includes('lisinopril') && name2.includes('spironolactone')) ||
        (name1.includes('spironolactone') && name2.includes('lisinopril'))
      ) {
        findings.push({
          id: `ddi-acei-spiro`,
          category: 'DRUG_DRUG',
          severity: patient.serumPotassium >= 5.0 ? 'CRITICAL' : 'HIGH',
          title: '⚠️ Severe Hyperkalemia Risk: Lisinopril + Spironolactone',
          involvedItems: [d1.rawInput, d2.rawInput],
          whatMayHappen: 'Life-threatening elevation of serum potassium (K+ > 5.5 - 6.5 mEq/L) predisposing to fatal cardiac arrhythmias and asystole.',
          pharmacologicalMechanism: 'Dual inhibition of aldosterone: Lisinopril reduces angiotensin II-mediated aldosterone synthesis, while Spironolactone competitively blocks mineralocorticoid receptors in distal tubules, halting renal potassium excretion.',
          whoIsAtGreaterRisk: `Patients with pre-existing renal insufficiency (eGFR ${patient.egfr} mL/min) or baseline potassium (Current K+: ${patient.serumPotassium} mEq/L).`,
          symptomsToWatchFor: ['Cardiac Palpitations / Bradycardia', 'Ascending Muscle Weakness', 'Paresthesias', 'Peaked T-Waves on ECG'],
          recommendedClinicalAction: 'Obtain baseline serum potassium and creatinine within 3-7 days. Avoid potassium supplements. If K+ > 5.5 mEq/L, reduce dose or hold spironolactone.',
          evidenceSources: ['KDIGO Clinical Practice Guideline for CKD', 'FDA Lisinopril Monograph', 'DailyMed']
        });
      }

      // C. Warfarin + NSAID (Ibuprofen)
      if (
        (name1.includes('warfarin') && name2.includes('ibuprofen')) ||
        (name1.includes('ibuprofen') && name2.includes('warfarin'))
      ) {
        findings.push({
          id: `ddi-warfarin-nsaid`,
          category: 'DRUG_DRUG',
          severity: 'HIGH',
          title: '⚠️ Major Bleeding Risk: Warfarin + Ibuprofen (NSAID)',
          involvedItems: [d1.rawInput, d2.rawInput],
          whatMayHappen: 'Dramatically increased risk of severe upper gastrointestinal ulceration, massive bleeding, and intracranial hemorrhage.',
          pharmacologicalMechanism: 'Synergistic coagulopathy: Warfarin depletes Vitamin K-dependent clotting factors (II, VII, IX, X), while Ibuprofen impairs platelet aggregation via COX-1 inhibition and disrupts gastric mucosal cytoprotective prostaglandins.',
          whoIsAtGreaterRisk: 'Patients with peptic ulcer history, age ≥65 years, or elevated baseline INR (Current INR: ${patient.inr}).',
          symptomsToWatchFor: ['Melena (Black Tarry Stools)', 'Hematemesis (Coffee-Ground Vomitus)', 'Spontaneous Bruising', 'Hematuria'],
          recommendedClinicalAction: 'Avoid chronic systemic NSAIDs with anticoagulants. If analgesia is required, select Paracetamol (≤2g/day) or a topical agent with clinician supervision.',
          evidenceSources: ['CHEST Guidelines on Antithrombotic Therapy', 'FDA Warfarin Safety Communication']
        });
      }

      // D. Morphine + Diazepam (CNS / Respiratory Depression Stack)
      if (
        (name1.includes('morphine') && name2.includes('diazepam')) ||
        (name1.includes('diazepam') && name2.includes('morphine'))
      ) {
        findings.push({
          id: `ddi-opioid-benzo`,
          category: 'TOXICITY_OVERDOSE_RISK',
          severity: 'CRITICAL',
          title: '🚨 FDA BOXED WARNING: Opioid (Morphine) + Benzodiazepine (Diazepam)',
          involvedItems: [d1.rawInput, d2.rawInput],
          whatMayHappen: 'Profound sedation, severe respiratory depression, coma, and fatal respiratory arrest.',
          pharmacologicalMechanism: 'Synergistic GABA-A and Mu-opioid receptor-mediated suppression of medullary respiratory drive neurons.',
          whoIsAtGreaterRisk: 'Elderly patients, patients with COPD / Sleep Apnea, and those consuming alcohol.',
          symptomsToWatchFor: ['Bradypnea (RR < 8 breaths/min)', 'Unresponsive Somnolence', 'Pinpoint Pupils', 'Cyanosis'],
          recommendedClinicalAction: 'Reserve concomitant prescribing for patients with inadequate alternative treatment options. Limit dosages and duration to minimum. Ensure take-home Naloxone (Narcan) is co-prescribed.',
          evidenceSources: ['FDA Boxed Warning on Opioid-Benzodiazepine Co-Prescribing', 'CDC Clinical Practice Guideline']
        });
      }
    }
  }

  // =========================================================================
  // 3. DRUG ↔ ALLERGY VERIFICATION
  // =========================================================================
  patient.knownAllergies.forEach(allergy => {
    const cleanAllergy = allergy.toLowerCase();

    drugs.forEach(d => {
      const generic = d.genericName.toLowerCase();
      const drugClass = d.drugClass.toLowerCase();

      if (
        (cleanAllergy.includes('penicillin') && (generic.includes('amoxicillin') || drugClass.includes('penicillin'))) ||
        (cleanAllergy.includes('sulfa') && generic.includes('sulfamethoxazole')) ||
        (cleanAllergy.includes('nsaid') && generic.includes('ibuprofen'))
      ) {
        findings.push({
          id: `allergy-${d.id}`,
          category: 'DRUG_ALLERGY',
          severity: 'CRITICAL',
          title: `🚨 ALLERGY ALERT: Patient is Allergic to ${allergy}`,
          involvedItems: [d.rawInput, `Recorded Allergy: ${allergy}`],
          whatMayHappen: 'Immediate IgE-mediated anaphylaxis, acute bronchospasm, angioedema, or severe cutaneous adverse reactions (SCAR/TEN).',
          pharmacologicalMechanism: 'Immune memory recognizing haptenated drug degradation complexes, triggering massive mast-cell degranulation.',
          whoIsAtGreaterRisk: 'Patient with documented prior hypersensitivity.',
          symptomsToWatchFor: ['Urticaria & Generalized Pruritus', 'Laryngeal Edema & Stridor', 'Hypotensive Shock', 'Wheezing'],
          recommendedClinicalAction: 'DO NOT DISPENSE. Select an alternative non-cross-reactive drug class (e.g. Macrolide or Fluoroquinolone for penicillin allergy).',
          evidenceSources: ['EHR Electronic Allergy Cross-Check', 'AAAAI Practice Parameters']
        });
      }
    });
  });

  // =========================================================================
  // 4. LAB-AWARE AI & ELECTROLYTE / ORGAN FUNCTION INTERACTION
  // =========================================================================
  drugs.forEach(d => {
    const generic = d.genericName.toLowerCase();

    // A. High Potassium + ACEi / Spironolactone
    if ((generic.includes('lisinopril') || generic.includes('spironolactone')) && patient.serumPotassium >= 5.0) {
      findings.push({
        id: `lab-potassium-${d.id}`,
        category: 'DRUG_LAB_ELECTROLYTE',
        severity: patient.serumPotassium >= 5.5 ? 'CRITICAL' : 'HIGH',
        title: `⚠️ Pre-existing Hyperkalemia with ${d.genericName}`,
        involvedItems: [d.rawInput, `Current Serum K+: ${patient.serumPotassium} mEq/L (Normal: 3.5 - 5.0)`],
        whatMayHappen: 'Precipitation of malignant cardiac ventricular arrhythmias or heart block.',
        pharmacologicalMechanism: 'Drug inhibits renal potassium excretion in a patient already presenting with hyperkalemia.',
        whoIsAtGreaterRisk: 'Patients with reduced eGFR or on dual RAAS blockade.',
        symptomsToWatchFor: ['Bradycardia', 'Muscle Weakness', 'ECG Peaked T-waves / QRS widening'],
        recommendedClinicalAction: 'Hold potassium-sparing medications until serum potassium is normalized (<5.0 mEq/L). Repeat electrolyte panel.',
        evidenceSources: ['Clinical Laboratory Critical Alert Rules', 'KDIGO Guideline']
      });
    }

    // B. Renal Impairment (eGFR < 30) + Metformin
    if (generic.includes('metformin') && patient.egfr < 30) {
      findings.push({
        id: `lab-egfr-metformin-${d.id}`,
        category: 'DRUG_ORGAN_RENAL',
        severity: 'CRITICAL',
        title: `🚨 Renal Contraindication: Metformin with eGFR ${patient.egfr} mL/min`,
        involvedItems: [d.rawInput, `eGFR: ${patient.egfr} mL/min/1.73m2`],
        whatMayHappen: 'Metformin-Associated Lactic Acidosis (MALA), a life-threatening metabolic crisis with >30% mortality.',
        pharmacologicalMechanism: 'Metformin is 100% renally excreted; severe renal clearance failure causes massive systemic drug accumulation, inhibiting mitochondrial oxidative phosphorylation and driving anaerobic lactate production.',
        whoIsAtGreaterRisk: 'Patients with eGFR < 30 mL/min/1.73m2 or acute kidney injury.',
        symptomsToWatchFor: ['Kussmaul Deep Respiration', 'Severe Abdominal Pain', 'Somnolence / Hypothermia', 'Profound Lactic Acidosis (Lactate > 5 mmol/L)'],
        recommendedClinicalAction: 'CONTRAINDICATED in eGFR < 30 mL/min. Discontinue Metformin immediately and transition patient to insulin or DPP-4 inhibitor.',
        evidenceSources: ['FDA Drug Safety Communication on Metformin in Renal Impairment', 'ADA Standards of Care in Diabetes']
      });
    }

    // C. Renal Impairment + Vancomycin TDM
    if (generic.includes('vancomycin') && patient.egfr < 60) {
      findings.push({
        id: `lab-vancomycin-renal-${d.id}`,
        category: 'DRUG_ORGAN_RENAL',
        severity: 'HIGH',
        title: `⚠️ Renal Elimination Clearance Alert: Vancomycin (eGFR: ${patient.egfr})`,
        involvedItems: [d.rawInput, `eGFR: ${patient.egfr} mL/min`],
        whatMayHappen: 'Toxic drug accumulation leading to acute tubular necrosis and irreversible ototoxicity.',
        pharmacologicalMechanism: 'Reduced glomerular filtration delays vancomycin elimination, prolonging terminal half-life from 6 hours to several days.',
        whoIsAtGreaterRisk: 'ICU patients with fluctuating creatinine or on concomitant nephrotoxins.',
        symptomsToWatchFor: ['Decreasing Urine Output', 'Spiking Serum Creatinine', 'Tinnitus / Hearing Loss'],
        recommendedClinicalAction: 'Perform Therapeutic Drug Monitoring (TDM) targeting AUC24/MIC 400-600. Adjust dosing interval to Q24H or Q48H based on trough levels.',
        evidenceSources: ['IDSA / ASHP Consensus Guidelines on Vancomycin TDM']
      });
    }

    // D. Elevated INR + Warfarin
    if (generic.includes('warfarin') && patient.inr > 3.5) {
      findings.push({
        id: `lab-inr-warfarin-${d.id}`,
        category: 'DRUG_LAB_ELECTROLYTE',
        severity: patient.inr > 5.0 ? 'CRITICAL' : 'HIGH',
        title: `⚠️ Supratherapeutic INR Alert: Warfarin (INR: ${patient.inr})`,
        involvedItems: [d.rawInput, `Current INR: ${patient.inr} (Target: 2.0 - 3.0)`],
        whatMayHappen: 'Spontaneous major hemorrhage (Intracranial, Retroperitoneal, or Gastrointestinal bleeding).',
        pharmacologicalMechanism: 'Severe depletion of active prothrombin complex factors.',
        whoIsAtGreaterRisk: 'Elderly patients, history of falls, or concurrent antiplatelet therapy.',
        symptomsToWatchFor: ['Epistaxis / Gingival Bleeding', 'Gross Hematuria', 'Severe Sudden Headache', 'Ecchymosis'],
        recommendedClinicalAction: 'Hold next 1-2 doses of warfarin. If INR > 10 or bleeding present, administer 4F-PCC and oral/IV Vitamin K1 per protocol.',
        evidenceSources: ['CHEST Antithrombotic Guidelines', 'Hospital Anticoagulation Protocol']
      });
    }
  });

  // =========================================================================
  // 5. ALCOHOL & FOOD SAFETY AUDIT
  // =========================================================================
  if (patient.consumesAlcohol) {
    drugs.forEach(d => {
      const generic = d.genericName.toLowerCase();
      const drugClass = d.drugClass.toLowerCase();

      if (generic.includes('diazepam') || generic.includes('morphine') || drugClass.includes('opioid') || drugClass.includes('benzodiazepine')) {
        findings.push({
          id: `alc-sedative-${d.id}`,
          category: 'DRUG_ALCOHOL',
          severity: 'CRITICAL',
          title: `🚨 Severe Alcohol Interaction: ${d.genericName} + Alcohol`,
          involvedItems: [d.rawInput, 'Alcohol Intake'],
          whatMayHappen: 'Extreme CNS depression, impaired motor coordination, respiratory arrest, and coma.',
          pharmacologicalMechanism: 'Ethanol enhances GABA-mediated chloride channel opening, producing supra-additive depression of cortical and brainstem functions.',
          whoIsAtGreaterRisk: 'Patients consuming alcohol while on prescription sedatives/opioids.',
          symptomsToWatchFor: ['Severe Drowsiness', 'Slurred Speech', 'Unsteady Gait / Fall', 'Hypoventilation'],
          recommendedClinicalAction: 'ABSTAIN COMPLETELY FROM ALCOHOL while taking this medication. Do not operate machinery.',
          evidenceSources: ['NIAAA Alcohol-Medication Interactions Database', 'FDA Medication Guide']
        });
      }

      if (generic.includes('paracetamol')) {
        findings.push({
          id: `alc-paracetamol-${d.id}`,
          category: 'DRUG_ALCOHOL',
          severity: 'HIGH',
          title: `⚠️ Hepatotoxicity Risk: Paracetamol + Chronic Alcohol`,
          involvedItems: [d.rawInput, 'Alcohol Intake'],
          whatMayHappen: 'Accelerated production of toxic metabolite NAPQI leading to severe hepatic necrosis even at lower therapeutic doses.',
          pharmacologicalMechanism: 'Chronic alcohol induces cytochrome CYP2E1 and depletes hepatic glutathione reserves.',
          whoIsAtGreaterRisk: 'Individuals consuming ≥3 alcoholic drinks daily.',
          symptomsToWatchFor: ['Nausea', 'Jaundice', 'Elevated Transaminases (AST/ALT)'],
          recommendedClinicalAction: 'Limit paracetamol to a maximum of 2000 mg/day in chronic alcohol users.',
          evidenceSources: ['FDA Advisory Committee on Acetaminophen Safety']
        });
      }
    });
  }

  // Grapefruit Interaction
  if (patient.consumesGrapefruit) {
    drugs.forEach(d => {
      const generic = d.genericName.toLowerCase();
      if (generic.includes('atorvastatin')) {
        findings.push({
          id: `food-grapefruit-${d.id}`,
          category: 'DRUG_FOOD',
          severity: 'HIGH',
          title: `⚠️ Significant Food Interaction: Atorvastatin + Grapefruit Juice`,
          involvedItems: [d.rawInput, 'Grapefruit Juice'],
          whatMayHappen: 'Dramatic increase in systemic statin exposure predisposing to severe myopathy and rhabdomyolysis.',
          pharmacologicalMechanism: 'Furanocoumarins in grapefruit irreversibly inhibit intestinal CYP3A4, reducing first-pass statin metabolism.',
          whoIsAtGreaterRisk: 'Patients drinking >250 mL of grapefruit juice daily.',
          symptomsToWatchFor: ['Severe Muscle Aches / Myalgia', 'Dark Tea-Colored Urine (Myoglobinuria)'],
          recommendedClinicalAction: 'Advise patient to avoid large quantities of grapefruit juice or switch to Rosuvastatin (not metabolized by CYP3A4).',
          evidenceSources: ['FDA DailyMed Statin Interactions']
        });
      }
    });
  }

  // =========================================================================
  // 6. PREGNANCY, GERIATRIC & PEDIATRIC BEERS AUDIT
  // =========================================================================
  if (patient.isPregnant) {
    drugs.forEach(d => {
      const generic = d.genericName.toLowerCase();
      if (generic.includes('lisinopril') || generic.includes('atorvastatin') || generic.includes('warfarin') || generic.includes('clomiphene')) {
        findings.push({
          id: `preg-contra-${d.id}`,
          category: 'DRUG_PREGNANCY_LACTATION',
          severity: 'CRITICAL',
          title: `🚨 PREGNANCY CONTRAINDICATION: ${d.genericName} in Pregnancy`,
          involvedItems: [d.rawInput, `Patient Status: Pregnant (${patient.pregnancyTrimester || 'Confirmed'})`],
          whatMayHappen: 'Teratogenic fetal malformations, fetal renal failure, oligohydramnios, skeletal hypoplasia, and intrauterine fetal demise.',
          pharmacologicalMechanism: 'Disruption of fetal renal perfusion and developmental signaling pathways.',
          whoIsAtGreaterRisk: 'Developing fetus across all trimesters (especially 2nd/3rd trimesters for ACE-inhibitors).',
          symptomsToWatchFor: ['Oligohydramnios on Ultrasound', 'Abnormal Fetal Growth Velocity'],
          recommendedClinicalAction: 'DISCONTINUE IMMEDIATELY. Replace with pregnancy-compatible alternatives (e.g. Labetalol or Methyldopa for hypertension; LMWH Enoxaparin for anticoagulation).',
          evidenceSources: ['ACOG Clinical Guidelines on Hypertension in Pregnancy', 'FDA Black Box Fetal Toxicity Warning']
        });
      }
    });
  }

  if (patient.age >= 65) {
    drugs.forEach(d => {
      const generic = d.genericName.toLowerCase();
      if (generic.includes('diazepam')) {
        findings.push({
          id: `geri-beers-${d.id}`,
          category: 'DRUG_PEDIATRIC_GERIATRIC',
          severity: 'HIGH',
          title: `⚠️ AGS BEERS CRITERIA ALERT: Diazepam in Geriatric Patient (${patient.age}y)`,
          involvedItems: [d.rawInput, `Patient Age: ${patient.age} years`],
          whatMayHappen: 'Marked cognitive impairment, delirium, motor ataxia, severe falls, and hip fractures.',
          pharmacologicalMechanism: 'Age-related reduction in hepatic oxidative clearance prolongs diazepam active metabolite half-life to over 100 hours.',
          whoIsAtGreaterRisk: 'Adults ≥65 years of age.',
          symptomsToWatchFor: ['Daytime Somnolence', 'Confusion / Delirium', 'Postural Instability'],
          recommendedClinicalAction: 'Avoid long-acting benzodiazepines in older adults. If anxiolysis/sedation is mandatory, consider non-pharmacological therapies or short-acting agents at half dose.',
          evidenceSources: ['American Geriatrics Society (AGS) Beers Criteria®']
        });
      }
    });
  }

  // Calculate Overall Risk Level & Score
  let maxSeverityScore = 10;
  let hasCritical = false;
  let hasHigh = false;
  let hasCaution = false;

  findings.forEach(f => {
    if (f.severity === 'CRITICAL') {
      hasCritical = true;
      maxSeverityScore = Math.max(maxSeverityScore, 95);
    } else if (f.severity === 'HIGH') {
      hasHigh = true;
      maxSeverityScore = Math.max(maxSeverityScore, 75);
    } else if (f.severity === 'CAUTION') {
      hasCaution = true;
      maxSeverityScore = Math.max(maxSeverityScore, 40);
    }
  });

  let overallLevel: MedGuardRiskLevel = 'LOW';
  let statement = 'No major clinical interactions identified in the checked evidence sources.';

  if (hasCritical) {
    overallLevel = 'CRITICAL';
    statement = '🚨 CRITICAL SAFETY ALERT: Potentially life-threatening contraindication or dangerous multi-drug interaction identified. URGENT CLINICAL REVIEW REQUIRED.';
  } else if (hasHigh) {
    overallLevel = 'HIGH';
    statement = '⚠️ HIGH RISK: Clinically significant drug interaction, duplicate ingredient, or organ safety consideration detected. Requires physician/pharmacist dose adjustment.';
  } else if (hasCaution) {
    overallLevel = 'CAUTION';
    statement = '🟡 CAUTION: Minor or context-dependent interaction detected. Routine clinical monitoring and patient counseling advised.';
  }

  return {
    timestamp: new Date().toISOString(),
    overallRiskScore: maxSeverityScore,
    overallRiskLevel: overallLevel,
    riskSummaryStatement: statement,
    drugsAnalyzed: drugs,
    patientContext: patient,
    duplicateIngredientAlerts: duplicateAlerts,
    allergyAlerts: findings.filter(f => f.category === 'DRUG_ALLERGY'),
    drugDrugInteractions: findings.filter(f => f.category === 'DRUG_DRUG'),
    diseaseInteractions: findings.filter(f => f.category === 'DRUG_DISEASE'),
    labElectrolyteInteractions: findings.filter(f => f.category === 'DRUG_LAB_ELECTROLYTE'),
    organSafetyAlerts: findings.filter(f => f.category === 'DRUG_ORGAN_RENAL' || f.category === 'DRUG_ORGAN_HEPATIC' || f.category === 'DRUG_CARDIAC_BP'),
    alcoholFoodAlerts: findings.filter(f => f.category === 'DRUG_ALCOHOL' || f.category === 'DRUG_FOOD'),
    specialPopulationAlerts: findings.filter(f => f.category === 'DRUG_PREGNANCY_LACTATION' || f.category === 'DRUG_PEDIATRIC_GERIATRIC'),
    toxcheckAlerts: findings.filter(f => f.category === 'TOXICITY_OVERDOSE_RISK'),
    allFindings: findings,
    doctorVerificationRequired: hasCritical || hasHigh
  };
}
