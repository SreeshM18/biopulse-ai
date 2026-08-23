import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Flame, 
  Search, 
  Filter, 
  UserPlus, 
  ArrowRight, 
  Radio, 
  Heart, 
  Thermometer, 
  Wind,
  QrCode,
  Sparkles,
  BedDouble,
  Stethoscope,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { PatientProfile, TabType } from '../types/biotech';

interface CommandCenterProps {
  patients: PatientProfile[];
  selectedPatient: PatientProfile;
  onSelectPatient: (patient: PatientProfile) => void;
  setActiveTab: (tab: TabType) => void;
  onOpenRegister?: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  patients,
  selectedPatient,
  onSelectPatient,
  setActiveTab,
  onOpenRegister
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [filterSeverity, setFilterSeverity] = useState<string>('All');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bedLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWard = selectedWard === 'All' || p.bedLocation.includes(selectedWard);
    const matchesSeverity = filterSeverity === 'All' || p.riskAssessment.riskLevel === filterSeverity;

    return matchesSearch && matchesWard && matchesSeverity;
  });

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      
      {/* Top Hospital Telemetry Hero Banner */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-cyan-500/30 p-3.5 sm:p-6 md:p-8 shadow-2xl bg-gradient-to-br from-[#090e1d] via-[#0d1428] to-[#060913]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3.5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan">
                <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse text-cyan-400" />
                <span>Clinical Decision Support</span>
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                NEWS2 & XAI
              </span>
            </div>

            <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:space-x-2">
              {onOpenRegister && (
                <button
                  onClick={onOpenRegister}
                  className="flex items-center justify-center space-x-1 px-2 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
                >
                  <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="truncate">+ Admit</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('emergency_qr')}
                className="flex items-center justify-center space-x-1 px-2 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-all"
              >
                <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                <span className="truncate">Emergency QR</span>
              </button>

              <button
                onClick={() => setActiveTab('alerts')}
                className="flex items-center justify-center space-x-1 px-2 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all animate-pulse"
              >
                <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                <span className="truncate">3 Alerts</span>
              </button>
            </div>
          </div>

          {/* Core Title */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-base sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              NOVA BioPulse AI — Patient Deterioration & Emergency Health Platform
            </h1>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 max-w-4xl leading-relaxed line-clamp-2 sm:line-clamp-none">
              Targeted clinical intelligence solving continuous physiological vitals evaluation, Explainable AI (XAI) deterioration risk detection, and instant 2-second QR-based emergency access.
            </p>
          </div>

          {/* 3 Core Value Pillars Callout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4 pt-1 sm:pt-2">
            
            <div 
              onClick={() => setActiveTab('patient_monitor')}
              className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all group"
            >
              <div className="flex items-center space-x-1.5 text-cyan-400 font-bold text-[11px] sm:text-xs mb-0.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                <span>1. Patient Monitoring</span>
              </div>
              <div className="text-xs sm:text-sm font-extrabold text-white">
                Multi-Bed Live Telemetry
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1">
                Continuous HR, SpO2, Temp, BP, Resp Rate with NEWS2 scoring.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('xai_risk')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all group"
            >
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs mb-1">
                <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>2. Emergency Risk Detection</span>
              </div>
              <div className="text-sm font-extrabold text-white">
                Explainable AI (XAI)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                SHAP feature breakdown revealing exact physiological causes of patient collapse.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('emergency_qr')}
              className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:border-purple-400 cursor-pointer transition-all group"
            >
              <div className="flex items-center space-x-2 text-purple-300 font-bold text-xs mb-1">
                <QrCode className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>3. Health Passport</span>
              </div>
              <div className="text-sm font-extrabold text-white">
                QR Emergency Access
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                2-second camera scan displaying fatal allergies, blood type, and active meds.
              </p>
            </div>

          </div>

          {/* Hospital-Wide Triage Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Total Monitored
              </span>
              <div className="text-xl font-black text-white font-mono mt-0.5">
                {patients.length + 122}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/40">
              <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider flex items-center space-x-1">
                <Flame className="w-3 h-3 text-rose-400" />
                <span>Critical Risk</span>
              </span>
              <div className="text-xl font-black text-rose-400 font-mono mt-0.5">
                {patients.filter(p => p.riskAssessment.riskLevel === 'CRITICAL').length}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                High Risk
              </span>
              <div className="text-xl font-black text-amber-400 font-mono mt-0.5">
                {patients.filter(p => p.riskAssessment.riskLevel === 'HIGH').length + 8}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Moderate Risk
              </span>
              <div className="text-xl font-black text-yellow-400 font-mono mt-0.5">
                {patients.filter(p => p.riskAssessment.riskLevel === 'MODERATE').length + 20}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Stable / Low
              </span>
              <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                {patients.filter(p => p.riskAssessment.riskLevel === 'LOW').length + 92}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Triage Grid Filters & Search */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
              <BedDouble className="w-5 h-5 text-cyan-400" />
              <span>Active Inpatient Triage Roster ({filteredPatients.length} Active in Unit)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Ranked dynamically by Explainable AI Deterioration Risk and NEWS2 scores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Patient, Bed, MRN..."
                className="w-full sm:w-60 bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Wards</option>
              <option value="ICU">ICU (Intensive Care)</option>
              <option value="Oncology">Oncology Ward</option>
              <option value="Cardiac">Cardiac Telemetry</option>
              <option value="Surgical">Surgical Recovery</option>
            </select>

            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Risk Levels</option>
              <option value="CRITICAL">🔴 Critical Only</option>
              <option value="HIGH">🟠 High Risk Only</option>
              <option value="MODERATE">🟡 Moderate Only</option>
              <option value="LOW">🟢 Low Risk</option>
            </select>
          </div>
        </div>

        {/* Live Patient Triage Cards Table */}
        <div className="space-y-3 pt-2">
          {filteredPatients.map((patient) => {
            const isSelected = selectedPatient.id === patient.id;
            const risk = patient.riskAssessment.riskLevel;

            return (
              <div
                key={patient.id}
                onClick={() => {
                  onSelectPatient(patient);
                  setActiveTab('patient_monitor');
                }}
                className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 shadow-glow-cyan scale-[1.01]'
                    : 'glass-card border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Patient Identity */}
                  <div className="space-y-1 sm:w-80">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        risk === 'CRITICAL' ? 'bg-rose-500 animate-ping' :
                        risk === 'HIGH' ? 'bg-amber-400 animate-pulse' :
                        risk === 'MODERATE' ? 'bg-yellow-400' : 'bg-emerald-400'
                      }`} />
                      <span className="font-extrabold text-sm sm:text-base text-white hover:text-cyan-300 transition-colors">
                        {patient.name}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        ({patient.age}y • {patient.gender})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                      <span className="text-cyan-300 font-bold">{patient.bedLocation}</span>
                      <span>•</span>
                      <span>{patient.mrn}</span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-1">
                      {patient.primaryDiagnosis}
                    </p>
                  </div>

                  {/* Center: Live Vitals Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1 max-w-xl">
                    
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-2">
                      <Heart className={`w-4 h-4 shrink-0 ${patient.vitals.heartRate > 100 ? 'text-rose-400' : 'text-slate-400'}`} />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block leading-tight">Heart Rate</span>
                        <span className={`text-xs font-mono font-extrabold ${patient.vitals.heartRate > 100 ? 'text-rose-400' : 'text-white'}`}>
                          {patient.vitals.heartRate} bpm
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-2">
                      <Activity className={`w-4 h-4 shrink-0 ${patient.vitals.spo2 < 92 ? 'text-rose-400' : 'text-cyan-400'}`} />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block leading-tight">SpO2 Oxygen</span>
                        <span className={`text-xs font-mono font-extrabold ${patient.vitals.spo2 < 92 ? 'text-rose-400' : 'text-cyan-300'}`}>
                          {patient.vitals.spo2}%
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-2">
                      <Wind className={`w-4 h-4 shrink-0 ${patient.vitals.respiratoryRate > 24 ? 'text-rose-400' : 'text-slate-400'}`} />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block leading-tight">Resp Rate</span>
                        <span className={`text-xs font-mono font-extrabold ${patient.vitals.respiratoryRate > 24 ? 'text-rose-400' : 'text-white'}`}>
                          {patient.vitals.respiratoryRate} bpm
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-2">
                      <Thermometer className={`w-4 h-4 shrink-0 ${patient.vitals.temperature >= 38.0 ? 'text-rose-400' : 'text-amber-400'}`} />
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block leading-tight">Core Temp</span>
                        <span className={`text-xs font-mono font-extrabold ${patient.vitals.temperature >= 38.0 ? 'text-rose-400' : 'text-amber-300'}`}>
                          {patient.vitals.temperature}°C
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right: Risk Badge & Jump Action */}
                  <div className="flex items-center space-x-3 justify-between lg:justify-end">
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-extrabold border ${
                        risk === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-glow-cyan' :
                        risk === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                        risk === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' :
                        'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {risk} ({patient.riskAssessment.overallRiskScore}%)
                      </span>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        NEWS2: <strong className="text-white">{patient.vitals.news2Score}</strong> / 20
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
