import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Heart, 
  Wind, 
  Bone, 
  Users, 
  Zap, 
  Eye, 
  Droplet, 
  RotateCw, 
  Maximize2, 
  Sliders, 
  Activity, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  Radio,
  Dna
} from 'lucide-react';
import { MASTER_ANATOMY_ENTITIES, AnatomyEntity, AnatomyHierarchyLevel } from '../data/novaAnatomyTwinData';
import { PatientProfile, TabType } from '../types/biotech';

interface NovaAnatomyTwin3DProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const NovaAnatomyTwin3D: React.FC<NovaAnatomyTwin3DProps> = ({
  patient,
  setActiveTab
}) => {
  const [selectedEntity, setSelectedEntity] = useState<AnatomyEntity>(MASTER_ANATOMY_ENTITIES[0]); // Neuron default
  const [selectedHierarchyLevel, setSelectedHierarchyLevel] = useState<AnatomyHierarchyLevel>('Microstructure');
  const [activeLayer, setActiveLayer] = useState<'Skin' | 'Muscles' | 'Skeleton' | 'Vessels' | 'Nerves' | 'Lymphatics' | 'Organs' | 'Endocrine' | 'All'>('All');
  const [isDiseaseMode, setIsDiseaseMode] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeStructureIndex, setActiveStructureIndex] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const HIERARCHY_STEPS: AnatomyHierarchyLevel[] = [
    'Human Body',
    'Body System',
    'Organ',
    'Tissue',
    'Cell',
    'Microstructure',
    'DNA Molecule'
  ];

  // Canvas 3D Rendering Engine
  useEffect(() => {
    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      if (isRotating) {
        angle = (angle + 0.012) % (Math.PI * 2);
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawAnatomy3D(ctx, canvas.width, canvas.height, angle, selectedEntity.category, isDiseaseMode, activeLayer);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating, selectedEntity, isDiseaseMode, activeLayer, zoomLevel]);

  const drawAnatomy3D = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    angle: number,
    category: string,
    disease: boolean,
    layer: string
  ) => {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const time = Date.now() * 0.003;

    // Holographic Grid Background
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(zoomLevel, zoomLevel);

    const primaryColor = disease ? '#f43f5e' : '#06b6d4';
    const glowColor = disease ? 'rgba(244, 63, 94, 0.35)' : 'rgba(6, 182, 212, 0.35)';

    // --- 1. NEURON & SYNAPSE 3D ---
    if (category === 'Neuron') {
      ctx.fillStyle = disease ? '#e11d48' : '#00f2fe';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 25;

      // Soma
      ctx.beginPath();
      ctx.ellipse(-110 + Math.sin(angle) * 12, 0, 42, 34, angle * 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Nucleus
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-110 + Math.sin(angle) * 12, 0, 14, 0, Math.PI * 2);
      ctx.fill();

      // Dendritic Arborization
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      for (let i = 0; i < 6; i++) {
        const dAngle = (i * Math.PI) / 3 + angle * 0.1;
        ctx.beginPath();
        ctx.moveTo(-110 + Math.sin(angle) * 12, 0);
        const dx1 = -110 + Math.cos(dAngle) * 65;
        const dy1 = Math.sin(dAngle) * 50;
        ctx.lineTo(dx1, dy1);
        ctx.lineTo(dx1 + Math.cos(dAngle + 0.3) * 30, dy1 + Math.sin(dAngle + 0.3) * 25);
        ctx.stroke();
      }

      // Myelinated Axon
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-68 + Math.sin(angle) * 12, 0);
      ctx.lineTo(110, 0);
      ctx.stroke();

      for (let m = -45; m <= 80; m += 30) {
        ctx.fillStyle = disease ? '#fda4af' : '#818cf8';
        ctx.beginPath();
        ctx.roundRect(m, -11, 22, 22, 5);
        ctx.fill();
      }

      // Action Potential Traveling Pulse
      const pulsePos = -65 + ((time * 75) % 180);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(pulsePos, 0, 7, 0, Math.PI * 2);
      ctx.fill();

      // Synaptic Terminal Button & Exocytosis
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.ellipse(130, 0, 22, 34, 0, 0, Math.PI * 2);
      ctx.fill();

      for (let v = 0; v < 8; v++) {
        const vx = 145 + (v * 6 + time * 25) % 30;
        const vy = (v - 4) * 5.5 + Math.sin(time * 2 + v) * 3.5;
        ctx.fillStyle = disease ? '#ff0055' : '#38bdf8';
        ctx.beginPath();
        ctx.arc(vx, vy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Post-Synaptic Receptor Density
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(185, 0, 40, Math.PI * 0.65, Math.PI * 1.35, true);
      ctx.stroke();
    }

    // --- 2. BRAIN 3D ---
    else if (category === 'Brain') {
      ctx.save();
      ctx.rotate(Math.sin(angle) * 0.12);

      ctx.fillStyle = disease ? 'rgba(244, 63, 94, 0.75)' : 'rgba(168, 85, 247, 0.75)';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.ellipse(0, -18, 125, 90, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.5;
      for (let g = -75; g <= 75; g += 25) {
        ctx.beginPath();
        ctx.arc(g, -18 + Math.sin(time + g * 0.1) * 7, 36, 0, Math.PI * 0.8);
        ctx.stroke();
      }

      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.ellipse(55, 65, 48, 30, 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.roundRect(-18, 55, 36, 75, 8);
      ctx.fill();

      if (disease) {
        ctx.fillStyle = 'rgba(255, 0, 85, 0.7)';
        ctx.beginPath();
        ctx.arc(-75, -25, 26, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // --- 3. HEART 3D ---
    else if (category === 'Heart') {
      const beat = 1 + (Math.sin(time * 6) > 0.68 ? 0.08 : 0);
      ctx.scale(beat, beat);

      ctx.fillStyle = disease ? '#e11d48' : '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 35;
      ctx.beginPath();
      ctx.moveTo(0, 95);
      ctx.bezierCurveTo(-135, -8, -85, -85, 0, -45);
      ctx.bezierCurveTo(85, -85, 135, -8, 0, 95);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.roundRect(-22, -105, 44, 38, 10);
      ctx.fill();

      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.roundRect(22, -90, 32, 32, 7);
      ctx.fill();

      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, -40);
      ctx.quadraticCurveTo(-28, 12, -8, 80);
      ctx.stroke();

      if (disease) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ff0000';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(-16, 22, 9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- 4. LUNGS 3D ---
    else if (category === 'Lungs') {
      const breath = 1 + Math.sin(time * 2) * 0.05;
      ctx.scale(breath, breath);

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(-14, -115, 28, 60, 7);
      ctx.fill();

      ctx.fillStyle = disease ? 'rgba(244, 63, 94, 0.75)' : 'rgba(6, 182, 212, 0.75)';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 30;

      ctx.beginPath();
      ctx.ellipse(-70, 8, 55, 90, -0.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(70, 8, 50, 85, 0.15, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -55);
      ctx.lineTo(-60, -8);
      ctx.lineTo(-88, 28);
      ctx.moveTo(0, -55);
      ctx.lineTo(60, -8);
      ctx.lineTo(88, 28);
      ctx.stroke();

      if (disease) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        for (let i = 0; i < 10; i++) {
          ctx.beginPath();
          ctx.arc(-80 + (i * 12) % 36, 18 + i * 5, 7, 0, Math.PI * 2);
          ctx.arc(60 + (i * 10) % 36, 18 + i * 5, 6.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // --- 5. EYE 3D ---
    else if (category === 'Eye') {
      // Sclera Outer Sphere
      ctx.fillStyle = '#f8fafc';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(0, 0, 95, 0, Math.PI * 2);
      ctx.fill();

      // Iris & Cornea
      ctx.fillStyle = disease ? '#f43f5e' : '#0284c7';
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();

      // Pupil Aperture
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(0, 0, 22 + Math.sin(time * 2) * 3, 0, Math.PI * 2);
      ctx.fill();

      // Retinal Optics / Light Beam
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-140, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();
    }

    // --- 6. KIDNEYS & NEPHRON 3D ---
    else if (category === 'Kidney') {
      ctx.fillStyle = disease ? '#e11d48' : '#be123c';
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 30;

      // Renal Bean Silhouette
      ctx.beginPath();
      ctx.moveTo(0, -90);
      ctx.bezierCurveTo(-95, -70, -110, 40, -10, 90);
      ctx.bezierCurveTo(60, 40, 45, -70, 0, -90);
      ctx.fill();

      // Renal Pelvis & Ureter
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-15, 10);
      ctx.lineTo(-8, 120);
      ctx.stroke();

      // Renal Artery & Vein
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-20, -10);
      ctx.lineTo(-75, -25);
      ctx.stroke();

      ctx.strokeStyle = '#3b82f6';
      ctx.beginPath();
      ctx.moveTo(-15, 15);
      ctx.lineTo(-70, 10);
      ctx.stroke();
    }

    // --- 7. DOUBLE-HELIX DNA 3D ---
    else if (category === 'Cell & DNA') {
      const strandPoints = 16;
      ctx.lineWidth = 3;

      for (let s = 0; s < strandPoints; s++) {
        const yPos = -110 + s * 15;
        const xOffset1 = Math.sin(angle * 2 + s * 0.45) * 45;
        const xOffset2 = -xOffset1;

        // Base pair rungs (A=T in cyan/emerald, G≡C in purple/rose)
        ctx.strokeStyle = s % 2 === 0 ? '#00f2fe' : '#a855f7';
        ctx.beginPath();
        ctx.moveTo(xOffset1, yPos);
        ctx.lineTo(xOffset2, yPos);
        ctx.stroke();

        // Strand 1 node
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(xOffset1, yPos, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Strand 2 node
        ctx.fillStyle = '#c084fc';
        ctx.beginPath();
        ctx.arc(xOffset2, yPos, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // --- 8. SKELETAL 3D ---
    else {
      ctx.strokeStyle = disease ? '#f43f5e' : '#e2e8f0';
      ctx.fillStyle = '#f8fafc';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.ellipse(0, -105, 34, 40, 0, 0, Math.PI * 2);
      ctx.stroke();

      for (let v = -60; v <= 40; v += 12) {
        ctx.beginPath();
        ctx.roundRect(-13, v, 26, 8, 3);
        ctx.stroke();
      }

      for (let r = -50; r <= 10; r += 14) {
        ctx.beginPath();
        ctx.ellipse(0, r, 52, 15, 0, 0, Math.PI);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.ellipse(0, 55, 50, 26, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  };

  const filteredEntities = MASTER_ANATOMY_ENTITIES.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.latinName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.system.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Top Header & Zoom Hierarchy Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                NOVA Anatomy Twin
              </span>
              <span className="text-xs font-mono text-purple-300 font-bold">
                Whole-Body ➔ System ➔ Organ ➔ Tissue ➔ Cell ➔ Microstructure ➔ DNA
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Brain className="w-6 h-6 text-cyan-400" />
              <span>NOVA Anatomy Twin — Micro-to-Macro 3D Digital Avatar</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Complete multi-scale human biological digital twin: seamlessly zoom from full-body anatomical layers down to cellular organelles and Watson-Crick DNA double helix with live telemetry overlays.
            </p>
          </div>

          {/* Quick Healthy vs Disease Switcher */}
          <button
            onClick={() => setIsDiseaseMode(!isDiseaseMode)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 transition-all ${
              isDiseaseMode
                ? 'bg-rose-600 text-white shadow-glow-cyan animate-pulse'
                : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-600/30'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-300" />
            <span>{isDiseaseMode ? '⚠️ Acute Disease Mode Active' : 'Normal / Healthy State'}</span>
          </button>
        </div>

        {/* Micro-to-Macro Hierarchy Breadcrumb Slider */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-2 border-t border-slate-800/80 no-scrollbar text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-2 shrink-0">Scale:</span>
          {HIERARCHY_STEPS.map((step, idx) => {
            const isCurrent = selectedHierarchyLevel === step;
            return (
              <button
                key={step}
                onClick={() => setSelectedHierarchyLevel(step)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all flex items-center space-x-1.5 ${
                  isCurrent
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{idx + 1}. {step}</span>
                {idx < HIERARCHY_STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
              </button>
            );
          })}
        </div>

        {/* 8 Anatomical Layer Toggles */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 no-scrollbar text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase mr-2 shrink-0">Layers:</span>
          {(['All', 'Skin', 'Muscles', 'Skeleton', 'Vessels', 'Nerves', 'Lymphatics', 'Organs', 'Endocrine'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                activeLayer === layer
                  ? 'bg-purple-600 text-white shadow-glow-purple font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Canvas & Anatomical Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Interactive 3D Canvas & Orbit View */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden glass-card border border-slate-800 shadow-2xl bg-[#090e1d]">
            
            {/* 3D Canvas Element */}
            <canvas 
              ref={canvasRef}
              width={700}
              height={500}
              className="w-full h-[500px] cursor-grab active:cursor-grabbing"
            />

            {/* Top Left Floating Telemetry Badge */}
            <div className="absolute top-4 left-4 z-10 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl border border-slate-800 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs font-mono text-cyan-300 font-black">{selectedEntity.name}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 italic block">{selectedEntity.latinName}</span>
              <span className="text-[9px] font-mono text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-500/30">
                Layer: {selectedEntity.layer} • Scale: {selectedEntity.hierarchyLevel}
              </span>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 bg-slate-950/85 backdrop-blur-md p-2.5 rounded-xl border border-slate-800">
              
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
                  onClick={() => setZoomLevel(prev => prev === 1 ? 1.3 : 1)}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                >
                  {zoomLevel > 1 ? 'Zoom Out' : 'Zoom 1.3x'}
                </button>
              </div>

              {/* Micro-Macro Path Display */}
              <div className="hidden sm:flex items-center space-x-1 text-[10px] font-mono text-slate-400">
                <span>Path:</span>
                <span className="text-cyan-300 font-bold">{selectedEntity.microMacroPath.slice(-2).join(' ➔ ')}</span>
              </div>

            </div>
          </div>

          {/* Real-time Physiological Digital Twin Telemetry Grid */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Live Physiological Digital Twin Stream:</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Connected to Inpatient Telemetry</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedEntity.digitalTwinTelemetry.map((t, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono block">{t.metric}</span>
                  <div className="text-base font-black font-mono text-white flex items-baseline space-x-1">
                    <span className={isDiseaseMode && idx === 0 ? 'text-rose-400 font-extrabold' : 'text-cyan-300'}>
                      {t.value}
                    </span>
                    <span className="text-[10px] text-slate-400">{t.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: A–Z Anatomy Browser, Structure Deep-Dive & Clinical Protocol */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Universal Anatomy Entity Quick Switcher */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white flex items-center space-x-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>A–Z Anatomy Models ({MASTER_ANATOMY_ENTITIES.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {MASTER_ANATOMY_ENTITIES.map((ent) => {
                const isSelected = selectedEntity.id === ent.id;
                return (
                  <button
                    key={ent.id}
                    onClick={() => {
                      setSelectedEntity(ent);
                      setSelectedHierarchyLevel(ent.hierarchyLevel);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all text-xs ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500/60 text-white font-black shadow-glow-cyan'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block truncate font-bold">{ent.name.split(' ')[1] || ent.name}</span>
                    <span className="text-[9px] font-mono text-slate-500 block truncate">{ent.system}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Healthy vs Disease Comparison Box */}
          <div className={`glass-card rounded-2xl p-5 border transition-all space-y-3 ${
            isDiseaseMode ? 'border-rose-500/60 bg-rose-950/20' : 'border-emerald-500/40 bg-slate-950/80'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isDiseaseMode ? <Flame className="w-4 h-4 text-rose-400" /> : <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  {isDiseaseMode ? `Pathology: ${selectedEntity.healthyVsDisease.diseaseName}` : 'Physiological Baseline'}
                </h4>
              </div>
              {isDiseaseMode && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/30">
                  {selectedEntity.healthyVsDisease.icd10}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isDiseaseMode ? selectedEntity.healthyVsDisease.diseaseState : selectedEntity.healthyVsDisease.healthyState}
            </p>

            {isDiseaseMode && (
              <div className="pt-2 border-t border-rose-500/30 text-xs font-mono space-y-1 text-slate-300">
                <div className="text-purple-300"><strong>Diagnostics:</strong> {selectedEntity.healthyVsDisease.diagnostics.join(' • ')}</div>
                <div className="text-emerald-300"><strong>Treatment:</strong> {selectedEntity.healthyVsDisease.treatment}</div>
              </div>
            )}
          </div>

          {/* Anatomical Micro-Structure Inspector */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Anatomical Micro-Structures ({selectedEntity.anatomicalStructures.length}):</span>
            </h3>

            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1 no-scrollbar">
              {selectedEntity.anatomicalStructures.map((struct, idx) => {
                const isSelected = activeStructureIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStructureIndex(idx)}
                    className={`p-3 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500/50 shadow-glow-cyan'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <h4 className="text-xs font-bold text-white">{struct.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{struct.function}</p>
                    <div className="mt-1 pt-1 border-t border-slate-800 text-[10px] text-cyan-300 font-mono">
                      <strong>Clinical Significance:</strong> {struct.clinicalSignificance}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Associated Molecular Biomarkers */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Associated Molecular Biomarkers:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedEntity.molecularBiomarkers.map((bio, i) => (
                <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-900 text-xs text-purple-300 font-mono border border-purple-500/30">
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
