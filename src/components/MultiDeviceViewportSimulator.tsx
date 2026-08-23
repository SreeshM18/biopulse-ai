import React, { useState } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  LayoutGrid, 
  Maximize2, 
  RotateCw, 
  Sparkles, 
  Activity, 
  Heart, 
  ShieldAlert, 
  Stethoscope, 
  Clock, 
  QrCode, 
  Layers,
  Flame,
  CheckCircle2,
  Volume2,
  Battery,
  Wifi,
  Signal
} from 'lucide-react';
import { PatientProfile, TabType, UserPortalRole, PrescriptionRecord } from '../types/biotech';
import { CommandCenter } from './CommandCenter';
import { PatientMonitor } from './PatientMonitor';
import { NurseEmarView } from './NurseEmarView';
import { EmergencyQRPassport } from './EmergencyQRPassport';
import { NovaRescueEmergencyNetwork } from './NovaRescueEmergencyNetwork';
import { DoctorWholeBodyMonitor } from './DoctorWholeBodyMonitor';

export type ViewportDeviceMode = 'responsive' | 'desktop' | 'tablet' | 'mobile' | 'multiscreen_grid';

interface MultiDeviceViewportSimulatorProps {
  children: React.ReactNode;
  activeRole: UserPortalRole;
  setActiveRole: (role: UserPortalRole) => void;
  selectedPatient: PatientProfile;
  patients: PatientProfile[];
  setSelectedPatient: (p: PatientProfile) => void;
  setActiveTab: (t: TabType) => void;
}

export const MultiDeviceViewportSimulator: React.FC<MultiDeviceViewportSimulatorProps> = ({
  children,
  activeRole,
  setActiveRole,
  selectedPatient,
  patients,
  setSelectedPatient,
  setActiveTab
}) => {
  const [deviceMode, setDeviceMode] = useState<ViewportDeviceMode>('responsive');
  const [mobileTab, setMobileTab] = useState<'qr' | 'sos' | 'vitals'>('qr');
  const [tabletTab, setTabletTab] = useState<'emar' | 'vitals'>('emar');

  return (
    <div className="w-full flex flex-col">
      
      {/* Floating / Sticky Device Viewport Switcher Toolbar */}
      <div className="sticky top-16 z-40 bg-[#070b16]/95 backdrop-blur-xl border-b border-cyan-500/20 py-2 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              Multi-Device Viewport Engine
            </span>
            <span className="text-slate-400 hidden sm:inline text-xs font-medium">
              Toggle Multi-Screen Responsive Views:
            </span>
          </div>

          {/* Viewport Selectors */}
          <div className="flex items-center space-x-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 flex-wrap gap-y-1">
            <button
              onClick={() => setDeviceMode('responsive')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'responsive'
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Responsive</span>
            </button>

            <button
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-blue-600 text-white shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>🖥️ Desktop (1440px)</span>
            </button>

            <button
              onClick={() => setDeviceMode('tablet')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'tablet'
                  ? 'bg-purple-600 text-white shadow-glow-purple font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>📟 Bedside Tablet (768px)</span>
            </button>

            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Smartphone (390px)</span>
            </button>

            <button
              onClick={() => setDeviceMode('multiscreen_grid')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'multiscreen_grid'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white shadow-glow-cyan font-black animate-pulse'
                  : 'text-rose-400 hover:text-rose-300'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>⚡ Tri-Screen Live Grid</span>
            </button>
          </div>

        </div>
      </div>

      {/* VIEWPORT MODE 1: FULL RESPONSIVE VIEW (DEFAULT) */}
      {deviceMode === 'responsive' && (
        <div className="w-full">
          {children}
        </div>
      )}

      {/* VIEWPORT MODE 2: DESKTOP MONITOR FRAME */}
      {deviceMode === 'desktop' && (
        <div className="w-full py-8 px-4 flex flex-col items-center bg-[#04060d]">
          <div className="w-full max-w-[1440px] rounded-3xl border-4 border-slate-700/80 shadow-2xl bg-[#060913] overflow-hidden">
            {/* Monitor Header Bar */}
            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-slate-300 font-bold">https://biopulse-ai.sentinel.hospital/clinical-command</span>
              </div>
              <div className="flex items-center space-x-3 text-[11px]">
                <span className="text-cyan-400">Desktop Viewport (1440 x 900)</span>
                <span>•</span>
                <span className="text-emerald-400">NEWS2 Connected</span>
              </div>
            </div>
            
            <div className="max-h-[85vh] overflow-y-auto p-4 sm:p-6">
              {children}
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT MODE 3: TABLET / IPAD BEDSIDE TERMINAL */}
      {deviceMode === 'tablet' && (
        <div className="w-full py-8 px-4 flex flex-col items-center bg-[#04060d]">
          <div className="w-full max-w-[820px] rounded-[36px] border-[10px] border-slate-700/90 shadow-2xl bg-[#060913] overflow-hidden relative">
            {/* Tablet Camera Hole */}
            <div className="w-full bg-slate-900/90 py-2 border-b border-slate-800 flex items-center justify-between px-6 text-[11px] font-mono text-slate-400">
              <span className="text-cyan-300 font-bold">BioPulse Bedside Tablet OS</span>
              <div className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-slate-700 mx-auto" />
              <div className="flex items-center space-x-2">
                <Wifi className="w-3 h-3 text-cyan-400" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
                <span>94%</span>
              </div>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-4">
              {children}
            </div>

            {/* Tablet Home Bar */}
            <div className="w-full bg-slate-950 py-2 flex justify-center border-t border-slate-800">
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT MODE 4: MOBILE SMARTPHONE FRAME */}
      {deviceMode === 'mobile' && (
        <div className="w-full py-8 px-4 flex flex-col items-center bg-[#04060d]">
          <div className="w-full max-w-[400px] rounded-[48px] border-[12px] border-slate-800 shadow-2xl bg-[#060913] overflow-hidden relative">
            
            {/* iOS Dynamic Island & Status Bar */}
            <div className="w-full bg-slate-950 pt-3 pb-2 px-6 flex items-center justify-between text-[11px] font-mono text-slate-300 border-b border-slate-800/60">
              <span className="font-bold">9:41</span>
              
              {/* Dynamic Island */}
              <div className="w-24 h-5 bg-black rounded-full border border-slate-800 flex items-center justify-center space-x-1.5 px-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[9px] text-cyan-300 font-bold">SOS Ready</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <Signal className="w-3 h-3 text-slate-300" />
                <Wifi className="w-3 h-3 text-slate-300" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Mobile Viewport Content Container */}
            <div className="max-h-[750px] overflow-y-auto p-3 text-xs">
              {children}
            </div>

            {/* iOS Bottom Indicator */}
            <div className="w-full bg-slate-950 py-2.5 flex justify-center border-t border-slate-900">
              <div className="w-36 h-1.5 bg-slate-600 rounded-full" />
            </div>

          </div>
        </div>
      )}

      {/* VIEWPORT MODE 5: TRI-SCREEN MULTI-DEVICE SIMULTANEOUS GRID */}
      {deviceMode === 'multiscreen_grid' && (
        <div className="w-full py-6 px-3 sm:px-6 bg-[#04060d] space-y-6">
          
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/30 text-center space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <h3 className="text-base font-black text-white">
                Tri-Screen Live Multi-Device Showcase
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl mx-auto">
              Simultaneous real-time synchronized view: Desktop Doctor Hub + Tablet Nurse Station + Mobile Patient SOS QR running side-by-side!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* 1. SCREEN A: DOCTOR COMMAND CENTER (DESKTOP VIEWPORT - 6 Cols) */}
            <div className="lg:col-span-6 rounded-3xl border-4 border-blue-500/40 shadow-2xl bg-[#060913] overflow-hidden space-y-2">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-cyan-300 font-bold">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span>Screen 1: Doctor Command Center (Desktop)</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Live NEWS2 Telemetry
                </span>
              </div>

              <div className="p-4 max-h-[620px] overflow-y-auto">
                <CommandCenter 
                  patients={patients}
                  selectedPatient={selectedPatient}
                  onSelectPatient={setSelectedPatient}
                  setActiveTab={setActiveTab}
                  onOpenRegister={() => {}}
                />
              </div>
            </div>

            {/* 2. SCREEN B: BEDSIDE NURSE eMAR (TABLET VIEWPORT - 3 Cols) */}
            <div className="lg:col-span-3 rounded-3xl border-4 border-purple-500/40 shadow-2xl bg-[#060913] overflow-hidden space-y-2">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-purple-300 font-bold">
                  <Tablet className="w-4 h-4 text-purple-400" />
                  <span>Screen 2: Nurse eMAR (Tablet)</span>
                </span>
              </div>

              <div className="p-3 max-h-[620px] overflow-y-auto">
                <NurseEmarView 
                  patient={selectedPatient}
                />
              </div>
            </div>

            {/* 3. SCREEN C: PATIENT EMERGENCY QR PASSPORT (MOBILE VIEWPORT - 3 Cols) */}
            <div className="lg:col-span-3 rounded-3xl border-4 border-rose-500/40 shadow-2xl bg-[#060913] overflow-hidden space-y-2">
              <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center space-x-1.5 text-rose-400 font-bold">
                  <Smartphone className="w-4 h-4 text-rose-500" />
                  <span>Screen 3: Patient SOS (Mobile)</span>
                </span>
              </div>

              <div className="p-3 max-h-[620px] overflow-y-auto">
                <EmergencyQRPassport 
                  patient={selectedPatient}
                />
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
