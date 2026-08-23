export type UserPortalRole = 'patient' | 'emergency' | 'doctor' | 'hospital';

export type TabType = 
  | 'command_center' 
  | 'nova_pharma'
  | 'nova_anatomy_twin'
  | 'patient_monitor' 
  | 'organ_3d_twin'
  | 'nova_rescue'
  | 'medical_atlas'
  | 'whole_body'
  | 'medical_timeline'
  | 'nurse_emar'
  | 'appointments'
  | 'hospital_units'
  | 'specialists'
  | 'xai_risk' 
  | 'clinical_search'
  | 'emergency_qr' 
  | 'prescription_vault'
  | 'hospital_reports'
  | 'alerts' 
  | 'clinical_notes'
  | 'overview'
  | 'digitaltwin'
  | 'structure3d'
  | 'variant'
  | 'drugs'
  | 'trials'
  | 'sequence';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export interface DoctorProfile {
  id: string;
  name: string;
  department: string;
  specialty: string;
  qualification: string;
  experience: string;
  availability: 'Available Now' | 'In Surgery' | 'On ICU Rounds' | 'Available for Teleconsult';
  patientsAssigned: {
    patientId: string;
    patientName: string;
    bedLocation: string;
    acuity: RiskLevel;
    diagnosis: string;
  }[];
  licenseNumber: string;
  hospitalAffiliation: string;
  contactEmail: string;
  contactPhone: string;
  avatarUrl?: string;
}

export interface VitalsTelemetry {
  heartRate: number; // bpm
  spo2: number; // %
  respiratoryRate: number; // breaths/min
  temperature: number; // Celsius
  systolicBp: number;
  diastolicBp: number;
  news2Score: number; // National Early Warning Score 2 (0 - 20)
  ctDnaFraction?: number;
  lastUpdated: string;
}

export interface WholeBodyOrganTelemetry {
  brain: {
    gcsScore: number; // Glasgow Coma Scale (3-15)
    pupillaryReflex: string;
    intracranialStatus: string;
    neurologicalStatus: 'Alert & Oriented' | 'Lethargic / Confused' | 'Comatose';
  };
  heart: {
    rhythm: string;
    meanArterialPressure: number; // mmHg
    cardiacOutput: number; // L/min
    troponinLevel: string;
    status: 'Sinus Tachycardia' | 'Normal Sinus' | 'Arrhythmia';
  };
  lungs: {
    pao2Fio2Ratio: number; // PaO2/FiO2
    spo2: number;
    respiratoryRate: number;
    airwayResistance: string;
    status: 'Severe ARDS' | 'Moderate Hypoxemia' | 'Adequate Ventilation';
  };
  bloodRenal: {
    creatinine: number; // mg/dL
    eGFR: number; // mL/min/1.73m2
    lactate: number; // mmol/L
    hemoglobin: number; // g/dL
    platelets: number; // k/uL
    status: 'Lactic Acidosis / Sepsis' | 'Compensated' | 'Normal';
  };
  liverMetabolism: {
    coreTemp: number; // Celsius
    bloodGlucose: number; // mg/dL
    bilirubin: number; // mg/dL
    altAst: string;
    status: 'Hyperpyrexic Stress' | 'Stable';
  };
}

export interface MedicalReport {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  category: 'X-Ray Imaging' | 'CT Scan' | 'MRI Neuro' | 'Lab Panel' | 'Pathology / Biopsy';
  hospitalDepartment: string;
  uploadedBy: string;
  timestamp: string;
  findings: string;
  aiImpression: string;
  status: 'Critical Alert' | 'Abnormal' | 'Normal / Verified';
  previewImageUrl?: string;
}

export interface TeleconsultMeeting {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  specialty: string;
  scheduledDate: string;
  timeSlot: string;
  meetingType: 'Emergency Clinical Round' | 'Routine Specialist Review' | 'Family Update';
  status: 'Live Now' | 'Scheduled' | 'Completed';
  meetingRoomUrl: string;
}

export interface PatientDeteriorationRisk {
  overallRiskScore: number; // 0 - 100%
  riskLevel: RiskLevel;
  primaryRiskDiagnosis: string;
  contributingFactors: {
    feature: string;
    currentValue: string;
    normalRange: string;
    impactPercentage: number;
    direction: 'elevated' | 'depressed' | 'abnormal';
  }[];
  counterfactualPrediction: {
    action: string;
    projectedRiskScore: number;
    projectedRiskLevel: RiskLevel;
  }[];
}

export interface DifferentialDiagnosis {
  id: string;
  conditionName: string;
  icd10Code: string;
  matchScore: number; // %
  likelihoodTier: 'Primary Suspect (High)' | 'Differential Candidate' | 'Rule-Out Priority';
  keyEvidenceMatches: string[];
  goldStandardProtocol: string;
  recommendedLabWorkup: string[];
  redFlagContraindications: string;
}

export interface PrescriptionRecord {
  id: string;
  drugName: string;
  dosage: string;
  frequency: string;
  prescribedHospital: string;
  prescribingDoctor: string;
  prescribedDate: string;
  status: 'Active' | 'Completed' | 'Flagged Discontinued';
  isDuplicateOrHazard: boolean;
  safetyRiskAlert?: string;
  refillDueDays: number;
  adherenceRate: number; // %
  digitalSignature: string;
}

export interface ConsentLog {
  id: string;
  doctorName: string;
  hospitalName: string;
  accessTier: 'Emergency Minimal (QR)' | '1-Hour Full Clinical' | 'Permanent Family';
  grantedTimestamp: string;
  expiryTimestamp: string;
  status: 'Active' | 'Expired' | 'Revoked by Patient';
}

export interface EmergencyPassportData {
  passportId: string;
  abhaId?: string;
  bloodGroup: string;
  criticalAllergies: string[];
  chronicConditions: string[];
  activeMedications: string[];
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  organDonorStatus: boolean;
  resuscitationDNR: boolean;
  qrCodeValue: string;
  prescriptions: PrescriptionRecord[];
  consentLogs: ConsentLog[];
}

export interface PatientProfile {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bedLocation: string;
  admissionDate: string;
  primaryDiagnosis: string;
  attendingPhysician: string;
  vitals: VitalsTelemetry;
  wholeBodyTelemetry?: WholeBodyOrganTelemetry;
  riskAssessment: PatientDeteriorationRisk;
  emergencyPassport: EmergencyPassportData;
  vitalsHistory: {
    time: string;
    heartRate: number;
    spo2: number;
    respiratoryRate: number;
    temperature: number;
    systolicBp: number;
  }[];
  clinicalNotes: {
    timestamp: string;
    author: string;
    noteType: 'SOAP' | 'Nursing' | 'Physician';
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  }[];
}

export interface HospitalAlert {
  id: string;
  patientId: string;
  patientName: string;
  bedLocation: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  message: string;
  triggerVital: string;
  isAcknowledged: boolean;
  actionRequired: string;
}

/* Supplemental BioTech & In-Silico Types */
export interface WearableTelemetry {
  timestamp: string;
  heartRate: number;
  hrv: number;
  bodyTemp: number;
  spo2: number;
  systolicBp: number;
  diastolicBp: number;
  activitySteps: number;
  ctDnaFraction: number;
  status: 'Normal' | 'Warning' | 'Critical Alert';
  alertMessage?: string;
}

export interface DigitalTwinSimulationPoint {
  day: number;
  tumorVolumeMm3: number;
  toxicityScore: number;
  immuneActivity: number;
  treatmentResponse: number;
}

export interface ProteinStructure {
  id: string;
  gene: string;
  name: string;
  uniprotId: string;
  pdbId: string;
  description: string;
  length: number;
  cancerTypes: string[];
  organism: string;
  structureUrl: string;
  source: 'AlphaFold DB' | 'RCSB PDB';
  resolution?: string;
  defaultMutationResidue?: number;
  mutationHotspots: {
    residue: number;
    wildtype: string;
    mutant: string;
    name: string;
    clinicalImpact: 'High' | 'Moderate' | 'Pathogenic';
    frequency: string;
    description: string;
  }[];
  activePockets: {
    name: string;
    residues: number[];
    color: string;
    description: string;
  }[];
}

export interface GenomicVariant {
  gene: string;
  hgvsc: string;
  hgvsp: string;
  rsId: string;
  chromosome: string;
  position: number;
  ref: string;
  alt: string;
  clinvarSignificance: 'Pathogenic' | 'Likely Pathogenic' | 'VUS' | 'Likely Benign' | 'Benign';
  alphaMissenseScore: number;
  siftScore: number;
  polyphenScore: number;
  gnomadAf: number;
  cancerType: string;
  consequence: string;
  drugSensitivity: string[];
  drugResistance: string[];
  actionabilityLevel: 'Level 1 (FDA Approved)' | 'Level 2 (Standard of Care)' | 'Level 3A (Clinical Evidence)' | 'Level 4 (Biological Evidence)';
  summary: string;
}

export interface DrugTarget {
  id: string;
  name: string;
  brandName: string;
  targetGene: string;
  targetProtein: string;
  molecularWeight: number;
  smiles: string;
  formula: string;
  ic50: string;
  kd: string;
  bindingAffinityScore: number;
  fdaStatus: 'Approved' | 'Phase III' | 'Phase II' | 'Investigational';
  approvalYear?: number;
  indication: string;
  mechanism: string;
  resistantMutations: string[];
  effectiveMutations: string[];
  chemblId: string;
  pubchemCid: number;
  bioactivityData: {
    cellLine: string;
    ic50_nm: number;
    viabilityReduction: number;
  }[];
}

export interface ClinicalTrial {
  nctId: string;
  title: string;
  phase: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 1/2' | 'Early Phase 1';
  status: 'Recruiting' | 'Active, not recruiting' | 'Enrolling by invitation';
  cancerType: string;
  biomarkers: string[];
  leadSponsor: string;
  locations: string[];
  enrollment: number;
  primaryDrug: string;
  matchScore: number;
  eligibilityCriteria: string[];
  briefSummary: string;
  startDate: string;
}

export interface PatientCaseStudy {
  id: string;
  caseCode: string;
  patientAge: number;
  patientGender: 'Female' | 'Male';
  diagnosis: string;
  stage: string;
  primaryGene: string;
  primaryVariant: string;
  proteinResidue: number;
  tumorPurity: string;
  tmb: string;
  msiStatus: 'MSI-High' | 'MSS (Microsatellite Stable)';
  pdbId: string;
  recommendedDrugs: string[];
  contraindicatedDrugs: string[];
  matchedTrialIds: string[];
  rawSequenceSnippet: string;
  executiveSummary: string;
}

export interface SequenceAnalysisResult {
  length: number;
  gcContent: number;
  atContent: number;
  translatedAminoAcids: string;
  openReadingFrames: {
    start: number;
    end: number;
    length: number;
    frame: number;
    proteinSequence: string;
  }[];
  detectedMutations: {
    position: number;
    wildtypeCodon: string;
    mutantCodon: string;
    aminoAcidChange: string;
    significance: string;
  }[];
  qualityScoreAvg: number;
}

/* =========================================================================
   MASTER A–Z PHARMACY & DRUG UNIVERSE (NOVA PHARMA) DATA TYPES
   ========================================================================= */

export type PharmaDosageForm = 
  | 'Tablet' | 'Capsule' | 'Syrup' | 'Suspension' | 'Solution' | 'Drops' 
  | 'Injection (IV/IM/SC)' | 'Infusion' | 'Inhaler / MDI' | 'Nebulizer Solution' 
  | 'Nasal Spray' | 'Eye Drops' | 'Ear Drops' | 'Cream / Ointment' | 'Gel' 
  | 'Transdermal Patch' | 'Suppository' | 'Sublingual Tablet' | 'Vaccine' | 'Biologic / Monoclonal'
  | 'Auto-Injector' | 'Lozenges' | 'Powders' | 'Granules' | 'Sachets' | 'Pessaries' | 'Mouthwashes' | 'Foams' | 'Sprays' | 'Implants';

export type PharmaAdministrationRoute = 
  | 'Oral' | 'Intravenous (IV)' | 'Intramuscular (IM)' | 'Subcutaneous (SC)' 
  | 'Inhaled' | 'Nasal' | 'Ophthalmic' | 'Otic' | 'Topical' | 'Transdermal' 
  | 'Rectal' | 'Sublingual / Buccal';

export type PharmaLegalStatus = 
  | 'OTC (Over-The-Counter)' 
  | 'Prescription-Only (Rx)' 
  | 'OTC (Over-The-Counter) / Rx'
  | 'Controlled Substance (Schedule II/IV)' 
  | 'Hospital-Only Emergency' 
  | 'Investigational / Trial' 
  | 'Orphan Drug' 
  | 'Biologic / Biosimilar';

export type InteractionSeverityTier = 
  | 'MINOR' 
  | 'MODERATE' 
  | 'MAJOR' 
  | 'CONTRAINDICATED_CRITICAL';

export interface DrugInteractionItem {
  targetName: string;
  targetType: 'Drug' | 'Food' | 'Disease' | 'Lab' | 'Herbal';
  severity: InteractionSeverityTier;
  mechanism: string;
  clinicalAction: string;
}

export interface PharmacokineticsADME {
  absorption: string;
  bioavailability: string; // %
  distribution: string; // Vd
  proteinBinding: string; // %
  metabolism: string; // e.g. CYP3A4, CYP2C9
  excretion: string; // Renal %, Biliary %
  halfLife: string; // hours
  therapeuticWindow: string; // ug/mL or ng/mL
  narrowTherapeuticIndex: boolean;
}

export interface MolecularStructure3D {
  atoms: { element: string; x: number; y: number; z: number; color: string }[];
  bonds: [number, number][];
}

export interface MasterDrugRecord {
  id: string;
  genericName: string;
  brandNames: string[];
  alphabetLetter: string; // A to Z
  drugClass: string;
  therapeuticCategory: string;
  chemicalName: string;
  molecularFormula: string;
  molecularWeight: number; // g/mol
  smilesNotation: string;
  mechanismOfAction: string;
  
  dosageForms: PharmaDosageForm[];
  routes: PharmaAdministrationRoute[];
  availableStrengths: string[];

  indications: string[];
  absoluteContraindications: string[];
  relativeContraindications: string[];
  blackBoxWarnings?: string;
  
  sideEffectsCommon: string[];
  sideEffectsSerious: string[];
  adverseReactionRisk: string;

  interactions: DrugInteractionItem[];
  adme: PharmacokineticsADME;

  pregnancyCategory: 'A' | 'B' | 'C' | 'D' | 'X';
  lactationSafety: string;
  pediatricDosingRule: string; // mg/kg
  geriatricBeersWarning?: string;
  renalAdjustmentGFR: string;
  hepaticAdjustment: string;

  legalStatus: PharmaLegalStatus;
  isHighAlert: boolean;
  isColdChain: boolean;
  storageRequirement: string; // e.g. 2°C - 8°C or 15°C - 25°C
  
  inventoryStock: number; // units available
  batchNumber: string;
  expiryDate: string;
  isRecallOrAlert: boolean;
  recallStatusText?: string;
  barcodeGS1: string;

  atoms3D?: MolecularStructure3D;
}

export interface PoisoningAntidoteRecord {
  id: string;
  toxinName: string;
  exposureCategory: 'Medication Overdose' | 'Pesticide / Organophosphate' | 'Heavy Metal' | 'Toxic Gas / Chemical' | 'Biological Venom';
  ghsHazardSymbol: 'Toxic ☠️' | 'Corrosive 🧪' | 'Flammable 🔥' | 'Biohazard ☣️' | 'Irritant ⚠️';
  clinicalSymptoms: string[];
  primaryAntidote: string;
  antidoteDoseProtocol: string;
  mechanismOfNeutralization: string;
  hospitalUnitRequired: string;
  poisonControlCode: string;
}

export interface BatchVerificationReport {
  barcodeScanned: string;
  ndcOrBatch: string;
  drugName: string;
  manufacturer: string;
  manufactureDate: string;
  expiryDate: string;
  tamperSealVerified: boolean;
  blockchainHash: string;
  status: 'AUTHENTIC_VERIFIED' | 'RECALLED_BATCH' | 'COUNTERFEIT_DETECTED' | 'EXPIRED_LOT';
  safetyNotice: string;
}

export interface ADRSubmissionRecord {
  id: string;
  patientId: string;
  patientName: string;
  suspectedDrug: string;
  adverseEvent: string;
  severityGrade: 'Mild (Grade 1)' | 'Moderate (Grade 2)' | 'Severe (Grade 3)' | 'Life-Threatening (Grade 4)';
  onsetTime: string;
  outcome: 'Recovering' | 'Resolved' | 'Persistent' | 'Required Hospitalization';
  reportedBy: string;
  dateReported: string;
  pharmacovigilanceStatus: 'Under Signal Review' | 'Submitted to FDA MedWatch / WHO Vigibase';
}

export interface ColdChainLog {
  unitId: string;
  storageUnitName: string;
  targetTempRange: string; // e.g. 2.0°C - 8.0°C
  currentTemp: number; // Celsius
  status: 'OPTIMAL' | 'WARNING_HIGH' | 'CRITICAL_BREACH';
  timestamp: string;
  activeVaccinesStored: string[];
  backupGeneratorActive: boolean;
}

