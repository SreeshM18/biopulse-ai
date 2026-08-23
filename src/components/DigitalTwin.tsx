import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Watch, 
  TrendingDown, 
  Sliders, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Sparkles, 
  Clock, 
  RotateCcw,
  CheckCircle2,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  LineChart, 
  Line 
} from 'recharts';
import { PatientCaseStudy, WearableTelemetry, DigitalTwinSimulationPoint } from '../types/biotech';

interface DigitalTwinProps {
  patientCase: PatientCaseStudy;
}

export const DigitalTwin: React.FC<DigitalTwinProps> = ({ patientCase }) => {
  // Dose & Simulation Controls
  const [dosageMg, setDosageMg] = useState<number>(150);
  const [selectedRegimen, setSelectedRegimen] = useState<string>(
    patientCase.recommendedDrugs[0] || 'Targeted Selective Inhibitor'
  );
  const [adherenceRate, setAdherenceRate] = useState<number>(95);
  const [isSimulatingLive, setIsSimulatingLive] = useState<boolean>(true);

  // Live Wearable Telemetry State
  const [telemetry, setTelemetry] = useState<WearableTelemetry>({
    timestamp: new Date().toLocaleTimeString(),
    heartRate: 74,
    hrv: 48,
    bodyTemp: 36.8,
    spo2: 98,
    systolicBp: 118,
    diastolicBp: 78,
    activitySteps: 6420,
    ctDnaFraction: 2.4,
    status: 'Normal',
    alertMessage: 'All physiological telemetry streams within stable baseline.'
  });

  // Simulated live pulse effect
  useEffect(() => {
    if (!isSimulatingLive) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const deltaHr = Math.floor(Math.random() * 5) - 2;
        const newHr = Math.min(Math.max(prev.heartRate + deltaHr, 68), 92);
        const deltaTemp = (Math.random() * 0.1 - 0.05);
        const newTemp = Math.round((prev.bodyTemp + deltaTemp) * 10) / 10;
        
        let status: 'Normal' | 'Warning' | 'Critical Alert' = 'Normal';
        let alertMsg = 'All physiological telemetry streams within stable baseline.';

        if (newTemp >= 38.0) {
          status = 'Critical Alert';
          alertMsg = 'Febrile neutropenic temperature threshold exceeded! Preemptive CBC recommended.';
        } else if (newHr > 88) {
          status = 'Warning';
          alertMsg = 'Elevated resting tachycardia detected during nocturnal rest period.';
        }

        return {
          ...prev,
          timestamp: new Date().toLocaleTimeString(),
          heartRate: newHr,
          hrv: Math.max(35, Math.min(65, prev.hrv + (Math.random() * 4 - 2))),
          bodyTemp: newTemp,
          status,
          alertMessage: alertMsg
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulatingLive]);

  // Compute dynamic trajectory curve based on dosage and patient genetics
  const generateTrajectory = (): DigitalTwinSimulationPoint[] => {
    const points: DigitalTwinSimulationPoint[] = [];
    const baseVolume = 2600; // mm3
    const potencyFactor = Math.min(dosageMg / 100, 2.5);
    const adherenceFactor = adherenceRate / 100;

    for (let week = 0; week <= 36; week += 2) {
      let tumorVolume: number;
      
      // If contraindicated drug selected, tumor escapes rapidly
      if (selectedRegimen.includes('Sotorasib') && patientCase.primaryVariant.includes('G12D')) {
        tumorVolume = Math.round(baseVolume * (1 + 0.08 * week));
      } else {
        // Effective drug regression model
        const regressionRate = 0.065 * potencyFactor * adherenceFactor;
        tumorVolume = Math.max(120, Math.round(baseVolume * Math.exp(-regressionRate * week)));
      }

      const toxicityScore = Math.min(100, Math.round((dosageMg / 250) * 45 + (week * 0.8)));
      const immuneActivity = Math.min(95, Math.round(40 + potencyFactor * 15 - (toxicityScore * 0.2)));

      points.push({
        day: week,
        tumorVolumeMm3: tumorVolume,
        toxicityScore,
        immuneActivity,
        treatmentResponse: Math.round(((baseVolume - tumorVolume) / baseVolume) * 100)
      });
    }

    return points;
  };

  const trajectoryData = generateTrajectory();
  const currentPredictedVolume = trajectoryData[trajectoryData.length - 1].tumorVolumeMm3;
  const initialVolume = trajectoryData[0].tumorVolumeMm3;
  const overallReductionPct = Math.round(((initialVolume - currentPredictedVolume) / initialVolume) * 100);

  const toxicityLevel = dosageMg > 220 ? 'High' : dosageMg > 140 ? 'Moderate' : 'Low';

  const triggerStressEvent = () => {
    setTelemetry(prev => ({
      ...prev,
      heartRate: 104,
      bodyTemp: 38.3,
      spo2: 95,
      status: 'Critical Alert',
      alertMessage: '⚠️ Febrile Surge Detected: Temperature spike (38.3°C) + Tachycardia (104 bpm). Preemptive triage initiated.'
    }));
  };

  const resetVitals = () => {
    setTelemetry({
      timestamp: new Date().toLocaleTimeString(),
      heartRate: 72,
      hrv: 52,
      bodyTemp: 36.7,
      spo2: 99,
      systolicBp: 116,
      diastolicBp: 76,
      activitySteps: 6420,
      ctDnaFraction: 2.4,
      status: 'Normal',
      alertMessage: 'All physiological telemetry streams within stable baseline.'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                In-Silico Physiological Avatar
              </span>
              <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span>Wearable IoT Stream Synced</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Activity className="w-6 h-6 text-cyan-400" />
              <span>Patient Digital Twin & Wearable Health Telemetry Link</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Simulate patient pharmacokinetic drug response, tumor volumetric regression, and adverse event risks linked to real-time wearable biosensor streams.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={triggerStressEvent}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 transition-all"
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Simulate Febrile Flare</span>
            </button>

            <button
              onClick={resetVitals}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Baseline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Wearable Telemetry Bar (Smart Health Stream) */}
      <div className="glass-card rounded-2xl p-5 border border-cyan-500/30 shadow-glow-cyan space-y-4 bg-gradient-to-r from-[#0d1428] via-[#090e1d] to-[#0d1428]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Watch className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-white">Continuous Biomonitor Sync (Device: Apple Watch Ultra / Bio-Patch)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Last Telemetry Packet: <strong className="text-cyan-300">{telemetry.timestamp}</strong> • Bluetooth BLE 5.4 Encrypted
              </span>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${
            telemetry.status === 'Critical Alert'
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-glow-cyan animate-pulse'
              : telemetry.status === 'Warning'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>Status: {telemetry.status}</span>
          </div>
        </div>

        {/* Live Vitals Gauge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
              <Heart className="w-3 h-3 text-rose-400" />
              <span>Heart Rate</span>
            </span>
            <div className="text-xl font-black text-white font-mono flex items-baseline space-x-1">
              <span>{telemetry.heartRate}</span>
              <span className="text-[10px] font-normal text-slate-400">BPM</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Resting range: 60-80</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>HRV Recovery</span>
            </span>
            <div className="text-xl font-black text-cyan-300 font-mono flex items-baseline space-x-1">
              <span>{Math.round(telemetry.hrv)}</span>
              <span className="text-[10px] font-normal text-slate-400">ms</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Autonomic tone: Good</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
              <Thermometer className="w-3 h-3 text-amber-400" />
              <span>Core Temp</span>
            </span>
            <div className={`text-xl font-black font-mono flex items-baseline space-x-1 ${
              telemetry.bodyTemp >= 38.0 ? 'text-rose-400 font-extrabold' : 'text-amber-300'
            }`}>
              <span>{telemetry.bodyTemp}</span>
              <span className="text-[10px] font-normal text-slate-400">°C</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Febrile limit: 38.0°C</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>SpO2 Oxygen</span>
            </span>
            <div className="text-xl font-black text-emerald-300 font-mono flex items-baseline space-x-1">
              <span>{telemetry.spo2}</span>
              <span className="text-[10px] font-normal text-slate-400">%</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Continuous pulse ox</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center space-x-1">
              <Zap className="w-3 h-3 text-purple-400" />
              <span>ctDNA Liquid Biopsy</span>
            </span>
            <div className="text-xl font-black text-purple-300 font-mono flex items-baseline space-x-1">
              <span>{telemetry.ctDnaFraction}</span>
              <span className="text-[10px] font-normal text-slate-400">% VAF</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">-62% since baseline</span>
          </div>

        </div>

        {/* Real-time Alert Banner */}
        <div className={`p-3 rounded-xl border flex items-center space-x-3 text-xs ${
          telemetry.status === 'Critical Alert'
            ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            : telemetry.status === 'Warning'
            ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
            : 'bg-slate-900/60 border-slate-800 text-slate-300'
        }`}>
          <AlertTriangle className={`w-4 h-4 shrink-0 ${
            telemetry.status === 'Critical Alert' ? 'text-rose-400' : 'text-cyan-400'
          }`} />
          <span>{telemetry.alertMessage}</span>
        </div>
      </div>

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: Predictive Control Sliders */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>In-Silico Pharmacodynamic Controls</span>
            </h3>

            {/* Regimen Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                Simulated Drug Regimen:
              </label>
              <select
                value={selectedRegimen}
                onChange={(e) => setSelectedRegimen(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {patientCase.recommendedDrugs.map((d, i) => (
                  <option key={i} value={d}>{d} (Recommended)</option>
                ))}
                {patientCase.contraindicatedDrugs.map((d, i) => (
                  <option key={i} value={d}>{d} (Contraindicated)</option>
                ))}
              </select>
            </div>

            {/* Dosage Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Daily Dose:</span>
                <span className="font-mono font-extrabold text-cyan-300">{dosageMg} mg / day</span>
              </div>
              <input
                type="range"
                min={50}
                max={300}
                step={25}
                value={dosageMg}
                onChange={(e) => setDosageMg(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>50 mg (Low)</span>
                <span>150 mg (Standard)</span>
                <span>300 mg (Max)</span>
              </div>
            </div>

            {/* Patient Adherence Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Medication Adherence:</span>
                <span className="font-mono font-extrabold text-purple-300">{adherenceRate}%</span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={adherenceRate}
                onChange={(e) => setAdherenceRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Simulated Outcome Summary Cards */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">Predicted 36-Wk Tumor Change:</span>
                <span className={`text-xs font-mono font-extrabold ${
                  overallReductionPct > 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {overallReductionPct > 0 ? `-${overallReductionPct}% Volume` : `+${Math.abs(overallReductionPct)}% Progression`}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-slate-400">Toxicity Risk Burden:</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  toxicityLevel === 'Low'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : toxicityLevel === 'Moderate'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {toxicityLevel} Risk
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Right 8 Cols: Predictive Trajectory Curves */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Chart: Tumor Volume Projection */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-cyan-400" />
                  <span>Projected Tumor Volumetric Trajectory (36-Week Horizon)</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Calculated from patient genomic driver ({patientCase.primaryGene} {patientCase.primaryVariant}) + {dosageMg}mg daily dose.
                </p>
              </div>

              <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                Current Projected: {currentPredictedVolume} mm³
              </span>
            </div>

            {/* Chart */}
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trajectoryData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tumorVolumeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} unit=" Wk" />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} unit=" mm³" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090e1d', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#00f2fe' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tumorVolumeMm3" 
                    stroke="#00f2fe" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#tumorVolumeGrad)" 
                    name="Tumor Volume (mm³)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Chart: Immune Response vs Drug Toxicity */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Therapeutic Response vs Toxicity Tradeoff</span>
              </h3>
              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="text-purple-400">• Immune Activity</span>
                <span className="text-rose-400">• Adverse Toxicity</span>
              </div>
            </div>

            <div className="w-full h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trajectoryData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} unit=" Wk" />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090e1d', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="immuneActivity" stroke="#9d4edd" strokeWidth={2} dot={false} name="Immune Activity (%)" />
                  <Line type="monotone" dataKey="toxicityScore" stroke="#f43f5e" strokeWidth={2} dot={false} name="Toxicity Index (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
