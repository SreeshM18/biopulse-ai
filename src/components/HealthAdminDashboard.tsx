import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  BedDouble, 
  Users, 
  Flame, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  SlidersHorizontal, 
  Maximize2, 
  Minimize2, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Heart, 
  Zap, 
  Layers, 
  Sparkles, 
  Stethoscope, 
  FileText, 
  Pill, 
  ChevronRight, 
  RotateCcw,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { PatientProfile, TabType } from '../types/biotech';
import { SpotlightCard } from './ui/SpotlightCard';
import { TiltCard } from './ui/TiltCard';
import { AnimatedCounter } from './ui/AnimatedCounter';
import { ShinyBadge } from './ui/ShinyBadge';
import { PulseHeartbeat } from './ui/PulseHeartbeat';

interface HealthAdminDashboardProps {
  patients: PatientProfile[];
  selectedPatient: PatientProfile;
  onSelectPatient: (patient: PatientProfile) => void;
  setActiveTab: (tab: TabType) => void;
}

// 24-Hour Ward Stability Trends
const WARD_STABILITY_DATA = [
  { time: '00:00', stability: 92, pressure: 118, temp: 36.8 },
  { time: '03:00', stability: 89, pressure: 115, temp: 36.7 },
  { time: '06:00', stability: 86, pressure: 122, temp: 36.9 },
  { time: '09:00', stability: 94, pressure: 126, temp: 37.1 },
  { time: '12:00', stability: 91, pressure: 120, temp: 37.2 },
  { time: '15:00', stability: 88, pressure: 124, temp: 37.0 },
  { time: '18:00', stability: 95, pressure: 119, temp: 36.9 },
  { time: '21:00', stability: 93, pressure: 117, temp: 36.8 },
  { time: '24:00', stability: 96, pressure: 116, temp: 36.7 }
];

// Clinical Performance Balance Radar Data
const PERFORMANCE_RADAR_DATA = [
  { subject: 'Escalation', A: 96, fullMark: 100 },
  { subject: 'Triage SLA', A: 97, fullMark: 100 },
  { subject: 'Quality', A: 94, fullMark: 100 },
  { subject: 'Coverage', A: 92, fullMark: 100 },
  { subject: 'Response', A: 98, fullMark: 100 },
  { subject: 'Throughput', A: 91, fullMark: 100 }
];

// Live Triage Priority Distribution
const TRIAGE_DISTRIBUTION = [
  { name: 'Level 1 Critical', value: 48, color: '#f43f5e' },
  { name: 'Level 2 High', value: 114, color: '#f59e0b' },
  { name: 'Level 3 Moderate', value: 142, color: '#06b6d4' },
  { name: 'Level 4 Stable', value: 58, color: '#10b981' }
];

// Weekly Admissions Data
const ADMISSIONS_DATA = [
  { day: 'Mon', count: 32 },
  { day: 'Tue', count: 41 },
  { day: 'Wed', count: 38 },
  { day: 'Thu', count: 46 },
  { day: 'Fri', count: 52 },
  { day: 'Sat', count: 29 },
  { day: 'Sun', count: 35 }
];

// Shift Agenda Items
const INITIAL_SHIFT_AGENDA = [
  { time: '08:30', task: 'Morning Inpatient Triage Sync', floor: 'ICU / Floor 4', completed: true },
  { time: '10:00', task: 'Attending Physician Rounds', floor: 'Telemetry / Floor 3', completed: true },
  { time: '11:30', task: 'Critical Lab Response Review', floor: 'Central Pathology', completed: false },
  { time: '14:00', task: 'Surgical Prep Window & PACU', floor: 'OR Suite 2B', completed: false },
  { time: '16:30', task: 'Evening Shift Change Handoff', floor: 'All Wards', completed: false }
];

export const HealthAdminDashboard: React.FC<HealthAdminDashboardProps> = ({
  patients,
  selectedPatient,
  onSelectPatient,
  setActiveTab
}) => {
  const [spatialMode, setSpatialMode] = useState<boolean>(false);
  const [stabilityMetric, setStabilityMetric] = useState<'stability' | 'pressure' | 'temp'>('stability');
  const [agenda, setAgenda] = useState(INITIAL_SHIFT_AGENDA);
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live Mini ECG Stream
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let x = 0;
    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 240);
    const height = (canvas.height = 48);

    const render = () => {
      ctx.fillStyle = 'rgba(12, 18, 32, 0.08)';
      ctx.fillRect(0, 0, width, height);

      const midY = height / 2;
      let y = midY;
      const cycle = x % 90;

      if (cycle >= 28 && cycle < 34) y = midY - 3;
      else if (cycle >= 34 && cycle < 38) y = midY + 4;
      else if (cycle >= 38 && cycle < 44) y = midY - 20; // R peak
      else if (cycle >= 44 && cycle < 48) y = midY + 8;
      else if (cycle >= 54 && cycle < 66) y = midY - 5; // T wave

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(x - 1, midY);
      ctx.lineTo(x, y);
      ctx.stroke();

      x = (x + 2) % width;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleTask = (index: number) => {
    setAgenda(prev => prev.map((item, i) => i === index ? { ...item, completed: !item.completed } : item));
  };

  return (
    <div className="space-y-5">
      
      {/* Top Controls: Mode Switcher & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c1220] p-4 rounded-2xl border border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white font-bold shadow-sm">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Health Admin Dashboard</h2>
              <ShinyBadge variant="cyan">Care Operations</ShinyBadge>
            </div>
            <p className="text-xs text-slate-400">
              Care system analytics • Operational bed status • Clinical workload balance
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Spatial 3D Deck View Toggle */}
          <button
            onClick={() => setSpatialMode(!spatialMode)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              spatialMode
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-glow-cyan'
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{spatialMode ? 'Exit Spatial Deck' : '3D Spatial Deck Mode'}</span>
          </button>

          <button
            onClick={() => setActiveTab('command_center')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 text-xs font-medium"
          >
            <span>Inpatient Census</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Spatial 3D Wrapper */}
      <motion.div
        animate={spatialMode ? {
          rotateX: 14,
          rotateY: -10,
          scale: 0.94,
          transition: { duration: 0.6, ease: 'easeOut' }
        } : {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          transition: { duration: 0.4, ease: 'easeOut' }
        }}
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
        className="space-y-5"
      >

        {/* 1. TOP METRICS STRIP: Floating Key Indicator Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          
          <SpotlightCard glowColor="sky" className="p-3.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Rooms</span>
              <BedDouble className="h-3.5 w-3.5 text-sky-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-white font-tabular">
              <AnimatedCounter value={124} />
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">96% Cleaned</div>
          </SpotlightCard>

          <SpotlightCard glowColor="cyan" className="p-3.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Visits</span>
              <Users className="h-3.5 w-3.5 text-cyan-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-white font-tabular">
              <AnimatedCounter value={862} />
            </div>
            <div className="text-[10px] text-slate-400 font-medium">24h Throughput</div>
          </SpotlightCard>

          <SpotlightCard glowColor="purple" className="p-3.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Labs Done</span>
              <FileText className="h-3.5 w-3.5 text-purple-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-purple-300 font-tabular">
              <AnimatedCounter value={184} />
            </div>
            <div className="text-[10px] text-purple-300/80 font-medium">Avg 22m turn</div>
          </SpotlightCard>

          <SpotlightCard glowColor="emerald" className="p-3.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Inpatients</span>
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-emerald-400 font-tabular">
              <AnimatedCounter value={patients.length} />
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">+5.4% week</div>
          </SpotlightCard>

          <SpotlightCard glowColor="amber" className="p-3.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>ICU Occupancy</span>
              <Clock className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-amber-400 font-tabular">
              <AnimatedCounter value={83} suffix="%" />
            </div>
            <div className="text-[10px] text-amber-300/80 font-medium">+2.1% surge</div>
          </SpotlightCard>

          <SpotlightCard glowColor="cyan" className="p-3.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Lab Queue</span>
              <Zap className="h-3.5 w-3.5 text-sky-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-white font-tabular">
              <AnimatedCounter value={46} />
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">-8 cleared today</div>
          </SpotlightCard>

          <SpotlightCard glowColor="rose" className="p-3.5 col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Critical Alerts</span>
              <Flame className="h-3.5 w-3.5 text-rose-400" />
            </div>
            <div className="mt-1 text-2xl font-bold text-rose-400 font-tabular">
              <AnimatedCounter value={12} />
            </div>
            <div className="text-[10px] text-rose-300/80 font-medium">2 Urgent SOS</div>
          </SpotlightCard>

        </div>

        {/* 2. MAIN OPERATIONS GRID (12 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* LEFT 8 COLUMNS: Ward Stability Index & Telemetry Matrix */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Ward Stability Index Area Chart */}
            <SpotlightCard glowColor="sky" className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-sky-400" />
                    <span>Ward Stability Index</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    24-hour composite patient physiological stability trajectory across all floors
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setStabilityMetric('stability')}
                    className={`px-2.5 py-1 rounded font-semibold transition-all ${
                      stabilityMetric === 'stability' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Stability %
                  </button>
                  <button
                    onClick={() => setStabilityMetric('pressure')}
                    className={`px-2.5 py-1 rounded font-semibold transition-all ${
                      stabilityMetric === 'pressure' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    MAP
                  </button>
                  <button
                    onClick={() => setStabilityMetric('temp')}
                    className={`px-2.5 py-1 rounded font-semibold transition-all ${
                      stabilityMetric === 'temp' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Temp
                  </button>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={WARD_STABILITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="stabilityGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={11} domain={['dataMin - 5', 'dataMax + 5']} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0c1220', borderColor: '#1e2c44', borderRadius: '8px', fontSize: '12px' }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey={stabilityMetric} 
                      stroke="#38bdf8" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#stabilityGrad)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </SpotlightCard>

            {/* Bottom 2-Column Split: Realtime ECG Feed & Weekly Admissions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Live Telemetry Lead II Stream */}
              <SpotlightCard glowColor="sky" className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <PulseHeartbeat bpm={74} size="sm" color="text-sky-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">ECG Stream</h4>
                      <p className="text-[10px] text-slate-400">Telemetry Feed • Lead II</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
                    74 BPM
                  </span>
                </div>

                <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 p-1">
                  <canvas ref={canvasRef} className="w-full block" />
                </div>
              </SpotlightCard>

              {/* Admissions Last 7 Days */}
              <SpotlightCard glowColor="cyan" className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Admissions</h4>
                    <p className="text-[10px] text-slate-400">Last 7 Days Intake Flow</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 font-mono">+18% vs avg</span>
                </div>

                <div className="h-20 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ADMISSIONS_DATA}>
                      <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
                      <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SpotlightCard>

            </div>

            {/* Medication Administration Timeline Bar */}
            <SpotlightCard glowColor="purple" className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Pill className="h-4 w-4 text-purple-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Medication Administration Timeline</h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400">08:00 - 22:00 Schedule</span>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                  <span>08:00</span>
                  <span>12:00</span>
                  <span>16:00</span>
                  <span>20:00</span>
                  <span>24:00</span>
                </div>

                <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 gap-1 border border-slate-800">
                  <div className="w-1/4 bg-emerald-500 rounded-full" title="Antibiotics IV - Given" />
                  <div className="w-1/5 bg-sky-500 rounded-full" title="Vasopressors - Active" />
                  <div className="w-1/6 bg-amber-500 rounded-full" title="Insulin Glargine - Scheduled" />
                  <div className="w-1/4 bg-purple-500 rounded-full" title="Analgesia PRN - Window Open" />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"/><span>IV Infusions</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-sky-500 inline-block"/><span>Titrations</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"/><span>Scheduled</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block"/><span>PRN Rescue</span></span>
                </div>
              </div>
            </SpotlightCard>

          </div>

          {/* RIGHT 4 COLUMNS: Triage Donut, Radar Balance, & Shift Agenda */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Live Triage Ring (Priority Distribution) */}
            <SpotlightCard glowColor="cyan" className="p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Live Triage</h4>
                <ShinyBadge variant="rose">Priority Distribution</ShinyBadge>
              </div>

              <div className="flex items-center justify-between">
                <div className="h-32 w-32 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={TRIAGE_DISTRIBUTION}
                        innerRadius={36}
                        outerRadius={56}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {TRIAGE_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-black font-mono text-white">362</span>
                    <span className="text-[9px] text-slate-400 uppercase font-semibold">Cases</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] font-medium">
                  {TRIAGE_DISTRIBUTION.map((t) => (
                    <div key={t.name} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                      <span className="text-slate-300">{t.name}:</span>
                      <span className="font-mono font-bold text-white">{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Performance Balance Radar (SLA / Accuracy / Escalation) */}
            <SpotlightCard glowColor="purple" className="p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Performance Balance</h4>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">SLA 97%</span>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={PERFORMANCE_RADAR_DATA}>
                    <PolarGrid stroke="#1e2c44" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                    <Radar name="Performance" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                <span>Accuracy: <strong className="text-white">96%</strong></span>
                <span>Throughput: <strong className="text-sky-400">91%</strong></span>
              </div>
            </SpotlightCard>

            {/* Shift Agenda & Rounding Checklist */}
            <SpotlightCard glowColor="emerald" className="p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Shift Agenda</h4>
                <span className="text-[11px] font-mono text-slate-400">Attending MD</span>
              </div>

              <div className="space-y-2">
                {agenda.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleTask(idx)}
                    className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 cursor-pointer transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      checked={item.completed} 
                      onChange={() => toggleTask(idx)}
                      className="mt-0.5 rounded accent-sky-500 cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${item.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {item.task}
                        </span>
                        <span className="font-mono text-[10px] text-sky-400">{item.time}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.floor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>

          </div>

        </div>

        {/* 3. EVENT CALENDAR & SURGERY SCHEDULE STRIP */}
        <SpotlightCard glowColor="sky" className="p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span>Clinical Event & Operating Room (OR) Calendar</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Scheduled surgical procedures, ICU intakes, and specialist consultations
              </p>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block"/><span>Surgery</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-sky-500 inline-block"/><span>ICU Intake</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"/><span>Discharge</span></span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="font-bold text-slate-400 py-1 uppercase text-[10px]">{d}</div>
            ))}

            {Array.from({ length: 28 }, (_, i) => i + 1).map(day => {
              const isSelected = day === selectedDay;
              const hasSurgery = [3, 9, 14, 21, 24, 27].includes(day);
              const hasICU = [5, 12, 18, 24].includes(day);
              const hasDischarge = [7, 15, 22, 28].includes(day);

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? 'bg-sky-950 border-sky-500 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold font-mono text-xs block">{day}</span>
                  <div className="flex items-center justify-center space-x-1">
                    {hasSurgery && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
                    {hasICU && <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
                    {hasDischarge && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </div>
                </div>
              );
            })}
          </div>
        </SpotlightCard>

      </motion.div>
    </div>
  );
};
