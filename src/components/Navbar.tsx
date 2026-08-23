import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  QrCode, 
  AlertTriangle, 
  Stethoscope, 
  Heart, 
  HeartHandshake,
  UserPlus, 
  Layers, 
  Dna, 
  Pill, 
  Search,
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
  Database,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';
import { TabType, UserPortalRole } from '../types/biotech';
import { AuthenticatedUser } from './AuthPortal';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeRole: UserPortalRole;
  setActiveRole: (role: UserPortalRole) => void;
  currentUser?: AuthenticatedUser | null;
  onLogout?: () => void;
  onOpenNotes: () => void;
  onOpenRegister: () => void;
  onOpenSettings?: () => void;
  onOpenDatabase?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  activeRole,
  setActiveRole,
  currentUser,
  onLogout,
  onOpenNotes,
  onOpenRegister,
  onOpenSettings,
  onOpenDatabase
}) => {
  const patientMonitoringTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'command_center', label: 'Command', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
    { id: 'user_profile', label: 'Profiles (4 Roles)', icon: <User className="w-4 h-4 text-cyan-300 animate-pulse" /> },
    { id: 'nova_careguide', label: 'CareGuide AI', icon: <HeartHandshake className="w-4 h-4 text-emerald-400 animate-pulse" /> },
    { id: 'nova_pharma', label: 'NOVA Pharma (A–Z)', icon: <Pill className="w-4 h-4 text-pink-400" /> },
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
    { id: 'clinical_search', label: 'AI MedSearch', icon: <Search className="w-4 h-4 text-cyan-300 animate-pulse" /> },
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
        <div className="flex items-center justify-between h-13 sm:h-16 gap-1.5 sm:gap-2">
          
          {/* Brand Logo & Compact Title */}
          <div 
            onClick={() => setActiveTab('command_center')}
            className="flex items-center space-x-1.5 sm:space-x-2.5 cursor-pointer group shrink-0 min-w-0"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-glow-cyan transition-transform group-hover:scale-105 shrink-0">
              <div className="w-full h-full bg-[#090e1d] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <span className="font-black text-sm sm:text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent truncate">
                  BioPulse AI
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/30 rounded">
                  NOVA
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 hidden md:inline truncate">
                Clinical Health & 3D Twin
              </span>
            </div>
          </div>

          {/* Desktop 4 Access Portals Selector */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 shrink-0">
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

          {/* User Profile Badge & Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
            
            {/* Authenticated User Badge (Desktop) */}
            {currentUser && (
              <button 
                onClick={() => setActiveTab('user_profile')}
                className="hidden xl:flex items-center space-x-2 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs transition-all shadow-glow-cyan cursor-pointer"
                title="View All 4 Role Profiles (Doctor, Patient, SOS Paramedic, Hospital)"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-white max-w-[110px] truncate">{currentUser.name}</span>
                <span className="text-[9px] font-mono text-cyan-300 px-1 py-0.2 rounded bg-cyan-950">
                  {currentUser.role.toUpperCase()}
                </span>
              </button>
            )}

            {/* Profile Button */}
            <button
              onClick={() => setActiveTab('user_profile')}
              className={`p-1.5 sm:p-2 rounded-xl text-xs font-semibold border transition-all ${
                activeTab === 'user_profile'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-glow-cyan'
                  : 'bg-slate-850 hover:bg-slate-800 text-cyan-300 border-slate-750'
              }`}
              title="4-Persona Clinical Profile Hub (Doctor, Patient, SOS, Hospital)"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Admit Button */}
            <button
              onClick={onOpenRegister}
              className="flex items-center space-x-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[10px] sm:text-xs">Admit</span>
            </button>

            {/* SOAP Button */}
            <button
              onClick={onOpenNotes}
              className="flex items-center space-x-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-750 transition-all"
            >
              <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-[10px] sm:text-xs">SOAP</span>
            </button>

            {/* Database Button */}
            {onOpenDatabase && (
              <button
                onClick={onOpenDatabase}
                className="hidden sm:flex p-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 shadow-glow-cyan transition-all items-center space-x-1"
                title="Open Master Clinical Database Studio (Users, Patients, Billing, Appointments)"
              >
                <Database className="w-3.5 h-3.5" />
                <span className="hidden md:inline text-xs">Database</span>
              </button>
            )}

            {/* Settings Button */}
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="hidden sm:flex p-1.5 sm:p-2 rounded-xl text-xs font-semibold bg-slate-850 hover:bg-slate-800 text-cyan-300 border border-slate-750 shadow-glow-cyan transition-all"
                title="Settings & Mobile Phone Connect QR"
              >
                <SettingsIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}

            {/* Logout Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="hidden md:flex p-1.5 sm:p-2 rounded-xl text-xs font-semibold bg-slate-850 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-750 hover:border-rose-500/50 transition-all"
                title="Logout & Return to Welcome Portal"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
