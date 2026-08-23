export type UserPortalRole = 'patient' | 'emergency' | 'doctor' | 'hospital';

export interface AuthenticatedUser {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserPortalRole;
  licenseNumber?: string;
  department?: string;
  hospitalAffiliation?: string;
}

export type TabType = 
  | 'command_center' 
  | 'nova_pharma'
  | 'nova_careguide'
  | 'nova_anatomy_twin'
  | 'user_profile'
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

export type SubstanceUniverseCategory =
  | 'OTC'
  | 'Prescription'
  | 'Specialist prescription'
  | 'Hospital-only'
  | 'Emergency medicines'
  | 'High-alert medicines'
  | 'Controlled medicines'
  | 'Reproductive medicines'
  | 'Sexual-health medicines'
  | 'Investigational'
  | 'Withdrawn'
  | 'Unapproved'
  | 'Counterfeit'
  | 'Illicit recreational drugs'
  | 'Performance-enhancing substances'
  | 'Toxic chemicals'
  | 'Veterinary medicines'
  | 'Herbal/traditional products'
  | 'Supplements'
  | 'Vaccine'
  | 'Biologic'
  | 'Biologics & Gene Therapies';

export type VisualSafetyRiskTier =
  | 'ROUTINE'           // 🟢 Routine
  | 'PRESCRIPTION'      // 🔵 Prescription
  | 'CAUTION'           // 🟡 Caution
  | 'HIGH_ALERT'        // 🟠 High Alert
  | 'CONTROLLED_RISK'   // 🔴 Controlled / Serious Risk
  | 'SPECIALIST_HOSPITAL' // 🟣 Specialist / Hospital Only
  | 'ILLICIT_TOXICOLOGY'; // ⚫ Illicit / Toxicology Record

/* =========================================================================
   12 NOVA PHARMA LEGAL & SAFETY STATUS TIERS
   ========================================================================= */

export type NovaSubstanceLegalStatus =
  | 'OTC'                  // 🟢 OTC: Non-prescription medicine where permitted
  | 'Prescription'         // 🔵 Prescription: Requires authorized prescription
  | 'Pharmacist-only'      // 🟡 Pharmacist/Specialist: Additional professional supervision
  | 'High-alert'           // 🟠 High Alert: Legal but serious harm possible if misused
  | 'Controlled'           // 🔴 Controlled: Legally restricted because of abuse/dependence risk
  | 'Hospital-only'        // 🟣 Hospital Only: Used primarily in clinical/hospital settings
  | 'Biologic'             // 🧬 Biologic: Vaccines, antibodies, proteins, cell/gene therapies
  | 'Investigational'      // 🧪 Investigational: Clinical-trial medicine
  | 'Illicit'              // ⚫ Illicit: Substance not legally supplied for ordinary medical use
  | 'Banned / Withdrawn'   // 🚫 Banned/Withdrawn: Removed/restricted by regulators
  | 'Counterfeit / Falsified' // ⚠️ Counterfeit: Fake/adulterated pharmaceutical
  | 'Toxic Chemical';      // ☠️ Toxic Chemical: Poison/toxicology/forensic substance

/* =========================================================================
   PHARMACEUTICAL DOSAGE SUBTYPES & RELEASE KINETICS
   ========================================================================= */

export type TabletSubtype =
  | 'Conventional Compressed'
  | 'Uncoated'
  | 'Film Coated'
  | 'Sugar Coated'
  | 'Enteric Coated'
  | 'Chewable'
  | 'Dispersible'
  | 'Soluble'
  | 'Effervescent'
  | 'Orodispersible (ODT)'
  | 'Sublingual'
  | 'Buccal'
  | 'Scored'
  | 'Bilayer'
  | 'Multilayer'
  | 'Matrix Tablet'
  | 'Tablet-in-Tablet'
  | 'Mini-Tablet';

export type CapsuleSubtype =
  | 'Hard Gelatin Capsule'
  | 'Softgel'
  | 'Vegetarian / HPMC Capsule'
  | 'Immediate Release Capsule'
  | 'Delayed Release Capsule'
  | 'Enteric-Coated Pellets in Capsule'
  | 'Extended Release Capsule'
  | 'Sprinkle Capsule'
  | 'Liquid-Filled Capsule';

export type ReleaseKineticsType =
  | 'Immediate Release (IR)'
  | 'Delayed Release (DR)'
  | 'Extended Release (ER/XR)'
  | 'Sustained Release (SR)'
  | 'Controlled Release (CR)'
  | 'Modified Release (MR)'
  | 'Prolonged Release (PR)';

export type UniversalStrengthUnit =
  | 'ng'
  | 'mcg'
  | 'mg'
  | 'g'
  | 'mg/mL'
  | 'mg/5 mL'
  | 'mcg/mL'
  | 'mcg/dose'
  | 'mcg/actuation'
  | 'mcg/hr'
  | 'mg/24hr'
  | 'IU'
  | 'units'
  | 'units/mL'
  | 'mEq'
  | 'mmol'
  | '%'
  | 'mg/cm²'
  | 'mg/100 mL'
  | 'dose/actuation';

export type SpecificInjectionRoute =
  | 'Intravenous (IV)'
  | 'Intramuscular (IM)'
  | 'Subcutaneous (SC)'
  | 'Intradermal (ID)'
  | 'Intra-articular'
  | 'Intrathecal'
  | 'Epidural'
  | 'Intraosseous'
  | 'Intravitreal'
  | 'Intralesional';

export type VaccineTechnologyType =
  | 'Live Attenuated'
  | 'Inactivated'
  | 'Subunit'
  | 'Recombinant Protein'
  | 'Polysaccharide'
  | 'Conjugate'
  | 'Viral Vector'
  | 'mRNA'
  | 'Toxoid';

export interface CountryLegalClassification {
  countryCode: string; // 'US' | 'IN' | 'UK' | 'EU' | 'CA' | 'AU'
  countryName: string;
  status: NovaSubstanceLegalStatus;
  scheduleDesignation?: string; // e.g. "Schedule II (US)", "Schedule H (India)", "Class B (UK)"
  prescriptionRequired: boolean;
}

export interface UniversalSubstanceRecord {
  id: string;
  genericName: string;
  brandNames: string[];
  aliases: string[];
  activeIngredients: string[];
  casNumber?: string;
  atcCode?: string;
  therapeuticClass: string;
  pharmacologicClass: string;
  primaryLegalStatus: NovaSubstanceLegalStatus;
  controlledSchedule?: string;
  isHighAlert: boolean;
  isHospitalOnly: boolean;
  countryLegalClassifications: CountryLegalClassification[];
  dosageForm: PharmaDosageForm;
  dosageSubtype?: TabletSubtype | CapsuleSubtype | string;
  releaseType: ReleaseKineticsType;
  primaryRoute: PharmaAdministrationRoute;
  allAvailableRoutes: PharmaAdministrationRoute[];
  strengthValue: number | string;
  strengthUnit: UniversalStrengthUnit;
  concentrationDisplay?: string; // e.g. "100 mg / 5 mL", "100 mcg / actuation"
  deliveryRateDisplay?: string; // e.g. "25 mcg/hr transdermal"
  approvedUses: string[];
  medicalSpecialties: string[];
  mechanismOfAction: string;
  clinicalBenefits: string[];
  clinicalLimitations: string[];
  commonSideEffects: string[];
  seriousAdverseEffects: string[];
  contraindications: string[];
  allergyInformation: string;
  drugInteractionsSummary: string;
  alcoholInteractionSummary: string;
  foodInteractions: string[];
  diseaseInteractions: string[];
  pregnancySafetyGuidance: string;
  breastfeedingGuidance: string;
  pediatricGuidance: string;
  geriatricBeersGuidance: string;
  renalAdjustment: string;
  hepaticAdjustment: string;
  cardiacConsiderations: string;
  diabetesConsiderations: string;
  admeAbsorption: string;
  admeDistribution: string;
  admeMetabolism: string;
  admeExcretion: string;
  admeHalfLife: string;
  primaryManufacturers: string[];
  storageAndColdChain: string;
  recallStatus?: string;
  chemicalFormula?: string;
  molecularWeight?: number;
  toxicityClass?: string;
  abusePotential?: 'None / Negligible' | 'Low (Schedule IV/V)' | 'Moderate (Schedule III)' | 'High (Schedule II)' | 'Extreme / Severe (Schedule I/Illicit)';
  dependenceRisk?: string;
  forensicRelevance?: string;
  overdoseWarningSigns?: string[];
  specificAntidote?: string;
}

export interface ForensicToxRecord {
  id: string;
  substanceName: string;
  streetAliases: string[];
  substanceCategory: 
    | 'Illicit Opioid' 
    | 'Illicit Stimulant' 
    | 'Hallucinogen' 
    | 'Dissociative' 
    | 'Synthetic Cannabinoid' 
    | 'Illicit Sedative / Depressant' 
    | 'Novel Psychoactive Substance (NPS)' 
    | 'Inhalant' 
    | 'Illicit PED / Anabolic' 
    | 'Diverted Prescription Drug' 
    | 'Toxic Chemical / Industrial Poison' 
    | 'Biological Toxin / Venom';
  chemicalClass: string;
  legalClassification: '⚫ Illicit (Schedule I / Prohibited)' | '🔴 Diverted Controlled' | '☠️ Toxic Poison';
  medicalUseIfAny: string;
  primaryMechanism: string;
  toxicityProfile: string;
  dependenceRiskScore: number; // 0 - 100
  majorHealthEffects: string[];
  overdoseWarningSigns: string[];
  forensicDetectionMarkers: string[]; // e.g. "Benzoylecgonine in urine", "6-MAM"
  reversalAntidoteProtocol: string; // e.g. "Naloxone 0.4 - 2mg IV/Intranasal repeat Q2-3min"
  ghsHazardClass: string;
}

export interface CounterfeitIntelligenceRecord {
  id: string;
  suspectedBrandName: string;
  falsifiedProductType: 'Fake Brand' | 'Wrong Active Ingredient' | 'Wrong Strength / Subpotent' | 'Undeclared Adulterant in Supplement' | 'Contaminated Batch' | 'Counterfeit Packaging' | 'Relabelled Expiry' | 'Official Regulatory Recall';
  claimedIngredientOnBox: string;
  actualLabDetectedContent: string;
  reportedLotBatch: string;
  originatingJurisdiction: string;
  discoveryDate: string;
  dangerLevel: 'CRITICAL_LETHAL' | 'HIGH_TOXIC' | 'SUBPOTENT_INEFFECTIVE';
  clinicalHazardDescription: string;
  regulatoryAgencyAlert: string; // e.g. "WHO Medical Product Alert No. 4/2024", "FDA Warning Letter"
  visualAuthenticationTelltales: string[];
}

export type PharmaDosageForm = 
  | 'Tablets' | 'Tablet' 
  | 'Capsules' | 'Capsule' 
  | 'Syrups' | 'Syrup' 
  | 'Suspensions' | 'Suspension' 
  | 'Oral solutions' | 'Solution' 
  | 'Drops' 
  | 'Injections' | 'Injection' | 'Injection (IV/IM/SC)' 
  | 'Infusions' | 'Infusion' 
  | 'Inhalers' | 'Inhaler / MDI' 
  | 'Nebulizer solutions' | 'Nebulizer Solution' 
  | 'Nasal sprays' | 'Nasal Spray' 
  | 'Eye drops' | 'Eye Drops' 
  | 'Ear drops' | 'Ear Drops' 
  | 'Creams' | 'Cream' 
  | 'Ointments' | 'Ointment' | 'Cream / Ointment' 
  | 'Gels' | 'Gel' 
  | 'Lotions' | 'Lotion' 
  | 'Powders' | 'Granules' | 'Sachets' 
  | 'Suppositories' | 'Suppository' 
  | 'Pessaries' 
  | 'Transdermal patches' | 'Transdermal Patch' 
  | 'Lozenges' 
  | 'Mouthwashes' 
  | 'Foams' 
  | 'Sprays' 
  | 'Implants' 
  | 'Vaccines' | 'Vaccine' | 'Vaccines / Biologic Medicines' 
  | 'Biologic medicines' | 'Biologic / Monoclonal' 
  | 'Oral dissolving films' | 'Oral Dissolving Film / Strip' | 'Films' | 'Wafers' 
  | 'Buccal films' 
  | 'Medicated shampoos' | 'Medicated Shampoo' 
  | 'Enemas' 
  | 'Dental preparations' | 'Dental Preparation' 
  | 'Vaginal rings' 
  | 'Drug-eluting devices' | 'Drug-Eluting Device' 
  | 'Prefilled syringes' 
  | 'Auto-injectors' | 'Auto-Injector' 
  | 'Infusion pumps/cartridges'
  | 'Sublingual Tablet';

export type PharmaAdministrationRoute = 
  | 'Oral' 
  | 'Intravenous (IV)' 
  | 'Intramuscular (IM)' 
  | 'Subcutaneous (SC)' 
  | 'Intradermal'
  | 'Intra-articular'
  | 'Epidural'
  | 'Intrathecal'
  | 'Intraosseous'
  | 'Intravitreal'
  | 'Intralesional'
  | 'Inhaled' 
  | 'Nasal' 
  | 'Ophthalmic' 
  | 'Otic' 
  | 'Topical' 
  | 'Transdermal' 
  | 'Rectal' 
  | 'Vaginal'
  | 'Sublingual'
  | 'Buccal'
  | 'Sublingual / Buccal';

export type PharmaLegalStatus = 
  | 'OTC' 
  | 'Prescription' 
  | 'Pharmacist-only' 
  | 'Specialist prescription' 
  | 'Controlled prescription' 
  | 'Hospital-only' 
  | 'Emergency-use' 
  | 'High-alert' 
  | 'Investigational' 
  | 'Restricted indication' 
  | 'Vaccine' 
  | 'Biologic' 
  | 'Orphan medicine'
  | 'OTC (Over-The-Counter)' 
  | 'Prescription-Only (Rx)' 
  | 'OTC (Over-The-Counter) / Rx'
  | 'Specialist Prescription (Oncology/Biologic)'
  | 'Controlled Substance (Schedule II/IV)' 
  | 'Hospital-Only Emergency' 
  | 'Investigational / Trial' 
  | 'Withdrawn from Market'
  | 'Unapproved Formulation'
  | 'Prohibited / Illicit Substance (Schedule I)'
  | 'WADA Prohibited Substance (Sports Doping)'
  | 'Regulated Reproductive Health'
  | 'Forensic Toxin / Hazard'
  | 'Orphan Drug' 
  | 'Biologic / Biosimilar';

export type InteractionSeverityTier = 
  | 'MINOR' 
  | 'MODERATE' 
  | 'MAJOR' 
  | 'CONTRAINDICATED_CRITICAL';

export interface DrugInteractionItem {
  targetName: string;
  targetType: 'Drug' | 'Food' | 'Disease' | 'Lab' | 'Herbal' | 'Alcohol';
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

export interface InjectionCompatibilityProfile {
  compatibleDiluents: string[];
  incompatibleDiluents: string[];
  ySiteCompatibleDrugs: string[];
  ySiteIncompatibleDrugs: string[];
  lightProtectionRequired: boolean;
  filterRequirement?: string; // e.g. 0.22 micron inline filter
  maximumInfusionRate?: string;
  vesicantOrIrritant?: 'Vesicant' | 'Irritant' | 'Neutral';
}

export interface MasterDrugRecord {
  id: string;
  genericName: string;
  brandNames: string[];
  aliases?: string[];
  streetNamesForensic?: string[];
  
  alphabetLetter: string; // A to Z
  drugClass: string;
  therapeuticCategory: string;
  substanceCategory: SubstanceUniverseCategory;
  visualRiskTier: VisualSafetyRiskTier;
  
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
  
  commonSideEffects?: string[];
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

  // Substance Safety & Risk Attributes
  dependencePotential?: 'Low' | 'Moderate' | 'High' | 'Severe (Physical & Psychological)' | 'None';
  abusePotential?: 'Low' | 'Moderate' | 'High' | 'Extreme / Schedule I-II';
  withdrawalRisk?: string;
  overdoseRisk?: string;
  wadaProhibitionStatus?: string; // e.g. S1 Anabolic Agents - Prohibited In and Out of Competition

  legalStatus: PharmaLegalStatus;
  isHighAlert: boolean;
  isColdChain: boolean;
  storageRequirement: string; // e.g. 2°C - 8°C or 15°C - 25°C
  
  injectionProfile?: InjectionCompatibilityProfile;

  inventoryStock: number; // units available
  batchNumber: string;
  expiryDate: string;
  isRecallOrAlert: boolean;
  recallStatusText?: string;
  barcodeGS1: string;

  atoms3D?: MolecularStructure3D;
  adulterationRiskNotes?: string;
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

/* =========================================================================
   NOVA MEDGUARD AI: MULTI-DIMENSIONAL MEDICATION SAFETY TYPES
   ========================================================================= */

export type MedGuardRiskLevel = 'LOW' | 'CAUTION' | 'HIGH' | 'CRITICAL';

export interface MedGuardDrugItem {
  id: string;
  rawInput: string;
  genericName: string;
  brandName?: string;
  activeIngredient: string;
  drugClass: string;
  strengthValue: number;
  strengthUnit: string; // 'mg' | 'mcg' | 'g' | 'mg/mL' | 'units' | 'mL'
  dosageForm: PharmaDosageForm;
  route: PharmaAdministrationRoute;
  frequency: string; // 'QD (Daily)' | 'BID (Twice Daily)' | 'TID' | 'QID' | 'PRN (As Needed)' | 'Continuous IV'
  isHighAlert: boolean;
  legalStatus: PharmaLegalStatus;
  originalDrugRecord?: MasterDrugRecord;
}

export interface MedGuardPatientContext {
  patientId: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  weightKg: number;
  isPregnant: boolean;
  pregnancyTrimester?: '1st Trimester' | '2nd Trimester' | '3rd Trimester';
  isLactating: boolean;
  knownAllergies: string[];
  diagnosedDiseases: string[];
  egfr: number; // mL/min/1.73m2
  serumCreatinine: number; // mg/dL
  serumPotassium: number; // mEq/L
  serumSodium: number; // mEq/L
  bloodGlucose: number; // mg/dL
  hba1c: number; // %
  inr: number;
  astAlt: number; // U/L
  platelets: number; // x10^3/mcL
  systolicBp: number;
  diastolicBp: number;
  consumesAlcohol: boolean;
  alcoholIntakeFrequency?: 'Daily' | 'Moderate (1-2 drinks/wk)' | 'Heavy / Binge' | 'None';
  consumesGrapefruit: boolean;
  isSmoker: boolean;
}

export interface MedGuardFinding {
  id: string;
  category: 
    | 'DRUG_DRUG' 
    | 'DUPLICATE_INGREDIENT' 
    | 'DRUG_DISEASE' 
    | 'DRUG_ALLERGY' 
    | 'DRUG_ALCOHOL' 
    | 'DRUG_FOOD' 
    | 'DRUG_LAB_ELECTROLYTE' 
    | 'DRUG_ORGAN_RENAL' 
    | 'DRUG_ORGAN_HEPATIC' 
    | 'DRUG_CARDIAC_BP' 
    | 'DRUG_PREGNANCY_LACTATION' 
    | 'DRUG_PEDIATRIC_GERIATRIC' 
    | 'TOXICITY_OVERDOSE_RISK';
  severity: MedGuardRiskLevel;
  title: string;
  involvedItems: string[];
  whatMayHappen: string;
  pharmacologicalMechanism: string;
  whoIsAtGreaterRisk: string;
  symptomsToWatchFor: string[];
  recommendedClinicalAction: string;
  evidenceSources: string[];
}

export interface MedGuardAnalysisReport {
  timestamp: string;
  overallRiskScore: number; // 0 - 100
  overallRiskLevel: MedGuardRiskLevel;
  riskSummaryStatement: string;
  drugsAnalyzed: MedGuardDrugItem[];
  patientContext: MedGuardPatientContext;
  duplicateIngredientAlerts: { ingredient: string; drugNames: string[]; cumulativeDose: string; maxDailySafeDose: string; warning: string }[];
  allergyAlerts: MedGuardFinding[];
  drugDrugInteractions: MedGuardFinding[];
  diseaseInteractions: MedGuardFinding[];
  labElectrolyteInteractions: MedGuardFinding[];
  organSafetyAlerts: MedGuardFinding[];
  alcoholFoodAlerts: MedGuardFinding[];
  specialPopulationAlerts: MedGuardFinding[];
  toxcheckAlerts: MedGuardFinding[];
  allFindings: MedGuardFinding[];
  doctorVerificationRequired: boolean;
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

/* =========================================================================
   NOVA CAREGUIDE & CLINICAL GUIDANCE TYPES
   ========================================================================= */

export interface VerifiedDrugStrengthFormulation {
  dosageForm: PharmaDosageForm;
  route: PharmaAdministrationRoute;
  availableStrengths: {
    strengthValue: number | string;
    unit: 'mg' | 'mcg' | 'g' | 'mg/mL' | 'mg/5 mL' | 'mg/2.5 mL' | '%' | 'IU' | 'units/mL' | 'micrograms/dose' | 'mcg/actuation' | 'mg/100 mL' | string;
    displayLabel: string;
    standardDoseDescription: string;
  }[];
  typicalOnsetTime: string;
  typicalDuration: string;
  administrationInstructions: string;
}

export interface ComprehensiveClinicalMonograph {
  id: string;
  brandNames: string[];
  genericName: string;
  activeIngredient: string;
  chemicalClass: string;
  drugClass: string;
  medicalSpecialties: string[];
  approvedUses: string[];
  offLabelUses?: string[];
  formulations: VerifiedDrugStrengthFormulation[];
  pharmacodynamicsMechanism: string;
  clinicalBenefits: string[];
  clinicalLimitations: string[];
  commonSideEffects: string[];
  seriousAdverseEffects: string[];
  allergyInformation: string;
  contraindications: string[];
  drugInteractionsSummary: string;
  alcoholInteraction: {
    severity: 'LOW' | 'CAUTION' | 'HIGH' | 'CRITICAL';
    guidance: string;
  };
  foodInteractions: string[];
  diseaseInteractions: {
    disease: string;
    risk: 'CAUTION' | 'CONTRAINDICATED';
    explanation: string;
  }[];
  pregnancyGuidance: {
    fdaCategoryOrTrimesterRule: string;
    isCompatible: boolean;
    clinicalDetail: string;
  };
  breastfeedingGuidance: string;
  pediatricGuidance: string;
  geriatricBeersGuidance: string;
  renalDoseAdjustment: string; // eGFR considerations
  hepaticDoseAdjustment: string;
  cardiacBloodPressureConsiderations: string;
  diabetesBloodSugarConsiderations: string;
  overdoseWarningAndAntidote: string;
  storageConditions: string;
  legalPrescriptionClassification: PharmaLegalStatus;
  primaryManufacturers: string[];
  recalledLotsOrWarnings?: string;
  references: string[]; // FDA DailyMed, RxNorm, WHO, etc.
}

export interface CareGuideSymptomRecord {
  id: string;
  symptomName: string;
  aliases: string[];
  category: 'General / Pain / Fever' | 'Respiratory / ENT' | 'Gastrointestinal' | 'Dermatology' | 'Women’s Health & Reproductive' | 'Mental Health / Sleep';
  briefOverview: string;
  commonlyUsedMedicineCategories: {
    categoryName: string;
    pharmacologicalRole: string;
    representativeExamples: string[];
    prescriptionRequirement: 'OTC' | 'Prescription' | 'Pharmacist-Only';
  }[];
  evidenceBasedSelfCareMeasures: string[];
  pediatricCareNotes?: string;
  pregnancyCareNotes?: string;
  emergencyRedFlagsChecklist: string[];
}

export interface ContraceptionMethodRecord {
  id: string;
  methodName: string;
  category: 'Barrier' | 'Combined Oral Contraception' | 'Progestin-Only Pills' | 'Emergency Contraception' | 'Injections' | 'Implants' | 'Vaginal Rings' | 'Transdermal Patches' | 'IUD / IUS' | 'Permanent Contraception';
  howItWorks: string;
  pregnancyPreventionRate: string; // e.g. "99% with perfect use, 93% with typical use"
  providesStiProtection: boolean;
  stiProtectionExplanation: string;
  durationOfEfficacy: string;
  advantages: string[];
  disadvantages: string[];
  commonSideEffects: string[];
  seriousWarnings: string[];
  whoMayNeedMedicalReview: string;
  prescriptionRequirement: 'OTC / Non-Prescription' | 'Prescription Only' | 'Clinic / Procedure Required';
}

export interface SexualHealthTopicRecord {
  id: string;
  topicTitle: string;
  slug: string;
  shortSummary: string;
  keyPillars: {
    title: string;
    content: string;
  }[];
  emergencyProtocol?: {
    triggerEvent: string; // e.g. "Condom broke or slipped"
    timeCriticalWindow: string; // "Within 72 to 120 hours"
    recommendedActionSteps: string[];
    distinctionVsAbortion: string;
  };
}

export interface BodyPartSystemRecord {
  id: string;
  organName: string;
  aliases: string[];
  icon: string;
  commonConditions: string[];
  keyMedicineCategories: {
    categoryName: string;
    primaryFormulations: string[];
    commonDrugs: string[];
  }[];
  emergencyRedFlags: string[];
}


