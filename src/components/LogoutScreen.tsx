import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  RotateCcw, 
  User, 
  Stethoscope, 
  Ambulance, 
  Building2, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Key, 
  ArrowRight,
  Database,
  Pause,
  Play
} from 'lucide-react';
import { UserPortalRole, AuthenticatedUser } from '../types/biotech';

interface LogoutScreenProps {
  lastUser: AuthenticatedUser | null;
  lastRole: UserPortalRole;
  onRelogin: (role?: UserPortalRole) => void;
  onReturnToWelcome: () => void;
  onOpenDatabase?: () => void;
}

export const LogoutScreen: React.FC<LogoutScreenProps> = ({
  lastUser,
  lastRole,
  onRelogin,
  onReturnToWelcome,
  onOpenDatabase
}) => {
  const [countdown, setCountdown] = useState<number>(12);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [sessionHash] = useState<string>(() => {
    return '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  });

  useEffect(() => {
    if (isPaused) return;
    if (countdown <= 0) {
      onRelogin(lastRole);
      return;
    }
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, isPaused, lastRole, onRelogin]);

  const roleConfig = {
    patient: {
      label: 'Patient Portal',
      icon: <User className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300',
      badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-500/50'
    },
    doctor: {
      label: 'Physician / Doctor Portal',
      icon: <Stethoscope className="w-5 h-5 text-emerald-400" />,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300',
      badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
    },
    emergency: {
      label: 'Emergency / SOS Paramedic',
      icon: <Ambulance className="w-5 h-5 text-rose-500" />,
      color: 'from-rose-500/20 to-amber-500/20 border-rose-500/40 text-rose-300',
      badgeBg: 'bg-rose-950 text-rose-300 border-rose-500/50'
    },
    hospital: {
      label: 'Hospital & Ecosystem Admin',
      icon: <Building2 className="w-5 h-5 text-purple-400" />,
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300',
      badgeBg: 'bg-purple-950 text-purple-300 border-purple-500/50'
    }
  };

  const currentRoleCfg = roleConfig[lastRole] || roleConfig.doctor;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Modal Card */}
      <div className="relative z-10 w-full max-w-xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl text-center space-y-6">
        
        {/* Lock & Check Icon Badge */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/40 p-1 flex items-center justify-center shadow-glow-cyan">
          <div className="w-full h-full bg-[#050b1a] rounded-[22px] flex items-center justify-center relative">
            <Lock className="w-8 h-8 text-cyan-400" />
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-slate-950 shadow-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>SESSION SAFELY TERMINATED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            You Have Successfully Logged Out
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Your clinical workspace session has been securely closed. All EHR patient vitals, telemetry, prescriptions, and billing ledgers have been encrypted and saved to the master database.
          </p>
        </div>

        {/* Session Details Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-left space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>User Profile:</span>
            </span>
            <span className="text-white font-bold">
              {lastUser?.name || (lastRole === 'doctor' ? 'Dr. Sarah Lin, MD' : lastRole === 'patient' ? 'Robert Vance' : lastRole === 'emergency' ? 'Paramedic Alex Morgan' : 'St. Jude Health Admin')}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <Key className="w-3.5 h-3.5 text-purple-400" />
              <span>Role / Access Tier:</span>
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold border ${currentRoleCfg.badgeBg}`}>
              {currentRoleCfg.label}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-850 pb-2">
            <span className="text-slate-400 flex items-center space-x-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Database Sync Status:</span>
            </span>
            <span className="text-emerald-300 font-mono font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Committed to ClinicalDb</span>
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Audit Proof:</span>
            <span className="text-cyan-300">{sessionHash}</span>
          </div>
        </div>

        {/* Countdown Auto-Redirect Bar */}
        <div className="bg-slate-950/90 rounded-2xl p-3 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>
              Auto-redirecting to login in <strong className="text-cyan-300 font-mono font-bold">{countdown}s</strong>
            </span>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 flex items-center space-x-1"
          >
            {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => onRelogin(lastRole)}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm transition-all shadow-glow-cyan"
          >
            <LogIn className="w-4 h-4" />
            <span>Log In Again</span>
          </button>

          <button
            onClick={onReturnToWelcome}
            className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4 text-purple-400" />
            <span>Welcome Screen</span>
          </button>
        </div>

        {/* Switch Persona Fast Buttons */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2 text-left">
          <span className="text-[11px] font-mono text-slate-400 block font-bold">
            Or Sign In as a Different Clinical Persona:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { role: 'doctor' as UserPortalRole, label: 'Doctor', icon: <Stethoscope className="w-3.5 h-3.5 text-emerald-400" /> },
              { role: 'patient' as UserPortalRole, label: 'Patient', icon: <User className="w-3.5 h-3.5 text-cyan-400" /> },
              { role: 'emergency' as UserPortalRole, label: 'SOS / Paramedic', icon: <Ambulance className="w-3.5 h-3.5 text-rose-400" /> },
              { role: 'hospital' as UserPortalRole, label: 'Hospital Admin', icon: <Building2 className="w-3.5 h-3.5 text-purple-400" /> },
            ].map((p) => (
              <button
                key={p.role}
                onClick={() => onRelogin(p.role)}
                className="flex items-center space-x-1.5 p-2 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-all"
              >
                {p.icon}
                <span className="truncate">{p.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Footer System Attribution */}
      <div className="mt-8 text-center text-xs font-mono text-slate-400 flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-cyan-400" />
        <span>BioPulse AI • Next-Gen Digital Healthcare System</span>
      </div>
    </div>
  );
};
