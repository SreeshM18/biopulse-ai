export interface TimelineEvent {
  id: string;
  time: string;
  category: 'Vitals' | 'Consultation' | 'Lab Order' | 'Lab Result' | 'Imaging' | 'AI Risk' | 'Alert' | 'Prescription';
  title: string;
  description: string;
  authorOrSystem: string;
  severity?: 'NORMAL' | 'WARNING' | 'CRITICAL';
  iconType: string;
}

export const PATIENT_CHRONOLOGICAL_TIMELINES: Record<string, TimelineEvent[]> = {
  'p-01': [
    {
      id: 't-01',
      time: '08:30 AM',
      category: 'Vitals',
      title: 'Continuous Telemetry Vitals Recorded',
      description: 'Baseline vital signs captured: HR 128 bpm, SpO2 86%, RR 31 bpm, Temp 39.2°C, BP 88/54 mmHg.',
      authorOrSystem: 'Bedside Hamilton C6 Telemetry Grid',
      severity: 'CRITICAL',
      iconType: 'Activity'
    },
    {
      id: 't-02',
      time: '09:10 AM',
      category: 'Consultation',
      title: 'Attending Physician SOAP Consultation',
      description: 'Dr. Sarah Lin examined patient in MICU. Severe dyspnea, bilateral crackles, lactic acidosis identified.',
      authorOrSystem: 'Dr. Sarah Lin, MD (Chief Intensivist)',
      severity: 'WARNING',
      iconType: 'Stethoscope'
    },
    {
      id: 't-03',
      time: '09:30 AM',
      category: 'Lab Order',
      title: 'Stat Arterial Blood Gas (ABG) & Blood Cultures Ordered',
      description: 'Ordered urgent ABG, CBC with Diff, Serum Lactate, and Blood Cultures x2 before antibiotic escalation.',
      authorOrSystem: 'Dr. Sarah Lin, MD',
      severity: 'NORMAL',
      iconType: 'FlaskConical'
    },
    {
      id: 't-04',
      time: '10:15 AM',
      category: 'Imaging',
      title: 'Portable AP Chest X-Ray Completed',
      description: 'Bilateral diffuse infiltrates consistent with Acute Respiratory Distress Syndrome (ARDS). AI Match: 94.8%.',
      authorOrSystem: 'Dr. Katherine Wu, MD (Radiology PACS)',
      severity: 'CRITICAL',
      iconType: 'Image'
    },
    {
      id: 't-05',
      time: '11:20 AM',
      category: 'Lab Result',
      title: 'Stat ABG & Lactate Results Uploaded',
      description: 'pH 7.28 (Acidemic), PaO2 58 mmHg, PaO2/FiO2 168 (Severe ARDS), Serum Lactate 4.2 mmol/L (Severe Sepsis).',
      authorOrSystem: 'Central Clinical Laboratory (Dr. Leonard McCoy)',
      severity: 'CRITICAL',
      iconType: 'FlaskConical'
    },
    {
      id: 't-06',
      time: '12:00 PM',
      category: 'AI Risk',
      title: 'AI TreeSHAP Risk Score Escalation: HIGH → CRITICAL (91%)',
      description: 'TreeSHAP identified SpO2 drop (+35%), Respiratory Rate (+26%), and Lactate (+21%) as primary drivers.',
      authorOrSystem: 'BioPulse AI Deterioration Engine',
      severity: 'CRITICAL',
      iconType: 'Brain'
    },
    {
      id: 't-07',
      time: '12:05 PM',
      category: 'Alert',
      title: 'Code Sepsis / ICU Rapid Response Broadcast',
      description: 'Attending Intensivist, charge nurse, and respiratory therapist alerted via push pager.',
      authorOrSystem: 'Hospital Broadcast Network',
      severity: 'CRITICAL',
      iconType: 'AlertTriangle'
    },
    {
      id: 't-08',
      time: '12:15 PM',
      category: 'Prescription',
      title: 'Initiate Meropenem IV + Norepinephrine Infusion',
      description: 'IV Meropenem 1g IV q8h started + Norepinephrine titrated to maintain MAP > 65 mmHg.',
      authorOrSystem: 'Dr. Sarah Lin, MD (Digitally Signed)',
      severity: 'WARNING',
      iconType: 'Pill'
    }
  ]
};
