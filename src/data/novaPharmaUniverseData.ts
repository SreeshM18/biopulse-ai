import { 
  MasterDrugRecord, 
  PoisoningAntidoteRecord, 
  BatchVerificationReport, 
  ADRSubmissionRecord, 
  ColdChainLog 
} from '../types/biotech';

/* =========================================================================
   1. MASTER A–Z PHARMACEUTICAL DRUG UNIVERSE DATABASE (75+ DRUG CLASSES)
   ========================================================================= */

export const MASTER_DRUG_DATABASE: MasterDrugRecord[] = [
  // --- A ---
  {
    id: 'drug-atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brandNames: ['Lipitor', 'Atorva', 'Storvas'],
    alphabetLetter: 'A',
    drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
    therapeuticCategory: 'Cardiovascular / Lipid-Lowering',
    chemicalName: '(3R,5R)-7-[2-(4-fluorophenyl)-3-phenyl-4-(phenylcarbamoyl)-5-propan-2-ylpyrrol-1-yl]-3,5-dihydroxyheptanoic acid',
    molecularFormula: 'C33H35FN2O5',
    molecularWeight: 558.64,
    smilesNotation: 'CC(C)C1=C(C(=C(N1CCC(CC(CC(=O)O)O)O)C2=CC=C(C=C2)F)C3=CC=CC=C3)C(=O)NC4=CC=CC=C4',
    mechanismOfAction: 'Competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol biosynthesis, upregulating LDL receptors.',
    dosageForms: ['Tablet'],
    routes: ['Oral'],
    availableStrengths: ['10 mg', '20 mg', '40 mg', '80 mg'],
    indications: ['Primary Hyperlipidemia', 'Atherosclerotic Cardiovascular Disease (ASCVD) Prevention', 'Acute Coronary Syndrome'],
    absoluteContraindications: ['Active Liver Disease', 'Unexplained Persistent Transaminase Elevation', 'Pregnancy & Breastfeeding'],
    relativeContraindications: ['Concomitant Strong CYP3A4 Inhibitors', 'Heavy Alcohol Use', 'Pre-existing Myopathy'],
    blackBoxWarnings: 'Rhabdomyolysis risk with acute renal failure secondary to myoglobinuria when co-administered with certain gemfibrozil or macrolides.',
    sideEffectsCommon: ['Myalgia', 'Diarrhea', 'Arthralgia', 'Nasopharyngitis'],
    sideEffectsSerious: ['Rhabdomyolysis', 'Immune-Mediated Necrotizing Myopathy (IMNM)', 'Severe Hepatotoxicity'],
    adverseReactionRisk: 'Elevated CK > 10x ULN indicates acute myotoxicity.',
    interactions: [
      { targetName: 'Grapefruit Juice (>1L/day)', targetType: 'Food', severity: 'MAJOR', mechanism: 'Inhibits intestinal CYP3A4, dramatically elevating plasma atorvastatin levels.', clinicalAction: 'Advise patient to avoid large volumes of grapefruit juice.' },
      { targetName: 'Clarithromycin / Ketoconazole', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Potent CYP3A4 inhibition increases statin AUC by 4.5-fold.', clinicalAction: 'Limit atorvastatin dose to max 20 mg or select rosuvastatin.' },
      { targetName: 'Warfarin', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Mild prolongation of Prothrombin Time (PT/INR).', clinicalAction: 'Monitor INR when initiating or changing atorvastatin dose.' },
      { targetName: 'Active Hepatic Cirrhosis', targetType: 'Disease', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Severe impairment of hepatic clearance leading to systemic drug accumulation.', clinicalAction: 'Contraindicated; do not prescribe.' }
    ],
    adme: {
      absorption: 'Rapid; Tmax in 1-2 hours',
      bioavailability: '14% (extensive first-pass extraction)',
      distribution: 'Vd ~ 381 Liters; highly tissue bound',
      proteinBinding: '≥ 98% bound to plasma albumin',
      metabolism: 'Extensively metabolized by CYP3A4 to active ortho- and parahydroxylated metabolites',
      excretion: 'Eliminated primarily in bile (biliary/fecal > 98%); renal elimination < 2%',
      halfLife: '14 hours (active metabolite inhibitory activity half-life: 20-30 hours)',
      therapeuticWindow: '2.0 - 20.0 ng/mL',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'X',
    lactationSafety: 'Contraindicated; potential serious adverse reactions in nursing infants.',
    pediatricDosingRule: '10 mg once daily (children ≥10 years with HeFH); max 20 mg/day.',
    geriatricBeersWarning: 'Caution in patients ≥75 years regarding myopathy and polypharmacy interactions.',
    renalAdjustmentGFR: 'No dose adjustment required in mild to severe renal impairment.',
    hepaticAdjustment: 'Contraindicated in active liver disease or transaminases ≥ 3x ULN.',
    legalStatus: 'Prescription-Only (Rx)',
    isHighAlert: false,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C (68°F to 77°F). Protect from moisture.',
    inventoryStock: 420,
    batchNumber: 'LOT-ATOR-8941B',
    expiryDate: '2027-11-30',
    isRecallOrAlert: false,
    barcodeGS1: '010030069001021721008941B17271130',
    atoms3D: {
      atoms: [
        { element: 'C', x: 0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'C', x: 1.4, y: 0.2, z: 0, color: '#38bdf8' },
        { element: 'N', x: 2.1, y: 1.4, z: 0.3, color: '#818cf8' },
        { element: 'C', x: 1.2, y: 2.4, z: 0.5, color: '#38bdf8' },
        { element: 'C', x: -0.1, y: 1.8, z: 0.3, color: '#38bdf8' },
        { element: 'F', x: 3.5, y: 1.6, z: 0.1, color: '#34d399' },
        { element: 'O', x: -1.2, y: 2.6, z: 0.6, color: '#f43f5e' },
        { element: 'O', x: 2.2, y: -0.9, z: -0.2, color: '#f43f5e' },
        { element: 'C', x: -1.3, y: -0.7, z: -0.3, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [2, 5], [4, 6], [1, 7], [0, 8]]
    }
  },

  {
    id: 'drug-amoxicillin-clav',
    genericName: 'Amoxicillin / Clavulanate Potassium',
    brandNames: ['Augmentin', 'Clavam', 'Curam'],
    alphabetLetter: 'A',
    drugClass: 'Aminopenicillin + Beta-Lactamase Inhibitor',
    therapeuticCategory: 'Infectious Disease / Antibiotics',
    chemicalName: '(2S,5R,6R)-6-[[(2R)-2-amino-2-(4-hydroxyphenyl)acetyl]amino]-3,3-dimethyl-7-oxo-4-thia-1-azabicyclo[3.2.0]heptane-2-carboxylic acid + potassium (Z)-(2R,5R)-3-(2-hydroxyethylidene)-7-oxo-4-oxa-1-azabicyclo[3.2.0]heptane-2-carboxylate',
    molecularFormula: 'C16H19N3O5S • C8H8KNO5',
    molecularWeight: 597.68,
    smilesNotation: 'CC1(C(N2C(S1)C(C2=O)NC(=O)C(C3=CC=C(C=C3)O)N)C(=O)O)C.C1C(=C/CO)/C2N(C1=O)C(C(=O)[O-])O2.[K+]',
    mechanismOfAction: 'Amoxicillin inhibits bacterial cell wall peptidoglycan synthesis; Clavulanate irreversibly inactivates bacterial beta-lactamase enzymes, preventing amoxicillin degradation.',
    dosageForms: ['Tablet', 'Suspension', 'Injection (IV/IM/SC)'],
    routes: ['Oral', 'Intravenous (IV)'],
    availableStrengths: ['500/125 mg', '875/125 mg', '1000/62.5 mg XR', '400/57 mg/5mL'],
    indications: ['Acute Bacterial Sinusitis', 'Community-Acquired Pneumonia', 'Skin & Soft Tissue Infections', 'Bite Wounds', 'Complicated UTI'],
    absoluteContraindications: ['Severe Immediate Type I Hypersensitivity to Penicillins/Cephalosporins', 'History of Amoxicillin/Clavulanate-Associated Cholestatic Jaundice/Hepatic Dysfunction'],
    relativeContraindications: ['Infectious Mononucleosis (high risk of erythematous maculopapular rash)', 'Renal Impairment (GFR < 30 mL/min)'],
    blackBoxWarnings: 'Do not use for ordinary viral infections (common cold/flu) to prevent emergence of antimicrobial-resistant superbugs (Antibiotic Stewardship).',
    sideEffectsCommon: ['Diarrhea / Loose Stools', 'Nausea / Vomiting', 'Candidiasis / Diaper Rash'],
    sideEffectsSerious: ['Clostridioides difficile-Associated Colitis', 'Anaphylaxis', 'Stevens-Johnson Syndrome (SJS)', 'Cholestatic Jaundice'],
    adverseReactionRisk: 'Severe watery diarrhea with fever warrants immediate C. diff PCR assay.',
    interactions: [
      { targetName: 'Methotrexate', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Penicillins reduce renal tubular clearance of methotrexate, increasing hematologic toxicity.', clinicalAction: 'Monitor serum methotrexate levels; dose reduction required.' },
      { targetName: 'Warfarin / Oral Anticoagulants', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Alteration of intestinal flora decreases vitamin K synthesis, prolonging INR.', clinicalAction: 'Perform frequent INR checks during antibacterial course.' },
      { targetName: 'Probenecid', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Decreases renal tubular excretion of amoxicillin, producing elevated and prolonged blood levels.', clinicalAction: 'Dose adjustment may be needed.' },
      { targetName: 'Penicillin Allergy', targetType: 'Disease', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'IgE-mediated degranulation causing fatal anaphylactic bronchospasm/circulatory shock.', clinicalAction: 'Contraindicated; substitute with Azithromycin or Doxycycline.' }
    ],
    adme: {
      absorption: 'Rapid and well absorbed; food enhances clavulanate absorption and reduces GI distress',
      bioavailability: 'Amoxicillin ~ 70-90%; Clavulanate ~ 60-70%',
      distribution: 'Diffuses readily into tissues, pleural fluid, peritoneal fluid; poor CSF penetration unless inflamed meninges',
      proteinBinding: 'Amoxicillin ~ 18%; Clavulanate ~ 25%',
      metabolism: 'Amoxicillin excreted mostly unchanged; Clavulanate undergoes hepatic degradation ~ 50%',
      excretion: 'Primary renal excretion (amoxicillin 50-70% in active form in first 6h)',
      halfLife: '1.0 - 1.3 hours in healthy adults (prolonged in renal failure)',
      therapeuticWindow: 'Broad safety margin',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'B',
    lactationSafety: 'Compatible with breastfeeding; small amounts excreted into breast milk (monitor infant for loose stools/diaper candidiasis).',
    pediatricDosingRule: '25-45 mg/kg/day divided q12h (or 80-90 mg/kg/day in high-dose otitis media regimens).',
    geriatricBeersWarning: 'Monitor renal clearance (eGFR) and adjust dosing interval in age-related renal decline.',
    renalAdjustmentGFR: 'eGFR 10-30 mL/min: 500/125 mg q12h; eGFR < 10 mL/min: 500/125 mg q24h; Hemodialysis: 500/125 mg after session.',
    hepaticAdjustment: 'Use with caution; monitor liver enzymes periodically.',
    legalStatus: 'Prescription-Only (Rx)',
    isHighAlert: false,
    isColdChain: false,
    storageRequirement: 'Tablets: Store at 20°C-25°C. Reconstituted Liquid Suspension: MUST REFRIGERATE at 2°C-8°C; discard after 10 days.',
    inventoryStock: 850,
    batchNumber: 'LOT-AMOX-7712A',
    expiryDate: '2026-09-15',
    isRecallOrAlert: false,
    barcodeGS1: '010030093101011821007712A17260915',
    atoms3D: {
      atoms: [
        { element: 'C', x: -1.0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'S', x: 0.5, y: -0.8, z: 0.2, color: '#facc15' },
        { element: 'C', x: 1.8, y: 0.2, z: 0, color: '#38bdf8' },
        { element: 'N', x: 0.8, y: 1.3, z: -0.2, color: '#818cf8' },
        { element: 'C', x: -0.4, y: 1.1, z: -0.1, color: '#38bdf8' },
        { element: 'O', x: -1.1, y: 2.1, z: -0.3, color: '#f43f5e' },
        { element: 'O', x: 2.9, y: 0.8, z: -0.1, color: '#f43f5e' },
        { element: 'N', x: -2.1, y: -0.8, z: 0.1, color: '#818cf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [4, 5], [2, 6], [0, 7]]
    }
  },

  // --- B ---
  {
    id: 'drug-bisoprolol',
    genericName: 'Bisoprolol Fumarate',
    brandNames: ['Zebeta', 'Concor', 'Biso-Card'],
    alphabetLetter: 'B',
    drugClass: 'Cardioselective Beta-1 Adrenergic Receptor Blocker',
    therapeuticCategory: 'Cardiovascular / Heart Failure & Antihypertensive',
    chemicalName: '(2RS)-1-(4-{[2-(1-methylethoxy)ethoxy]methyl}phenoxy)-3-[(1-methylethyl)amino]propan-2-ol fumarate',
    molecularFormula: '(C18H31NO4)2 • C4H4O4',
    molecularWeight: 766.96,
    smilesNotation: 'CC(C)NC[C@H](COC1=CC=C(C=C1)COCCOCC(C)C)O.OC(=O)/C=C/C(=O)O',
    mechanismOfAction: 'Selectively antagonizes Beta-1 adrenergic receptors in cardiac myocytes, decreasing chronotropy (heart rate), inotropy (contractility), and renal renin secretion.',
    dosageForms: ['Tablet'],
    routes: ['Oral'],
    availableStrengths: ['2.5 mg', '5 mg', '10 mg'],
    indications: ['Chronic Heart Failure (NYHA Class II-IV)', 'Essential Hypertension', 'Angina Pectoris', 'Post-MI Cardioprotection'],
    absoluteContraindications: ['Cardiogenic Shock', 'Severe Sinus Bradycardia (HR < 45 bpm)', 'Second or Third-Degree AV Block without Pacemaker', 'Sick Sinus Syndrome', 'Decompensated Acute Heart Failure'],
    relativeContraindications: ['Severe Asthma / Bronchospasm', 'Severe Peripheral Arterial Occlusive Disease', 'Raynaud Phenomenon'],
    blackBoxWarnings: 'Do not abruptly discontinue; sudden cessation can precipitate severe myocardial ischemia, ventricular arrhythmias, or rebound acute MI.',
    sideEffectsCommon: ['Bradycardia', 'Fatigue / Dizziness', 'Cold Extremities', 'Hypotension'],
    sideEffectsSerious: ['Severe Heart Block / Asystole', 'Acute Bronchospasm', 'Heart Failure Exacerbation', 'Masked Hypoglycemia Symptoms in Diabetics'],
    adverseReactionRisk: 'Heart rate < 45 bpm or PR interval > 0.24s indicates excessive beta blockade.',
    interactions: [
      { targetName: 'Diltiazem / Verapamil (Non-DHP CCBs)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Synergistic negative inotropic and dromotropic depression causing complete AV block and acute circulatory collapse.', clinicalAction: 'Do not combine IV/oral non-DHP CCBs with beta blockers.' },
      { targetName: 'Digoxin', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Additive slowing of AV nodal conduction time.', clinicalAction: 'Monitor ECG and serum digoxin levels.' },
      { targetName: 'Insulin / Sulfonylureas', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Masks adrenergic warning signs of hypoglycemia (tachycardia, tremors). Diaphoresis remains.', clinicalAction: 'Educate diabetic patients to recognize diaphoresis as hypoglycemia symptom.' },
      { targetName: 'Severe Asthma / COPD', targetType: 'Disease', severity: 'MAJOR', mechanism: 'Even cardioselective beta blockers can induce bronchospasm at higher doses.', clinicalAction: 'Use lowest effective dose or switch to alternative cardiovascular agent.' }
    ],
    adme: {
      absorption: 'Almost completely absorbed (> 90%)',
      bioavailability: '~ 80% (low first-pass metabolism)',
      distribution: 'Moderate distribution; Vd ~ 3.5 L/kg',
      proteinBinding: 'Approx 30% bound to plasma proteins',
      metabolism: 'Hepatic ~ 50% via CYP3A4 and CYP2D6 to inactive metabolites',
      excretion: 'Balanced 50/50 elimination: 50% excreted unchanged by kidneys, 50% hepatic metabolites',
      halfLife: '10 - 12 hours (allows true once-daily dosing)',
      therapeuticWindow: '10 - 100 ng/mL',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'C',
    lactationSafety: 'Caution advised; potential for neonatal bradycardia and hypoglycemia.',
    pediatricDosingRule: 'Not formally established for pediatrics (specialist pediatric cardiology titration only).',
    geriatricBeersWarning: 'High risk of bradycardia, orthostatic falls, and syncope; start at lowest 1.25-2.5 mg dose.',
    renalAdjustmentGFR: 'eGFR < 40 mL/min: Max dose 10 mg/day; eGFR < 20 mL/min: Max dose 5 mg/day.',
    hepaticAdjustment: 'Severe hepatic impairment: Max dose 5-10 mg/day.',
    legalStatus: 'Prescription-Only (Rx)',
    isHighAlert: false,
    isColdChain: false,
    storageRequirement: 'Store at 20°C-25°C in tight, light-resistant container.',
    inventoryStock: 310,
    batchNumber: 'LOT-BISO-9014K',
    expiryDate: '2027-04-30',
    isRecallOrAlert: false,
    barcodeGS1: '010030078201011921009014K17270430',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'O', x: -0.7, y: 0.4, z: 0.1, color: '#f43f5e' },
        { element: 'C', x: 0.4, y: -0.3, z: 0, color: '#38bdf8' },
        { element: 'C', x: 1.6, y: 0.5, z: -0.1, color: '#38bdf8' },
        { element: 'O', x: 1.5, y: 1.9, z: 0.2, color: '#f43f5e' },
        { element: 'C', x: 2.9, y: -0.2, z: 0, color: '#38bdf8' },
        { element: 'N', x: 4.1, y: 0.6, z: -0.1, color: '#818cf8' },
        { element: 'C', x: 5.4, y: -0.1, z: 0, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [6, 7]]
    }
  },

  // --- E (Emergency & Antidotes) ---
  {
    id: 'drug-epinephrine',
    genericName: 'Epinephrine (Adrenaline)',
    brandNames: ['EpiPen', 'Adrenalin', 'Auvi-Q', 'Adrenaclick'],
    alphabetLetter: 'E',
    drugClass: 'Direct-Acting Sympathomimetic Alpha/Beta Agonist',
    therapeuticCategory: 'Emergency Critical Care / Resuscitation & Anaphylaxis',
    chemicalName: '4-[(1R)-1-hydroxy-2-(methylamino)ethyl]benzene-1,2-diol',
    molecularFormula: 'C9H13NO3',
    molecularWeight: 183.20,
    smilesNotation: 'CNC[C@H](C1=CC(=C(C=C1)O)O)O',
    mechanismOfAction: 'Stimulates Alpha-1 receptors (vasoconstriction, reverses mucosal edema/hypotension), Beta-1 receptors (positive inotropy & chronotropy), and Beta-2 receptors (potent bronchial smooth muscle dilation & inhibition of mast cell mediator release).',
    dosageForms: ['Injection (IV/IM/SC)', 'Nebulizer Solution', 'Auto-Injector'],
    routes: ['Intramuscular (IM)', 'Intravenous (IV)', 'Subcutaneous (SC)', 'Inhaled'],
    availableStrengths: ['0.3 mg / 0.3 mL (1:1,000)', '0.15 mg / 0.15 mL Jr (1:2,000)', '1 mg / 10 mL (1:10,000 IV Cardiac)'],
    indications: ['Anaphylaxis (First-Line Gold Standard)', 'Cardiac Arrest (VF/pVT, Asystole, PEA)', 'Severe Refractory Bradycardia / Septic Shock', 'Croup (Racemic Nebulization)'],
    absoluteContraindications: ['NO ABSOLUTE CONTRAINDICATIONS IN ANAPHYLAXIS OR CARDIAC ARREST LIFE-THREATENING EMERGENCIES.'],
    relativeContraindications: ['Narrow-Angle Glaucoma', 'Severe Coronary Artery Disease', 'Labor / Obstetric Emergencies (unless maternal resuscitation)'],
    blackBoxWarnings: '⚠️ HIGH-ALERT EMERGENCY MEDICATION. Do not inject 1:1,000 strength intravenously without dilution (risk of fatal cerebrovascular hemorrhage or ventricular fibrillation). Use IM anterolateral thigh for anaphylaxis.',
    sideEffectsCommon: ['Tachycardia / Palpitations', 'Tremor / Anxiety', 'Pallor / Sweating', 'Headache / Dizziness'],
    sideEffectsSerious: ['Ventricular Arrhythmias / V-Tach', 'Acute Myocardial Infarction', 'Severe Hypertensive Crisis', 'Intracranial Hemorrhage', 'Tissue Necrosis at Injection Site'],
    adverseReactionRisk: 'Persistent hypertension and chest pain require continuous 12-lead ECG telemetry monitoring.',
    interactions: [
      { targetName: 'Non-Selective Beta Blockers (Propranolol)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Blocks beta-2 vasodilation leaving unopposed alpha-1 vasoconstriction, causing catastrophic malignant hypertension and reflex bradycardia.', clinicalAction: 'Use Glucagon (1-5 mg IV) as first-line in beta-blocked anaphylaxis patients.' },
      { targetName: 'Tricyclic Antidepressants (TCAs)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'TCAs inhibit catecholamine reuptake, potently exaggerating pressor response.', clinicalAction: 'Reduce epinephrine infusion dose and monitor arterial blood pressure.' },
      { targetName: 'Digoxin / Halogenated Anesthetics', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Sensitizes myocardium to catecholamines, increasing risk of fatal ventricular dysrhythmias.', clinicalAction: 'Maintain continuous defibrillator standby.' },
      { targetName: 'Pheochromocytoma', targetType: 'Disease', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Triggers catastrophic catecholamine surge and fatal hypertensive encephalopathy.', clinicalAction: 'Contraindicated except in cardiac arrest.' }
    ],
    adme: {
      absorption: 'Rapid after IM injection into anterolateral thigh (vastus lateralis peak in 8 mins vs 34 mins SC)',
      bioavailability: 'Inactive when administered orally due to rapid intestinal & hepatic metabolism by COMT and MAO',
      distribution: 'Crosses placenta; does not cross blood-brain barrier significantly',
      proteinBinding: 'Approx 50% bound to plasma proteins',
      metabolism: 'Rapidly metabolized in liver, nerve endings, and vascular endothelium by Catechol-O-methyltransferase (COMT) and Monoamine Oxidase (MAO)',
      excretion: 'Excreted in urine mainly as vanillylmandelic acid (VMA) and metanephrines (approx 95%)',
      halfLife: '2 - 3 minutes (ultra-short circulating plasma half-life)',
      therapeuticWindow: 'Titrated directly to clinical hemodynamic endpoint',
      narrowTherapeuticIndex: true
    },
    pregnancyCategory: 'C',
    lactationSafety: 'Safe in emergency resuscitation; minimal excretion in breast milk and degraded in infant GI tract.',
    pediatricDosingRule: 'Anaphylaxis: 0.01 mg/kg IM (1:1,000) max 0.3 mg (or Auvi-Q/EpiPen Jr 0.15 mg for 7.5-25 kg; 0.3 mg for >25 kg).',
    geriatricBeersWarning: 'Increased risk of myocardial ischemia and tachyarrhythmias; administer with continuous telemetry in elderly.',
    renalAdjustmentGFR: 'No dose adjustment required in acute emergency administration.',
    hepaticAdjustment: 'No dose adjustment in acute resuscitation.',
    legalStatus: 'Hospital-Only Emergency',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C (68°F to 77°F). DO NOT REFRIGERATE. Protect from light. Inspect solution: Discard if pink, brown, or contains precipitate.',
    inventoryStock: 140,
    batchNumber: 'LOT-EPI-0092X',
    expiryDate: '2026-12-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030045101011721000092X17261231',
    atoms3D: {
      atoms: [
        { element: 'C', x: -1.5, y: -0.8, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.2, y: -1.4, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.9, y: -0.6, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.8, y: 0.8, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.5, y: 1.4, z: 0, color: '#38bdf8' },
        { element: 'C', x: -1.6, y: 0.6, z: 0, color: '#38bdf8' },
        { element: 'O', x: -2.6, y: -1.5, z: 0, color: '#f43f5e' },
        { element: 'O', x: -0.1, y: -2.8, z: 0, color: '#f43f5e' },
        { element: 'C', x: 2.2, y: 1.6, z: 0.1, color: '#38bdf8' },
        { element: 'O', x: 2.2, y: 2.8, z: -0.6, color: '#f43f5e' },
        { element: 'C', x: 3.4, y: 0.8, z: 0, color: '#38bdf8' },
        { element: 'N', x: 4.6, y: 1.6, z: 0.2, color: '#818cf8' },
        { element: 'C', x: 5.8, y: 0.8, z: 0, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [1, 7], [3, 8], [8, 9], [8, 10], [10, 11], [11, 12]]
    }
  },

  // --- F ---
  {
    id: 'drug-fentanyl',
    genericName: 'Fentanyl Citrate',
    brandNames: ['Sublimaze', 'Duragesic', 'Actiq', 'Fentora'],
    alphabetLetter: 'F',
    drugClass: 'Synthetic Phenylpiperidine Opioid Agonist (Schedule II)',
    therapeuticCategory: 'Anesthesia / Analgesic & Critical Care Sedation',
    chemicalName: 'N-(1-phenethylpiperidin-4-yl)-N-phenylpropanamide citrate',
    molecularFormula: 'C22H28N2O • C6H8O7',
    molecularWeight: 528.59,
    smilesNotation: 'CCC(=O)N(C1CCN(CC1)CCC2=CC=CC=C2)C3=CC=CC=C3.C(C(=O)O)C(CC(=O)O)(C(=O)O)O',
    mechanismOfAction: 'Potent Mu-opioid receptor agonist (50-100x more potent than morphine); inhibits ascending nociceptive pathways, hyperpolarizing neuronal membranes via G-protein coupled inward-rectifying K+ channels.',
    dosageForms: ['Injection (IV/IM/SC)', 'Transdermal Patch', 'Lozenges', 'Nasal Spray'],
    routes: ['Intravenous (IV)', 'Transdermal', 'Sublingual / Buccal', 'Intramuscular (IM)'],
    availableStrengths: ['50 mcg/mL (2 mL, 5 mL, 20 mL IV)', '12 mcg/hr, 25 mcg/hr, 50 mcg/hr Patch', '200 mcg, 400 mcg Lozenge'],
    indications: ['Preoperative Anesthesia Induction & Maintenance', 'Postoperative Severe Pain', 'Intubated ICU Patient Analgesia & Sedation', 'Breakthrough Cancer Pain'],
    absoluteContraindications: ['Severe Respiratory Depression without Mechanical Ventilation', 'Acute or Severe Bronchial Asthma in Unmonitored Setting', 'Known Opioid Hypersensitivity', 'Paralytic Ileus'],
    relativeContraindications: ['Increased Intracranial Pressure / Head Injury', 'Severe Bradycardia', 'Hepatic or Renal Failure'],
    blackBoxWarnings: '⚠️ HIGH-ALERT CONTROLLED MEDICINE (Schedule II). Risk of fatal respiratory depression, abuse, addiction, and diversion. Concomitant use with benzodiazepines or alcohol causes profound sedation, coma, and death. Antidote: Naloxone IV.',
    sideEffectsCommon: ['Sedation / Drowsiness', 'Constipation', 'Nausea / Vomiting', 'Miosis (Pinpoint Pupils)', 'Dizziness'],
    sideEffectsSerious: ['Fatal Respiratory Arrest', 'Thoracic Muscle Rigidity (Wooden Chest Syndrome)', 'Severe Bradycardia / Hypotension', 'Serotonin Syndrome (with SSRIs/MAOIs)'],
    adverseReactionRisk: 'Respiratory rate < 8 breaths/min with somnolence requires immediate Naloxone 0.4 mg IV.',
    interactions: [
      { targetName: 'Benzodiazepines (Midazolam / Diazepam)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Synergistic central nervous system and respiratory drive depression leading to fatal apnea and anoxic brain injury.', clinicalAction: 'Avoid combination unless mechanically ventilated with capnography monitoring.' },
      { targetName: 'CYP3A4 Inhibitors (Ritonavir / Ketoconazole)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Inhibits fentanyl clearance, precipitating prolonged opioid overdose toxidrome.', clinicalAction: 'Reduce fentanyl dose by 50-75% and monitor end-tidal CO2.' },
      { targetName: 'MAO Inhibitors (Phenelzine / Linezolid)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Potentiates severe serotonin toxicity, rigidity, autonomic instability, and hyperthermia.', clinicalAction: 'Contraindicated within 14 days of MAOIs.' },
      { targetName: 'Severe Traumatic Brain Injury', targetType: 'Disease', severity: 'MAJOR', mechanism: 'Opioid-induced CO2 retention causes cerebral vasodilation and dangerously spikes ICP.', clinicalAction: 'Ensure strict mechanical hyperventilation control.' }
    ],
    adme: {
      absorption: 'Rapid IV onset (1-2 mins); Transdermal patch depot releases steadily over 72 hours (peak at 24-72h)',
      bioavailability: 'IV 100%; Transdermal 92%; Oral transmucosal 50%',
      distribution: 'Highly lipophilic; rapid redistribution from brain/heart to muscle and fat; Vd ~ 4.0 L/kg',
      proteinBinding: '80 - 85% bound primarily to alpha-1-acid glycoprotein and albumin',
      metabolism: 'Extensively hepatic via CYP3A4 N-dealkylation to inactive norfentanyl',
      excretion: 'Mainly excreted in urine (75%, mostly metabolites; <10% unchanged) and feces (9%)',
      halfLife: 'IV elimination half-life: 2 - 4 hours (context-sensitive half-time increases markedly after prolonged infusions)',
      therapeuticWindow: '1.0 - 3.0 ng/mL (analgesia); > 5.0 ng/mL (respiratory depression)',
      narrowTherapeuticIndex: true
    },
    pregnancyCategory: 'C',
    lactationSafety: 'Excreted in breast milk; observe infant for respiratory depression and lethargy.',
    pediatricDosingRule: '1 - 2 mcg/kg IV slow push over 3-5 mins (pediatric ICU / anesthesiologist use only).',
    geriatricBeersWarning: 'Extreme sensitivity to opioid-induced sedation, delirium, respiratory depression, and severe falls.',
    renalAdjustmentGFR: 'eGFR < 50 mL/min: Reduce dose by 25%; eGFR < 10 mL/min: Reduce dose by 50%.',
    hepaticAdjustment: 'Reduce dose by 25-50% in severe cirrhosis due to reduced CYP3A4 clearance.',
    legalStatus: 'Controlled Substance (Schedule II/IV)',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 20°C-25°C. Secure in Double-Locked Controlled Substance Vault with mandatory perpetual inventory audit log.',
    inventoryStock: 75,
    batchNumber: 'LOT-FENT-4481S',
    expiryDate: '2027-08-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030089101011521004481S17270831',
    atoms3D: {
      atoms: [
        { element: 'C', x: -3.0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'C', x: -2.0, y: 1.0, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.6, y: 0.6, z: 0, color: '#38bdf8' },
        { element: 'N', x: 0.4, y: 1.4, z: 0.1, color: '#818cf8' },
        { element: 'C', x: 1.8, y: 0.8, z: 0, color: '#38bdf8' },
        { element: 'C', x: 2.8, y: 1.6, z: 0, color: '#38bdf8' },
        { element: 'N', x: 4.1, y: 1.0, z: -0.1, color: '#818cf8' },
        { element: 'C', x: 4.4, y: -0.4, z: 0, color: '#38bdf8' },
        { element: 'O', x: 3.5, y: -1.3, z: 0.1, color: '#f43f5e' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]]
    }
  },

  // --- H (High-Alert Anticoagulant) ---
  {
    id: 'drug-heparin-sodium',
    genericName: 'Heparin Sodium',
    brandNames: ['Hepalean', 'Liquaemin', 'Calciparine'],
    alphabetLetter: 'H',
    drugClass: 'Unfractionated Glycosaminoglycan Anticoagulant',
    therapeuticCategory: 'Hematology / Antithrombotic & Critical Anticoagulation',
    chemicalName: 'Sulfated polysaccharide polymer of alternating D-glucosamine and uronic acid residues',
    molecularFormula: '(C12H19NO20S3)n',
    molecularWeight: 15000, // avg 12,000 - 15,000 Da
    smilesNotation: 'OS(=O)(=O)OC1C(OC(C(O)C1OS(=O)(=O)O)C(=O)O)NC(=O)C',
    mechanismOfAction: 'Binds reversibly to Antithrombin III (AT-III), inducing a conformational change that accelerates AT-III inactivation of Thrombin (Factor IIa) and Factor Xa by 1,000-fold, preventing fibrin clot formation.',
    dosageForms: ['Injection (IV/IM/SC)', 'Infusion'],
    routes: ['Intravenous (IV)', 'Subcutaneous (SC)'],
    availableStrengths: ['1,000 units/mL', '5,000 units/mL', '25,000 units/250 mL IV D5W/Saline'],
    indications: ['Acute Coronary Syndrome / STEMI & NSTEMI', 'Pulmonary Embolism (PE) & Deep Vein Thrombosis (DVT)', 'Cardiopulmonary Bypass & Vascular Surgery', 'Hemodialysis Circuit Anticoagulation'],
    absoluteContraindications: ['Severe Uncontrolled Active Bleeding', 'History of Heparin-Induced Thrombocytopenia (HIT Type II)', 'Severe Thrombocytopenia (Platelets < 50,000/uL)', 'Suspected Intracranial or Spinal Hemorrhage'],
    relativeContraindications: ['Recent Major Surgery (Eye, Brain, Spinal Cord)', 'Bacterial Endocarditis', 'Severe Uncontrolled Hypertension (BP > 180/110)'],
    blackBoxWarnings: '⚠️ HIGH-ALERT MEDICATION. Epidural/spinal hematomas and permanent paralysis can occur in patients receiving neuraxial anesthesia while anticoagulated. Monitor aPTT / Anti-Xa levels closely. Antidote: Protamine Sulfate.',
    sideEffectsCommon: ['Minor Bleeding (Gums, Injection Sites, Bruising)', 'Injection Site Hematoma', 'Mild Elevated Liver Transaminases'],
    sideEffectsSerious: ['Major Life-Threatening Hemorrhage (GI, Retroperitoneal, Intracranial)', 'Heparin-Induced Thrombocytopenia & Thrombosis (HITT)', 'Osteoporosis (Long-Term Use >3 months)'],
    adverseReactionRisk: 'A 50% drop in baseline platelet count within 5-10 days of heparin exposure indicates HIT Type II.',
    interactions: [
      { targetName: 'Antiplatelets (Aspirin, Clopidogrel) / NSAIDs', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Additive inhibition of platelet aggregation and thrombin dramatically elevates major hemorrhagic risk.', clinicalAction: 'Monitor hematocrit and stool occult blood; use lowest effective doses.' },
      { targetName: 'Thrombolytics (Alteplase / Tenecteplase)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Profound simultaneous systemic fibrinolysis and anticoagulation.', clinicalAction: 'Follow precise weight-based ICU acute stroke/MI titration protocols.' },
      { targetName: 'Protamine Sulfate', targetType: 'Drug', severity: 'MINOR', mechanism: 'Direct chemical neutralization: Strong polycationic protamine binds polyanionic heparin 1:1, neutralizing anticoagulant activity.', clinicalAction: 'Administer 1 mg protamine per 100 units heparin for acute reversal.' },
      { targetName: 'Active Peptic Ulcer Disease', targetType: 'Disease', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'High risk of massive, uncontrollable upper gastrointestinal hemorrhage.', clinicalAction: 'Contraindicated; stabilize ulcer prior to systemic anticoagulation.' }
    ],
    adme: {
      absorption: 'Immediate onset with IV bolus (20-30 mins onset with SC injection)',
      bioavailability: 'IV 100%; SC 30% at low doses up to 70% at high doses',
      distribution: 'Does not cross placenta or enter breast milk; restricted mainly to vascular compartment; Vd ~ 0.06 L/kg',
      proteinBinding: 'Extensively bound to low-density lipoproteins, globulins, and fibrinogen',
      metabolism: 'Reticuloendothelial system (cellular uptake) and hepatic degradation via heparinase',
      excretion: 'Small fraction excreted unchanged in urine at therapeutic doses',
      halfLife: '30 - 90 minutes (dose-dependent: 30 mins at 25 u/kg; 150 mins at 400 u/kg)',
      therapeuticWindow: 'Target aPTT 1.5 - 2.5x control (approx 60 - 80 seconds) or Anti-Xa 0.3 - 0.7 units/mL',
      narrowTherapeuticIndex: true
    },
    pregnancyCategory: 'C',
    lactationSafety: 'Safe during lactation; high molecular weight prevents excretion into maternal breast milk.',
    pediatricDosingRule: 'Loading dose 75 units/kg IV over 10 mins, then maintenance 28 units/kg/hr (<1 yr) or 20 units/kg/hr (>1 yr); titrate to aPTT.',
    geriatricBeersWarning: 'Elderly women (>60 years) have significantly increased bleeding risk; monitor aPTT every 6 hours.',
    renalAdjustmentGFR: 'Heparin is metabolized primarily by RES; no routine dose reduction needed in renal failure, but monitor aPTT closely.',
    hepaticAdjustment: 'Prolonged half-life in hepatic cirrhosis; monitor aPTT closely.',
    legalStatus: 'Hospital-Only Emergency',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 20°C-25°C. Do not freeze.',
    inventoryStock: 530,
    batchNumber: 'LOT-HEP-1190R',
    expiryDate: '2027-02-28',
    isRecallOrAlert: false,
    barcodeGS1: '010030056101011621001190R17270228',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.2, y: 0, z: 0, color: '#38bdf8' },
        { element: 'O', x: -1.2, y: 0.8, z: 0.1, color: '#f43f5e' },
        { element: 'C', x: 0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'O', x: 0.2, y: -1.4, z: -0.1, color: '#f43f5e' },
        { element: 'S', x: 1.6, y: -1.8, z: 0, color: '#facc15' },
        { element: 'O', x: 2.6, y: -0.8, z: 0.2, color: '#f43f5e' },
        { element: 'C', x: 1.2, y: 0.8, z: 0.1, color: '#38bdf8' },
        { element: 'N', x: 2.3, y: 0.2, z: -0.2, color: '#818cf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6], [6, 7]]
    }
  },

  // --- I (High-Alert Insulin) ---
  {
    id: 'drug-insulin-regular',
    genericName: 'Human Regular Insulin',
    brandNames: ['Humulin R', 'Novolin R', 'Actrapid'],
    alphabetLetter: 'I',
    drugClass: 'Short-Acting Recombinant Human Insulin Hormone',
    therapeuticCategory: 'Endocrinology / Diabetes Mellitus & Critical Glycemic Control',
    chemicalName: 'Recombinant human 51-amino-acid peptide (A-chain 21 AA, B-chain 30 AA linked by 2 interchain disulfide bonds)',
    molecularFormula: 'C257H383N65O77S6',
    molecularWeight: 5807.57,
    smilesNotation: 'CC(C)CC(C(=O)NC(CC1=CC=C(C=C1)O)C(=O)NC(CC(=O)N)C(=O)O)NC(=O)C',
    mechanismOfAction: 'Binds to cell surface Insulin Tyrosine Kinase Receptors, triggering intracellular phosphorylation cascades that translocate GLUT4 glucose transporters to cell membranes, facilitating rapid glucose influx into skeletal muscle and adipose tissue while suppressing hepatic gluconeogenesis.',
    dosageForms: ['Injection (IV/IM/SC)', 'Infusion'],
    routes: ['Subcutaneous (SC)', 'Intravenous (IV)', 'Intramuscular (IM)'],
    availableStrengths: ['100 units/mL (U-100 10 mL Vial)', '500 units/mL (U-500 Concentrated)'],
    indications: ['Type 1 & Type 2 Diabetes Mellitus', 'Diabetic Ketoacidosis (DKA - IV Infusion)', 'Hyperosmolar Hyperglycemic State (HHS)', 'Severe Hyperkalemia (with IV Dextrose 50%)', 'Critical Care Sliding Scale Glycemic Protocol'],
    absoluteContraindications: ['Acute Hypoglycemia (Blood Glucose < 70 mg/dL)', 'Known Hypersensitivity to Human Insulin Formulation'],
    relativeContraindications: ['Hypokalemia (Insulin shifts potassium intracellularly, worsening hypokalemia)', 'Severe Renal Failure (decreased insulin clearance)'],
    blackBoxWarnings: '⚠️ HIGH-ALERT MEDICATION. Severe hypoglycemia and hypokalemia risk. Dosing errors (especially confusing U-100 vs U-500) can cause fatal neuroglycopenia, irreversible brain damage, or cardiac arrest. Requires mandatory dual-nurse bedside verification.',
    sideEffectsCommon: ['Mild Hypoglycemia (Sweating, Shakiness, Hunger, Palpitations)', 'Injection Site Lipohypertrophy', 'Local Erythema / Pruritus'],
    sideEffectsSerious: ['Severe Hypoglycemic Coma / Seizures', 'Fatal Hypokalemic Cardiac Arrhythmias', 'Anaphylactic Angioedema'],
    adverseReactionRisk: 'Blood glucose < 54 mg/dL requires immediate IV Dextrose 50% (25g D50W) or Glucagon 1 mg IM.',
    interactions: [
      { targetName: 'Beta Blockers (Metoprolol / Propranolol)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Masks sympathoadrenal hypoglycemia symptoms (tachycardia, tremor) and impairs gluconeogenesis recovery.', clinicalAction: 'Educate patient to monitor blood glucose frequently; sweating remains an unmasked sign.' },
      { targetName: 'Fluoroquinolones (Levofloxacin)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Causes unpredictable, severe dysglycemia (both profound hypoglycemia and hyperosmolar spikes).', clinicalAction: 'Monitor capillary blood glucose Q4H.' },
      { targetName: 'Oral Antidiabetics (Sulfonylureas / SGLT2i)', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Additive glucose-lowering potency.', clinicalAction: 'Titrate insulin dose carefully when initiating combination therapy.' },
      { targetName: 'Severe Hypokalemia (Serum K+ < 3.3 mEq/L)', targetType: 'Disease', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Insulin drives potassium into cells, triggering fatal ventricular tachycardia or cardiac standstill.', clinicalAction: 'Replete potassium to > 3.3 mEq/L before starting insulin infusion in DKA.' }
    ],
    adme: {
      absorption: 'SC onset 30 mins, peak effect 2-4 hours, duration 6-8 hours; IV onset IMMEDIATE, peak 15-30 mins, duration 30-60 mins',
      bioavailability: 'IV 100%; SC ~ 55-75%',
      distribution: 'Distributed throughout extracellular fluid; minimal CSF penetration; Vd ~ 0.05 - 0.1 L/kg',
      proteinBinding: 'Negligible in circulation',
      metabolism: 'Rapid hepatic degradation (~50%) via insulinase / glutathione-insulin transhydrogenase; renal tubular catabolism (~30%)',
      excretion: 'Excreted as degraded peptide fragments; negligible intact insulin in urine',
      halfLife: 'IV elimination half-life: 4 - 6 minutes; SC terminal half-life: ~ 1.5 hours due to depot absorption',
      therapeuticWindow: 'Titrated strictly to target blood glucose (140 - 180 mg/dL in ICU; 80 - 130 mg/dL fasting)',
      narrowTherapeuticIndex: true
    },
    pregnancyCategory: 'B',
    lactationSafety: 'Safe in breastfeeding; human insulin does not pass into breast milk in significant amounts and is destroyed in infant digestive tract.',
    pediatricDosingRule: 'DKA protocol: 0.05 - 0.1 units/kg/hr continuous IV infusion without initial bolus.',
    geriatricBeersWarning: 'Avoid sliding scale insulin as sole therapy due to high risk of severe hypoglycemia and falls.',
    renalAdjustmentGFR: 'eGFR 10-50 mL/min: Reduce dose by 25%; eGFR < 10 mL/min: Reduce dose by 50% due to reduced renal clearance.',
    hepaticAdjustment: 'Reduced insulin clearance in severe cirrhosis; titrate carefully with frequent glucose checks.',
    legalStatus: 'OTC (Over-The-Counter) / Rx',
    isHighAlert: true,
    isColdChain: true,
    storageRequirement: '❄️ COLD-CHAIN MEDICATION: Store unopened vials refrigerated at 2°C to 8°C (36°F to 46°F). DO NOT FREEZE. In-use open vials may be kept at room temperature (up to 25°C/77°F) for up to 28 days; discard thereafter.',
    inventoryStock: 260,
    batchNumber: 'LOT-INS-9920C',
    expiryDate: '2026-10-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030023101011421009920C17261031',
    atoms3D: {
      atoms: [
        { element: 'C', x: -1.2, y: -0.6, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0, y: 0.2, z: 0, color: '#38bdf8' },
        { element: 'N', x: 1.2, y: -0.4, z: 0.1, color: '#818cf8' },
        { element: 'C', x: 2.4, y: 0.3, z: 0, color: '#38bdf8' },
        { element: 'O', x: 2.4, y: 1.5, z: -0.2, color: '#f43f5e' },
        { element: 'C', x: 3.6, y: -0.5, z: 0.1, color: '#38bdf8' },
        { element: 'S', x: 4.8, y: 0.6, z: -0.1, color: '#facc15' },
        { element: 'S', x: 6.0, y: -0.4, z: 0, color: '#facc15' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [6, 7]]
    }
  },

  // --- N (Naloxone Antidote) ---
  {
    id: 'drug-naloxone',
    genericName: 'Naloxone Hydrochloride',
    brandNames: ['Narcan', 'Kloxxado', 'Evzio'],
    alphabetLetter: 'N',
    drugClass: 'Pure Competitive Opioid Receptor Antagonist',
    therapeuticCategory: 'Toxicology / Emergency Antidote & Opioid Overdose Reversal',
    chemicalName: '(4R,4aS,7aR,12bS)-4a,9-dihydroxy-3-prop-2-enyl-2,4,5,6,7a,13-hexahydro-1H-4,12-methanobenzofuro[3,2-e]isoquinolin-7-one hydrochloride',
    molecularFormula: 'C19H21NO4 • HCl',
    molecularWeight: 363.84,
    smilesNotation: 'C=CCN1CCC23C4C1CC5=C2C(=C(C=C5)O)OC3C(=O)CCC4(O)O.Cl',
    mechanismOfAction: 'Pure competitive antagonist at Mu, Kappa, and Delta opioid receptors with highest affinity at the Mu receptor; rapidly displaces opioid agonists, reversing opioid-induced respiratory depression, sedation, and coma within 1-2 minutes.',
    dosageForms: ['Injection (IV/IM/SC)', 'Nasal Spray', 'Auto-Injector'],
    routes: ['Intravenous (IV)', 'Nasal', 'Intramuscular (IM)', 'Subcutaneous (SC)'],
    availableStrengths: ['0.4 mg/mL, 1 mg/mL IV/IM', '4 mg / 0.1 mL, 8 mg Nasal Spray (Narcan)'],
    indications: ['Acute Opioid Overdose (Heroin, Fentanyl, Oxycodone, Methadone)', 'Complete or Partial Reversal of Opioid Depression Post-Surgery', 'Diagnosis of Suspected Acute Opioid Dependence / Overdose'],
    absoluteContraindications: ['Known Hypersensitivity to Naloxone Hydrochloride.'],
    relativeContraindications: ['Pre-existing Cardiovascular Disease (risk of catecholamine surge, pulmonary edema, ventricular tachycardia)', 'Severe Physical Opioid Dependence (precipitates acute withdrawal syndrome)'],
    blackBoxWarnings: 'Precipitates acute opioid withdrawal syndrome (agitation, nausea, vomiting, tachycardia, diaphoresis). Caution: Half-life of naloxone (30-90 min) is shorter than many opioids (fentanyl, methadone); patient can slip back into fatal respiratory arrest. Monitor for minimum 2-4 hours.',
    sideEffectsCommon: ['Acute Withdrawal Symptoms', 'Agitation / Anxiety', 'Nausea / Vomiting', 'Tachycardia / Sweating'],
    sideEffectsSerious: ['Noncardiogenic Pulmonary Edema', 'Severe Ventricular Tachycardia / V-Fib', 'Hypertensive Crisis', 'Seizures'],
    adverseReactionRisk: 'Recurrent hypoventilation requires repeat naloxone bolus or continuous IV infusion.',
    interactions: [
      { targetName: 'Opioid Analgesics (Morphine, Fentanyl, Oxycodone)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Completely antagonizes and blocks opioid therapeutic and toxic effects.', clinicalAction: 'Titrate in small increments (0.04 - 0.1 mg IV) if goal is reversing respiratory depression while preserving partial analgesia.' },
      { targetName: 'Cardiovascular Disease / Beta Agonists', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Abrupt reversal induces massive sympathetic discharge resulting in acute pulmonary edema.', clinicalAction: 'Monitor hemodynamics and oxygen saturation.' },
      { targetName: 'Buprenorphine', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Buprenorphine binds Mu receptors with high affinity; higher doses of naloxone (e.g. 2-4 mg IV) may be required for displacement.', clinicalAction: 'Administer higher repeat doses under continuous capnography.' }
    ],
    adme: {
      absorption: 'IV onset 1-2 minutes; Nasal / IM onset 2-5 minutes; Ineffective orally due to near-complete (>95%) first-pass hepatic metabolism',
      bioavailability: 'IV 100%; Intranasal ~ 47-54%; Oral < 2%',
      distribution: 'Rapidly distributed into body tissues; crosses blood-brain barrier readily; Vd ~ 1.8 - 3.0 L/kg',
      proteinBinding: 'Approx 45-54% bound mainly to albumin',
      metabolism: 'Rapid hepatic glucuronidation to naloxone-3-glucuronide via UGT2B7',
      excretion: 'Excreted in urine (70% within 72 hours as metabolites)',
      halfLife: '30 - 90 minutes (significantly shorter than most long-acting opioids)',
      therapeuticWindow: 'Titrated directly to adequate spontaneous respiratory drive (RR > 12 bpm)',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'B',
    lactationSafety: 'Compatible; minimal oral bioavailability in infant.',
    pediatricDosingRule: '0.01 mg/kg IV/IM initial dose; if no response within 2-3 mins, give 0.1 mg/kg.',
    geriatricBeersWarning: 'Caution regarding sudden surge in systemic vascular resistance and myocardial oxygen demand upon awakening.',
    renalAdjustmentGFR: 'No dose adjustment required in acute overdose resuscitation.',
    hepaticAdjustment: 'Prolonged half-life in hepatic failure; titrate to respiratory response.',
    legalStatus: 'OTC (Over-The-Counter) / Rx',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 15°C to 25°C (59°F to 77°F). Protect from light and freezing.',
    inventoryStock: 190,
    batchNumber: 'LOT-NALOX-5519E',
    expiryDate: '2027-06-30',
    isRecallOrAlert: false,
    barcodeGS1: '010030012101011321005519E17270630',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.0, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.8, y: -1.2, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.4, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.4, y: 0.9, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.8, y: 1.6, z: 0, color: '#38bdf8' },
        { element: 'C', x: -2.0, y: 0.9, z: 0, color: '#38bdf8' },
        { element: 'O', x: 1.5, y: 1.6, z: 0.1, color: '#f43f5e' },
        { element: 'N', x: 2.6, y: -0.2, z: -0.1, color: '#818cf8' },
        { element: 'C', x: 3.8, y: 0.6, z: 0, color: '#38bdf8' },
        { element: 'C', x: 5.0, y: -0.1, z: 0, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [3, 6], [2, 7], [7, 8], [8, 9]]
    }
  },

  // --- W (High-Alert Oral Anticoagulant) ---
  {
    id: 'drug-warfarin',
    genericName: 'Warfarin Sodium',
    brandNames: ['Coumadin', 'Jantoven', 'Marevan'],
    alphabetLetter: 'W',
    drugClass: 'Vitamin K Epoxide Reductase Complex 1 (VKORC1) Inhibitor',
    therapeuticCategory: 'Hematology / Oral Vitamin K Antagonist Anticoagulation',
    chemicalName: 'Sodium (RS)-2-oxo-3-(3-oxo-1-phenylbutyl)-chromen-4-olate',
    molecularFormula: 'C19H15NaO4',
    molecularWeight: 330.31,
    smilesNotation: 'CC(=O)CC(C1=CC=CC=C1)C2=C(C3=CC=CC=C3OC2=O)[O-].[Na+]',
    mechanismOfAction: 'Inhibits Vitamin K Epoxide Reductase (VKORC1), blocking conversion of vitamin K epoxide to active reduced vitamin K hydroquinone, depleting functional coagulation Factors II (Prothrombin), VII, IX, and X, as well as anticoagulant Proteins C and S.',
    dosageForms: ['Tablet'],
    routes: ['Oral'],
    availableStrengths: ['1 mg (Pink)', '2 mg (Lavender)', '2.5 mg (Green)', '3 mg (Tan)', '4 mg (Blue)', '5 mg (Peach)', '6 mg (Teal)', '7.5 mg (Yellow)', '10 mg (White)'],
    indications: ['Atrial Fibrillation (Stroke Prevention)', 'Prosthetic Mechanical Heart Valves', 'Deep Vein Thrombosis & Pulmonary Embolism Treatment & Secondary Prophylaxis', 'Post-Myocardial Infarction Clot Prevention'],
    absoluteContraindications: ['Pregnancy (Teratogen: Fetal Warfarin Syndrome & Fatal Hemorrhage)', 'Severe Uncontrolled Bleeding / Hemorrhagic Diathesis', 'Recent or Contemplated Lumbar Puncture, Spinal Anesthesia, or Major Cranial/Ocular Surgery', 'Malignant Hypertension'],
    relativeContraindications: ['High Fall Risk / Severe Dementia', 'Active Peptic Ulcer Disease', 'Severe Hepatic Impairment', 'Non-Adherent INR Monitoring'],
    blackBoxWarnings: '⚠️ HIGH-ALERT MEDICATION. Major or fatal bleeding risk. Regular monitoring of International Normalized Ratio (INR) is mandatory (Target INR 2.0 - 3.0 for AFib/VTE; 2.5 - 3.5 for mechanical mitral valves). Multiple drug, food, and herbal interactions.',
    sideEffectsCommon: ['Minor Bleeding (Epistaxis, Hematuria, Bruising)', 'Alopecia', 'Nausea / Abdominal Cramps'],
    sideEffectsSerious: ['Fatal Major Hemorrhage (Intracranial, Gastrointestinal)', 'Warfarin-Induced Skin Necrosis (Early Protein C Depletion)', 'Purple Toe Syndrome (Cholesterol Microembolization)'],
    adverseReactionRisk: 'INR > 4.5 without bleeding requires withholding warfarin and oral Vitamin K1 (Phytonadione 1-2.5 mg). INR > 10 or major bleeding requires 4-Factor Prothrombin Complex Concentrate (4F-PCC / Kcentra) + IV Vitamin K 10 mg.',
    interactions: [
      { targetName: 'Vitamin K Rich Foods (Spinach, Kale, Broccoli, Green Tea)', targetType: 'Food', severity: 'MAJOR', mechanism: 'Dietary vitamin K bypasses VKORC1 inhibition, directly antagonizing warfarin effect and dropping INR.', clinicalAction: 'Maintain a consistent daily dietary vitamin K intake rather than avoiding green vegetables entirely.' },
      { targetName: 'NSAIDs (Ibuprofen, Naproxen) / Aspirin', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Synergistic gastric mucosal ulceration and platelet COX-1 inhibition exponentially increases fatal GI hemorrhage risk.', clinicalAction: 'Avoid NSAIDs; use Acetaminophen (short-term) for mild analgesia.' },
      { targetName: 'Amiodarone / Metronidazole / Fluconazole', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Potent inhibition of CYP2C9 (metabolizer of potent S-warfarin) leads to toxic accumulation and acute INR spikes > 8.0.', clinicalAction: 'Empirically reduce warfarin dose by 30-50% and monitor INR within 3 days.' },
      { targetName: 'St. John’s Wort / Carbamazepine / Rifampin', targetType: 'Herbal', severity: 'MAJOR', mechanism: 'Induces CYP2C9 and CYP3A4, accelerating warfarin breakdown and causing subtherapeutic failure / ischemic stroke.', clinicalAction: 'Avoid herbal inducers; monitor INR closely.' }
    ],
    adme: {
      absorption: 'Essentially completely absorbed from GI tract (> 95%)',
      bioavailability: 'Approx 100%',
      distribution: 'Small volume of distribution; Vd ~ 0.14 L/kg (mostly plasma bound)',
      proteinBinding: '99% bound primarily to plasma albumin',
      metabolism: 'Stereoselective hepatic metabolism: S-enantiomer (5x more potent) metabolized by CYP2C9; R-enantiomer metabolized by CYP1A2 and CYP3A4',
      excretion: 'Negligible unchanged drug; 92% excreted in urine as hydroxylated and conjugated metabolites',
      halfLife: 'Mean 36 - 42 hours (S-warfarin: 29 hours; R-warfarin: 45 hours)',
      therapeuticWindow: 'Narrow Therapeutic Index: Target INR 2.0 - 3.0 (or 2.5 - 3.5)',
      narrowTherapeuticIndex: true
    },
    pregnancyCategory: 'X',
    lactationSafety: 'Compatible with breastfeeding; warfarin is not excreted into maternal breast milk in significant amounts and does not alter infant prothrombin time.',
    pediatricDosingRule: 'Initial dose 0.1 - 0.2 mg/kg orally once daily; titrate based on pediatric INR protocol.',
    geriatricBeersWarning: 'High risk of severe bleeding, cognitive confusion, and drug-drug interactions; use lowest starting dose (2-2.5 mg).',
    renalAdjustmentGFR: 'No direct dose adjustment required, but severe renal impairment increases bleeding risk.',
    hepaticAdjustment: 'Reduced clotting factor synthesis in cirrhosis; starting dose should be decreased and INR monitored closely.',
    legalStatus: 'Prescription-Only (Rx)',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C (68°F to 77°F). Protect from light and moisture.',
    inventoryStock: 380,
    batchNumber: 'LOT-WARF-6623W',
    expiryDate: '2027-10-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030034101011221006623W17271031',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.5, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -1.3, y: -1.2, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.1, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0, y: 0.9, z: 0, color: '#38bdf8' },
        { element: 'O', x: -1.1, y: 1.6, z: 0.1, color: '#f43f5e' },
        { element: 'C', x: -2.3, y: 0.9, z: 0, color: '#38bdf8' },
        { element: 'O', x: -3.4, y: 1.6, z: 0.1, color: '#f43f5e' },
        { element: 'C', x: 1.2, y: 1.7, z: 0, color: '#38bdf8' },
        { element: 'O', x: 1.1, y: 2.9, z: 0.2, color: '#f43f5e' },
        { element: 'C', x: 2.5, y: 0.9, z: -0.1, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [5, 6], [3, 7], [7, 8], [7, 9]]
    }
  }
];

/* =========================================================================
   2. POISONING & EMERGENCY ANTIDOTE REGISTRY (NOVA TOX)
   ========================================================================= */

export const POISONING_ANTIDOTE_REGISTRY: PoisoningAntidoteRecord[] = [
  {
    id: 'antidote-opioid',
    toxinName: 'Opioid Toxicity / Overdose (Fentanyl, Heroin, Morphine, Oxycodone)',
    exposureCategory: 'Medication Overdose',
    ghsHazardSymbol: 'Toxic ☠️',
    clinicalSymptoms: ['Pinpoint Miosis', 'Severe Bradypnea / Apnea (RR < 8)', 'Unresponsive Stupor / Coma', 'Cyanosis', 'Bradycardia'],
    primaryAntidote: 'Naloxone Hydrochloride (Narcan)',
    antidoteDoseProtocol: '0.4 - 2.0 mg IV/IM/SC or 4.0 mg Intranasal. Repeat every 2-3 minutes until spontaneous ventilation is restored. Continuous infusion (2/3 of awakening dose/hr) if long-acting opioid.',
    mechanismOfNeutralization: 'High-affinity pure competitive antagonist displacing opioids from Mu, Kappa, and Delta receptors.',
    hospitalUnitRequired: 'Emergency Department / ICU Telemetry (Minimum 4-hour observation)',
    poisonControlCode: 'TOX-OPIOID-911'
  },
  {
    id: 'antidote-apap',
    toxinName: 'Acetaminophen / Paracetamol Toxicity (APAP > 150 mg/kg)',
    exposureCategory: 'Medication Overdose',
    ghsHazardSymbol: 'Toxic ☠️',
    clinicalSymptoms: ['Early: Asymptomatic / Anorexia / Nausea', 'Late (48-72h): RUQ Pain, Jaundice, Encephalopathy, Fulminant Hepatic Failure'],
    primaryAntidote: 'N-Acetylcysteine (NAC / Acetadote)',
    antidoteDoseProtocol: 'IV Protocol (21-hr 3-bag regimen): Loading 150 mg/kg over 1h, then 50 mg/kg over 4h, then 100 mg/kg over 16h. Or Oral Protocol (72h): 140 mg/kg load, then 70 mg/kg Q4H x 17 doses.',
    mechanismOfNeutralization: 'Replenishes hepatic glutathione stores and acts as a glutathione substitute, directly detoxifying toxic electrophilic metabolite NAPQI.',
    hospitalUnitRequired: 'Medical Intensive Care Unit (MICU) / Hepatology Service',
    poisonControlCode: 'TOX-APAP-204'
  },
  {
    id: 'antidote-organophosphate',
    toxinName: 'Organophosphate & Carbamate Pesticides (Sarin, Malathion, Chlorpyrifos)',
    exposureCategory: 'Pesticide / Organophosphate',
    ghsHazardSymbol: 'Toxic ☠️',
    clinicalSymptoms: ['SLUDGEM Toxidrome: Salivation, Lacrimation, Urination, Defecation, GI Cramps, Emesis, Miosis, Bronchorrhea, Fasciculations'],
    primaryAntidote: 'Atropine Sulfate + Pralidoxime Chloride (2-PAM)',
    antidoteDoseProtocol: 'Atropine: 2 - 5 mg IV every 5-10 mins doubled until pulmonary secretions are dry. 2-PAM: 1 - 2 g IV over 30 mins, then infusion 500 mg/hr.',
    mechanismOfNeutralization: 'Atropine competitively blocks muscarinic receptors to stop bronchosecretions; 2-PAM reactivates phosphorylated acetylcholinesterase before aging occurs.',
    hospitalUnitRequired: 'Resuscitation Bay / Toxic Chemical Decontamination Unit',
    poisonControlCode: 'TOX-ORGANO-309'
  },
  {
    id: 'antidote-digoxin',
    toxinName: 'Digoxin / Cardiac Glycoside Toxicity (Serum Level > 2.0 ng/mL or Foxglove)',
    exposureCategory: 'Medication Overdose',
    ghsHazardSymbol: 'Toxic ☠️',
    clinicalSymptoms: ['Yellow-Green Xanthopsia / Halos', 'Bidirectional V-Tach', 'Severe Hyperkalemia (K+ > 5.5)', 'Nausea', 'AV Block'],
    primaryAntidote: 'Digoxin Immune Fab (DigiFab / Digibind)',
    antidoteDoseProtocol: 'Acute unknown ingestion: 10 - 20 vials (400 - 800 mg) IV. Known serum level: Number of vials = (Serum Digoxin [ng/mL] x Weight [kg]) / 100.',
    mechanismOfNeutralization: 'Fab immunoglobulin fragments bind directly to free intravascular digoxin, sequestering it and excreting it renally.',
    hospitalUnitRequired: 'Cardiac Intensive Care Unit (CICU)',
    poisonControlCode: 'TOX-DIGI-812'
  },
  {
    id: 'antidote-cyanide',
    toxinName: 'Cyanide Toxicity (Structure Fire Smoke Inhalation, Sodium Nitroprusside)',
    exposureCategory: 'Toxic Gas / Chemical',
    ghsHazardSymbol: 'Toxic ☠️',
    clinicalSymptoms: ['Bitter Almond Breath Odor', 'Severe Lactic Acidosis (> 10 mmol/L)', 'Bright Red Venous Blood', 'Coma / Cardiopulmonary Collapse'],
    primaryAntidote: 'Hydroxocobalamin (Cyanokit)',
    antidoteDoseProtocol: '5.0 g IV infusion over 15 minutes (a second 5.0 g dose may be given if severe).',
    mechanismOfNeutralization: 'Cobalt ion of hydroxocobalamin binds cyanide with high affinity, forming non-toxic cyanocobalamin (Vitamin B12), excreted in urine.',
    hospitalUnitRequired: 'Burn & Trauma Resuscitation Center',
    poisonControlCode: 'TOX-CYAN-100'
  },
  {
    id: 'antidote-anticoag-warfarin',
    toxinName: 'Warfarin Coagulopathy / Major Bleeding (INR > 10.0 or Life-Threatening Bleed)',
    exposureCategory: 'Medication Overdose',
    ghsHazardSymbol: 'Biohazard ☣️',
    clinicalSymptoms: ['Intracranial Hemorrhage', 'Massive GI Hemorrhage', 'Gross Hematuria', 'Hematoma Spreading', 'Profound INR Elevation'],
    primaryAntidote: '4-Factor Prothrombin Complex Concentrate (4F-PCC / Kcentra) + IV Vitamin K1 (Phytonadione)',
    antidoteDoseProtocol: '4F-PCC: 25 - 50 units/kg IV based on pre-treatment INR + Vitamin K1 10 mg slow IV in 50 mL saline over 30 mins.',
    mechanismOfNeutralization: '4F-PCC provides immediate functional replacement of Factors II, VII, IX, X, while Vitamin K1 restores endogenous hepatic synthesis.',
    hospitalUnitRequired: 'Neurotrauma ICU / Emergency Hematology',
    poisonControlCode: 'TOX-WARFARIN-REV'
  }
];

/* =========================================================================
   3. BATCH VERIFICATION & COUNTERFEIT DETECTION LOGS (NOVA VERIFY)
   ========================================================================= */

export const BATCH_VERIFICATION_RECORDS: BatchVerificationReport[] = [
  {
    barcodeScanned: '010030069001021721008941B17271130',
    ndcOrBatch: 'NDC 0071-0156-23 / LOT-ATOR-8941B',
    drugName: 'Atorvastatin Calcium 20 mg Tablets',
    manufacturer: 'Pfizer Pharmaceuticals Global LLC',
    manufactureDate: '2024-11-01',
    expiryDate: '2027-11-30',
    tamperSealVerified: true,
    blockchainHash: '0x8f2a9918bc3d201948ae10d2c76c5f654119a6af',
    status: 'AUTHENTIC_VERIFIED',
    safetyNotice: 'Verified Authentic. GS1 serial signature matched manufacturer master database.'
  },
  {
    barcodeScanned: '01003009999999999999FAKEBATCH2026',
    ndcOrBatch: 'UNREGISTERED-LOT-OZEM-6610X',
    drugName: 'Semaglutide 2 mg/3 mL Injection (Pre-filled Pen)',
    manufacturer: 'Unlicensed Third-Party Facility (Counterfeit Flag)',
    manufactureDate: '2024-06-10',
    expiryDate: '2026-06-10',
    tamperSealVerified: false,
    blockchainHash: '0x00000000000INVALIDHASH0000000000000000',
    status: 'COUNTERFEIT_DETECTED',
    safetyNotice: '⚠️ CRITICAL ALERT: FAKE PACKAGING DETECTED. Failed cryptographic token handshake. Quarantine medication immediately.'
  },
  {
    barcodeScanned: '010030045101011721000092X17261231',
    ndcOrBatch: 'NDC 49502-500-02 / LOT-EPI-0092X',
    drugName: 'Epinephrine Auto-Injector 0.3 mg (EpiPen)',
    manufacturer: 'Mylan Specialty L.P.',
    manufactureDate: '2024-12-01',
    expiryDate: '2026-12-31',
    tamperSealVerified: true,
    blockchainHash: '0x4d8a1c9e88ef220198ac12398402948201984210',
    status: 'AUTHENTIC_VERIFIED',
    safetyNotice: 'Authentic. Verified temperature-protected stock with valid sensor records.'
  }
];

/* =========================================================================
   4. ADVERSE DRUG REACTION (ADR) PHARMACOVIGILANCE AUDIT (NOVA ADR)
   ========================================================================= */

export const PHARMACOVIGILANCE_REPORTS: ADRSubmissionRecord[] = [
  {
    id: 'adr-rep-001',
    patientId: 'p203',
    patientName: 'Robert Vance',
    suspectedDrug: 'Ceftriaxone IV',
    adverseEvent: 'Acute Urticarial Rash & Wheezing 15 minutes post-infusion',
    severityGrade: 'Moderate (Grade 2)',
    onsetTime: '15 minutes',
    outcome: 'Resolved',
    reportedBy: 'Nurse Jessica Hayes, RN (ICU)',
    dateReported: '2026-08-23 18:30',
    pharmacovigilanceStatus: 'Submitted to FDA MedWatch / WHO Vigibase'
  },
  {
    id: 'adr-rep-002',
    patientId: 'p182',
    patientName: 'Priya Sharma',
    suspectedDrug: 'Atorvastatin 80 mg',
    adverseEvent: 'Severe Bilateral Quadriceps Myalgia with Serum CK 1,240 U/L',
    severityGrade: 'Severe (Grade 3)',
    onsetTime: '14 days post initiation',
    outcome: 'Recovering',
    reportedBy: 'Dr. Sarah Lin, MD (Attending)',
    dateReported: '2026-08-22 14:15',
    pharmacovigilanceStatus: 'Under Signal Review'
  }
];

/* =========================================================================
   5. COLD-CHAIN TELEMETRY & VACCINE STORAGE AUDIT (NOVA STOCK)
   ========================================================================= */

export const COLD_CHAIN_UNITS: ColdChainLog[] = [
  {
    unitId: 'CC-FRIDGE-01',
    storageUnitName: 'Hospital Pharmacy Vaccine & Biologics Refrigerator A',
    targetTempRange: '2.0°C - 8.0°C',
    currentTemp: 3.8,
    status: 'OPTIMAL',
    timestamp: 'Live Sensor Telemetry (Synced 2s ago)',
    activeVaccinesStored: ['Human Regular Insulin U-100', 'Inactivated Influenza Vaccine', 'mRNA COVID-19 Vaccine', 'MMR Live Attenuated'],
    backupGeneratorActive: true
  },
  {
    unitId: 'CC-FRIDGE-02',
    storageUnitName: 'ICU Critical Monoclonal & Emergency Antidote Chiller B',
    targetTempRange: '2.0°C - 8.0°C',
    currentTemp: 4.2,
    status: 'OPTIMAL',
    timestamp: 'Live Sensor Telemetry (Synced 5s ago)',
    activeVaccinesStored: ['Digoxin Immune Fab', 'Recombinant Alteplase (tPA)', 'Pembrolizumab (Keytruda)', 'Trastuzumab'],
    backupGeneratorActive: true
  },
  {
    unitId: 'CC-FREEZER-03',
    storageUnitName: 'Ultracold Blood Bank & Plasma Storage Unit',
    targetTempRange: '-25.0°C to -15.0°C',
    currentTemp: -20.4,
    status: 'OPTIMAL',
    timestamp: 'Live Sensor Telemetry (Synced 1s ago)',
    activeVaccinesStored: ['Fresh Frozen Plasma (FFP)', 'Cryoprecipitate Antihemophilic Factor', 'Gene Therapy Vector Lots'],
    backupGeneratorActive: true
  }
];
