import React, { useState } from 'react';
import { 
  Globe, 
  Brain, 
  Heart, 
  Wind, 
  Utensils, 
  Layers, 
  Droplet, 
  Sparkles, 
  Bone, 
  Stethoscope, 
  Clock, 
  FlaskConical, 
  Pill, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Search, 
  BookOpen,
  Calendar,
  ShieldCheck,
  Zap,
  Scale
} from 'lucide-react';
import { MASTER_BODY_SYSTEMS, MASTER_LIFE_STAGES, MASTER_AZ_DISEASE_COMPENDIUM, BodySystemNode } from '../data/masterMedicalMap';
import { PatientProfile, TabType } from '../types/biotech';

interface MasterMedicalUniverseAtlasProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const MasterMedicalUniverseAtlas: React.FC<MasterMedicalUniverseAtlasProps> = ({
  patient,
  setActiveTab
}) => {
  const [activeTab, setActiveTabMode] = useState<'systems' | 'lifestages' | 'az_diseases' | 'pathway_simulator'>('pathway_simulator');
  const [selectedSystem, setSelectedSystem] = useState<BodySystemNode>(MASTER_BODY_SYSTEMS[2]); // Lungs (matches Robert Vance)
  const [azSearchTerm, setAzSearchTerm] = useState<string>('');

  // Pathway Simulator selection
  const [simulatedCase, setSimulatedCase] = useState<string>('Sepsis / ARDS');

  const getSystemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-purple-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-yellow-400" />;
      case 'Droplet': return <Droplet className="w-5 h-5 text-blue-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'Bone': return <Bone className="w-5 h-5 text-slate-300" />;
      default: return <Stethoscope className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Atlas Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Universal Medical Atlas
              </span>
              <span className="text-xs font-mono text-purple-300 font-bold">
                End-to-End A–Z Healthcare Map
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Globe className="w-6 h-6 text-cyan-400" />
              <span>Master A–Z Medical Atlas & Clinical Universe Explorer</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Complete encyclopedic map of medicine: Explore organ body systems, life-stage medicine (from preconception to geriatrics and forensics), A–Z disease compendium, and the 13-stage clinical pathway simulator.
            </p>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap gap-y-1">
            <button
              onClick={() => setActiveTabMode('pathway_simulator')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'pathway_simulator'
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ 13-Stage Pathway Simulator
            </button>
            <button
              onClick={() => setActiveTabMode('systems')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'systems'
                  ? 'bg-purple-600 text-white shadow-glow-purple font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🫀 Body Systems
            </button>
            <button
              onClick={() => setActiveTabMode('lifestages')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'lifestages'
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👶 Life-Stage Medicine
            </button>
            <button
              onClick={() => setActiveTabMode('az_diseases')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'az_diseases'
                  ? 'bg-amber-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🔤 A–Z Diseases
            </button>
          </div>
        </div>
      </div>

      {/* 1. 13-STAGE CLINICAL PATHWAY SIMULATOR */}
      {activeTab === 'pathway_simulator' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase">
                The Complete Healthcare Universe Flow
              </span>
              <h3 className="text-lg font-black text-white">
                Body System ➔ Specialty ➔ Doctor ➔ Disease ➔ Symptoms ➔ Tests ➔ Diagnosis ➔ Treatment ➔ Medication ➔ Monitoring ➔ Outcome
              </h3>
            </div>

            {/* Case Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400 font-mono">Case:</span>
              <select
                value={simulatedCase}
                onChange={(e) => setSimulatedCase(e.target.value)}
                className="bg-slate-900 border border-cyan-500/40 rounded-xl px-3 py-1.5 text-xs text-cyan-300 font-bold focus:outline-none"
              >
                <option value="Sepsis / ARDS">Case 1: Septic Shock & Severe ARDS (Patient #203)</option>
                <option value="STEMI / Cardiac">Case 2: Acute Myocardial Infarction / STEMI</option>
                <option value="Stroke / Neuro">Case 3: Acute Ischemic Stroke (tPA Protocol)</option>
                <option value="DKA / Endocrine">Case 4: Severe Diabetic Ketoacidosis (DKA)</option>
              </select>
            </div>
          </div>

          {/* 13 Stage Visual Chain */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { stage: '1. Body System', value: simulatedCase.includes('Sepsis') ? 'Lungs & Vascular System' : simulatedCase.includes('STEMI') ? 'Cardiovascular' : simulatedCase.includes('Stroke') ? 'Central Nervous System' : 'Endocrine & Metabolism', icon: '🫁' },
              { stage: '2. Specialty', value: simulatedCase.includes('Sepsis') ? 'Critical Care & Pulmonology' : simulatedCase.includes('STEMI') ? 'Interventional Cardiology' : simulatedCase.includes('Stroke') ? 'Vascular Neurology' : 'Endocrinology & ICU', icon: '🩺' },
              { stage: '3. Specialist Doctor', value: simulatedCase.includes('Sepsis') ? 'Dr. Sarah Lin, MD (FCCM)' : simulatedCase.includes('STEMI') ? 'Dr. Emily Watson, MD (FACC)' : simulatedCase.includes('Stroke') ? 'Dr. Christopher Ray, MD (FAAN)' : 'Dr. Wendy Chen, MD', icon: '👨‍⚕️' },
              { stage: '4. Disease Entity', value: simulatedCase.includes('Sepsis') ? 'Severe Septic Shock + ARDS' : simulatedCase.includes('STEMI') ? 'Acute STEMI (LAD Occlusion)' : simulatedCase.includes('Stroke') ? 'Acute Middle Cerebral Artery Stroke' : 'Diabetic Ketoacidosis (DKA)', icon: '🦠' },
              { stage: '5. Chief Symptoms', value: simulatedCase.includes('Sepsis') ? 'Severe Dyspnea, High Fever, Chills' : simulatedCase.includes('STEMI') ? 'Crushing Retrosternal Chest Pain' : simulatedCase.includes('Stroke') ? 'Sudden Left Hemiplegia, Aphasia' : 'Polyuria, Kussmaul Breathing, Vomiting', icon: '🤒' },
              { stage: '6. Stat Diagnostics', value: simulatedCase.includes('Sepsis') ? 'Arterial Blood Gas, Lactate, CXR' : simulatedCase.includes('STEMI') ? '12-Lead ECG, High-Sensitivity Troponin' : simulatedCase.includes('Stroke') ? 'Non-Contrast Head CT, CT Angiography' : 'Blood Glucose > 300, Serum Ketones, ABG', icon: '🧪' },
              { stage: '7. Final Diagnosis', value: simulatedCase.includes('Sepsis') ? 'ICD-10: R65.21 (Septic Shock) + J80' : simulatedCase.includes('STEMI') ? 'ICD-10: I21.0 (STEMI)' : simulatedCase.includes('Stroke') ? 'ICD-10: I63.9 (Cerebral Infarction)' : 'ICD-10: E10.10 (DKA)', icon: '📋' },
              { stage: '8. Acute Treatment', value: simulatedCase.includes('Sepsis') ? '1-Hour Sepsis Bundle Resuscitation' : simulatedCase.includes('STEMI') ? 'Emergency Cath Lab Angioplasty (PCI)' : simulatedCase.includes('Stroke') ? 'IV Alteplase (tPA) + Thrombectomy' : 'IV Fluid Rehydration + Potassium Repletion', icon: '⚡' },
              { stage: '9. Core Medication', value: simulatedCase.includes('Sepsis') ? 'Meropenem IV + Norepinephrine' : simulatedCase.includes('STEMI') ? 'Aspirin + Ticagrelor + Heparin Drip' : simulatedCase.includes('Stroke') ? 'IV tPA (0.9 mg/kg) + Statin' : 'Regular Insulin IV Infusion (0.1 U/kg/hr)', icon: '💊' },
              { stage: '10. Procedure / Unit', value: simulatedCase.includes('Sepsis') ? 'Central Line + Hamilton C6 Ventilator' : simulatedCase.includes('STEMI') ? 'Primary PCI & Drug-Eluting Stent' : simulatedCase.includes('Stroke') ? 'Endovascular Catheter Thrombectomy' : 'Frequent Glucose/Electrolyte Monitoring', icon: '🔬' },
              { stage: '11. Continuous Monitoring', value: simulatedCase.includes('Sepsis') ? 'Real-Time SpO2, MAP, Lactate Stream' : simulatedCase.includes('STEMI') ? 'Continuous Holter ST-Segment Telemetry' : simulatedCase.includes('Stroke') ? 'NIHSS Neuro Checks q1h' : 'Serial Blood Glucose & Ketone Clearance', icon: '💓' },
              { stage: '12. Clinical Outcome', value: simulatedCase.includes('Sepsis') ? 'Lactate Cleared, MAP Stabilized > 65' : simulatedCase.includes('STEMI') ? 'TIMI-3 Flow Restored, Troponin Peaked' : simulatedCase.includes('Stroke') ? 'Neurological Deficit Resolved (NIHSS < 2)' : 'Anion Gap Closed, Acidosis Normalized', icon: '🏆' }
            ].map((stg, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono font-bold">
                  <span>{stg.icon}</span>
                  <span>{stg.stage}</span>
                </div>
                <div className="text-xs font-black text-white leading-tight">
                  {stg.value}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Standardized Medical Ontology Fully Active in BioPulse AI</span>
            </span>

            <button
              onClick={() => setActiveTab('whole_body')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all flex items-center space-x-1.5"
            >
              <span>Execute Clinical Pathway in Doctor Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. BODY SYSTEMS TAB */}
      {activeTab === 'systems' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (5 Cols): System Selector */}
          <div className="lg:col-span-5 space-y-2">
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                Whole-Body Organ Systems:
              </h3>

              <div className="space-y-2">
                {MASTER_BODY_SYSTEMS.map((sys) => {
                  const isSelected = selectedSystem.id === sys.id;
                  return (
                    <div
                      key={sys.id}
                      onClick={() => setSelectedSystem(sys)}
                      className={`p-3.5 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 shadow-glow-cyan scale-[1.01]'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          {getSystemIcon(sys.icon)}
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-white">{sys.name}</h4>
                          <span className="text-[10px] text-cyan-300 font-mono block">{sys.primarySpecialty}</span>
                        </div>
                      </div>

                      <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Selected System Details */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-cyan-500/30">
                    {getSystemIcon(selectedSystem.icon)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block">
                      Organ System Explorer
                    </span>
                    <h3 className="text-xl font-black text-white">{selectedSystem.name}</h3>
                    <p className="text-xs text-slate-400">{selectedSystem.primarySpecialty}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400">On-Duty Specialist:</span>
                  <div className="text-xs text-white font-extrabold">{selectedSystem.onDutySpecialist}</div>
                </div>
              </div>

              {/* Subspecialties */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Recognized Clinical Subspecialties:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSystem.subspecialties.map((sub, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 text-xs text-slate-200 font-mono border border-slate-800">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Common Pathology & Diagnostics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-rose-300 uppercase flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-400" />
                    <span>Common Acute Pathologies:</span>
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {selectedSystem.commonDiseases.map((d, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-cyan-300 uppercase flex items-center space-x-1.5">
                    <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Key Diagnostic Modalities:</span>
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {selectedSystem.keyDiagnostics.map((d, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Core Standard Medications */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-emerald-300 uppercase flex items-center space-x-1.5">
                  <Pill className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard Evidence-Based Medications / Infusions:</span>
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedSystem.coreMedications.map((m, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-xl bg-emerald-950/50 text-emerald-300 font-mono text-xs border border-emerald-500/30">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* 3. LIFE-STAGE MEDICINE TAB */}
      {activeTab === 'lifestages' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-black text-white">Life-Stage Medicine Architecture</h3>
            <p className="text-xs text-slate-400">Complete lifespan care: from preconception genetics and prenatal medicine to geriatrics and forensics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MASTER_LIFE_STAGES.map((stage, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-300">{stage.ageRange}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      Stage {idx + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-white">{stage.stage}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{stage.keyHealthFocus}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-300">
                  <strong>Screening:</strong> {stage.preventiveScreening}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. A-Z DISEASE COMPENDIUM TAB */}
      {activeTab === 'az_diseases' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white">Master A–Z Disease & Protocol Compendium</h3>
              <p className="text-xs text-slate-400">Searchable clinical index of high-yield diseases with ICD-10, gold standard diagnostics, and treatments.</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={azSearchTerm}
                onChange={(e) => setAzSearchTerm(e.target.value)}
                placeholder="Search disease, ICD-10, organ..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="space-y-6">
            {MASTER_AZ_DISEASE_COMPENDIUM.map((group) => {
              const matching = group.diseases.filter(d => 
                d.name.toLowerCase().includes(azSearchTerm.toLowerCase()) ||
                d.icd10.toLowerCase().includes(azSearchTerm.toLowerCase()) ||
                d.organSystem.toLowerCase().includes(azSearchTerm.toLowerCase())
              );

              if (matching.length === 0) return null;

              return (
                <div key={group.letter} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-black flex items-center justify-center text-sm font-mono">
                      {group.letter}
                    </span>
                    <span className="text-xs font-mono text-slate-400 uppercase">Diseases & Clinical Protocols</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matching.map((dis, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-all">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-extrabold text-white">{dis.name}</h4>
                          <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                            {dis.icd10}
                          </span>
                        </div>

                        <div className="text-xs text-slate-400 font-mono">
                          <strong>Organ System:</strong> {dis.organSystem} • <strong>Specialist:</strong> {dis.specialist}
                        </div>

                        <div className="pt-2 border-t border-slate-800 text-[11px] font-mono space-y-1">
                          <div className="text-purple-300"><strong>Gold Standard Test:</strong> {dis.goldStandardTest}</div>
                          <div className="text-emerald-300"><strong>Primary Treatment:</strong> {dis.primaryTreatment}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
