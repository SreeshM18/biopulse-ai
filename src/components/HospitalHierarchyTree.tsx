import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Stethoscope, 
  Users, 
  User, 
  BedDouble, 
  Activity, 
  FileText, 
  FlaskConical, 
  Image, 
  Pill, 
  AlertTriangle, 
  Brain, 
  QrCode, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import { PatientProfile, TabType } from '../types/biotech';

interface HospitalHierarchyTreeProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const HospitalHierarchyTree: React.FC<HospitalHierarchyTreeProps> = ({
  patient,
  setActiveTab
}) => {
  const [activeTier, setActiveTier] = useState<number>(0);

  const HIERARCHY_NODES = [
    {
      id: 'hospital',
      title: '1. Hospital',
      subtitle: 'Mass General Sentinel Academic Medical Center',
      icon: <Building2 className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
      dataPreview: 'Level-1 Trauma Center • 126 Monitored Beds • 7 Specialized Intensive Units',
      actionTab: 'hospital_units' as TabType
    },
    {
      id: 'departments',
      title: '2. Departments',
      subtitle: 'Clinical, Surgical & Diagnostic Divisions',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
      dataPreview: 'Critical Care (MICU/SICU), Cardiology, Neurology, Pulmonology, Oncology, Surgery, Radiology, Pathology',
      actionTab: 'hospital_units' as TabType
    },
    {
      id: 'doctors',
      title: '3. Doctors',
      subtitle: 'Attending Consultants & Subspecialists',
      icon: <Stethoscope className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
      dataPreview: 'Dr. Sarah Lin (Intensivist), Dr. Emily Watson (Cardiology), Dr. Gregory House (Pulmonology), Dr. Marcus Vance (Oncology)',
      actionTab: 'whole_body' as TabType
    },
    {
      id: 'nurses',
      title: '4. Nurses & Allied Care',
      subtitle: 'Critical Care Nurses & RT Team',
      icon: <Users className="w-5 h-5 text-teal-400" />,
      color: 'border-teal-500/40 bg-teal-950/20 text-teal-300',
      dataPreview: 'Nurse Sarah Connor (CCRN Lead), RT David Kim (Ventilator Specialist), Clinical Pharmacists',
      actionTab: 'hospital_units' as TabType
    },
    {
      id: 'patients',
      title: '5. Patients',
      subtitle: 'Universal Electronic Health Identity',
      icon: <User className="w-5 h-5 text-blue-400" />,
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-300',
      dataPreview: `${patient.name} (Age ${patient.age}, MRN: ${patient.mrn}) • ABHA ID: ${patient.emergencyPassport.abhaId || '91-8820-4102-9912'}`,
      actionTab: 'command_center' as TabType
    },
    {
      id: 'admissions',
      title: '6. Admissions',
      subtitle: 'Inpatient Encounter & Triage',
      icon: <Workflow className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/40 bg-indigo-950/20 text-indigo-300',
      dataPreview: `Admitted: ${patient.admissionDate} • Primary Diagnosis: ${patient.primaryDiagnosis} • Triage NEWS2: ${patient.vitals.news2Score}`,
      actionTab: 'command_center' as TabType
    },
    {
      id: 'beds',
      title: '7. Beds',
      subtitle: 'Continuous Telemetry Ward Allocation',
      icon: <BedDouble className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
      dataPreview: `Current Location: ${patient.bedLocation} (MICU High-Acuity Bay 3) • Bedside Hamilton C6 Ventilator Linked`,
      actionTab: 'patient_monitor' as TabType
    },
    {
      id: 'vitals',
      title: '8. Vitals Telemetry',
      subtitle: 'Real-Time Streaming Physiological Signals',
      icon: <Activity className="w-5 h-5 text-rose-400" />,
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-300',
      dataPreview: `HR: ${patient.vitals.heartRate} bpm • SpO2: ${patient.vitals.spo2}% • RR: ${patient.vitals.respiratoryRate} bpm • Temp: ${patient.vitals.temperature}°C • BP: ${patient.vitals.systolicBp}/${patient.vitals.diastolicBp} mmHg`,
      actionTab: 'patient_monitor' as TabType
    },
    {
      id: 'records',
      title: '9. Medical Records',
      subtitle: 'Standardized FHIR / SOAP Documentation',
      icon: <FileText className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
      dataPreview: `SOAP Note: Subjective (Severe Dyspnea, Chills) • Objective (NEWS2 ${patient.vitals.news2Score}, Lactate 4.2) • Assessment (Septic Shock) • Plan (IV Resuscitation)`,
      actionTab: 'whole_body' as TabType
    },
    {
      id: 'labs',
      title: '10. Lab Tests',
      subtitle: 'Stat Arterial Blood Gas & Sepsis Panels',
      icon: <FlaskConical className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300',
      dataPreview: 'Arterial Blood Gas: pH 7.28, PaO2 58 mmHg • Serum Lactate: 4.2 mmol/L • Creatinine: 2.1 mg/dL • Blood Cultures: Pending x2',
      actionTab: 'hospital_reports' as TabType
    },
    {
      id: 'imaging',
      title: '11. Imaging & PACS',
      subtitle: 'DICOM Radiology & Computer-Vision AI',
      icon: <Image className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
      dataPreview: 'Chest X-Ray AP Portable: Dense bilateral pulmonary infiltrates consistent with ARDS • AI Confidence 94.8%',
      actionTab: 'hospital_reports' as TabType
    },
    {
      id: 'medications',
      title: '12. Medications & Rx Vault',
      subtitle: 'Cross-Hospital Adherence & Safety Checks',
      icon: <Pill className="w-5 h-5 text-pink-400" />,
      color: 'border-pink-500/40 bg-pink-950/20 text-pink-300',
      dataPreview: `Active Regimens: ${patient.emergencyPassport.activeMedications.join(', ')} • Cross-Hospital Drug-Drug Conflict Checks Active`,
      actionTab: 'prescription_vault' as TabType
    },
    {
      id: 'alerts',
      title: '13. Alerts & Early Warnings',
      subtitle: 'Real-Time Critical Notification Engine',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300',
      dataPreview: `CRITICAL ALERT: Severe Hypoxemia (SpO2 ${patient.vitals.spo2}%) + NEWS2 Score ${patient.vitals.news2Score} triggered ICU broadcast`,
      actionTab: 'alerts' as TabType
    },
    {
      id: 'xai',
      title: '14. AI Risk Analysis',
      subtitle: 'TreeSHAP Feature Attribution & Counterfactuals',
      icon: <Brain className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300',
      dataPreview: `Overall Risk Score: ${patient.riskAssessment.overallRiskScore}% (${patient.riskAssessment.riskLevel}) • Top Factor: SpO2 Drop (+35% impact)`,
      actionTab: 'xai_risk' as TabType
    },
    {
      id: 'passport',
      title: '15. Emergency Passport',
      subtitle: 'Universal 2-Sec QR & Privacy Barrier',
      icon: <QrCode className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300',
      dataPreview: `Blood Group: ${patient.emergencyPassport.bloodGroup} • Fatal Allergies: ${patient.emergencyPassport.criticalAllergies.join(', ')} • Sensitive History PIN Locked`,
      actionTab: 'emergency_qr' as TabType
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
            Enterprise Medical Architecture
          </span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            15-Tier End-to-End Hospital Hierarchy
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
          <Workflow className="w-6 h-6 text-cyan-400" />
          <span>Main Hospital Data & Entity Hierarchy Navigator</span>
        </h2>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Explore how real hospital data flows seamlessly from the <strong>Hospital Organization</strong> down through <strong>Departments</strong>, <strong>Doctors</strong>, <strong>Patients</strong>, <strong>Vitals</strong>, <strong>Labs</strong>, <strong>Medications</strong>, and <strong>AI Risk Models</strong> to the <strong>Emergency Health Passport</strong>.
        </p>
      </div>

      {/* 15-Tier Cascading Tree Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Hierarchy Index */}
        <div className="lg:col-span-5 space-y-2">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              15-Tier Hospital Flow:
            </h3>

            <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1 no-scrollbar">
              {HIERARCHY_NODES.map((node, index) => {
                const isSelected = activeTier === index;
                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveTier(index)}
                    className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-glow-cyan scale-[1.01]'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                        {node.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-white">{node.title}</h4>
                        <span className="text-[10px] text-slate-400 block">{node.subtitle}</span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 rotate-90' : 'text-slate-600'}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Selected Node Deep-Dive */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
            
            {/* Header of Active Node */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-slate-900 border border-cyan-500/30">
                  {HIERARCHY_NODES[activeTier].icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block">
                    Tier {activeTier + 1} of 15 in Hospital Graph
                  </span>
                  <h3 className="text-lg font-black text-white">{HIERARCHY_NODES[activeTier].title}</h3>
                  <p className="text-xs text-slate-400 font-mono">{HIERARCHY_NODES[activeTier].subtitle}</p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold ${HIERARCHY_NODES[activeTier].color}`}>
                Active Entity
              </span>
            </div>

            {/* Live Data Payload in BioPulse AI */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Live Data Payload for Current Patient ({patient.name}):
              </span>
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-200 leading-relaxed">
                {HIERARCHY_NODES[activeTier].dataPreview}
              </div>
            </div>

            {/* Architectural Importance */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-slate-300 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interoperability & Data Integrity:</span>
              </span>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Standardized under FHIR / HL7 clinical resources (<code>Patient</code>, <code>Encounter</code>, <code>Observation</code>, <code>DiagnosticReport</code>, <code>MedicationRequest</code>).
              </p>
            </div>

            {/* Jump to Module Button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab(HIERARCHY_NODES[activeTier].actionTab)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all flex items-center justify-center space-x-2"
              >
                <span>Jump Directly to {HIERARCHY_NODES[activeTier].title.replace(/^\d+\.\s*/, '')} Module</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
