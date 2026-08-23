export interface AmbulanceUnit {
  id: string;
  callSign: string;
  type: 'ALS (Advanced Life Support)' | 'Cardiac Intensive Care' | 'ICU Critical Care' | 'BLS (Basic Life Support)' | 'Neonatal Transport (NICU)' | 'Trauma Resuscitation';
  provider: string;
  currentLocation: string;
  distanceKm: number;
  etaMinutes: number;
  status: 'Available' | 'En Route' | 'At Scene' | 'Transporting to Hospital';
  paramedicLead: string;
  equipment: string[];
  contactNumber: string;
}

export interface EmergencyHospitalMatch {
  id: string;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  traumaLevel: 'Level 1 Trauma Center' | 'Comprehensive Stroke Center' | 'Cardiac STEMI Center' | 'Pediatric Specialty';
  emergencyBedsAvailable: number;
  icuBedsAvailable: number;
  otReadiness: 'Ready Now' | 'Ready in 15 mins' | 'Occupied';
  cathLabStatus: '2 Suites Open' | 'On Standby' | 'Full';
  strokeUnitStatus: 'tPA & Thrombectomy Ready' | 'Limited';
  bloodBankO2Units: number;
  matchScore: number;
  bestFitReason: string;
}

export interface BloodInventoryItem {
  bloodGroup: 'O-' | 'O+' | 'A-' | 'A+' | 'B-' | 'B+' | 'AB-' | 'AB+';
  prbcUnits: number; // Packed Red Blood Cells
  plateletUnits: number;
  plasmaUnits: number; // Fresh Frozen Plasma
  cryoUnits: number;
  status: 'Adequate' | 'Critical Shortage' | 'Low Reserve';
}

export interface OrganTransplantRecord {
  id: string;
  organ: 'Heart' | 'Lungs (Double)' | 'Liver' | 'Kidney (Left/Right)' | 'Cornea' | 'Pancreas';
  donorMatchId: string;
  bloodGroupMatch: string;
  ischemiaTimeRemainingHours: number;
  transplantCenter: string;
  recipientUrgencyStatus: 'Status 1A (Immediate Emergency)' | 'Status 1B' | 'Status 2';
  coordinatingSurgeon: string;
  transportMode: 'Emergency Air Ambulance (Helicopter)' | 'High-Speed Ground Escort';
  status: 'In Transit' | 'OT Prepared & Awaiting' | 'Cross-Match Verified';
}

export const AMBULANCE_FLEET: AmbulanceUnit[] = [
  {
    id: 'amb-01',
    callSign: 'Medic-12 (Cardiac ALS)',
    type: 'Cardiac Intensive Care',
    provider: 'Boston Metro Emergency Medical Services',
    currentLocation: 'Commonwealth Ave & Mass Ave (1.2 km away)',
    distanceKm: 1.2,
    etaMinutes: 4,
    status: 'Available',
    paramedicLead: 'Lead Paramedic Marcus Vance, CCEMT-P',
    equipment: ['Zoll X-Series 12-Lead ECG / Defibrillator', 'Lucas-3 Mechanical CPR', 'Video Laryngoscope (Difficult Airway)', 'IV Epinephrine & Heparin Protocol'],
    contactNumber: '+1 (617) 555-0911'
  },
  {
    id: 'amb-02',
    callSign: 'Rescue-04 (ICU Critical Care)',
    type: 'ICU Critical Care',
    provider: 'Sentinel Critical Care Transport',
    currentLocation: 'Beacon Street & Park Drive (2.4 km away)',
    distanceKm: 2.4,
    etaMinutes: 7,
    status: 'Available',
    paramedicLead: 'Flight Nurse Elena Rossi, RN, CFRN',
    equipment: ['Hamilton-T1 Transport Ventilator', 'Infusion Syringe Pumps x4', 'Point-of-Care Blood Gas (i-STAT)', 'Arterial Line Telemetry'],
    contactNumber: '+1 (617) 555-0912'
  },
  {
    id: 'amb-03',
    callSign: 'Trauma-08 (Level-1 Resuscitation)',
    type: 'Trauma Resuscitation',
    provider: 'City Trauma Emergency Fleet',
    currentLocation: 'Tremont St & Boylston (3.1 km away)',
    distanceKm: 3.1,
    etaMinutes: 9,
    status: 'Available',
    paramedicLead: 'Paramedic Tyler Cruz, NRP',
    equipment: ['Belmont Rapid Blood Infuser', 'Pelvic Binders & Tourniquets', 'Chest Tube Insertion Kit', 'Portable Ultrasound (POCUS)'],
    contactNumber: '+1 (617) 555-0913'
  },
  {
    id: 'amb-04',
    callSign: 'Neo-01 (NICU Transport)',
    type: 'Neonatal Transport (NICU)',
    provider: 'Children’s Neonatal Emergency Transport',
    currentLocation: 'Longwood Medical Area (1.8 km away)',
    distanceKm: 1.8,
    etaMinutes: 6,
    status: 'Available',
    paramedicLead: 'Neonatal Transport Specialist Dr. Julian Ross',
    equipment: ['Isolette Transport Incubator', 'Nitric Oxide Delivery System', 'High-Frequency Neonatal Ventilator', 'Micro-Volume Infusion Pumps'],
    contactNumber: '+1 (617) 555-0914'
  }
];

export const EMERGENCY_HOSPITAL_MATCHES: EmergencyHospitalMatch[] = [
  {
    id: 'hosp-01',
    name: 'Mass General Sentinel Academic Medical Center',
    distanceKm: 2.1,
    etaMinutes: 6,
    traumaLevel: 'Level 1 Trauma Center',
    emergencyBedsAvailable: 8,
    icuBedsAvailable: 3,
    otReadiness: 'Ready Now',
    cathLabStatus: '2 Suites Open',
    strokeUnitStatus: 'tPA & Thrombectomy Ready',
    bloodBankO2Units: 42,
    matchScore: 98,
    bestFitReason: 'Matches Cardiac STEMI, Severe Sepsis/ARDS, and Neuro Thrombectomy with 0 min OT standby'
  },
  {
    id: 'hosp-02',
    name: 'Sentinel Heart & Vascular Memorial Institute',
    distanceKm: 3.4,
    etaMinutes: 8,
    traumaLevel: 'Cardiac STEMI Center',
    emergencyBedsAvailable: 5,
    icuBedsAvailable: 2,
    otReadiness: 'Ready in 15 mins',
    cathLabStatus: '2 Suites Open',
    strokeUnitStatus: 'Limited',
    bloodBankO2Units: 28,
    matchScore: 92,
    bestFitReason: 'Direct primary angioplasty (PCI) pathway with on-duty interventional cardiologist'
  },
  {
    id: 'hosp-03',
    name: 'Metro Trauma & Emergency Surgical Center',
    distanceKm: 4.8,
    etaMinutes: 11,
    traumaLevel: 'Level 1 Trauma Center',
    emergencyBedsAvailable: 6,
    icuBedsAvailable: 4,
    otReadiness: 'Ready Now',
    cathLabStatus: 'On Standby',
    strokeUnitStatus: 'tPA & Thrombectomy Ready',
    bloodBankO2Units: 65,
    matchScore: 89,
    bestFitReason: 'Massive transfusion protocol & dedicated polytrauma operating suites'
  }
];

export const REGIONAL_BLOOD_INVENTORY: BloodInventoryItem[] = [
  { bloodGroup: 'O-', prbcUnits: 14, plateletUnits: 6, plasmaUnits: 18, cryoUnits: 8, status: 'Critical Shortage' },
  { bloodGroup: 'O+', prbcUnits: 42, plateletUnits: 16, plasmaUnits: 34, cryoUnits: 19, status: 'Adequate' },
  { bloodGroup: 'A-', prbcUnits: 18, plateletUnits: 8, plasmaUnits: 20, cryoUnits: 11, status: 'Low Reserve' },
  { bloodGroup: 'A+', prbcUnits: 56, plateletUnits: 22, plasmaUnits: 48, cryoUnits: 24, status: 'Adequate' },
  { bloodGroup: 'B-', prbcUnits: 12, plateletUnits: 5, plasmaUnits: 14, cryoUnits: 7, status: 'Critical Shortage' },
  { bloodGroup: 'B+', prbcUnits: 38, plateletUnits: 14, plasmaUnits: 30, cryoUnits: 15, status: 'Adequate' },
  { bloodGroup: 'AB-', prbcUnits: 8, plateletUnits: 4, plasmaUnits: 28, cryoUnits: 6, status: 'Critical Shortage' },
  { bloodGroup: 'AB+', prbcUnits: 24, plateletUnits: 10, plasmaUnits: 52, cryoUnits: 16, status: 'Adequate' }
];

export const ACTIVE_ORGAN_TRANSPLANTS: OrganTransplantRecord[] = [
  {
    id: 'tx-01',
    organ: 'Heart',
    donorMatchId: 'DONOR-MATCH-8849',
    bloodGroupMatch: 'O Negative',
    ischemiaTimeRemainingHours: 3.2,
    transplantCenter: 'Mass General Sentinel Heart Transplant Center',
    recipientUrgencyStatus: 'Status 1A (Immediate Emergency)',
    coordinatingSurgeon: 'Dr. Robert Mercer, MD (Cardiothoracic Surgery)',
    transportMode: 'Emergency Air Ambulance (Helicopter)',
    status: 'In Transit'
  },
  {
    id: 'tx-02',
    organ: 'Liver',
    donorMatchId: 'DONOR-MATCH-7731',
    bloodGroupMatch: 'A Negative',
    ischemiaTimeRemainingHours: 7.5,
    transplantCenter: 'Sentinel Multi-Organ Transplant Institute',
    recipientUrgencyStatus: 'Status 1A (Immediate Emergency)',
    coordinatingSurgeon: 'Dr. Sandra Bell, MD (Transplant Hepatology)',
    transportMode: 'High-Speed Ground Escort',
    status: 'OT Prepared & Awaiting'
  }
];
