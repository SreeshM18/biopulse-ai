export interface MedicationAdministrationRecord {
  id: string;
  patientId: string;
  patientName: string;
  bedLocation: string;
  drugName: string;
  dosage: string;
  route: 'Oral' | 'IV Infusion' | 'Subcutaneous' | 'Inhaled' | 'Intramuscular';
  scheduledTime: string;
  administeredTime?: string;
  givenBy?: string;
  status: 'Pending' | 'Given' | 'Missed' | 'Delayed';
  notes?: string;
  barcodeVerified: boolean;
}

export const INITIAL_EMAR_RECORDS: MedicationAdministrationRecord[] = [
  {
    id: 'emar-01',
    patientId: 'p-01',
    patientName: 'Robert Vance',
    bedLocation: 'ICU-Bed-03',
    drugName: 'Meropenem',
    dosage: '1.0 g in 100mL NS',
    route: 'IV Infusion',
    scheduledTime: '08:00 AM',
    administeredTime: '08:05 AM',
    givenBy: 'Nurse Sarah Connor, RN',
    status: 'Given',
    notes: 'Infused over 30 mins via central line. No hypersensitivity observed.',
    barcodeVerified: true
  },
  {
    id: 'emar-02',
    patientId: 'p-01',
    patientName: 'Robert Vance',
    bedLocation: 'ICU-Bed-03',
    drugName: 'Norepinephrine Bitartrate',
    dosage: '8 mcg/min Continuous',
    route: 'IV Infusion',
    scheduledTime: 'Continuous (Titrate)',
    administeredTime: '09:15 AM',
    givenBy: 'Nurse Sarah Connor, RN',
    status: 'Given',
    notes: 'Titrating to maintain MAP > 65 mmHg. Current MAP 65 mmHg.',
    barcodeVerified: true
  },
  {
    id: 'emar-03',
    patientId: 'p-01',
    patientName: 'Robert Vance',
    bedLocation: 'ICU-Bed-03',
    drugName: 'DuoNeb (Albuterol / Ipratropium)',
    dosage: '3.0 mg / 0.5 mg Nebulized',
    route: 'Inhaled',
    scheduledTime: '12:00 PM',
    status: 'Pending',
    notes: 'Scheduled for respiratory therapy delivery after chest physiotherapy.',
    barcodeVerified: false
  },
  {
    id: 'emar-04',
    patientId: 'p-01',
    patientName: 'Robert Vance',
    bedLocation: 'ICU-Bed-03',
    drugName: 'Enoxaparin (Lovenox)',
    dosage: '40 mg',
    route: 'Subcutaneous',
    scheduledTime: '06:00 PM',
    status: 'Pending',
    notes: 'DVT prophylaxis. Recheck platelet count prior to injection.',
    barcodeVerified: false
  },
  {
    id: 'emar-05',
    patientId: 'p-02',
    patientName: 'Elena Rostova',
    bedLocation: 'CCU-Bed-02',
    drugName: 'Diltiazem (Cardizem) IV Drip',
    dosage: '10 mg/hr Continuous',
    route: 'IV Infusion',
    scheduledTime: 'Continuous',
    administeredTime: '07:30 AM',
    givenBy: 'Nurse Rachel Green, RN',
    status: 'Given',
    notes: 'Ventricular rate controlled down from 144 to 98 bpm.',
    barcodeVerified: true
  },
  {
    id: 'emar-06',
    patientId: 'p-03',
    patientName: 'Marcus Thorne',
    bedLocation: 'Ward-4B-12',
    drugName: 'Cefepime IV',
    dosage: '2.0 g IV q8h',
    route: 'IV Infusion',
    scheduledTime: '09:00 AM',
    administeredTime: '09:40 AM',
    givenBy: 'Nurse Priya Sharma, RN',
    status: 'Delayed',
    notes: 'Delayed 40 mins due to peripheral line recannulation.',
    barcodeVerified: true
  }
];
