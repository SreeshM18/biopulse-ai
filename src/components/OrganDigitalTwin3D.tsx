import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Heart, 
  Wind, 
  Bone, 
  Users, 
  Zap, 
  RotateCw, 
  Maximize2, 
  Eye, 
  Layers, 
  Activity, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  AlertTriangle, 
  Target, 
  Sliders, 
  Radio, 
  CheckCircle2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { ORGAN_MODELS_DATA, AnatomicalOrganModel } from '../data/organDigitalTwinData';
import { PatientProfile, TabType } from '../types/biotech';

interface OrganDigitalTwin3DProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const OrganDigitalTwin3D: React.FC<OrganDigitalTwin3DProps> = ({
  patient,
  setActiveTab
}) => {
  const [selectedOrgan, setSelectedOrgan] = useState<AnatomicalOrganModel>(ORGAN_MODELS_DATA[0]); // Neuron 3D default
  const [activeLayer, setActiveLayer] = useState<'all' | 'vascular' | 'nervous' | 'structural' | 'pathology'>('all');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isSimulatingPathology, setIsSimulatingPathology] = useState<boolean>(false);
  const [selectedStructureIndex, setSelectedStructureIndex] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Rotation animation loop & real-time canvas rendering
  useEffect(() => {
    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      if (isRotating) {
        angle = (angle + 0.012) % (Math.PI * 2);
        setRotationAngle(angle);
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawOrgan3D(ctx, canvas.width, canvas.height, angle, selectedOrgan.category, activeLayer, isSimulatingPathology);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating, selectedOrgan, activeLayer, isSimulatingPathology]);

  // 3D Canvas Drawing Engine for all organ structures
  const drawOrgan3D = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    angle: number,
    category: string,
    layer: string,
    pathology: boolean
  ) => {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const time = Date.now() * 0.003;

    // Background Hologram Grid Lines
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.07)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Outer Ambient Glow Ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(zoomLevel, zoomLevel);

    const primaryColor = pathology ? '#f43f5e' : '#06b6d4';
    const glowColor = pathology ? 'rgba(244, 63, 94, 0.25)' : 'rgba(6, 182, 212, 0.25)';

    // --- 1. NEURON & SYNAPSE 3D DRAWING ---
    if (category === 'Neuron') {
      // Soma (Cell body)
      ctx.fillStyle = pathology ? '#ff0055' : '#00f2fe';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.ellipse(-120 + Math.sin(angle) * 15, 0, 45, 35, angle * 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Nucleus
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-120 + Math.sin(angle) * 15, 0, 14, 0, Math.PI * 2);
      ctx.fill();

      // Dendrites branching from Soma
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      for (let i = 0; i < 6; i++) {
        const dAngle = (i * Math.PI) / 3 + angle * 0.1;
        ctx.beginPath();
        ctx.moveTo(-120 + Math.sin(angle) * 15, 0);
        const dx1 = -120 + Math.cos(dAngle) * 70;
        const dy1 = Math.sin(dAngle) * 55;
        ctx.lineTo(dx1, dy1);
        ctx.lineTo(dx1 + Math.cos(dAngle + 0.3) * 35, dy1 + Math.sin(dAngle + 0.3) * 30);
        ctx.stroke();
      }

      // Axon with Myelin Sheath segments & Nodes of Ranvier
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-75 + Math.sin(angle) * 15, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();

      // Myelin Beads
      for (let m = -50; m <= 80; m += 32) {
        ctx.fillStyle = '#818cf8';
        ctx.beginPath();
        ctx.roundRect(m, -12, 24, 24, 6);
        ctx.fill();
      }

      // Action potential pulse travelling down axon
      const pulsePos = -70 + ((time * 80) % 200);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(pulsePos, 0, 8, 0, Math.PI * 2);
      ctx.fill();

      // Synaptic Terminal Button & Vesicles
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.ellipse(140, 0, 24, 38, 0, 0, Math.PI * 2);
      ctx.fill();

      // Neurotransmitter exocytosis vesicles into cleft
      for (let v = 0; v < 8; v++) {
        const vx = 155 + (v * 7 + time * 30) % 35;
        const vy = (v - 4) * 6 + Math.sin(time * 2 + v) * 4;
        ctx.fillStyle = pathology ? '#ff0055' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(vx, vy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Post-Synaptic Receptor Density
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(200, 0, 45, Math.PI * 0.65, Math.PI * 1.35, true);
      ctx.stroke();
    }

    // --- 2. BRAIN 3D DRAWING ---
    else if (category === 'Brain') {
      // Left / Right Hemispheres with 3D Orbit Rotations
      ctx.save();
      ctx.rotate(Math.sin(angle) * 0.15);

      // Cerebrum Outer Contour
      ctx.fillStyle = pathology ? 'rgba(244, 63, 94, 0.7)' : 'rgba(168, 85, 247, 0.7)';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.ellipse(0, -20, 130, 95, 0, 0, Math.PI * 2);
      ctx.fill();

      // Gyri & Sulci Foldings
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.5;
      for (let g = -80; g <= 80; g += 25) {
        ctx.beginPath();
        ctx.arc(g, -20 + Math.sin(time + g * 0.1) * 8, 40, 0, Math.PI * 0.8);
        ctx.stroke();
      }

      // Cerebellum
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.ellipse(60, 70, 50, 32, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Brainstem
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.roundRect(-20, 60, 40, 80, 10);
      ctx.fill();

      // Middle Cerebral Artery (MCA) Vascular Overlay
      if (layer === 'all' || layer === 'vascular') {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 70);
        ctx.lineTo(-40, 10);
        ctx.lineTo(-85, -30);
        ctx.lineTo(-115, -15);
        ctx.stroke();

        if (pathology) {
          // Ischemia Stroke Penumbra Hotspot
          ctx.fillStyle = 'rgba(255, 0, 85, 0.6)';
          ctx.beginPath();
          ctx.arc(-85, -30, 28, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }

    // --- 3. HEART 3D DRAWING ---
    else if (category === 'Heart') {
      // Dynamic Beating Pulse Effect
      const beat = 1 + (Math.sin(time * 6) > 0.7 ? 0.08 : 0);
      ctx.scale(beat, beat);

      // Ventricular Myocardium Body
      ctx.fillStyle = pathology ? '#e11d48' : '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 35;
      ctx.beginPath();
      ctx.moveTo(0, 100);
      ctx.bezierCurveTo(-140, -10, -90, -90, 0, -50);
      ctx.bezierCurveTo(90, -90, 140, -10, 0, 100);
      ctx.fill();

      // Aorta & Pulmonary Arteries
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.roundRect(-25, -110, 50, 40, 12);
      ctx.fill();

      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.roundRect(25, -95, 35, 35, 8);
      ctx.fill();

      // Coronary Arteries (LAD & Circumflex)
      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.quadraticCurveTo(-30, 15, -10, 85);
      ctx.stroke();

      if (pathology) {
        // STEMI LAD Occlusion Spot
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(-18, 25, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- 4. LUNGS 3D DRAWING ---
    else if (category === 'Lungs') {
      // Expanding Respiratory Respiration Cycle
      const breath = 1 + Math.sin(time * 2) * 0.05;
      ctx.scale(breath, breath);

      // Trachea & Carina
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(-15, -120, 30, 65, 8);
      ctx.fill();

      // Left & Right Lung Lobes
      ctx.fillStyle = pathology ? 'rgba(244, 63, 94, 0.75)' : 'rgba(6, 182, 212, 0.75)';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 30;

      // Right Lung (3 Lobes)
      ctx.beginPath();
      ctx.ellipse(-75, 10, 60, 95, -0.15, 0, Math.PI * 2);
      ctx.fill();

      // Left Lung (2 Lobes with cardiac notch)
      ctx.beginPath();
      ctx.ellipse(75, 10, 55, 90, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Bronchial Tree Branching
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -60);
      ctx.lineTo(-65, -10);
      ctx.lineTo(-95, 30);
      ctx.moveTo(0, -60);
      ctx.lineTo(65, -10);
      ctx.lineTo(95, 30);
      ctx.stroke();

      // ARDS Bilateral Infiltrates if pathology active
      if (pathology) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let i = 0; i < 12; i++) {
          ctx.beginPath();
          ctx.arc(-85 + (i * 12) % 40, 20 + i * 5, 8, 0, Math.PI * 2);
          ctx.arc(65 + (i * 10) % 40, 20 + i * 5, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // --- 5. SKELETAL 3D DRAWING ---
    else if (category === 'Skeletal') {
      ctx.strokeStyle = pathology ? '#f43f5e' : '#e2e8f0';
      ctx.fillStyle = '#f8fafc';
      ctx.lineWidth = 3;

      // Cranium Skull
      ctx.beginPath();
      ctx.ellipse(0, -105, 35, 42, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Vertebral Spine Column (C1 - L5)
      for (let v = -60; v <= 40; v += 12) {
        ctx.beginPath();
        ctx.roundRect(-14, v, 28, 9, 3);
        ctx.stroke();
      }

      // Ribcage
      for (let r = -50; r <= 10; r += 14) {
        ctx.beginPath();
        ctx.ellipse(0, r, 55, 16, 0, 0, Math.PI);
        ctx.stroke();
      }

      // Pelvic Girdle
      ctx.beginPath();
      ctx.ellipse(0, 55, 52, 28, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Femurs
      ctx.beginPath();
      ctx.moveTo(-35, 75);
      ctx.lineTo(-45, 140);
      ctx.moveTo(35, 75);
      ctx.lineTo(45, 140);
      ctx.stroke();
    }

    // --- 6. WHOLE BODY 3D HOLOGRAPHIC DIGITAL TWIN ---
    else {
      ctx.save();
      ctx.rotate(Math.sin(angle) * 0.1);

      // Humanoid Outline
      ctx.strokeStyle = pathology ? '#f43f5e' : '#00f2fe';
      ctx.lineWidth = 3;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 30;

      // Head
      ctx.beginPath();
      ctx.arc(0, -115, 24, 0, Math.PI * 2);
      ctx.stroke();

      // Torso
      ctx.beginPath();
      ctx.roundRect(-42, -88, 84, 115, 16);
      ctx.stroke();

      // Arms
      ctx.beginPath();
      ctx.moveTo(-42, -80);
      ctx.lineTo(-75, 15);
      ctx.moveTo(42, -80);
      ctx.lineTo(75, 15);
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(-25, 27);
      ctx.lineTo(-32, 135);
      ctx.moveTo(25, 27);
      ctx.lineTo(32, 135);
      ctx.stroke();

      // Internal Organ Node Telemetry Rings
      const nodes = [
        { name: 'Brain', x: 0, y: -115, color: '#c084fc' },
        { name: 'Heart', x: -12, y: -50, color: '#f43f5e' },
        { name: 'Lungs', x: 14, y: -55, color: '#38bdf8' },
        { name: 'Liver', x: -15, y: -15, color: '#eab308' },
        { name: 'Kidneys', x: 18, y: -5, color: '#3b82f6' }
      ];

      nodes.forEach(node => {
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 11 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
        ctx.stroke();
      });

      ctx.restore();
    }

    ctx.restore();
  };

  const handleSimulatePathologyToggle = () => {
    setIsSimulatingPathology(!isSimulatingPathology);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                3D Anatomical Twin & Organ Bio-Matrix
              </span>
              <span className="text-xs font-mono text-purple-300 font-bold">
                Neuron • Brain • Heart • Lungs • Skeletal • Whole Body
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Brain className="w-6 h-6 text-cyan-400" />
              <span>3D Anatomical Digital Twin & Organ Bio-Matrix</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Explore interactive 3D digital twins across the human micro-to-macro continuum: inspect synaptic neuron firing, cerebral lobes, beating heart hemodynamics, alveolar gas exchange, skeletal bone density, and whole-body avatars.
            </p>
          </div>

          {/* Quick Action Simulator Button */}
          <button
            onClick={handleSimulatePathologyToggle}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all ${
              isSimulatingPathology
                ? 'bg-rose-600 text-white shadow-glow-cyan animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-400" />
            <span>{isSimulatingPathology ? '⚠️ Acute Pathology Flare Active' : 'Simulate Acute Pathology'}</span>
          </button>
        </div>

        {/* Organ Switcher Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap gap-y-1 text-xs">
          {ORGAN_MODELS_DATA.map((organ) => {
            const isSelected = selectedOrgan.id === organ.id;
            return (
              <button
                key={organ.id}
                onClick={() => setSelectedOrgan(organ)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{organ.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Canvas & Anatomical Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Interactive 3D Canvas & Orbit View */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden glass-card border border-slate-800 shadow-2xl bg-[#090e1d]">
            
            {/* 3D Canvas Element */}
            <canvas 
              ref={canvasRef}
              width={700}
              height={500}
              className="w-full h-[480px] cursor-grab active:cursor-grabbing"
            />

            {/* Top Left Floating Telemetry Badge */}
            <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-300 font-extrabold">{selectedOrgan.name}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 italic block">{selectedOrgan.latinName}</span>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
              
              {/* Layer Filter Buttons */}
              <div className="flex items-center space-x-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Layer:</span>
                {(['all', 'vascular', 'nervous', 'structural', 'pathology'] as const).map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`px-2.5 py-1 rounded-md text-[11px] capitalize font-medium transition-all ${
                      activeLayer === layer
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
              </div>

              {/* Action Buttons: Spin, Zoom */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    isRotating ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
                  <span>{isRotating ? 'Auto-Spin' : 'Paused'}</span>
                </button>

                <button
                  onClick={() => setZoomLevel(prev => prev === 1 ? 1.25 : 1)}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                >
                  {zoomLevel > 1 ? 'Zoom Out' : 'Zoom 1.25x'}
                </button>
              </div>

            </div>
          </div>

          {/* Live Physiological Telemetry Gauges */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Real-Time In-Silico Organ Telemetry:</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {selectedOrgan.physiologicalTelemetry.map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">{t.label}</span>
                  <div className="text-base font-black font-mono text-white flex items-baseline space-x-1">
                    <span className={isSimulatingPathology && idx === 0 ? 'text-rose-400' : 'text-cyan-300'}>
                      {t.value}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Anatomical Structures & Pathology Hotspots */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Anatomical Micro-Structure Focus */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Anatomical Micro-Structures</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Click to Inspect</span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
              {selectedOrgan.anatomicalStructures.map((struct, idx) => {
                const isSelected = selectedStructureIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedStructureIndex(idx)}
                    className={`p-3 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500/50 shadow-glow-cyan'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <h4 className="text-xs font-bold text-white">{struct.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{struct.role}</p>
                    <div className="mt-1 pt-1 border-t border-slate-800 text-[10px] text-cyan-300 font-mono">
                      <strong>Clinical Significance:</strong> {struct.clinicalSignificance}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pathology Anomaly Hotspots */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-black text-white">Pathology & Anomaly Hotspots</h3>
            </div>

            <div className="space-y-2">
              {selectedOrgan.pathologyHotspots.map((hot, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">{hot.condition}</span>
                    <span className="text-[10px] font-mono font-bold bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                      Risk: {hot.riskScore}%
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">Location: {hot.location}</div>
                  <p className="text-[11px] text-slate-300">{hot.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Molecular Biomarkers Panel */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Associated Molecular Biomarkers:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedOrgan.molecularBiomarkers.map((bio, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900 text-xs text-purple-300 font-mono border border-purple-500/30">
                  {bio}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
