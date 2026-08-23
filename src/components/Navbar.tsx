import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  QrCode, 
  AlertTriangle, 
  Stethoscope, 
  Heart, 
  UserPlus, 
  Layers, 
  Dna, 
  Pill, 
  FlaskConical, 
  GitBranch,
  FileCheck2,
  BookOpen,
  User,
  ShieldAlert,
  Building2,
  Users,
  BedDouble,
  Clock,
  Calendar,
  Globe,
  Flame,
  Brain,
  Settings as SettingsIcon
} from 'lucide-react';
import { TabType, UserPortalRole } from '../types/biotech';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeRole: UserPortalRole;
  setActiveRole: (role: UserPortalRole) => void;
  onOpenNotes: () => void;
  onOpenRegister: () => void;
  onOpenSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  activeRole,
  setActiveRole,
  onOpenNotes,
  onOpenRegister,
  onOpenSettings
}) => {
  const patientMonitoringTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'command_center', label: 'Command Center', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
    { id: 'nova_anatomy_twin', label: 'NOVA Anatomy Twin (3D)', icon: <Brain className="w-4 h-4 text-cyan-400 animate-pulse" /> },
    { id: 'organ_3d_twin', label: '3D Organ Bio-Matrix', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'nova_rescue', label: 'NOVA Rescue (SOS)', icon: <Flame className="w-4 h-4 text-rose-500 animate-pulse" /> },
    { id: 'patient_monitor', label: 'Live Vitals', icon: <Heart className="w-4 h-4 text-rose-400" /> },
    { id: 'medical_atlas', label: 'Medical Atlas (A–Z)', icon: <Globe className="w-4 h-4 text-cyan-400" /> },
    { id: 'medical_timeline', label: 'Medical Timeline', icon: <Clock className="w-4 h-4 text-purple-400" /> },
    { id: 'nurse_emar', label: 'Nurse eMAR', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4 text-cyan-400" /> },
    { id: 'hospital_units', label: 'Care Units (21 Depts)', icon: <BedDouble className="w-4 h-4 text-amber-400" /> },
    { id: 'whole_body', label: 'Doctor Whole-Body', icon: <Stethoscope className="w-4 h-4 text-emerald-400" /> },
    { id: 'specialists', label: '52 Specialists', icon: <Users className="w-4 h-4 text-cyan-400" /> },
    { id: 'xai_risk', label: 'Explainable AI', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
    { id: 'clinical_search', label: 'Differential Dx', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
    { id: 'emergency_qr', label: 'Emergency QR', icon: <QrCode className="w-4 h-4 text-purple-400" /> },
    { id: 'prescription_vault', label: 'Rx Vault', icon: <FileCheck2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'hospital_reports', label: 'Hospital & Labs', icon: <Building2 className="w-4 h-4 text-purple-400" /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
  ];

  const computationalBioTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'structure3d', label: '3D AlphaFold', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'variant', label: 'Variant Pathogenicity', icon: <Dna className="w-4 h-4 text-cyan-400" /> },
    { id: 'drugs', label: 'Drug Discovery', icon: <Pill className="w-4 h-4 text-emerald-400" /> },
    { id: 'trials', label: 'Trial Matcher', icon: <FlaskConical className="w-4 h-4 text-rose-400" /> },
    { id: 'sequence', label: 'FASTQ / DNA Scanner', icon: <GitBranch className="w-4 h-4 text-cyan-400" /> },
  ];

  const handleRoleChange = (newRole: UserPortalRole) => {
    setActiveRole(newRole);
    if (newRole === 'emergency') {
      setActiveTab('nova_rescue');
    } else if (newRole === 'doctor') {
      setActiveTab('whole_body');
    } else if (newRole === 'hospital') {
      setActiveTab('hospital_units');
    } else {
      setActiveTab('command_center');
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060913]/90 border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('command_center')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-glow-cyan transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#090e1d] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  BioPulse AI
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded-md">
                  NOVA Ecosystem
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">
                Micro-to-Macro 3D Digital Avatar
              </p>
            </div>
          </div>

          {/* 4 Access Portals Selector (Primary Role Bar) */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => handleRoleChange('patient')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'patient'
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>1. Patient Portal</span>
            </button>

            <button
              onClick={() => handleRoleChange('emergency')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'emergency'
                  ? 'bg-rose-600 text-white shadow-glow-cyan font-black animate-pulse'
                  : 'text-rose-400/80 hover:text-rose-300'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>2. NOVA Rescue (SOS)</span>
            </button>

            <button
              onClick={() => handleRoleChange('doctor')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'doctor'
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-emerald-400/80 hover:text-emerald-300'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>3. Doctor Portal</span>
            </button>

            <button
              onClick={() => handleRoleChange('hospital')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'hospital'
                  ? 'bg-purple-600 text-white shadow-glow-purple font-black'
                  : 'text-purple-400/80 hover:text-purple-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>4. Hospital / Labs</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenRegister}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all transform hover:scale-105"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Admit</span>
            </button>

            <button
              onClick={onOpenNotes}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">SOAP</span>
            </button>

            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan transition-all"
                title="Settings & Mobile Phone Connect QR"
              >
                <SettingsIcon className="w-4 h-4 animate-spin-slow" />
              </button>
            )}
          </div>

        </div>

        {/* Sub-Navigation Tabs Row */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar text-xs">
          {patientMonitoringTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}

          <span className="text-slate-700 font-bold mx-1">|</span>

          {computationalBioTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
