import { 
  UniversalSubstanceRecord,
  ForensicToxRecord,
  CounterfeitIntelligenceRecord,
  NovaSubstanceLegalStatus,
  TabletSubtype,
  CapsuleSubtype,
  ReleaseKineticsType,
  UniversalStrengthUnit,
  PharmaDosageForm,
  PharmaAdministrationRoute
} from '../types/biotech';

/* =========================================================================
   1. MASTER UNIVERSAL SUBSTANCE DATABASE (VERIFIED COMMERCIAL RECORDS)
   ========================================================================= */

export const UNIVERSAL_SUBSTANCES_DATABASE: UniversalSubstanceRecord[] = [
  // 1. Amlodipine Besylate
  {
    id: 'sub-amlodipine',
    genericName: 'Amlodipine Besylate',
    brandNames: ['Norvasc', 'Amlovas', 'Amlong', 'Istin', 'Amlo'],
    aliases: ['amlodipine', 'norvasc', 'amlovas', 'amlong'],
    activeIngredients: ['Amlodipine Besylate'],
    casNumber: '111470-99-6',
    atcCode: 'C08CA01',
    therapeuticClass: 'Antihypertensive / Antianginal',
    pharmacologicClass: 'Dihydropyridine Calcium Channel Blocker (CCB)',
    primaryLegalStatus: 'Prescription',
    isHighAlert: false,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States (FDA)', status: 'Prescription', scheduleDesignation: 'Rx Only', prescriptionRequired: true },
      { countryCode: 'IN', countryName: 'India (CDSCO)', status: 'Prescription', scheduleDesignation: 'Schedule H', prescriptionRequired: true },
      { countryCode: 'UK', countryName: 'United Kingdom (MHRA)', status: 'Prescription', scheduleDesignation: 'POM', prescriptionRequired: true },
      { countryCode: 'EU', countryName: 'European Union (EMA)', status: 'Prescription', scheduleDesignation: 'Prescription Only', prescriptionRequired: true }
    ],
    dosageForm: 'Tablets',
    dosageSubtype: 'Conventional Compressed',
    releaseType: 'Immediate Release (IR)',
    primaryRoute: 'Oral',
    allAvailableRoutes: ['Oral'],
    strengthValue: 5,
    strengthUnit: 'mg',
    concentrationDisplay: '2.5 mg, 5 mg, 10 mg Tablets',
    approvedUses: ['Essential Hypertension in adults and children ≥6y', 'Chronic Stable Angina Pectoris', 'Vasospastic (Prinzmetal’s) Angina'],
    medicalSpecialties: ['Cardiology', 'Internal Medicine'],
    mechanismOfAction: 'Inhibits transmembrane influx of extracellular calcium ions across voltage-gated L-type calcium channels in vascular smooth muscle and myocardium, causing peripheral arteriolar vasodilation and reduced systemic vascular resistance.',
    clinicalBenefits: ['Gradual onset of action with zero reflex tachycardia', 'Long terminal half-life permitting once-daily dosing', 'Proven reduction in stroke and cardiovascular events in ALLHAT trial'],
    clinicalLimitations: ['Does not provide immediate acute blood pressure lowering (peaks over days)', 'Lacks renal antiproteinuric benefit compared to ACE inhibitors'],
    commonSideEffects: ['Dose-dependent peripheral ankle edema (10%)', 'Facial flushing', 'Headache', 'Dizziness', 'Palpitations'],
    seriousAdverseEffects: ['Severe peripheral edema with venous stasis', 'Worsening myocardial ischemia in patients with severe obstructive CAD upon initiation'],
    contraindications: ['Known hypersensitivity to dihydropyridines', 'Severe hypotension (SBP < 90 mmHg)', 'Cardiogenic shock', 'Severe aortic stenosis'],
    allergyInformation: 'Cross-reactivity within dihydropyridine class (Nifedipine, Felodipine) is possible.',
    drugInteractionsSummary: 'Strong CYP3A4 inhibitors (Ketoconazole, Clarithromycin) increase amlodipine exposure. Simvastatin daily dose must not exceed 20 mg when co-prescribed with amlodipine.',
    alcoholInteractionSummary: 'Alcohol potentiates amlodipine-induced vasodilation, increasing orthostatic hypotension and syncope risk.',
    foodInteractions: ['Grapefruit juice may slightly increase amlodipine bioavailability, but clinical effect is modest.'],
    diseaseInteractions: ['Severe Hepatic Impairment: Clearance is decreased; start at 2.5 mg.', 'Heart Failure: Generally safe (PRAISE trial), but monitor for fluid retention.'],
    pregnancySafetyGuidance: 'FDA Category C. Limited data; preferred alternatives include Labetalol, Nifedipine, or Methyldopa.',
    breastfeedingGuidance: 'Present in human milk in small amounts; generally compatible under pediatrician review.',
    pediatricGuidance: 'Approved for hypertension in pediatric patients aged 6 to 17 years (starting dose 2.5 mg QD).',
    geriatricBeersGuidance: 'Decreased clearance in elderly; initial starting dose should be 2.5 mg QD.',
    renalAdjustment: 'No dose adjustment required across all stages of CKD or hemodialysis.',
    hepaticAdjustment: 'Severe hepatic impairment: Initiate therapy at 2.5 mg QD.',
    cardiacConsiderations: 'Causes peripheral arterial dilation with no negative inotropic cardiac depression at therapeutic doses.',
    diabetesConsiderations: 'Metabolically neutral; does not affect glycemic control or lipid profiles.',
    admeAbsorption: 'Oral bioavailability is 64-90%; peak plasma concentrations reached in 6-12 hours.',
    admeDistribution: 'Volume of distribution is ~21 L/kg; 97.5% plasma protein bound.',
    admeMetabolism: 'Extensively metabolized by hepatic CYP3A4 into inactive metabolites (90%).',
    admeExcretion: '60% urinary excretion, 20-25% feces (mostly inactive metabolites).',
    admeHalfLife: '30 to 50 hours (terminal elimination half-life).',
    primaryManufacturers: ['Pfizer', 'Mylan / Viatris', 'Cipla', 'Sun Pharma'],
    storageAndColdChain: 'Store between 15°C to 30°C (59°F to 86°F). Protect from light and moisture.'
  },

  // 2. Sildenafil Citrate
  {
    id: 'sub-sildenafil',
    genericName: 'Sildenafil Citrate',
    brandNames: ['Viagra', 'Revatio', 'Manforce', 'Caverta', 'Assurans'],
    aliases: ['sildenafil', 'viagra', 'revatio', 'pde5 inhibitor'],
    activeIngredients: ['Sildenafil Citrate'],
    casNumber: '171599-83-0',
    atcCode: 'G04BE03',
    therapeuticClass: 'Urological / Pulmonary Vasodilator',
    pharmacologicClass: 'Phosphodiesterase-5 (PDE5) Inhibitor',
    primaryLegalStatus: 'Prescription',
    isHighAlert: false,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States', status: 'Prescription', scheduleDesignation: 'Rx Only', prescriptionRequired: true },
      { countryCode: 'UK', countryName: 'United Kingdom', status: 'Pharmacist-only', scheduleDesignation: 'Viagra Connect (Pharmacy P-Med)', prescriptionRequired: false },
      { countryCode: 'IN', countryName: 'India', status: 'Prescription', scheduleDesignation: 'Schedule H', prescriptionRequired: true }
    ],
    dosageForm: 'Tablets',
    dosageSubtype: 'Film Coated',
    releaseType: 'Immediate Release (IR)',
    primaryRoute: 'Oral',
    allAvailableRoutes: ['Oral', 'Intravenous (IV)'],
    strengthValue: 50,
    strengthUnit: 'mg',
    concentrationDisplay: '25 mg, 50 mg, 100 mg Film-Coated Tablets (Viagra); 20 mg Tablets / 10 mg/12.5 mL IV Injection (Revatio for PAH)',
    approvedUses: ['Erectile Dysfunction (ED)', 'Pulmonary Arterial Hypertension (PAH - WHO Group I) to improve exercise capacity'],
    medicalSpecialties: ['Urology', 'Pulmonology', 'Cardiology'],
    mechanismOfAction: 'Selective inhibitor of cyclic guanosine monophosphate (cGMP)-specific phosphodiesterase type 5 (PDE5). Enhances nitric oxide (NO)-mediated smooth muscle relaxation and blood flow into corpus cavernosum during sexual stimulation, and relaxes pulmonary arterial vascular bed.',
    clinicalBenefits: ['High clinical efficacy rate (>80% response in ED)', 'Rapid onset within 30-60 minutes', 'Proven reduction in pulmonary vascular resistance and improvement in 6-minute walk distance in PAH'],
    clinicalLimitations: ['Requires sexual stimulation for erectile response; does not act as an aphrodisiac', 'Duration of action is 4-6 hours (shorter than Tadalafil)'],
    commonSideEffects: ['Headache (16%)', 'Facial flushing (10%)', 'Dyspepsia', 'Nasal congestion', 'Cyanopsia (blue-tinted vision / visual brightness)'],
    seriousAdverseEffects: [
      '🚨 Catastrophic Fatal Hypotension when combined with Nitrates / NO Donors',
      'Non-Arteritic Anterior Ischemic Optic Neuropathy (NAION) leading to sudden permanent vision loss',
      'Sudden Sensorineural Hearing Loss (tinnitus/vertigo)',
      'Priapism (prolonged erection > 4 hours risking cavernous tissue necrosis)'
    ],
    contraindications: [
      'Co-administration with any organic nitrate formulation (Nitroglycerin, Isosorbide Mononitrate/Dinitrate) or Guanylate Cyclase stimulators (Riociguat)',
      'Known hypersensitivity',
      'Severe hepatic impairment (Child-Pugh C)',
      'Recent stroke or myocardial infarction (< 6 months)',
      'Severe hypotension (<90/50 mmHg) or uncontrolled resting hypertension'
    ],
    allergyInformation: 'No known sulfonamide cross-reactivity despite sulfonyl moiety.',
    drugInteractionsSummary: 'Absolute contraindication with Nitrates (causes life-threatening refractory hypotension). CYP3A4 inhibitors (Ritonavir, Ketoconazole) markedly increase sildenafil AUC. Co-administration with Alpha-blockers (Tamsulosin) must be separated by 4 hours to prevent orthostatic syncope.',
    alcoholInteractionSummary: 'Alcohol consumption impairs erectile ability and compounds systemic vasodilatory hypotensive effects.',
    foodInteractions: ['High-fat meals delay gastric absorption and increase Tmax by ~60 minutes, reducing peak efficacy.'],
    diseaseInteractions: [
      'Cardiovascular Disease: Assess cardiac fitness for sexual intercourse prior to prescribing.',
      'Anatomical Penile Deformity / Peyronie’s Disease: Increased risk of priapism.'
    ],
    pregnancySafetyGuidance: 'FDA Category B. Safe and indicated for Pulmonary Arterial Hypertension in pregnant females under specialist care.',
    breastfeedingGuidance: 'Minimal transfer into breast milk when used for maternal PAH.',
    pediatricGuidance: 'Chronic use for pediatric PAH in children 1-17 years is restricted in some jurisdictions due to dose-dependent mortality signals in clinical trials.',
    geriatricBeersGuidance: 'Starting dose should be reduced to 25 mg in patients aged ≥65 years due to reduced hepatic/renal clearance.',
    renalAdjustment: 'Severe renal impairment (CrCl < 30 mL/min): Start with 25 mg dose.',
    hepaticAdjustment: 'Hepatic impairment (cirrhosis): Start with 25 mg dose.',
    cardiacConsiderations: 'Assess baseline resting BP and exercise tolerance; nitrate contraindication is absolute.',
    diabetesConsiderations: 'Safe in diabetic neuropathy; dose escalation to 100 mg often required.',
    admeAbsorption: 'Rapid oral absorption; absolute bioavailability 41%; Tmax is 30-120 minutes on fasting stomach.',
    admeDistribution: 'Volume of distribution is 105 L; 96% plasma protein bound.',
    admeMetabolism: 'Metabolized predominantly by hepatic CYP3A4 (major) and CYP2C9 (minor) to active N-desmethyl metabolite.',
    admeExcretion: '80% excreted in feces, 13% in urine as metabolites.',
    admeHalfLife: '3 to 5 hours.',
    primaryManufacturers: ['Pfizer (Viagra / Revatio)', 'Mankind (Manforce)', 'Sun Pharma', 'Cipla'],
    storageAndColdChain: 'Store at 15°C to 30°C (59°F to 86°F).'
  },

  // 3. Paracetamol / Acetaminophen
  {
    id: 'sub-paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    brandNames: ['Dolo 650', 'Crocin', 'Calpol', 'Tylenol', 'Panadol', 'Ofirmev'],
    aliases: ['paracetamol', 'acetaminophen', 'dolo', 'crocin', 'tylenol', 'panadol', 'apap'],
    activeIngredients: ['Paracetamol / Acetaminophen'],
    casNumber: '103-90-2',
    atcCode: 'N02BE01',
    therapeuticClass: 'Analgesic & Antipyretic',
    pharmacologicClass: 'Centrally Acting Cyclooxygenase (COX-3 / Peroxidase) Inhibitor & Endocannabinoid Modulator',
    primaryLegalStatus: 'OTC',
    isHighAlert: false,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States', status: 'OTC', scheduleDesignation: 'OTC Monograph', prescriptionRequired: false },
      { countryCode: 'IN', countryName: 'India', status: 'OTC', scheduleDesignation: 'Non-Schedule OTC (500/650mg)', prescriptionRequired: false },
      { countryCode: 'UK', countryName: 'United Kingdom', status: 'OTC', scheduleDesignation: 'GSL / P (pack size limits apply)', prescriptionRequired: false }
    ],
    dosageForm: 'Tablets',
    dosageSubtype: 'Scored',
    releaseType: 'Immediate Release (IR)',
    primaryRoute: 'Oral',
    allAvailableRoutes: ['Oral', 'Intravenous (IV)', 'Rectal'],
    strengthValue: 650,
    strengthUnit: 'mg',
    concentrationDisplay: '500 mg, 650 mg Scored Tablets; 120 mg/5 mL & 250 mg/5 mL Pediatric Suspensions; 1000 mg/100 mL IV Infusion (Ofirmev); 125 mg, 250 mg Rectal Suppositories',
    approvedUses: ['Mild-to-moderate pain (headache, toothache, musculoskeletal ache, dysmenorrhea)', 'Fever reduction in adults and children', 'Multimodal post-operative pain management (IV Infusion)'],
    medicalSpecialties: ['Primary Care', 'Pediatrics', 'Emergency Medicine', 'Anesthesiology'],
    mechanismOfAction: 'Inhibits prostaglandin synthesis centrally in the hypothalamus and central nervous system by blocking the peroxidase catalytic site of prostaglandin H2 synthase. Lacks significant peripheral anti-inflammatory activity.',
    clinicalBenefits: ['Does not cause gastric mucosal ulceration or GI bleeding (unlike NSAIDs)', 'Does not inhibit platelet aggregation or prolong bleeding time', 'Safe in renal impairment and active asthma (no bronchospasm)'],
    clinicalLimitations: ['Minimal peripheral anti-inflammatory effect (inferior to NSAIDs in acute arthritis)', 'Overdose causes severe, potentially fatal centrilobular hepatic necrosis'],
    commonSideEffects: ['Generally well-tolerated at therapeutic doses; rare mild nausea or rash'],
    seriousAdverseEffects: [
      '🚨 Acute Centrilobular Liver Necrosis / Hepatic Failure (from accumulation of toxic N-acetyl-p-benzoquinone imine [NAPQI] metabolite when glutathione is depleted in overdose >4g/day)',
      'Severe Cutaneous Adverse Reactions (SCAR) including Stevens-Johnson Syndrome (SJS) and Toxic Epidermal Necrolysis (TEN)'
    ],
    contraindications: ['Known severe hypersensitivity to paracetamol', 'Severe active acute liver failure or decompensated cirrhosis'],
    allergyInformation: 'Rare true allergy; safe alternative for patients with aspirin/NSAID-exacerbated respiratory disease (AERD).',
    drugInteractionsSummary: 'Chronic high-dose paracetamol (>2 g/day) potentiates Warfarin anticoagulant effect, elevating INR. Co-administration with enzyme-inducing drugs (Rifampin, Carbamazepine, Phenytoin) increases NAPQI formation.',
    alcoholInteractionSummary: 'Chronic heavy alcohol consumption induces CYP2E1 and depletes hepatic glutathione stores, dramatically lowering the threshold for paracetamol hepatotoxicity. Max daily dose must be limited to ≤2000 mg in chronic alcohol users.',
    foodInteractions: ['High pectin or carbohydrate meals may slightly delay absorption rate, but total bioavailability is unchanged.'],
    diseaseInteractions: [
      'Severe Chronic Liver Disease: Limit daily dose to 2000 mg / 24 hours.',
      'Severe Malnutrition / Anorexia / Chronic Dehydration: Glutathione depleted; reduce total dose.'
    ],
    pregnancySafetyGuidance: 'FDA Category B. Drug of choice for pain and fever during all trimesters of pregnancy at lowest effective dose.',
    breastfeedingGuidance: 'Excreted in breast milk in tiny amounts; fully compatible with breastfeeding (AAP Approved).',
    pediatricGuidance: 'Pediatric dosing MUST BE CALCULATED BY WEIGHT: 10 to 15 mg/kg per dose every 4-6 hours (Maximum 75 mg/kg/day or 5 doses in 24 hours). Never exceed adult dose.',
    geriatricBeersGuidance: 'Preferred first-line analgesic over NSAIDs for osteoarthritis in elderly patients; recommended daily maximum 3000 mg.',
    renalAdjustment: 'eGFR 10-50 mL/min: Administer every 6 hours. eGFR <10 mL/min: Administer every 8 hours.',
    hepaticAdjustment: 'Mild-moderate hepatic impairment: Max daily dose 2000 mg. Severe hepatic failure: Contraindicated.',
    cardiacConsiderations: 'Does not elevate blood pressure or induce heart failure exacerbations.',
    diabetesConsiderations: 'Continuous Glucose Monitors (Dexcom G5/older models) may exhibit false high glucose readings with high paracetamol levels; newer G6/G7 sensors are interference-resistant.',
    admeAbsorption: 'Rapidly absorbed from small intestine; bioavailability is 70-90%; peak plasma levels in 30-60 minutes.',
    admeDistribution: 'Uniformly distributed throughout most body tissues; 10-25% protein bound at therapeutic doses.',
    admeMetabolism: 'Predominantly metabolized in liver via glucuronidation (55%) and sulfation (30%). Minor pathway via CYP2E1 (5-10%) forms toxic NAPQI, which is rapidly detoxified by glutathione.',
    admeExcretion: '90-100% excreted in urine within 24 hours as conjugated metabolites (<3% unchanged).',
    admeHalfLife: '2 to 3 hours in healthy adults.',
    primaryManufacturers: ['Micro Labs (Dolo)', 'GSK (Crocin / Panadol / Calpol)', 'Johnson & Johnson (Tylenol)', 'Mallinckrodt (Ofirmev)'],
    storageAndColdChain: 'Store at room temperature below 30°C.',
    overdoseWarningSigns: ['Initial 24h: Nausea, vomiting, diaphoresis, malaise', '24-72h: RUQ pain, elevated AST/ALT, prolonged PT/INR', '72-96h: Fulminant hepatic failure, jaundice, encephalopathy, coagulopathy, AKI'],
    specificAntidote: '🚨 N-ACETYLCYSTEINE (NAC / Acetadote): Replenishes hepatic glutathione. IV Protocol: 150 mg/kg loading over 1h, then 50 mg/kg over 4h, then 100 mg/kg over 16h. Most effective when given within 8 hours of ingestion.'
  },

  // 4. Salbutamol (Albuterol) Inhaler & Nebulizer
  {
    id: 'sub-salbutamol-master',
    genericName: 'Salbutamol (Albuterol Sulfate)',
    brandNames: ['Ventolin', 'ProAir', 'Asthalin', 'Proventil', 'Salamol'],
    aliases: ['salbutamol', 'albuterol', 'ventolin', 'asthalin', 'saba'],
    activeIngredients: ['Albuterol Sulfate / Salbutamol Base'],
    casNumber: '18559-94-9',
    atcCode: 'R03AC02',
    therapeuticClass: 'Bronchodilator (Respiratory)',
    pharmacologicClass: 'Short-Acting Beta-2 Adrenergic Receptor Agonist (SABA)',
    primaryLegalStatus: 'Prescription',
    isHighAlert: false,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States', status: 'Prescription', scheduleDesignation: 'Rx Only MDI', prescriptionRequired: true },
      { countryCode: 'UK', countryName: 'United Kingdom', status: 'Prescription', scheduleDesignation: 'POM (Emergency supply allowed)', prescriptionRequired: true },
      { countryCode: 'IN', countryName: 'India', status: 'Prescription', scheduleDesignation: 'Schedule H', prescriptionRequired: true }
    ],
    dosageForm: 'Inhalers',
    releaseType: 'Immediate Release (IR)',
    primaryRoute: 'Inhaled',
    allAvailableRoutes: ['Inhaled', 'Oral', 'Intravenous (IV)'],
    strengthValue: 100,
    strengthUnit: 'mcg/actuation',
    concentrationDisplay: '100 mcg / actuation Metered-Dose Inhaler (MDI 200 doses); 2.5 mg / 2.5 mL & 5.0 mg / 2.5 mL Inhalation Respules for Nebulizer; 2 mg, 4 mg Oral Tablets',
    approvedUses: ['Acute relief of Bronchospasm in Asthma, COPD, and Bronchitis', 'Prevention of Exercise-Induced Bronchospasm (EIB)', 'Emergency treatment of severe Hyperkalemia (shifts K+ intracellularly)'],
    medicalSpecialties: ['Pulmonology', 'Emergency Medicine', 'Pediatrics', 'Critical Care'],
    mechanismOfAction: 'Selectively stimulates beta-2 adrenergic receptors in bronchial smooth muscle, activating adenylate cyclase to increase intracellular cyclic AMP (cAMP), causing smooth muscle relaxation, bronchodilation, and inhibition of mast cell mediator release.',
    clinicalBenefits: ['Rapid bronchodilation within 5 minutes', 'Lasts 4-6 hours for acute asthma rescue', 'High pulmonary selectivity with minimal cardiac beta-1 stimulation when inhaled'],
    clinicalLimitations: ['Does not treat underlying airway inflammation (must be combined with Inhaled Corticosteroids [ICS] for maintenance)', 'Overuse (>2 canisters/year) indicates poor asthma control and increases exacerbation risk'],
    commonSideEffects: ['Tremor (especially hands, 10%)', 'Tachycardia / Palpitations', 'Nervousness / Restlessness', 'Headache', 'Hypokalemia (transient)'],
    seriousAdverseEffects: [
      'Paradoxical Bronchospasm with life-threatening acute wheezing',
      'Cardiac Arrhythmias (Atrial Fibrillation, Supraventricular Tachycardia) in high doses',
      'Severe Lactic Acidosis in status asthmaticus high-dose nebulization'
    ],
    contraindications: ['Hypersensitivity to albuterol or propellant excipients'],
    allergyInformation: 'Synthetic amine; rare allergic bronchospasm reported.',
    drugInteractionsSummary: 'Non-selective Beta-blockers (Propranolol, Timolol eye drops) antagonize bronchodilator effect and can trigger fatal bronchospasm. Potassium-depleting diuretics (Furosemide) compound hypokalemia risk.',
    alcoholInteractionSummary: 'No direct metabolic interaction; alcohol may exacerbate airway hyperreactivity in sensitive asthmatics.',
    foodInteractions: ['No significant food interactions.'],
    diseaseInteractions: [
      'Cardiovascular Disorders / Arrhythmias / CAD: Use with caution; monitor resting pulse.',
      'Hyperthyroidism: Increased adrenergic sensitivity.',
      'Diabetes: High doses may increase blood glucose levels.'
    ],
    pregnancySafetyGuidance: 'FDA Category C. Drug of choice for acute asthma rescue during pregnancy; maternal hypoxia poses a far greater risk to fetus than albuterol.',
    breastfeedingGuidance: 'Inhaled route results in negligible maternal serum levels; compatible with breastfeeding.',
    pediatricGuidance: 'Approved for children ≥4 years via MDI (use with spacer chamber + mask for optimal lung deposition); approved for all pediatric ages via nebulizer.',
    geriatricBeersGuidance: 'Monitor heart rate and tremor; adjust frequency in elderly patients with ischemic heart disease.',
    renalAdjustment: 'No dose adjustment required for inhaled route.',
    hepaticAdjustment: 'No dose adjustment required.',
    cardiacConsiderations: 'High doses stimulate myocardial beta-1 receptors causing sinus tachycardia; obtain baseline ECG if multiple high-dose nebules are required.',
    diabetesConsiderations: 'May stimulate glycogenolysis; monitor glucose in diabetic patients receiving continuous nebulization.',
    admeAbsorption: 'Only 10-20% of MDI dose reaches deep bronchial airways; remainder swallowed and absorbed from GI tract.',
    admeDistribution: 'Systemic binding to plasma proteins is ~10%.',
    admeMetabolism: 'Extensively metabolized in liver to inactive 4\'-O-sulfate conjugate.',
    admeExcretion: '80-100% excreted in urine over 72 hours.',
    admeHalfLife: '3.8 to 6 hours.',
    primaryManufacturers: ['GSK (Ventolin)', 'Teva (ProAir)', 'Cipla (Asthalin)'],
    storageAndColdChain: 'Store canister between 15°C to 25°C. Do not puncture or incinerate pressurised canister.'
  },

  // 5. Meropenem Trihydrate IV Injection
  {
    id: 'sub-meropenem',
    genericName: 'Meropenem Trihydrate',
    brandNames: ['Merrem', 'Meronem', 'Mero', 'Meromac'],
    aliases: ['meropenem', 'merrem', 'meronem', 'carbapenem'],
    activeIngredients: ['Meropenem Trihydrate'],
    casNumber: '119478-56-7',
    atcCode: 'J01DH02',
    therapeuticClass: 'Broad-Spectrum Antibacterial',
    pharmacologicClass: 'Carbapenem Beta-Lactam Antibiotic',
    primaryLegalStatus: 'Hospital-only',
    isHighAlert: false,
    isHospitalOnly: true,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States', status: 'Hospital-only', scheduleDesignation: 'Rx Hospital Inpatient', prescriptionRequired: true },
      { countryCode: 'IN', countryName: 'India', status: 'Hospital-only', scheduleDesignation: 'Schedule H1 / Restricted Hospital Antibiotic', prescriptionRequired: true },
      { countryCode: 'UK', countryName: 'United Kingdom', status: 'Hospital-only', scheduleDesignation: 'POM Restricted Hospital Formulary', prescriptionRequired: true }
    ],
    dosageForm: 'Injections',
    releaseType: 'Immediate Release (IR)',
    primaryRoute: 'Intravenous (IV)',
    allAvailableRoutes: ['Intravenous (IV)'],
    strengthValue: 1000,
    strengthUnit: 'mg',
    concentrationDisplay: '500 mg, 1000 mg Sterile Powder Vials for IV Reconstitution (Infusion over 15-30 mins or extended 3-hour infusion in septic shock)',
    approvedUses: [
      'Complicated Intra-Abdominal Infections (cIAI)',
      'Complicated Skin and Soft Tissue Infections (cSSTI)',
      'Bacterial Meningitis in pediatric patients ≥3 months and adults',
      'Hospital-Acquired / Ventilator-Associated Pneumonia (HAP/VAP)',
      'Febrile Neutropenia empiric monotherapy in immunocompromised oncology patients'
    ],
    medicalSpecialties: ['Infectious Diseases', 'Critical Care / ICU', 'Surgery', 'Hematology/Oncology'],
    mechanismOfAction: 'Penetrates bacterial cell walls and binds with high affinity to essential Penicillin-Binding Proteins (PBPs 2, 3, and 4 in E. coli and P. aeruginosa), inhibiting the transpeptidation step of peptidoglycan synthesis, resulting in rapid bacterial cell lysis and death. Stable against hydrolysis by most plasmid- and chromosomal-mediated beta-lactamases, including Extended-Spectrum Beta-Lactamases (ESBLs).',
    clinicalBenefits: ['Ultra-broad spectrum coverage (Gram-positive, Gram-negative including Pseudomonas aeruginosa, and anaerobes)', 'Low seizure potential compared to Imipenem/Cilastatin', 'First-line agent for ESBL-producing Enterobacteriaceae bacteremia'],
    clinicalLimitations: ['Lacks activity against MRSA, Enterococcus faecium, and Stenotrophomonas maltophilia', 'Overuse promotes Carbapenem-Resistant Enterobacteriaceae (CRE) emergence'],
    commonSideEffects: ['Diarrhea (5%)', 'Nausea and vomiting', 'Headache', 'Injection site inflammation', 'Rash'],
    seriousAdverseEffects: [
      '🚨 Clostridioides difficile-associated Diarrhea (CDAD) / Pseudomembranous Colitis',
      'Central Nervous System Toxicity / Seizures (especially in unadjusted renal failure or CNS disorders)',
      'Severe Anaphylaxis in penicillin-allergic patients (cross-reactivity ~1%)',
      'Severe Thrombocytopenia and Neutropenia'
    ],
    contraindications: ['Severe hypersensitivity to meropenem or history of anaphylaxis to carbapenems/beta-lactams'],
    allergyInformation: 'Cross-reactivity with penicillins is low (<1%), but contraindicated in patients with prior IgE-mediated anaphylaxis to beta-lactams.',
    drugInteractionsSummary: 'CRITICAL: Co-administration with Valproic Acid / Divalproex Sodium causes a rapid, dramatic 60-90% drop in serum valproate levels within 24 hours, leading to refractory breakthrough seizures. Combination is strictly contraindicated.',
    alcoholInteractionSummary: 'Inpatient hospital medication; no direct disulfiram-like reaction, but contraindicated in acute alcoholic hepatitis.',
    foodInteractions: ['Not applicable (IV route only).'],
    diseaseInteractions: [
      'Renal Impairment: Meropenem clearance is strictly dependent on glomerular filtration; mandatory dose reduction to prevent neurotoxicity/seizures.',
      'Pre-existing Seizure Disorders: Monitor EEG and maintain anticonvulsant therapy (avoiding valproate).'
    ],
    pregnancySafetyGuidance: 'FDA Category B. Crosses placenta; used for severe maternal sepsis when benefits outweigh risks.',
    breastfeedingGuidance: 'Excreted in low concentrations in breast milk; generally compatible.',
    pediatricGuidance: 'Approved for infants ≥3 months for intra-abdominal infections and bacterial meningitis (up to 40 mg/kg IV Q8H, max 2000 mg Q8H).',
    geriatricBeersGuidance: 'Dose must be calculated based on estimated creatinine clearance (Cockcroft-Gault formula).',
    renalAdjustment: 'CrCl 26-50 mL/min: 1000 mg IV Q12H. CrCl 10-25 mL/min: 500 mg IV Q12H. CrCl <10 mL/min: 500 mg IV Q24H. Hemodialysis: Administer dose after dialysis session.',
    hepaticAdjustment: 'No dose adjustment required.',
    cardiacConsiderations: 'Compatible with cardiac disease; sodium content is ~90 mg (3.9 mEq) per gram.',
    diabetesConsiderations: 'No direct effect on glucose; treat underlying sepsis which destabilizes glycemic control.',
    admeAbsorption: 'IV administration provides immediate 100% systemic bioavailability.',
    admeDistribution: 'Good penetration into body fluids and tissues including CSF (penetration ~30% in inflamed meninges); ~2% plasma protein bound.',
    admeMetabolism: 'Minor hepatic/renal metabolism (20%) to inactive open beta-lactam metabolite.',
    admeExcretion: '70% excreted unchanged in urine by glomerular filtration and tubular secretion.',
    admeHalfLife: 'Approximately 1 hour in normal renal function (prolonged to 7-10 hours in severe end-stage renal disease).',
    primaryManufacturers: ['Pfizer (Merrem)', 'AstraZeneca', 'Cipla', 'Fresenius Kabi'],
    storageAndColdChain: 'Store dry powder vials at 20°C to 25°C. Once reconstituted with Sterile Water or Normal Saline, use within 3 hours at room temperature or 24 hours refrigerated at 2°C to 8°C.'
  },

  // 6. Epinephrine (Adrenaline) Auto-Injector & Emergency Ampoules
  {
    id: 'sub-epinephrine',
    genericName: 'Epinephrine (Adrenaline)',
    brandNames: ['EpiPen', 'Auvi-Q', 'Adrenaclick', 'Vasodrine'],
    aliases: ['epinephrine', 'adrenaline', 'epipen', 'auvi-q'],
    activeIngredients: ['Epinephrine Base (L-Adrenaline)'],
    casNumber: '51-43-4',
    atcCode: 'C01CA24',
    therapeuticClass: 'Emergency Resuscitation & Anaphylaxis Agent',
    pharmacologicClass: 'Non-Selective Alpha and Beta Adrenergic Agonist (Sympathomimetic)',
    primaryLegalStatus: 'High-alert',
    isHighAlert: true,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States', status: 'High-alert', scheduleDesignation: 'Rx Emergency Auto-Injector / Hospital Resuscitation', prescriptionRequired: true },
      { countryCode: 'IN', countryName: 'India', status: 'High-alert', scheduleDesignation: 'Schedule H / Emergency Resuscitation Drug', prescriptionRequired: true },
      { countryCode: 'UK', countryName: 'United Kingdom', status: 'High-alert', scheduleDesignation: 'POM (Emergency bystander administration permitted by law)', prescriptionRequired: true }
    ],
    dosageForm: 'Auto-injectors',
    releaseType: 'Immediate Release (IR)',
    primaryRoute: 'Intramuscular (IM)',
    allAvailableRoutes: ['Intramuscular (IM)', 'Intravenous (IV)', 'Subcutaneous (SC)', 'Intraosseous', 'Inhaled'],
    strengthValue: 0.3,
    strengthUnit: 'mg',
    concentrationDisplay: '0.3 mg Auto-Injector (EpiPen Adult); 0.15 mg Auto-Injector (EpiPen Jr); 1 mg/mL (1:1,000) IM Ampoules; 0.1 mg/mL (1:10,000) IV Cardiac Arrest Pre-filled Syringes',
    approvedUses: [
      'Emergency first-line treatment of Type I Anaphylaxis / Severe Allergic Reactions (food, insect venom, drug-induced)',
      'Advanced Cardiac Life Support (ACLS) in Cardiac Arrest (Ventricular Fibrillation, Pulseless VT, Asystole, PEA)',
      'Severe Septic Shock refractory to fluid resuscitation and norepinephrine',
      'Croup (Laryngotracheobronchitis) in pediatric emergencies (Nebulized Racemic Epinephrine)'
    ],
    medicalSpecialties: ['Emergency Medicine', 'Critical Care', 'Allergy & Immunology', 'Pediatrics'],
    mechanismOfAction: 'Potent agonist at alpha-1, alpha-2, beta-1, and beta-2 adrenergic receptors. Alpha-1 activation causes intense vasoconstriction, reversing peripheral vasodilation and reducing mucosal edema. Beta-1 activation produces positive inotropic and chronotropic cardiac stimulation. Beta-2 activation produces bronchial smooth muscle relaxation and inhibits mast cell/basophil degranulation.',
    clinicalBenefits: ['Life-saving in anaphylaxis: Reverses upper airway laryngeal edema, restores blood pressure, and relieves bronchospasm', 'Rapid peak plasma concentrations within 8 minutes via IM injection in the anterolateral thigh (vastus lateralis)'],
    clinicalLimitations: ['Short duration of action (15-20 minutes); up to 20% of patients require a second dose for biphasic anaphylaxis', 'MUST NOT BE INJECTED INTO DIGITS, HANDS, OR FEET (causes severe local ischemic necrosis)'],
    commonSideEffects: ['Tachycardia', 'Palpitations', 'Tremor', 'Anxiety / Apprehension', 'Headache', 'Pallor', 'Diaphoresis'],
    seriousAdverseEffects: [
      'Ventricular Arrhythmias / Ventricular Fibrillation',
      'Acute Hypertensive Crisis with Intracranial Hemorrhage',
      'Myocardial Infarction and Takotsubo (Stress-Induced) Cardiomyopathy',
      'Digital Gangrene from accidental autoinjector discharge into fingers'
    ],
    contraindications: ['NO ABSOLUTE CONTRAINDICATION IN LIFE-THREATENING ANAPHYLAXIS OR CARDIAC ARREST.'],
    allergyInformation: 'Contains sodium metabisulfite as an antioxidant, but sulfite allergy is NOT a contraindication to emergency epinephrine in anaphylaxis.',
    drugInteractionsSummary: 'Non-selective Beta-blockers (Propranolol) block beta-2 vasodilation, resulting in unopposed alpha-1 vasoconstriction, severe hypertension, and reflex bradycardia. Tricyclic Antidepressants (TCAs) and MAOIs potentiate cardiovascular effects.',
    alcoholInteractionSummary: 'No direct contraindication in emergency resuscitation.',
    foodInteractions: ['Not applicable.'],
    diseaseInteractions: [
      'Coronary Artery Disease / Severe Hypertension: Epinephrine increases myocardial oxygen demand, but remains mandatory in life-threatening anaphylaxis.'
    ],
    pregnancySafetyGuidance: 'FDA Category C. Indicated and life-saving in maternal anaphylaxis; prevents maternal hypotension which causes fatal fetal hypoxia.',
    breastfeedingGuidance: 'Compatible in emergency use.',
    pediatricGuidance: 'EpiPen Jr (0.15 mg IM) for children weighing 15 to 30 kg (33 to 66 lbs). Adult EpiPen (0.3 mg IM) for children >30 kg (66 lbs). Infants <15 kg: 0.01 mg/kg IM (0.01 mL/kg of 1:1000 solution) using manual syringe.',
    geriatricBeersGuidance: 'Use standard IM dose for anaphylaxis; monitor telemetry for arrhythmias.',
    renalAdjustment: 'No dose adjustment required in emergencies.',
    hepaticAdjustment: 'No dose adjustment required.',
    cardiacConsiderations: 'Causes profound inotropic/chronotropic stimulation; in cardiac arrest ACLS protocol: 1 mg IV (1:10,000) every 3-5 minutes.',
    diabetesConsiderations: 'Stimulates glycogenolysis, causing transient hyperglycemia.',
    admeAbsorption: 'Intramuscular injection into the anterolateral thigh (vastus lateralis) achieves significantly faster and higher peak serum concentrations than SC or deltoid injection.',
    admeDistribution: 'Rapidly cleared from bloodstream; crosses placenta but does not cross blood-brain barrier significantly.',
    admeMetabolism: 'Rapidly inactivated by Catechol-O-Methyltransferase (COMT) and Monoamine Oxidase (MAO) in liver and sympathetic nerve endings.',
    admeExcretion: 'Excreted in urine mostly as vanillylmandelic acid (VMA) and metanephrines.',
    admeHalfLife: '< 2 to 3 minutes (circulating plasma half-life).',
    primaryManufacturers: ['Viatris / Mylan (EpiPen)', 'Kaleo (Auvi-Q)', 'Teva', 'Amphastar'],
    storageAndColdChain: 'Store at 20°C to 25°C (68°F to 77°F). PROTECT FROM LIGHT AND HEAT. DO NOT REFRIGERATE OR FREEZE. Inspect solution: Must be clear and colorless; discard if pinkish, brownish, or containing precipitates.'
  }
];

/* =========================================================================
   2. NOVA TOX / FORENSIC DRUG DATABASE (SEPARATED ILLICIT / FORENSIC SECTION)
   ========================================================================= */

export const NOVA_FORENSIC_TOX_DATABASE: ForensicToxRecord[] = [
  {
    id: 'tox-illicit-fentanyl',
    substanceName: 'Illicit Fentanyl & Fentanyl Analogues (Carfentanil, Acetylfentanyl)',
    streetAliases: ['Street Fentanyl', 'China White', 'Apache', 'Dance Fever', 'Murder 8', 'Fetty', 'Blues'],
    substanceCategory: 'Illicit Opioid',
    chemicalClass: 'Synthetic Phenylpiperidine',
    legalClassification: '⚫ Illicit (Schedule I / Prohibited)',
    medicalUseIfAny: 'None for illicitly manufactured street powder/counterfeit pills (prescription fentanyl exists for severe surgical/cancer pain).',
    primaryMechanism: 'Ultra-high potency Mu-opioid receptor full agonist. Crosses blood-brain barrier almost instantaneously, causing profound inhibition of medullary respiratory pacemaker neurons.',
    toxicityProfile: 'Lethal dose is approximately 2 milligrams (equivalent to a few grains of salt). 50x more potent than heroin, 100x more potent than morphine. Carfentanil is 10,000x more potent than morphine.',
    dependenceRiskScore: 99,
    majorHealthEffects: [
      'Rapid catastrophic respiratory arrest within 60-120 seconds of exposure.',
      'Profound anoxic brain injury and irreversible encephalopathy.',
      'Wooden Chest Syndrome (severe thoracic muscle rigidity preventing manual ventilation).',
      'Severe non-cardiogenic pulmonary edema with foam cone formation.'
    ],
    overdoseWarningSigns: [
      'Pinpoint non-reactive pupils.',
      'Gurgling / Snoring sounds ("Death Rattle").',
      'Blue / Ash-gray lips, fingernails, or skin.',
      'Total unresponsiveness to physical sternal rub.',
      'Respiratory rate < 4 breaths/min or complete apnea.'
    ],
    forensicDetectionMarkers: [
      'Norfentanyl (primary urinary metabolite)',
      '4-ANPP (precursor and synthetic intermediate marker)',
      'Despropionylfentanyl',
      'Carfentanil blood concentrations (pg/mL range by LC-MS/MS)'
    ],
    reversalAntidoteProtocol: '🚨 NALOXONE PROTOCOL: Administer Naloxone 4 mg Intranasal (or 0.4-2 mg IV/IM). Repeat every 2-3 minutes if no response. Multiple doses (up to 8-12 mg) often mandatory due to extreme receptor binding affinity. Initiate rescue breathing immediately.',
    ghsHazardClass: '☠️ GHS Fatal if Inhaled / Swallowed / In Contact with Skin'
  },
  {
    id: 'tox-methamphetamine',
    substanceName: 'Methamphetamine Hydrochloride (Illicit Crystal)',
    streetAliases: ['Crystal Meth', 'Ice', 'Glass', 'Tina', 'Shabu', 'Speed', 'Chalk'],
    substanceCategory: 'Illicit Stimulant',
    chemicalClass: 'Substituted Amphetamine',
    legalClassification: '⚫ Illicit (Schedule I / Prohibited)',
    medicalUseIfAny: 'None for illicit d-methamphetamine crystal (Desoxyn brand exists in strict micro-doses for refractory narcolepsy/ADHD).',
    primaryMechanism: 'Reverses the dopamine transporter (DAT), norepinephrine transporter (NET), and serotonin transporter (SERT), releasing massive surges of vesicular catecholamines into synaptic clefts while inhibiting MAO breakdown.',
    toxicityProfile: 'Severe hyper-adrenergic surge predisposing to intracranial hemorrhage, malignant hyperthermia, aortic dissection, and acute paranoid psychosis.',
    dependenceRiskScore: 96,
    majorHealthEffects: [
      'Severe neurotoxicity with degeneration of dopaminergic axon terminals.',
      'Amphetamine-induced acute paranoid psychosis with tactile hallucinations (formication / "meth bugs").',
      'Accelerated cardiovascular disease (Methamphetamine-associated cardiomyopathy / biventricular failure).',
      'Severe dental decay and enamel loss ("Meth mouth") from xerostomia and bruxism.'
    ],
    overdoseWarningSigns: [
      'Extreme hyperthermia (Core temp > 40°C / 104°F).',
      'Malignant tachycardia (HR > 160-180 bpm) and severe hypertension.',
      'Refractory seizures and status epilepticus.',
      'Acute delirium with violent psychomotor agitation and delirium tremens-like exhaustion.'
    ],
    forensicDetectionMarkers: [
      'd-Methamphetamine in urine (persists 3-5 days)',
      'Amphetamine (active metabolite)',
      'Hair follicle testing (positive for up to 90 days)'
    ],
    reversalAntidoteProtocol: 'Supportive Care: Aggressive active cooling for hyperthermia. High-dose IV Benzodiazepines (Diazepam 10-20 mg IV or Lorazepam 2-4 mg IV) to control central sympathomimetic storm and seizures. Vasodilators (Nitroprusside or Phentolamine) for severe hypertensive emergency. Avoid pure beta-blockers due to unopposed alpha-vasoconstriction.',
    ghsHazardClass: '☠️ GHS Toxic Substance'
  },
  {
    id: 'tox-mdma-ecstasy',
    substanceName: '3,4-Methylenedioxymethamphetamine (MDMA / Ecstasy / Molly)',
    streetAliases: ['Molly', 'Ecstasy', 'XTC', 'E', 'Mandy', 'Adam'],
    substanceCategory: 'Novel Psychoactive Substance (NPS)',
    chemicalClass: 'Ring-Substituted Amphetamine / Entactogen',
    legalClassification: '⚫ Illicit (Schedule I / Prohibited)',
    medicalUseIfAny: 'Under active investigational clinical trials for PTSD psychotherapy (FDA Breakthrough status under study; street pills are illicit).',
    primaryMechanism: 'Massive reversal of the serotonin transporter (SERT), causing acute vesicular serotonin flooding alongside moderate dopamine/norepinephrine release and oxytocin secretion.',
    toxicityProfile: 'Risk of lethal Serotonin Syndrome, fatal exercise-induced hyperthermia, and acute dilutional hyponatremic encephalopathy from excessive water drinking and drug-induced SIADH.',
    dependenceRiskScore: 70,
    majorHealthEffects: [
      'Life-threatening Serotonin Syndrome (hyperthermia, clonus, autonomic instability).',
      'Acute dilutional hyponatremia and cerebral edema (seizures, coma, brainstem herniation).',
      'Acute hepatic failure and centrilobular necrosis.',
      'Mid-week depressive crash ("Suicide Tuesday") from transient brain serotonin depletion.'
    ],
    overdoseWarningSigns: [
      'Hyperthermia > 41°C (106°F).',
      'Spontaneous or inducible ocular/ankle clonus and hyperreflexia.',
      'Confusion, severe hyponatremic seizures, and obtundation.',
      'Disseminated Intravascular Coagulation (DIC) and acute rhabdomyolysis.'
    ],
    forensicDetectionMarkers: [
      'MDMA in urine / blood',
      'MDA (3,4-Methylenedioxyamphetamine - active metabolite)',
      'HMMA (4-hydroxy-3-methoxymethamphetamine)'
    ],
    reversalAntidoteProtocol: 'Serotonin Antagonist: Cyproheptadine (12 mg oral initial, followed by 2 mg Q2H) for serotonin syndrome. Rapid external cooling. Hypertonic 3% Saline (100 mL bolus) for acute symptomatic hyponatremic seizures with cerebral edema. IV Benzodiazepines for agitation.',
    ghsHazardClass: '⚠️ GHS Acute Toxicity / Hazard'
  }
];

/* =========================================================================
   3. COUNTERFEIT & DARK MEDICINE INTELLIGENCE REGISTRY
   ========================================================================= */

export const COUNTERFEIT_INTELLIGENCE_REGISTRY: CounterfeitIntelligenceRecord[] = [
  {
    id: 'fake-ozempic-pens',
    suspectedBrandName: 'Ozempic (Counterfeit Prefilled Pens)',
    falsifiedProductType: 'Wrong Active Ingredient',
    claimedIngredientOnBox: 'Semaglutide 1 mg/dose',
    actualLabDetectedContent: 'Unlabeled High-Dose Fast-Acting Insulin Glulisine / Aspart',
    reportedLotBatch: 'Batch MP5E511 / Lot LP6F123',
    originatingJurisdiction: 'Multiple international retail/online pharmacies (US, UK, Austria, Germany, Middle East)',
    discoveryDate: '2024-Q1 (Ongoing Active WHO Alert)',
    dangerLevel: 'CRITICAL_LETHAL',
    clinicalHazardDescription: 'Patients taking this counterfeit pen expecting once-weekly semaglutide inadvertently inject massive boluses of fast-acting insulin, causing catastrophic, life-threatening profound hypoglycemic coma, seizures, and permanent brain death within 30-60 minutes.',
    regulatoryAgencyAlert: '🚨 WHO Medical Product Alert No. 3/2024 & FDA Public Notification on Falsified Ozempic Pens.',
    visualAuthenticationTelltales: [
      'Dose counter window does NOT extend smoothly when dial is turned (it extends in length like an insulin pen).',
      'Spelling errors on the outer carton carton (e.g. "Semaglutid" instead of "Semaglutide").',
      'Needles supplied in package are generic 31G insulin needles rather than official NovoFine Plus needles.',
      'QR security code on box does not resolve to the official Novo Nordisk GS1 authentication portal.'
    ]
  },
  {
    id: 'fake-xanax-fentanyl-pressed',
    suspectedBrandName: 'Xanax 2 mg ("Fake Pressed Bars")',
    falsifiedProductType: 'Wrong Active Ingredient',
    claimedIngredientOnBox: 'Alprazolam 2 mg',
    actualLabDetectedContent: 'Illicit Fentanyl 1.8 mg + Bromazolam / Microcrystalline Cellulose',
    reportedLotBatch: 'Street pressed counterfeit (Falsified "XANAX 2" imprint)',
    originatingJurisdiction: 'North America / Illicit online marketplace',
    discoveryDate: '2024 Active Alert',
    dangerLevel: 'CRITICAL_LETHAL',
    clinicalHazardDescription: 'Purchased by users believing it to be prescription alprazolam for anxiety/insomnia. Contains lethal concentrations of fentanyl, causing instantaneous respiratory arrest and death in opioid-naive individuals.',
    regulatoryAgencyAlert: 'DEA Special Alert: "One Pill Can Kill" Counterfeit Prescription Drug Warning.',
    visualAuthenticationTelltales: [
      'Pill edges are crumbly, chalky, or unevenly beveled compared to pharmaceutical machine-pressed tablets.',
      'Pills easily dissolve into powder upon gentle thumb pressure.',
      'Color tone varies from chalky off-white to yellowish-white.'
    ]
  },
  {
    id: 'fake-cough-syrup-deg-toxin',
    suspectedBrandName: 'Promethazine / Paracetamol Pediatric Syrups',
    falsifiedProductType: 'Contaminated Batch',
    claimedIngredientOnBox: 'Propylene Glycol / Glycerin Pharmaceutical Solvent',
    actualLabDetectedContent: 'Industrial Diethylene Glycol (DEG) & Ethylene Glycol (>15% toxic solvent adulterant)',
    reportedLotBatch: 'Batch N2201 / Lot PG-5541',
    originatingJurisdiction: 'Unregulated industrial solvent supply chains',
    discoveryDate: '2023 - 2024 WHO Alert Series',
    dangerLevel: 'CRITICAL_LETHAL',
    clinicalHazardDescription: 'Industrial diethylene glycol used as a cheaper counterfeit substitute for pharmaceutical-grade propylene glycol. Ingested by febrile children, it metabolizes to oxalic acid and diglycolic acid, causing acute anuric renal failure, metabolic acidosis, cranial nerve palsies, and widespread pediatric death.',
    regulatoryAgencyAlert: 'WHO Global Medical Product Alerts No. 6/2022, 1/2023 & 4/2023 (Substandard & Contaminated Liquid Dosage Forms).',
    visualAuthenticationTelltales: [
      'Syrup lacks authenticated Certificate of Analysis (CoA) for raw solvent batch.',
      'Slightly sweet, viscous odor with absence of manufacturer tamper-evident cap seal.',
      'Batch number not verifiable in national drug regulatory registry.'
    ]
  }
];
