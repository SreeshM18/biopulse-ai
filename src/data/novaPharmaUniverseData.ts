import { 
  MasterDrugRecord, 
  PoisoningAntidoteRecord, 
  BatchVerificationReport, 
  ADRSubmissionRecord, 
  ColdChainLog 
} from '../types/biotech';

/* =========================================================================
   1. MASTER PHARMACEUTICAL & SUBSTANCE UNIVERSE DATABASE (EXTENDED SPECTRUM)
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
    substanceCategory: 'Prescription',
    visualRiskTier: 'PRESCRIPTION',
    chemicalName: '(3R,5R)-7-[2-(4-fluorophenyl)-3-phenyl-4-(phenylcarbamoyl)-5-propan-2-ylpyrrol-1-yl]-3,5-dihydroxyheptanoic acid',
    molecularFormula: 'C33H35FN2O5',
    molecularWeight: 558.64,
    smilesNotation: 'CC(C)C1=C(C(=C(N1CCC(CC(CC(=O)O)O)O)C2=CC=C(C=C2)F)C3=CC=CC=C3)C(=O)NC4=CC=CC=C4',
    mechanismOfAction: 'Competitively inhibits HMG-CoA reductase, the rate-limiting enzyme in hepatic cholesterol biosynthesis, upregulating hepatic LDL receptors.',
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
    substanceCategory: 'Prescription',
    visualRiskTier: 'PRESCRIPTION',
    chemicalName: '(2S,5R,6R)-6-[[(2R)-2-amino-2-(4-hydroxyphenyl)acetyl]amino]-3,3-dimethyl-7-oxo-4-thia-1-azabicyclo[3.2.0]heptane-2-carboxylic acid + potassium clavulanate',
    molecularFormula: 'C16H19N3O5S • C8H8KNO5',
    molecularWeight: 597.68,
    smilesNotation: 'CC1(C(N2C(S1)C(C2=O)NC(=O)C(C3=CC=C(C=C3)O)N)C(=O)O)C.C1C(=C/CO)/C2N(C1=O)C(C(=O)[O-])O2.[K+]',
    mechanismOfAction: 'Amoxicillin inhibits bacterial cell wall peptidoglycan synthesis; Clavulanate irreversibly inactivates bacterial beta-lactamases.',
    dosageForms: ['Tablet', 'Suspension', 'Injection (IV/IM/SC)'],
    routes: ['Oral', 'Intravenous (IV)'],
    availableStrengths: ['500/125 mg', '875/125 mg', '1000/62.5 mg XR', '400/57 mg/5mL'],
    indications: ['Acute Bacterial Sinusitis', 'Community-Acquired Pneumonia', 'Skin & Soft Tissue Infections', 'Bite Wounds', 'Complicated UTI'],
    absoluteContraindications: ['Severe Immediate Type I Hypersensitivity to Penicillins', 'History of Amox/Clav-Associated Cholestatic Jaundice'],
    relativeContraindications: ['Infectious Mononucleosis (erythematous rash risk)', 'Renal Impairment (GFR < 30 mL/min)'],
    blackBoxWarnings: 'Do not use for ordinary viral infections (Antibiotic Stewardship).',
    sideEffectsCommon: ['Diarrhea / Loose Stools', 'Nausea / Vomiting', 'Candidiasis / Diaper Rash'],
    sideEffectsSerious: ['Clostridioides difficile-Associated Colitis', 'Anaphylaxis', 'Stevens-Johnson Syndrome (SJS)', 'Cholestatic Jaundice'],
    adverseReactionRisk: 'Severe watery diarrhea with fever warrants immediate C. diff PCR assay.',
    interactions: [
      { targetName: 'Methotrexate', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Penicillins reduce renal clearance of methotrexate, increasing hematologic toxicity.', clinicalAction: 'Monitor serum methotrexate levels; dose reduction required.' },
      { targetName: 'Warfarin', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Alteration of intestinal flora decreases vitamin K synthesis, prolonging INR.', clinicalAction: 'Frequent INR checks during course.' }
    ],
    adme: {
      absorption: 'Rapid and well absorbed; food enhances clavulanate absorption',
      bioavailability: 'Amoxicillin ~ 70-90%; Clavulanate ~ 60-70%',
      distribution: 'Diffuses into tissues and fluid; poor CSF penetration unless inflamed meninges',
      proteinBinding: 'Amoxicillin ~ 18%; Clavulanate ~ 25%',
      metabolism: 'Amoxicillin mostly unchanged; Clavulanate hepatic ~ 50%',
      excretion: 'Primary renal excretion (amoxicillin 50-70% in active form in first 6h)',
      halfLife: '1.0 - 1.3 hours in healthy adults',
      therapeuticWindow: 'Broad safety margin',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'B',
    lactationSafety: 'Compatible with breastfeeding; small amounts excreted into breast milk.',
    pediatricDosingRule: '25-45 mg/kg/day divided q12h (or 80-90 mg/kg/day for high-dose otitis media).',
    renalAdjustmentGFR: 'eGFR 10-30 mL/min: 500/125 mg q12h; eGFR < 10 mL/min: 500/125 mg q24h.',
    hepaticAdjustment: 'Use with caution; monitor liver enzymes periodically.',
    legalStatus: 'Prescription-Only (Rx)',
    isHighAlert: false,
    isColdChain: false,
    storageRequirement: 'Tablets: 20°C-25°C. Liquid Suspension: MUST REFRIGERATE at 2°C-8°C; discard after 10 days.',
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

  // --- SEXUAL & REPRODUCTIVE PHARMACOLOGY ---
  {
    id: 'drug-sildenafil',
    genericName: 'Sildenafil Citrate',
    brandNames: ['Viagra', 'Revatio', 'Kamagra'],
    alphabetLetter: 'S',
    drugClass: 'Phosphodiesterase-5 (PDE-5) Inhibitor',
    therapeuticCategory: 'Sexual-Health & Urological / Erectile Dysfunction & PAH',
    substanceCategory: 'Sexual-health medicines',
    visualRiskTier: 'PRESCRIPTION',
    chemicalName: '1-[4-ethoxy-3-(6,7-dihydro-1-methyl-7-oxo-3-propyl-1H-pyrazolo[4,3-d]pyrimidin-5-yl)benzenesulfonyl]-4-methylpiperazine citrate',
    molecularFormula: 'C22H30N6O4S • C6H8O7',
    molecularWeight: 666.70,
    smilesNotation: 'CCCC1=NN(C)C2=C1N=C(NC2=O)C3=C(OCC)C=CC(=C3)S(=O)(=O)N4CCN(C)CC4',
    mechanismOfAction: 'Inhibits cGMP-specific phosphodiesterase type 5 (PDE-5), enhancing nitric oxide (NO)-mediated vasodilation in the corpus cavernosum and pulmonary vascular bed.',
    dosageForms: ['Tablet', 'Oral Dissolving Film / Strip', 'Injection (IV/IM/SC)', 'Suspension'],
    routes: ['Oral', 'Intravenous (IV)'],
    availableStrengths: ['25 mg', '50 mg', '100 mg (Viagra)', '20 mg (Revatio PAH)'],
    indications: ['Erectile Dysfunction (ED)', 'Pulmonary Arterial Hypertension (PAH WHO Group 1)'],
    absoluteContraindications: [
      'Concomitant Organic Nitrates (Nitroglycerin, Isosorbide Dinitrate/Mononitrate)',
      'Concomitant Guanylate Cyclase Stimulators (Riociguat)',
      'Non-Arteritic Anterior Ischemic Optic Neuropathy (NAION)'
    ],
    relativeContraindications: ['Recent Stroke or Myocardial Infarction within 6 months', 'Resting Hypotension (<90/50 mmHg)', 'Severe Hepatic Impairment'],
    blackBoxWarnings: '⚠️ CONTRAINDICATED WITH ALL ORGANIC NITRATES: Produces profound, potentially fatal systemic hypotension and circulatory collapse. Emergency providers must withhold nitroglycerin for at least 24 hours post-sildenafil ingestion.',
    sideEffectsCommon: ['Headache', 'Flushing', 'Dyspepsia', 'Nasal Congestion', 'Cyanopsia (Blue-Tinted Vision)'],
    sideEffectsSerious: ['Priapism (> 4 Hours Erection - Urologic Emergency)', 'Sudden Sensorineural Hearing Loss', 'NAION / Permanent Vision Loss', 'Severe Hypotensive Shock'],
    adverseReactionRisk: 'Priapism exceeding 4 hours risks irreversible penile fibrosis and erectile tissue necrosis.',
    interactions: [
      { targetName: 'Nitroglycerin / Nitrates (Sublingual/Patch/IV)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Synergistic cGMP accumulation causes catastrophic vascular vasodilation and fatal shock.', clinicalAction: 'Absolute contraindication. Withhold nitrates for 24h.' },
      { targetName: 'Alpha-1 Blockers (Tamsulosin, Doxazosin)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Additive peripheral vasodilation resulting in symptomatic orthostatic syncope.', clinicalAction: 'Separate administration by at least 4 hours and start at lowest sildenafil dose (25 mg).' },
      { targetName: 'Strong CYP3A4 Inhibitors (Ritonavir, Ketoconazole)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Inhibits sildenafil clearance, elevating plasma AUC by 11-fold.', clinicalAction: 'Max sildenafil dose 25 mg every 48 hours.' }
    ],
    adme: {
      absorption: 'Rapid; Tmax 30-120 minutes (delayed by high-fat meal)',
      bioavailability: 'Approx 41%',
      distribution: 'Vd ~ 105 Liters',
      proteinBinding: '96% bound to plasma proteins',
      metabolism: 'Predominantly hepatic via CYP3A4 (major) and CYP2C9 (minor) to active N-desmethyl metabolite',
      excretion: 'Fecal / Biliary ~ 80%; Renal ~ 13%',
      halfLife: '3 - 5 hours',
      therapeuticWindow: '10 - 100 ng/mL',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'B',
    lactationSafety: 'Not indicated for female sexual dysfunction; Revatio in PAH requires specialist maternal-fetal consult.',
    pediatricDosingRule: 'Not recommended in pediatric ED; Revatio used off-label in pediatric PAH under strict titration.',
    geriatricBeersWarning: 'Start at lowest 25 mg dose due to reduced hepatic clearance and increased fall/hypotension risk.',
    renalAdjustmentGFR: 'eGFR < 30 mL/min: Start with 25 mg dose.',
    hepaticAdjustment: 'Cirrhosis Child-Pugh A/B: Start with 25 mg dose. Severe impairment: Avoid.',
    legalStatus: 'Prescription-Only (Rx)',
    isHighAlert: false,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C (68°F to 77°F). Protect from moisture.',
    inventoryStock: 480,
    batchNumber: 'LOT-SILD-3301V',
    expiryDate: '2027-09-30',
    isRecallOrAlert: false,
    barcodeGS1: '010030089101011821003301V17270930',
    adulterationRiskNotes: 'High counterfeit risk: Commonly found illegally adulterated in undeclared "herbal vitality coffees" and gym sex-enhancement tonics.',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.0, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'N', x: -1.0, y: -1.2, z: 0, color: '#818cf8' },
        { element: 'C', x: 0.2, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.2, y: 0.9, z: 0, color: '#38bdf8' },
        { element: 'O', x: 1.3, y: 1.6, z: 0.1, color: '#f43f5e' },
        { element: 'S', x: -1.2, y: 1.8, z: -0.1, color: '#facc15' },
        { element: 'O', x: -0.6, y: 3.1, z: 0.2, color: '#f43f5e' },
        { element: 'N', x: -2.7, y: 2.1, z: 0, color: '#818cf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6], [5, 7]]
    }
  },

  {
    id: 'drug-levonorgestrel-ec',
    genericName: 'Levonorgestrel (Emergency Contraception)',
    brandNames: ['Plan B One-Step', 'Next Choice', 'Take Action', 'Option 2'],
    alphabetLetter: 'L',
    drugClass: 'Second-Generation Synthetic Progestogen',
    therapeuticCategory: 'Reproductive Pharmacology / Emergency Contraception',
    substanceCategory: 'Reproductive medicines',
    visualRiskTier: 'ROUTINE',
    chemicalName: '(-)-13-ethyl-17-hydroxy-18,19-dinor-17alpha-pregn-4-en-20-yn-3-one',
    molecularFormula: 'C21H28O2',
    molecularWeight: 312.45,
    smilesNotation: 'CCC12CC[C@H]3[C@H]([C@@H]1CC[C@]2(C#C)O)CCC4=CC(=O)CC[C@H]34',
    mechanismOfAction: 'Inhibits or delays luteinizing hormone (LH) surge, preventing ovulation. Also thickens cervical mucus to impede sperm migration. Does NOT disrupt or terminate an established implanted pregnancy.',
    dosageForms: ['Tablet'],
    routes: ['Oral'],
    availableStrengths: ['1.5 mg single dose', '0.75 mg (2-dose pack)'],
    indications: ['Emergency post-coital contraception within 72 hours (up to 120 hours off-label) of unprotected intercourse or barrier failure.'],
    absoluteContraindications: ['Known Confirmed Pregnancy (ineffective once implantation has occurred, though not teratogenic).', 'Unexplained Abnormal Vaginal Bleeding.'],
    relativeContraindications: ['Severe Hepatic Impairment', 'Severe Malabsorption Syndromes (Crohn’s Disease)'],
    blackBoxWarnings: 'Emergency contraception does not protect against HIV infection or other Sexually Transmitted Infections (STIs). Efficacy is reduced in patients with BMI > 30 kg/m² (Ulipristal acetate or copper IUD preferred).',
    sideEffectsCommon: ['Nausea / Vomiting (repeat dose if emesis within 2h)', 'Irregular Menstrual Bleeding / Spotting', 'Abdominal Pain', 'Fatigue / Headache', 'Breast Tenderness'],
    sideEffectsSerious: ['Ectopic Pregnancy (rule out if severe lower abdominal pain develops 3-5 weeks post-ingestion)'],
    adverseReactionRisk: 'Persistent severe unilateral pelvic pain requires immediate transvaginal ultrasound to rule out ectopic gestation.',
    interactions: [
      { targetName: 'CYP3A4 Inducers (Carbamazepine, Efavirenz, St. John’s Wort, Rifampin)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Accelerates levonorgestrel metabolism, dropping plasma levels below the ovulation suppression threshold.', clinicalAction: 'Double dose to 3.0 mg oral or recommend Copper IUD insertion within 5 days.' }
    ],
    adme: {
      absorption: 'Rapid and complete from GI tract; Tmax ~ 1.5 - 2.5 hours',
      bioavailability: 'Approx 100%',
      distribution: 'Vd ~ 1.5 L/kg',
      proteinBinding: '98% bound (approx 50% to sex hormone-binding globulin SHBG, 48% to albumin)',
      metabolism: 'Hepatic via reduction and conjugation (CYP3A4 involvement)',
      excretion: 'Excreted in urine (~45%) and feces (~32%) as metabolites',
      halfLife: '24 - 32 hours',
      therapeuticWindow: 'Peak plasma level > 15-25 ng/mL needed for LH suppression',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'X',
    lactationSafety: 'Compatible; small amounts excreted into breast milk. Nursing can be resumed 8 hours after single 1.5 mg dose.',
    pediatricDosingRule: 'Post-menarcheal adolescents: 1.5 mg single dose (same as adult).',
    renalAdjustmentGFR: 'No dose adjustment required.',
    hepaticAdjustment: 'Contraindicated in severe hepatic impairment.',
    legalStatus: 'OTC (Over-The-Counter)',
    isHighAlert: false,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C (68°F to 77°F). Protect from excessive heat.',
    inventoryStock: 350,
    batchNumber: 'LOT-LEVO-9102E',
    expiryDate: '2028-03-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030055101011321009102E17280331',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.8, y: 1.0, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.6, y: 0.4, z: 0.1, color: '#38bdf8' },
        { element: 'C', x: 1.8, y: 1.2, z: 0, color: '#38bdf8' },
        { element: 'O', x: 2.9, y: 0.5, z: -0.2, color: '#f43f5e' },
        { element: 'C', x: -2.8, y: -1.0, z: 0, color: '#38bdf8' },
        { element: 'O', x: -4.0, y: -1.1, z: 0.1, color: '#f43f5e' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6]]
    }
  },

  {
    id: 'drug-mifepristone-misoprostol',
    genericName: 'Mifepristone / Misoprostol Regulated Protocol',
    brandNames: ['Mifeprex', 'Cytotec', 'Medabon'],
    alphabetLetter: 'M',
    drugClass: 'Progesterone Receptor Antagonist + Prostaglandin E1 Analogue',
    therapeuticCategory: 'Reproductive Pharmacology / Regulated Medical Termination Protocol',
    substanceCategory: 'Reproductive medicines',
    visualRiskTier: 'SPECIALIST_HOSPITAL',
    chemicalName: '11beta-[4-(dimethylamino)phenyl]-17beta-hydroxy-17-(1-propynyl)estra-4,9-dien-3-one + (±)-methyl 11alpha,16-dihydroxy-16-methyl-9-oxoprost-13E-en-1-oate',
    molecularFormula: 'C29H35NO2 • C22H38O5',
    molecularWeight: 429.59,
    smilesNotation: 'CC#CC1(CCC2C1(CC(C3=C2CCC4=CC(=O)CCC34)C5=CC=C(C=C5)N(C)C)C)O',
    mechanismOfAction: 'Mifepristone competitively blocks endometrial and myometrial progesterone receptors, causing decidual necrosis and cervical ripening; Misoprostol (given 24-48h later) stimulates powerful myometrial contractions and cervical dilation to evacuate uterine contents.',
    dosageForms: ['Tablet', 'Sublingual Tablet'],
    routes: ['Oral', 'Buccal', 'Vaginal', 'Sublingual'],
    availableStrengths: ['Mifepristone 200 mg Tablet', 'Misoprostol 200 mcg Tablet (800 mcg buccal regimen)'],
    indications: ['Medical termination of intrauterine pregnancy through 70 days gestation (FDA/WHO protocol)', 'Early pregnancy loss / missed miscarriage management', 'Cushing’s syndrome hyperglycemia (Korlym high-dose)'],
    absoluteContraindications: [
      'Confirmed or Suspected Ectopic Pregnancy (Mifepristone is ineffective against ectopic gestations)',
      'Intrauterine Device (IUD) in Place (must be removed prior to regimen)',
      'Chronic Adrenal Failure or Concurrent Long-Term Corticosteroid Therapy',
      'Hemorrhagic Disorders or Concurrent Anticoagulant Therapy',
      'Inherited Porphyrias'
    ],
    relativeContraindications: ['Severe Anemia (Hb < 8 g/dL)', 'Uncontrolled Severe Asthma', 'Severe Hepatic/Renal Impairment'],
    blackBoxWarnings: '⚠️ FDA BOXED WARNING / REMS PROGRAM: Severe, potentially fatal bacterial infections (including Clostridium sordellii toxic shock syndrome without fever) and massive uterine hemorrhage can occur. Must have immediate surgical referral pathway available if excessive bleeding occurs (>2 heavy pads per hour for 2 consecutive hours).',
    sideEffectsCommon: ['Heavy Vaginal Bleeding & Clotting', 'Severe Uterine Cramping', 'Nausea / Vomiting', 'Diarrhea', 'Transient Shivering & Fever (< 4 hours)'],
    sideEffectsSerious: ['Toxic Shock Syndrome (Clostridium sordellii / sepsis)', 'Life-Threatening Hemorrhage Requiring Uterine Aspiration / Blood Transfusion', 'Incomplete Abortion / Retained Tissue', 'Undiagnosed Ruptured Ectopic Pregnancy'],
    adverseReactionRisk: 'Persistent fever > 38°C (100.4°F) more than 24 hours after misoprostol, or foul-smelling lochia indicates pelvic infection.',
    interactions: [
      { targetName: 'Systemic Anticoagulants (Heparin, Warfarin, DOACs)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Dramatically magnifies life-threatening post-evacuation uterine bleeding.', clinicalAction: 'Absolute contraindication.' },
      { targetName: 'CYP3A4 Inducers (Rifampin, St. John’s Wort, Phenytoin)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Reduces plasma mifepristone concentration, leading to incomplete evacuation failure.', clinicalAction: 'Assess efficacy via follow-up ultrasound.' }
    ],
    adme: {
      absorption: 'Mifepristone rapid oral absorption (Tmax 1-2h); Misoprostol buccal/sublingual absorption produces highest AUC and prolonged uterine tonus',
      bioavailability: 'Mifepristone ~ 69%; Misoprostol free acid ~ 80%',
      distribution: 'Mifepristone 98% bound to alpha-1-acid glycoprotein',
      proteinBinding: 'Mifepristone 98%; Misoprostol acid 80-90%',
      metabolism: 'Mifepristone hepatic via CYP3A4; Misoprostol undergoes rapid de-esterification to active misoprostol acid',
      excretion: 'Mifepristone: Feces ~ 83%, Urine ~ 9%; Misoprostol: Urine ~ 73%',
      halfLife: 'Mifepristone: 18 - 24 hours; Misoprostol acid: 20 - 40 minutes',
      therapeuticWindow: 'Regimen-driven clinical protocol',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'X',
    lactationSafety: 'Excreted in small amounts in breast milk; nursing can continue without interruption or pause for 4 hours post-misoprostol.',
    pediatricDosingRule: 'Post-menarcheal patients: Same weight-independent protocol under specialist reproductive guidance.',
    renalAdjustmentGFR: 'No formal adjustment required, but clinical caution in severe renal insufficiency.',
    hepaticAdjustment: 'Avoid in severe hepatic impairment.',
    legalStatus: 'Regulated Reproductive Health',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C (68°F to 77°F). Controlled clinical dispensing.',
    inventoryStock: 80,
    batchNumber: 'LOT-MIFE-4409R',
    expiryDate: '2027-12-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030078101011421004409R17271231',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.2, y: -0.6, z: 0, color: '#38bdf8' },
        { element: 'C', x: -1.0, y: 0.2, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.4, y: -0.4, z: 0, color: '#38bdf8' },
        { element: 'N', x: 1.5, y: 0.4, z: 0.1, color: '#818cf8' },
        { element: 'C', x: 2.8, y: -0.2, z: 0, color: '#38bdf8' },
        { element: 'O', x: -3.3, y: -0.1, z: 0.1, color: '#f43f5e' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5]]
    }
  },

  // --- SEDATIVES & HYPNOTICS (BENZODIAZEPINES & Z-DRUGS) ---
  {
    id: 'drug-diazepam',
    genericName: 'Diazepam',
    brandNames: ['Valium', 'Diastat', 'Valtoco'],
    alphabetLetter: 'D',
    drugClass: 'Long-Acting Benzodiazepine GABA-A Positive Allosteric Modulator (Schedule IV)',
    therapeuticCategory: 'Neurology & Psychiatry / Anxiolytic, Anticonvulsant & Sedative',
    substanceCategory: 'Controlled medicines',
    visualRiskTier: 'CONTROLLED_RISK',
    chemicalName: '7-chloro-1-methyl-5-phenyl-3H-1,4-benzodiazepin-2-one',
    molecularFormula: 'C16H13ClN2O',
    molecularWeight: 284.74,
    smilesNotation: 'CN1C(=O)CN=C(C2=C1C=CC(=C2)Cl)C3=CC=CC=C3',
    mechanismOfAction: 'Binds allosterically to GABAA receptors at alpha/gamma subunit interfaces, facilitating GABA-mediated chloride channel opening, hyperpolarizing neuronal membranes and dampening CNS excitability.',
    dosageForms: ['Tablet', 'Injection (IV/IM/SC)', 'Enemas', 'Nasal Spray', 'Oral Dissolving Film / Strip'],
    routes: ['Oral', 'Intravenous (IV)', 'Rectal', 'Nasal', 'Intramuscular (IM)'],
    availableStrengths: ['2 mg', '5 mg', '10 mg Tablet', '5 mg/mL IV/IM Vial', '10 mg/2.5 mL Rectal Gel'],
    indications: ['Status Epilepticus / Acute Seizure Clusters', 'Acute Alcohol Withdrawal Delirium Tremens', 'Severe Acute Anxiety & Panic States', 'Skeletal Muscle Spasm / Tetanus'],
    absoluteContraindications: [
      'Severe Acute Respiratory Depression',
      'Severe Hepatic Insufficiency (precipitates hepatic encephalopathy)',
      'Myasthenia Gravis (worsens neuromuscular weakness)',
      'Acute Narrow-Angle Glaucoma'
    ],
    relativeContraindications: ['Sleep Apnea Syndrome', 'Severe Chronic COPD', 'History of Substance Abuse'],
    blackBoxWarnings: '⚠️ CONCOMITANT USE WITH OPIOIDS LEADS TO PROFOUND SEDATION, RESPIRATORY DEPRESSION, COMA, AND DEATH. Risk of physical dependence, tolerance, addiction, and life-threatening withdrawal seizures upon abrupt cessation. Antidote: Flumazenil.',
    sideEffectsCommon: ['Sedation / Drowsiness', 'Ataxia / Poor Coordination', 'Muscle Weakness', 'Anterograde Amnesia', 'Dizziness'],
    sideEffectsSerious: ['Fatal Respiratory Arrest (especially with alcohol/opioids)', 'Paradoxical Excitement / Aggression', 'Severe Physical Dependence & Withdrawal Seizures', 'Hepatic Coma'],
    adverseReactionRisk: 'Bradypnea < 8 breaths/min with unresponsiveness warrants airway stabilization and Flumazenil (0.2 mg IV).',
    interactions: [
      { targetName: 'Alcohol / Depressants', targetType: 'Alcohol', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Synergistic CNS and medullary respiratory center depression resulting in fatal apnea.', clinicalAction: 'Absolute contraindication.' },
      { targetName: 'Opioids (Fentanyl, Morphine, Oxycodone)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Severe synergistic respiratory drive suppression.', clinicalAction: 'Avoid co-prescription unless in end-of-life palliative sedation.' },
      { targetName: 'CYP3A4 & CYP2C19 Inhibitors (Cimetidine, Omeprazole)', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Inhibits diazepam clearance, doubling elimination half-life.', clinicalAction: 'Reduce diazepam dose.' }
    ],
    adme: {
      absorption: 'Rapid oral absorption (Tmax 30-90 min); IV onset 1-3 mins; Rectal gel rapid absorption for home seizure rescue',
      bioavailability: 'Oral ~ 98%; Rectal ~ 90%',
      distribution: 'Highly lipophilic; crosses BBB rapidly with subsequent extensive tissue redistribution; Vd ~ 1.1 L/kg',
      proteinBinding: '98 - 99% bound to plasma albumin',
      metabolism: 'Extensive hepatic metabolism via CYP2C19 and CYP3A4 to long-acting active metabolites: Nordiazepam (t½ ~ 100h), Temazepam, and Oxazepam',
      excretion: 'Excreted in urine (approx 70% as glucuronide conjugates)',
      halfLife: 'Parent Diazepam: 20 - 50 hours; Active metabolite Nordiazepam: 40 - 100 hours',
      therapeuticWindow: '0.2 - 1.0 mcg/mL (anxiolytic); > 2.0 mcg/mL (toxic sedation)',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'D',
    lactationSafety: 'Contraindicated; passes into breast milk and causes neonatal sedation, poor feeding, and lethargy.',
    pediatricDosingRule: 'Status epilepticus: 0.2 - 0.5 mg/kg slow IV push or Rectal Diastat 0.2-0.5 mg/kg.',
    geriatricBeersWarning: 'BEERS CRITERIA HIGH-ALERT: Extremely long half-life in elderly causes prolonged sedation, confusion, severe ataxia, and catastrophic hip fractures. Avoid.',
    renalAdjustmentGFR: 'Use with caution; active metabolites may accumulate.',
    hepaticAdjustment: 'Avoid in severe cirrhosis; reduces clearance and triggers coma.',
    legalStatus: 'Controlled Substance (Schedule II/IV)',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C. Secure in controlled substance double-lock vault.',
    inventoryStock: 220,
    batchNumber: 'LOT-DIAZ-7711B',
    expiryDate: '2027-05-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030044101011521007711B17270531',
    dependencePotential: 'Severe (Physical & Psychological)',
    abusePotential: 'High',
    withdrawalRisk: 'Life-threatening rebound delirium tremens, psychosis, autonomic hyperarousal, and status epilepticus if stopped abruptly.',
    atoms3D: {
      atoms: [
        { element: 'C', x: -1.8, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.6, y: -1.2, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.6, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'N', x: 0.6, y: 0.9, z: 0, color: '#818cf8' },
        { element: 'C', x: -0.6, y: 1.6, z: 0, color: '#38bdf8' },
        { element: 'C', x: -1.8, y: 0.9, z: 0, color: '#38bdf8' },
        { element: 'O', x: -0.6, y: 2.8, z: 0.1, color: '#f43f5e' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [4, 6]]
    }
  },

  {
    id: 'drug-zolpidem',
    genericName: 'Zolpidem Tartrate',
    brandNames: ['Ambien', 'Ambien CR', 'Intermezzo', 'Stilnox'],
    alphabetLetter: 'Z',
    drugClass: 'Non-Benzodiazepine Imidazopyridine Hypnotic (Z-Drug, Schedule IV)',
    therapeuticCategory: 'Psychiatry & Sleep Medicine / Short-Term Insomnia',
    substanceCategory: 'Controlled medicines',
    visualRiskTier: 'CONTROLLED_RISK',
    chemicalName: 'N,N-dimethyl-2-[6-methyl-2-(4-methylphenyl)imidazo[1,2-a]pyridin-3-yl]acetamide tartrate',
    molecularFormula: '(C19H21N3O)2 • C4H6O6',
    molecularWeight: 764.88,
    smilesNotation: 'CC1=CC=C(C=C1)C2=C(N3C=C(C=CC3=N2)C)CC(=O)N(C)C.C(C(C(=O)O)O)(C(=O)O)O',
    mechanismOfAction: 'Selectively binds the alpha-1 subunit of GABAA receptors with high affinity, enhancing GABA inhibitory neurotransmission to rapidly induce sleep with minimal muscle relaxant or anticonvulsant effects.',
    dosageForms: ['Tablet', 'Sublingual Tablet', 'Oral Dissolving Film / Strip', 'Sprays'],
    routes: ['Oral', 'Sublingual'],
    availableStrengths: ['5 mg', '10 mg Tablet', '6.25 mg, 12.5 mg Extended-Release (CR)', '1.75 mg, 3.5 mg Sublingual (Intermezzo)'],
    indications: ['Short-term treatment of insomnia characterized by difficulties with sleep initiation (and maintenance for CR)'],
    absoluteContraindications: ['History of Complex Sleep Behaviors after Zolpidem (e.g. sleep-driving, sleep-cooking)', 'Severe Sleep Apnea', 'Severe Hepatic Impairment'],
    relativeContraindications: ['Co-administration with other CNS depressants', 'Depression / Suicide Risk', 'Elderly / Fall Risk'],
    blackBoxWarnings: '⚠️ BLACK BOX WARNING: Complex sleep behaviors, including sleepwalking, sleep-driving, sleep-eating, and engaging in other activities while not fully awake, can cause serious injuries and death. Discontinue immediately if patient experiences complex sleep behaviors.',
    sideEffectsCommon: ['Next-Day Somnolence / Hangover Effect', 'Dizziness', 'Headache', 'Amnesia for Nighttime Events', 'Nausea'],
    sideEffectsSerious: ['Fatal Complex Sleep Behaviors (Trauma/Motor Collisions)', 'Severe Respiratory Depression', 'Anaphylaxis & Angioedema', 'Worsening Depression / Suicidal Ideation'],
    adverseReactionRisk: 'Next-morning driving impairment is prominent; female dosing is halved to 5 mg due to slower clearance.',
    interactions: [
      { targetName: 'Alcohol & Sedatives', targetType: 'Alcohol', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Exponentially spikes risk of life-threatening complex sleep behaviors and lethal apnea.', clinicalAction: 'Absolute contraindication.' },
      { targetName: 'Ketoconazole / CYP3A4 Inhibitors', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Inhibits zolpidem metabolism, dramatically increasing sedation duration.', clinicalAction: 'Reduce dose to 5 mg.' }
    ],
    adme: {
      absorption: 'Rapid from GI tract (Tmax 0.5 - 1.5 hours); food significantly delays onset',
      bioavailability: 'Approx 70%',
      distribution: 'Vd ~ 0.54 L/kg',
      proteinBinding: '92.5% bound to plasma proteins',
      metabolism: 'Converted to inactive metabolites primarily by CYP3A4 (~60%), CYP2C9 (~22%), and CYP1A2 (~14%)',
      excretion: 'Excreted in urine (~65%) and feces (~35%) as inactive metabolites',
      halfLife: '2.5 - 3.0 hours (prolonged to 9.9h in hepatic impairment)',
      therapeuticWindow: '50 - 250 ng/mL',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'C',
    lactationSafety: 'Excreted in breast milk in small amounts; monitor infant for sedation and limpness.',
    pediatricDosingRule: 'Safety and efficacy not established in pediatric patients under 18.',
    geriatricBeersWarning: 'BEERS CRITERIA AVOID: High risk of delirium, nighttime falls, motor vehicle accidents, and hip fractures. Max dose 5 mg.',
    renalAdjustmentGFR: 'No dosage adjustment needed, but monitor closely.',
    hepaticAdjustment: 'Start with 5 mg in mild/moderate hepatic impairment; avoid in severe cirrhosis.',
    legalStatus: 'Controlled Substance (Schedule II/IV)',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C. Secure in controlled drug vault.',
    inventoryStock: 310,
    batchNumber: 'LOT-ZOLP-5521A',
    expiryDate: '2027-08-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030066101011621005521A17270831',
    dependencePotential: 'Moderate',
    abusePotential: 'High',
    withdrawalRisk: 'Rebound insomnia, dysphoria, tremors, and sweating upon abrupt cessation.',
    atoms3D: {
      atoms: [
        { element: 'C', x: -1.5, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.2, y: 0.2, z: 0, color: '#38bdf8' },
        { element: 'N', x: 1.0, y: -0.5, z: 0.1, color: '#818cf8' },
        { element: 'C', x: 2.2, y: 0.3, z: 0, color: '#38bdf8' },
        { element: 'O', x: 2.2, y: 1.5, z: -0.1, color: '#f43f5e' },
        { element: 'N', x: 3.4, y: -0.4, z: 0.1, color: '#818cf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5]]
    }
  },

  // --- PERFORMANCE-ENHANCING DRUGS (PEDs & WADA PROHIBITED) ---
  {
    id: 'drug-nandrolone-decanoate',
    genericName: 'Nandrolone Decanoate',
    brandNames: ['Deca-Durabolin', 'Retabolil'],
    alphabetLetter: 'N',
    drugClass: '19-Nortestosterone Anabolic-Androgenic Steroid (AAS, Schedule III)',
    therapeuticCategory: 'Endocrinology & Sports Medicine / Anabolic Agent & WADA Prohibited',
    substanceCategory: 'Performance-enhancing substances',
    visualRiskTier: 'CONTROLLED_RISK',
    chemicalName: '[(8R,9S,10R,13S,14S,17S)-13-methyl-3-oxo-2,6,7,8,9,11,12,14,15,16-decahydro-1H-cyclopenta[a]phenanthren-17-yl] decanoate',
    molecularFormula: 'C28H44O3',
    molecularWeight: 428.65,
    smilesNotation: 'CCCCCCCCCC(=O)O[C@H]1CC[C@@H]2[C@@]1(CC[C@H]3[C@H]2CCC4=CC(=O)CC[C@@H]34)C',
    mechanismOfAction: 'Agonist at cytosolic androgen receptors; translocates to cell nucleus to stimulate protein synthesis, muscle hypertrophy, nitrogen retention, and erythropoiesis with reduced androgenic:anabolic ratio compared to testosterone.',
    dosageForms: ['Injection (IV/IM/SC)'],
    routes: ['Intramuscular (IM)'],
    availableStrengths: ['50 mg/mL', '100 mg/mL', '200 mg/mL Deep IM Depot Oil'],
    indications: ['Refractory Anemia of Chronic Renal Failure (historical)', 'Severe Cachexia / Muscle Wasting in Advanced HIV', 'Osteoporosis in Postmenopausal Women (historical)'],
    absoluteContraindications: [
      'Prostate Cancer or Male Breast Carcinoma',
      'Confirmed Pregnancy (severe virilization of female fetus)',
      'Severe Hepatic Impairment / Peliosis Hepatis',
      'Nephrosis or Nephrotic Phase of Nephritis'
    ],
    relativeContraindications: ['Pre-existing Cardiovascular Disease', 'Severe Dyslipidemia', 'Adolescents (premature epiphyseal closure)'],
    blackBoxWarnings: '⚠️ WADA S1 PROHIBITED ANABOLIC AGENT. Chronic supraphysiologic abuse leads to severe left ventricular hypertrophy, dilated cardiomyopathy, accelerated atherosclerosis, peliosis hepatis, severe cholestatic jaundice, irreversible hypogonadotropic hypogonadism, testicular atrophy, and sudden cardiac death in athletes.',
    sideEffectsCommon: ['Severe Acne Vulgaris', 'Gynecomastia (progestogenic activity)', 'Fluid Retention / Edema', 'Testicular Atrophy / Oligospermia', 'Virilization in Females (voice deepening, clitoromegaly)'],
    sideEffectsSerious: ['Fatal Myocardial Infarction / Thrombosis', 'Peliosis Hepatis & Hepatic Adenomas', 'Severe Secondary Polycythemia', 'Permanent Hypothalamic-Pituitary-Gonadal (HPGA) Shutdown', 'Extreme Aggression / Psychosis'],
    adverseReactionRisk: 'Profound suppression of endogenous LH and FSH occurs within 2 weeks of injection, resulting in azoospermia.',
    interactions: [
      { targetName: 'Oral Anticoagulants (Warfarin)', targetType: 'Drug', severity: 'MAJOR', mechanism: 'Anabolic steroids increase sensitivity to anticoagulants, sharply increasing INR and bleeding risk.', clinicalAction: 'Decrease warfarin dosage and monitor INR.' },
      { targetName: 'Insulin / Antidiabetics', targetType: 'Drug', severity: 'MODERATE', mechanism: 'Enhances insulin sensitivity, potentially inducing hypoglycemia.', clinicalAction: 'Adjust insulin dosage.' }
    ],
    adme: {
      absorption: 'Slow depot release from deep intramuscular oil injection; Tmax ~ 3 - 6 days',
      bioavailability: 'IM 100% depot release',
      distribution: 'Highly lipophilic; binds to androgen receptors in muscle and bone',
      proteinBinding: 'Over 90% bound to plasma proteins',
      metabolism: 'Hepatically metabolized via 5alpha-reductase to 5alpha-dihydronandrolone (DHN) and conjugated to 19-norandrosterone and 19-noretiocholanolone',
      excretion: 'Excreted renally as 19-norandrosterone (detectable in anti-doping urine tests for up to 18 months post-use)',
      halfLife: 'Depot release half-life: 6 - 12 days',
      therapeuticWindow: 'Supraphysiologic AAS dosing has no therapeutic safety window',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'X',
    lactationSafety: 'Contraindicated; causes severe masculinization of nursing infant.',
    pediatricDosingRule: 'Contraindicated in pediatrics due to premature epiphyseal closure and stunted adult height.',
    geriatricBeersWarning: 'High risk of worsening occult prostate carcinoma and fluid retention heart failure.',
    renalAdjustmentGFR: 'Contraindicated in nephrotic syndrome; monitor renal function.',
    hepaticAdjustment: 'Contraindicated in hepatic impairment.',
    legalStatus: 'WADA Prohibited Substance (Sports Doping)',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Store at 20°C to 25°C. Protect from light. Do not refrigerate (causes crystal precipitation in oil).',
    inventoryStock: 50,
    batchNumber: 'LOT-NAND-2210W',
    expiryDate: '2027-10-31',
    isRecallOrAlert: false,
    barcodeGS1: '010030077101011121002210W17271031',
    dependencePotential: 'Moderate',
    abusePotential: 'High',
    withdrawalRisk: 'Severe rebound hypogonadism, major clinical depression, loss of muscle mass, erectile dysfunction, and fatigue.',
    wadaProhibitionStatus: 'WADA S1.1 Anabolic Androgenic Steroids (Prohibited In-Competition and Out-of-Competition)',
    adulterationRiskNotes: 'Extremely high counterfeit rate in black-market underground gym laboratories: Frequently contaminated with heavy metals, non-sterile carrier oils, or substituted with cheap testosterone.',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.5, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -1.3, y: 0.2, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: 1.2, y: 0.2, z: 0, color: '#38bdf8' },
        { element: 'O', x: 2.3, y: -0.5, z: 0, color: '#f43f5e' },
        { element: 'O', x: -3.6, y: -0.1, z: 0.1, color: '#f43f5e' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5]]
    }
  },

  // --- FORENSIC TOXICOLOGY & ILLICIT RECREATIONAL SUBSTANCES ---
  {
    id: 'drug-methamphetamine-forensic',
    genericName: 'Methamphetamine Hydrochloride (Forensic Reference)',
    brandNames: ['Desoxyn (Rx)', 'Street Names: Crystal Meth, Ice, Glass, Tina, Crank'],
    alphabetLetter: 'M',
    drugClass: 'Central Nervous System Sympathomimetic Stimulant (Schedule II / Illicit)',
    therapeuticCategory: 'Forensic Toxicology & Emergency Medicine / Sympathomimetic Toxidrome',
    substanceCategory: 'Illicit recreational drugs',
    visualRiskTier: 'ILLICIT_TOXICOLOGY',
    chemicalName: '(2S)-N-methyl-1-phenylpropan-2-amine hydrochloride',
    molecularFormula: 'C10H15N • HCl',
    molecularWeight: 185.70,
    smilesNotation: 'CC(CC1=CC=CC=C1)NC.Cl',
    mechanismOfAction: 'Reverses presynaptic dopamine (DAT), norepinephrine (NET), and serotonin (SERT) transporters, producing massive monoamine efflux into synaptic clefts while inhibiting vesicular monoamine transporter 2 (VMAT-2) and MAO.',
    dosageForms: ['Tablet', 'Powders', 'Granules'],
    routes: ['Oral', 'Inhaled', 'Intravenous (IV)', 'Nasal'],
    availableStrengths: ['5 mg Desoxyn Rx (Rare)', 'Illicit Purity Varies (50% - 99% d-methamphetamine)'],
    indications: ['Forensic toxicology reference; Refractory ADHD & Exogenous Obesity (rare Desoxyn Rx indications)'],
    absoluteContraindications: [
      'Advanced Arteriosclerosis & Severe Coronary Artery Disease',
      'Severe Uncontrolled Hypertension',
      'Hyperthyroidism',
      'History of Drug Addiction / Stimulant Use Disorder',
      'Concomitant MAO Inhibitors within 14 days'
    ],
    relativeContraindications: ['Bipolar Disorder', 'Severe Agitation', 'Structural Cardiac Abnormalities'],
    blackBoxWarnings: '⚠️ HIGH ABUSE, DEPENDENCE AND TOXICITY POTENTIAL. Acute overdose causes malignant hyperthermia (temp > 42°C), severe rhabdomyolysis, hypertensive encephalopathy, aortic dissection, hemorrhagic stroke, intractable ventricular arrhythmias, and acute paranoid psychosis. Antidotes / Resuscitation: Aggressive cooling, IV Benzodiazepines, IV fluids.',
    sideEffectsCommon: ['Severe Tachycardia', 'Pupillary Mydriasis', 'Diaphoresis', 'Bruxism / Jaw Clenching', 'Insomnia', 'Anorexia'],
    sideEffectsSerious: ['Lethal Hyperpyrexia / Heatstroke', 'Acute Myocardial Infarction / Spasm', 'Aortic Dissection', 'Hemorrhagic Stroke', 'Methamphetamine-Induced Cardiomyopathy', 'Severe Rhabdomyolysis with Acute Renal Failure', 'Violent Paranoid Psychosis (Excited Delirium)'],
    adverseReactionRisk: 'Core body temperature > 40°C with agitation represents emergency hyperthermic crisis: Requires rapid ice-water immersion cooling and high-dose IV Lorazepam.',
    interactions: [
      { targetName: 'MAO Inhibitors (Phenelzine, Tranylcypromine, Linezolid)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Precipitates catastrophic hypertensive crisis, hyperpyrexia, and fatal intracranial hemorrhage.', clinicalAction: 'Absolute contraindication.' },
      { targetName: 'Pure Beta Blockers (Propranolol)', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Causes unopposed alpha-1 receptor vasoconstriction, spiking blood pressure to lethal levels and causing acute heart failure.', clinicalAction: 'Use Benzodiazepines, Phentolamine (alpha-blocker), or Nitroprusside; avoid pure beta blockers.' }
    ],
    adme: {
      absorption: 'Rapid and complete (smoked/IV onset seconds; nasal 3-5 mins; oral 20-30 mins)',
      bioavailability: 'Smoked ~ 90%; IV 100%; Oral ~ 67-70%',
      distribution: 'Highly lipophilic; Vd ~ 3 - 4 L/kg; concentrates in brain, kidneys, and lungs',
      proteinBinding: 'Approx 10 - 20% bound to plasma proteins',
      metabolism: 'Hepatic via CYP2D6 to active Amphetamine and inactive 4-hydroxymethamphetamine',
      excretion: 'Excreted in urine (pH-dependent: acidic urine increases excretion; alkaline urine prolongs half-life)',
      halfLife: '10 - 12 hours (significantly longer duration than cocaine)',
      therapeuticWindow: 'Forensic: > 0.1 mg/L (toxic); > 1.0 mg/L (potentially lethal)',
      narrowTherapeuticIndex: true
    },
    pregnancyCategory: 'X',
    lactationSafety: 'Contraindicated; concentrates in breast milk and causes neonatal neurotoxicity.',
    pediatricDosingRule: 'Desoxyn rarely used in children ≥6 years; not recommended.',
    geriatricBeersWarning: 'Extreme risk of acute stroke, myocardial infarction, and fatal hypertensive emergencies.',
    renalAdjustmentGFR: 'Urinary clearance dependent; severe renal failure slows elimination.',
    hepaticAdjustment: 'Reduced clearance in liver failure.',
    legalStatus: 'Prohibited / Illicit Substance (Schedule I)',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'Forensic evidence lockbox / Schedule II vault.',
    inventoryStock: 0,
    batchNumber: 'FORENSIC-METH-REF-01',
    expiryDate: '2030-01-01',
    isRecallOrAlert: true,
    recallStatusText: 'Forensic Toxicology & Overdose Reference Standard',
    barcodeGS1: '01003009910101192100FORENSIC17300101',
    dependencePotential: 'Severe (Physical & Psychological)',
    abusePotential: 'Extreme / Schedule I-II',
    withdrawalRisk: 'Severe dysphoria, hypersomnia, profound depression with high suicide risk, psychomotor retardation, and intense drug craving.',
    streetNamesForensic: ['Crystal Meth', 'Ice', 'Glass', 'Tina', 'Speed', 'Crank', 'Bikers Coffee'],
    atoms3D: {
      atoms: [
        { element: 'C', x: -1.8, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.6, y: -1.2, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.6, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: 0.6, y: 0.9, z: 0, color: '#38bdf8' },
        { element: 'C', x: 1.8, y: 1.6, z: 0, color: '#38bdf8' },
        { element: 'N', x: 3.0, y: 0.8, z: 0.1, color: '#818cf8' },
        { element: 'C', x: 4.2, y: 1.5, z: 0, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
    }
  },

  // --- BIOLOGICS, MONOCLONAL ANTIBODIES & ADVANCED INJECTIONS ---
  {
    id: 'drug-pembrolizumab',
    genericName: 'Pembrolizumab',
    brandNames: ['Keytruda'],
    alphabetLetter: 'P',
    drugClass: 'Humanized Monoclonal IgG4-kappa Immune Checkpoint Inhibitor (Anti-PD-1)',
    therapeuticCategory: 'Oncology & Immunotherapy / Immune Checkpoint Blockade',
    substanceCategory: 'Specialist prescription',
    visualRiskTier: 'SPECIALIST_HOSPITAL',
    chemicalName: 'Recombinant humanized IgG4-kappa monoclonal antibody targeting the Programmed Death Receptor 1 (PD-1)',
    molecularFormula: 'C6504H10004N1716O2036S46',
    molecularWeight: 149000, // 149 kDa
    smilesNotation: 'PEPTIDE-MONOCLONAL-ANTIBODY-SEQUENCE',
    mechanismOfAction: 'Binds with high affinity to the PD-1 cell surface receptor on cytotoxic T-lymphocytes, blocking interaction with PD-L1 and PD-L2 tumor ligands, reversing T-cell exhaustion and restoring potent antitumor immune destruction.',
    dosageForms: ['Injection (IV/IM/SC)', 'Infusion'],
    routes: ['Intravenous (IV)'],
    availableStrengths: ['100 mg / 4 mL (25 mg/mL) Single-Dose Vial'],
    indications: [
      'Metastatic Non-Small Cell Lung Cancer (NSCLC)',
      'Unresectable or Metastatic Melanoma',
      'MSI-H or dMMR Colorectal / Solid Tumors',
      'Triple-Negative Breast Cancer (TNBC)',
      'Renal Cell Carcinoma (RCC)',
      'Head and Neck Squamous Cell Carcinoma (HNSCC)'
    ],
    absoluteContraindications: ['Severe Life-Threatening Immune-Mediated Adverse Reactions (irAEs) to Previous Anti-PD-1 Therapy'],
    relativeContraindications: ['Active Pre-existing Severe Autoimmune Disease (e.g. Crohn’s, Lupus, Multiple Sclerosis)', 'Allogeneic Hematopoietic Stem Cell Transplant'],
    blackBoxWarnings: '⚠️ IMMUNE-MEDIATED ADVERSE REACTIONS (irAEs): Can occur in any organ system, including lethal immune-mediated pneumonitis, colitis, hepatitis, endocrinopathies (hypophysitis, type 1 diabetes DKA, thyroiditis), nephritis, and myocarditis. Requires early detection, drug discontinuation, and high-dose corticosteroid immunosuppression (Methylprednisolone 1-2 mg/kg/day).',
    sideEffectsCommon: ['Fatigue', 'Rash / Pruritus', 'Diarrhea', 'Nausea', 'Decreased Appetite', 'Hypothyroidism'],
    sideEffectsSerious: ['Immune-Mediated Pneumonitis (Dry Cough, Hypoxia)', 'Severe Autoimmune Colitis / Bowel Perforation', 'Fulminant Autoimmune Hepatitis', 'Fatal Immune Myocarditis', 'Stevens-Johnson Syndrome / TEN'],
    adverseReactionRisk: 'New or worsening dry cough, shortness of breath, or diarrhea > 4 stools/day above baseline requires immediate oncologic evaluation and high-resolution chest CT.',
    interactions: [
      { targetName: 'Systemic Corticosteroids / Immunosuppressants at Baseline', targetType: 'Drug', severity: 'MAJOR', mechanism: 'High-dose baseline immunosuppressants may attenuate antitumor efficacy of pembrolizumab.', clinicalAction: 'Avoid baseline prednisone > 10 mg/day prior to initiating immunotherapy unless treating active irAE.' }
    ],
    adme: {
      absorption: '100% bioavailable upon IV infusion',
      bioavailability: '100% IV',
      distribution: 'Vd at steady state ~ 6.0 Liters (restricted primarily to vascular space)',
      proteinBinding: 'Monoclonal antibody; does not bind plasma proteins non-specifically',
      metabolism: 'Degraded into small peptides and amino acids via non-specific catabolic clearance pathways',
      excretion: 'Non-renal; clearance is approximately 0.22 L/day',
      halfLife: 'Terminal elimination half-life ~ 22 days (supports Q3W or Q6W dosing regimens)',
      therapeuticWindow: 'Monoclonal target receptor saturation maintained across therapeutic dose range',
      narrowTherapeuticIndex: false
    },
    pregnancyCategory: 'D',
    lactationSafety: 'Human IgG4 is excreted in breast milk; avoid breastfeeding during treatment and for 4 months after final dose.',
    pediatricDosingRule: '2 mg/kg IV every 3 weeks (max 200 mg) for approved pediatric MSI-H tumors.',
    geriatricBeersWarning: 'No dosage adjustments needed, but monitor closely for atypical irAE presentations.',
    renalAdjustmentGFR: 'No dosage adjustment required for mild to severe renal impairment.',
    hepaticAdjustment: 'No dosage adjustment for mild hepatic impairment; not studied in severe impairment.',
    legalStatus: 'Specialist Prescription (Oncology/Biologic)',
    isHighAlert: true,
    isColdChain: true,
    storageRequirement: '❄️ COLD-CHAIN MONOCLONAL: Refrigerate at 2°C to 8°C (36°F to 46°F) in original carton. PROTECT FROM LIGHT. DO NOT FREEZE. DO NOT SHAKE.',
    injectionProfile: {
      compatibleDiluents: ['0.9% Sodium Chloride (Normal Saline)', '5% Dextrose Injection (D5W)'],
      incompatibleDiluents: ['Lactated Ringers', 'Sterile Water for Injection without isotonic solute'],
      ySiteCompatibleDrugs: ['Ondansetron', 'Diphenhydramine', 'Ranitidine', 'Dexamethasone'],
      ySiteIncompatibleDrugs: ['Fluorouracil', 'Paclitaxel', 'Oxaliplatin', 'Cisplatin'],
      lightProtectionRequired: true,
      filterRequirement: 'Must infuse through a sterile, non-pyrogenic, low-protein-binding 0.2 to 5-micron inline filter.',
      maximumInfusionRate: 'Administer over 30 minutes via IV infusion pump.',
      vesicantOrIrritant: 'Neutral'
    },
    inventoryStock: 35,
    batchNumber: 'LOT-PEMB-9021K',
    expiryDate: '2027-04-30',
    isRecallOrAlert: false,
    barcodeGS1: '010030099101011321009021K17270430',
    atoms3D: {
      atoms: [
        { element: 'C', x: -2.0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'N', x: -0.8, y: 0.8, z: 0, color: '#818cf8' },
        { element: 'C', x: 0.4, y: 0, z: 0, color: '#38bdf8' },
        { element: 'O', x: 0.4, y: -1.2, z: 0, color: '#f43f5e' },
        { element: 'S', x: 1.8, y: 0.8, z: 0.2, color: '#facc15' },
        { element: 'S', x: 3.0, y: 0, z: -0.1, color: '#facc15' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]]
    }
  },

  // --- NON-MEDICINE POISON, CHEMICAL & TOXIC SUBSTANCES ---
  {
    id: 'drug-paraquat-toxin',
    genericName: 'Paraquat Dichloride (Pesticide / Toxin Reference)',
    brandNames: ['Gramoxone', 'Paraquat Concentrate'],
    alphabetLetter: 'P',
    drugClass: 'Bipyridyl Non-Selective Contact Herbicide / Redox-Cycling Toxin',
    therapeuticCategory: 'Toxicology & Environmental Health / Lethal Agricultural Poison',
    substanceCategory: 'Toxic chemicals',
    visualRiskTier: 'ILLICIT_TOXICOLOGY',
    chemicalName: '1,1-dimethyl-4,4-bipyridinium dichloride',
    molecularFormula: 'C12H14Cl2N2',
    molecularWeight: 257.16,
    smilesNotation: 'C[N+]1=CC=C(C=C1)C2=CC=[N+](C=C2)C.[Cl-].[Cl-]',
    mechanismOfAction: 'Undergoes intracellular cyclic reduction-oxidation (redox cycling) by NADPH-cytochrome P450 reductase, generating massive cascades of superoxide radicals, hydrogen peroxide, and lipid peroxidation, destroying alveolar type I and II pneumocytes.',
    dosageForms: ['Solution', 'Sprays'],
    routes: ['Oral', 'Inhaled', 'Topical'],
    availableStrengths: ['20% - 24% Liquid Concentrate (Blue-Green dyed with stenching agent)'],
    indications: ['No medical use. Agricultural non-selective herbicide. Fatal toxicological exposure hazard.'],
    absoluteContraindications: ['ALL HUMAN INGESTION IS LIFE-THREATENING.'],
    relativeContraindications: ['High-Concentration Oxygen Therapy (Oxygen worsens free radical lung injury)'],
    blackBoxWarnings: '☠️ GHS DANGER - FATAL IF SWALLOWED, INHALED, OR ABSORBED THROUGH BROKEN SKIN. Ingestion of as little as 10-15 mL causes fatal fulminant pulmonary fibrosis and multi-organ failure. CONTRAINDICATION: DO NOT ADMINISTER SUPPLEMENTAL OXYGEN UNLESS PaO2 < 40 mmHg, as oxygen exponentially accelerates free radical destruction of lung tissue.',
    sideEffectsCommon: ['Corrosive Mucosal Burning of Mouth, Tongue, and Esophagus', 'Severe Vomiting & Bloody Diarrhea', 'Painful Dysphagia'],
    sideEffectsSerious: ['Rapidly Fatal Pulmonary Fibrosis (Honeycombing / Anoxia)', 'Fulminant Acute Renal Tubular Necrosis', 'Acute Hepatic Necrosis', 'Esophageal Perforation and Mediastinitis', 'Multi-Organ Failure'],
    adverseReactionRisk: 'Plasma paraquat level measured on Proudfoot nomogram predicts fatal outcome.',
    interactions: [
      { targetName: 'Supplemental High-Flow Oxygen', targetType: 'Drug', severity: 'CONTRAINDICATED_CRITICAL', mechanism: 'Supplies excess molecular oxygen as substrate for redox cycling, rapidly accelerating fatal pulmonary destruction.', clinicalAction: 'Withhold oxygen unless patient is in agonal hypoxia (SpO2 < 70%).' }
    ],
    adme: {
      absorption: 'Poor from intact skin; rapid from GI tract (Tmax ~ 1-2 hours)',
      bioavailability: 'Oral ~ 5 - 15% (sufficient to cause fatal toxicity)',
      distribution: 'Actively transported into alveolar type II cells via polyamine transport system where it concentrates 10-fold higher than in plasma',
      proteinBinding: 'Negligible',
      metabolism: 'Not significantly metabolized; undergoes continuous catalytic redox cycling',
      excretion: 'Excreted unchanged by renal tubular filtration (compromised as acute tubular necrosis develops)',
      halfLife: 'Plasma half-life ~ 12 hours; lung tissue half-life > 120 hours',
      therapeuticWindow: 'Forensic: Any detectable level is toxic; > 2.0 mcg/mL at 4h is uniformly fatal',
      narrowTherapeuticIndex: true
    },
    pregnancyCategory: 'X',
    lactationSafety: 'Lethal toxin.',
    pediatricDosingRule: 'Not applicable. Emergency decontamination with Fuller’s Earth or Activated Charcoal.',
    geriatricBeersWarning: 'Fatal chemical toxin.',
    renalAdjustmentGFR: 'Causes severe acute renal failure; hemoperfusion within 2-4 hours is required.',
    hepaticAdjustment: 'Causes severe toxic hepatitis.',
    legalStatus: 'Forensic Toxin / Hazard',
    isHighAlert: true,
    isColdChain: false,
    storageRequirement: 'GHS Category 1 Toxic Chemical. Store in locked hazardous agrochemical depot.',
    inventoryStock: 0,
    batchNumber: 'TOX-PARAQUAT-HAZ-99',
    expiryDate: '2030-01-01',
    isRecallOrAlert: true,
    recallStatusText: 'Global Banned / Restricted Chemical Pesticide Hazard',
    barcodeGS1: '01003009999999122100PARAQUAT17300101',
    atoms3D: {
      atoms: [
        { element: 'C', x: -1.5, y: -0.5, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.2, y: -1.2, z: 0, color: '#38bdf8' },
        { element: 'N', x: 0.9, y: -0.5, z: 0.1, color: '#818cf8' },
        { element: 'C', x: 0.9, y: 0.9, z: 0, color: '#38bdf8' },
        { element: 'C', x: -0.2, y: 1.6, z: 0, color: '#38bdf8' },
        { element: 'C', x: -1.5, y: 0.9, z: 0, color: '#38bdf8' }
      ],
      bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]]
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
    activeVaccinesStored: ['Digoxin Immune Fab', 'Pembrolizumab (Keytruda)', 'Recombinant Alteplase (tPA)', 'Trastuzumab Emtansine (Kadcyla)'],
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
