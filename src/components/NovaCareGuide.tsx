import React, { useState, useMemo } from 'react';
import { 
  HeartHandshake, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  Heart, 
  ShieldAlert, 
  Pill, 
  Activity, 
  Baby, 
  CheckCircle2, 
  HelpCircle, 
  Flame, 
  Clock, 
  Info, 
  Droplet, 
  FileText, 
  Printer, 
  ExternalLink, 
  ChevronRight, 
  Layers, 
  Dna, 
  ChevronDown, 
  ChevronUp,
  Stethoscope,
  Maximize2
} from 'lucide-react';
import { 
  PatientProfile, 
  TabType, 
  CareGuideSymptomRecord, 
  ContraceptionMethodRecord, 
  ComprehensiveClinicalMonograph, 
  BodyPartSystemRecord,
  VerifiedDrugStrengthFormulation
} from '../types/biotech';
import { 
  CAREGUIDE_SYMPTOMS_DATABASE,
  CONTRACEPTION_METHODS_DATABASE,
  SEXUAL_HEALTH_TOPICS_DATABASE,
  BODY_PARTS_DATABASE,
  COMPREHENSIVE_MONOGRAPHS_DATABASE,
  parseNaturalCareGuideQuery,
  CareGuideIntentType
} from '../utils/careGuideEngine';

interface NovaCareGuideProps {
  patient?: PatientProfile;
  setActiveTab?: (tab: TabType) => void;
  initialQuery?: string;
}

type CareGuideTab = 
  | 'symptoms' 
  | 'sexual_health' 
  | 'emergency_contra' 
  | 'strength_monographs' 
  | 'body_parts';

export const NovaCareGuide: React.FC<NovaCareGuideProps> = ({
  patient,
  setActiveTab,
  initialQuery = 'I have fever'
}) => {
  const [activeTab, setActiveTabLocal] = useState<CareGuideTab>('symptoms');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedSymptom, setSelectedSymptom] = useState<CareGuideSymptomRecord>(CAREGUIDE_SYMPTOMS_DATABASE[0]);
  const [selectedContraception, setSelectedContraception] = useState<ContraceptionMethodRecord>(CONTRACEPTION_METHODS_DATABASE[0]);
  const [selectedMonograph, setSelectedMonograph] = useState<ComprehensiveClinicalMonograph>(COMPREHENSIVE_MONOGRAPHS_DATABASE[0]);
  const [selectedFormulationIndex, setSelectedFormulationIndex] = useState<number>(0);
  const [selectedStrengthIndex, setSelectedStrengthIndex] = useState<number>(0);
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPartSystemRecord>(BODY_PARTS_DATABASE[0]);
  const [emergencyProtocolActive, setEmergencyProtocolActive] = useState<boolean>(false);
  const [aiSummary, setAiSummary] = useState<string | null>('Showing clinical guidance for common symptoms & verified pharmacological monographs. Type any problem or medicine name above.');
  const [matchedTitle, setMatchedTitle] = useState<string | null>('Symptom & Medication Hub');

  // Active Formulation & Strength calculation
  const activeFormulation: VerifiedDrugStrengthFormulation = useMemo(() => {
    return selectedMonograph.formulations[selectedFormulationIndex] || selectedMonograph.formulations[0];
  }, [selectedMonograph, selectedFormulationIndex]);

  const activeStrength = useMemo(() => {
    return activeFormulation.availableStrengths[selectedStrengthIndex] || activeFormulation.availableStrengths[0];
  }, [activeFormulation, selectedStrengthIndex]);

  // Handle Natural Language Query Submit
  const handleExecuteSearch = (query: string) => {
    setSearchQuery(query);
    const parsed = parseNaturalCareGuideQuery(query);
    setAiSummary(parsed.directAnswerSummary || null);
    setMatchedTitle(parsed.primaryMatchTitle);

    switch (parsed.intentType) {
      case 'SEXUAL_HEALTH_OR_CONTRACEPTION':
        if (parsed.emergencyFailProtocolActive) {
          setEmergencyProtocolActive(true);
          setActiveTabLocal('emergency_contra');
        } else {
          setActiveTabLocal('sexual_health');
        }
        if (parsed.contraceptionRecord) setSelectedContraception(parsed.contraceptionRecord);
        break;

      case 'DRUG_MONOGRAPH':
        setActiveTabLocal('strength_monographs');
        if (parsed.monographRecord) {
          setSelectedMonograph(parsed.monographRecord);
          setSelectedFormulationIndex(0);

          // Auto-select exact target strength if mentioned (e.g. 50 mg)
          if (parsed.targetStrengthValue !== undefined) {
            const form = parsed.monographRecord.formulations[0];
            if (form) {
              const matchedStrIdx = form.availableStrengths.findIndex(s => s.strengthValue === parsed.targetStrengthValue);
              if (matchedStrIdx >= 0) {
                setSelectedStrengthIndex(matchedStrIdx);
              } else {
                setSelectedStrengthIndex(0);
              }
            }
          } else {
            setSelectedStrengthIndex(0);
          }
        }
        break;

      case 'BODY_PART_ORGAN':
        setActiveTabLocal('body_parts');
        if (parsed.bodyPartRecord) setSelectedBodyPart(parsed.bodyPartRecord);
        break;

      case 'SYMPTOM_GUIDANCE':
      default:
        setActiveTabLocal('symptoms');
        if (parsed.symptomRecord) setSelectedSymptom(parsed.symptomRecord);
        break;
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 text-slate-100 animate-fade-in print:text-black">
      
      {/* 1. Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060f26] via-[#091a4a] to-[#060f26] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
              <HeartHandshake className="w-6 h-6 animate-pulse" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
              NOVA CAREGUIDE • CLINICAL PROBLEM & MEDICATION GUIDANCE
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            "What can I take for this?" Medical Navigator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Natural language clinical guidance covering common problems (fever, cold, headache, period pain, acidity), sexual health & condoms, 10-tier contraception, emergency failure protocols, organ systems, and database-verified medicine strength selectors.
          </p>

          {/* Search Bar Input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleExecuteSearch(searchQuery);
            }}
            className="relative flex items-center gap-2 pt-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask naturally: 'I have fever', 'headache and cold', 'period cramps', 'having sex what precautions', 'condom broke', 'what is sildenafil 50 mg'..."
                className="w-full bg-slate-950/90 border border-cyan-500/50 focus:border-cyan-400 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 outline-none shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-glow-cyan shrink-0 flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Guide Me</span>
            </button>
          </form>

          {/* Preset Quick Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-thin">
            <span className="text-slate-400 font-bold shrink-0">Try Asking:</span>
            {[
              'I have fever',
              'Headache and cold',
              'Period cramps',
              'Having sex what precautions',
              'Condom broke',
              'What is sildenafil 50 mg',
              'Acidity & GERD',
              'Allergy & hives',
              'Asthma wheezing',
              'Eye drops',
              'Stomach'
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleExecuteSearch(chip)}
                className="px-2.5 py-1 rounded-xl bg-slate-900/90 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 shrink-0 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* AI Direct Guidance Summary Card */}
          {aiSummary && (
            <div className="p-4 rounded-2xl bg-[#030818]/95 border-2 border-cyan-400 shadow-glow-cyan space-y-2 animate-fade-in text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/50 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>AI CLINICAL GUIDANCE DOSSIER</span>
                  </span>
                  {matchedTitle && (
                    <span className="text-white font-black">{matchedTitle}</span>
                  )}
                </div>
                <button
                  onClick={() => setAiSummary(null)}
                  className="text-[10px] font-mono text-slate-400 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                {aiSummary}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'symptoms', label: '1. Common Symptoms & Relief', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
          { id: 'sexual_health', label: '2. Sexual Health & 10 Contraception Tiers', icon: <Heart className="w-4 h-4 text-pink-400" /> },
          { id: 'emergency_contra', label: '3. 🚨 Emergency Contraception Protocol', icon: <AlertTriangle className="w-4 h-4 text-amber-400" /> },
          { id: 'strength_monographs', label: '4. 💊 Monograph & Exact Strength Selector', icon: <Pill className="w-4 h-4 text-emerald-400" /> },
          { id: 'body_parts', label: '5. 🫀 Body Part & Organ Navigator', icon: <Layers className="w-4 h-4 text-purple-400" /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTabLocal(tab.id as CareGuideTab);
                if (tab.id === 'emergency_contra') setEmergencyProtocolActive(true);
              }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow-cyan font-black scale-105'
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
          TAB 1: COMMON SYMPTOMS & TREATMENT GUIDANCE
          ========================================================================= */}
      {activeTab === 'symptoms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Symptoms List (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Select Problem / Symptom ({CAREGUIDE_SYMPTOMS_DATABASE.length})
            </h3>
            <div className="space-y-2">
              {CAREGUIDE_SYMPTOMS_DATABASE.map((sym) => {
                const isSelected = selectedSymptom.id === sym.id;
                return (
                  <button
                    key={sym.id}
                    onClick={() => setSelectedSymptom(sym)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-glow-cyan text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{sym.symptomName}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                        {sym.category.split('/')[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Symptom Detail Dossier (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-3xl bg-[#080f26] border border-cyan-500/40 space-y-6 shadow-2xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    {selectedSymptom.category}
                  </span>
                  <h2 className="text-xl font-black text-white">{selectedSymptom.symptomName}</h2>
                </div>
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-500/30 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Care Sheet</span>
                </button>
              </div>

              {/* Overview */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {selectedSymptom.briefOverview}
              </p>

              {/* Commonly Used Medicine Categories */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Pill className="w-4 h-4" />
                  <span>Commonly Used Medicine Categories (Verified Database)</span>
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {selectedSymptom.commonlyUsedMedicineCategories.map((cat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-white">{cat.categoryName}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          cat.prescriptionRequirement === 'OTC' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                          'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {cat.prescriptionRequirement}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                        <strong>Role:</strong> {cat.pharmacologicalRole}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[10px] font-mono text-slate-400">Examples:</span>
                        {cat.representativeExamples.map((ex, i) => (
                          <button
                            key={i}
                            onClick={() => handleExecuteSearch(ex)}
                            className="px-2 py-0.5 rounded-lg bg-slate-950 text-cyan-300 text-[10px] font-mono border border-slate-800 hover:border-cyan-400 transition-colors"
                          >
                            {ex} ➔
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Self-Care & Evidence-Based Measures */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                <h4 className="text-xs font-bold text-cyan-300 uppercase font-mono flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Evidence-Based Self-Care & Supportive Measures</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc">
                  {selectedSymptom.evidenceBasedSelfCareMeasures.map((measure, i) => (
                    <li key={i} className="leading-relaxed">{measure}</li>
                  ))}
                </ul>
              </div>

              {/* Pediatric & Pregnancy Notes if present */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {selectedSymptom.pediatricCareNotes && (
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-pink-400 font-bold uppercase block">Pediatric Consideration:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{selectedSymptom.pediatricCareNotes}</p>
                  </div>
                )}
                {selectedSymptom.pregnancyCareNotes && (
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">Pregnancy Consideration:</span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{selectedSymptom.pregnancyCareNotes}</p>
                  </div>
                )}
              </div>

              {/* Emergency Red Flags Checklist */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/50 space-y-2">
                <h4 className="text-xs font-black text-rose-400 uppercase font-mono flex items-center space-x-1.5">
                  <AlertOctagon className="w-4 h-4 text-rose-400" />
                  <span>Emergency Red Flags — Seek Urgent Medical Evaluation If:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-200 pl-4 list-disc">
                  {selectedSymptom.emergencyRedFlagsChecklist.map((flag, i) => (
                    <li key={i} className="leading-relaxed">{flag}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: SEXUAL HEALTH & 10 CONTRACEPTION TIERS
          ========================================================================= */}
      {activeTab === 'sexual_health' && (
        <div className="space-y-6">
          
          {/* Sexual Health Essentials Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-950 border border-pink-500/40 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-pink-950 text-pink-300 border border-pink-500/40">
                SEXUAL HEALTH & PROTECTION GUIDELINES
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {SEXUAL_HEALTH_TOPICS_DATABASE[0].topicTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {SEXUAL_HEALTH_TOPICS_DATABASE[0].shortSummary}
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {SEXUAL_HEALTH_TOPICS_DATABASE[0].keyPillars.map((pillar, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                  <h4 className="text-xs font-bold text-pink-400">{pillar.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{pillar.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 10 Contraception Tiers Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Contraceptive Methods Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                10 Contraception Categories
              </h3>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                {CONTRACEPTION_METHODS_DATABASE.map((method) => {
                  const isSelected = selectedContraception.id === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedContraception(method)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all ${
                        isSelected
                          ? 'bg-pink-950/60 border-pink-400 shadow-glow-purple text-white'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs">{method.methodName}</div>
                      <div className="flex items-center justify-between text-[10px] font-mono mt-1 text-slate-400">
                        <span>{method.category}</span>
                        <span className={method.providesStiProtection ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          STI Protection: {method.providesStiProtection ? 'YES' : 'NO'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Method Clinical Dossier (8 Cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-6 rounded-3xl bg-[#0b0818] border border-pink-500/40 space-y-6 shadow-2xl">
                
                {/* Method Title */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-pink-950 text-pink-300 border border-pink-500/40">
                      {selectedContraception.category}
                    </span>
                    <h2 className="text-xl font-black text-white">{selectedContraception.methodName}</h2>
                  </div>
                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                    selectedContraception.providesStiProtection 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}>
                    {selectedContraception.providesStiProtection ? '🛡️ DUAL PROTECTION (STIs + Pregnancy)' : '⚠️ NO STI PROTECTION'}
                  </span>
                </div>

                {/* Efficacy & How It Works */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Pregnancy Prevention Efficacy:</span>
                    <p className="font-bold text-white text-xs">{selectedContraception.pregnancyPreventionRate}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">Duration of Action:</span>
                    <p className="font-bold text-white text-xs">{selectedContraception.durationOfEfficacy}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs leading-relaxed text-slate-300">
                  <strong className="text-white block">How It Works:</strong>
                  <p>{selectedContraception.howItWorks}</p>
                  <p className="text-slate-400 text-[11px] pt-1">
                    <strong>STI Coverage Detail:</strong> {selectedContraception.stiProtectionExplanation}
                  </p>
                </div>

                {/* Advantages & Disadvantages Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <h4 className="font-bold text-emerald-300 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Clinical Advantages</span>
                    </h4>
                    <ul className="space-y-1 text-[11px] text-slate-300 list-disc pl-4">
                      {selectedContraception.advantages.map((adv, i) => (
                        <li key={i}>{adv}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                    <h4 className="font-bold text-amber-300 flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Disadvantages & Considerations</span>
                    </h4>
                    <ul className="space-y-1 text-[11px] text-slate-300 list-disc pl-4">
                      {selectedContraception.disadvantages.map((dis, i) => (
                        <li key={i}>{dis}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Serious Warnings & Side Effects */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                  <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block">
                    Important Warnings & Side Effects:
                  </span>
                  <div className="space-y-1 text-slate-300 text-[11px]">
                    <p><strong>Common Effects:</strong> {selectedContraception.commonSideEffects.join(', ')}</p>
                    <p className="text-rose-300"><strong>Serious Warnings:</strong> {selectedContraception.seriousWarnings.join(' ')}</p>
                    <p className="text-slate-400"><strong>Medical Review Required If:</strong> {selectedContraception.whoMayNeedMedicalReview}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 3: EMERGENCY CONTRACEPTION & FAILURE PROTOCOL ("CONDOM BROKE")
          ========================================================================= */}
      {activeTab === 'emergency_contra' && (
        <div className="space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#240810] via-[#1a0815] to-[#0d040a] border border-rose-500/60 space-y-6 shadow-2xl">
            
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                <AlertOctagon className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                  TIME-CRITICAL EMERGENCY PROTOCOL
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-white mt-1">
                  Contraception Failure / Unprotected Incident Protocol
                </h2>
              </div>
            </div>

            {/* Time Critical Window Bar */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <span className="text-rose-300 font-bold flex items-center space-x-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Time-Sensitive Action Window: <strong>Within 24 to 72 Hours</strong> (Up to 120h for Ulipristal / Copper IUD)</span>
              </span>
              <span className="text-slate-400 text-[11px]">Efficacy is highest the sooner taken</span>
            </div>

            {/* Action Steps */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-white uppercase font-mono">
                Immediate Clinical Step-by-Step Actions:
              </h3>
              <div className="space-y-2 text-xs text-slate-200">
                {SEXUAL_HEALTH_TOPICS_DATABASE[0].emergencyProtocol?.recommendedActionSteps.map((step, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 leading-relaxed font-medium">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contraception vs Abortion Distinction */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 space-y-1.5 text-xs text-amber-200">
              <h4 className="font-bold text-amber-300 uppercase font-mono">
                Essential Clinical Distinction:
              </h4>
              <p className="leading-relaxed">
                {SEXUAL_HEALTH_TOPICS_DATABASE[0].emergencyProtocol?.distinctionVsAbortion}
              </p>
            </div>

            {/* Comparison of Emergency Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Option 1: Levonorgestrel 1.5mg</span>
                <p className="text-slate-300 text-[11px]">Best within 72 hours. Available OTC in most pharmacies without prescription.</p>
                <span className="text-[10px] font-mono text-emerald-400 block font-bold">OTC Single Dose</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">Option 2: Ulipristal Acetate 30mg</span>
                <p className="text-slate-300 text-[11px]">Effective up to 120 hours (5 days). Superior efficacy if BMI &gt; 25-30 kg/m2.</p>
                <span className="text-[10px] font-mono text-amber-400 block font-bold">Prescription / Pharmacist</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-mono text-pink-400 uppercase font-bold block">Option 3: Copper IUD Placement</span>
                <p className="text-slate-300 text-[11px]">Inserted within 5 days by a clinician. &gt;99.9% efficacy + provides 10 years ongoing contraception.</p>
                <span className="text-[10px] font-mono text-cyan-400 block font-bold">Clinical Procedure</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 4: MONOGRAPHS WITH VERIFIED DATABASE STRENGTH SELECTORS
          ========================================================================= */}
      {activeTab === 'strength_monographs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Drug Selector (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Select Verified Medicine Monograph
            </h3>
            <div className="space-y-2">
              {COMPREHENSIVE_MONOGRAPHS_DATABASE.map((mono) => {
                const isSelected = selectedMonograph.id === mono.id;
                return (
                  <button
                    key={mono.id}
                    onClick={() => {
                      setSelectedMonograph(mono);
                      setSelectedFormulationIndex(0);
                      setSelectedStrengthIndex(0);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-glow-cyan text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{mono.genericName}</div>
                    <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                      Brands: {mono.brandNames.slice(0, 3).join(', ')}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      {mono.drugClass}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Comprehensive Medicine Dossier with Dynamic Strength Selector (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-3xl bg-[#080f26] border border-cyan-500/40 space-y-6 shadow-2xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      {selectedMonograph.drugClass}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800">
                      {selectedMonograph.legalPrescriptionClassification}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white">{selectedMonograph.genericName}</h2>
                  <p className="text-xs font-mono text-slate-400">
                    Common Brands: <strong className="text-cyan-300">{selectedMonograph.brandNames.join(' • ')}</strong>
                  </p>
                </div>
              </div>

              {/* DYNAMIC FORMULATION & EXACT STRENGTH SELECTOR */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-cyan-300 uppercase font-mono flex items-center space-x-1.5">
                    <Pill className="w-4 h-4 text-cyan-400" />
                    <span>Database-Verified Formulation & Strength Selector</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">No Hallucinated Doses</span>
                </div>

                {/* Step 1: Select Formulation */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase font-mono">1. Select Dosage Formulation:</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedMonograph.formulations.map((form, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedFormulationIndex(idx);
                          setSelectedStrengthIndex(0);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                          selectedFormulationIndex === idx
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-glow-cyan'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {form.dosageForm} ({form.route})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Real Available Strength */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <label className="text-[11px] font-bold text-slate-300 uppercase font-mono">2. Select Verified Commercial Strength:</label>
                  <div className="flex flex-wrap gap-2">
                    {activeFormulation.availableStrengths.map((str, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedStrengthIndex(idx)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                          selectedStrengthIndex === idx
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-400 font-black shadow-glow-cyan'
                            : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {str.displayLabel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Strength Clinical Detail Box */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 text-xs space-y-1 font-mono">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span className="text-emerald-400">Selected Product: {activeStrength.displayLabel}</span>
                    <span className="text-cyan-300">Route: {activeFormulation.route}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] font-sans">
                    <strong>Standard Clinical Protocol:</strong> {activeStrength.standardDoseDescription}
                  </p>
                  <div className="flex items-center space-x-4 text-[10px] text-slate-400 pt-1">
                    <span>Onset: <strong className="text-white">{activeFormulation.typicalOnsetTime}</strong></span>
                    <span>Duration: <strong className="text-white">{activeFormulation.typicalDuration}</strong></span>
                  </div>
                </div>
              </div>

              {/* Mechanism of Action */}
              <div className="space-y-1.5 text-xs text-slate-200 leading-relaxed">
                <strong className="text-white font-mono uppercase text-xs block">Pharmacological Mechanism of Action:</strong>
                <p>{selectedMonograph.pharmacodynamicsMechanism}</p>
              </div>

              {/* Benefits vs Limitations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                  <h4 className="font-bold text-emerald-300">Clinical Benefits</h4>
                  <ul className="space-y-1 text-[11px] text-slate-300 list-disc pl-4">
                    {selectedMonograph.clinicalBenefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                  <h4 className="font-bold text-amber-300">Clinical Limitations (What it does NOT treat)</h4>
                  <ul className="space-y-1 text-[11px] text-slate-300 list-disc pl-4">
                    {selectedMonograph.clinicalLimitations.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Side Effects & Absolute Contraindications */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">Common Side Effects:</span>
                  <p className="text-slate-300 text-[11px]">{selectedMonograph.commonSideEffects.join(' • ')}</p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/50 text-xs space-y-1.5">
                  <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block">Absolute Contraindications:</span>
                  <ul className="space-y-1 text-rose-200 text-[11px] list-disc pl-4">
                    {selectedMonograph.contraindications.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Special Populations Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block">Pregnancy Guidance:</span>
                  <p className="text-slate-300 text-[10px] leading-relaxed">{selectedMonograph.pregnancyGuidance.clinicalDetail}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-pink-400 uppercase font-bold block">Alcohol Interaction:</span>
                  <p className="text-slate-300 text-[10px] leading-relaxed">{selectedMonograph.alcoholInteraction.guidance}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Geriatric (Beers):</span>
                  <p className="text-slate-300 text-[10px] leading-relaxed">{selectedMonograph.geriatricBeersGuidance}</p>
                </div>
              </div>

              {/* Overdose & Toxicity Antidote Warning */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-rose-500/40 text-xs font-mono space-y-1 text-rose-300">
                <strong className="text-rose-400 uppercase block">Overdose & Antidote Alert:</strong>
                <span>{selectedMonograph.overdoseWarningAndAntidote}</span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 5: BODY PART & ORGAN SYSTEM NAVIGATOR
          ========================================================================= */}
      {activeTab === 'body_parts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Organs List (4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Select Body System ({BODY_PARTS_DATABASE.length})
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {BODY_PARTS_DATABASE.map((organ) => {
                const isSelected = selectedBodyPart.id === organ.id;
                return (
                  <button
                    key={organ.id}
                    onClick={() => setSelectedBodyPart(organ)}
                    className={`text-left p-3.5 rounded-2xl border transition-all flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-400 shadow-glow-purple text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{organ.icon}</span>
                    <div>
                      <div className="font-bold text-xs">{organ.organName}</div>
                      <div className="text-[10px] font-mono text-slate-400">{organ.commonConditions.length} Conditions</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Organ Detail View (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0d081f] border border-purple-500/40 space-y-6 shadow-2xl">
              
              <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
                <span className="text-4xl">{selectedBodyPart.icon}</span>
                <div>
                  <h2 className="text-xl font-black text-white">{selectedBodyPart.organName}</h2>
                  <p className="text-xs font-mono text-purple-300">
                    Common Conditions: {selectedBodyPart.commonConditions.join(' • ')}
                  </p>
                </div>
              </div>

              {/* Medicine Categories for Organ */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                  Key Medicine Categories & Formulations for {selectedBodyPart.organName}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {selectedBodyPart.keyMedicineCategories.map((cat, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{cat.categoryName}</h4>
                        <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                          {cat.primaryFormulations.join(', ')}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[10px] font-mono text-slate-400">Common Drugs:</span>
                        {cat.commonDrugs.map((d, i) => (
                          <button
                            key={i}
                            onClick={() => handleExecuteSearch(d)}
                            className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 text-[10px] font-mono border border-slate-800 hover:border-cyan-400"
                          >
                            {d} ➔
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organ Emergency Red Flags */}
              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/50 space-y-2">
                <h4 className="text-xs font-black text-rose-400 uppercase font-mono flex items-center space-x-1.5">
                  <AlertOctagon className="w-4 h-4 text-rose-400" />
                  <span>Organ Emergency Red Flags — Seek Urgent Medical Care:</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-rose-200 pl-4 list-disc">
                  {selectedBodyPart.emergencyRedFlags.map((flag, i) => (
                    <li key={i} className="leading-relaxed">{flag}</li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};
