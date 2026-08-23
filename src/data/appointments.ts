export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Checked In' | 'Completed' | 'Cancelled' | 'No Show';
  room: string;
  isTeleconsult: boolean;
}

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-01',
    patientId: 'p-01',
    patientName: 'Robert Vance',
    doctorName: 'Dr. Sarah Lin, MD',
    department: 'Critical Care / Pulmonology',
    date: 'Today',
    time: '18:30 PM',
    reason: 'ICU Tele-Round & ARDS Ventilator Weaning Review',
    status: 'Scheduled',
    room: 'MICU Bed-03 / WebRTC Telemed',
    isTeleconsult: true
  },
  {
    id: 'apt-02',
    patientId: 'p-02',
    patientName: 'Elena Rostova',
    doctorName: 'Dr. Emily Watson, MD',
    department: 'Cardiology',
    date: 'Tomorrow',
    time: '10:00 AM',
    reason: 'Follow-Up 12-Lead Holter & AFib Rate Control Review',
    status: 'Scheduled',
    room: 'Cardiology Suite 402',
    isTeleconsult: false
  },
  {
    id: 'apt-03',
    patientId: 'p-03',
    patientName: 'Marcus Thorne',
    doctorName: 'Dr. Marcus Vance, MD',
    department: 'Oncology',
    date: 'Today',
    time: '14:00 PM',
    reason: 'Febrile Neutropenia ANC Recovery & Cycle 3 Chemotherapy Review',
    status: 'Checked In',
    room: 'Oncology Day Care Bay 5',
    isTeleconsult: false
  },
  {
    id: 'apt-04',
    patientId: 'p-04',
    patientName: 'David Sterling',
    doctorName: 'Dr. Robert Mercer, MD',
    department: 'Cardiothoracic Surgery',
    date: 'Yesterday',
    time: '16:00 PM',
    reason: 'Post-CABG Sternal Wound Inspection & Drain Removal',
    status: 'Completed',
    room: 'SICU Ward 2B',
    isTeleconsult: false
  }
];
