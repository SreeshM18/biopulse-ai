import { 
  MasterDrugRecord, 
  PoisoningAntidoteRecord, 
  BatchVerificationReport, 
  ADRSubmissionRecord, 
  ColdChainLog 
} from '../types/biotech';

/* =========================================================================
   1. MASTER PHARMACEUTICAL & SUBSTANCE DATABASE (COMPREHENSIVE MULTI-SPECIALTY)
   ========================================================================= */

export const MASTER_DRUG_DATABASE: MasterDrugRecord[] = [
  // --- CARDIOVASCULAR & LIPID-LOWERING ---
  {
    id: 'drug-atorvastatin',
    genericName: 'Atorvastatin Calcium',
    brandNames: ['Lipitor', 'Atorva', 'Storvas'],
    alphabetLetter: 'A',
    drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
    therapeuticCategory: 'Cardiovascular / Lipid-Lowering',
    substanceCategory: 'Prescription',
    visualRiskTier: 'PRESCRIPTION',
    chemicalName: '(3R,5R)-7-[2-(4-fluorophenyl)-3-phenyl-4-(phenylcarbamoyl)-5-propan-2-ylpyrrol-1-yl]-3,5-dihydroxyheptanoic acid',
    molecularFormula: 'C33H35FN2O5',
    molecularWeight: 558.64,
    smilesNotation: 'CC(C)C1=C(C(=C(N1CCC(CC(CC(=O)O)O)O)C2=CC=C(C=C2)F)C3=CC=CC=C3)C(=O)NC4=CC=CC=C4',
    mechanismOfAction: 'Competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol biosynthesis, upregulating hepatic LDL receptors.',
    dosageForms: ['Tablets'],
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
    legalStatus: 'Prescription',
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
    id: 'drug-lisinopril',
    genericName: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril'],
    alphabetLetter: 'L',
    drugClass: 'Angiotensin-Converting Enzyme (ACE) Inhibitor',
    therapeuticCategory: 'Cardiovascular / Hypertension & Heart Failure',
    substanceCategory: 'Prescription',
    visualRiskTier: 'PRESCRIPTION',
    chemicalName: '(2S)-1-[(2S)-6-amino-2-[[(1S)-1-carboxy-3-phenylpropyl]amino]hexanoyl]pyrrolidine-2-carboxylic acid',
    molecularFormula: 'C21H31N3O5',
    molecularWeight: 405.49,
    smilesNotation: 'NCCCC[C@H](NC(CCC1=CC=CC=C1)C(=O)O)C(=O)N2CCC[C@H]2C(=O)O',
    mechanismOfAction: 'Suppresses the Renin-Angiotensin-Aldosterone System (RAAS) by inhibiting ACE, preventing conversion of Angiotensin I to Angiotensin II, causing systemic vasodilation and reduced aldosterone secretion.',
    dosageForms: ['Tablets', 'Oral solutions'],
    routes: ['Oral'],
    availableStrengths: ['2.5 mg', '5 mg', '10 mg', '20 mg', '40 mg'],
    indications: ['Essential Hypertension', 'Heart Failure with Reduced Ejection Fraction (HFrEF)', 'Acute Myocardial Infarction Survival Improvement', 'Diabetic Nephropathy'],
    absoluteContraindications: ['History of ACE-Inhibitor Induced Angioedema', 'Concomitant Aliskiren in Diabetics', 'Pregnancy (Black Box Fetal Toxicity)'],
    relativeContraindications: ['Bilateral Renal Artery Stenosis', 'Pre-existing Hyperkalemia (K+ > 5.0 mEq/L)', 'Severe Aortic Stenosis'],
    blackBoxWarnings: '⚠️ FETAL TOXICITY: Drugs that act directly on the renin-angiotensin system can cause injury and death to the developing fetus. Discontinue immediately when pregnancy is detected.',
    sideEffectsCommon: ['Dry Chronic Cough (Bradykinin Accumulation)', 'Dizziness / Orthostasis', 'Hyperkalemia', 'Headache'],
    sideEffectsSerious: ['Life-Threatening Airway Angioedema', 'Acute Renal Failure', 'Severe Hypotensive Shock'],
    adverseReactionRisk: 'Lip, tongue, or pharyngeal swelling requires immediate emergency airway protection and epinephrine.',
    interactions: [
      { targetName: 'Potassium Supplements / Spironolactone', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Synergistic potassium retention precipitating fatal cardiac arrhythmias.', clinicalAction: 'Monitor serum potassium frequently.' },
      { targetName: 'NSAIDs (Ibuprofen, Naproxen)', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Inhibits vasodilatory renal prostaglandins, triggering acute renal insufficiency and blunting antihypertensive effect.', clinicalAction: 'Avoid chronic NSAIDs; monitor eGFR.' }
    ],
    adme: {
      absorption: 'Incomplete from GI tract (~25% bioavailable); unaffected by food',
      bioavailability: 'Approx 25%',
      distribution: 'Does not bind to other plasma proteins besides circulating ACE',
      proteinBinding: 'Negligible',
      metabolism: 'Not metabolized by liver; excreted 100% unchanged',
      excretion: '100% renal elimination',
      halfLife: '12 hours (effective accumulation half-life)',
      therapeuticWindow: 'Titrated directly to blood pressure endpoint (<130/80 mmHg)',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'D',
    lactationSafety: 'Not recommended; alternative antihypertensives (Enalapril) preferred in nursing mothers.',
    pediatricDosingRule: '0.07 mg/kg once daily (children ≥6 years, max initial 5 mg).',
    geriatricBeersWarning: 'High risk of orthostatic hypotension and hyperkalemia; start at 2.5-5 mg.',
    renalAdjustmentGFR: 'eGFR 10-30 mL/min: Initial 5 mg; eGFR < 10 mL/min: Initial 2.5 mg.',
    hepaticAdjustment: 'No hepatic metabolism; no adjustment needed in liver disease.',
    legalStatus: 'Prescription',
    isHighAlert: false,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C. Protect from moisture.',
    inventoryStock: 520,
    batchNumber: 'LOT-LISIN-1102A',
    expiryDate: '2027-08-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030045101011821001102A17270831',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'N', x: -0.8, y: 0.8, z: 0.1, color: '#818cf8' },
        { element: 'C', x: 0.4, y: 0, z: 0, color: '#38bdf8' },
        { element: 'O', x: 0.4, y: -1.2, z: 0, color: '#f43f5e' },
        { element: 'C', x: 1.8, y: 0.8, z: -0.1, color: '#38bdf8' },
        { element: 'O', x: 3.0, y: 0, z: 0, color: '#f43f5e' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]]
    }
  },

  // --- ANTIBIOTICS & INFECTIOUS DISEASE ---
  {
    id: 'drug-vancomycin-iv',
    genericName: 'Vancomycin Hydrochloride (IV)',
    brandNames: ['Vancocin', 'Firvanq'],
    alphabetLetter: 'V',
    drugClass: 'Glycopeptide Antibacterial Agent',
    therapeuticCategory: 'Infectious Disease / MRSA & Gram-Positive Antimicrobial',
    substanceCategory: 'Hospital-only',
    visualRiskTier: 'SPECIALIST_HOSPITAL',
    chemicalName: '(1S,2R,18R,19R,22S,25R,28R,40S)-22-(2-amino-2-oxoethyl)-5,15-dichloro-2,18,32,35,37-pentahydroxy-19-[[(2R,3R,4S,5S,6R)-3,4,5-trihydroxy-6-(hydroxymethyl)oxan-2-yl]oxy]-... vancomycin hydrochloride',
    molecularFormula: 'C66H75Cl2N9O24 • HCl',
    molecularWeight: 1485.71,
    smilesNotation: 'GLYCOPEPTIDE-COMPLEX-STRUCTURE',
    mechanismOfAction: 'Binds with high affinity to the D-alanyl-D-alanine terminus of cell wall peptidoglycan precursors, inhibiting cell wall synthesis and bacterial lysis in susceptible Gram-positive pathogens.',
    dosageForms: ['Injections', 'Infusions', 'Oral solutions', 'Capsules'],
    routes: ['Intravenous (IV)', 'Oral'],
    availableStrengths: ['500 mg, 1 g, 5 g IV Vials', '125 mg, 250 mg Oral Capsules (C. difficile only)'],
    indications: ['Methicillin-Resistant Staphylococcus aureus (MRSA) Bacteremia & Endocarditis', 'Severe Hospital-Acquired Pneumonia', 'Osteomyelitis & Joint Infections', 'Oral Vancomycin: Clostridioides difficile Colitis (non-absorbable)'],
    absoluteContraindications: ['Known Severe Hypersensitivity to Vancomycin'],
    relativeContraindications: ['Pre-existing Renal Impairment', 'Concomitant Nephrotoxic / Ototoxic Drugs (Aminoglycosides, Loop Diuretics)'],
    blackBoxWarnings: '⚠️ RAPID INFUSION RED MAN SYNDROME & NEPHROTOXICITY: Rapid IV infusion (<60 mins per 1000 mg) triggers non-IgE mast cell histamine degranulation causing profound flushing, erythematous rash, and hypotension. Therapeutic Drug Monitoring (TDM) mandatory (Target AUC24/MIC 400-600 or trough 15-20 mcg/mL).',
    sideEffectsCommon: ['Infusion-Related Flushing (Red Man Syndrome)', 'Phlebitis at IV Site', 'Nausea'],
    sideEffectsSerious: ['Nephrotoxicity / Acute Tubular Necrosis', 'Ototoxicity & Permanent Sensorineural Hearing Loss', 'Neutropenia / Thrombocytopenia', 'DRESS Syndrome'],
    adverseReactionRisk: 'Serum trough > 20 mcg/mL or sudden spike in creatinine requires holding dose and recalculating AUC-guided clearance.',
    interactions: [
      { targetName: 'Piperacillin/Tazobactam (Zosyn) / Aminoglycosides', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Synergistic acute tubular necrosis and dramatic increase in acute kidney injury.', clinicalAction: 'Monitor serum creatinine daily and calculate weight-based AUC.' },
      { targetName: 'Furosemide / Loop Diuretics', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Additive ototoxicity risk.', clinicalAction: 'Perform baseline audiometric checks during prolonged therapy.' }
    ],
    adme: {
      absorption: 'Negligible GI absorption when given orally (<5%, ideal for intraluminal C. diff treatment); 100% bioavailable via IV',
      bioavailability: 'IV 100%; Oral < 5%',
      distribution: 'Vd ~ 0.4 - 1.0 L/kg; diffuses into pleural, pericardial, and synovial fluids; poor CSF penetration without inflamed meninges',
      proteinBinding: 'Approx 50% bound to plasma albumin',
      metabolism: 'No significant hepatic metabolism',
      excretion: 'Excreted predominantly unchanged by glomerular filtration in kidneys (>85% in 24h)',
      halfLife: '4 - 6 hours in normal renal function (prolonged to 7-14 days in ESRD on hemodialysis)',
      therapeuticWindow: 'Target AUC/MIC 400 - 600 or Trough 15.0 - 20.0 mcg/mL for severe MRSA',
      narrowTherapeuticIndex: true
    },
    pregnancyCategory: 'C',
    lactationSafety: 'Excreted in breast milk; observe infant for GI flora changes and candidiasis.',
    pediatricDosingRule: '15 mg/kg IV Q6H or Q8H; titrate to serum trough levels.',
    geriatricBeersWarning: 'High risk of acute nephrotoxicity; calculate CrCl via Cockcroft-Gault and monitor troughs closely.',
    renalAdjustmentGFR: 'CrCl 30-50 mL/min: 15-20 mg/kg Q24H; CrCl < 30 mL/min: 15-20 mg/kg Q48H or dose-by-level post-HD.',
    hepaticAdjustment: 'No adjustment needed.',
    legalStatus: 'Hospital-only',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store vials at 20°C to 25°C. Reconstituted IV solution in D5W/Saline stable for 14 days refrigerated at 2°C to 8°C.',
    injectionProfile: {
      compatibleDiluents: ['0.9% Sodium Chloride (Normal Saline)', '5% Dextrose Injection (D5W)', 'Lactated Ringers'],
      incompatibleDiluents: ['Highly alkaline IV solutions'],
      ySiteCompatibleDrugs: ['Cefepime', 'Metronidazole', 'Potassium Chloride', 'Morphine'],
      ySiteIncompatibleDrugs: ['Piperacillin/Tazobactam', 'Heparin Sodium', 'Ceftriaxone', 'Dexamethasone'],
      lightProtectionRequired: false,
      filterRequirement: 'Standard infusion set.',
      maximumInfusionRate: 'Administer at a rate NOT exceeding 10 mg/min or 1 g over at least 60 minutes to prevent Red Man Syndrome.',
      vesicantOrIrritant: 'Irritant'
    },
    inventoryStock: 190,
    batchNumber: 'LOT-VANC-9901H',
    expiryDate: '2027-06-30',
    isRecallOrAlert: false,
    barcodeGS1: '010030076101011421009901H17270630',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.2, y: -0.6, z: 0, color: '#38bdf8' },
        { element: 'N', x: -1.0, y: 0.2, z: 0, color: '#818cf8' },
        { element: 'C', x: 0.4, y: -0.4, z: 0, color: '#38bdf8' },
        { element: 'O', x: 0.4, y: -1.6, z: 0, color: '#f43f5e' },
        { element: 'C', x: 1.6, y: 0.4, z: 0, color: '#38bdf8' },
        { element: 'Cl', x: 2.8, y: -0.5, z: 0.2, color: '#34d399' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]]
    }
  },

  // --- DIABETES & ENDOCRINOLOGY (INSULINS & GLP-1) ---
  {
    id: 'drug-semaglutide-glp1',
    genericName: 'Semaglutide',
    brandNames: ['Ozempic', 'Wegovy', 'Rybelsus'],
    alphabetLetter: 'S',
    drugClass: 'Glucagon-Like Peptide-1 (GLP-1) Receptor Agonist',
    therapeuticCategory: 'Endocrinology & Metabolism / Type 2 Diabetes & Obesity',
    substanceCategory: 'Prescription',
    visualRiskTier: 'PRESCRIPTION',
    chemicalName: 'Recombinant peptide GLP-1 analogue with Aib8, Arg34, and Lys26 linked to a C18 diacid spacer via PEG',
    molecularFormula: 'C187H291N45O59',
    molecularWeight: 4113.58,
    smilesNotation: 'PEPTIDE-GLP1-RECOMBINANT-SEQUENCE',
    mechanismOfAction: 'Selectively binds and activates the GLP-1 receptor, augmenting glucose-dependent insulin secretion, suppressing inappropriately elevated glucagon, slowing gastric emptying, and reducing central appetite in the hypothalamus.',
    dosageForms: ['Auto-injectors', 'Prefilled syringes', 'Tablets', 'Injections'],
    routes: ['Subcutaneous (SC)', 'Oral'],
    availableStrengths: ['0.25 mg, 0.5 mg, 1.0 mg, 2.0 mg SC Pen (Ozempic)', '2.4 mg SC Pen (Wegovy)', '3 mg, 7 mg, 14 mg Tablet (Rybelsus)'],
    indications: ['Type 2 Diabetes Mellitus Glycemic Control', 'Major Adverse Cardiovascular Event (MACE) Reduction in T2D & CVD', 'Chronic Weight Management / Obesity (BMI ≥ 30 or ≥ 27 with comorbidities)'],
    absoluteContraindications: [
      'Personal or Family History of Medullary Thyroid Carcinoma (MTC)',
      'Multiple Endocrine Neoplasia Syndrome Type 2 (MEN 2)',
      'Known Hypersensitivity to Semaglutide'
    ],
    relativeContraindications: ['History of Acute Pancreatitis', 'Severe Gastroparesis', 'Diabetic Retinopathy Complications'],
    blackBoxWarnings: '⚠️ RISK OF THYROID C-CELL TUMORS: Causes dose-dependent and treatment-duration-dependent thyroid C-cell tumors in rodents. Contraindicated in patients with a personal or family history of MTC or MEN 2.',
    sideEffectsCommon: ['Nausea & Vomiting', 'Diarrhea / Constipation', 'Abdominal Pain', 'Dyspepsia / Acid Reflux', 'Fatigue'],
    sideEffectsSerious: ['Acute Pancreatitis', 'Gallbladder Disease / Cholelithiasis', 'Acute Kidney Injury (secondary to volume depletion)', 'Worsening Diabetic Retinopathy', 'Hypoglycemia (when combined with insulin/sulfonylureas)'],
    adverseReactionRisk: 'Persistent severe abdominal pain radiating to the back warrants holding drug and checking serum lipase/amylase.',
    interactions: [
      { targetName: 'Insulin & Sulfonylureas (Glipizide, Glimepiride)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Increased risk of severe hypoglycemia due to augmented insulin action.', clinicalAction: 'Reduce insulin or sulfonylurea dose by 20-50% when initiating semaglutide.' },
      { targetName: 'Oral Medications (Delayed Gastric Emptying)', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Slows rate of gastric emptying, potentially altering absorption kinetics of narrow-therapeutic-index drugs.', clinicalAction: 'Monitor clinical effect of narrow therapeutic index oral drugs (e.g. Levothyroxine).' }
    ],
    adme: {
      absorption: 'SC absorption absolute bioavailability ~ 89%; Tmax ~ 1 - 3 days; Oral Rybelsus bioavailability ~ 0.4-1% (co-formulated with SNAC absorption enhancer)',
      bioavailability: 'SC ~ 89%; Oral ~ 0.8%',
      distribution: 'Vd ~ 12.5 Liters; binds extensively to plasma albumin (>99%) via C18 fatty acid chain',
      proteinBinding: '> 99% bound to albumin',
      metabolism: 'Extensively metabolized by proteolytic cleavage of peptide backbone and sequential beta-oxidation of fatty acid side chain',
      excretion: 'Excreted in urine (~3% intact) and feces as degraded peptide fragments',
      halfLife: 'Approx 1 week (168 hours, enabling once-weekly SC dosing)',
      therapeuticWindow: 'Titrated up monthly: 0.25mg -> 0.5mg -> 1.0mg -> 2.0mg',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'C',
    lactationSafety: 'Discontinue at least 2 months prior to a planned pregnancy due to long half-life.',
    pediatricDosingRule: 'Approved for weight management in adolescents ≥12 years (Wegovy 2.4 mg weekly).',
    geriatricBeersWarning: 'Monitor hydration status to prevent volume-depletion pre-renal acute kidney injury.',
    renalAdjustmentGFR: 'No direct dose adjustment required for renal impairment, but monitor eGFR.',
    hepaticAdjustment: 'No adjustment needed.',
    legalStatus: 'Prescription',
    isHighAlert: false,
    isColdChain: true,
    storageRequirement: '❄️ COLD-CHAIN MEDICATION: Store unopened pens refrigerated at 2°C to 8°C (36°F to 46°F). After first use, pen may be stored at room temperature (up to 30°C/86°F) for up to 56 days. Protect from light.',
    inventoryStock: 140,
    batchNumber: 'LOT-SEMA-8812O',
    expiryDate: '2027-07-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030011101011521008812O17270731',
    adulterationRiskNotes: 'Extremely high global counterfeit flag: Fake unapproved compounded salts and unlicensed pens frequently detected in supply chain.',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.0, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.8, y: 0.4, z: 0, color: '#38bdf8' },
        { element: 'N', x: 0.4, y: -0.2, z: 0.1, color: '#818cf8' },
        { element: 'C', x: 1.6, y: 0.5, z: 0, color: '#38bdf8' },
        { element: 'O', x: 1.6, y: 1.7, z: -0.1, color: '#f43f5e' },
        { element: 'C', x: 2.8, y: -0.3, z: 0, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5]]
    }
  },

  // --- REPRODUCTIVE & FERTILITY MEDICINES ---
  {
    id: 'drug-clomiphene-fertility',
    genericName: 'Clomiphene Citrate',
    brandNames: ['Clomid', 'Serophene'],
    alphabetLetter: 'C',
    drugClass: 'Selective Estrogen Receptor Modulator (SERM) / Ovulation Stimulant',
    therapeuticCategory: 'Women’s Sexual & Reproductive Health / Fertility & Ovulation Induction',
    substanceCategory: 'Reproductive medicines',
    visualRiskTier: 'SPECIALIST_HOSPITAL',
    chemicalName: '2-[4-[(Z)-2-chloro-1,2-diphenylethenyl]phenoxy]-N,N-diethylethanamine citrate',
    molecularFormula: 'C26H28ClNO • C6H8O7',
    molecularWeight: 598.08,
    smilesNotation: 'CCN(CC)CCOC1=CC=C(C=C1)/C(=C(\C2=CC=CC=C2)Cl)/C3=CC=CC=C3.C(C(=O)O)C(CC(=O)O)(C(=O)O)O',
    mechanismOfAction: 'Competitively binds estrogen receptors in the hypothalamus, blocking negative feedback of endogenous circulating estrogens, stimulating increased GnRH secretion, which triggers pituitary LH and FSH release to drive ovarian follicular maturation and ovulation.',
    dosageForms: ['Tablets'],
    routes: ['Oral'],
    availableStrengths: ['50 mg Tablet'],
    indications: ['Female Anovulatory Infertility (WHO Group II / Polycystic Ovary Syndrome PCOS)', 'Luteal Phase Deficiency (off-label)', 'Male Hypogonadotropic Hypogonadism / Oligospermia (off-label)'],
    absoluteContraindications: [
      'Confirmed Pregnancy (Teratogenic potential)',
      'Active Liver Disease or History of Hepatic Dysfunction',
      'Undiagnosed Abnormal Uterine Bleeding',
      'Ovarian Cysts or Enlargement Not Due to PCOS',
      'Uncontrolled Thyroid or Adrenal Dysfunction'
    ],
    relativeContraindications: ['Uterine Fibroids', 'Endometriosis', 'Visual Disturbances / Scintillating Scotomas'],
    blackBoxWarnings: '⚠️ OVARIAN HYPERSTIMULATION SYNDROME (OHSS) & MULTIPLE GESTATION: High risk of multiple pregnancies (~8% twins, 0.5% triplets) and severe OHSS (massive ovarian enlargement, ascites, pleural effusion, and hemoconcentration thrombosis). Discontinue if visual blurriness develops.',
    sideEffectsCommon: ['Vasomotor Hot Flashes', 'Abdominal Discomfort & Pelvic Bloating', 'Breast Tenderness', 'Nausea', 'Ovarian Enlargement'],
    sideEffectsSerious: ['Severe Ovarian Hyperstimulation Syndrome (OHSS)', 'Visual Disturbances (Scotomas, Flashing Lights - May Be Irreversible)', 'Ovarian Torsion', 'Thromboembolism'],
    adverseReactionRisk: 'Severe pelvic pain, rapid abdominal distension, or visual scotomas warrants immediate pelvic ultrasound and discontinuation.',
    interactions: [
      { targetName: 'Estrogen Therapies', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Direct pharmacological antagonism at hypothalamic estrogen receptors.', clinicalAction: 'Avoid concurrent exogenous estrogens during induction cycle.' }
    ],
    adme: {
      absorption: 'Readily absorbed from GI tract; Tmax ~ 3 - 6 hours',
      bioavailability: 'Extensive absorption; lipophilic',
      distribution: 'Extensive tissue distribution and binding; crosses into enterohepatic circulation',
      proteinBinding: 'High plasma protein binding',
      metabolism: 'Hepatic metabolism via CYP2D6 and CYP3A4 to active 4-hydroxyclomiphene',
      excretion: 'Mainly excreted in feces via biliary excretion (~42%) and urine (~8%)',
      halfLife: '5 - 7 days (active metabolites detectable for up to 30 days post-dosing)',
      therapeuticWindow: '50 mg/day for 5 consecutive days (initiated on day 2-5 of menstrual cycle)',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'X',
    lactationSafety: 'Contraindicated; suppresses prolactin secretion and inhibits lactation.',
    pediatricDosingRule: 'Not indicated for pediatric patients.',
    geriatricBeersWarning: 'Not indicated for postmenopausal women.',
    renalAdjustmentGFR: 'Use with caution.',
    hepaticAdjustment: 'Contraindicated in active liver disease.',
    legalStatus: 'Specialist prescription',
    isHighAlert: false,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C. Protect from light, moisture, and excessive heat.',
    inventoryStock: 90,
    batchNumber: 'LOT-CLOM-7701F',
    expiryDate: '2027-11-30',
    isRecallOrAlert: false,
    barcodeGS1: '010030066101011821007701F17271130',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.5, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -1.3, y: 0.2, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'O', x: 1.2, y: 0.2, z: 0, color: '#f43f5e' },
        { element: 'C', x: 2.4, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'N', x: 3.6, y: 0.3, z: -0.1, color: '#818cf8' },
        { element: 'Cl', x: -0.1, y: -1.8, z: 0.2, color: '#34d399' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [2, 6]]
    }
  },

  // --- VACCINES & BIOLOGICS ---
  {
    id: 'drug-mrna-covid-vaccine',
    genericName: 'mRNA COVID-19 Vaccine (Nucleoside-Modified)',
    brandNames: ['Spikevax', 'Comirnaty'],
    alphabetLetter: 'M',
    drugClass: 'Nucleoside-Modified Messenger RNA (mRNA) Lipid Nanoparticle Vaccine',
    therapeuticCategory: 'Immunology & Infectious Disease / Preventive Viral Vaccine',
    substanceCategory: 'Vaccine',
    visualRiskTier: 'ROUTINE',
    chemicalName: 'Synthetic 5-capped mRNA encoding the pre-fusion stabilized SARS-CoV-2 spike (S) glycoprotein encapsulated in SM-102 / ALC-0315 lipid nanoparticles',
    molecularFormula: 'mRNA-LNP-COMPLEX',
    molecularWeight: 800000,
    smilesNotation: 'SYNTHETIC-MODIFIED-MRNA-POLYMER',
    mechanismOfAction: 'Lipid nanoparticles deliver synthetic nucleoside-modified mRNA into host myocytes and antigen-presenting cells; intracellular ribosomes translate the mRNA into pre-fusion spike glycoprotein, inducing robust neutralizing antibody and cytotoxic CD4+/CD8+ T-cell immune responses.',
    dosageForms: ['Vaccines', 'Prefilled syringes', 'Injections'],
    routes: ['Intramuscular (IM)'],
    availableStrengths: ['0.5 mL (50 mcg/dose booster)', '0.3 mL (30 mcg/dose adult)', 'Pediatric 10 mcg / 3 mcg formulations'],
    indications: ['Active immunization for the prevention of COVID-19 coronavirus disease caused by SARS-CoV-2'],
    absoluteContraindications: ['Severe Anaphylactic Reaction to a Previous mRNA Vaccine Dose or Polyethylene Glycol (PEG) Component'],
    relativeContraindications: ['History of Post-Vaccine Myocarditis or Pericarditis', 'Acute Severe Febrile Illness (temp > 38.5°C - defer until resolved)'],
    blackBoxWarnings: '⚠️ MYOCARDITIS & PERICARDITIS WARNING: Increased risk of acute myocarditis and pericarditis, predominantly in adolescent and young adult males (16-24 years), typically occurring within 7 days of the second or booster dose. Symptoms include acute chest pain, dyspnea, and palpitations.',
    sideEffectsCommon: ['Injection Site Pain & Swelling', 'Fatigue / Malaise', 'Headache', 'Myalgia / Arthralgia', 'Transient Chills & Fever'],
    sideEffectsSerious: ['Acute Myocarditis / Pericarditis', 'Severe Anaphylaxis (requires immediate Epinephrine)', 'Transient Bell’s Palsy / Facial Paresis'],
    adverseReactionRisk: 'Chest pain or acute shortness of breath within 7 days requires immediate ECG, high-sensitivity Troponin-I, and echocardiogram.',
    interactions: [
      { targetName: 'Immunosuppressive Therapies (Chemotherapy, High-Dose Steroids, anti-CD20 mAbs)', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Attenuated antibody seroconversion and blunted T-cell response.', clinicalAction: 'Administer additional booster dose per CDC/ACIP immunocompromised protocol.' }
    ],
    adme: {
      absorption: 'Rapid cellular uptake of lipid nanoparticles into deltoid muscle cells and regional draining axillary lymph nodes',
      bioavailability: '100% local intramuscular bioavailability',
      distribution: 'Concentrated primarily in injection site muscle and regional lymph nodes; minimal systemic organ spillover',
      proteinBinding: 'Not applicable',
      metabolism: 'mRNA is completely degraded by cellular endonucleases and exonucleases within 48-72 hours; lipid nanoparticles metabolized by normal hepatic lipid pathways',
      excretion: 'Degraded ribonucleotides recycled into cellular pool',
      halfLife: 'mRNA intracellular half-life ~ 24 - 48 hours; spike protein expression peaks at 24-48h and is cleared within weeks',
      therapeuticWindow: 'Standardized immunogenic dose regimen',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'B',
    lactationSafety: 'Safe and strongly recommended; maternal IgG antibodies transfer across placenta and into breast milk, conferring passive neonatal protection.',
    pediatricDosingRule: '6 months - 4 years: 3-dose series (3 mcg); 5 - 11 years: 10 mcg; ≥12 years: 30-50 mcg.',
    geriatricBeersWarning: 'Safe and strongly recommended; prioritized for elderly due to high risk of severe viral pneumonia and mortality.',
    renalAdjustmentGFR: 'No dosage adjustment required.',
    hepaticAdjustment: 'No dosage adjustment needed.',
    legalStatus: 'Vaccine',
    isHighAlert: false,
    isColdChain: true,
    storageRequirement: '❄️ ULTRACOLD COLD-CHAIN: Store frozen at -50°C to -15°C. Thawed unopened vials stable at 2°C to 8°C (36°F to 46°F) for up to 30 days. DO NOT REFREEZE. Swirl gently; DO NOT SHAKE.',
    inventoryStock: 300,
    batchNumber: 'LOT-MRNA-9941X',
    expiryDate: '2026-12-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030055101011921009941X17261231',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.0, y: -0.6, z: 0, color: '#38bdf8' },
        { element: 'O', x: -0.8, y: 0.4, z: 0, color: '#f43f5e' },
        { element: 'P', x: 0.6, y: -0.4, z: 0.1, color: '#facc15' },
        { element: 'O', x: 0.6, y: -1.8, z: 0, color: '#f43f5e' },
        { element: 'O', x: 1.8, y: 0.4, z: 0, color: '#f43f5e' },
        { element: 'C', x: 3.0, y: -0.3, z: -0.1, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]]
    }
  }
];

/* =========================================================================
   2. EXPANDED POISONING & EMERGENCY ANTIDOTE REGISTRY (NOVA TOX)
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
  },
  {
    id: 'antidote-lead-heavymetal',
    toxinName: 'Lead (Plumbism) & Heavy Metal Poisoning (Blood Lead Level > 45 mcg/dL)',
    exposureCategory: 'Heavy Metal',
    ghsHazardSymbol: 'Toxic ☠️',
    clinicalSymptoms: ['Burtonian Blue Gum Lines', 'Basophilic Stippling Anemia', 'Wrist/Foot Drop (Radial Neuropathy)', 'Severe Colic', 'Encephalopathy'],
    primaryAntidote: 'Succimer (DMSA) or Dimercaprol (BAL) + Calcium Disodium EDTA',
    antidoteDoseProtocol: 'Succimer: 10 mg/kg PO Q8H x 5 days, then Q12H x 14 days. Lead encephalopathy: Dimercaprol 75 mg/m² IM Q4H, followed 4h later by CaNa2-EDTA 1000-1500 mg/m²/day continuous IV.',
    mechanismOfNeutralization: 'Chelating agents bind heavy metal ions through sulfhydryl and carboxyl coordination complexes, forming water-soluble rings excreted in urine and bile.',
    hospitalUnitRequired: 'Toxicology & Pediatric Environmental Health Unit',
    poisonControlCode: 'TOX-HEAVYMETAL-LEAD'
  }
];

/* =========================================================================
   3. ADULTERATION, COUNTERFEIT & RECALL VERIFICATION DATABASE (NOVA VERIFY)
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
    safetyNotice: '⚠️ CRITICAL ALERT: FAKE PACKAGING DETECTED. Failed cryptographic token handshake. Laboratory testing revealed cheap insulin substituted into counterfeit pen. Quarantine medication immediately.'
  },
  {
    barcodeScanned: '01003008888888888888ADULTERATEDCOFFEE',
    ndcOrBatch: 'UNLISTED-HERBAL-ENERGY-8820',
    drugName: 'Royal Herbal Honey & Vitality Coffee Supplement',
    manufacturer: 'Unregistered Wellness Exports',
    manufactureDate: '2025-01-15',
    expiryDate: '2027-01-15',
    tamperSealVerified: false,
    blockchainHash: '0x33b8a1c9902f8901adulterationflag0000000',
    status: 'COUNTERFEIT_DETECTED',
    safetyNotice: '⚠️ DANGEROUS ADULTERATION ALERT: Chemical spectroscopy detected undeclared Sildenafil Citrate (PDE-5 inhibitor) and Tadalafil in dietary supplement. High risk of fatal hypotension in cardiac patients taking nitrates.'
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
  },
  {
    id: 'adr-rep-003',
    patientId: 'p305',
    patientName: 'Elena Rostova',
    suspectedDrug: 'Pembrolizumab (Keytruda 200 mg)',
    adverseEvent: 'Grade 3 Immune-Mediated Pneumonitis (Dry cough, dyspnea, bilateral ground-glass opacities)',
    severityGrade: 'Severe (Grade 3)',
    onsetTime: 'Cycle 4 (Day 63)',
    outcome: 'Recovering',
    reportedBy: 'Dr. Marcus Vance, MD (Oncology)',
    dateReported: '2026-08-23 20:00',
    pharmacovigilanceStatus: 'Submitted to FDA MedWatch / WHO Vigibase'
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
    activeVaccinesStored: ['Human Regular Insulin U-100', 'Inactivated Influenza Vaccine', 'mRNA COVID-19 Vaccine (Spikevax)', 'MMR Live Attenuated'],
    backupGeneratorActive: true
  },
  {
    unitId: 'CC-FRIDGE-02',
    storageUnitName: 'ICU Critical Monoclonal & Emergency Antidote Chiller B',
    targetTempRange: '2.0°C - 8.0°C',
    currentTemp: 4.2,
    status: 'OPTIMAL',
    timestamp: 'Live Sensor Telemetry (Synced 5s ago)',
    activeVaccinesStored: ['Digoxin Immune Fab', 'Semaglutide (Ozempic)', 'Recombinant Alteplase (tPA)', 'Vancomycin Reconstituted'],
    backupGeneratorActive: true
  },
  {
    unitId: 'CC-FREEZER-03',
    storageUnitName: 'Ultracold Blood Bank & Plasma Storage Unit',
    targetTempRange: '-25.0°C to -15.0°C',
    currentTemp: -20.4,
    status: 'OPTIMAL',
    timestamp: 'Live Sensor Telemetry (Synced 1s ago)',
    activeVaccinesStored: ['Fresh Frozen Plasma (FFP)', 'Cryoprecipitate Antihemophilic Factor', 'Gene Therapy Vector Lots (AAV)'],
    backupGeneratorActive: true
  }
];
