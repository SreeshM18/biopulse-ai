import React from 'react';
import { Award, ShieldAlert, Sparkles, UserCheck, Flame, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { PatientProfile } from '../types/biotech';

interface JudgePitchBannerProps {
  patients: PatientProfile[];
  selectedPatient: PatientProfile;
  onSelectPatient: (patient: PatientProfile) => void;
}

export const JudgePitchBanner: React.FC<JudgePitchBannerProps> = ({
  patients,
  selectedPatient,
  onSelectPatient
}) => {
  return (
    <div className="hidden md:block bg-gradient-to-r from-[#070b16] via-[#0b1428] to-[#070b16] border-b border-cyan-500/20 py-2 px-4 sm:px-6 print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        
        {/* Left: Hackathon Pitch Tag */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex items-center space-x-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-[10px] sm:text-xs shadow-glow-cyan">
            <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
            <span className="truncate">NOVA Sentinel AI</span>
          </div>
          
          <div className="hidden xl:flex items-center space-x-1 text-[11px] font-mono text-slate-400">
            <span>Doctor Login</span>
            <span className="text-cyan-500">➔</span>
            <span>Command Center</span>
            <span className="text-cyan-500">➔</span>
            <span>Live Vitals</span>
            <span className="text-cyan-500">➔</span>
            <span className="text-cyan-300 font-bold">TreeSHAP AI</span>
            <span className="text-cyan-500">➔</span>
            <span className="text-rose-400 font-bold">Critical Alert</span>
            <span className="text-cyan-500">➔</span>
            <span>Timeline</span>
            <span className="text-cyan-500">➔</span>
            <span className="text-purple-400 font-bold">Emergency QR</span>
          </div>
        </div>

        {/* Right: Quick Case Switchers (Single Horizontal Scroll) */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="text-slate-400 text-[10px] sm:text-xs hidden md:inline shrink-0 font-medium">
            Inpatient Cases:
          </span>
          {patients.map((p) => {
            const isSelected = selectedPatient.id === p.id;
            const risk = p.riskAssessment.riskLevel;

            return (
              <button
                key={p.id}
                onClick={() => onSelectPatient(p)}
                className={`flex items-center space-x-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-purple-500/30 text-white border border-cyan-400 shadow-glow-cyan font-bold scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${
                  risk === 'CRITICAL' ? 'bg-rose-500 animate-ping' : risk === 'HIGH' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
                <span className="font-bold">{p.name.split(' ')[0]}</span>
                <span className="text-[9px] font-mono text-slate-400 hidden sm:inline">({p.mrn.slice(-4)})</span>
                <span className={`text-[8px] font-mono font-bold px-1 rounded ${
                  risk === 'CRITICAL' ? 'bg-rose-950 text-rose-300' : risk === 'HIGH' ? 'bg-amber-950 text-amber-300' : 'bg-emerald-950 text-emerald-300'
                }`}>
                  [{risk}]
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
