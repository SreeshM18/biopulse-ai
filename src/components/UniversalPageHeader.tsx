import React from 'react';
import { 
  ArrowLeft, 
  Home, 
  Activity, 
  Heart, 
  Brain, 
  Flame, 
  Pill, 
  Layers, 
  Clock, 
  Users, 
  Calendar, 
  BedDouble, 
  Stethoscope, 
  Sparkles, 
  BookOpen, 
  QrCode, 
  FileCheck2, 
  Building2, 
  AlertTriangle, 
  Dna, 
  FlaskConical, 
  GitBranch,
  Globe,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { TabType, PatientProfile } from '../types/biotech';

interface UniversalPageHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedPatient?: PatientProfile;
  onOpenPatientNotes?: () => void;
}

const TAB_METADATA: Partial<Record<TabType, { title: string; category: string; icon: React.ReactNode }>> = {
  command_center: { title: 'Command Center', category: 'Executive Hub', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
  user_profile: { title: 'Clinical Profiles (4 Roles Hub)', category: 'Identity & Access', icon: <UserCheck className="w-4 h-4 text-cyan-300 animate-pulse" /> },
  nova_careguide: { title: 'NOVA CareGuide AI Medical Navigator', category: 'Clinical Guidance', icon: <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" /> },
  nova_pharma: { title: 'NOVA Pharma & Substance Universe', category: 'Pharmacology Intelligence', icon: <Pill className="w-4 h-4 text-pink-400" /> },
  nova_anatomy_twin: { title: '3D Holographic Anatomy Digital Twin', category: 'Biomechanics Twin', icon: <Brain className="w-4 h-4 text-cyan-400" /> },
  organ_3d_twin: { title: '3D Organ Multi-System Twin', category: 'Pathophysiology', icon: <Layers className="w-4 h-4 text-purple-400" /> },
  nova_rescue: { title: 'NOVA Rescue SOS Emergency Network', category: 'Emergency Response', icon: <Flame className="w-4 h-4 text-rose-500 animate-pulse" /> },
  patient_monitor: { title: 'Live Multi-Parameter Vitals & Telemetry', category: 'Clinical Vitals', icon: <Heart className="w-4 h-4 text-rose-400" /> },
  medical_atlas: { title: 'Master Medical Universe Atlas', category: 'Clinical Knowledge', icon: <Globe className="w-4 h-4 text-cyan-400" /> },
  medical_timeline: { title: 'Chronological Patient Medical Timeline', category: 'EHR Longitudinal', icon: <Clock className="w-4 h-4 text-purple-400" /> },
  nurse_emar: { title: 'Nurse eMAR & Medication Administration', category: 'Nursing Operations', icon: <Users className="w-4 h-4 text-emerald-400" /> },
  appointments: { title: 'Clinical Appointments & Specialist Consults', category: 'Scheduling', icon: <Calendar className="w-4 h-4 text-cyan-400" /> },
  hospital_units: { title: 'Hospital Care Units & Bed Management', category: 'Facility Logistics', icon: <BedDouble className="w-4 h-4 text-amber-400" /> },
  whole_body: { title: 'Doctor Whole-Body Organ Assessment', category: 'Physician Workstation', icon: <Stethoscope className="w-4 h-4 text-emerald-400" /> },
  specialists: { title: 'Medical Specialists & Expert Directory', category: 'Staff Directory', icon: <Users className="w-4 h-4 text-cyan-400" /> },
  xai_risk: { title: 'Explainable AI Deterioration Risk Engine', category: 'Predictive Analytics', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
  clinical_search: { title: 'Differential Diagnosis & Medical Search', category: 'Clinical Reference', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
  emergency_qr: { title: 'Emergency QR Medical Passport', category: 'Patient Safety', icon: <QrCode className="w-4 h-4 text-purple-400" /> },
  prescription_vault: { title: 'Prescription Vault & Pharmacy Orders', category: 'Rx Management', icon: <FileCheck2 className="w-4 h-4 text-emerald-400" /> },
  hospital_reports: { title: 'Hospital Lab & Diagnostic Reports', category: 'Diagnostics', icon: <Building2 className="w-4 h-4 text-purple-400" /> },
  alerts: { title: 'Critical Clinical Alerts & Early Warnings', category: 'Safety Signals', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
  structure3d: { title: 'AlphaFold 3D Protein Structural Biology', category: 'Computational Bio', icon: <Layers className="w-4 h-4 text-purple-400" /> },
  variant: { title: 'AlphaGenome Variant Pathogenicity Engine', category: 'Genomics', icon: <Dna className="w-4 h-4 text-cyan-400" /> },
  drugs: { title: 'ChEMBL AI Drug Discovery & Binding Affinity', category: 'Cheminformatics', icon: <Pill className="w-4 h-4 text-emerald-400" /> },
  trials: { title: 'ClinicalTrials.gov Global Trials Matching', category: 'Clinical Research', icon: <FlaskConical className="w-4 h-4 text-rose-400" /> },
  sequence: { title: 'Genomic FASTQ / DNA Sequence Scanner', category: 'Bioinformatics', icon: <GitBranch className="w-4 h-4 text-cyan-400" /> },
};

export const UniversalPageHeader: React.FC<UniversalPageHeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedPatient,
  onOpenPatientNotes
}) => {
  // If we are on the main command center, we don't show the back header
  if (activeTab === 'command_center') return null;

  const currentTabMeta = TAB_METADATA[activeTab] || {
    title: 'Clinical Workspace',
    category: 'BioPulse Sentinel',
    icon: <Activity className="w-4 h-4 text-cyan-400" />
  };

  return (
    <div className="w-full mb-5 animate-fade-in print:hidden">
      <div className="p-3 sm:p-4 rounded-2xl bg-[#080d1e]/90 backdrop-blur-xl border border-cyan-500/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        
        {/* Left: Back Button & Breadcrumbs */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('command_center')}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 hover:text-white text-xs font-bold transition-all shadow-glow-cyan shrink-0 active:scale-95"
            title="Return to Main Command Center"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>← Back to Command</span>
          </button>

          <div className="flex items-center space-x-1.5 text-xs text-slate-400 overflow-hidden">
            <span 
              onClick={() => setActiveTab('command_center')}
              className="hover:text-cyan-300 cursor-pointer hidden sm:inline truncate font-mono text-[11px]"
            >
              Command
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden sm:inline shrink-0" />
            <div className="flex items-center space-x-1.5 font-bold text-white truncate">
              {currentTabMeta.icon}
              <span className="truncate">{currentTabMeta.title}</span>
            </div>
          </div>
        </div>

        {/* Right: Active Patient Context & Quick SOAP Note Action */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
          {selectedPatient && (
            <div className="flex items-center space-x-2">
              <div className="text-left md:text-right text-[11px] font-mono">
                <span className="text-slate-400 block text-[9px]">ACTIVE PATIENT</span>
                <span className="font-bold text-cyan-300">{selectedPatient.name}</span>
                <span className="text-slate-500 ml-1">({selectedPatient.bedLocation})</span>
              </div>

              {onOpenPatientNotes && (
                <button
                  onClick={onOpenPatientNotes}
                  className="px-2.5 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-bold transition-all flex items-center space-x-1 shadow-glow-purple"
                  title="Open Clinical SOAP Note Dossier"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SOAP Note</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
