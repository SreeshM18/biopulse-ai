import { DoctorProfile } from '../types/biotech';

export const MASTER_DOCTOR_ROSTER: DoctorProfile[] = [
  {
    id: 'doc-01',
    name: 'Dr. Sarah Lin, MD, FCCM',
    department: 'Critical Care Medicine',
    specialty: 'Intensive Care (Intensivist) & Sepsis Resuscitation',
    qualification: 'MD (Harvard), Fellowship in Critical Care (Mass General), FCCM',
    experience: '14 Years Clinical Practice (Chief Intensivist)',
    availability: 'Available Now',
    licenseNumber: 'MD-MA-884920-CC',
    hospitalAffiliation: 'Mass General Brigham / Sentinel Health',
    contactEmail: 's.lin@sentinel.health',
    contactPhone: '+1 (617) 555-0192',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    patientsAssigned: [
      { patientId: 'p-01', patientName: 'Robert Vance', bedLocation: 'ICU-Bed-03', acuity: 'CRITICAL', diagnosis: 'Severe Septic Shock & Hypoxemic ARDS' },
      { patientId: 'p-04', patientName: 'David Sterling', bedLocation: 'ICU-Bed-07', acuity: 'HIGH', diagnosis: 'Post-CABG Hypoperfusion & Oliguria' }
    ]
  },
  {
    id: 'doc-02',
    name: 'Dr. Emily Watson, MD, FACC',
    department: 'Cardiology',
    specialty: 'Interventional Cardiology & Electrophysiology (EP)',
    qualification: 'MD (Johns Hopkins), Fellowship in Interventional Cardiology (Cleveland Clinic), FACC',
    experience: '18 Years Clinical Practice (Director of Cath Lab)',
    availability: 'In Surgery',
    licenseNumber: 'MD-MA-773194-CARD',
    hospitalAffiliation: 'Sentinel Heart & Vascular Institute',
    contactEmail: 'e.watson@sentinel.health',
    contactPhone: '+1 (617) 555-0144',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813580-571434316d2b?auto=format&fit=crop&w=400&q=80',
    patientsAssigned: [
      { patientId: 'p-02', patientName: 'Elena Rostova', bedLocation: 'CCU-Bed-02', acuity: 'HIGH', diagnosis: 'Atrial Fibrillation with Rapid Ventricular Response (RVR)' },
      { patientId: 'p-04', patientName: 'David Sterling', bedLocation: 'ICU-Bed-07', acuity: 'HIGH', diagnosis: 'Post-CABG Hemodynamic Instability' }
    ]
  },
  {
    id: 'doc-03',
    name: 'Dr. Marcus Vance, MD, FASCO',
    department: 'Oncology',
    specialty: 'Medical Oncology & Molecular Precision Therapeutics',
    qualification: 'MD (Stanford), Fellowship in Medical Oncology (MD Anderson), FASCO',
    experience: '16 Years Clinical Practice (Chair of Precision Oncology)',
    availability: 'Available for Teleconsult',
    licenseNumber: 'MD-CA-993201-ONC',
    hospitalAffiliation: 'Sentinel Cancer Institute',
    contactEmail: 'm.vance@sentinel.health',
    contactPhone: '+1 (650) 555-0188',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    patientsAssigned: [
      { patientId: 'p-03', patientName: 'Marcus Thorne', bedLocation: 'Ward-4B-12', acuity: 'HIGH', diagnosis: 'Chemotherapy-Induced Febrile Neutropenia' }
    ]
  },
  {
    id: 'doc-04',
    name: 'Dr. Gregory House, MD, FCCP',
    department: 'Pulmonology & Respiratory Medicine',
    specialty: 'Advanced Pulmonology & Mechanical Ventilation',
    qualification: 'MD (Columbia University), FCCP',
    experience: '22 Years Senior Consultant',
    availability: 'On ICU Rounds',
    licenseNumber: 'MD-NY-448102-PULM',
    hospitalAffiliation: 'Sentinel Thoracic Center',
    contactEmail: 'g.house@sentinel.health',
    contactPhone: '+1 (212) 555-0177',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    patientsAssigned: [
      { patientId: 'p-01', patientName: 'Robert Vance', bedLocation: 'ICU-Bed-03', acuity: 'CRITICAL', diagnosis: 'Severe Septic Shock & Hypoxemic ARDS' }
    ]
  },
  {
    id: 'doc-05',
    name: 'Dr. Christopher Ray, MD, FAAN',
    department: 'Neurology',
    specialty: 'Stroke Neurology & Neurocritical Care',
    qualification: 'MD (UCSF), Fellowship in Vascular Neurology (Mass General), FAAN',
    experience: '12 Years Attending Neurologist',
    availability: 'Available Now',
    licenseNumber: 'MD-CA-661902-NEUR',
    hospitalAffiliation: 'Sentinel Brain & Stroke Center',
    contactEmail: 'c.ray@sentinel.health',
    contactPhone: '+1 (415) 555-0123',
    avatarUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
    patientsAssigned: [
      { patientId: 'p-01', patientName: 'Robert Vance', bedLocation: 'ICU-Bed-03', acuity: 'CRITICAL', diagnosis: 'Metabolic Encephalopathy' }
    ]
  },
  {
    id: 'doc-06',
    name: 'Dr. Vikram Sethi, MD, FASN',
    department: 'Nephrology',
    specialty: 'Acute Kidney Injury (AKI) & Continuous Renal Replacement (CRRT)',
    qualification: 'MD, DM (Nephrology), FASN',
    experience: '15 Years Senior Consultant Nephrologist',
    availability: 'Available Now',
    licenseNumber: 'MD-IL-552910-NEPH',
    hospitalAffiliation: 'Sentinel Renal Care Institute',
    contactEmail: 'v.sethi@sentinel.health',
    contactPhone: '+1 (312) 555-0149',
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    patientsAssigned: [
      { patientId: 'p-01', patientName: 'Robert Vance', bedLocation: 'ICU-Bed-03', acuity: 'CRITICAL', diagnosis: 'Acute Tubular Necrosis & Acidosis' }
    ]
  }
];
