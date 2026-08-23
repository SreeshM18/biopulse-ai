import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Wind, 
  Thermometer, 
  Radio, 
  ShieldAlert, 
  ArrowRight, 
  Sliders, 
  Sparkles, 
  QrCode, 
  FileText,
  Clock,
  RotateCcw,
  Zap,
  TrendingDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';
import { PatientProfile, TabType } from '../types/biotech';

interface PatientMonitorProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const PatientMonitor: React.FC<PatientMonitorProps> = ({ patient, setActiveTab }) => {
  const [liveVitals, setLiveVitals] = useState(patient.vitals);
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);

  // Sync state if selected patient changes
  useEffect(() => {
    setLiveVitals(patient.vitals);
  }, [patient]);

  // Live vitals jitter simulation
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      setLiveVitals((prev) => {
        const deltaHr = Math.floor(Math.random() * 5) - 2;
        const newHr = Math.max(50, Math.min(160, prev.heartRate + deltaHr));
        const deltaSpo2 = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newSpo2 = Math.max(70, Math.min(100, prev.spo2 + deltaSpo2));
        
        return {
          ...prev,
          heartRate: newHr,
          spo2: newSpo2,
          lastUpdated: 'Just now'
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  const simulateIntervention = () => {
    setLiveVitals(prev => ({
      ...prev,
      heartRate: 92,
      spo2: 96,
      respiratoryRate: 19,
      temperature: 37.4,
      systolicBp: 114,
      diastolicBp: 70,
      news2Score: 2,
      lastUpdated: 'Stabilized post-intervention'
    }));
  };

  const resetToBaseline = () => {
    setLiveVitals(patient.vitals);
  };

  const risk = patient.riskAssessment.riskLevel;

  return (
    <div className="space-y-6">
      
      {/* Patient Profile Header Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center space-x-2.5 mb-1.5">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan">
                {patient.bedLocation}
              </span>
              <span className="text-xs font-mono text-slate-400">
                MRN: <strong className="text-white">{patient.mrn}</strong>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Blood Group: {patient.emergencyPassport.bloodGroup}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {patient.name}
            </h2>
            
            <p className="text-xs text-slate-300 max-w-3xl mt-1">
              <strong>Admission Diagnosis:</strong> {patient.primaryDiagnosis} • <em>Attending: {patient.attendingPhysician}</em>
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('xai_risk')}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explainable AI Risk Engine ({patient.riskAssessment.overallRiskScore}%)</span>
            </button>

            <button
              onClick={() => setActiveTab('emergency_qr')}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Emergency QR Passport</span>
            </button>
          </div>

        </div>

        {/* Live Simulation Controls */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-slate-300">
              Live Biosensor Stream: <strong className="text-cyan-300">{liveVitals.lastUpdated}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={simulateIntervention}
              className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 font-bold transition-all"
            >
              ⚡ Simulate High-Flow O2 & IV Bolus
            </button>

            <button
              onClick={resetToBaseline}
              className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium transition-all"
            >
              <RotateCcw className="w-3 h-3 inline mr-1" />
              Reset Vitals
            </button>
          </div>
        </div>
      </div>

      {/* 5 Live Vital Sign Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        
        {/* Heart Rate */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center space-x-1">
              <Heart className={`w-3.5 h-3.5 ${liveVitals.heartRate > 100 ? 'text-rose-400 animate-bounce' : 'text-slate-400'}`} />
              <span>Heart Rate</span>
            </span>
            <span className="text-[10px] font-mono">BPM</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {liveVitals.heartRate}
          </div>
          <div className="text-[10px] font-mono text-slate-500">Normal: 60 - 90</div>
        </div>

        {/* SpO2 */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center space-x-1">
              <Activity className={`w-3.5 h-3.5 ${liveVitals.spo2 < 92 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
              <span>SpO2 Saturation</span>
            </span>
            <span className="text-[10px] font-mono">%</span>
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-mono ${liveVitals.spo2 < 92 ? 'text-rose-400' : 'text-cyan-300'}`}>
            {liveVitals.spo2}%
          </div>
          <div className="text-[10px] font-mono text-slate-500">Normal: 95 - 100%</div>
        </div>

        {/* Respiratory Rate */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center space-x-1">
              <Wind className={`w-3.5 h-3.5 ${liveVitals.respiratoryRate > 24 ? 'text-rose-400' : 'text-slate-400'}`} />
              <span>Resp Rate</span>
            </span>
            <span className="text-[10px] font-mono">br/min</span>
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-mono ${liveVitals.respiratoryRate > 24 ? 'text-rose-400' : 'text-white'}`}>
            {liveVitals.respiratoryRate}
          </div>
          <div className="text-[10px] font-mono text-slate-500">Normal: 12 - 20</div>
        </div>

        {/* Core Temperature */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center space-x-1">
              <Thermometer className={`w-3.5 h-3.5 ${liveVitals.temperature >= 38.0 ? 'text-rose-400' : 'text-amber-400'}`} />
              <span>Core Temp</span>
            </span>
            <span className="text-[10px] font-mono">°C</span>
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-mono ${liveVitals.temperature >= 38.0 ? 'text-rose-400' : 'text-amber-300'}`}>
            {liveVitals.temperature}°C
          </div>
          <div className="text-[10px] font-mono text-slate-500">Normal: 36.5 - 37.5</div>
        </div>

        {/* Blood Pressure */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span className="flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Blood Pressure</span>
            </span>
            <span className="text-[10px] font-mono">mmHg</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {liveVitals.systolicBp}/{liveVitals.diastolicBp}
          </div>
          <div className="text-[10px] font-mono text-slate-500">Target: 120/80</div>
        </div>

      </div>

      {/* 24-Hour Longitudinal Trend Analytics */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <TrendingDown className="w-4 h-4 text-cyan-400" />
              <span>24-Hour Longitudinal Vitals Deterioration Horizon</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracks continuous SpO2 desaturation and concurrent tachycardia escalation leading up to current status.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="flex items-center space-x-1 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
              <span>SpO2 (%)</span>
            </span>
            <span className="flex items-center space-x-1 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              <span>Heart Rate (bpm)</span>
            </span>
          </div>
        </div>

        {/* Multi-Line Chart */}
        <div className="w-full h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={patient.vitalsHistory} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[60, 140]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#090e1d', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={2.5} name="Heart Rate (BPM)" />
              <Line type="monotone" dataKey="spo2" stroke="#00f2fe" strokeWidth={2.5} name="SpO2 (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
