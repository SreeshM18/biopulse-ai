import React, { useState } from 'react';
import { 
  Activity, 
  Brain, 
  Heart, 
  Wind, 
  Droplet, 
  Thermometer, 
  Video, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Stethoscope, 
  ShieldCheck, 
  Sparkles,
  ExternalLink,
  Plus,
  Send,
  Zap,
  Filter,
  FileCheck2,
  User
} from 'lucide-react';
import { PatientProfile, TeleconsultMeeting, DoctorProfile } from '../types/biotech';
import { INITIAL_TELECONSULT_MEETINGS } from '../data/hospitalReports';
import { MASTER_DOCTOR_ROSTER } from '../data/doctorRoster';
import { DoctorProfileCardModal } from './DoctorProfileCardModal';

interface DoctorWholeBodyMonitorProps {
  patient: PatientProfile;
  onOpenNotes?: () => void;
}

export const DOCTOR_SPECIALTIES_LIST = [
  { id: 'crit', name: 'Critical Care (Intensivist)', board: 'MD, FCCM', primaryOrgan: 'Lungs & Sepsis', defaultOrders: ['Stat Blood Gas (ABG)', 'Central Venous Line Placement', 'Initiate Sepsis 1-Hr Bundle', 'Target MAP > 65 with Norepinephrine'] },
  { id: 'card', name: 'Cardiology', board: 'MD, FACC', primaryOrgan: 'Heart & Hemodynamics', defaultOrders: ['Stat 12-Lead ECG', 'Serial High-Sensitivity Troponin', 'Transthoracic Echocardiogram (TTE)', 'Start IV Heparin Infusion'] },
  { id: 'pulm', name: 'Pulmonology', board: 'MD, FCCP', primaryOrgan: 'Lungs & Gas Exchange', defaultOrders: ['High-Flow Nasal Cannula (FiO2 60%)', 'Nebulized Albuterol + Ipratropium', 'CT Angiography Chest', 'Arterial Blood Gas Stat'] },
  { id: 'neuro', name: 'Neurology', board: 'MD, FAAN', primaryOrgan: 'Brain & Nervous System', defaultOrders: ['Non-Contrast Head CT Stat', 'Continuous 24h Video EEG', 'GCS Neurological Checks q1h', 'Assess for IV Thrombolysis (tPA)'] },
  { id: 'neurosurg', name: 'Neurosurgery', board: 'MD, FACS', primaryOrgan: 'Brain & Spinal Cord', defaultOrders: ['Urgent Brain MRI with Contrast', 'Place External Ventricular Drain (EVD)', 'Elevate Head of Bed 30°', 'Administer 20% Mannitol Bolus'] },
  { id: 'genmed', name: 'General Medicine / Internist', board: 'MD, FACP', primaryOrgan: 'Multisystem Adult Care', defaultOrders: ['Comprehensive Metabolic Panel (CMP)', 'CBC with Differential', 'Blood Cultures x2', 'Glycemic Control Protocol'] },
  { id: 'nephro', name: 'Nephrology', board: 'MD, FASN', primaryOrgan: 'Kidneys & Electrolytes', defaultOrders: ['Urgent Renal Ultrasound', 'Check Fractional Excretion of Na (FeNa)', 'Continuous Renal Replacement (CRRT)', 'Treat Severe Hyperkalemia'] },
  { id: 'gastro', name: 'Gastroenterology', board: 'MD, FACG', primaryOrgan: 'Digestive & Stomach', defaultOrders: ['Urgent Upper Endoscopy (EGD)', 'IV Pantoprazole Bolus + Infusion', 'Type & Cross 2 Units PRBCs', 'Check Hepatic Function Panel'] },
  { id: 'hepato', name: 'Hepatology', board: 'MD, FAASLD', primaryOrgan: 'Liver & Biliary Tree', defaultOrders: ['Serum Ammonia & Coagulation Profile', 'Abdominal Paracentesis Protocol', 'Initiate Lactulose & Rifaximin', 'MELD-Na Score Calculation'] },
  { id: 'onc', name: 'Medical Oncology', board: 'MD, FASCO', primaryOrgan: 'Cancer & Chemotherapy', defaultOrders: ['Stat ANC & CBC Count', 'Empiric Cefepime for Febrile Neutropenia', 'Tumor Lysis Labs (Uric Acid, LDH, K+)', 'KRAS / EGFR Molecular Biomarker Review'] },
  { id: 'surg', name: 'General Surgery', board: 'MD, FACS', primaryOrgan: 'Abdominal & Acute Care', defaultOrders: ['Abdominal CT with IV Contrast', 'NPO & Place Nasogastric Tube', 'Surgical Pre-Op Labs & Consent', 'IV Antibiotic Prophylaxis'] },
  { id: 'infec', name: 'Infectious Diseases', board: 'MD, FIDSA', primaryOrgan: 'Sepsis & Antimicrobials', defaultOrders: ['Blood, Sputum, Urine Cultures', 'Procalcitonin Biomarker Draw', 'Antibiotic Stewardship Renal Dosing', 'Broad-Spectrum Vancomycin + Cefepime'] },
  { id: 'em', name: 'Emergency Medicine', board: 'MD, FACEP', primaryOrgan: 'Immediate Resuscitation', defaultOrders: ['Fast Scan Ultrasound (POCUS)', 'Large Bore IV Access x2', 'Stat Trauma Panel', 'Rapid Crystalloid Infusion'] },
  { id: 'ortho', name: 'Orthopedics', board: 'MD, FAAOS', primaryOrgan: 'Bones & Joints', defaultOrders: ['Stat Plain Radiographs 3-Views', 'Immobilization / Splinting', 'Compartment Pressure Checks', 'Pre-Op Surgical Clearance'] },
  { id: 'endo', name: 'Endocrinology', board: 'MD, FACE', primaryOrgan: 'Hormones & Diabetes', defaultOrders: ['IV Insulin Infusion Protocol', 'Serial Blood Glucose q1h', 'Thyroid Function Panel (TSH/FT4)', 'Serum Osmolality & Ketones'] },
  { id: 'rheum', name: 'Rheumatology', board: 'MD, FACR', primaryOrgan: 'Autoimmune & Joints', defaultOrders: ['ANA / Anti-dsDNA / Complement Levels', 'High-Dose IV Methylprednisolone', 'ESR & High-Sensitivity CRP', 'Screen for Lupus Nephritis'] },
  { id: 'hemat', name: 'Hematology', board: 'MD, FACP', primaryOrgan: 'Blood & Coagulation', defaultOrders: ['Peripheral Blood Smear Review', 'Coagulation Factor Assays', 'DIC Panel (Fibrinogen, D-Dimer, PT/INR)', 'Transfuse Platelets if < 50k'] },
  { id: 'derm', name: 'Dermatology', board: 'MD, FAAD', primaryOrgan: 'Skin & Drug Eruptions', defaultOrders: ['Skin Biopsy (Punch 4mm)', 'Evaluate for Stevens-Johnson / TEN', 'Topical Barrier Ointments', 'Discontinue All Culprit Medications'] },
  { id: 'psych', name: 'Psychiatry', board: 'MD, FAPA', primaryOrgan: 'Mental Health & Delirium', defaultOrders: ['CAM-ICU Delirium Assessment', 'Review Psychotropic Medications', 'Low-Dose Haloperidol PRN Agitation', 'Implement Sleep-Wake Protocol'] },
  { id: 'ent', name: 'ENT (Otolaryngology)', board: 'MD, FACS', primaryOrgan: 'Ear, Nose & Throat', defaultOrders: ['Flexible Fiberoptic Nasopharyngoscopy', 'Prepare Difficult Airway Cart', 'IV Dexamethasone for Airway Edema', 'Neck CT with Contrast'] },
  { id: 'ophth', name: 'Ophthalmology', board: 'MD, FACS', primaryOrgan: 'Eyes & Vision', defaultOrders: ['Check Intraocular Pressure (IOP)', 'Slit Lamp Bedside Examination', 'Fluorescein Corneal Staining', 'Topical Timolol Drops'] },
  { id: 'peds', name: 'Pediatrics', board: 'MD, FAAP', primaryOrgan: 'Childhood Medicine', defaultOrders: ['Weight-Based Medication Calculation', 'Pediatric Early Warning Score (PEWS)', 'Continuous Pulse Oximetry', 'Gentle Rehydration Protocol'] },
  { id: 'neonato', name: 'Neonatology', board: 'MD, FAAP', primaryOrgan: 'Newborn Critical Care', defaultOrders: ['Giraffe Incubator Thermoregulation', 'Endotracheal Surfactant Delivery', 'Umbilical Artery Catheter Care', 'Total Parenteral Nutrition (TPN)'] },
  { id: 'ob', name: 'Obstetrics', board: 'MD, FACOG', primaryOrgan: 'Pregnancy & Childbirth', defaultOrders: ['Continuous Fetal Heart Rate Monitoring', 'Check Magnesium Sulfate for Pre-Eclampsia', 'Bedside Pelvic Ultrasound', 'Blood Bank Crossmatch x4'] },
  { id: 'gyn', name: 'Gynecology', board: 'MD, FACOG', primaryOrgan: 'Female Health', defaultOrders: ['Transvaginal Ultrasound', 'Serum Beta-hCG Stat', 'Pelvic Examination', 'Evaluate for Ovarian Torsion'] },
  { id: 'uro', name: 'Urology', board: 'MD, FACS', primaryOrgan: 'Urinary & Bladder', defaultOrders: ['Urgent Foley Catheterization', 'CT Urogram for Obstructive Stone', 'Urinary Gram Stain', 'Prepare for Emergency Nephrostomy'] },
  { id: 'anesthes', name: 'Anesthesiology', board: 'MD, FASA', primaryOrgan: 'Airway & Perioperative', defaultOrders: ['Pre-Anesthetic Airway Assessment', 'Prepare Video Laryngoscope', 'Invasive Arterial Line Setup', 'Post-Op PCA Pump Programming'] },
  { id: 'rad', name: 'Radiology', board: 'MD, FACR', primaryOrgan: 'Diagnostic Imaging', defaultOrders: ['PACS DICOM Review', 'Prioritize Emergency CT Angio', 'Image-Guided Biopsy Coordination', 'Critical Radiologic Finding Broadcast'] },
  { id: 'path', name: 'Pathology', board: 'MD, FCAP', primaryOrgan: 'Laboratory & Tissues', defaultOrders: ['Stat Frozen Section Interpretation', 'Flow Cytometry Panel', 'Molecular Mutation Testing', 'Special Histochemical Stains'] },
  { id: 'geriat', name: 'Geriatrics', board: 'MD, AGSF', primaryOrgan: 'Elderly & Polypharmacy', defaultOrders: ['Beers Criteria Medication Audit', 'Comprehensive Geriatric Assessment', 'Fall Risk Prevention Protocol', 'Hydration & Nutrition Review'] },
  { id: 'rehab', name: 'Rehabilitation (PM&R)', board: 'MD, FAAPMR', primaryOrgan: 'Functional Recovery', defaultOrders: ['Early Inpatient Mobility Assessment', 'Swallow Function Fiberoptic Exam', 'Physical & Occupational Therapy Consult', 'Neuromuscular Electrical Stimulation'] },
  { id: 'pain', name: 'Pain Medicine', board: 'MD, FAPM', primaryOrgan: 'Analgesia & Blocks', defaultOrders: ['Multi-Modal Analgesia Regimen', 'Ultrasound-Guided Nerve Block', 'PCA Pump Titration', 'Neuropathic Pain Gabapentinoid Start'] },
  { id: 'palliat', name: 'Palliative Care', board: 'MD, FAAHPM', primaryOrgan: 'Symptom Relief', defaultOrders: ['Goals of Care Family Conference', 'Refractory Dyspnea Protocol', 'Comfort-Focused Care Orders', 'Advance Directives Documentation'] }
];

export const DoctorWholeBodyMonitor: React.FC<DoctorWholeBodyMonitorProps> = ({
  patient,
  onOpenNotes
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(DOCTOR_SPECIALTIES_LIST[0]);
  const [currentDoctor, setCurrentDoctor] = useState<DoctorProfile>(MASTER_DOCTOR_ROSTER[0]);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState<boolean>(false);
  const [meetings, setMeetings] = useState<TeleconsultMeeting[]>(INITIAL_TELECONSULT_MEETINGS);
  const [activeCallRoom, setActiveCallRoom] = useState<TeleconsultMeeting | null>(null);
  const [isScheduling, setIsScheduling] = useState<boolean>(false);
  const [dispatchedOrders, setDispatchedOrders] = useState<string[]>([]);
  const [orderSentSuccess, setOrderSentSuccess] = useState<boolean>(false);

  // New Teleconsult form state
  const [newDoctorName, setNewDoctorName] = useState<string>('Dr. Sarah Lin, MD');
  const [newSpecialty, setNewSpecialty] = useState<string>('Critical Care (Intensivist)');
  const [newDate, setNewDate] = useState<string>('Today');
  const [newTime, setNewTime] = useState<string>('18:30 PM');
  const [newType, setNewType] = useState<'Emergency Clinical Round' | 'Routine Specialist Review' | 'Family Update'>('Emergency Clinical Round');

  const telemetry = patient.wholeBodyTelemetry || {
    brain: { gcsScore: 12, pupillaryReflex: 'Equal & Reactive', intracranialStatus: 'Normal', neurologicalStatus: 'Lethargic / Confused' },
    heart: { rhythm: 'Sinus Tachycardia', meanArterialPressure: 65, cardiacOutput: 4.1, troponinLevel: '0.04 ng/mL', status: 'Sinus Tachycardia' },
    lungs: { pao2Fio2Ratio: 168, spo2: patient.vitals.spo2, respiratoryRate: patient.vitals.respiratoryRate, airwayResistance: 'Bibasilar Infiltrates', status: 'Severe ARDS' },
    bloodRenal: { creatinine: 2.1, eGFR: 32, lactate: 4.2, hemoglobin: 10.4, platelets: 112, status: 'Lactic Acidosis / Sepsis' },
    liverMetabolism: { coreTemp: patient.vitals.temperature, bloodGlucose: 178, bilirubin: 1.4, altAst: 'ALT 58 | AST 64', status: 'Hyperpyrexic Stress' }
  };

  const handleSpecialtyChange = (specId: string) => {
    const found = DOCTOR_SPECIALTIES_LIST.find(s => s.id === specId);
    if (found) {
      setSelectedSpecialty(found);
      setNewSpecialty(found.name);

      // Match corresponding doctor from roster if available
      const matchingDoc = MASTER_DOCTOR_ROSTER.find(d => d.specialty.toLowerCase().includes(found.name.toLowerCase().slice(0, 5)));
      if (matchingDoc) {
        setCurrentDoctor(matchingDoc);
      }
    }
  };

  const handleDispatchOrderBundle = () => {
    setDispatchedOrders(selectedSpecialty.defaultOrders);
    setOrderSentSuccess(true);
    setTimeout(() => setOrderSentSuccess(false), 4000);
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    const newM: TeleconsultMeeting = {
      id: `meet-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      doctorName: newDoctorName,
      specialty: newSpecialty,
      scheduledDate: newDate,
      timeSlot: newTime,
      meetingType: newType,
      status: 'Scheduled',
      meetingRoomUrl: `https://telemed.novasentinel.health/room/${patient.id.toUpperCase()}-${Date.now()}`
    };
    setMeetings(prev => [newM, ...prev]);
    setIsScheduling(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Dynamic Specialty Profile Switcher */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Doctor Specialist Portal
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {selectedSpecialty.board} Verified
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Stethoscope className="w-6 h-6 text-cyan-400" />
              <span>Specialist Command Hub: {selectedSpecialty.name}</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Attending physician dashboard for <strong>{patient.name}</strong> ({patient.bedLocation}). Dynamic organ prioritization, specialty-specific clinical order bundles, and live tele-rounds.
            </p>
          </div>

          {/* Dynamic Specialty Switcher Dropdown (33 Fields) */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center space-x-2 bg-slate-900 border border-cyan-500/40 rounded-xl px-3 py-1.5 shadow-glow-cyan">
              <Filter className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-400 uppercase">Active Specialty Profile:</span>
                <select
                  value={selectedSpecialty.id}
                  onChange={(e) => handleSpecialtyChange(e.target.value)}
                  className="bg-transparent text-xs font-extrabold text-cyan-300 focus:outline-none cursor-pointer"
                >
                  {DOCTOR_SPECIALTIES_LIST.map((spec) => (
                    <option key={spec.id} value={spec.id} className="bg-slate-900 text-white">
                      {spec.name} ({spec.primaryOrgan})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => setIsDoctorModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all flex items-center justify-center space-x-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Doctor Profile</span>
            </button>

            <button
              onClick={() => setIsScheduling(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan transition-all flex items-center justify-center space-x-1.5"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Tele-Round</span>
            </button>
          </div>
        </div>

        {/* Doctor Summary Bar (Department, Specialty, Qualification, Experience, Availability, Patients Assigned) */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-800 border border-cyan-500/40 shrink-0">
              <img src={currentDoctor.avatarUrl} alt={currentDoctor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-white flex items-center space-x-2">
                <span>{currentDoctor.name}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  ● {currentDoctor.availability}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                <strong>Dept:</strong> {currentDoctor.department} • <strong>Exp:</strong> {currentDoctor.experience}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-400">
              <strong>Assigned Patients:</strong> <span className="text-cyan-300 font-bold">{currentDoctor.patientsAssigned.length} Inpatients</span>
            </span>
            <button
              onClick={() => setIsDoctorModalOpen(true)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900"
            >
              View Profile & Schema
            </button>
          </div>
        </div>

        {/* Specialty Order Bundle Dispatcher */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-cyan-300 uppercase flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedSpecialty.name} — Stat Order Bundle for {patient.name}:</span>
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Standard evidence-based clinical orders prioritized for {selectedSpecialty.primaryOrgan}.
              </p>
            </div>

            <button
              onClick={handleDispatchOrderBundle}
              className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-cyan transition-all flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>1-Click Dispatch {selectedSpecialty.defaultOrders.length} Orders</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {selectedSpecialty.defaultOrders.map((ord, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-mono text-[11px]">{ord}</span>
              </div>
            ))}
          </div>

          {orderSentSuccess && (
            <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center space-x-2 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Orders digitally signed & dispatched to ICU nursing staff, central pharmacy, and radiology PACS!</span>
            </div>
          )}
        </div>
      </div>

      {/* Whole-Body 5-Organ System Telemetry Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>Whole-Body Organ System Telemetry Matrix</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            5 Organ Systems Continuous Streaming
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* 1. BRAIN & NEUROLOGICAL */}
          <div className={`glass-card rounded-2xl p-5 border transition-all ${
            selectedSpecialty.primaryOrgan.includes('Brain') ? 'border-purple-400 shadow-glow-purple scale-[1.01]' : 'border-purple-500/40'
          } bg-gradient-to-br from-[#090e1d] to-[#120f28] space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-purple-300 font-extrabold text-sm">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>1. Brain & Central Nervous</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                telemetry.brain.gcsScore < 13 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                GCS: {telemetry.brain.gcsScore} / 15
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Neurological State:</span>
                <span className="text-white font-bold">{telemetry.brain.neurologicalStatus}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Pupillary Reflex:</span>
                <span className="text-cyan-300">{telemetry.brain.pupillaryReflex}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Intracranial / CNS:</span>
                <span className="text-amber-300 text-[11px]">{telemetry.brain.intracranialStatus}</span>
              </div>
            </div>
          </div>

          {/* 2. HEART & CARDIOVASCULAR */}
          <div className={`glass-card rounded-2xl p-5 border transition-all ${
            selectedSpecialty.primaryOrgan.includes('Heart') ? 'border-rose-400 shadow-glow-cyan scale-[1.01]' : 'border-rose-500/40'
          } bg-gradient-to-br from-[#090e1d] to-[#200e18] space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-rose-300 font-extrabold text-sm">
                <Heart className="w-5 h-5 text-rose-400" />
                <span>2. Heart & Hemodynamics</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                MAP: {telemetry.heart.meanArterialPressure} mmHg
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Cardiac Rhythm:</span>
                <span className="text-rose-400 font-bold">{telemetry.heart.rhythm}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Cardiac Output:</span>
                <span className="text-white">{telemetry.heart.cardiacOutput} L/min</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Cardiac Troponin:</span>
                <span className="text-amber-300">{telemetry.heart.troponinLevel}</span>
              </div>
            </div>
          </div>

          {/* 3. LUNGS & PULMONARY */}
          <div className={`glass-card rounded-2xl p-5 border transition-all ${
            selectedSpecialty.primaryOrgan.includes('Lungs') ? 'border-cyan-400 shadow-glow-cyan scale-[1.01]' : 'border-cyan-500/40'
          } bg-gradient-to-br from-[#090e1d] to-[#0d1c28] space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-cyan-300 font-extrabold text-sm">
                <Wind className="w-5 h-5 text-cyan-400" />
                <span>3. Lungs & Gas Exchange</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                P/F: {telemetry.lungs.pao2Fio2Ratio} (ARDS)
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">SpO2 / Resp Rate:</span>
                <span className="text-cyan-300 font-bold">{telemetry.lungs.spo2}% • {telemetry.lungs.respiratoryRate} bpm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Gas Exchange Status:</span>
                <span className="text-rose-400 font-bold">{telemetry.lungs.status}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Airway Auscultation:</span>
                <span className="text-white text-[11px]">{telemetry.lungs.airwayResistance}</span>
              </div>
            </div>
          </div>

          {/* 4. BLOOD, LACTATE & RENAL */}
          <div className={`glass-card rounded-2xl p-5 border transition-all ${
            selectedSpecialty.primaryOrgan.includes('Kidneys') || selectedSpecialty.primaryOrgan.includes('Blood') ? 'border-amber-400 shadow-glow-cyan scale-[1.01]' : 'border-amber-500/40'
          } bg-gradient-to-br from-[#090e1d] to-[#241a0e] space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-amber-300 font-extrabold text-sm">
                <Droplet className="w-5 h-5 text-amber-400" />
                <span>4. Blood, Lactate & Renal</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Lactate: {telemetry.bloodRenal.lactate} mmol/L
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Creatinine / eGFR:</span>
                <span className="text-amber-400 font-bold">{telemetry.bloodRenal.creatinine} mg/dL ({telemetry.bloodRenal.eGFR} mL/min)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Hemoglobin (Hb):</span>
                <span className="text-white">{telemetry.bloodRenal.hemoglobin} g/dL</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Platelet Count:</span>
                <span className="text-white">{telemetry.bloodRenal.platelets} k/uL</span>
              </div>
            </div>
          </div>

          {/* 5. METABOLISM & LIVER */}
          <div className={`glass-card rounded-2xl p-5 border transition-all ${
            selectedSpecialty.primaryOrgan.includes('Liver') || selectedSpecialty.primaryOrgan.includes('Hormones') ? 'border-emerald-400 shadow-glow-cyan scale-[1.01]' : 'border-emerald-500/40'
          } bg-gradient-to-br from-[#090e1d] to-[#0e2417] space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-emerald-300 font-extrabold text-sm">
                <Thermometer className="w-5 h-5 text-emerald-400" />
                <span>5. Metabolism & Hepatic</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Temp: {telemetry.liverMetabolism.coreTemp}°C
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 font-mono">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Blood Glucose:</span>
                <span className="text-white font-bold">{telemetry.liverMetabolism.bloodGlucose} mg/dL</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Serum Bilirubin:</span>
                <span className="text-white">{telemetry.liverMetabolism.bilirubin} mg/dL</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Liver Transaminases:</span>
                <span className="text-cyan-300 text-[11px]">{telemetry.liverMetabolism.altAst}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Teleconsultation & Clinical Meeting Schedule Manager */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <Video className="w-5 h-5 text-cyan-400" />
            <span>Tele-Rounds & Specialist Consultation Schedule</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {meetings.length} Video Sessions Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meetings.map((m) => (
            <div 
              key={m.id}
              className={`p-4 rounded-2xl border space-y-3 transition-all ${
                m.status === 'Live Now'
                  ? 'bg-rose-950/20 border-rose-500/50 shadow-glow-cyan'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-mono text-cyan-300 font-bold">{m.meetingType}</div>
                  <h4 className="text-sm font-extrabold text-white mt-0.5">{m.doctorName}</h4>
                  <div className="text-[11px] text-slate-400">{m.specialty}</div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  m.status === 'Live Now' ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-800 text-slate-300'
                }`}>
                  {m.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{m.scheduledDate}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{m.timeSlot}</span>
                </span>
              </div>

              <button
                onClick={() => setActiveCallRoom(m)}
                className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  m.status === 'Live Now'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-glow-cyan'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>{m.status === 'Live Now' ? 'Join Live Clinical Tele-Round' : 'Enter Meeting Room'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Live Video Call Mock Overlay */}
      {activeCallRoom && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-[#090e1d] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <h3 className="font-extrabold text-white text-base">
                  Live Tele-Round: {activeCallRoom.meetingType} with {activeCallRoom.doctorName}
                </h3>
              </div>
              <button
                onClick={() => setActiveCallRoom(null)}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-500 rounded-xl text-xs text-white font-bold"
              >
                End Call
              </button>
            </div>

            {/* Mock Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-72">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" 
                  alt="Doctor" 
                  className="w-full h-full object-cover opacity-90"
                />
                <span className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded-lg text-xs font-mono text-cyan-300">
                  {activeCallRoom.doctorName} ({selectedSpecialty.name})
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                <div className="text-center p-6 space-y-2">
                  <Activity className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
                  <span className="font-bold text-white block text-sm">{patient.name} ({patient.bedLocation})</span>
                  <div className="text-xs font-mono text-slate-400">
                    Live Stream: HR {patient.vitals.heartRate} • SpO2 {patient.vitals.spo2}% • Temp {patient.vitals.temperature}°C
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded-lg text-xs font-mono text-emerald-400">
                  ● Bedside Telemetry Stream Connected
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Encrypted WebRTC Teleconsultation • HIPAA / ABDM Compliant Stream</span>
              <span className="font-mono text-cyan-300">Room: {activeCallRoom.meetingRoomUrl}</span>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Profile Modal */}
      <DoctorProfileCardModal
        doctor={currentDoctor}
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        onLaunchTeleconsult={(doc) => {
          setIsScheduling(true);
        }}
      />

      {/* Schedule Dialog */}
      {isScheduling && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#090e1d] border border-cyan-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Schedule New Teleconsult Meeting</span>
              </h4>
              <button onClick={() => setIsScheduling(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Doctor Name</label>
                <input
                  type="text"
                  value={newDoctorName}
                  onChange={(e) => setNewDoctorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Specialty</label>
                <input
                  type="text"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Date</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Time Slot</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsScheduling(false)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
