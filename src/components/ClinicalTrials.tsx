import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  MapPin, 
  Building2, 
  Users, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  Filter,
  Award
} from 'lucide-react';
import { CLINICAL_TRIALS_DATABASE } from '../data/clinicalTrials';
import { ClinicalTrial } from '../types/biotech';

interface ClinicalTrialsProps {
  currentBiomarker?: string;
}

export const ClinicalTrials: React.FC<ClinicalTrialsProps> = ({ currentBiomarker }) => {
  const [searchTerm, setSearchTerm] = useState<string>(currentBiomarker || '');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeTrial, setActiveTrial] = useState<ClinicalTrial>(CLINICAL_TRIALS_DATABASE[0]);

  const filteredTrials = CLINICAL_TRIALS_DATABASE.filter((trial) => {
    const matchesSearch = 
      searchTerm === '' ||
      trial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.cancerType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.biomarkers.some(b => b.toLowerCase().includes(searchTerm.toLowerCase())) ||
      trial.nctId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPhase = selectedPhase === 'All' || trial.phase.includes(selectedPhase);
    const matchesStatus = selectedStatus === 'All' || trial.status === selectedStatus;

    return matchesSearch && matchesPhase && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2">
              <FlaskConical className="w-6 h-6 text-cyan-400" />
              <span>Precision Clinical Trial & Biomarker Matcher</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Automated patient-to-trial recruitment engine querying verified active global oncology trials.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {filteredTrials.length} Matches Found
            </span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by Biomarker (e.g. KRAS G12D, EGFR)..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Phases</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Statuses</option>
            <option value="Recruiting">Recruiting Only</option>
            <option value="Active, not recruiting">Active, Not Recruiting</option>
          </select>
        </div>
      </div>

      {/* Main Split View: Trial List + Deep Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Matched Trials List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredTrials.map((trial) => {
            const isSelected = activeTrial.nctId === trial.nctId;
            return (
              <div
                key={trial.nctId}
                onClick={() => setActiveTrial(trial)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400/80 shadow-glow-cyan scale-[1.01]'
                    : 'glass-card border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      {trial.nctId}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      trial.status === 'Recruiting'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {trial.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs font-mono font-extrabold text-cyan-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{trial.matchScore}% Match</span>
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 mb-2">
                  {trial.title}
                </h4>

                <div className="flex flex-wrap gap-1 mb-2">
                  {trial.biomarkers.map((b, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-purple-950/60 text-purple-300 border border-purple-500/30">
                      {b}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800/60">
                  <span>{trial.phase}</span>
                  <span>Target: {trial.enrollment} Patients</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 7 Cols: Active Trial Comprehensive Dossier */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
            
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {activeTrial.nctId}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {activeTrial.phase}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Started: {activeTrial.startDate}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                {activeTrial.title}
              </h3>
            </div>

            {/* Trial Key Data Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
                  <Building2 className="w-3 h-3 text-cyan-400" />
                  <span>Lead Sponsor</span>
                </span>
                <div className="text-xs font-bold text-white mt-1 line-clamp-1">
                  {activeTrial.leadSponsor}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
                  <Users className="w-3 h-3 text-purple-400" />
                  <span>Enrollment</span>
                </span>
                <div className="text-xs font-bold text-white mt-1">
                  {activeTrial.enrollment} Enrollees
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Primary Agent</span>
                </span>
                <div className="text-xs font-bold text-emerald-300 mt-1 line-clamp-1">
                  {activeTrial.primaryDrug}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-slate-300">Clinical Protocol Overview:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeTrial.briefSummary}
              </p>
            </div>

            {/* Eligibility Criteria Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-200">Patient Eligibility & Inclusion Checklist:</span>
              <div className="space-y-2">
                {activeTrial.eligibilityCriteria.map((crit, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trial Sites */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Active Participating Medical Centers:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {activeTrial.locations.map((loc, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700">
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Link out to ClinicalTrials.gov */}
            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <a
                href={`https://clinicaltrials.gov/study/${activeTrial.nctId}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-glow-cyan"
              >
                <span>View Full Protocol on ClinicalTrials.gov</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
