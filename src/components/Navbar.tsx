import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  Search, 
  UserPlus, 
  FileText, 
  Database, 
  Cloud, 
  Settings as SettingsIcon, 
  LogOut, 
  Building, 
  Stethoscope, 
  Heart, 
  Pill, 
  Calendar, 
  Layers, 
  Dna, 
  FlaskConical, 
  Flame, 
  Globe, 
  Brain, 
  QrCode, 
  Users, 
  Sparkles,
  Command,
  BedDouble,
  Clock
} from 'lucide-react';
import { TabType, UserPortalRole } from '../types/biotech';
import { AuthenticatedUser } from './AuthPortal';
import { supabaseManager } from '../services/supabaseClient';

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
  onOpenCommandPalette?: () => void;
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
  onOpenDatabase,
  onOpenCommandPalette
}) => {
  const [navCategory, setNavCategory] = useState<'clinical' | 'diagnostics' | 'hospital'>('clinical');
  const [facilityName, setFacilityName] = useState<string>('St. Jude Health System • Boston Main Campus');
  const [timeString, setTimeString] = useState<string>('');
  const isCloudActive = supabaseManager.isConfigured();

  // Live Hospital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const clinicalTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'command_center', label: 'Census & Triage', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'patient_monitor', label: 'Bedside Vitals', icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 'whole_body', label: 'Physician Workstation', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: 'nurse_emar', label: 'Nurse eMAR', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'prescription_vault', label: 'Pharmacy & Rx', icon: <Pill className="w-3.5 h-3.5" /> },
    { id: 'appointments', label: 'Scheduling', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'nova_careguide', label: 'Care Protocols', icon: <Sparkles className="w-3.5 h-3.5" /> }
  ];

  const diagnosticsTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'hospital_reports', label: 'Diagnostic Imaging & Labs', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'nova_anatomy_twin', label: '3D Anatomy Explorer', icon: <Brain className="w-3.5 h-3.5" /> },
    { id: 'structure3d', label: 'AlphaFold 3D', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'variant', label: 'Genomics & Variants', icon: <Dna className="w-3.5 h-3.5" /> },
    { id: 'drugs', label: 'Drug Discovery', icon: <Pill className="w-3.5 h-3.5" /> },
    { id: 'trials', label: 'Clinical Trials', icon: <FlaskConical className="w-3.5 h-3.5" /> }
  ];

  const hospitalOpsTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'nova_rescue', label: 'Trauma SOS Network', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'hospital_units', label: 'Care Units & Beds', icon: <BedDouble className="w-3.5 h-3.5" /> },
    { id: 'specialists', label: 'Specialist Directory', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'xai_risk', label: 'XAI Risk Intelligence', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'emergency_qr', label: 'Emergency Passport', icon: <QrCode className="w-3.5 h-3.5" /> },
    { id: 'medical_atlas', label: 'Clinical Knowledge Atlas', icon: <Globe className="w-3.5 h-3.5" /> }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-[#070b14]/95 backdrop-blur-md">
      
      {/* Top Main Enterprise Bar */}
      <div className="flex h-14 items-center justify-between px-3 sm:px-6">
        
        {/* Left: System Brand & Facility Selector */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white font-bold text-sm shadow-sm">
              <Shield className="h-4 w-4" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-bold text-white tracking-tight">BIOPULSE</span>
                <span className="rounded bg-sky-950/90 px-1.5 py-0.2 text-[10px] font-mono font-semibold text-sky-400 border border-sky-800/60">
                  ENTERPRISE EHR
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center text-xs text-slate-400 border-l border-slate-800 pl-3 space-x-1.5">
            <Building className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              aria-label="Select Hospital Campus"
              className="bg-transparent text-slate-300 text-xs font-medium border-none outline-none cursor-pointer hover:text-white"
            >
              <option value="St. Jude Health System • Boston Main Campus" className="bg-slate-900 text-white">St. Jude Health System • Boston Main Campus</option>
              <option value="Mayo Clinic Regional Telemetry Center" className="bg-slate-900 text-white">Mayo Clinic Regional Telemetry Center</option>
              <option value="Memorial Sloan Kettering Inpatient ICU" className="bg-slate-900 text-white">Memorial Sloan Kettering Inpatient ICU</option>
            </select>
          </div>
        </div>

        {/* Center: Command Bar Quick Search & Live Clock */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-4 space-x-3">
          <div 
            onClick={onOpenCommandPalette}
            className="flex flex-1 items-center justify-between rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 px-3 py-1.5 text-xs text-slate-400 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-3.5 w-3.5 text-sky-400" />
              <span>Search patients by Name, MRN, Bed, ICD-10...</span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
              <Command className="h-3 w-3" />
              <span>K</span>
            </div>
          </div>

          {timeString && (
            <div className="hidden xl:flex items-center space-x-1 text-[11px] font-mono text-slate-400 bg-slate-900/70 border border-slate-800 px-2.5 py-1 rounded-lg">
              <Clock className="h-3 w-3 text-sky-400" />
              <span>{timeString} EST</span>
            </div>
          )}
        </div>

        {/* Right: Operational Actions & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          
          {/* Supabase / Cloud Status Pill */}
          {onOpenDatabase && (
            <button
              onClick={onOpenDatabase}
              className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1 text-xs font-medium border transition-all ${
                isCloudActive
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/60'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850 hover:text-white'
              }`}
              title="Open Clinical Database Studio & Cloud Sync"
            >
              {isCloudActive ? (
                <>
                  <Cloud className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="hidden xl:inline text-[11px] font-mono">Cloud Synced</span>
                </>
              ) : (
                <>
                  <Database className="h-3.5 w-3.5 text-slate-400" />
                  <span className="hidden xl:inline text-[11px] font-mono">Database</span>
                </>
              )}
            </button>
          )}

          {/* Quick Admit Button */}
          <button
            onClick={onOpenRegister}
            className="flex items-center space-x-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors shadow-sm"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Admit Patient</span>
          </button>

          {/* Quick SOAP Note Button */}
          <button
            onClick={onOpenNotes}
            className="hidden sm:flex items-center space-x-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-sky-400" />
            <span>SOAP Note</span>
          </button>

          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveRole('doctor')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                activeRole === 'doctor' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Attending Physician View"
            >
              Doctor
            </button>
            <button
              onClick={() => setActiveRole('hospital')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                activeRole === 'hospital' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Hospital Admin View"
            >
              Admin
            </button>
            <button
              onClick={() => setActiveRole('emergency')}
              className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                activeRole === 'emergency' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Emergency Paramedic View"
            >
              Trauma
            </button>
          </div>

          {/* User Account / Profile Button */}
          {currentUser && (
            <button
              onClick={() => setActiveTab('user_profile')}
              className="flex items-center space-x-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 px-2 py-1 text-xs transition-colors"
              title="User Account Profile"
            >
              <div className="h-5 w-5 rounded-full bg-slate-800 text-sky-400 flex items-center justify-center font-bold text-[10px]">
                {currentUser.name.slice(0, 1)}
              </div>
              <span className="hidden md:inline font-medium text-slate-200 text-[11px] max-w-[90px] truncate">
                {currentUser.name}
              </span>
            </button>
          )}

          {/* Settings Trigger */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Application Settings"
            >
              <SettingsIcon className="h-4 w-4" />
            </button>
          )}

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}

        </div>

      </div>

      {/* Sub-Navigation: Organized by Professional Clinical Modules with Sliding Layout Pill */}
      <div className="flex items-center justify-between border-t border-slate-800/80 bg-[#060912] px-3 sm:px-6 py-1 overflow-x-auto no-scrollbar">
        
        {/* Module Category Selector */}
        <div className="flex items-center space-x-1 border-r border-slate-800 pr-3 mr-3 shrink-0">
          <button
            onClick={() => setNavCategory('clinical')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
              navCategory === 'clinical'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Clinical Operations
          </button>
          <button
            onClick={() => setNavCategory('diagnostics')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
              navCategory === 'diagnostics'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Diagnostics & Biotech
          </button>
          <button
            onClick={() => setNavCategory('hospital')}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
              navCategory === 'hospital'
                ? 'bg-slate-800 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hospital & Trauma
          </button>
        </div>

        {/* Dynamic Nav Items for Active Category */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-0.5">
          {(navCategory === 'clinical' ? clinicalTabs : navCategory === 'diagnostics' ? diagnosticsTabs : hospitalOpsTabs).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-sky-300 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSubTabPill"
                    className="absolute inset-0 rounded-md bg-sky-950/80 border border-sky-800/80 -z-10"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                  />
                )}
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
