import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, ChevronRight } from 'lucide-react';
import { PatientProfile } from '../types/biotech';
import { ShinyBadge } from './ui/ShinyBadge';
import { PulseHeartbeat } from './ui/PulseHeartbeat';

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
    <div className="hidden md:block bg-[#080d1a] border-b border-slate-800/80 py-2 px-4 sm:px-6 print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        
        {/* Left: Hackathon Pitch Tag */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <ShinyBadge variant="cyan" icon={<ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />}>
            BioPulse AI • Live Telemetry
          </ShinyBadge>
          
          <div className="hidden xl:flex items-center space-x-1.5 text-[11px] font-mono text-slate-400">
            <span>Inpatient Census</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span>Dual Telemetry</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-sky-300 font-bold">TreeSHAP AI</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-rose-400 font-bold">Level 1 SOS</span>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-emerald-400 font-bold">Supabase Cloud</span>
          </div>
        </div>

        {/* Right: Quick Case Switchers */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="text-slate-400 text-xs hidden md:inline shrink-0 font-medium">
            Active Cases:
          </span>
          {patients.map((p) => {
            const isSelected = selectedPatient.id === p.id;
            const risk = p.riskAssessment.riskLevel;
            const isCritical = risk === 'CRITICAL';

            return (
              <motion.button
                key={p.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectPatient(p)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {isCritical ? (
                  <PulseHeartbeat bpm={p.vitals.heartRate} size="sm" color="text-rose-400" />
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    risk === 'HIGH' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                )}
                <span className="font-bold">{p.name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono opacity-70">({p.mrn.slice(-4)})</span>
              </motion.button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
