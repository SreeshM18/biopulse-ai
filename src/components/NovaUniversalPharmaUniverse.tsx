import React, { useState, useMemo } from 'react';
import { 
  Pill, 
  Search, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Brain, 
  Dna, 
  Activity, 
  ShieldCheck, 
  FileText, 
  Filter, 
  ChevronRight,
  Syringe,
  Skull,
  Award,
  Biohazard,
  Scan,
  Database,
  Building2,
  Lock,
  Snowflake,
  ExternalLink,
  Flame,
  Globe
} from 'lucide-react';
import { 
  UniversalSubstanceRecord, 
  ForensicToxRecord, 
  CounterfeitIntelligenceRecord,
  NovaSubstanceLegalStatus, 
  PharmaDosageForm,
  ReleaseKineticsType,
  TabletSubtype,
  CapsuleSubtype,
  PatientProfile, 
  TabType 
} from '../types/biotech';
import { 
  UNIVERSAL_SUBSTANCES_DATABASE, 
  NOVA_FORENSIC_TOX_DATABASE, 
  COUNTERFEIT_INTELLIGENCE_REGISTRY 
} from '../data/novaUniversalPharmaDatabase';
import { 
  universalPharmaEngine, 
  UniversalSearchResponse, 
  UniversalSearchResultItem 
} from '../utils/universalPharmaEngine';

interface NovaUniversalPharmaUniverseProps {
  patient?: PatientProfile;
  setActiveTab?: (tab: TabType) => void;
}

type MainExplorerSection = 'ALL_MEDICINES' | 'LEGAL_TIERS' | 'DOSAGE_FORMS' | 'INJECTIONS_10_ROUTES' | 'FORENSIC_TOX' | 'COUNTERFEIT_INTELLIGENCE';

export const NovaUniversalPharmaUniverse: React.FC<NovaUniversalPharmaUniverseProps> = ({
  patient,
  setActiveTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<MainExplorerSection>('ALL_MEDICINES');
  const [selectedLegalTier, setSelectedLegalTier] = useState<NovaSubstanceLegalStatus | 'ALL'>('ALL');
  const [selectedDosageForm, setSelectedDosageForm] = useState<PharmaDosageForm | 'ALL'>('ALL');
  
  // Selected detail modal/drawer
  const [selectedSubstance, setSelectedSubstance] = useState<UniversalSubstanceRecord | null>(UNIVERSAL_SUBSTANCES_DATABASE[0]);
  const [selectedForensic, setSelectedForensic] = useState<ForensicToxRecord | null>(null);
  const [selectedCounterfeit, setSelectedCounterfeit] = useState<CounterfeitIntelligenceRecord | null>(null);

  // Search Engine Evaluation
  const searchResponse: UniversalSearchResponse = useMemo(() => {
    return universalPharmaEngine.search(searchQuery);
  }, [searchQuery]);

  // Filtered Substances
  const filteredSubstances = useMemo(() => {
    return UNIVERSAL_SUBSTANCES_DATABASE.filter(sub => {
      const matchTier = selectedLegalTier === 'ALL' || sub.primaryLegalStatus === selectedLegalTier;
      const matchForm = selectedDosageForm === 'ALL' || sub.dosageForm === selectedDosageForm;
      return matchTier && matchForm;
    });
  }, [selectedLegalTier, selectedDosageForm]);

  const legalStatusBadges: { tier: NovaSubstanceLegalStatus; label: string; bg: string; text: string; border: string; desc: string }[] = [
    { tier: 'OTC', label: '🟢 OTC', bg: 'bg-emerald-950/80', text: 'text-emerald-300', border: 'border-emerald-500/40', desc: 'Non-prescription medicine where permitted' },
    { tier: 'Prescription', label: '🔵 Prescription', bg: 'bg-blue-950/80', text: 'text-blue-300', border: 'border-blue-500/40', desc: 'Requires authorized prescription' },
    { tier: 'Pharmacist-only', label: '🟡 Pharmacist / Specialist', bg: 'bg-yellow-950/80', text: 'text-yellow-300', border: 'border-yellow-500/40', desc: 'Professional pharmacist supervision' },
    { tier: 'High-alert', label: '🟠 High Alert', bg: 'bg-orange-950/80', text: 'text-orange-300', border: 'border-orange-500/40', desc: 'Legal but serious harm possible if misused' },
    { tier: 'Controlled', label: '🔴 Controlled', bg: 'bg-rose-950/80', text: 'text-rose-300', border: 'border-rose-500/40', desc: 'Legally restricted (Schedule II/IV narcotic risk)' },
    { tier: 'Hospital-only', label: '🟣 Hospital Only', bg: 'bg-purple-950/80', text: 'text-purple-300', border: 'border-purple-500/40', desc: 'Used in clinical/ICU inpatient settings' },
    { tier: 'Biologic', label: '🧬 Biologic', bg: 'bg-cyan-950/80', text: 'text-cyan-300', border: 'border-cyan-500/40', desc: 'Monoclonals, recombinant proteins, peptides' },
    { tier: 'Investigational', label: '🧪 Investigational', bg: 'bg-pink-950/80', text: 'text-pink-300', border: 'border-pink-500/40', desc: 'Clinical trial under study' },
    { tier: 'Illicit', label: '⚫ Illicit', bg: 'bg-slate-900', text: 'text-slate-300', border: 'border-slate-700', desc: 'Prohibited substances / Forensic registry' },
    { tier: 'Banned / Withdrawn', label: '🚫 Banned / Withdrawn', bg: 'bg-red-950/80', text: 'text-red-300', border: 'border-red-500/40', desc: 'Removed by regulatory authorities' },
    { tier: 'Counterfeit / Falsified', label: '⚠️ Counterfeit', bg: 'bg-amber-950/80', text: 'text-amber-300', border: 'border-amber-500/40', desc: 'Falsified batch / adulterated lot warning' },
    { tier: 'Toxic Chemical', label: '☠️ Toxic Chemical', bg: 'bg-red-950/90', text: 'text-red-400', border: 'border-red-600/50', desc: 'Industrial poison / Forensic toxicant' }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* =========================================================================
          TOP SHOWCASE BANNER & UNIVERSAL PHARMA PILLARS
          ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#070d24] via-[#091535] to-[#120a2e] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/50 flex items-center space-x-1.5 shadow-glow-cyan">
              <Pill className="w-3.5 h-3.5 animate-pulse" />
              <span>NOVA PHARMA MASTER UNIVERSE</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
              12 Legal Tiers • 41 Dosage Subtypes • 10 Injection Routes
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
              Verified Commercial Strengths (No Arbitrary Numbers)
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Universal Pharmaceutical Knowledge System</span>
              <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
              Every substance in NOVA is classified across <strong>12 legal and safety statuses</strong> (🟢 OTC, 🔵 Prescription, 🟡 Specialist, 🟠 High Alert, 🔴 Controlled, 🟣 Hospital Only, 🧬 Biologic, 🧪 Investigational, ⚫ Illicit, 🚫 Banned, ⚠️ Counterfeit, ☠️ Toxic Chemical) with verified country-by-country legal schedules and exact commercial formulation strengths.
            </p>
          </div>

          {/* Master Search Input Bar */}
          <div className="relative max-w-3xl pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-cyan-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type prefix (sil...), typo (paracetmol), symptom (fever), injection, or illegal stimulant..."
                className="w-full bg-[#040817]/90 border-2 border-cyan-500/40 focus:border-cyan-400 rounded-2xl pl-12 pr-28 py-3.5 text-sm text-white placeholder-slate-400 outline-none shadow-glow-cyan transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2.5 py-1 rounded-xl bg-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Keyword Prompt Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2.5 text-[11px] font-mono text-slate-400">
              <span className="text-slate-400 font-bold">Try typing:</span>
              {[
                { label: 'sil...', q: 'sil' },
                { label: 'paracetmol', q: 'paracetmol' },
                { label: 'fever', q: 'fever' },
                { label: 'injection', q: 'injection' },
                { label: 'fentanyl patch', q: 'fentanyl' },
                { label: 'semaglutide auto-injector', q: 'semaglutide' },
                { label: 'illegal stimulant', q: 'illegal stimulant' },
                { label: 'fake ozempic', q: 'fake ozempic' }
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => setSearchQuery(chip.q)}
                  className="px-2 py-0.5 rounded-lg bg-slate-900/90 hover:bg-cyan-950 text-cyan-300 hover:text-cyan-200 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEARCH ENGINE INTENT BANNER / TYPO CORRECTION ALERT
          ========================================================================= */}
      {searchQuery && (
        <div className="glass-card rounded-2xl p-4 border border-cyan-500/30 bg-[#060c22] space-y-2 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                INTENT: {searchResponse.intentCategory}
              </span>
              {searchResponse.correctedQuery && (
                <span className="text-xs font-mono text-amber-300 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Did you mean: <strong>{searchResponse.correctedQuery}</strong>?</span>
                </span>
              )}
            </div>
            <span className="text-xs font-mono text-slate-400">
              Found <strong>{searchResponse.resultsCount}</strong> verified records
            </span>
          </div>
          <p className="text-xs text-slate-400">{searchResponse.regulatoryDisclaimer}</p>
        </div>
      )}

      {/* =========================================================================
          NAVIGATION SECTION SELECTOR
          ========================================================================= */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'ALL_MEDICINES', label: '1. Master A–Z Catalog', icon: <Database className="w-4 h-4 text-cyan-400" /> },
          { id: 'LEGAL_TIERS', label: '2. 12 Legal Status Tiers', icon: <Lock className="w-4 h-4 text-emerald-400" /> },
          { id: 'DOSAGE_FORMS', label: '3. 41 Dosage Subtypes', icon: <Pill className="w-4 h-4 text-pink-400" /> },
          { id: 'INJECTIONS_10_ROUTES', label: '4. Injections (10 Routes)', icon: <Syringe className="w-4 h-4 text-purple-400" /> },
          { id: 'FORENSIC_TOX', label: '5. NOVA TOX / Forensic', icon: <Skull className="w-4 h-4 text-rose-500" /> },
          { id: 'COUNTERFEIT_INTELLIGENCE', label: '6. Counterfeit Watch', icon: <Scan className="w-4 h-4 text-amber-400" /> },
        ].map((tab) => {
          const isActive = selectedSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedSection(tab.id as MainExplorerSection);
                if (tab.id === 'FORENSIC_TOX') setSelectedForensic(NOVA_FORENSIC_TOX_DATABASE[0]);
                if (tab.id === 'COUNTERFEIT_INTELLIGENCE') setSelectedCounterfeit(COUNTERFEIT_INTELLIGENCE_REGISTRY[0]);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-600/30 text-white border border-cyan-400 shadow-glow-cyan font-black scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          SECTION 1 & 2: 12 LEGAL STATUS TIERS EXPLORER
          ========================================================================= */}
      {(selectedSection === 'LEGAL_TIERS' || selectedSection === 'ALL_MEDICINES') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter by 12 NOVA Legal & Safety Statuses</span>
            </span>
            {selectedLegalTier !== 'ALL' && (
              <button
                onClick={() => setSelectedLegalTier('ALL')}
                className="text-[11px] font-mono text-cyan-300 hover:underline"
              >
                Reset Filter (Show All)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {legalStatusBadges.map((badge) => {
              const isSelected = selectedLegalTier === badge.tier;
              return (
                <button
                  key={badge.tier}
                  onClick={() => setSelectedLegalTier(isSelected ? 'ALL' : badge.tier)}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${badge.bg} ${badge.border} ${
                    isSelected ? 'ring-2 ring-cyan-400 shadow-glow-cyan scale-105' : 'hover:scale-[1.02]'
                  }`}
                >
                  <span className={`text-xs font-black ${badge.text}`}>{badge.label}</span>
                  <span className="text-[10px] text-slate-400 line-clamp-1 mt-1">{badge.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          SEARCH RESULTS DISPLAY (WHEN USER HAS TYPED A QUERY)
          ========================================================================= */}
      {searchQuery && (
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {searchResponse.items.map((item) => (
              <div 
                key={item.id}
                onClick={() => {
                  if (item.verifiedRecord) setSelectedSubstance(item.verifiedRecord);
                  if (item.forensicRecord) setSelectedForensic(item.forensicRecord);
                  if (item.counterfeitRecord) setSelectedCounterfeit(item.counterfeitRecord);
                }}
                className="p-4 rounded-2xl bg-[#080e22] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400">{item.subtitle}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 border border-slate-700 text-cyan-300">
                    {item.badgeLabel}
                  </span>
                </div>

                {item.matchedStrengthsDisplay && (
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                    <strong>Strengths:</strong> {item.matchedStrengthsDisplay}
                  </div>
                )}

                {item.clinicalHighlight && (
                  <p className="text-xs text-slate-300 font-sans line-clamp-2">
                    {item.clinicalHighlight}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: SUBSTANCE MASTER CATALOG & MONOGRAPH VIEW
          ========================================================================= */}
      {(!searchQuery && (selectedSection === 'ALL_MEDICINES' || selectedSection === 'LEGAL_TIERS')) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Substance Cards List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono text-slate-400">
                Showing <strong>{filteredSubstances.length}</strong> Verified Products
              </span>
            </div>

            <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredSubstances.map((sub) => {
                const isSelected = selectedSubstance?.id === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubstance(sub)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-glow-cyan scale-[1.01]'
                        : 'bg-[#080d22] border-slate-800/90 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-black text-white">{sub.genericName}</h4>
                        <p className="text-xs text-slate-400">{sub.dosageForm} • {sub.releaseType}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 text-cyan-300 border border-cyan-500/40">
                        {sub.primaryLegalStatus}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
                      <span>Strengths:</span>
                      <span className="font-bold">{sub.concentrationDisplay || `${sub.strengthValue} ${sub.strengthUnit}`}</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-1">
                      {sub.approvedUses[0]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Comprehensive Pharmaceutical Monograph */}
          <div className="lg:col-span-7">
            {selectedSubstance ? (
              <div className="glass-card rounded-3xl p-6 border border-cyan-500/40 bg-[#070c20] space-y-6 shadow-2xl">
                
                {/* Monograph Header */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/50">
                        {selectedSubstance.therapeuticClass}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                        ATC: {selectedSubstance.atcCode || 'N/A'}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {selectedSubstance.genericName}
                    </h2>
                    <p className="text-xs text-slate-400">
                      Brand Names: {selectedSubstance.brandNames.join(', ')} • CAS: {selectedSubstance.casNumber}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase bg-slate-900 text-cyan-300 border border-cyan-400 shadow-glow-cyan">
                    {selectedSubstance.primaryLegalStatus}
                  </span>
                </div>

                {/* Formulation & Verified Strengths Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Dosage Form & Subtype</span>
                    <span className="text-white font-bold">{selectedSubstance.dosageForm} ({selectedSubstance.dosageSubtype || 'Standard'})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Release Kinetics</span>
                    <span className="text-purple-300 font-bold">{selectedSubstance.releaseType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Marketed Strengths</span>
                    <span className="text-emerald-400 font-bold">{selectedSubstance.concentrationDisplay || `${selectedSubstance.strengthValue} ${selectedSubstance.strengthUnit}`}</span>
                  </div>
                </div>

                {/* Country Legal Status Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Country-by-Country Legal Classification</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedSubstance.countryLegalClassifications.map((ctry) => (
                      <div key={ctry.countryCode} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                        <span className="font-bold text-white block">{ctry.countryName}</span>
                        <span className="text-cyan-300 font-mono text-[11px]">{ctry.scheduleDesignation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Mechanism & Indications */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">Mechanism of Action</h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    {selectedSubstance.mechanismOfAction}
                  </p>
                </div>

                {/* ADME Pharmacokinetics */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-purple-400 uppercase">ADME Pharmacokinetics Profile</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">Absorption</span>
                      <span className="text-white">{selectedSubstance.admeAbsorption}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">Distribution</span>
                      <span className="text-white">{selectedSubstance.admeDistribution}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">Metabolism</span>
                      <span className="text-white">{selectedSubstance.admeMetabolism}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">Excretion</span>
                      <span className="text-white">{selectedSubstance.admeExcretion}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[9px]">Half-Life</span>
                      <span className="text-cyan-300 font-bold">{selectedSubstance.admeHalfLife}</span>
                    </div>
                  </div>
                </div>

                {/* Safety Warnings & Antidotes */}
                {selectedSubstance.seriousAdverseEffects.length > 0 && (
                  <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-2">
                    <h4 className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Serious Adverse Effects & Boxed Warnings</span>
                    </h4>
                    <ul className="list-disc list-inside text-xs text-rose-200 space-y-1">
                      {selectedSubstance.seriousAdverseEffects.map((adv, idx) => (
                        <li key={idx}>{adv}</li>
                      ))}
                    </ul>
                    {selectedSubstance.specificAntidote && (
                      <div className="pt-2 border-t border-rose-500/30 text-xs font-mono text-emerald-300">
                        <strong>Specific Antidote:</strong> {selectedSubstance.specificAntidote}
                      </div>
                    )}
                  </div>
                )}

              </div>
            ) : (
              <div className="p-12 text-center text-slate-500">Select a substance to view monograph</div>
            )}
          </div>

        </div>
      )}

      {/* =========================================================================
          SECTION 4: INJECTIONS & PARENTERAL MATRIX (10 ROUTES)
          ========================================================================= */}
      {selectedSection === 'INJECTIONS_10_ROUTES' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-2">
            <h3 className="text-sm font-black text-white flex items-center space-x-2">
              <Syringe className="w-4 h-4 text-purple-400" />
              <span>Parenteral Injection & Infusion Safety Matrix</span>
            </h3>
            <p className="text-xs text-slate-300">
              NOVA classifies all 10 distinct parenteral injection routes. Formulations must NEVER be interchanged (e.g. Epidural vs Intravenous vs Intrathecal) due to fatal toxicity risks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { route: 'Intravenous (IV)', desc: 'Direct vascular access; 100% bioavailability' },
              { route: 'Intramuscular (IM)', desc: 'Vascular muscle depot (deltoid/gluteal)' },
              { route: 'Subcutaneous (SC)', desc: 'Adipose tissue depot (insulin/heparin)' },
              { route: 'Intradermal (ID)', desc: 'Dermal layer (allergy/TB tests)' },
              { route: 'Intra-articular', desc: 'Joint synovial space (steroids/HA)' },
              { route: 'Intrathecal', desc: 'Subarachnoid space (spinal anesthesia)' },
              { route: 'Epidural', desc: 'Epidural space (labor analgesia)' },
              { route: 'Intraosseous (IO)', desc: 'Bone marrow cavity (pediatric CPR)' },
              { route: 'Intravitreal', desc: 'Ocular vitreous cavity (anti-VEGF)' },
              { route: 'Intralesional', desc: 'Directly into cutaneous lesion' }
            ].map((r) => (
              <div key={r.route} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-xs font-black text-cyan-300 block">{r.route}</span>
                <span className="text-[10px] text-slate-400 block">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 5: NOVA TOX / FORENSIC DRUG DATABASE
          ========================================================================= */}
      {selectedSection === 'FORENSIC_TOX' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 space-y-2">
            <div className="flex items-center space-x-2">
              <Skull className="w-5 h-5 text-rose-500 animate-pulse" />
              <h3 className="text-sm font-black text-white">
                NOVA TOX / Forensic Drug & Illicit Substance Database
              </h3>
            </div>
            <p className="text-xs text-rose-200">
              Emergency toxicology profiles, street aliases, dependence risk scores, overdose warning signs, and reversal protocols. <strong>Strictly no manufacturing or recreational dosing information.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NOVA_FORENSIC_TOX_DATABASE.map((tox) => (
              <div
                key={tox.id}
                onClick={() => setSelectedForensic(tox)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  selectedForensic?.id === tox.id
                    ? 'bg-rose-950/40 border-rose-500 shadow-glow-cyan'
                    : 'bg-[#090e21] border-slate-800 hover:border-rose-500/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-black text-white">{tox.substanceName}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-rose-400 border border-rose-500/40">
                    {tox.legalClassification}
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  <strong>Street Aliases:</strong> {tox.streetAliases.join(', ')}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-300">
                  {tox.reversalAntidoteProtocol}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 6: COUNTERFEIT INTELLIGENCE REGISTRY
          ========================================================================= */}
      {selectedSection === 'COUNTERFEIT_INTELLIGENCE' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 space-y-2">
            <div className="flex items-center space-x-2">
              <Scan className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-black text-white">
                Counterfeit & Dark Pharmacy Intelligence Registry
              </h3>
            </div>
            <p className="text-xs text-amber-200">
              Active regulatory alerts from WHO, FDA, and CDSCO for falsified batches, toxic industrial solvent contaminations (DEG), and subpotent counterfeit products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COUNTERFEIT_INTELLIGENCE_REGISTRY.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCounterfeit(c)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  selectedCounterfeit?.id === c.id
                    ? 'bg-amber-950/40 border-amber-500 shadow-glow-cyan'
                    : 'bg-[#090e21] border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-black text-white">{c.suspectedBrandName}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-amber-300 border border-amber-500/40">
                    {c.falsifiedProductType}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-300">
                  <p><strong>Claimed:</strong> {c.claimedIngredientOnBox}</p>
                  <p className="text-rose-400 font-bold"><strong>Actual:</strong> {c.actualLabDetectedContent}</p>
                  <p className="text-slate-400 font-mono text-[11px]">{c.reportedLotBatch}</p>
                </div>

                <p className="text-xs text-amber-300 font-mono">{c.regulatoryAgencyAlert}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
