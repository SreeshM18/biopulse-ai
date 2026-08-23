import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Pill, 
  Activity, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Stethoscope, 
  Heart, 
  Brain, 
  Flame, 
  Eye, 
  Droplet, 
  Layers, 
  Syringe, 
  BookOpen, 
  Filter, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Info,
  X,
  Copy,
  Printer,
  FileCheck2,
  Atom,
  RefreshCw,
  QrCode,
  Tag,
  Building2,
  ArrowLeft
} from 'lucide-react';
import { MasterDrugRecord, VisualSafetyRiskTier, TabType } from '../types/biotech';
import { 
  executeUniversalMedSearch, 
  MedSearchFilterCategory, 
  SymptomDiseaseKnowledge 
} from '../utils/medSearchEngine';

interface NovaMedSearchProps {
  onSelectDrug?: (drug: MasterDrugRecord) => void;
  setActiveTab?: (tab: TabType) => void;
}

const POPULAR_SEARCH_PROMPTS = [
  { label: 'Paracetamol', query: 'paracetamol', tag: 'Generic' },
  { label: 'Viagra', query: 'viagra', tag: 'Brand ED' },
  { label: 'paracetmol (Typo)', query: 'paracetmol', tag: 'Fuzzy' },
  { label: 'Cold & Cough', query: 'cold', tag: 'Condition' },
  { label: 'Fever', query: 'fever', tag: 'Symptom' },
  { label: 'Period Pain', query: 'period pain', tag: 'Repro' },
  { label: 'Headache', query: 'headache', tag: 'Symptom' },
  { label: 'Asthma Inhaler', query: 'asthma', tag: 'Respiratory' },
  { label: 'Diabetes Injection', query: 'diabetes', tag: 'Endocrine' },
  { label: 'Vancomycin (MRSA)', query: 'vancomycin', tag: 'Hospital Rx' },
  { label: 'Eye Drops', query: 'eye drops', tag: 'Dosage Form' }
];

export const NovaMedSearch: React.FC<NovaMedSearchProps> = ({
  onSelectDrug,
  setActiveTab
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<MedSearchFilterCategory>('All');
  const [selectedDrugModal, setSelectedDrugModal] = useState<MasterDrugRecord | null>(null);
  const [modalTab, setModalTab] = useState<'overview' | 'interactions' | 'adme' | 'safety' | 'molecule3d'>('overview');

  const searchResults = useMemo(() => {
    return executeUniversalMedSearch(searchQuery);
  }, [searchQuery]);

  const handlePromptClick = (query: string) => {
    setSearchQuery(query);
  };

  const getRiskTierBadge = (tier: VisualSafetyRiskTier) => {
    switch (tier) {
      case 'ROUTINE':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">🟢 Routine OTC</span>;
      case 'PRESCRIPTION':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-950/80 text-blue-300 border border-blue-500/40">🔵 Prescription (Rx)</span>;
      case 'CAUTION':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">🟡 Clinical Caution</span>;
      case 'HIGH_ALERT':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-950/80 text-orange-300 border border-orange-500/40 animate-pulse">🟠 High Alert ⚠️</span>;
      case 'CONTROLLED_RISK':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">🔴 Controlled Substance</span>;
      case 'SPECIALIST_HOSPITAL':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">🟣 Specialist / Hospital Only</span>;
      case 'ILLICIT_TOXICOLOGY':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-slate-300 border border-slate-700">⚫ Forensic Record</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 text-slate-100 animate-fade-in">
      
      {/* 1. Google-like Universal Search Hero Box */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060c20] via-[#0b1739] to-[#060c20] border border-cyan-500/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5 text-center">
          
          {/* Header Tag */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-glow-cyan">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>NOVA MEDSEARCH • UNIVERSAL CLINICAL PHARMACEUTICAL ENGINE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Universal Medicine & Clinical Search
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Instant fuzzy search across generic drugs, brand names, symptoms, diseases, 40 dosage forms, drug classes, emergency antidotes, and safety protocols.
          </p>

          {/* Search Input Bar */}
          <div className="relative max-w-3xl mx-auto mt-6">
            <div className="relative flex items-center">
              <Search className="absolute left-4 sm:left-5 w-5 sm:w-6 h-5 sm:h-6 text-cyan-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicine, symptom, disease, brand, generic drug, injection, syrup..."
                className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 rounded-2xl bg-[#091024]/90 border-2 border-cyan-500/50 hover:border-cyan-400 focus:border-cyan-300 text-white placeholder-slate-400 text-sm sm:text-base outline-none shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Typo Correction Notification Banner */}
          {searchResults.detectedCorrection && (
            <div className="max-w-3xl mx-auto p-3 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 text-left flex items-center justify-between text-xs animate-fade-in shadow-glow-cyan">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Showing results for <strong className="text-cyan-300 underline cursor-pointer" onClick={() => setSearchQuery(searchResults.detectedCorrection!.corrected)}>{searchResults.detectedCorrection.corrected}</strong>
                  <span className="text-slate-400 ml-2">(searched for: "{searchResults.detectedCorrection.original}")</span>
                </span>
              </div>
              <button
                onClick={() => setSearchQuery(searchResults.detectedCorrection!.corrected)}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold hover:bg-cyan-500/30 transition-all text-[11px]"
              >
                Apply Correction
              </button>
            </div>
          )}

          {/* Quick-Click Search Prompt Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
            <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center">
              Popular:
            </span>
            {POPULAR_SEARCH_PROMPTS.map((prompt) => (
              <button
                key={prompt.label}
                onClick={() => handlePromptClick(prompt.query)}
                className="px-2.5 py-1 rounded-xl text-xs font-mono bg-slate-900/80 hover:bg-cyan-950/80 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-all flex items-center space-x-1"
              >
                <span>{prompt.label}</span>
                <span className="text-[9px] text-slate-500">[{prompt.tag}]</span>
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'All', label: 'All Results', count: searchResults.totalMatchesCount, icon: <Activity className="w-3.5 h-3.5" /> },
          { id: 'Medicines', label: 'Medicines', count: searchResults.matchedDrugs.length, icon: <Pill className="w-3.5 h-3.5 text-cyan-400" /> },
          { id: 'Conditions & Diseases', label: 'Conditions & Diseases', count: searchResults.matchedConditions.filter(c => c.category !== 'Symptom').length, icon: <Stethoscope className="w-3.5 h-3.5 text-blue-400" /> },
          { id: 'Symptoms', label: 'Symptoms', count: searchResults.matchedConditions.filter(c => c.category === 'Symptom').length, icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> },
          { id: 'Drug Classes', label: 'Drug Classes', count: searchResults.matchedDrugClasses.length, icon: <Layers className="w-3.5 h-3.5 text-purple-400" /> },
          { id: 'Brands', label: 'Brands', count: searchResults.matchedBrands.length, icon: <Tag className="w-3.5 h-3.5 text-pink-400" /> },
          { id: 'Dosage Forms', label: 'Dosage Forms', count: searchResults.matchedDosageForms.length, icon: <Droplet className="w-3.5 h-3.5 text-emerald-400" /> },
          { id: 'Emergency & Antidotes', label: 'Antidotes (NOVA TOX)', count: searchResults.matchedAntidotes.length, icon: <Flame className="w-3.5 h-3.5 text-rose-500" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as MedSearchFilterCategory)}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
              activeFilter === tab.id
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-glow-cyan'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeFilter === tab.id ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Search Results Section */}
      <div className="space-y-6">
        
        {/* Section A: Matched Symptoms & Diseases (Clinical Educational Safety Guidance) */}
        {(activeFilter === 'All' || activeFilter === 'Conditions & Diseases' || activeFilter === 'Symptoms') && searchResults.matchedConditions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <span>Clinical Conditions & Symptom Safety Profiles ({searchResults.matchedConditions.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.matchedConditions.map((cond) => (
                <div 
                  key={cond.id}
                  className="rounded-3xl bg-[#080e22] border border-cyan-500/30 p-5 space-y-4 shadow-xl hover:border-cyan-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        cond.category === 'Symptom' 
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40' 
                          : 'bg-blue-950/80 text-blue-300 border border-blue-500/40'
                      }`}>
                        {cond.category.toUpperCase()}: {cond.bodySystem}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Clinical Safety Dossier</span>
                    </div>

                    <h4 className="text-lg font-black text-white">{cond.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {cond.description}
                    </p>

                    {/* Common Treatment Categories */}
                    <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                        Common Medicine Categories Used:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cond.commonTreatmentCategories.map((cat, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Antibiotic Misuse Warning if present */}
                    {cond.antibioticMisuseWarning && (
                      <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs leading-relaxed font-medium">
                        {cond.antibioticMisuseWarning}
                      </div>
                    )}

                    {/* Red Flags / Emergency Warning Checklist */}
                    <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1.5 text-xs">
                      <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        <span>Red Flags (Seek Immediate Emergency Care):</span>
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-200 list-disc list-inside">
                        {cond.redFlagsEmergency.map((flag, idx) => (
                          <li key={idx}>{flag}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Clinical Guidance Notice */}
                    <p className="text-[11px] text-slate-400 italic">
                      💡 {cond.clinicalSafetyGuidance}
                    </p>
                  </div>

                  {/* Recommended Dosage Forms Pill Strip */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-slate-500">Available Forms:</span>
                    <div className="flex flex-wrap gap-1">
                      {cond.recommendedDosageForms.map((df, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">
                          {df}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section B: Matched Master Drug Monographs */}
        {(activeFilter === 'All' || activeFilter === 'Medicines') && searchResults.matchedDrugs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Pill className="w-4 h-4 text-cyan-400" />
              <span>Verified Pharmaceutical Monographs ({searchResults.matchedDrugs.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.matchedDrugs.map((drug) => (
                <div
                  key={drug.id}
                  className="rounded-3xl bg-[#080e22] border border-slate-800 hover:border-cyan-500/50 p-5 space-y-4 shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      {getRiskTierBadge(drug.visualRiskTier)}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                        {drug.substanceCategory}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-white flex items-center space-x-2">
                        <span>{drug.genericName}</span>
                      </h4>
                      <p className="text-xs text-cyan-400 font-mono">
                        Brands: {drug.brandNames.join(', ')}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      <span className="text-slate-500 block text-[10px]">DRUG CLASS</span>
                      <span className="text-slate-200 font-bold">{drug.drugClass}</span>
                    </div>

                    {/* Common Uses */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Common Indications</span>
                      <div className="flex flex-wrap gap-1">
                        {drug.indications.slice(0, 2).map((ind, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 text-[10px] font-medium border border-slate-800 truncate max-w-[240px]">
                            • {ind}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Available Dosage Forms */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">Dosage Forms ({drug.dosageForms.length})</span>
                      <div className="flex flex-wrap gap-1">
                        {drug.dosageForms.map((df, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 text-[10px] font-mono border border-cyan-500/20">
                            {df}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Black box or serious caution snippet */}
                    {drug.blackBoxWarnings && (
                      <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-[11px] leading-relaxed line-clamp-2">
                        {drug.blackBoxWarnings}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setSelectedDrugModal(drug);
                        if (onSelectDrug) onSelectDrug(drug);
                      }}
                      className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all shadow-glow-cyan flex items-center justify-center space-x-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Full Monograph</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDrugModal(drug);
                        setModalTab('interactions');
                      }}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
                      title="Check Interactions"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section C: Matched Poison & Emergency Antidotes */}
        {(activeFilter === 'All' || activeFilter === 'Emergency & Antidotes') && searchResults.matchedAntidotes.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Emergency Toxicological Antidotes (NOVA TOX) ({searchResults.matchedAntidotes.length})</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.matchedAntidotes.map((ant) => (
                <div
                  key={ant.id}
                  className="rounded-3xl bg-[#140810] border border-rose-500/40 p-5 space-y-3 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-950 text-rose-300 border border-rose-500/40">
                      EMERGENCY ANTIDOTE PROTOCOL
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-400">{ant.poisonControlCode}</span>
                  </div>

                  <h4 className="text-base font-black text-white">{ant.toxinName}</h4>

                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">PRIMARY ANTIDOTE</span>
                    <span className="text-sm font-black text-emerald-300">{ant.primaryAntidote}</span>
                    <p className="text-xs text-slate-300 font-mono mt-1">{ant.antidoteDoseProtocol}</p>
                  </div>

                  <div className="text-[11px] text-slate-300 leading-relaxed">
                    <strong>Mechanism:</strong> {ant.mechanismOfNeutralization}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 4. Full Medicine Monograph Modal */}
      {selectedDrugModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-start justify-center p-2 sm:p-6 pt-10 sm:pt-6 pb-20 animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[86dvh] sm:max-h-[90vh] bg-[#070b18] text-slate-100 border border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Top Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedDrugModal(null)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <div className="hidden sm:flex items-center space-x-2 ml-2">
                  <Pill className="w-4 h-4 text-cyan-400" />
                  <span className="font-extrabold text-sm text-white">{selectedDrugModal.genericName}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {getRiskTierBadge(selectedDrugModal.visualRiskTier)}
                <button
                  onClick={() => setSelectedDrugModal(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center space-x-2 px-6 py-2.5 bg-[#091024] border-b border-slate-800 overflow-x-auto shrink-0">
              {[
                { id: 'overview', label: 'Clinical Overview', icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: 'interactions', label: `Interactions (${selectedDrugModal.interactions.length})`, icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> },
                { id: 'safety', label: 'Special Populations & Safety', icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> },
                { id: 'adme', label: 'ADME Pharmacokinetics', icon: <Activity className="w-3.5 h-3.5 text-purple-400" /> },
                { id: 'molecule3d', label: '3D Molecular Canvas', icon: <Atom className="w-3.5 h-3.5 text-cyan-400" /> }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setModalTab(t.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    modalTab === t.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 overscroll-contain">
              
              {/* Tab: Overview */}
              {modalTab === 'overview' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <h3 className="text-xl font-black text-white">{selectedDrugModal.genericName}</h3>
                    <p className="text-xs text-cyan-300 font-mono">Brand Names: {selectedDrugModal.brandNames.join(', ')}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedDrugModal.mechanismOfAction}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                      <span className="font-bold text-cyan-400 uppercase tracking-wider block">Medical Indications</span>
                      <ul className="space-y-1 list-disc list-inside text-slate-200">
                        {selectedDrugModal.indications.map((ind, i) => <li key={i}>{ind}</li>)}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
                      <span className="font-bold text-cyan-400 uppercase tracking-wider block">Available Strengths & Forms</span>
                      <div className="space-y-1 text-slate-300">
                        <div><strong>Strengths:</strong> {selectedDrugModal.availableStrengths.join(', ')}</div>
                        <div><strong>Forms:</strong> {selectedDrugModal.dosageForms.join(', ')}</div>
                        <div><strong>Routes:</strong> {selectedDrugModal.routes.join(', ')}</div>
                      </div>
                    </div>
                  </div>

                  {selectedDrugModal.blackBoxWarnings && (
                    <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/50 text-rose-200 text-xs leading-relaxed space-y-1">
                      <span className="font-black text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Boxed Warning</span>
                      </span>
                      <p>{selectedDrugModal.blackBoxWarnings}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Interactions */}
              {modalTab === 'interactions' && (
                <div className="space-y-4 text-xs">
                  <h4 className="font-bold text-white uppercase font-mono">Drug-Drug, Food & Disease Interaction Engine</h4>
                  <div className="space-y-3">
                    {selectedDrugModal.interactions.map((int, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{int.targetName}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            int.severity === 'CONTRAINDICATED_CRITICAL' || int.severity === 'MAJOR' 
                              ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          }`}>
                            {int.severity} [{int.targetType}]
                          </span>
                        </div>
                        <p className="text-slate-300">{int.mechanism}</p>
                        <p className="text-cyan-300 font-mono"><strong>Action:</strong> {int.clinicalAction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Safety & Special Populations */}
              {modalTab === 'safety' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-cyan-400 uppercase">Pregnancy & Lactation</span>
                    <p><strong>Category:</strong> {selectedDrugModal.pregnancyCategory}</p>
                    <p className="text-slate-300">{selectedDrugModal.lactationSafety}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-cyan-400 uppercase">Pediatric Considerations</span>
                    <p className="text-slate-300">{selectedDrugModal.pediatricDosingRule}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-cyan-400 uppercase">Geriatric (Beers Criteria)</span>
                    <p className="text-slate-300">{selectedDrugModal.geriatricBeersWarning}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                    <span className="font-bold text-cyan-400 uppercase">Renal & Hepatic Adjustments</span>
                    <p><strong>Renal:</strong> {selectedDrugModal.renalAdjustmentGFR}</p>
                    <p><strong>Hepatic:</strong> {selectedDrugModal.hepaticAdjustment}</p>
                  </div>
                </div>
              )}

              {/* Tab: ADME */}
              {modalTab === 'adme' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block">Absorption</span>
                    <span className="text-slate-200">{selectedDrugModal.adme.absorption}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block">Bioavailability</span>
                    <span className="text-slate-200">{selectedDrugModal.adme.bioavailability}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block">Distribution & Binding</span>
                    <span className="text-slate-200">{selectedDrugModal.adme.proteinBinding}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block">Metabolism & Enzymes</span>
                    <span className="text-slate-200">{selectedDrugModal.adme.metabolism}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block">Excretion & Half-Life</span>
                    <span className="text-slate-200">{selectedDrugModal.adme.halfLife} • {selectedDrugModal.adme.excretion}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <span className="text-slate-500 uppercase text-[10px] block">Therapeutic Window</span>
                    <span className="text-cyan-300 font-bold">{selectedDrugModal.adme.therapeuticWindow}</span>
                  </div>
                </div>
              )}

              {/* Tab: 3D Molecule */}
              {modalTab === 'molecule3d' && (
                <div className="p-6 rounded-3xl bg-slate-950 border border-cyan-500/40 text-center space-y-3">
                  <Atom className="w-12 h-12 text-cyan-400 mx-auto animate-spin" />
                  <h4 className="text-sm font-black text-white font-mono">{selectedDrugModal.chemicalName}</h4>
                  <p className="text-xs text-cyan-300 font-mono">Formula: {selectedDrugModal.molecularFormula} • MW: {selectedDrugModal.molecularWeight} g/mol</p>
                  <p className="text-xs text-slate-400 font-mono">SMILES: {selectedDrugModal.smilesNotation}</p>
                </div>
              )}

            </div>

            {/* Modal Bottom Footer */}
            <div className="sticky bottom-0 z-20 px-6 py-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-[11px] font-mono text-slate-400">GS1 Barcode: {selectedDrugModal.barcodeGS1}</span>
              <button
                onClick={() => setSelectedDrugModal(null)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all shadow-glow-cyan"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
