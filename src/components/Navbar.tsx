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
    { id: 'command_center', label: 'Command', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
    { id: 'nova_anatomy_twin', label: '3D Anatomy', icon: <Brain className="w-4 h-4 text-cyan-400" /> },
    { id: 'organ_3d_twin', label: '3D Organs', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'nova_rescue', label: 'SOS Rescue', icon: <Flame className="w-4 h-4 text-rose-500 animate-pulse" /> },
    { id: 'patient_monitor', label: 'Live Vitals', icon: <Heart className="w-4 h-4 text-rose-400" /> },
    { id: 'medical_atlas', label: 'Medical Atlas', icon: <Globe className="w-4 h-4 text-cyan-400" /> },
    { id: 'medical_timeline', label: 'Timeline', icon: <Clock className="w-4 h-4 text-purple-400" /> },
    { id: 'nurse_emar', label: 'Nurse eMAR', icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-4 h-4 text-cyan-400" /> },
    { id: 'hospital_units', label: 'Care Units', icon: <BedDouble className="w-4 h-4 text-amber-400" /> },
    { id: 'whole_body', label: 'Doctor Hub', icon: <Stethoscope className="w-4 h-4 text-emerald-400" /> },
    { id: 'specialists', label: 'Specialists', icon: <Users className="w-4 h-4 text-cyan-400" /> },
    { id: 'xai_risk', label: 'Explainable AI', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
    { id: 'clinical_search', label: 'Differential Dx', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
    { id: 'emergency_qr', label: 'Emergency QR', icon: <QrCode className="w-4 h-4 text-purple-400" /> },
    { id: 'prescription_vault', label: 'Rx Vault', icon: <FileCheck2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'hospital_reports', label: 'Hospital & Labs', icon: <Building2 className="w-4 h-4 text-purple-400" /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
  ];

  const computationalBioTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'structure3d', label: '3D AlphaFold', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'variant', label: 'Variant Engine', icon: <Dna className="w-4 h-4 text-cyan-400" /> },
    { id: 'drugs', label: 'Drug Discovery', icon: <Pill className="w-4 h-4 text-emerald-400" /> },
    { id: 'trials', label: 'Trials', icon: <FlaskConical className="w-4 h-4 text-rose-400" /> },
    { id: 'sequence', label: 'FASTQ / DNA', icon: <GitBranch className="w-4 h-4 text-cyan-400" /> },
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060913]/95 border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Brand Logo & Compact Title */}
          <div 
            onClick={() => setActiveTab('command_center')}
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-glow-cyan transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#090e1d] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  BioPulse AI
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/30 rounded">
                  NOVA
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">
                Clinical Health & 3D Twin
              </span>
            </div>
          </div>

          {/* Desktop 4 Access Portals Selector */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => handleRoleChange('patient')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRole === 'patient'
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>1. Patient</span>
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
              <span>2. SOS Rescue</span>
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
              <span>3. Doctor</span>
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
              <span>4. Hospital</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={onOpenRegister}
              className="flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[11px] sm:text-xs">Admit</span>
            </button>

            <button
              onClick={onOpenNotes}
              className="flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all"
            >
              <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-[11px] sm:text-xs">SOAP</span>
            </button>

            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="p-1.5 sm:p-2 rounded-xl text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan transition-all"
                title="Settings & Mobile Phone Connect QR"
              >
                <SettingsIcon className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Sub-Navigation Tabs Row (Clean Horizontal Scroll) */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1.5 border-t border-slate-800/60 no-scrollbar text-xs">
          {patientMonitoringTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-lg whitespace-nowrap text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}

          <span className="text-slate-700 font-bold mx-1 hidden sm:inline">|</span>

          {computationalBioTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-lg whitespace-nowrap text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
