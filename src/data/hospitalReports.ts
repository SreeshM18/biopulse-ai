import { MedicalReport, TeleconsultMeeting } from '../types/biotech';

export const INITIAL_MEDICAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-001',
    patientId: 'p203',
    patientName: 'Robert Vance',
    title: 'Stat Portable Chest X-Ray (AP View)',
    category: 'X-Ray Imaging',
    hospitalDepartment: 'Emergency Radiology',
    uploadedBy: 'Dr. Katherine Wu, MD (Radiology)',
    timestamp: '2026-08-23 15:30',
    findings: 'Bilateral diffuse interstitial and alveolar infiltrates with marked bibasilar consolidation. Blunting of left costophrenic angle. Cardiomegaly noted.',
    aiImpression: '🔴 AI Critical Alert: High probability of acute bacterial bronchopneumonia complicated by early ARDS (Confidence 96.4%). Recommend prompt arterial blood gas & culture correlation.',
    status: 'Critical Alert',
    previewImageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rep-002',
    patientId: 'p203',
    patientName: 'Robert Vance',
    title: 'High-Resolution Contrast CT Thorax / Angiogram',
    category: 'CT Scan',
    hospitalDepartment: 'Diagnostic Radiology',
    uploadedBy: 'Dr. Brian Miller, MD',
    timestamp: '2026-08-22 18:45',
    findings: 'No definitive evidence of acute proximal pulmonary arterial filling defects. Dense ground-glass opacities in lower lobes with air bronchograms.',
    aiImpression: '🟡 Abnormal: Negative for major pulmonary embolism. Severe lower lobe consolidated pneumonia verified.',
    status: 'Abnormal',
    previewImageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'rep-003',
    patientId: 'p203',
    patientName: 'Robert Vance',
    title: 'Sepsis Biomarker & Arterial Blood Gas (ABG) Panel',
    category: 'Lab Panel',
    hospitalDepartment: 'Central Pathology Laboratory',
    uploadedBy: 'Lab Director Dr. Jennifer Hayes',
    timestamp: '2026-08-23 16:00',
    findings: 'Serum Lactate: 4.2 mmol/L (High > 2.0). Procalcitonin: 8.9 ng/mL (Severe Bacterial Sepsis). Arterial pH: 7.28, PaO2: 54 mmHg on room air (Acute Hypoxemia).',
    aiImpression: '🔴 Critical: Severe systemic inflammatory response with uncompensated lactic acidosis. Immediate resuscitation bundle mandatory.',
    status: 'Critical Alert'
  },
  {
    id: 'rep-004',
    patientId: 'p182',
    patientName: 'Priya Patel',
    title: 'Complete Blood Count (CBC) with Differential',
    category: 'Lab Panel',
    hospitalDepartment: 'Hematology-Oncology Lab',
    uploadedBy: 'Dr. Marcus Vance, MD',
    timestamp: '2026-08-23 11:00',
    findings: 'Absolute Neutrophil Count (ANC): 380 /uL (Severe Neutropenia < 500). WBC: 1.2 x 10^3/uL. Platelets: 68 k/uL.',
    aiImpression: '🔴 Critical: Severe post-chemotherapy neutropenia with high pyrexia risk. Immediate isolation and empiric anti-pseudomonal coverage required.',
    status: 'Critical Alert'
  }
];

export const INITIAL_TELECONSULT_MEETINGS: TeleconsultMeeting[] = [
  {
    id: 'meet-001',
    patientId: 'p203',
    patientName: 'Robert Vance',
    doctorName: 'Dr. Sarah Lin, MD (Critical Care)',
    specialty: 'ICU / Pulmonary Medicine',
    scheduledDate: 'Today, Aug 23',
    timeSlot: '17:30 - 18:00 (Live Now)',
    meetingType: 'Emergency Clinical Round',
    status: 'Live Now',
    meetingRoomUrl: 'https://telemed.novasentinel.health/room/ICU-P203-EMERGENCY'
  },
  {
    id: 'meet-002',
    patientId: 'p182',
    patientName: 'Priya Patel',
    doctorName: 'Dr. Marcus Vance, MD',
    specialty: 'Medical Oncology',
    scheduledDate: 'Tomorrow, Aug 24',
    timeSlot: '09:00 - 09:30 AM',
    meetingType: 'Routine Specialist Review',
    status: 'Scheduled',
    meetingRoomUrl: 'https://telemed.novasentinel.health/room/ONC-P182'
  },
  {
    id: 'meet-003',
    patientId: 'p145',
    patientName: 'David Sterling',
    doctorName: 'Dr. Emily Watson, MD',
    specialty: 'Interventional Cardiology',
    scheduledDate: 'Tomorrow, Aug 24',
    timeSlot: '14:00 - 14:30 PM',
    meetingType: 'Family Update',
    status: 'Scheduled',
    meetingRoomUrl: 'https://telemed.novasentinel.health/room/CARD-P145'
  }
];
