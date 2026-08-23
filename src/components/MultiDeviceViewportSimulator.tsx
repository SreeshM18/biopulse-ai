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
  Signal,
  Laptop,
  Compass,
  Sliders,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  ScreenShare
} from 'lucide-react';
import { PatientProfile, TabType, UserPortalRole, PrescriptionRecord } from '../types/biotech';
import { CommandCenter } from './CommandCenter';
import { PatientMonitor } from './PatientMonitor';
import { NurseEmarView } from './NurseEmarView';
import { EmergencyQRPassport } from './EmergencyQRPassport';
import { NovaRescueEmergencyNetwork } from './NovaRescueEmergencyNetwork';
import { DoctorWholeBodyMonitor } from './DoctorWholeBodyMonitor';
import { NovaAnatomyTwin3D } from './NovaAnatomyTwin3D';

export type ViewportDeviceMode = 
  | 'responsive' 
  | 'iphone' 
  | 'android' 
  | 'ipad' 
  | 'macbook' 
  | 'desktop' 
  | 'multiscreen_grid';

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
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(0.9); // 90% default for sleek fit

  // Multi-Screen Grid Independent Sub-Tabs
  const [desktopTab, setDesktopTab] = useState<TabType>('command_center');
  const [tabletTab, setTabletTab] = useState<'emar' | 'vitals' | 'reports'>('emar');
  const [iphoneTab, setIphoneTab] = useState<'qr' | 'sos' | 'timeline'>('qr');
  const [androidTab, setAndroidTab] = useState<'vitals' | 'prescriptions' | 'sos'>('vitals');

  const toggleOrientation = () => setIsLandscape(!isLandscape);

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#050814]">
      
      {/* Floating Sticky Device Viewport Switcher Toolbar */}
      <div className="sticky top-16 z-40 bg-[#070b16]/95 backdrop-blur-2xl border-b border-cyan-500/20 py-2.5 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Brand & Preset Title */}
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-black bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan">
              Device Simulator 3.0
            </span>
            <span className="text-slate-300 hidden md:inline text-xs font-semibold">
              Pixel-Perfect Adaptive Viewports:
            </span>
          </div>

          {/* Device Presets Switcher Bar */}
          <div className="flex items-center space-x-1.5 bg-slate-950/90 p-1 rounded-2xl border border-slate-800 flex-wrap gap-y-1 shadow-inner">
            
            {/* 1. Full Responsive */}
            <button
              onClick={() => setDeviceMode('responsive')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'responsive'
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Full Width Responsive Layout"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fluid</span>
            </button>

            {/* 2. iPhone 16 Pro */}
            <button
              onClick={() => setDeviceMode('iphone')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'iphone'
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Apple iPhone 16 Pro (393 x 852 px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 iPhone</span>
            </button>

            {/* 3. Android / Galaxy S24 */}
            <button
              onClick={() => setDeviceMode('android')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'android'
                  ? 'bg-teal-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Samsung Galaxy S24 Ultra Android (412 x 915 px)"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span>🤖 Android</span>
            </button>

            {/* 4. iPad Bedside Tablet */}
            <button
              onClick={() => setDeviceMode('ipad')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'ipad'
                  ? 'bg-purple-600 text-white shadow-glow-purple font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="iPad Pro Bedside Tablet (820 x 1180 px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>📟 iPad / Tab</span>
            </button>

            {/* 5. MacBook Laptop */}
            <button
              onClick={() => setDeviceMode('macbook')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'macbook'
                  ? 'bg-indigo-600 text-white shadow-glow-purple font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="MacBook Laptop (1280 x 832 px)"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>💻 Laptop</span>
            </button>

            {/* 6. Desktop 4K Workstation */}
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-blue-600 text-white shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop 4K Clinical Workstation (1440 x 900 px)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>🖥️ Desktop</span>
            </button>

            {/* 7. Multi-Screen Quad View */}
            <button
              onClick={() => setDeviceMode('multiscreen_grid')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                deviceMode === 'multiscreen_grid'
                  ? 'bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 text-white shadow-glow-cyan font-black animate-pulse'
                  : 'text-rose-400 hover:text-rose-300'
              }`}
              title="Live Multi-Screen Grid: Desktop + iPad + iPhone + Android"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>⚡ Multi-Screen Grid</span>
            </button>

          </div>

          {/* Scale & Orientation Controls */}
          {deviceMode !== 'responsive' && deviceMode !== 'multiscreen_grid' && (
            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={toggleOrientation}
                className={`p-1.5 rounded-lg border transition-all flex items-center space-x-1 text-[11px] font-mono ${
                  isLandscape 
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' 
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
                title="Rotate Orientation"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isLandscape ? 'Landscape' : 'Portrait'}</span>
              </button>

              <div className="flex items-center space-x-1 pl-1 border-l border-slate-800">
                <button
                  onClick={() => setZoomScale(Math.max(0.5, +(zoomScale - 0.1).toFixed(1)))}
                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono text-cyan-300 w-9 text-center font-bold">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  onClick={() => setZoomScale(Math.min(1.2, +(zoomScale + 0.1).toFixed(1)))}
                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setZoomScale(0.9)}
                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 hover:text-white"
                  title="Reset Zoom"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ────────────────────────── VIEWPORT RENDERING ────────────────────────── */}

      {/* VIEWPORT 1: FLUID RESPONSIVE VIEW (DEFAULT) */}
      {deviceMode === 'responsive' && (
        <div className="w-full flex-1">
          {children}
        </div>
      )}

      {/* VIEWPORT 2: iPHONE 16 PRO (393 x 852 px) */}
      {deviceMode === 'iphone' && (
        <div className="w-full flex-1 py-10 px-4 flex flex-col items-center justify-center bg-[#020409]">
          <div 
            style={{ 
              transform: `scale(${zoomScale})`, 
              transformOrigin: 'top center',
              width: isLandscape ? '852px' : '393px',
              height: isLandscape ? '393px' : '852px'
            }}
            className="rounded-[54px] border-[14px] border-[#1e2330] shadow-[0_0_60px_rgba(6,182,212,0.15)] bg-[#060913] flex flex-col overflow-hidden relative transition-all duration-300 ring-1 ring-slate-700/60"
          >
            {/* iPhone Dynamic Island & Status Header */}
            <div className="w-full bg-[#060913] pt-3 pb-2 px-7 flex items-center justify-between text-[11px] font-mono text-slate-200 border-b border-slate-800/40 select-none shrink-0">
              <span className="font-black tracking-tight">9:41</span>

              {/* Dynamic Island Capsule */}
              <div className="w-28 h-6 bg-black rounded-full border border-slate-800 flex items-center justify-between px-2.5 shadow-inner">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[9px] text-cyan-300 font-bold">BioPulse</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
              </div>

              <div className="flex items-center space-x-1.5">
                <Signal className="w-3 h-3 text-slate-200" />
                <Wifi className="w-3 h-3 text-slate-200" />
                <Battery className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Viewport Scrollable App Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3 text-xs no-scrollbar">
              {children}
            </div>

            {/* iPhone iOS Home Indicator Bar */}
            <div className="w-full bg-[#060913] py-2 flex justify-center border-t border-slate-900/60 shrink-0">
              <div className="w-36 h-1 bg-slate-500 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT 3: ANDROID / GALAXY S24 ULTRA (412 x 915 px) */}
      {deviceMode === 'android' && (
        <div className="w-full flex-1 py-10 px-4 flex flex-col items-center justify-center bg-[#020409]">
          <div 
            style={{ 
              transform: `scale(${zoomScale})`, 
              transformOrigin: 'top center',
              width: isLandscape ? '915px' : '412px',
              height: isLandscape ? '412px' : '915px'
            }}
            className="rounded-[32px] border-[12px] border-[#222736] shadow-[0_0_60px_rgba(20,184,166,0.15)] bg-[#060913] flex flex-col overflow-hidden relative transition-all duration-300 ring-1 ring-slate-700/60"
          >
            {/* Android Status Bar with Centered Punch-Hole Camera */}
            <div className="w-full bg-slate-950 pt-2 pb-1.5 px-6 flex items-center justify-between text-[11px] font-mono text-slate-300 border-b border-slate-800/40 select-none shrink-0">
              <span className="font-semibold text-teal-300">12:30</span>

              {/* Centered Punch-Hole Camera */}
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 shadow-inner" />

              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-teal-400 font-bold">5G</span>
                <Wifi className="w-3 h-3 text-slate-300" />
                <Battery className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[10px]">98%</span>
              </div>
            </div>

            {/* Viewport Scrollable App Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3 text-xs no-scrollbar">
              {children}
            </div>

            {/* Android Navigation Gesture Pill */}
            <div className="w-full bg-slate-950 py-1.5 flex justify-center border-t border-slate-900 shrink-0">
              <div className="w-20 h-1 bg-teal-500/70 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT 4: iPAD PRO BEDSIDE TABLET (820 x 1180 px) */}
      {deviceMode === 'ipad' && (
        <div className="w-full flex-1 py-10 px-4 flex flex-col items-center justify-center bg-[#020409]">
          <div 
            style={{ 
              transform: `scale(${zoomScale})`, 
              transformOrigin: 'top center',
              width: isLandscape ? '1180px' : '820px',
              height: isLandscape ? '820px' : '1080px'
            }}
            className="rounded-[40px] border-[16px] border-[#1a1f2c] shadow-[0_0_70px_rgba(168,85,247,0.15)] bg-[#060913] flex flex-col overflow-hidden relative transition-all duration-300 ring-1 ring-slate-700/60"
          >
            {/* Tablet Camera & Clinical Header */}
            <div className="w-full bg-slate-950 py-2.5 px-8 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-purple-300 font-bold">BioPulse Bedside Tablet OS</span>
              </div>

              {/* Tablet Top Camera Lens */}
              <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-700 shadow-inner mx-auto" />

              <div className="flex items-center space-x-3 text-[11px]">
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
                <Battery className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">100%</span>
              </div>
            </div>

            {/* Viewport Scrollable App Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 no-scrollbar">
              {children}
            </div>

            {/* iPad Bottom Home Bar */}
            <div className="w-full bg-slate-950 py-2 flex justify-center border-t border-slate-800/80 shrink-0">
              <div className="w-44 h-1 bg-slate-500 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT 5: MACBOOK PRO LAPTOP (1280 x 832 px) */}
      {deviceMode === 'macbook' && (
        <div className="w-full flex-1 py-10 px-4 flex flex-col items-center justify-center bg-[#020409]">
          <div 
            style={{ 
              transform: `scale(${zoomScale})`, 
              transformOrigin: 'top center',
              width: '1280px',
              height: '832px'
            }}
            className="rounded-3xl border-[10px] border-[#22283a] shadow-[0_0_80px_rgba(99,102,241,0.2)] bg-[#060913] flex flex-col overflow-hidden relative transition-all duration-300 ring-1 ring-slate-700/60"
          >
            {/* macOS Window Titlebar with Traffic Lights */}
            <div className="w-full bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm" />
                <span className="ml-3 text-slate-300 font-bold">BioPulse AI Clinical Workstation — MacBook Pro</span>
              </div>
              <span className="text-[11px] text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                1280 x 832 • Retina
              </span>
            </div>

            {/* Viewport Scrollable App Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT 6: DESKTOP 4K WORKSTATION (1440 x 900 px) */}
      {deviceMode === 'desktop' && (
        <div className="w-full flex-1 py-10 px-4 flex flex-col items-center justify-center bg-[#020409]">
          <div 
            style={{ 
              transform: `scale(${zoomScale})`, 
              transformOrigin: 'top center',
              width: '1440px',
              height: '900px'
            }}
            className="rounded-3xl border-[12px] border-slate-800 shadow-[0_0_90px_rgba(6,182,212,0.25)] bg-[#060913] flex flex-col overflow-hidden relative transition-all duration-300 ring-1 ring-slate-700/60"
          >
            {/* Browser Address & Status Bar */}
            <div className="w-full bg-slate-900 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <div className="ml-3 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800 text-cyan-300 text-[11px] flex items-center space-x-1.5">
                  <span className="text-emerald-400">🔒</span>
                  <span>https://biopulse-ai.nova.hospital/doctor-command-center</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-[11px]">
                <span className="text-cyan-400 font-bold">Clinical 4K Desktop (1440 x 900)</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">126 Beds Online</span>
              </div>
            </div>

            {/* Viewport Scrollable App Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      )}

      {/* VIEWPORT 7: MULTI-SCREEN QUAD SIMULTANEOUS GRID (DESKTOP + iPAD + iPHONE + ANDROID) */}
      {deviceMode === 'multiscreen_grid' && (
        <div className="w-full flex-1 py-6 px-3 sm:px-6 bg-[#030611] space-y-6">
          
          {/* Header Banner */}
          <div className="glass-card rounded-2xl p-4 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">
                  Multi-Device Synchronized Quad-Grid Showcase
                </h3>
                <p className="text-[11px] text-slate-400">
                  Real-time synchronized ecosystem across Desktop, iPad, iPhone, and Android simultaneously!
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                4 Devices Synced Live
              </span>
            </div>
          </div>

          {/* 4 Screen Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* 1. SCREEN A: DOCTOR COMMAND CENTER (DESKTOP 6-COLS) */}
            <div className="lg:col-span-6 rounded-3xl border-4 border-blue-500/40 shadow-2xl bg-[#060913] overflow-hidden flex flex-col h-[700px]">
              <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono shrink-0">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span className="text-white font-black">1. Doctor Command Desktop</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => setDesktopTab('command_center')}
                    className={`px-2 py-0.5 rounded text-[10px] ${desktopTab === 'command_center' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    Beds
                  </button>
                  <button 
                    onClick={() => setDesktopTab('nova_anatomy_twin')}
                    className={`px-2 py-0.5 rounded text-[10px] ${desktopTab === 'nova_anatomy_twin' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'}`}
                  >
                    3D Twin
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
                {desktopTab === 'command_center' ? (
                  <CommandCenter 
                    patients={patients}
                    selectedPatient={selectedPatient}
                    onSelectPatient={setSelectedPatient}
                    setActiveTab={setActiveTab}
                    onOpenRegister={() => {}}
                  />
                ) : (
                  <NovaAnatomyTwin3D 
                    patient={selectedPatient}
                    setActiveTab={setActiveTab}
                  />
                )}
              </div>
            </div>

            {/* 2. SCREEN B: NURSE BEDSIDE TERMINAL (iPAD 3-COLS) */}
            <div className="lg:col-span-3 rounded-3xl border-4 border-purple-500/40 shadow-2xl bg-[#060913] overflow-hidden flex flex-col h-[700px]">
              <div className="bg-slate-900 px-3 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono shrink-0">
                <div className="flex items-center space-x-1.5">
                  <Tablet className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-black">2. iPad eMAR</span>
                </div>
                <span className="text-[10px] text-purple-300 font-bold">Bed 104</span>
              </div>

              <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
                <NurseEmarView 
                  patient={selectedPatient}
                />
              </div>
            </div>

            {/* 3. SCREEN C: PATIENT SOS & EMERGENCY QR (iPHONE 3-COLS) */}
            <div className="lg:col-span-3 rounded-3xl border-4 border-rose-500/40 shadow-2xl bg-[#060913] overflow-hidden flex flex-col h-[700px]">
              <div className="bg-slate-900 px-3 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono shrink-0">
                <div className="flex items-center space-x-1.5">
                  <Smartphone className="w-4 h-4 text-rose-400" />
                  <span className="text-white font-black">3. iPhone SOS QR</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => setIphoneTab('qr')}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${iphoneTab === 'qr' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400'}`}
                  >
                    QR
                  </button>
                  <button 
                    onClick={() => setIphoneTab('sos')}
                    className={`px-1.5 py-0.5 rounded text-[10px] ${iphoneTab === 'sos' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400'}`}
                  >
                    SOS
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 no-scrollbar">
                {iphoneTab === 'qr' ? (
                  <EmergencyQRPassport 
                    patient={selectedPatient}
                  />
                ) : (
                  <NovaRescueEmergencyNetwork 
                    patient={selectedPatient}
                    setActiveTab={setActiveTab}
                  />
                )}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
