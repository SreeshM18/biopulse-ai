import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Activity, 
  Wind, 
  Thermometer, 
  ArrowRight, 
  Sparkles, 
  QrCode, 
  FileText, 
  RotateCcw, 
  Zap, 
  TrendingDown,
  Volume2,
  VolumeX,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Radio
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { PatientProfile, TabType } from '../types/biotech';

interface PatientMonitorProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const PatientMonitor: React.FC<PatientMonitorProps> = ({ patient, setActiveTab }) => {
  const [liveVitals, setLiveVitals] = useState(patient.vitals);
  const [isLiveStream, setIsLiveStream] = useState<boolean>(true);
  const [isAlarmSilenced, setIsAlarmSilenced] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync state if selected patient changes
  useEffect(() => {
    setLiveVitals(patient.vitals);
  }, [patient]);

  // Web Audio API Pulse Synthesizer
  const playPulseBeep = () => {
    if (isAudioMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // Standard clinical pitch
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch (e) {
      // Audio context fallback
    }
  };

  // Live vitals jitter simulation
  useEffect(() => {
    if (!isLiveStream) return;

    const interval = setInterval(() => {
      setLiveVitals((prev) => {
        const deltaHr = Math.floor(Math.random() * 3) - 1;
        const newHr = Math.max(50, Math.min(160, prev.heartRate + deltaHr));
        const deltaSpo2 = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newSpo2 = Math.max(70, Math.min(100, prev.spo2 + deltaSpo2));
        
        return {
          ...prev,
          heartRate: newHr,
          spo2: newSpo2,
          lastUpdated: 'Live Stream'
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveStream]);

  // Realtime Dual Waveform (ECG Lead II + Pleth) Canvas Sweep Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const height = canvas.height;
    const width = canvas.width;
    
    // Channel 1: Lead II ECG (top half)
    const ecgMidY = height * 0.28;
    // Channel 2: SpO2 Plethysmograph (bottom half)
    const plethMidY = height * 0.72;

    ctx.fillStyle = '#070a12';
    ctx.fillRect(0, 0, width, height);

    const render = () => {
      // Trail fade erase block
      ctx.fillStyle = '#070a12';
      ctx.fillRect(x, 0, 10, height);

      // --- Channel 1: Lead II ECG ---
      const cyclePos = x % 130;
      let ecgY = ecgMidY;

      if (cyclePos > 28 && cyclePos < 42) {
        // P-wave
        ecgY = ecgMidY - Math.sin((cyclePos - 28) / 14 * Math.PI) * 9;
      } else if (cyclePos >= 42 && cyclePos < 47) {
        // Q-dip
        ecgY = ecgMidY + 7;
      } else if (cyclePos >= 47 && cyclePos < 56) {
        // R-spike
        ecgY = ecgMidY - 42;
        if (cyclePos === 48) {
          playPulseBeep();
        }
      } else if (cyclePos >= 56 && cyclePos < 61) {
        // S-dip
        ecgY = ecgMidY + 14;
      } else if (cyclePos >= 72 && cyclePos < 94) {
        // T-wave
        ecgY = ecgMidY - Math.sin((cyclePos - 72) / 22 * Math.PI) * 15;
      }

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(x - 1, ecgMidY);
      ctx.lineTo(x, ecgY);
      ctx.stroke();

      // --- Channel 2: SpO2 Plethysmograph Pulse Wave ---
      const plethCycle = x % 130;
      let plethY = plethMidY;

      if (plethCycle >= 46 && plethCycle < 78) {
        // Systolic upstroke & dicrotic notch
        const p = (plethCycle - 46) / 32;
        plethY = plethMidY - Math.sin(p * Math.PI) * 22;
      } else if (plethCycle >= 78 && plethCycle < 98) {
        // Diastolic wave
        const p = (plethCycle - 78) / 20;
        plethY = plethMidY - Math.sin(p * Math.PI) * 7;
      }

      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x - 1, plethMidY);
      ctx.lineTo(x, plethY);
      ctx.stroke();

      x = (x + 2) % width;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAudioMuted]);

  const simulateIntervention = () => {
    setLiveVitals(prev => ({
      ...prev,
      heartRate: 88,
      spo2: 98,
      respiratoryRate: 16,
      temperature: 37.1,
      systolicBp: 118,
      diastolicBp: 76,
      news2Score: 1,
      lastUpdated: 'Stabilized post-titration'
    }));
  };

  const resetToBaseline = () => {
    setLiveVitals(patient.vitals);
  };

  const isCritical = patient.riskAssessment.riskLevel === 'CRITICAL';
  const isHigh = patient.riskAssessment.riskLevel === 'HIGH';

  // Calculate Mean Arterial Pressure (MAP) = (2*Diastolic + Systolic) / 3
  const mapValue = Math.round((2 * liveVitals.diastolicBp + liveVitals.systolicBp) / 3);

  return (
    <div className="space-y-5">
      
      {/* Bedside Inpatient Header */}
      <div className="pro-card p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-sky-950 text-sky-400 border border-sky-800">
                {patient.bedLocation}
              </span>
              <span className="font-mono text-xs text-slate-400">
                MRN: <strong className="text-slate-200">{patient.mrn}</strong>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-300">
                {patient.age} y/o {patient.gender} • Blood Group: <strong className="text-white">{patient.emergencyPassport.bloodGroup}</strong>
              </span>
              <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider border ${
                isCritical
                  ? 'bg-rose-950 text-rose-300 border-rose-800'
                  : isHigh
                  ? 'bg-amber-950 text-amber-300 border-amber-800'
                  : 'bg-emerald-950 text-emerald-300 border-emerald-800'
              }`}>
                Triage Acuity: {patient.riskAssessment.riskLevel}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {patient.name}
            </h2>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
              <span>Primary Diagnosis: <strong className="text-slate-200 font-medium">{patient.primaryDiagnosis}</strong></span>
              <span>•</span>
              <span>Attending: <strong className="text-slate-200 font-medium">{patient.attendingPhysician}</strong></span>
              <span>•</span>
              <span>Code Status: <strong className="text-emerald-400 font-medium">{patient.emergencyPassport.resuscitationDNR ? 'DNR / DNI' : 'Full Code'}</strong></span>
            </div>
          </div>

          {/* Direct Clinical Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('whole_body')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Physician Workstation & SOAP</span>
            </button>

            <button
              onClick={() => setActiveTab('prescription_vault')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition-colors"
            >
              <span>Pharmacy Orders</span>
            </button>

            <button
              onClick={() => setActiveTab('emergency_qr')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-medium transition-colors"
            >
              <QrCode className="h-3.5 w-3.5 text-slate-400" />
              <span>Emergency Passport</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Bedside Telemetry Station */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Live Dual-Channel Waveform Monitor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="pro-card p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Continuous Telemetry Monitor
                </span>
                <span className="text-[11px] font-mono text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                  Lead II • 250 Hz
                </span>
              </div>

              {/* Controls Toolbar */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className={`p-1.5 rounded text-xs border transition-colors ${
                    isAudioMuted 
                      ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300' 
                      : 'bg-emerald-950 border-emerald-800 text-emerald-300'
                  }`}
                  title={isAudioMuted ? 'Unmute Pulse Audio' : 'Mute Pulse Audio'}
                >
                  {isAudioMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                </button>

                <button
                  onClick={() => setIsAlarmSilenced(!isAlarmSilenced)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                    isAlarmSilenced 
                      ? 'bg-amber-950 text-amber-300 border-amber-800' 
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {isAlarmSilenced ? 'Alarm Silenced (2m)' : 'Silence Alarm'}
                </button>
              </div>
            </div>

            {/* Dual Waveform Canvas */}
            <div className="relative rounded-lg overflow-hidden bg-[#070a12] border border-slate-800 p-1">
              <div className="absolute top-2 left-3 z-10 flex items-center space-x-4 text-[10px] font-mono">
                <span className="text-sky-400 font-bold">CH1: ECG Lead II (mV)</span>
                <span className="text-emerald-400 font-bold">CH2: SpO2 Pleth Wave</span>
              </div>
              <canvas
                ref={canvasRef}
                width={650}
                height={220}
                className="w-full h-52 block"
              />
            </div>

            {/* Rhythm Assessment Footer */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
              <div className="flex items-center space-x-2">
                <span className="text-slate-300">Rhythm:</span>
                <span className="text-white font-semibold">
                  {patient.wholeBodyTelemetry?.heart.rhythm || 'Normal Sinus Rhythm (NSR)'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Telemetry Status:</span>
                <span className="text-emerald-400 font-bold">{liveVitals.lastUpdated}</span>
              </div>
            </div>

          </div>

          {/* Clinical Simulation Actions */}
          <div className="pro-card p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white">Bedside Response Simulator:</span> Test clinician interventions & vitals stabilization.
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={simulateIntervention}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Titrate O2 & IV Bolus</span>
              </button>
              <button
                onClick={resetToBaseline}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium transition-colors flex items-center space-x-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Baseline</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: 5 High-Density Numeric Parameter Blocks (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          
          {/* 1. Heart Rate */}
          <div className="pro-card p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 text-rose-400 font-semibold">
                <Heart className="h-4 w-4" />
                <span>HEART RATE</span>
              </span>
              <span className="font-mono text-[10px]">BPM (60-100)</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl sm:text-4xl font-black font-tabular text-white tracking-tight">
                {liveVitals.heartRate}
              </span>
              <span className="text-xs font-mono text-slate-500">bpm</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-1">
              Limits: 50 - 120
            </div>
          </div>

          {/* 2. SpO2 */}
          <div className="pro-card p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 text-sky-400 font-semibold">
                <Activity className="h-4 w-4" />
                <span>SpO2 PLETH</span>
              </span>
              <span className="font-mono text-[10px]">% (95-100)</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className={`text-3xl sm:text-4xl font-black font-tabular tracking-tight ${
                liveVitals.spo2 < 92 ? 'text-rose-400' : 'text-white'
              }`}>
                {liveVitals.spo2}
              </span>
              <span className="text-xs font-mono text-slate-500">%</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-1">
              Limits: 90 - 100
            </div>
          </div>

          {/* 3. Non-Invasive Blood Pressure (NIBP) & MAP */}
          <div className="pro-card p-4 space-y-1 col-span-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                <Activity className="h-4 w-4" />
                <span>NIBP BLOOD PRESSURE</span>
              </span>
              <span className="font-mono text-[10px]">SYS / DIA (mmHg)</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-black font-tabular text-white tracking-tight">
                  {liveVitals.systolicBp}/{liveVitals.diastolicBp}
                </span>
                <span className="text-xs font-mono text-slate-500">mmHg</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">MEAN (MAP)</span>
                <span className="text-lg font-bold font-mono text-amber-400">
                  {mapValue} <span className="text-xs font-normal text-slate-500">mmHg</span>
                </span>
              </div>
            </div>
          </div>

          {/* 4. Respiratory Rate */}
          <div className="pro-card p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                <Wind className="h-4 w-4" />
                <span>RESP RATE</span>
              </span>
              <span className="font-mono text-[10px]">RPM (12-20)</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl sm:text-4xl font-black font-tabular text-white tracking-tight">
                {liveVitals.respiratoryRate}
              </span>
              <span className="text-xs font-mono text-slate-500">rpm</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 pt-1">
              Limits: 10 - 28
            </div>
          </div>

          {/* 5. Core Temp & NEWS2 Score */}
          <div className="pro-card p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 text-purple-400 font-semibold">
                <Thermometer className="h-4 w-4" />
                <span>CORE TEMP</span>
              </span>
              <span className="font-mono text-[10px]">°C / NEWS2</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl sm:text-4xl font-black font-tabular text-white tracking-tight">
                  {liveVitals.temperature}
                </span>
                <span className="text-xs font-mono text-slate-500">°C</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">NEWS2</span>
                <span className={`text-base font-bold font-mono px-2 py-0.5 rounded border ${
                  liveVitals.news2Score >= 7 
                    ? 'bg-rose-950 text-rose-300 border-rose-800' 
                    : liveVitals.news2Score >= 5 
                    ? 'bg-amber-950 text-amber-300 border-amber-800' 
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  Score {liveVitals.news2Score}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 24-Hour Longitudinal Multi-Parameter Trend Chart */}
      <div className="pro-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Clock className="h-4 w-4 text-sky-400" />
              <span>24-Hour Longitudinal Vitals & NEWS2 Trajectory</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous multi-parameter hemodynamic trend recorded at 4-hour clinical intervals.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400 inline-block" />
              <span>Heart Rate</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400 inline-block" />
              <span>SpO2 %</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 inline-block" />
              <span>Systolic BP</span>
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={patient.vitalsHistory && patient.vitalsHistory.length > 0 ? patient.vitalsHistory : [
              { time: '00:00', heartRate: 78, spo2: 98, systolicBp: 120, respiratoryRate: 16, temperature: 36.8 },
              { time: '04:00', heartRate: 82, spo2: 97, systolicBp: 122, respiratoryRate: 17, temperature: 37.0 },
              { time: '08:00', heartRate: 86, spo2: 96, systolicBp: 125, respiratoryRate: 18, temperature: 37.2 },
              { time: '12:00', heartRate: 94, spo2: 95, systolicBp: 130, respiratoryRate: 19, temperature: 37.5 },
              { time: '16:00', heartRate: liveVitals.heartRate, spo2: liveVitals.spo2, systolicBp: liveVitals.systolicBp, respiratoryRate: liveVitals.respiratoryRate, temperature: liveVitals.temperature }
            ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0c1220',
                  borderColor: '#1e2c44',
                  borderRadius: '8px',
                  color: '#f8fafc',
                  fontSize: '11px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                }}
              />
              <Line type="monotone" dataKey="heartRate" name="Heart Rate (BPM)" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444' }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="spo2" name="SpO2 (%)" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3, fill: '#38bdf8' }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="systolicBp" name="Systolic BP (mmHg)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
};
