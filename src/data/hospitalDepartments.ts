export interface HospitalDepartment {
  id: string;
  name: string;
  code: string;
  category: 'Critical & Emergency' | 'Clinical Inpatient' | 'Surgical & Procedural' | 'Outpatient & Specialized' | 'Diagnostic & Supportive';
  headOfDepartment: string;
  capacity: number; // beds or daily throughput
  activeLoad: number;
  criticalAlarmsCount: number;
  coreServices: string[];
  assignedDoctors: string[];
  description: string;
}

export const MAIN_HOSPITAL_DEPARTMENTS: HospitalDepartment[] = [
  // 1. Emergency
  {
    id: 'dept-01',
    name: 'Emergency Department',
    code: 'ED',
    category: 'Critical & Emergency',
    headOfDepartment: 'Dr. Mark Sloan, MD (Chief of Emergency Medicine)',
    capacity: 32,
    activeLoad: 28,
    criticalAlarmsCount: 4,
    coreServices: ['Level-1 Trauma Resuscitation', 'Rapid Triage (NEWS2)', 'Code Stroke / STEMI Protocols', 'Mass Casualty Management'],
    assignedDoctors: ['Dr. Mark Sloan, MD', 'Dr. Rachel Moore, MD', 'Dr. Kevin Zhang, MD'],
    description: '24/7 acute trauma resuscitation bays with direct rapid triage to Cath Lab, Operating Theatres, and ICU.'
  },
  // 2. General Medicine
  {
    id: 'dept-02',
    name: 'General Medicine',
    code: 'GEN-MED',
    category: 'Clinical Inpatient',
    headOfDepartment: 'Dr. Arthur Sterling, MD (Chair of Internal Medicine)',
    capacity: 40,
    activeLoad: 35,
    criticalAlarmsCount: 1,
    coreServices: ['Adult Multisystem Inpatient Care', 'Infectious Disease Stabilization', 'Diabetic & Hypertensive Crises', 'Diagnostic Dilemma Workup'],
    assignedDoctors: ['Dr. Arthur Sterling, MD', 'Dr. Harold Finch, MD'],
    description: 'Comprehensive adult acute and subacute inpatient medical management and multi-morbidity coordination.'
  },
  // 3. ICU
  {
    id: 'dept-03',
    name: 'Intensive Care Unit (ICU)',
    code: 'ICU',
    category: 'Critical & Emergency',
    headOfDepartment: 'Dr. Sarah Lin, MD (Chief Intensivist)',
    capacity: 24,
    activeLoad: 22,
    criticalAlarmsCount: 3,
    coreServices: ['Invasive Mechanical Ventilation (Hamilton C6)', 'Continuous Renal Replacement (CRRT)', 'Invasive Arterial/Central Line Telemetry', 'Septic Shock Resuscitation'],
    assignedDoctors: ['Dr. Sarah Lin, MD', 'Dr. Gregory House, MD', 'Dr. Vikram Sethi, MD'],
    description: 'Highest-acuity multi-organ life support unit managing refractory sepsis, ARDS, and multi-organ failure.'
  },
  // 4. Cardiology
  {
    id: 'dept-04',
    name: 'Cardiology & CCU',
    code: 'CARD',
    category: 'Clinical Inpatient',
    headOfDepartment: 'Dr. Emily Watson, MD (Director of Cardiology & Cath Lab)',
    capacity: 20,
    activeLoad: 18,
    criticalAlarmsCount: 2,
    coreServices: ['Emergency Coronary Angioplasty (PCI)', '12-Lead Continuous Holter ECG', 'Arrhythmia Catheter Ablation', 'Heart Failure (LVAD) Management'],
    assignedDoctors: ['Dr. Emily Watson, MD', 'Dr. Robert Mercer, MD'],
    description: 'Comprehensive invasive and non-invasive cardiovascular care, coronary care telemetry, and primary angioplasty.'
  },
  // 5. Neurology
  {
    id: 'dept-05',
    name: 'Neurology & Stroke Unit',
    code: 'NEUR',
    category: 'Clinical Inpatient',
    headOfDepartment: 'Dr. Christopher Ray, MD (Director of Stroke Center)',
    capacity: 18,
    activeLoad: 15,
    criticalAlarmsCount: 1,
    coreServices: ['Hyperacute Stroke Thrombolysis (tPA)', 'Continuous 24h Video EEG Telemetry', 'Intracranial Pressure (ICP) Monitoring', 'Neuromuscular Crisis Care'],
    assignedDoctors: ['Dr. Christopher Ray, MD', 'Dr. Hannah Foster, MD'],
    description: 'Specialized acute stroke and neurocritical unit with rapid CT perfusion routing and neurotelemetry.'
  },
  // 6. Pulmonology
  {
    id: 'dept-06',
    name: 'Pulmonology & Respiratory',
    code: 'PULM',
    category: 'Clinical Inpatient',
    headOfDepartment: 'Dr. Gregory House, MD (Chief of Thoracic Medicine)',
    capacity: 16,
    activeLoad: 14,
    criticalAlarmsCount: 2,
    coreServices: ['High-Flow O2 & Non-Invasive Ventilation', 'Severe ARDS & COPD Exacerbation Care', 'Flexible Bronchoscopy', 'Arterial Blood Gas Analysis'],
    assignedDoctors: ['Dr. Gregory House, MD', 'Dr. Sarah Lin, MD'],
    description: 'Specialized pulmonary unit for respiratory failure, refractory hypoxemia, and mechanical ventilation weaning.'
  },
  // 7. Gastroenterology
  {
    id: 'dept-07',
    name: 'Gastroenterology & Hepatology',
    code: 'GASTRO',
    category: 'Clinical Inpatient',
    headOfDepartment: 'Dr. David Cho, MD (Director of Endoscopy)',
    capacity: 16,
    activeLoad: 13,
    criticalAlarmsCount: 1,
    coreServices: ['Emergency Upper GI Endoscopy (EGD)', 'Colonoscopy & Polypectomy', 'Acute Pancreatitis Care', 'Hepatic Encephalopathy Management'],
    assignedDoctors: ['Dr. David Cho, MD', 'Dr. Sandra Bell, MD'],
    description: 'Advanced GI bleed intervention suite, therapeutic endoscopy, and acute liver failure management.'
  },
  // 8. Nephrology
  {
    id: 'dept-08',
    name: 'Nephrology & Dialysis',
    code: 'NEPH',
    category: 'Clinical Inpatient',
    headOfDepartment: 'Dr. Vikram Sethi, MD (Chief of Renal Medicine)',
    capacity: 18,
    activeLoad: 16,
    criticalAlarmsCount: 1,
    coreServices: ['Acute Hemodialysis & CRRT', 'Acute Kidney Injury (AKI) Resuscitation', 'Electrolyte & Acid-Base Corrections', 'Renal Biopsy Diagnostics'],
    assignedDoctors: ['Dr. Vikram Sethi, MD'],
    description: 'Inpatient renal care unit and 12-station acute hemodialysis suite with continuous CRRT support.'
  },
  // 9. Oncology
  {
    id: 'dept-09',
    name: 'Medical & Precision Oncology',
    code: 'ONC',
    category: 'Clinical Inpatient',
    headOfDepartment: 'Dr. Marcus Vance, MD (Chair of Precision Oncology)',
    capacity: 26,
    activeLoad: 21,
    criticalAlarmsCount: 1,
    coreServices: ['Targeted Chemotherapy & Immunotherapy', 'Febrile Neutropenia Rapid Protocols', 'Molecular Biomarker Sequencing', 'Tumor Lysis Syndrome Care'],
    assignedDoctors: ['Dr. Marcus Vance, MD', 'Dr. Elena Petrova, MD', 'Dr. Anthony Fauci, MD'],
    description: 'Comprehensive cancer infusion center, inpatient medical oncology, and genomic precision therapeutics.'
  },
  // 10. Orthopedics
  {
    id: 'dept-10',
    name: 'Orthopedic Surgery & Trauma',
    code: 'ORTHO',
    category: 'Surgical & Procedural',
    headOfDepartment: 'Dr. Eric Campbell, MD (Chief Orthopedic Surgeon)',
    capacity: 22,
    activeLoad: 18,
    criticalAlarmsCount: 0,
    coreServices: ['Complex Fracture Reduction (ORIF)', 'Joint Replacement Arthroplasty', 'Compartment Syndrome Release', 'Spinal Deformity Correction'],
    assignedDoctors: ['Dr. Eric Campbell, MD', 'Dr. Travis Knight, MD'],
    description: 'Acute musculoskeletal trauma management, polytrauma reconstruction, and orthopedic rehabilitation.'
  },
  // 11. Pediatrics
  {
    id: 'dept-11',
    name: 'Pediatrics & NICU/PICU',
    code: 'PEDS',
    category: 'Clinical Inpatient',
    headOfDepartment: 'Dr. Maya Patel, MD (Director of Pediatrics)',
    capacity: 20,
    activeLoad: 15,
    criticalAlarmsCount: 1,
    coreServices: ['Neonatal Intensive Care (NICU)', 'Pediatric Resuscitation & PEWS Scoring', 'Childhood Infectious Diseases', 'High-Frequency Ventilation'],
    assignedDoctors: ['Dr. Maya Patel, MD', 'Dr. Julian Ross, MD'],
    description: 'Dedicated pediatric and neonatal high-acuity suites with specialized micro-dosing and pediatric telemetry.'
  },
  // 12. OBGYN
  {
    id: 'dept-12',
    name: 'Obstetrics & Gynecology (OBGYN)',
    code: 'OBGYN',
    category: 'Surgical & Procedural',
    headOfDepartment: 'Dr. Rachel Green, MD (Chief of OBGYN)',
    capacity: 24,
    activeLoad: 19,
    criticalAlarmsCount: 0,
    coreServices: ['High-Risk Labor & Delivery Suites', 'Continuous Fetal Heart Rate Monitoring', 'Emergency Cesarean Delivery', 'Gynecologic Laparoscopy'],
    assignedDoctors: ['Dr. Rachel Green, MD', 'Dr. Natalie Portman, MD'],
    description: 'Full-spectrum women’s healthcare, high-risk maternal-fetal medicine, and surgical gynecology.'
  },
  // 13. Surgery
  {
    id: 'dept-13',
    name: 'General & Trauma Surgery',
    code: 'SURG',
    category: 'Surgical & Procedural',
    headOfDepartment: 'Dr. James Thorne, MD (Chief of Surgical Services)',
    capacity: 28,
    activeLoad: 24,
    criticalAlarmsCount: 2,
    coreServices: ['Exploratory Damage-Control Laparotomy', 'Minimally Invasive Laparoscopy', 'Post-Op SICU Surgical Monitoring', 'Emergency Appendectomy/Cholecystectomy'],
    assignedDoctors: ['Dr. James Thorne, MD', 'Dr. Alexander Vance, MD', 'Dr. Frank Castle, MD'],
    description: 'Level-1 trauma surgical suites, 10 Operating Theatres, and integrated Surgical ICU.'
  },
  // 14. Psychiatry
  {
    id: 'dept-14',
    name: 'Psychiatry & Behavioral Health',
    code: 'PSYCH',
    category: 'Outpatient & Specialized',
    headOfDepartment: 'Dr. Claire Underwood, MD (Director of Psychiatry)',
    capacity: 16,
    activeLoad: 12,
    criticalAlarmsCount: 0,
    coreServices: ['Acute ICU Delirium (CAM-ICU) Auditing', 'Crisis Psychiatric Stabilization', 'Psychotropic Medication Optimization', 'Psychosomatic Consultations'],
    assignedDoctors: ['Dr. Claire Underwood, MD'],
    description: 'Inpatient psychiatric stabilization, acute ICU delirium intervention, and behavioral health support.'
  },
  // 15. Dermatology
  {
    id: 'dept-15',
    name: 'Dermatology',
    code: 'DERM',
    category: 'Outpatient & Specialized',
    headOfDepartment: 'Dr. Chloe Bennett, MD',
    capacity: 12,
    activeLoad: 8,
    criticalAlarmsCount: 0,
    coreServices: ['Severe Cutaneous Drug Reactions (TEN/SJS)', 'Punch Biopsy & Histopathology', 'Malignant Melanoma Staging', 'Autoimmune Blistering Treatment'],
    assignedDoctors: ['Dr. Chloe Bennett, MD'],
    description: 'Cutaneous oncology, severe drug reaction triage, and specialized dermatologic consultations.'
  },
  // 16. ENT
  {
    id: 'dept-16',
    name: 'ENT (Otolaryngology)',
    code: 'ENT',
    category: 'Surgical & Procedural',
    headOfDepartment: 'Dr. Timothy Hayes, MD',
    capacity: 10,
    activeLoad: 7,
    criticalAlarmsCount: 0,
    coreServices: ['Acute Airway Fiberoptic Scopes', 'Difficult Airway Management & Tracheostomy', 'Head & Neck Oncology', 'Severe Epistaxis Embolization'],
    assignedDoctors: ['Dr. Timothy Hayes, MD'],
    description: 'Airway emergency response, diagnostic nasopharyngoscopy, and head/neck surgical care.'
  },
  // 17. Ophthalmology
  {
    id: 'dept-17',
    name: 'Ophthalmology',
    code: 'OPHTH',
    category: 'Outpatient & Specialized',
    headOfDepartment: 'Dr. Serena Vance, MD',
    capacity: 10,
    activeLoad: 6,
    criticalAlarmsCount: 0,
    coreServices: ['Acute Glaucoma Laser Iridotomy', 'Retinal Detachment Emergency Surgery', 'Bedside Slit-Lamp Ocular Exams', 'Trauma Globe Repair'],
    assignedDoctors: ['Dr. Serena Vance, MD'],
    description: 'Emergency eye trauma management, microsurgery suites, and bedside diagnostic ocular evaluation.'
  },
  // 18. Radiology
  {
    id: 'dept-18',
    name: 'Diagnostic Radiology & PACS',
    code: 'RAD',
    category: 'Diagnostic & Supportive',
    headOfDepartment: 'Dr. Katherine Wu, MD (Chief Radiologist)',
    capacity: 150, // daily scans
    activeLoad: 124,
    criticalAlarmsCount: 2,
    coreServices: ['Stat Portable Digital X-Rays', 'Dual-Source 128-Slice CT Angiography', '3T High-Field Neuro MRI', 'AI Computer-Vision DICOM Reports'],
    assignedDoctors: ['Dr. Katherine Wu, MD', 'Dr. Marcus Drake, MD'],
    description: 'High-throughput 24/7 emergency imaging, PACS cloud broadcast, and interventional radiology.'
  },
  // 19. Pathology
  {
    id: 'dept-19',
    name: 'Pathology & Tissue Diagnostics',
    code: 'PATH',
    category: 'Diagnostic & Supportive',
    headOfDepartment: 'Dr. Jennifer Hayes, MD (Director of Pathology)',
    capacity: 100, // daily biopsies
    activeLoad: 82,
    criticalAlarmsCount: 0,
    coreServices: ['Stat Frozen Section Biopsies', 'Surgical Histopathology', 'Bone Marrow Aspirate Review', 'Immunohistochemistry & Biomarkers'],
    assignedDoctors: ['Dr. Jennifer Hayes, MD'],
    description: 'Rapid perioperative tissue diagnosis, molecular tumor pathology, and clinical cytology.'
  },
  // 20. Laboratory
  {
    id: 'dept-20',
    name: 'Clinical Laboratory & Microbiology',
    code: 'LAB',
    category: 'Diagnostic & Supportive',
    headOfDepartment: 'Dr. Leonard McCoy, PhD (Chief Clinical Microbiologist)',
    capacity: 500, // daily samples
    activeLoad: 412,
    criticalAlarmsCount: 1,
    coreServices: ['Stat Arterial Blood Gas (ABG)', 'Blood Culture & MALDI-TOF Speciation', 'Sepsis Lactate & Procalcitonin Panels', 'Automated Complete Blood Count (CBC)'],
    assignedDoctors: ['Dr. Leonard McCoy, PhD', 'Dr. Anthony Fauci, MD'],
    description: 'Fully automated high-speed central laboratory providing sub-15-minute stat critical lab results.'
  },
  // 21. Pharmacy
  {
    id: 'dept-21',
    name: 'Hospital Pharmacy & Prescription Vault',
    code: 'PHARM',
    category: 'Diagnostic & Supportive',
    headOfDepartment: 'PharmD Amanda Vance (Chief Clinical Pharmacist)',
    capacity: 400, // daily dispensations
    activeLoad: 310,
    criticalAlarmsCount: 1,
    coreServices: ['Cross-Hospital Drug-Drug Conflict Checks', 'Automated Pyxis MedStation Dispensing', 'Sterile IV Admixture & Chemotherapy', 'Cryptographic Digital Prescription Verification'],
    assignedDoctors: ['PharmD Amanda Vance'],
    description: 'Central hospital pharmacy and automated Pyxis dispensing linked to BioPulse AI Prescription Vault.'
  }
];
