import { PatientProfile, HospitalAlert } from '../types/biotech';

export const PATIENT_DATABASE: PatientProfile[] = [
  {
    id: 'p203',
    mrn: 'MRN-90203',
    name: 'Robert Vance',
    age: 68,
    gender: 'Male',
    bedLocation: 'ICU-Bed 03 (South Wing)',
    admissionDate: '2026-08-21 04:15',
    primaryDiagnosis: 'Severe Sepsis & Acute Hypoxemic Respiratory Deterioration',
    attendingPhysician: 'Dr. Sarah Lin, MD (Critical Care)',
    vitals: {
      heartRate: 128,
      spo2: 86,
      respiratoryRate: 31,
      temperature: 39.2,
      systolicBp: 88,
      diastolicBp: 54,
      news2Score: 13,
      ctDnaFraction: 3.8,
      lastUpdated: '12 seconds ago'
    },
    wholeBodyTelemetry: {
      brain: {
        gcsScore: 12,
        pupillaryReflex: '3mm Equal & Sluggish',
        intracranialStatus: 'Normal ICP / Sepsis-Associated Encephalopathy',
        neurologicalStatus: 'Lethargic / Confused'
      },
      heart: {
        rhythm: 'Sinus Tachycardia (HR 128 bpm)',
        meanArterialPressure: 65,
        cardiacOutput: 4.1,
        troponinLevel: '0.04 ng/mL (Mild Stress Elevation)',
        status: 'Sinus Tachycardia'
      },
      lungs: {
        pao2Fio2Ratio: 168,
        spo2: 86,
        respiratoryRate: 31,
        airwayResistance: 'Bilateral Bibasilar Rales / Reduced Compliance',
        status: 'Severe ARDS'
      },
      bloodRenal: {
        creatinine: 2.1,
        eGFR: 32,
        lactate: 4.2,
        hemoglobin: 10.4,
        platelets: 112,
        status: 'Lactic Acidosis / Sepsis'
      },
      liverMetabolism: {
        coreTemp: 39.2,
        bloodGlucose: 178,
        bilirubin: 1.4,
        altAst: 'ALT 58 U/L | AST 64 U/L',
        status: 'Hyperpyrexic Stress'
      }
    },
    riskAssessment: {
      overallRiskScore: 91,
      riskLevel: 'CRITICAL',
      primaryRiskDiagnosis: 'Impending Septic Shock & Hypoxic Respiratory Collapse',
      contributingFactors: [
        { feature: 'SpO2 Desaturation', currentValue: '86%', normalRange: '95 - 100%', impactPercentage: 35, direction: 'depressed' },
        { feature: 'Tachypnea (Resp Rate)', currentValue: '31 bpm', normalRange: '12 - 20 bpm', impactPercentage: 26, direction: 'elevated' },
        { feature: 'Severe Tachycardia', currentValue: '128 bpm', normalRange: '60 - 90 bpm', impactPercentage: 21, direction: 'elevated' },
        { feature: 'Hyperthermia (Pyrexia)', currentValue: '39.2°C', normalRange: '36.5 - 37.5°C', impactPercentage: 11, direction: 'elevated' },
        { feature: 'Hypotension (MAP < 65)', currentValue: '88/54 mmHg', normalRange: '120/80 mmHg', impactPercentage: 7, direction: 'depressed' }
      ],
      counterfactualPrediction: [
        { action: 'Administer High-Flow Nasal Cannula (FiO2 60%) + IV Fluid Bolus 30mL/kg', projectedRiskScore: 42, projectedRiskLevel: 'MODERATE' },
        { action: 'Start Vasopressor (Norepinephrine) + Broad-Spectrum Antibiotics', projectedRiskScore: 28, projectedRiskLevel: 'LOW' }
      ]
    },
    emergencyPassport: {
      passportId: 'PASSPORT-VA-90203',
      abhaId: '91-8820-4102-9912',
      bloodGroup: 'A- (A Negative)',
      criticalAllergies: ['Penicillin (Anaphylaxis)', 'Sulfa Drugs (Stevens-Johnson Risk)'],
      chronicConditions: ['Type 2 Diabetes Mellitus', 'COPD Gold Stage II', 'Hypertension'],
      activeMedications: ['Metformin 500mg BID', 'Tiotropium Inhaler', 'Lisinopril 10mg'],
      emergencyContact: {
        name: 'Eleanor Vance',
        relation: 'Spouse',
        phone: '+1 (555) 382-9011'
      },
      organDonorStatus: true,
      resuscitationDNR: false,
      qrCodeValue: 'https://novasentinel.health/passport/MRN-90203',
      prescriptions: [
        {
          id: 'rx-01',
          drugName: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once Daily (Morning)',
          prescribedHospital: 'Memorial General Hospital',
          prescribingDoctor: 'Dr. Arthur Sterling, MD',
          prescribedDate: '2026-07-10',
          status: 'Active',
          isDuplicateOrHazard: false,
          refillDueDays: 12,
          adherenceRate: 96,
          digitalSignature: 'SIG-VERIFIED-MGH-882190'
        },
        {
          id: 'rx-02',
          drugName: 'Enalapril (Duplicate ACE Inhibitor Flag)',
          dosage: '5mg',
          frequency: 'Twice Daily',
          prescribedHospital: 'Metro Outpatient Urgent Clinic',
          prescribingDoctor: 'Dr. Kevin Ross, MD',
          prescribedDate: '2026-08-14',
          status: 'Flagged Discontinued',
          isDuplicateOrHazard: true,
          safetyRiskAlert: '⚠️ AI Safety Intercept: Duplicate Renin-Angiotensin blockade detected! Patient already taking Lisinopril from Memorial General. Risk of profound hypotension & acute kidney injury.',
          refillDueDays: 0,
          adherenceRate: 40,
          digitalSignature: 'SIG-VERIFIED-METRO-401123'
        },
        {
          id: 'rx-03',
          drugName: 'Metformin Hydrochloride',
          dosage: '500mg',
          frequency: 'Twice Daily with Meals',
          prescribedHospital: 'City Endocrinology Associates',
          prescribingDoctor: 'Dr. Wendy Chen, MD',
          prescribedDate: '2026-05-18',
          status: 'Active',
          isDuplicateOrHazard: false,
          refillDueDays: 5,
          adherenceRate: 92,
          digitalSignature: 'SIG-VERIFIED-CEA-339011'
        },
        {
          id: 'rx-04',
          drugName: 'Tiotropium Bromide (Spiriva Respimat)',
          dosage: '2.5 mcg/actuation',
          frequency: '2 puffs Once Daily',
          prescribedHospital: 'Pulmonary Specialty Center',
          prescribingDoctor: 'Dr. Gregory House, MD',
          prescribedDate: '2026-06-02',
          status: 'Active',
          isDuplicateOrHazard: false,
          refillDueDays: 18,
          adherenceRate: 98,
          digitalSignature: 'SIG-VERIFIED-PSC-110488'
        }
      ],
      consentLogs: [
        {
          id: 'c-01',
          doctorName: 'Dr. Sarah Lin, MD',
          hospitalName: 'ICU Critical Care Ward',
          accessTier: 'Emergency Minimal (QR)',
          grantedTimestamp: '2026-08-23 15:45',
          expiryTimestamp: '2026-08-23 19:45',
          status: 'Active'
        },
        {
          id: 'c-02',
          doctorName: 'Dr. Marcus Vance, MD',
          hospitalName: 'Oncology Specialist Network',
          accessTier: '1-Hour Full Clinical',
          grantedTimestamp: '2026-08-21 10:00',
          expiryTimestamp: '2026-08-21 11:00',
          status: 'Expired'
        }
      ]
    },
    vitalsHistory: [
      { time: '04:00', heartRate: 88, spo2: 96, respiratoryRate: 18, temperature: 37.1, systolicBp: 122 },
      { time: '08:00', heartRate: 94, spo2: 94, respiratoryRate: 20, temperature: 37.6, systolicBp: 116 },
      { time: '12:00', heartRate: 106, spo2: 91, respiratoryRate: 24, temperature: 38.3, systolicBp: 104 },
      { time: '14:00', heartRate: 118, spo2: 89, respiratoryRate: 28, temperature: 38.9, systolicBp: 96 },
      { time: '16:00', heartRate: 128, spo2: 86, respiratoryRate: 31, temperature: 39.2, systolicBp: 88 }
    ],
    clinicalNotes: [
      {
        timestamp: '2026-08-23 16:15',
        author: 'Dr. Sarah Lin, MD',
        noteType: 'SOAP',
        subjective: 'Patient in acute distress, marked accessory muscle use, diaphoretic, complaining of severe chest tightness and rigors.',
        objective: 'Vitals: HR 128, SpO2 86% on room air, RR 31, Temp 39.2°C, BP 88/54. NEWS2 Score: 13. Bilateral bibasilar crackles on auscultation.',
        assessment: 'Severe septic deterioration secondary to hospital-acquired pneumonia. High risk of multi-organ hypoperfusion.',
        plan: '1. Immediate switch to 15L Non-Rebreather Mask.\n2. Blood cultures x2, serum lactate stat.\n3. IV Crystalloid bolus 2000mL.\n4. Empiric IV Vancomycin + Cefepime.\n5. Notify ICU Step-Down team.'
      }
    ]
  },
  {
    id: 'p182',
    mrn: 'MRN-88182',
    name: 'Priya Patel',
    age: 54,
    gender: 'Female',
    bedLocation: 'Oncology Ward 4B (Bed 12)',
    admissionDate: '2026-08-22 11:30',
    primaryDiagnosis: 'Post-Chemotherapy Febrile Neutropenia & Tachycardia',
    attendingPhysician: 'Dr. Marcus Vance, MD (Oncology)',
    vitals: {
      heartRate: 116,
      spo2: 91,
      respiratoryRate: 24,
      temperature: 38.8,
      systolicBp: 96,
      diastolicBp: 61,
      news2Score: 9,
      ctDnaFraction: 1.2,
      lastUpdated: '45 seconds ago'
    },
    wholeBodyTelemetry: {
      brain: {
        gcsScore: 14,
        pupillaryReflex: '3mm Brisk',
        intracranialStatus: 'Normal',
        neurologicalStatus: 'Alert & Oriented'
      },
      heart: {
        rhythm: 'Sinus Tachycardia (HR 116 bpm)',
        meanArterialPressure: 72,
        cardiacOutput: 4.8,
        troponinLevel: '<0.01 ng/mL (Normal)',
        status: 'Sinus Tachycardia'
      },
      lungs: {
        pao2Fio2Ratio: 240,
        spo2: 91,
        respiratoryRate: 24,
        airwayResistance: 'Clear Bilaterally',
        status: 'Moderate Hypoxemia'
      },
      bloodRenal: {
        creatinine: 1.1,
        eGFR: 68,
        lactate: 2.1,
        hemoglobin: 9.8,
        platelets: 68,
        status: 'Compensated'
      },
      liverMetabolism: {
        coreTemp: 38.8,
        bloodGlucose: 112,
        bilirubin: 0.9,
        altAst: 'ALT 32 U/L | AST 28 U/L',
        status: 'Hyperpyrexic Stress'
      }
    },
    riskAssessment: {
      overallRiskScore: 78,
      riskLevel: 'HIGH',
      primaryRiskDiagnosis: 'Febrile Neutropenic Sepsis Risk',
      contributingFactors: [
        { feature: 'Core Pyrexia (Temp)', currentValue: '38.8°C', normalRange: '36.5 - 37.5°C', impactPercentage: 38, direction: 'elevated' },
        { feature: 'Sinus Tachycardia', currentValue: '116 bpm', normalRange: '60 - 90 bpm', impactPercentage: 29, direction: 'elevated' },
        { feature: 'Moderate Desaturation', currentValue: '91%', normalRange: '95 - 100%', impactPercentage: 22, direction: 'depressed' },
        { feature: 'Borderline Hypotension', currentValue: '96/61 mmHg', normalRange: '120/80 mmHg', impactPercentage: 11, direction: 'depressed' }
      ],
      counterfactualPrediction: [
        { action: 'Administer Piperacillin-Tazobactam + 2L O2 Nasal Cannula', projectedRiskScore: 31, projectedRiskLevel: 'MODERATE' }
      ]
    },
    emergencyPassport: {
      passportId: 'PASSPORT-PP-88182',
      abhaId: '91-7714-3309-8812',
      bloodGroup: 'B+ (B Positive)',
      criticalAllergies: ['Morphine (Severe Bronchospasm)', 'Iodinated Contrast'],
      chronicConditions: ['Stage IIIB Breast Carcinoma (Post-AC Chemo)', 'Mild Asthma'],
      activeMedications: ['Pegfilgrastim 6mg', 'Ondansetron 8mg TID', 'Tamoxifen 20mg'],
      emergencyContact: {
        name: 'Rajesh Patel',
        relation: 'Husband',
        phone: '+1 (555) 791-4402'
      },
      organDonorStatus: true,
      resuscitationDNR: false,
      qrCodeValue: 'https://novasentinel.health/passport/MRN-88182',
      prescriptions: [
        {
          id: 'rx-11',
          drugName: 'Tamoxifen Citrate',
          dosage: '20mg',
          frequency: 'Once Daily',
          prescribedHospital: 'National Cancer Institute',
          prescribingDoctor: 'Dr. Helen Brooks, MD',
          prescribedDate: '2026-07-01',
          status: 'Active',
          isDuplicateOrHazard: false,
          refillDueDays: 14,
          adherenceRate: 98,
          digitalSignature: 'SIG-VERIFIED-NCI-994812'
        },
        {
          id: 'rx-12',
          drugName: 'Ondansetron (Zofran)',
          dosage: '8mg',
          frequency: 'Every 8 hours PRN nausea',
          prescribedHospital: 'St. Jude Oncology Center',
          prescribingDoctor: 'Dr. Marcus Vance, MD',
          prescribedDate: '2026-08-15',
          status: 'Active',
          isDuplicateOrHazard: false,
          refillDueDays: 8,
          adherenceRate: 95,
          digitalSignature: 'SIG-VERIFIED-STJ-448190'
        }
      ],
      consentLogs: []
    },
    vitalsHistory: [
      { time: '04:00', heartRate: 78, spo2: 97, respiratoryRate: 16, temperature: 36.9, systolicBp: 118 },
      { time: '08:00', heartRate: 84, spo2: 96, respiratoryRate: 18, temperature: 37.4, systolicBp: 112 },
      { time: '12:00', heartRate: 98, spo2: 94, respiratoryRate: 20, temperature: 38.1, systolicBp: 104 },
      { time: '16:00', heartRate: 116, spo2: 91, respiratoryRate: 24, temperature: 38.8, systolicBp: 96 }
    ],
    clinicalNotes: []
  },
  {
    id: 'p145',
    mrn: 'MRN-77145',
    name: 'David Sterling',
    age: 71,
    gender: 'Male',
    bedLocation: 'Cardiac Telemetry (Bed 08)',
    admissionDate: '2026-08-20 14:00',
    primaryDiagnosis: 'Post-CABG Atrial Fibrillation with Rapid Ventricular Response',
    attendingPhysician: 'Dr. Emily Watson, MD (Cardiology)',
    vitals: {
      heartRate: 102,
      spo2: 94,
      respiratoryRate: 20,
      temperature: 38.0,
      systolicBp: 110,
      diastolicBp: 72,
      news2Score: 5,
      lastUpdated: '1 minute ago'
    },
    wholeBodyTelemetry: {
      brain: {
        gcsScore: 15,
        pupillaryReflex: '3mm Normal',
        intracranialStatus: 'Normal',
        neurologicalStatus: 'Alert & Oriented'
      },
      heart: {
        rhythm: 'Atrial Fibrillation with RVR (HR 102 bpm)',
        meanArterialPressure: 84,
        cardiacOutput: 4.4,
        troponinLevel: '0.08 ng/mL (Post-Operative)',
        status: 'Arrhythmia'
      },
      lungs: {
        pao2Fio2Ratio: 310,
        spo2: 94,
        respiratoryRate: 20,
        airwayResistance: 'Mild Basilar Atelectasis',
        status: 'Adequate Ventilation'
      },
      bloodRenal: {
        creatinine: 1.3,
        eGFR: 58,
        lactate: 1.4,
        hemoglobin: 11.2,
        platelets: 198,
        status: 'Normal'
      },
      liverMetabolism: {
        coreTemp: 38.0,
        bloodGlucose: 134,
        bilirubin: 0.8,
        altAst: 'ALT 24 U/L | AST 22 U/L',
        status: 'Stable'
      }
    },
    riskAssessment: {
      overallRiskScore: 46,
      riskLevel: 'MODERATE',
      primaryRiskDiagnosis: 'Hemodynamic Instability / Rate Control Required',
      contributingFactors: [
        { feature: 'Elevated Ventricular Rate', currentValue: '102 bpm', normalRange: '60 - 90 bpm', impactPercentage: 45, direction: 'elevated' },
        { feature: 'Mild Hypoxemia', currentValue: '94%', normalRange: '95 - 100%', impactPercentage: 30, direction: 'depressed' },
        { feature: 'Low-Grade Pyrexia', currentValue: '38.0°C', normalRange: '36.5 - 37.5°C', impactPercentage: 25, direction: 'elevated' }
      ],
      counterfactualPrediction: [
        { action: 'IV Metoprolol 5mg Bolus + Electrolyte Repletion (K+ > 4.0)', projectedRiskScore: 18, projectedRiskLevel: 'LOW' }
      ]
    },
    emergencyPassport: {
      passportId: 'PASSPORT-DS-77145',
      abhaId: '91-3310-9082-1145',
      bloodGroup: 'O+ (O Positive)',
      criticalAllergies: ['ACE Inhibitors (Angioedema)'],
      chronicConditions: ['Coronary Artery Disease (Post-CABG x3)', 'Paroxysmal AFib'],
      activeMedications: ['Amiodarone 200mg', 'Apixaban 5mg BID', 'Atorvastatin 80mg'],
      emergencyContact: {
        name: 'Carol Sterling',
        relation: 'Daughter',
        phone: '+1 (555) 602-1193'
      },
      organDonorStatus: false,
      resuscitationDNR: false,
      qrCodeValue: 'https://novasentinel.health/passport/MRN-77145',
      prescriptions: [
        {
          id: 'rx-21',
          drugName: 'Apixaban (Eliquis)',
          dosage: '5mg',
          frequency: 'Twice Daily',
          prescribedHospital: 'University Heart Institute',
          prescribingDoctor: 'Dr. Emily Watson, MD',
          prescribedDate: '2026-08-19',
          status: 'Active',
          isDuplicateOrHazard: false,
          refillDueDays: 20,
          adherenceRate: 99,
          digitalSignature: 'SIG-VERIFIED-UHI-772189'
        }
      ],
      consentLogs: []
    },
    vitalsHistory: [
      { time: '04:00', heartRate: 76, spo2: 98, respiratoryRate: 16, temperature: 36.8, systolicBp: 124 },
      { time: '08:00', heartRate: 82, spo2: 97, respiratoryRate: 16, temperature: 37.1, systolicBp: 118 },
      { time: '12:00', heartRate: 94, spo2: 95, respiratoryRate: 18, temperature: 37.5, systolicBp: 114 },
      { time: '16:00', heartRate: 102, spo2: 94, respiratoryRate: 20, temperature: 38.0, systolicBp: 110 }
    ],
    clinicalNotes: []
  },
  {
    id: 'p091',
    mrn: 'MRN-66091',
    name: 'Elena Rostova',
    age: 42,
    gender: 'Female',
    bedLocation: 'Surgical Recovery (Bed 04)',
    admissionDate: '2026-08-23 08:00',
    primaryDiagnosis: 'Post-Laparoscopic Cholecystectomy (Recovery Stage)',
    attendingPhysician: 'Dr. James Thorne, MD (General Surgery)',
    vitals: {
      heartRate: 74,
      spo2: 98,
      respiratoryRate: 15,
      temperature: 36.8,
      systolicBp: 118,
      diastolicBp: 76,
      news2Score: 1,
      lastUpdated: '3 minutes ago'
    },
    riskAssessment: {
      overallRiskScore: 12,
      riskLevel: 'LOW',
      primaryRiskDiagnosis: 'Uncomplicated Post-Surgical Recovery',
      contributingFactors: [
        { feature: 'Hemodynamic Stability', currentValue: '118/76 mmHg', normalRange: '120/80 mmHg', impactPercentage: 10, direction: 'abnormal' }
      ],
      counterfactualPrediction: [
        { action: 'Continue routine post-op recovery protocol', projectedRiskScore: 8, projectedRiskLevel: 'LOW' }
      ]
    },
    emergencyPassport: {
      passportId: 'PASSPORT-ER-66091',
      abhaId: '91-1102-7749-6691',
      bloodGroup: 'O- (O Universal Donor)',
      criticalAllergies: ['None Reported'],
      chronicConditions: ['None'],
      activeMedications: ['Acetaminophen 1g PRN', 'Ibuprofen 400mg'],
      emergencyContact: {
        name: 'Mikhail Rostov',
        relation: 'Brother',
        phone: '+1 (555) 412-8820'
      },
      organDonorStatus: true,
      resuscitationDNR: false,
      qrCodeValue: 'https://novasentinel.health/passport/MRN-66091',
      prescriptions: [],
      consentLogs: []
    },
    vitalsHistory: [
      { time: '08:00', heartRate: 78, spo2: 99, respiratoryRate: 14, temperature: 36.6, systolicBp: 120 },
      { time: '12:00', heartRate: 76, spo2: 98, respiratoryRate: 15, temperature: 36.7, systolicBp: 116 },
      { time: '16:00', heartRate: 74, spo2: 98, respiratoryRate: 15, temperature: 36.8, systolicBp: 118 }
    ],
    clinicalNotes: []
  }
];

export const HOSPITAL_ALERTS: HospitalAlert[] = [
  {
    id: 'alt-001',
    patientId: 'p203',
    patientName: 'Robert Vance',
    bedLocation: 'ICU-Bed 03',
    timestamp: '2 mins ago',
    severity: 'CRITICAL',
    message: 'Acute Hypoxemic Desaturation: SpO2 dropped from 91% to 86% with concurrent Tachypnea (31 bpm).',
    triggerVital: 'SpO2 86% | RR 31',
    isAcknowledged: false,
    actionRequired: 'Initiate High-Flow Oxygen & Call Rapid Response Team (RRT)'
  },
  {
    id: 'alt-002',
    patientId: 'p182',
    patientName: 'Priya Patel',
    bedLocation: 'Oncology Ward 4B',
    timestamp: '8 mins ago',
    severity: 'HIGH',
    message: 'Febrile Neutropenia Threshold Exceeded: Temp 38.8°C with Sinus Tachycardia (116 bpm).',
    triggerVital: 'Temp 38.8°C | HR 116',
    isAcknowledged: true,
    actionRequired: 'Stat Blood Cultures & Administer Empiric Antipseudomonal'
  },
  {
    id: 'alt-003',
    patientId: 'p145',
    patientName: 'David Sterling',
    bedLocation: 'Cardiac Telemetry Bed 08',
    timestamp: '22 mins ago',
    severity: 'MODERATE',
    message: 'Ventricular Rate Escalation: HR reached 102 bpm post-CABG with low-grade pyrexia.',
    triggerVital: 'HR 102 bpm',
    isAcknowledged: true,
    actionRequired: 'Check Serum Potassium & Magnesium; prepare rate-control agent.'
  }
];
