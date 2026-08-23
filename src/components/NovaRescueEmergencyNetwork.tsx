import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  Heart, 
  Brain, 
  Wind, 
  Car, 
  Droplet, 
  Skull, 
  Baby, 
  Users, 
  MapPin, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  BedDouble, 
  Activity, 
  QrCode, 
  Unlock, 
  Send, 
  Radio, 
  Video, 
  Layers, 
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { AMBULANCE_FLEET, EMERGENCY_HOSPITAL_MATCHES, REGIONAL_BLOOD_INVENTORY, ACTIVE_ORGAN_TRANSPLANTS, AmbulanceUnit, EmergencyHospitalMatch } from '../data/novaRescueData';
import { PatientProfile, TabType } from '../types/biotech';

interface NovaRescueEmergencyNetworkProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const EMERGENCY_TYPES = [
  { id: 'cardiac', label: 'Cardiac Emergency', icon: '❤️', desc: 'Chest pain, suspected STEMI, cardiac arrest, arrhythmia' },
  { id: 'neuro', label: 'Stroke / Neurological', icon: '🧠', desc: 'Sudden hemiplegia, aphasia, facial droop, seizures' },
  { id: 'respiratory', label: 'Severe Respiratory / ARDS', icon: '🫁', desc: 'Severe hypoxemia, SpO2 < 88%, acute dyspnea, choking' },
  { id: 'trauma', label: 'Severe Polytrauma', icon: '🚗', desc: 'Motor vehicle accident, severe fall, compound fractures' },
  { id: 'burns', label: 'Major Burns / Inhalation', icon: '🔥', desc: 'Thermal, electrical, or chemical burns > 20% TBSA' },
  { id: 'bleeding', label: 'Severe Hemorrhagic Shock', icon: '🩸', desc: 'Arterial bleeding, massive hematemesis, stab wound' },
  { id: 'poisoning', label: 'Toxic Poisoning / Overdose', icon: '☠️', desc: 'Suspected drug overdose, cyanide, organophosphate' },
  { id: 'pregnancy', label: 'Obstetric Emergency', icon: '🤰', desc: 'Pre-eclampsia, placental abruption, active labor in transit' },
  { id: 'pediatric', label: 'Pediatric Critical Event', icon: '👶', desc: 'Febrile seizure, foreign body airway, pediatric sepsis' },
  { id: 'geriatric', label: 'Geriatric Collapse', icon: '👴', desc: 'Unconscious fall, acute stroke, intracranial hemorrhage' },
  { id: 'snakebite', label: 'Snakebite / Envenomation', icon: '🐍', desc: 'Venomous snake bite, systemic coagulopathy or neurotoxicity' },
  { id: 'other', label: 'Other Critical Emergency', icon: '⚠️', desc: 'Acute undifferentiated shock or medical collapse' }
];

export const NovaRescueEmergencyNetwork: React.FC<NovaRescueEmergencyNetworkProps> = ({
  patient,
  setActiveTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sos_dispatch' | 'ambulances' | 'hospital_match' | 'capacity' | 'blood' | 'transplant' | 'disaster' | 'break_glass'>('sos_dispatch');
  
  // SOS Simulator State
  const [selectedEmergencyType, setSelectedEmergencyType] = useState(EMERGENCY_TYPES[0]);
  const [sosStage, setSosStage] = useState<number>(0); // 0: Idle, 1: SOS Activated, 2: Ambulance En Route, 3: Hospital Notified, 4: Picked Up, 5: Reached
  const [sosDispatched, setSosDispatched] = useState<boolean>(false);
  const [etaCountdown, setEtaCountdown] = useState<number>(4);
  const [selectedAmbulance, setSelectedAmbulance] = useState<AmbulanceUnit>(AMBULANCE_FLEET[0]);
  const [matchedHospital, setMatchedHospital] = useState<EmergencyHospitalMatch>(EMERGENCY_HOSPITAL_MATCHES[0]);

  // Break-glass modal
  const [isBreakGlassUnlocked, setIsBreakGlassUnlocked] = useState<boolean>(false);
  const [breakGlassReason, setBreakGlassReason] = useState<string>('Unconscious trauma patient arrived via EMS with severe hypoxemia. Immediate access to allergies and history required.');

  // Code Blue alert state
  const [codeBlueActive, setCodeBlueActive] = useState<boolean>(false);

  // Blood Request state
  const [bloodRequestSent, setBloodRequestSent] = useState<boolean>(false);

  const handleTriggerSOS = () => {
    setSosDispatched(true);
    setSosStage(1);
    setTimeout(() => setSosStage(2), 2000);
    setTimeout(() => setSosStage(3), 4000);
  };

  const handleResetSOS = () => {
    setSosDispatched(false);
    setSosStage(0);
  };

  const handleTriggerCodeBlue = () => {
    setCodeBlueActive(true);
    setTimeout(() => setCodeBlueActive(false), 8000);
  };

  const handleRequestBlood = () => {
    setBloodRequestSent(true);
    setTimeout(() => setBloodRequestSent(false), 4000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Universal SOS Trigger */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40 animate-pulse">
                🚨 NOVA RESCUE • Emergency & Safety Grid
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">
                Universal SOS • Smart Ambulance Dispatch • Hospital Matcher
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-rose-500" />
              <span>NOVA RESCUE — Emergency Dispatch & Resource Network</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Detect emergency ➔ Broadcast live GPS ➔ Match capability-ranked hospital ➔ Dispatch ALS ambulance ➔ Notify trauma team & reserve ICU bed before arrival.
            </p>
          </div>

          {/* Quick Universal SOS Action Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleTriggerCodeBlue}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all ${
                codeBlueActive
                  ? 'bg-blue-600 text-white shadow-glow-cyan animate-ping'
                  : 'bg-blue-950 text-blue-300 border border-blue-500/50 hover:bg-blue-900'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>{codeBlueActive ? '🚨 CODE BLUE BROADCASTING!' : 'Hospital Code Blue'}</span>
            </button>

            <button
              onClick={handleTriggerSOS}
              className="px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-glow-cyan transition-all transform hover:scale-105 flex items-center space-x-2 animate-pulse"
            >
              <Flame className="w-4 h-4" />
              <span>Trigger Universal SOS</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap gap-y-1 text-xs">
          <button
            onClick={() => setActiveSubTab('sos_dispatch')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeSubTab === 'sos_dispatch'
                ? 'bg-rose-600 text-white shadow-glow-cyan font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🚨 Live SOS Dispatch
          </button>
          <button
            onClick={() => setActiveSubTab('ambulances')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeSubTab === 'ambulances'
                ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🚑 Smart Ambulance Finder
          </button>
          <button
            onClick={() => setActiveSubTab('hospital_match')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeSubTab === 'hospital_match'
                ? 'bg-purple-600 text-white shadow-glow-purple font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏥 Hospital Matching Engine
          </button>
          <button
            onClick={() => setActiveSubTab('capacity')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeSubTab === 'capacity'
                ? 'bg-emerald-500 text-slate-950 shadow-glow-cyan font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🛏️ Beds, ICU & OTs
          </button>
          <button
            onClick={() => setActiveSubTab('blood')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeSubTab === 'blood'
                ? 'bg-rose-500 text-slate-950 shadow-glow-cyan font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🩸 Blood Emergency Bank
          </button>
          <button
            onClick={() => setActiveSubTab('transplant')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeSubTab === 'transplant'
                ? 'bg-amber-500 text-slate-950 shadow-glow-cyan font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🫀 Organ Transplant Grid
          </button>
          <button
            onClick={() => setActiveSubTab('disaster')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeSubTab === 'disaster'
                ? 'bg-red-700 text-white font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            💥 Disaster / Mass-Casualty
          </button>
          <button
            onClick={() => setActiveSubTab('break_glass')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              activeSubTab === 'break_glass'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔓 Break-Glass Access
          </button>
        </div>
      </div>

      {/* CODE BLUE BROADCAST OVERLAY */}
      {codeBlueActive && (
        <div className="p-4 rounded-2xl bg-blue-950/80 border-2 border-blue-400 shadow-glow-cyan text-white flex items-center justify-between animate-pulse">
          <div className="flex items-center space-x-3">
            <Radio className="w-8 h-8 text-blue-400 animate-spin" />
            <div>
              <h3 className="text-base font-black uppercase tracking-wider">
                🚨 HOSPITAL CODE BLUE ACTIVATED: MICU BAY 03 ({patient.name})
              </h3>
              <p className="text-xs text-blue-200 font-mono">
                Crash Cart Dispatched • Cardiac Resuscitation Team & Attending Intensivist Paged • Bedside Telemetry Stream Connected
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-blue-900 px-3 py-1 rounded-xl border border-blue-400">
            Paging ICU Team
          </span>
        </div>
      )}

      {/* 1. LIVE SOS DISPATCH CONSOLE */}
      {activeSubTab === 'sos_dispatch' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 5 Cols: Emergency Type Selector & Live GPS */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-rose-400" />
                  <span>Select Emergency Scenario</span>
                </h3>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  GPS Active
                </span>
              </div>

              {/* GPS Location Pill */}
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-cyan-300">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>42.3601° N, 71.0589° W</span>
                </span>
                <span className="text-[11px] text-slate-400">Boston Medical District</span>
              </div>

              {/* Emergency Types Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[360px] overflow-y-auto pr-1 no-scrollbar">
                {EMERGENCY_TYPES.map((type) => {
                  const isSelected = selectedEmergencyType.id === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedEmergencyType(type)}
                      className={`p-3 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500 text-white shadow-glow-cyan font-bold scale-[1.01]'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-base">{type.icon}</span>
                        <h4 className="text-xs font-extrabold">{type.label}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{type.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Action Trigger */}
              <button
                onClick={handleTriggerSOS}
                className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-glow-cyan transition-all flex items-center justify-center space-x-2"
              >
                <Flame className="w-4 h-4" />
                <span>Dispatch {selectedEmergencyType.label} SOS</span>
              </button>
            </div>
          </div>

          {/* Right 7 Cols: Real-Time 8-Stage Dispatch Pipeline */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block">
                    NOVA RESCUE Automated Response Engine
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {sosDispatched ? `Live Emergency Dispatch: ${selectedEmergencyType.label}` : 'Ready for Emergency Trigger'}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Patient: {patient.name} ({patient.emergencyPassport.bloodGroup} • {patient.emergencyPassport.criticalAllergies.join(', ')})
                  </p>
                </div>

                {sosDispatched && (
                  <div className="text-right">
                    <span className="text-2xl font-black font-mono text-rose-400 animate-pulse">
                      ETA {etaCountdown} MIN
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">Ambulance Arrival</span>
                  </div>
                )}
              </div>

              {/* 8-Stage Real-Time Pipeline */}
              <div className="space-y-3">
                {[
                  { step: '1. SOS Activated & GPS Captured', status: sosStage >= 1 ? 'Completed' : 'Pending', detail: 'Coordinates broadcast to Regional 911 EMS Grid' },
                  { step: '2. Capability-Ranked Hospital Matched', status: sosStage >= 1 ? 'Completed' : 'Pending', detail: `${matchedHospital.name} (${matchedHospital.traumaLevel}) selected` },
                  { step: '3. Smart Ambulance Assigned', status: sosStage >= 2 ? 'Completed' : 'Pending', detail: `${selectedAmbulance.callSign} (${selectedAmbulance.type}) dispatched with ${selectedAmbulance.paramedicLead}` },
                  { step: '4. Emergency Department Pre-Notified', status: sosStage >= 3 ? 'Completed' : 'Pending', detail: 'Cardiac/Trauma resuscitation team & emergency blood units prepared' },
                  { step: '5. Emergency Health Passport Synced', status: sosStage >= 3 ? 'Completed' : 'Pending', detail: 'Blood Group A-, Anaphylaxis to Penicillin transmitted to paramedic crew' },
                  { step: '6. Bed & ICU Room Reserved', status: sosStage >= 3 ? 'Completed' : 'Pending', detail: 'MICU Bed 03 on standby with Hamilton C6 ventilator' }
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-extrabold text-white">{item.step}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{item.detail}</p>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-900 text-slate-500'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Reset or View Live Telemetry */}
              {sosDispatched && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleResetSOS}
                    className="px-4 py-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all font-semibold"
                  >
                    Reset Simulation
                  </button>

                  <button
                    onClick={() => setActiveTab('patient_monitor')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all flex items-center space-x-1.5"
                  >
                    <span>View In-Transit Bedside Telemetry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* 2. SMART AMBULANCE FINDER & FLEET */}
      {activeSubTab === 'ambulances' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Car className="w-5 h-5 text-cyan-400" />
                  <span>Regional Emergency Ambulance Fleet ({AMBULANCE_FLEET.length} Units Active)</span>
                </h3>
                <p className="text-xs text-slate-400">Live GPS tracking, crew rosters, and specialized biomedical equipment payloads.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AMBULANCE_FLEET.map((amb) => (
                <div key={amb.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block">{amb.type}</span>
                      <h4 className="text-base font-black text-white">{amb.callSign}</h4>
                      <span className="text-xs text-slate-400">{amb.provider}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black font-mono text-emerald-400">{amb.distanceKm} km ({amb.etaMinutes} min)</span>
                      <span className="text-[10px] text-slate-500 font-mono block">● {amb.status}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs font-mono text-slate-300">
                    <div>Crew: <strong className="text-white">{amb.paramedicLead}</strong></div>
                    <div>Location: <span className="text-cyan-300">{amb.currentLocation}</span></div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Onboard Specialized Equipment:</span>
                    <div className="flex flex-wrap gap-1">
                      {amb.equipment.map((eq, i) => (
                        <span key={i} className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedAmbulance(amb);
                      setActiveSubTab('sos_dispatch');
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Dispatch {amb.callSign}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. CAPABILITY-RANKED HOSPITAL MATCHING */}
      {activeSubTab === 'hospital_match' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-black text-white flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              <span>Smart Emergency Hospital Capability-Ranked Matcher</span>
            </h3>
            <p className="text-xs text-slate-400">Ranks facilities based on emergency treatment capabilities (Cath Lab, Stroke Unit, Level-1 Trauma, Burn ICU, OTs).</p>
          </div>

          <div className="space-y-4">
            {EMERGENCY_HOSPITAL_MATCHES.map((hosp, idx) => (
              <div key={hosp.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                        {hosp.traumaLevel}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        Match Score: {hosp.matchScore}%
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white mt-1">{hosp.name}</h4>
                    <p className="text-xs text-cyan-300 mt-0.5">{hosp.bestFitReason}</p>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-black font-mono text-cyan-300">{hosp.distanceKm} km • {hosp.etaMinutes} mins</div>
                    <span className="text-[10px] text-slate-400 font-mono">Emergency ETA</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">ER Beds:</span>
                    <strong className="text-white">{hosp.emergencyBedsAvailable} Available</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">ICU Beds:</span>
                    <strong className="text-emerald-400">{hosp.icuBedsAvailable} Available</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">OT Readiness:</span>
                    <strong className="text-cyan-300">{hosp.otReadiness}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Cath Lab / Stroke:</span>
                    <strong className="text-purple-300">{hosp.cathLabStatus}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. NOVA CAPACITY: BEDS, ICUS, OTS & VENTILATORS */}
      {activeSubTab === 'capacity' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-black text-white flex items-center space-x-2">
              <BedDouble className="w-5 h-5 text-emerald-400" />
              <span>Real-Time Hospital Capacity Grid (Beds, ICUs, OTs & Ventilators)</span>
            </h3>
            <p className="text-xs text-slate-400">Live operational resource telemetry synchronized across Mass General Sentinel campus.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold">Emergency Resuscitation Bays</span>
              <div className="text-2xl font-black font-mono text-white">8 / 32 Available</div>
              <span className="text-xs text-slate-400">Level-1 Trauma Bays</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-emerald-300 uppercase font-bold">ICU / Critical Care Beds</span>
              <div className="text-2xl font-black font-mono text-emerald-400">3 / 24 Available</div>
              <span className="text-xs text-slate-400">MICU & SICU Beds</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-purple-300 uppercase font-bold">Emergency Operating Theatres</span>
              <div className="text-2xl font-black font-mono text-purple-300">2 OTs Ready Now</div>
              <span className="text-xs text-slate-400">Cardiac & Trauma OTs</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-300 uppercase font-bold">Hamilton C6 Ventilators</span>
              <div className="text-2xl font-black font-mono text-amber-300">4 Ready for Intubation</div>
              <span className="text-xs text-slate-400">High-Acuity Invasive Vents</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. NOVA BLOOD: EMERGENCY BANK & DONOR NETWORK */}
      {activeSubTab === 'blood' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-black text-white flex items-center space-x-2">
                <Droplet className="w-5 h-5 text-rose-500" />
                <span>Regional Blood Bank Live Inventory & Donor Grid</span>
              </h3>
              <p className="text-xs text-slate-400">Universal donor tracking (O- Negative), PRBC units, Platelet pheresis, and Plasma reserves.</p>
            </div>

            <button
              onClick={handleRequestBlood}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-glow-cyan transition-all flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{bloodRequestSent ? 'Blood Request Broadcasted!' : 'Emergency 4 Units O- Request'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {REGIONAL_BLOOD_INVENTORY.map((item) => (
              <div key={item.bloodGroup} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black font-mono text-white">{item.bloodGroup}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'Critical Shortage' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' :
                    item.status === 'Low Reserve' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-300 space-y-0.5">
                  <div className="flex justify-between"><span>PRBCs:</span> <strong className="text-white">{item.prbcUnits} Units</strong></div>
                  <div className="flex justify-between"><span>Platelets:</span> <strong className="text-cyan-300">{item.plateletUnits} Units</strong></div>
                  <div className="flex justify-between"><span>Plasma:</span> <strong className="text-purple-300">{item.plasmaUnits} Units</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. NOVA TRANSPLANT: ORGAN DONATION GRID */}
      {activeSubTab === 'transplant' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-black text-white flex items-center space-x-2">
              <Heart className="w-5 h-5 text-amber-400" />
              <span>Authorized Organ Donation & Emergency Transplant Coordination</span>
            </h3>
            <p className="text-xs text-slate-400">UNOS / NOTTO compliant organ procurement, cold ischemia countdown, and air transport escort.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACTIVE_ORGAN_TRANSPLANTS.map((tx) => (
              <div key={tx.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-300 font-bold uppercase block">{tx.donorMatchId}</span>
                    <h4 className="text-base font-black text-white">Donor {tx.organ} Matching ({tx.bloodGroupMatch})</h4>
                    <span className="text-xs text-slate-400">{tx.transplantCenter}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/30">
                    {tx.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ischemia Window Remaining:</span>
                    <strong className="text-rose-400">{tx.ischemiaTimeRemainingHours} Hours Max</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Recipient Urgency:</span>
                    <strong className="text-cyan-300">{tx.recipientUrgencyStatus}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transport Mode:</span>
                    <strong className="text-white">{tx.transportMode}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. DISASTER / MASS-CASUALTY MODE */}
      {activeSubTab === 'disaster' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-black text-white flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Mass-Casualty Incident & Disaster START Triage Mode</span>
            </h3>
            <p className="text-xs text-slate-400">Activated for major multi-vehicle accidents, industrial explosions, or structural collapses.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500 space-y-2">
              <span className="text-xs font-black text-rose-400 uppercase">🔴 RED: IMMEDIATE</span>
              <div className="text-xl font-black font-mono text-white">4 Patients</div>
              <p className="text-[11px] text-slate-400">Severe tension pneumothorax, uncontrolled hemorrhage, airway compromise.</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500 space-y-2">
              <span className="text-xs font-black text-amber-400 uppercase">🟡 YELLOW: DELAYED</span>
              <div className="text-xl font-black font-mono text-white">7 Patients</div>
              <p className="text-[11px] text-slate-400">Open long-bone fractures, stable abdominal trauma without peritonitis.</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500 space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase">🟢 GREEN: MINOR</span>
              <div className="text-xl font-black font-mono text-white">12 Patients</div>
              <p className="text-[11px] text-slate-400">Walking wounded, superficial lacerations, minor sprains.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-black text-slate-400 uppercase">⚫ BLACK: EXPECTANT</span>
              <div className="text-xl font-black font-mono text-slate-300">0 Patients</div>
              <p className="text-[11px] text-slate-500">Unsurvivable traumatic injuries or non-breathing after airway positioning.</p>
            </div>
          </div>
        </div>
      )}

      {/* 8. BREAK-GLASS EMERGENCY ACCESS */}
      {activeSubTab === 'break_glass' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-black text-white flex items-center space-x-2">
              <Unlock className="w-5 h-5 text-cyan-400" />
              <span>Emergency Break-Glass Clinical Access Protocol</span>
            </h3>
            <p className="text-xs text-slate-400">Cryptographically audited emergency access override for unconscious or incapacitated patients.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase">Mandatory Clinical Justification:</label>
              <textarea
                value={breakGlassReason}
                onChange={(e) => setBreakGlassReason(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <span>Audited Physician: <strong className="text-white">Dr. Sarah Lin, MD (Chief Intensivist)</strong></span>
              <span>Session Duration: <strong className="text-cyan-300">1 Hour Self-Destruct</strong></span>
            </div>

            <button
              onClick={() => setIsBreakGlassUnlocked(true)}
              className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan transition-all flex items-center justify-center space-x-2"
            >
              <Unlock className="w-4 h-4" />
              <span>{isBreakGlassUnlocked ? '✅ Break-Glass Access Active (Full EHR Unlocked)' : 'Confirm Break-Glass Emergency Unlock'}</span>
            </button>

            {isBreakGlassUnlocked && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-xs text-emerald-300 space-y-1 animate-pulse">
                <div className="font-bold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Break-Glass Token [KEY-BG-8849-MASS-GEN] Verified</span>
                </div>
                <p className="text-[11px] text-emerald-400/80">Full EHR records, past surgical history, and genetic profiles temporarily accessible for emergency triage.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
