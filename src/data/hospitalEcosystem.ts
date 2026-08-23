export interface HospitalUnit {
  id: string;
  name: string;
  code: string;
  category: 'Critical Care (ICU)' | 'Specialized Inpatient' | 'Emergency & Trauma' | 'Surgical & Procedural' | 'Outpatient & Day Care';
  totalBeds: number;
  occupiedBeds: number;
  criticalPatients: number;
  leadPhysician: string;
  leadNurse: string;
  description: string;
  activeEquipment: string[];
}

export interface SubspecialtyBranch {
  id: string;
  mainDepartment: string;
  subspecialties: {
    name: string;
    focusArea: string;
    sampleProcedures: string[];
    onDutyDoctor: string;
  }[];
}

export const HOSPITAL_UNITS: HospitalUnit[] = [
  {
    id: 'unit-01',
    name: 'Medical Intensive Care Unit (MICU)',
    code: 'MICU',
    category: 'Critical Care (ICU)',
    totalBeds: 24,
    occupiedBeds: 22,
    criticalPatients: 3,
    leadPhysician: 'Dr. Sarah Lin, MD (Chief Intensivist)',
    leadNurse: 'Nurse Sarah Connor, BSN, CCRN',
    description: 'High-acuity medical critical care for severe sepsis, ARDS, multi-organ dysfunction, and acute metabolic collapse.',
    activeEquipment: ['Mechanical Ventilators (Hamilton C6)', 'Continuous Renal Replacement Therapy (CRRT)', 'Invasive Arterial Lines', 'Central Telemetry Grid']
  },
  {
    id: 'unit-02',
    name: 'Surgical Intensive Care Unit (SICU)',
    code: 'SICU',
    category: 'Critical Care (ICU)',
    totalBeds: 18,
    occupiedBeds: 16,
    criticalPatients: 2,
    leadPhysician: 'Dr. James Thorne, MD (Trauma Surgery)',
    leadNurse: 'Nurse David Kim, RN',
    description: 'Post-operative monitoring for complex open abdominal, polytrauma, vascular, and thoracic surgical patients.',
    activeEquipment: ['Post-Op Hemodynamic Monitors', 'Thoracic Drainage Systems', 'Epidural Analgesia Pumps']
  },
  {
    id: 'unit-03',
    name: 'Coronary / Cardiac Care Unit (CCU)',
    code: 'CCU',
    category: 'Critical Care (ICU)',
    totalBeds: 16,
    occupiedBeds: 14,
    criticalPatients: 2,
    leadPhysician: 'Dr. Emily Watson, MD (Interventional Cardiology)',
    leadNurse: 'Nurse Rachel Green, RN',
    description: 'Specialized telemetry for acute coronary syndrome, unstable arrhythmias (AFib RVR), post-CABG, and cardiogenic shock.',
    activeEquipment: ['Intra-Aortic Balloon Pumps (IABP)', 'Continuous 12-Lead Holter ECG', 'Defibrillator Emergency Bridges']
  },
  {
    id: 'unit-04',
    name: 'Neonatal & Pediatric Intensive Care (NICU/PICU)',
    code: 'NICU/PICU',
    category: 'Critical Care (ICU)',
    totalBeds: 20,
    occupiedBeds: 15,
    criticalPatients: 1,
    leadPhysician: 'Dr. Julian Ross, MD (Neonatology)',
    leadNurse: 'Nurse Emily Clarke, RNC-NIC',
    description: 'Specialized critical care for premature neonates, neonatal respiratory distress, and pediatric intensive care.',
    activeEquipment: ['Giraffe Incubators', 'High-Frequency Oscillatory Ventilators', 'Nitric Oxide Delivery Units']
  },
  {
    id: 'unit-05',
    name: 'Emergency & Trauma Resuscitation Bay',
    code: 'ED-TRAUMA',
    category: 'Emergency & Trauma',
    totalBeds: 32,
    occupiedBeds: 28,
    criticalPatients: 4,
    leadPhysician: 'Dr. Mark Sloan, MD (Emergency Medicine)',
    leadNurse: 'Nurse Marcus Cole, CEN',
    description: 'Level-1 Emergency department handling acute resuscitation, mass casualty triage, stroke thrombolysis, and trauma codes.',
    activeEquipment: ['Rapid Infuser Pumps', 'Portable Ultrasound (POCUS)', 'Video Laryngoscopes', 'Crash Cart Telemetry']
  },
  {
    id: 'unit-06',
    name: 'Cardiac Catheterization Laboratory (Cath Lab)',
    code: 'CATH-LAB',
    category: 'Surgical & Procedural',
    totalBeds: 6,
    occupiedBeds: 4,
    criticalPatients: 1,
    leadPhysician: 'Dr. Robert Mercer, MD',
    leadNurse: 'Nurse Amanda Waller, RN',
    description: 'Emergency and elective coronary angiography, primary percutaneous coronary intervention (PCI), and structural valve repairs.',
    activeEquipment: ['Siemens Artis Pheno Angiography', 'Intravascular Ultrasound (IVUS)', 'Fractional Flow Reserve (FFR)']
  },
  {
    id: 'unit-07',
    name: 'Hematology & Oncology Day Care Infusion',
    code: 'ONC-DAY',
    category: 'Specialized Inpatient',
    totalBeds: 26,
    occupiedBeds: 20,
    criticalPatients: 1,
    leadPhysician: 'Dr. Marcus Vance, MD (Medical Oncology)',
    leadNurse: 'Nurse Priya Sharma, OCN',
    description: 'Outpatient and inpatient chemotherapy infusion, immunotherapy, targeted biologicals, and blood product transfusions.',
    activeEquipment: ['Chemotherapy Smart Infusion Pumps', 'Biological Safety Hoods', 'Cytotoxic Waste Systems']
  }
];

export const SUBSPECIALTY_TREES: SubspecialtyBranch[] = [
  {
    id: 'sub-surg',
    mainDepartment: 'Surgical Specialties',
    subspecialties: [
      { name: 'Trauma & Acute Care Surgery', focusArea: 'Immediate emergency exploratory laparotomy and polytrauma stabilization', sampleProcedures: ['Damage Control Laparotomy', 'Splenectomy', 'Wound Debridement'], onDutyDoctor: 'Dr. James Thorne, MD' },
      { name: 'Cardiothoracic Surgery', focusArea: 'Open heart, CABG, thoracic empyema and valve repair', sampleProcedures: ['CABG x3', 'Aortic Valve Replacement', 'Thoracotomy'], onDutyDoctor: 'Dr. Robert Mercer, MD' },
      { name: 'Neurosurgery', focusArea: 'Brain tumor craniotomy, spinal decompression and intracranial hematoma evacuation', sampleProcedures: ['Burr Hole Evacuation', 'Spinal Fusion', 'Microdiscectomy'], onDutyDoctor: 'Dr. Alexander Vance, MD' },
      { name: 'Orthopedic & Joint Surgery', focusArea: 'Compound fracture reduction, arthroplasty and compartment release', sampleProcedures: ['Total Knee Replacement', 'ORIF Femur', 'Fasciotomy'], onDutyDoctor: 'Dr. Eric Campbell, MD' },
      { name: 'Surgical Oncology', focusArea: 'En-bloc tumor resections, retroperitoneal sarcoma removal, lymphadenectomy', sampleProcedures: ['Whipple Procedure', 'Mastectomy with Sentinel Node', 'Colectomy'], onDutyDoctor: 'Dr. Margaret Hale, MD' },
      { name: 'Vascular Surgery', focusArea: 'Endovascular aneurysm repair (EVAR), carotid endarterectomy and limb bypass', sampleProcedures: ['EVAR Aorta', 'Fem-Pop Bypass', 'Arteriovenous Fistula'], onDutyDoctor: 'Dr. Frank Castle, MD' }
    ]
  },
  {
    id: 'sub-card',
    mainDepartment: 'Cardiology Subspecialties',
    subspecialties: [
      { name: 'Interventional Cardiology', focusArea: 'Primary angioplasty, stenting, and catheter-based interventions', sampleProcedures: ['Emergency Angioplasty (PCI)', 'Coronary Stent Placement', 'Atherectomy'], onDutyDoctor: 'Dr. Emily Watson, MD' },
      { name: 'Cardiac Electrophysiology (EP)', focusArea: 'Arrhythmia ablation, pacemaker and ICD implantation', sampleProcedures: ['Catheter Ablation for AFib', 'Biventricular ICD Placement', 'Holter Mapping'], onDutyDoctor: 'Dr. Arthur Sterling, MD' },
      { name: 'Advanced Heart Failure & Transplant', focusArea: 'End-stage cardiomyopathy, Left Ventricular Assist Devices (LVAD)', sampleProcedures: ['LVAD Optimization', 'Inotrope Infusion Protocol', 'Cardiac Biopsy'], onDutyDoctor: 'Dr. Gregory House, MD' },
      { name: 'Structural Heart Disease', focusArea: 'Transcatheter Aortic Valve Replacement (TAVR) and MitraClip repairs', sampleProcedures: ['TAVR', 'MitraClip', 'PFO Closure'], onDutyDoctor: 'Dr. Robert Mercer, MD' }
    ]
  },
  {
    id: 'sub-neuro',
    mainDepartment: 'Neurology Subspecialties',
    subspecialties: [
      { name: 'Stroke & Vascular Neurology', focusArea: 'Hyperacute ischemic stroke, tPA administration and mechanical thrombectomy routing', sampleProcedures: ['Thrombolysis Protocol', 'Transcranial Doppler', 'CT Perfusion Imaging'], onDutyDoctor: 'Dr. Christopher Ray, MD' },
      { name: 'Neurocritical Care', focusArea: 'Intensive care for status epilepticus, severe TBI, intracranial hemorrhage', sampleProcedures: ['Continuous Video EEG', 'Intracranial Pressure (ICP) Monitoring', 'Targeted Temperature Management'], onDutyDoctor: 'Dr. Sarah Lin, MD' },
      { name: 'Epilepsy & Movement Disorders', focusArea: 'Refractory seizures, Parkinsonian syndromes and deep brain stimulation management', sampleProcedures: ['Video-EEG Telemetry', 'DBS Programming', 'Botulinum Toxin Injections'], onDutyDoctor: 'Dr. Hannah Foster, MD' }
    ]
  },
  {
    id: 'sub-onc',
    mainDepartment: 'Multi-Disciplinary Oncology Care Team',
    subspecialties: [
      { name: 'Medical Oncology', focusArea: 'Systemic chemotherapy, checkpoint inhibitors, targeted molecular inhibitors', sampleProcedures: ['Osimertinib / KRAS Targeted Protocol', 'Immunotherapy Infusion', 'Toxicity Management'], onDutyDoctor: 'Dr. Marcus Vance, MD' },
      { name: 'Radiation Oncology', focusArea: 'Stereotactic body radiation therapy (SBRT), proton beam planning, brachytherapy', sampleProcedures: ['SBRT Stereotactic Treatment', 'Brachytherapy Implantation', 'Palliative Radiation'], onDutyDoctor: 'Dr. Elena Petrova, MD' },
      { name: 'Hematologist-Oncologist', focusArea: 'Leukemias, lymphomas, multiple myeloma and CAR-T cell therapy', sampleProcedures: ['Bone Marrow Biopsy', 'CAR-T Infusion Protocol', 'Stem Cell Transplant'], onDutyDoctor: 'Dr. Anthony Fauci, MD' },
      { name: 'Pediatric Oncology', focusArea: 'Pediatric leukemias, neuroblastoma, Wilms tumor and medulloblastoma', sampleProcedures: ['Pediatric Chemo Protocol', 'Lumbar Puncture with Intrathecal Chemo'], onDutyDoctor: 'Dr. Maya Patel, MD' }
    ]
  }
];

export const CLINICAL_WORKFLOW_STEPS = [
  { step: '1. Admission & Triage', description: 'Patient registered in ED / OPD, bed assigned, NEWS2 baseline scored.', icon: 'BedDouble' },
  { step: '2. Continuous Vitals', description: 'Real-time telemetry stream (HR, SpO2, RR, Temp, BP) active 24/7.', icon: 'Activity' },
  { step: '3. Explainable AI Analysis', description: 'TreeSHAP models evaluate physiological deterioration risk continuously.', icon: 'Brain' },
  { step: '4. Clinical Specialist Consult', description: 'Multi-disciplinary routing to on-call surgeon, intensivist, or oncologist.', icon: 'Stethoscope' },
  { step: '5. Diagnostic PACS & Labs', description: 'Chest X-Ray, CT, Arterial Blood Gas results updated and verified.', icon: 'Building2' },
  { step: '6. Digital Rx & Safety Check', description: 'Cross-hospital duplicate check, electronic signature, and refill tracking.', icon: 'Pill' },
  { step: '7. Discharge & Care Passport', description: 'SOAP note exported to PDF, Emergency QR Passport synced with patient.', icon: 'QrCode' }
];
