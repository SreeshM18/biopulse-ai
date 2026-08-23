import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Stethoscope, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  ShieldAlert, 
  Filter, 
  Activity, 
  ArrowRight,
  Bookmark,
  Layers
} from 'lucide-react';
import { PatientProfile, DifferentialDiagnosis } from '../types/biotech';

interface ClinicalKnowledgeSearchProps {
  patient: PatientProfile;
}

export const ClinicalKnowledgeSearch: React.FC<ClinicalKnowledgeSearchProps> = ({ patient }) => {
  const [searchQuery, setSearchQuery] = useState<string>('Acute hypoxemic respiratory failure with pyrexia');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTags, setActiveTags] = useState<string[]>([
    'SpO2 < 88%',
    'Tachypnea (RR > 30)',
    'Pyrexia (39.2°C)',
    'Tachycardia (HR 128)'
  ]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const differentialDiagnoses: DifferentialDiagnosis[] = [
    {
      id: 'diff-01',
      conditionName: 'Septic Shock Secondary to Severe Pneumonia',
      icd10Code: 'ICD-10: A41.9 / J18.9',
      matchScore: activeTags.includes('Pyrexia (39.2°C)') && activeTags.includes('SpO2 < 88%') ? 94 : 76,
      likelihoodTier: 'Primary Suspect (High)',
      keyEvidenceMatches: [
        'Acute hypoxemic desaturation (SpO2 86%)',
        'Tachypnea (31 bpm) indicating respiratory compensation',
        'High pyrexia (39.2°C) matching systemic inflammatory response (SIRS)',
        'Sinus tachycardia (128 bpm) & border hypotension'
      ],
      goldStandardProtocol: 'Surviving Sepsis Campaign 1-Hour Bundle: Stat serum lactate, blood cultures x2 prior to antibiotics, broad-spectrum IV antimicrobials within 60 mins, rapid 30 mL/kg crystalloid bolus for hypotension.',
      recommendedLabWorkup: ['Blood Cultures x2', 'Serum Lactate Stat', 'Chest X-Ray / CT Thorax', 'CBC with Diff & Procalcitonin'],
      redFlagContraindications: `⚠️ ALLERGY WARNING: Patient has fatal PENICILLIN ANAPHYLAXIS. Avoid Piperacillin-Tazobactam (Zosyn) and Ampicillin. Prescribe Vancomycin + Cefepime or Aztreonam.`
    },
    {
      id: 'diff-02',
      conditionName: 'Acute Massive / Submassive Pulmonary Embolism (PE)',
      icd10Code: 'ICD-10: I26.9',
      matchScore: activeTags.includes('SpO2 < 88%') && activeTags.includes('Tachycardia (HR 128)') ? 74 : 52,
      likelihoodTier: 'Rule-Out Priority',
      keyEvidenceMatches: [
        'Sudden onset severe desaturation unresponsive to low-flow O2',
        'Marked sinus tachycardia (128 bpm)',
        'Right ventricular strain pattern on telemetry strip'
      ],
      goldStandardProtocol: 'Immediate CT Pulmonary Angiography (CTPA) or V/Q scan. If hemodynamic collapse occurs, prepare systemic thrombolysis (Alteplase) or catheter-directed embolectomy.',
      recommendedLabWorkup: ['D-Dimer (ELISA)', 'Troponin & NT-proBNP', 'Bedside Transthoracic Echocardiogram', 'Lower Extremity Duplex Ultrasound'],
      redFlagContraindications: 'Contraindication: Avoid therapeutic anticoagulation until major intracranial/gastrointestinal hemorrhage is ruled out.'
    },
    {
      id: 'diff-03',
      conditionName: 'Acute Exacerbation of COPD (AECOPD)',
      icd10Code: 'ICD-10: J44.1',
      matchScore: 62,
      likelihoodTier: 'Differential Candidate',
      keyEvidenceMatches: [
        'Documented history of COPD Gold Stage II in health passport',
        'Severe tachypnea (31 bpm) with marked accessory muscle use',
        'Chronic active prescription: Tiotropium Respimat'
      ],
      goldStandardProtocol: 'GOLD 2026 Guidelines: Controlled oxygen target SpO2 88-92% (prevent CO2 narcosis), nebulized Short-Acting Beta Agonist (Albuterol) + Ipratropium, oral/IV systemic corticosteroids for 5 days.',
      recommendedLabWorkup: ['Arterial Blood Gas (ABG) for PaCO2 & pH', 'Sputum Gram Stain', 'Repeat Spirometry when stable'],
      redFlagContraindications: 'Warning: Avoid 100% high-flow FiO2 without monitoring PaCO2 to prevent acute hypercapnic respiratory drive suppression.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Clinical Search Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Clinical Knowledge & Diagnostic Copilot
              </span>
              <span className="text-xs font-mono text-purple-300 font-bold">
                SNOMED CT & ICD-10 Indexed
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <span>Evidence-Based Differential Diagnosis & Clinical Protocol Engine</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Synthesizes real-time physiological vitals telemetry, patient comorbidities, and presenting symptoms into ranked, guideline-validated differential diagnoses and safety-checked clinical orders.
            </p>
          </div>
        </div>

        {/* Live Symptom Query Bar */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Clinical Guidelines, Syndromes, Signs, or Lab Findings..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium shadow-inner"
            />
          </div>

          {/* Symptom Tag Pills (Clickable) */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">
              Active Telemetry Biomarkers:
            </span>
            {[
              'SpO2 < 88%',
              'Tachypnea (RR > 30)',
              'Pyrexia (39.2°C)',
              'Tachycardia (HR 128)',
              'Hypotension (MAP < 65)',
              'History of COPD',
              'Accessory Muscle Use',
              'Altered Mental Status'
            ].map((tag) => {
              const isSelected = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isSelected ? '✓ ' : '+ '} {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Differential Diagnosis Ranked Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            <span>Ranked Differential Diagnosis Matrix (for {patient.name} • {patient.bedLocation})</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {differentialDiagnoses.length} Matched Pathologies
          </span>
        </div>

        <div className="space-y-4">
          {differentialDiagnoses.map((diff, index) => (
            <div
              key={diff.id}
              className={`glass-card rounded-2xl p-6 border transition-all ${
                index === 0
                  ? 'border-cyan-400/80 bg-gradient-to-br from-[#090e1d] to-[#0d1428] shadow-glow-cyan'
                  : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-400 font-bold">{diff.icd10Code}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      diff.likelihoodTier.includes('High') ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                      diff.likelihoodTier.includes('Rule-Out') ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                    }`}>
                      {diff.likelihoodTier}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-white mt-1">
                    {diff.conditionName}
                  </h4>
                </div>

                {/* Match Confidence Score */}
                <div className="text-right">
                  <div className="text-2xl font-black font-mono text-cyan-300">
                    {diff.matchScore}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Clinical Fit Score</span>
                </div>
              </div>

              {/* Evidence Matches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Telemetry & Symptom Evidence:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {diff.keyEvidenceMatches.map((ev, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gold Standard Protocol */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Gold Standard Clinical Protocol:
                  </span>
                  <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono">
                    {diff.goldStandardProtocol}
                  </p>
                </div>
              </div>

              {/* Red Flag Contraindications & Safety Check */}
              <div className="mt-4 p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/40 text-xs text-rose-200 flex items-start space-x-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-300 block">Personalized Patient Safety Check:</span>
                  <span>{diff.redFlagContraindications}</span>
                </div>
              </div>

              {/* Recommended Lab Workup */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Recommended Stat Labs:</span>
                {diff.recommendedLabWorkup.map((lab, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[11px] font-mono">
                    {lab}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
