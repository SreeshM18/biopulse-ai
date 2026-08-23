import React from 'react';
import { 
  Layers, 
  Dna, 
  Pill, 
  FlaskConical, 
  Sparkles, 
  ArrowRight, 
  Watch,
  Activity,
  Radio
} from 'lucide-react';
import { PatientCaseStudy, TabType } from '../types/biotech';

interface StatsOverviewProps {
  selectedCase: PatientCaseStudy;
  setActiveTab: (tab: TabType) => void;
  onOpenReport: () => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  selectedCase,
  setActiveTab,
  onOpenReport
}) => {
  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-cyan-500/30 p-6 sm:p-8 shadow-2xl bg-gradient-to-br from-[#090e1d] via-[#0d1428] to-[#060913]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan">
                Active Patient Case: {selectedCase.caseCode}
              </span>
              <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                <span>Wearable Stream Live</span>
              </span>
            </div>

            <button
              onClick={onOpenReport}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-glow-cyan transition-all transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Comprehensive Report</span>
            </button>
          </div>

          {/* Primary Patient Diagnosis */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {selectedCase.diagnosis}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
              {selectedCase.executiveSummary}
            </p>
          </div>

          {/* Key Clinical Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Primary Driver Gene
              </span>
              <div className="text-xl font-extrabold text-cyan-400 font-mono mt-1">
                {selectedCase.primaryGene}
              </div>
              <span className="text-[11px] text-slate-300">
                {selectedCase.primaryVariant}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Digital Twin In-Silico
              </span>
              <div className="text-xl font-extrabold text-purple-400 font-mono mt-1">
                -78% Volume
              </div>
              <span className="text-[11px] text-slate-300">
                36-Wk Target Regression
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Tumor Purity & TMB
              </span>
              <div className="text-xl font-extrabold text-emerald-400 font-mono mt-1">
                {selectedCase.tumorPurity}
              </div>
              <span className="text-[11px] text-slate-300">
                TMB: {selectedCase.tmb}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Targeted Match
              </span>
              <div className="text-xl font-extrabold text-rose-400 font-mono mt-1">
                {selectedCase.recommendedDrugs[0].split(' ')[0]}
              </div>
              <span className="text-[11px] text-slate-300">
                {selectedCase.matchedTrialIds.length} Recruiting Trials
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Pillar 0: Digital Twin & Wearables */}
        <div 
          onClick={() => setActiveTab('digitaltwin')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-cyan-500/40 bg-gradient-to-b from-cyan-950/20 to-slate-900/80 cursor-pointer space-y-3 group shadow-glow-cyan"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
            <Watch className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
              <span>Digital Twin & Wearables</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Live IoT telemetry sync, dose-response simulation, and febrile neutropenia alarm.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-xs font-bold text-cyan-400 font-mono pt-1">
            <span>Launch Simulation</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pillar 1: 3D Structure */}
        <div 
          onClick={() => setActiveTab('structure3d')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">
              3D AlphaFold Viewer
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Atomic coordinate surfaces, active pockets, and mutation hotspots in WebGL 3D.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-xs font-bold text-cyan-400 font-mono pt-1">
            <span>Explore 3D Pocket</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pillar 2: Variant Pathogenicity */}
        <div 
          onClick={() => setActiveTab('variant')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white group-hover:text-purple-300 transition-colors">
              Variant Pathogenicity
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              AlphaMissense deep scoring, ClinVar classification, and population frequencies.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-xs font-bold text-purple-400 font-mono pt-1">
            <span>Predict Impact</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pillar 3: Drug Discovery */}
        <div 
          onClick={() => setActiveTab('drugs')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors">
              Targeted Therapeutics
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Small molecule binding affinities ($IC_{50}$), SMILES chemistry, and resistance bypass.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-xs font-bold text-emerald-400 font-mono pt-1">
            <span>Analyze Chemistry</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pillar 4: Clinical Trials */}
        <div 
          onClick={() => setActiveTab('trials')}
          className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 cursor-pointer space-y-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white group-hover:text-rose-300 transition-colors">
              Trial Matcher
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Live recruiting oncology trials with inclusion criteria checklists and NCT protocols.
            </p>
          </div>
          <div className="flex items-center space-x-1 text-xs font-bold text-rose-400 font-mono pt-1">
            <span>Match Trials</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

    </div>
  );
};
