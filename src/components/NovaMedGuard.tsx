import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  Activity, 
  Pill, 
  Plus, 
  Trash2, 
  Sparkles, 
  Stethoscope, 
  Heart, 
  Brain, 
  Droplet, 
  FileText, 
  Printer, 
  RefreshCw, 
  Flame, 
  X, 
  Search, 
  User, 
  Wine, 
  Baby, 
  Layers, 
  Dna, 
  Info,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { 
  PatientProfile, 
  MedGuardDrugItem, 
  MedGuardPatientContext, 
  MedGuardRiskLevel,
  TabType 
} from '../types/biotech';
import { 
  parseAndNormalizeDrugInput, 
  executeMedGuardSafetyAudit, 
  CANONICAL_DRUGS 
} from '../utils/novaMedGuardEngine';
import { PATIENT_DATABASE } from '../data/patientDatabase';

interface NovaMedGuardProps {
  patient?: PatientProfile;
  setActiveTab?: (tab: TabType) => void;
}

const PRESET_CLINICAL_SCENARIOS = [
  {
    name: 'Sildenafil + Nitroglycerin (Fatal Hypotension)',
    drugs: ['Viagra 50mg', 'Nitroglycerin 0.4mg SL'],
    patientNotes: 'Coronary Artery Disease with Angina'
  },
  {
    name: 'Dolo 650 + Paracetamol (Duplicate Ingredient Toxicity)',
    drugs: ['Dolo 650mg tablet', 'Crocin 500mg', 'Tylenol 500mg'],
    patientNotes: 'Acute viral fever self-medicating multiple OTCs'
  },
  {
    name: 'Lisinopril + Spironolactone + High K+ (Hyperkalemia)',
    drugs: ['Lisinopril 20mg', 'Spironolactone 25mg'],
    patientNotes: 'HFrEF with baseline Serum K+ 5.4 mEq/L'
  },
  {
    name: 'Metformin + Low eGFR 24 (Lactic Acidosis MALA)',
    drugs: ['Metformin 1000mg', 'Lisinopril 10mg'],
    patientNotes: 'CKD Stage 4 with eGFR 24 mL/min'
  },
  {
    name: 'Morphine + Diazepam + Alcohol (Fatal CNS Depression)',
    drugs: ['Morphine 10mg IV', 'Diazepam 5mg'],
    patientNotes: 'Post-op analgesia with alcohol intake'
  },
  {
    name: 'Amoxicillin + Penicillin Allergy (Anaphylaxis)',
    drugs: ['Augmentin 625mg', 'Ibuprofen 400mg'],
    patientNotes: 'Patient with documented severe Penicillin allergy'
  }
];

export const NovaMedGuard: React.FC<NovaMedGuardProps> = ({
  patient: propPatient,
  setActiveTab
}) => {
  const currentPatientProfile = propPatient || PATIENT_DATABASE[0];

  // Active Patient Context State
  const [patientContext, setPatientContext] = useState<MedGuardPatientContext>({
    patientId: currentPatientProfile.id,
    patientName: currentPatientProfile.name,
    age: currentPatientProfile.age,
    gender: currentPatientProfile.gender as any,
    weightKg: currentPatientProfile.weightKg || 78,
    isPregnant: false,
    pregnancyTrimester: '1st Trimester',
    isLactating: false,
    knownAllergies: currentPatientProfile.allergies || ['Penicillin-Class Antibiotics'],
    diagnosedDiseases: [
      currentPatientProfile.primaryDiagnosis,
      'Type 2 Diabetes Mellitus',
      'Essential Hypertension'
    ],
    egfr: 42,
    serumCreatinine: 1.6,
    serumPotassium: 5.1,
    serumSodium: 138,
    bloodGlucose: 165,
    hba1c: 7.4,
    inr: 1.1,
    astAlt: 38,
    platelets: 240,
    systolicBp: currentPatientProfile.vitals.systolicBp || 135,
    diastolicBp: currentPatientProfile.vitals.diastolicBp || 88,
    consumesAlcohol: true,
    alcoholIntakeFrequency: 'Moderate (1-2 drinks/wk)',
    consumesGrapefruit: true,
    isSmoker: false
  });

  // Drug Basket State (Default Initial Combo: Dolo 650 + Lisinopril)
  const [drugsList, setDrugsList] = useState<MedGuardDrugItem[]>([
    parseAndNormalizeDrugInput('Dolo 650mg tablet'),
    parseAndNormalizeDrugInput('Lisinopril 20mg'),
    parseAndNormalizeDrugInput('Spironolactone 25mg')
  ]);

  const [inputDrugText, setInputDrugText] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Live Safety Audit Computation
  const safetyReport = useMemo(() => {
    return executeMedGuardSafetyAudit(drugsList, patientContext);
  }, [drugsList, patientContext]);

  // Handle Add Drug
  const handleAddDrug = (text: string) => {
    if (!text.trim()) return;
    const normalized = parseAndNormalizeDrugInput(text);
    setDrugsList(prev => [...prev, normalized]);
    setInputDrugText('');
  };

  // Handle Remove Drug
  const handleRemoveDrug = (id: string) => {
    setDrugsList(prev => prev.filter(d => d.id !== id));
  };

  // Apply Preset Scenario
  const handleApplyPreset = (scenario: typeof PRESET_CLINICAL_SCENARIOS[0]) => {
    setSelectedPreset(scenario.name);
    const parsedDrugs = scenario.drugs.map(d => parseAndNormalizeDrugInput(d));
    setDrugsList(parsedDrugs);

    // Adjust patient context if scenario specifies
    if (scenario.name.includes('Hyperkalemia')) {
      setPatientContext(prev => ({ ...prev, serumPotassium: 5.4 }));
    } else if (scenario.name.includes('Low eGFR')) {
      setPatientContext(prev => ({ ...prev, egfr: 24, serumCreatinine: 2.8 }));
    } else if (scenario.name.includes('Alcohol')) {
      setPatientContext(prev => ({ ...prev, consumesAlcohol: true }));
    } else if (scenario.name.includes('Penicillin Allergy')) {
      setPatientContext(prev => ({ ...prev, knownAllergies: ['Penicillin-Class Antibiotics'] }));
    }
  };

  const getRiskBadge = (level: MedGuardRiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-rose-950/90 border border-rose-500/60 text-rose-300 shadow-glow-purple animate-pulse font-mono font-bold text-xs">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>🔴 CRITICAL RISK LEVEL</span>
          </div>
        );
      case 'HIGH':
        return (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-orange-950/90 border border-orange-500/60 text-orange-300 font-mono font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <span>🟠 HIGH CLINICAL RISK</span>
          </div>
        );
      case 'CAUTION':
        return (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-amber-950/90 border border-amber-500/60 text-amber-300 font-mono font-bold text-xs">
            <Info className="w-4 h-4 text-amber-400" />
            <span>🟡 CLINICAL CAUTION</span>
          </div>
        );
      case 'LOW':
      default:
        return (
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 font-mono font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>🟢 LOW / COMPATIBLE REGIMEN</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 text-slate-100 animate-fade-in print:text-black">
      
      {/* 1. Header & Hero Dashboard Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060e24] via-[#0a1845] to-[#060e24] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                NOVA MEDGUARD AI • CLINICAL PRESCRIPTION GUARDIAN
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Multi-Dimensional Medication Safety Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Real-time audit synthesizing Patient Profile + Lab Telemetry (eGFR, K+, INR) + Exact Strengths + Multi-Drug Combos + Allergies + Alcohol/Food + Organ Function + Beers Criteria + Duplicate Active Ingredients.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-col items-end space-y-2 shrink-0">
            {getRiskBadge(safetyReport.overallRiskLevel)}
            <span className="text-[11px] font-mono text-slate-400">
              Safety Score: <strong className="text-white">{100 - safetyReport.overallRiskScore} / 100</strong> (Checked Against RxNorm & DailyMed)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Preset Scenarios Bar */}
      <div className="p-4 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-2 print:hidden">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-bold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simulate High-Yield Clinical Safety Scenarios:</span>
          </span>
          <span className="text-[10px] text-slate-500">Click to load pre-configured drug cocktails</span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
          {PRESET_CLINICAL_SCENARIOS.map((scen) => (
            <button
              key={scen.name}
              onClick={() => handleApplyPreset(scen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all border shrink-0 ${
                selectedPreset === scen.name
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-glow-cyan font-bold'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              {scen.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main 2-Column Workstation: Left (Drug Basket & Patient Context) | Right (Safety Audit Findings) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Drug Basket & Clinical Patient EHR (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* A. Drug Basket Card */}
          <div className="rounded-3xl bg-[#080e22] border border-cyan-500/30 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center space-x-2">
                <Pill className="w-4 h-4 text-cyan-400" />
                <span>Active Medication Regimen ({drugsList.length})</span>
              </h3>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                Multi-Drug Audit
              </span>
            </div>

            {/* Add Drug Input Bar */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleAddDrug(inputDrugText);
              }}
              className="relative flex items-center gap-2"
            >
              <input
                type="text"
                value={inputDrugText}
                onChange={(e) => setInputDrugText(e.target.value)}
                placeholder="Type brand, generic, or strength (e.g. Dolo 650, Viagra 50mg, Lisinopril 20mg)..."
                className="flex-1 bg-slate-900/90 border border-slate-700 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 outline-none shadow-inner"
              />
              <button
                type="submit"
                className="px-3.5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-glow-cyan shrink-0 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>

            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap gap-1 text-[11px] font-mono">
              <span className="text-slate-500 mr-1">Quick Add:</span>
              {['Warfarin 5mg', 'Metformin 1000mg', 'Sildenafil 50mg', 'Nitroglycerin 0.4mg', 'Morphine 10mg'].map((s) => (
                <button
                  key={s}
                  onClick={() => handleAddDrug(s)}
                  className="px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors"
                >
                  + {s}
                </button>
              ))}
            </div>

            {/* Added Drugs List */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {drugsList.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 font-mono border border-dashed border-slate-800 rounded-2xl">
                  No medications added. Search and add drugs above to run clinical audit.
                </div>
              ) : (
                drugsList.map((drug) => (
                  <div 
                    key={drug.id}
                    className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3 hover:border-cyan-500/40 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-xs">{drug.rawInput}</span>
                        {drug.isHighAlert && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-orange-950 text-orange-300 border border-orange-500/40">
                            High Alert
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-cyan-400">
                        Resolved: <strong>{drug.genericName}</strong> ({drug.strengthValue} {drug.strengthUnit} • {drug.dosageForm})
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveDrug(drug.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Remove from basket"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* B. Patient Clinical EHR & Lab Parameter Simulator */}
          <div className="rounded-3xl bg-[#080e22] border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>Patient Clinical Context & Labs</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                {patientContext.patientName} ({patientContext.age}y, {patientContext.gender})
              </span>
            </div>

            {/* Editable Lab Matrix */}
            <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">eGFR (mL/min)</span>
                <input
                  type="number"
                  value={patientContext.egfr}
                  onChange={(e) => setPatientContext(prev => ({ ...prev, egfr: parseFloat(e.target.value) || 0 }))}
                  className={`w-full bg-slate-950 px-2 py-1 rounded text-xs font-bold ${
                    patientContext.egfr < 30 ? 'text-rose-400 border border-rose-500/50' : 'text-cyan-300'
                  }`}
                />
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">Serum K+ (mEq/L)</span>
                <input
                  type="number"
                  step="0.1"
                  value={patientContext.serumPotassium}
                  onChange={(e) => setPatientContext(prev => ({ ...prev, serumPotassium: parseFloat(e.target.value) || 0 }))}
                  className={`w-full bg-slate-950 px-2 py-1 rounded text-xs font-bold ${
                    patientContext.serumPotassium >= 5.0 ? 'text-rose-400 border border-rose-500/50' : 'text-cyan-300'
                  }`}
                />
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">INR Level</span>
                <input
                  type="number"
                  step="0.1"
                  value={patientContext.inr}
                  onChange={(e) => setPatientContext(prev => ({ ...prev, inr: parseFloat(e.target.value) || 0 }))}
                  className={`w-full bg-slate-950 px-2 py-1 rounded text-xs font-bold ${
                    patientContext.inr > 3.0 ? 'text-rose-400 border border-rose-500/50' : 'text-cyan-300'
                  }`}
                />
              </div>
            </div>

            {/* Clinical Factor Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                <span className="flex items-center space-x-2 text-slate-300">
                  <Wine className="w-4 h-4 text-pink-400" />
                  <span>Alcohol Intake:</span>
                </span>
                <button
                  onClick={() => setPatientContext(prev => ({ ...prev, consumesAlcohol: !prev.consumesAlcohol }))}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition-all ${
                    patientContext.consumesAlcohol 
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40' 
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {patientContext.consumesAlcohol ? 'Active (Consumes)' : 'None (Abstinent)'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                <span className="flex items-center space-x-2 text-slate-300">
                  <Baby className="w-4 h-4 text-cyan-400" />
                  <span>Pregnancy Status:</span>
                </span>
                <button
                  onClick={() => setPatientContext(prev => ({ ...prev, isPregnant: !prev.isPregnant }))}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition-all ${
                    patientContext.isPregnant 
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40' 
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {patientContext.isPregnant ? 'Pregnant (Confirmed)' : 'Non-Pregnant'}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60">
                <span className="flex items-center space-x-2 text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Penicillin Allergy:</span>
                </span>
                <button
                  onClick={() => {
                    const hasAllergy = patientContext.knownAllergies.some(a => a.includes('Penicillin'));
                    setPatientContext(prev => ({
                      ...prev,
                      knownAllergies: hasAllergy ? [] : ['Penicillin-Class Antibiotics']
                    }));
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition-all ${
                    patientContext.knownAllergies.length > 0
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40' 
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {patientContext.knownAllergies.length > 0 ? 'Documented (Severe)' : 'No Known Allergies'}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Multi-Dimensional Safety Audit Results (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* A. Overall Executive Clinical Safety Banner */}
          <div className={`p-5 sm:p-6 rounded-3xl border shadow-2xl space-y-3 transition-all ${
            safetyReport.overallRiskLevel === 'CRITICAL'
              ? 'bg-[#180812] border-rose-500/60 shadow-[0_0_50px_rgba(244,63,94,0.25)]'
              : safetyReport.overallRiskLevel === 'HIGH'
              ? 'bg-[#1a0e08] border-orange-500/60'
              : safetyReport.overallRiskLevel === 'CAUTION'
              ? 'bg-[#181408] border-amber-500/60'
              : 'bg-[#081814] border-emerald-500/60'
          }`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <ShieldAlert className="w-6 h-6 text-cyan-400 shrink-0" />
                <h3 className="text-lg font-black text-white">
                  Prescription Safety Synthesis & Findings ({safetyReport.allFindings.length})
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-glow-cyan"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-medium leading-relaxed text-slate-200">
              {safetyReport.riskSummaryStatement}
            </p>

            {safetyReport.doctorVerificationRequired && (
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center space-x-2">
                <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                <span>MANDATORY CLINICAL REVIEW: Requires attending physician & clinical pharmacist electronic sign-off prior to dispensing.</span>
              </div>
            )}
          </div>

          {/* B. Duplicate Ingredient Alert Strip */}
          {safetyReport.duplicateIngredientAlerts.length > 0 && (
            <div className="p-4 rounded-3xl bg-amber-950/30 border border-amber-500/50 space-y-2">
              <h4 className="text-xs font-black text-amber-400 uppercase font-mono flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Duplicate Active Ingredient Detected</span>
              </h4>
              {safetyReport.duplicateIngredientAlerts.map((dup, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-900/90 text-xs space-y-1">
                  <div className="flex items-center justify-between text-white font-bold">
                    <span>{dup.ingredient}</span>
                    <span className="text-rose-400 font-mono">Total Cumulative: {dup.cumulativeDose}</span>
                  </div>
                  <p className="text-slate-300">{dup.warning}</p>
                  <span className="text-[10px] font-mono text-cyan-300">Max Safe Daily Dose: {dup.maxDailySafeDose}</span>
                </div>
              ))}
            </div>
          )}

          {/* C. Granular Finding Cards List */}
          <div className="space-y-4">
            {safetyReport.allFindings.length === 0 ? (
              <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">No Major Safety Conflicts Identified</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  The selected medication combination, doses, and patient clinical profile are compatible across checked pharmacological guidelines.
                </p>
              </div>
            ) : (
              safetyReport.allFindings.map((finding) => (
                <div
                  key={finding.id}
                  className={`p-5 rounded-3xl border space-y-3.5 transition-all ${
                    finding.severity === 'CRITICAL'
                      ? 'bg-[#140810] border-rose-500/50 shadow-lg'
                      : finding.severity === 'HIGH'
                      ? 'bg-[#140d08] border-orange-500/50'
                      : 'bg-[#141208] border-amber-500/50'
                  }`}
                >
                  {/* Title & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        finding.severity === 'CRITICAL'
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                          : finding.severity === 'HIGH'
                          ? 'bg-orange-950 text-orange-300 border border-orange-500/40'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}>
                        {finding.category} • {finding.severity}
                      </span>
                      <h4 className="text-base font-black text-white">{finding.title}</h4>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      Involved: {finding.involvedItems.join(' + ')}
                    </span>
                  </div>

                  {/* What May Happen & Mechanism */}
                  <div className="space-y-1.5 text-xs text-slate-200 leading-relaxed">
                    <p><strong>What May Happen:</strong> {finding.whatMayHappen}</p>
                    <p className="text-slate-300"><strong>Pharmacological Mechanism:</strong> {finding.pharmacologicalMechanism}</p>
                  </div>

                  {/* Who Is At Risk & Watch For */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Who Is At Greater Risk:</span>
                      <p className="text-slate-300 text-[11px]">{finding.whoIsAtGreaterRisk}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Symptoms to Watch For:</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {finding.symptomsToWatchFor.map((sym, i) => (
                          <span key={i} className="px-1.5 py-0.2 rounded bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800">
                            • {sym}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actionable Clinical Recommendation */}
                  <div className="p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono space-y-1 text-cyan-200">
                    <strong className="text-cyan-300 block">Recommended Clinical Action:</strong>
                    <span>{finding.recommendedClinicalAction}</span>
                  </div>

                  {/* Evidence Sources */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800">
                    <span>Evidence: {finding.evidenceSources.join(' | ')}</span>
                    <span className="text-cyan-400">Validated CDSS Rules Engine</span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
