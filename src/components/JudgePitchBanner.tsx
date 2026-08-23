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
    <div className="bg-gradient-to-r from-[#090d18] via-[#0d172e] to-[#090d18] border-b border-cyan-500/30 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        
        {/* Left: Hackathon Pitch Tag */}
        <div className="flex items-center space-x-2.5 text-xs">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold shadow-glow-cyan">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>NOVA Sentinel • BioPulse AI Core</span>
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

        {/* Right: Quick Case Switchers */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full lg:w-auto py-1 no-scrollbar">
          <span className="text-slate-400 text-xs hidden sm:inline shrink-0 font-medium">
            1-Click Load Inpatient Case:
          </span>
          {patients.map((p) => {
            const isSelected = selectedPatient.id === p.id;
            const risk = p.riskAssessment.riskLevel;

            return (
              <button
                key={p.id}
                onClick={() => onSelectPatient(p)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-purple-500/30 text-white border border-cyan-400 shadow-glow-cyan font-extrabold scale-[1.02]'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  risk === 'CRITICAL' ? 'bg-rose-400 animate-ping' :
                  risk === 'HIGH' ? 'bg-amber-400' :
                  risk === 'MODERATE' ? 'bg-yellow-400' : 'bg-emerald-400'
                }`} />
                <span>{p.name.split(' ')[0]} ({p.id.toUpperCase()})</span>
                <span className={`text-[10px] font-mono font-bold ${
                  risk === 'CRITICAL' ? 'text-rose-400' : 'text-slate-400'
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
