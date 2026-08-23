export interface BodySystemNode {
  id: string;
  icon: string;
  name: string;
  primarySpecialty: string;
  subspecialties: string[];
  commonDiseases: string[];
  keyDiagnostics: string[];
  coreMedications: string[];
  onDutySpecialist: string;
}

export interface LifeStageNode {
  stage: string;
  ageRange: string;
  primaryFields: string[];
  keyHealthFocus: string;
  preventiveScreening: string;
}

export interface AZDiseaseEntry {
  letter: string;
  diseases: {
    name: string;
    icd10: string;
    organSystem: string;
    specialist: string;
    goldStandardTest: string;
    primaryTreatment: string;
  }[];
}

export const MASTER_BODY_SYSTEMS: BodySystemNode[] = [
  {
    id: 'sys-neuro',
    icon: 'Brain',
    name: 'Brain & Nervous System',
    primarySpecialty: 'Neurology & Neurosurgery',
    subspecialties: ['Stroke Neurology', 'Neurocritical Care', 'Epileptology', 'Movement Disorders', 'Neurosurgery (Spine/Craniotomy)'],
    commonDiseases: ['Acute Ischemic Stroke', 'Status Epilepticus', 'Parkinsonism', 'Alzheimer Dementia', 'Subdural Hematoma'],
    keyDiagnostics: ['Non-Contrast Head CT', '3T Brain MRI', 'Continuous Video EEG', 'Lumbar Puncture / CSF Analysis'],
    coreMedications: ['IV Alteplase (tPA)', 'Levetiracetam (Keppra)', 'Mannitol 20%', 'Carbidopa-Levodopa'],
    onDutySpecialist: 'Dr. Christopher Ray, MD (FAAN)'
  },
  {
    id: 'sys-cardio',
    icon: 'Heart',
    name: 'Heart & Cardiovascular',
    primarySpecialty: 'Cardiology & Cardiothoracic Surgery',
    subspecialties: ['Interventional Cardiology (PCI)', 'Cardiac Electrophysiology (EP)', 'Advanced Heart Failure (LVAD)', 'Cardiothoracic Surgery (CABG)'],
    commonDiseases: ['Acute Myocardial Infarction (STEMI)', 'Atrial Fibrillation with RVR', 'Decompensated Heart Failure', 'Aortic Dissection'],
    keyDiagnostics: ['12-Lead Continuous ECG', 'High-Sensitivity Troponin', 'Transthoracic Echocardiogram (TTE)', 'Coronary Angiography'],
    coreMedications: ['Heparin IV Drip', 'Amiodarone', 'Diltiazem (Cardizem)', 'Furosemide (Lasix)', 'Aspirin + Ticagrelor'],
    onDutySpecialist: 'Dr. Emily Watson, MD (FACC)'
  },
  {
    id: 'sys-pulm',
    icon: 'Wind',
    name: 'Lungs & Respiratory',
    primarySpecialty: 'Pulmonology & Critical Care',
    subspecialties: ['Critical Care Pulmonology', 'Interventional Pulmonology', 'Sleep Medicine', 'Lung Transplantation'],
    commonDiseases: ['Severe Hypoxemic ARDS', 'COPD Exacerbation', 'Pulmonary Embolism (PE)', 'Community-Acquired Pneumonia'],
    keyDiagnostics: ['Arterial Blood Gas (ABG)', 'CT Angiography Chest', 'Portable Chest Radiograph', 'Flexible Fiberoptic Bronchoscopy'],
    coreMedications: ['High-Flow Nasal Cannula (FiO2 60%)', 'Nebulized DuoNeb', 'Methylprednisolone IV', 'Cefepime + Vancomycin'],
    onDutySpecialist: 'Dr. Gregory House, MD (FCCP)'
  },
  {
    id: 'sys-gi',
    icon: 'Utensils',
    name: 'Digestive & Gastrointestinal',
    primarySpecialty: 'Gastroenterology & Colorectal Surgery',
    subspecialties: ['Advanced Endoscopy', 'Inflammatory Bowel Disease (IBD)', 'GI Motility', 'Gastrointestinal Oncology'],
    commonDiseases: ['Acute Upper GI Hemorrhage', 'Acute Pancreatitis', 'Crohn Disease Flare', 'Bowel Obstruction'],
    keyDiagnostics: ['Urgent Upper Endoscopy (EGD)', 'Colonoscopy', 'Abdominal CT with Oral/IV Contrast', 'Serum Lipase & Amylase'],
    coreMedications: ['Pantoprazole IV Bolus + Infusion', 'Octreotide IV', 'Mesalamine', 'Infliximab Biologic'],
    onDutySpecialist: 'Dr. David Cho, MD (FACG)'
  },
  {
    id: 'sys-liver',
    icon: 'Layers',
    name: 'Liver & Biliary Tree',
    primarySpecialty: 'Hepatology & Transplant Surgery',
    subspecialties: ['Transplant Hepatology', 'Viral Hepatitis Care', 'Portal Hypertension', 'Hepatobiliary Surgery'],
    commonDiseases: ['Acute Decompensated Cirrhosis', 'Hepatic Encephalopathy', 'Hepatocellular Carcinoma', 'Acute Cholecystitis'],
    keyDiagnostics: ['Liver Function Panel (ALT/AST/Bilirubin)', 'Serum Ammonia', 'Abdominal Ultrasound with Doppler', 'Diagnostic Paracentesis'],
    coreMedications: ['Lactulose', 'Rifaximin', 'Albumin 25% IV', 'Spironolactone + Furosemide'],
    onDutySpecialist: 'Dr. Sandra Bell, MD (FAASLD)'
  },
  {
    id: 'sys-renal',
    icon: 'Droplet',
    name: 'Kidneys & Renal System',
    primarySpecialty: 'Nephrology & Dialysis',
    subspecialties: ['Continuous Renal Replacement (CRRT)', 'Transplant Nephrology', 'Glomerulonephritis', 'Electrolyte Disorders'],
    commonDiseases: ['Acute Kidney Injury (AKI) / ATN', 'Severe Metabolic Acidosis', 'End-Stage Renal Disease (ESRD)', 'Hyperkalemia'],
    keyDiagnostics: ['Serum Creatinine & eGFR', 'Fractional Excretion of Sodium (FeNa)', 'Urgent Renal Ultrasound', 'Urine Microscopic Sediment'],
    coreMedications: ['Continuous Venovenous Hemofiltration (CVVH)', 'Sodium Bicarbonate Infusion', 'Calcium Gluconate', 'Sodium Polystyrene'],
    onDutySpecialist: 'Dr. Vikram Sethi, MD (FASN)'
  },
  {
    id: 'sys-onc',
    icon: 'Sparkles',
    name: 'Oncology & Precision Genomics',
    primarySpecialty: 'Medical, Surgical & Radiation Oncology',
    subspecialties: ['Precision Targeted Therapeutics', 'Hematologic Oncology (CAR-T)', 'Radiation Oncology (SBRT)', 'Surgical Oncology'],
    commonDiseases: ['Chemo-Induced Febrile Neutropenia', 'Metastatic KRAS/EGFR Adenocarcinoma', 'Tumor Lysis Syndrome', 'Acute Leukemia'],
    keyDiagnostics: ['Next-Gen DNA/RNA Sequencing', 'Bone Marrow Aspirate & Flow Cytometry', 'PET-CT Whole Body', 'ctDNA Liquid Biopsy'],
    coreMedications: ['Cefepime 2g IV q8h', 'Filgrastim (G-CSF)', 'Rasburicase', 'Osimertinib / Sotorasib Targeted Inhibitors'],
    onDutySpecialist: 'Dr. Marcus Vance, MD (FASCO)'
  },
  {
    id: 'sys-ortho',
    icon: 'Bone',
    name: 'Bones, Joints & Musculoskeletal',
    primarySpecialty: 'Orthopedics & Rheumatology',
    subspecialties: ['Orthopedic Trauma (ORIF)', 'Joint Arthroplasty', 'Rheumatology (Autoimmune)', 'Physical Medicine & Rehab (PM&R)'],
    commonDiseases: ['Open Compound Fractures', 'Acute Compartment Syndrome', 'Rheumatoid Arthritis', 'Systemic Lupus Erythematosus'],
    keyDiagnostics: ['Plain Radiographs 3-Views', 'Compartment Pressure Checks (Stryker)', 'Serum ANA / Anti-dsDNA / Complement', 'Joint Aspiration (Synovial Fluid)'],
    coreMedications: ['Cefazolin IV Prophylaxis', 'Methylprednisolone Pulse', 'Methotrexate', 'Multimodal Analgesia (Nerve Block)'],
    onDutySpecialist: 'Dr. Eric Campbell, MD (FAAOS)'
  }
];

export const MASTER_LIFE_STAGES: LifeStageNode[] = [
  { stage: '1. Preconception & Genetics', ageRange: 'Pre-Pregnancy', primaryFields: ['Genetics', 'Fertility & Reproductive Medicine', 'Gynecology'], keyHealthFocus: 'Carrier screening, IVF, fertility optimization, chromosomal analysis', preventiveScreening: 'Expanded Carrier DNA Screening (Cystic Fibrosis, Spinal Muscular Atrophy)' },
  { stage: '2. Fetal & Maternal-Fetal', ageRange: 'Gestational (0-40 wks)', primaryFields: ['Maternal-Fetal Medicine (MFM)', 'Obstetrics', 'Fetal Surgery'], keyHealthFocus: 'Fetal anatomy ultrasound, pre-eclampsia prevention, fetal heart rate monitoring', preventiveScreening: 'NIPT Cell-Free DNA & Quad Screen' },
  { stage: '3. Newborn (Neonatal)', ageRange: 'Birth to 28 Days', primaryFields: ['Neonatology (NICU)', 'Pediatric Surgery'], keyHealthFocus: 'Prematurity, respiratory distress syndrome, APGAR score, hyperbilirubinemia', preventiveScreening: 'Newborn Metabolic Heel Stick & Hearing Screen' },
  { stage: '4. Pediatric & Child', ageRange: '1 Month to 12 Years', primaryFields: ['General Pediatrics', 'Pediatric Subspecialties'], keyHealthFocus: 'Developmental milestones, childhood asthma, febrile infections, vaccinations', preventiveScreening: 'CDC Immunization Schedule & Growth Curve Telemetry' },
  { stage: '5. Adolescent & Young Adult', ageRange: '13 to 24 Years', primaryFields: ['Adolescent Medicine', 'Psychiatry & Behavioral Health'], keyHealthFocus: 'Mental health, sports medicine, concussion protocols, reproductive health', preventiveScreening: 'PHQ-9 Depression Screen & Lipid Panel' },
  { stage: '6. Adult (Internal Medicine)', ageRange: '25 to 64 Years', primaryFields: ['Internal Medicine', 'Family Medicine', 'Subspecialties'], keyHealthFocus: 'Cardiovascular risk stratification, hypertension, diabetes control, acute care', preventiveScreening: 'HbA1c, Lipid Profile, Colonoscopy, Mammography' },
  { stage: '7. Geriatric Care', ageRange: '65+ Years', primaryFields: ['Geriatric Medicine', 'Cognitive Neurology', 'Cardiology'], keyHealthFocus: 'Polypharmacy reduction (Beers Criteria), frailty syndrome, fall prevention, dementia', preventiveScreening: 'Mini-Cog Dementia Screen & DEXA Bone Density Scan' },
  { stage: '8. Palliative & End-of-Life', ageRange: 'Advanced Illness', primaryFields: ['Palliative Care', 'Pain Medicine', 'Hospice Care'], keyHealthFocus: 'Refractory dyspnea management, cancer pain optimization, goals-of-care alignment', preventiveScreening: 'Palliative Performance Scale (PPS) & POLST Directives' },
  { stage: '9. Post-Mortem & Forensics', ageRange: 'Post-Mortem', primaryFields: ['Forensic Pathology', 'Toxicology', 'Medico-Legal Medicine'], keyHealthFocus: 'Cause of death determination, forensic toxicology, autopsy histological validation', preventiveScreening: 'Full Medico-Legal Autopsy & Toxicology Panel' }
];

export const MASTER_AZ_DISEASE_COMPENDIUM: AZDiseaseEntry[] = [
  {
    letter: 'A',
    diseases: [
      { name: 'Acute Respiratory Distress Syndrome (ARDS)', icd10: 'J80', organSystem: 'Lungs', specialist: 'Pulmonologist / Intensivist', goldStandardTest: 'Arterial Blood Gas (PaO2/FiO2 < 200) + Chest X-Ray', primaryTreatment: 'Lung-Protective Mechanical Ventilation (6 mL/kg) + PEEP' },
      { name: 'Acute Myocardial Infarction (STEMI)', icd10: 'I21.0', organSystem: 'Heart', specialist: 'Interventional Cardiologist', goldStandardTest: '12-Lead ECG (ST Elevation) + Serial Troponin', primaryTreatment: 'Emergency Coronary Angioplasty (PCI < 90 mins) + Dual Antiplatelets' },
      { name: 'Acute Kidney Injury (AKI)', icd10: 'N17.9', organSystem: 'Kidneys', specialist: 'Nephrologist', goldStandardTest: 'Serum Creatinine (>1.5x baseline) + Urine Output', primaryTreatment: 'Fluid Resuscitation / Removal of Nephrotoxins / CRRT' },
      { name: 'Appendicitis (Acute)', icd10: 'K35.80', organSystem: 'GI / Abdomen', specialist: 'General Surgeon', goldStandardTest: 'Abdominal CT with IV Contrast / Ultrasound', primaryTreatment: 'Laparoscopic Appendectomy + IV Antibiotic Prophylaxis' }
    ]
  },
  {
    letter: 'C',
    diseases: [
      { name: 'Cardiogenic Shock', icd10: 'R57.0', organSystem: 'Heart', specialist: 'Intensivist / Heart Failure Cardiologist', goldStandardTest: 'Echocardiogram (EF < 30%) + Arterial Line MAP < 65', primaryTreatment: 'Inotropic Support (Dobutamine/Milrinone) + Intra-Aortic Balloon Pump (IABP)' },
      { name: 'Crohn Disease (Acute Flare)', icd10: 'K50.90', organSystem: 'Digestive', specialist: 'Gastroenterologist', goldStandardTest: 'Colonoscopy with Biopsy + Fecal Calprotectin', primaryTreatment: 'High-Dose IV Corticosteroids + Biologic Anti-TNF' },
      { name: 'Chronic Obstructive Pulmonary Disease (COPD)', icd10: 'J44.1', organSystem: 'Lungs', specialist: 'Pulmonologist', goldStandardTest: 'Spirometry (FEV1/FVC < 0.70) + Blood Gas', primaryTreatment: 'Inhaled Bronchodilators (DuoNeb) + Oral Steroids + BiPAP' }
    ]
  },
  {
    letter: 'D',
    diseases: [
      { name: 'Diabetic Ketoacidosis (DKA)', icd10: 'E10.10', organSystem: 'Endocrine / Metabolism', specialist: 'Endocrinologist / Intensivist', goldStandardTest: 'Blood Glucose > 250 mg/dL + Serum Ketones + pH < 7.30', primaryTreatment: 'Continuous IV Regular Insulin Drip (0.1 U/kg/hr) + Normal Saline Infusion' },
      { name: 'Disseminated Intravascular Coagulation (DIC)', icd10: 'D65', organSystem: 'Blood & Coagulation', specialist: 'Hematologist / Intensivist', goldStandardTest: 'Elevated D-Dimer + Low Fibrinogen + Thrombocytopenia', primaryTreatment: 'Treat Underlying Sepsis/Trauma + Cryoprecipitate/Platelets Transfusion' }
    ]
  },
  {
    letter: 'P',
    diseases: [
      { name: 'Pneumonia (Severe Community-Acquired)', icd10: 'J18.9', organSystem: 'Lungs', specialist: 'Infectious Disease / Pulmonologist', goldStandardTest: 'Chest X-Ray Consolidation + Sputum Gram Stain & Culture', primaryTreatment: 'IV Ceftriaxone + Azithromycin (or Vancomycin/Cefepime)' },
      { name: 'Pulmonary Embolism (PE)', icd10: 'I26.99', organSystem: 'Lungs & Circulation', specialist: 'Pulmonologist / Interventional Radiologist', goldStandardTest: 'CT Pulmonary Angiography (CTPA) + D-Dimer', primaryTreatment: 'Therapeutic IV Heparin / Catheter-Directed Thrombolysis' }
    ]
  },
  {
    letter: 'S',
    diseases: [
      { name: 'Septic Shock / Multi-Organ Dysfunction', icd10: 'R65.21', organSystem: 'Whole-Body Multisystem', specialist: 'Critical Care Intensivist', goldStandardTest: 'Serum Lactate > 2.0 mmol/L + Refractory Hypotension (MAP < 65)', primaryTreatment: '1-Hour Sepsis Bundle: 30 mL/kg Crystalloid + Norepinephrine + Meropenem IV' },
      { name: 'Stroke (Acute Ischemic)', icd10: 'I63.9', organSystem: 'Brain & Nervous System', specialist: 'Stroke Neurologist / Neurosurgeon', goldStandardTest: 'Non-Contrast Head CT (Rule out Hemorrhage) + CT Perfusion', primaryTreatment: 'IV Alteplase (tPA < 4.5h) + Mechanical Thrombectomy (< 24h)' }
    ]
  }
];
