import React, { useState } from 'react';
import { 
  X, 
  Settings as SettingsIcon, 
  Smartphone, 
  Monitor, 
  Tablet, 
  QrCode, 
  Sliders, 
  Bell, 
  ShieldCheck, 
  Wifi, 
  Volume2, 
  Maximize2, 
  LayoutGrid, 
  Sparkles, 
  CheckCircle2, 
  Copy,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { ViewportDeviceMode } from './MultiDeviceViewportSimulator';
import { UserPortalRole } from '../types/biotech';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceMode: ViewportDeviceMode;
  setDeviceMode: (mode: ViewportDeviceMode) => void;
  activeRole: UserPortalRole;
  setActiveRole: (role: UserPortalRole) => void;
  autoDetectDevice: boolean;
  setAutoDetectDevice: (v: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  deviceMode,
  setDeviceMode,
  activeRole,
  setActiveRole,
  autoDetectDevice,
  setAutoDetectDevice
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [audioAlerts, setAudioAlerts] = useState<boolean>(true);
  const [hapticFeedback, setHapticFeedback] = useState<boolean>(true);
  const [contrastTheme, setContrastTheme] = useState<'cyber_dark' | 'high_contrast' | 'oled_black'>('cyber_dark');

  if (!isOpen) return null;

  // Local Wi-Fi Network URL for mobile phones
  const networkUrl = 'http://192.168.1.4:5173/';

  // High quality QR Code API for instant phone scanning
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(networkUrl)}&bgcolor=090e1d&color=00f2fe&margin=10`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(networkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-2xl rounded-3xl border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.25)] bg-[#070b18] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1.5px] shadow-glow-cyan">
              <div className="w-full h-full bg-[#090e1d] rounded-[14px] flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-cyan-400 animate-spin-slow" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-black text-white flex items-center space-x-2">
                <span>System & Display Settings</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  v3.4
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Automatic Device Scaling, Mobile Connect & Clinical Configuration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300 no-scrollbar">
          
          {/* SECTION 1: INSTANT MOBILE CONNECT VIA QR CODE */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/40 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 space-y-4">
            <div className="flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm font-black text-white">
                📱 Instant Mobile Auto-Connect (Scan with Camera)
              </h4>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Scan this QR code with your <strong>iPhone Camera</strong> or <strong>Android QR scanner</strong> to open the full application on your phone automatically without typing any address:
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              {/* QR Code Container */}
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-glow-cyan bg-[#090e1d] p-1 shrink-0 flex items-center justify-center">
                <img 
                  src={qrCodeUrl} 
                  alt="Scan on iPhone / Android" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              {/* Wi-Fi & URL Info */}
              <div className="space-y-2.5 flex-1">
                <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 font-bold">
                  <Wifi className="w-4 h-4 text-emerald-400" />
                  <span>Wi-Fi Network Host Active</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 break-all select-all flex items-center justify-between">
                  <span>{networkUrl}</span>
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center space-x-1"
                    title="Copy URL"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400">
                  ✓ Point your phone's camera at the QR code and tap the notification link to open.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: AUTOMATIC VS MANUAL DEVICE MODE */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-white flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  <span>Display & Device Viewport Mode</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Select how the layout adapts on your screen:
                </p>
              </div>

              <button
                onClick={() => {
                  setAutoDetectDevice(!autoDetectDevice);
                  if (!autoDetectDevice) setDeviceMode('responsive');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-1.5 ${
                  autoDetectDevice
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                <span>{autoDetectDevice ? '✓ Auto-Detect Active' : 'Manual Preset'}</span>
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'responsive' as const, label: '🌊 Fluid Auto', desc: '100% Screen' },
                { id: 'iphone' as const, label: '📱 iPhone 16', desc: '393 x 852 px' },
                { id: 'android' as const, label: '🤖 Android S24', desc: '412 x 915 px' },
                { id: 'ipad' as const, label: '📟 iPad Bedside', desc: '820 x 1080 px' },
                { id: 'macbook' as const, label: '💻 MacBook', desc: '1280 x 832 px' },
                { id: 'desktop' as const, label: '🖥️ Desktop 4K', desc: '1440 x 900 px' },
                { id: 'multiscreen_grid' as const, label: '⚡ Quad-Screen', desc: 'Simultaneous' }
              ].map((item) => {
                const isSelected = deviceMode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setDeviceMode(item.id);
                      setAutoDetectDevice(item.id === 'responsive');
                    }}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-500/70 text-white shadow-glow-cyan'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="block font-bold text-xs">{item.label}</span>
                    <span className="text-[10px] font-mono text-slate-500">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: CLINICAL ALERTS & AUDIO */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center space-x-2">
              <Bell className="w-4 h-4 text-rose-400" />
              <span>Clinical Audio & Deterioration Alerts</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700">
                <div>
                  <span className="font-bold text-slate-200 block">NEWS2 Critical Chime</span>
                  <span className="text-[10px] text-slate-400">Audible alarm when risk exceeds 80%</span>
                </div>
                <input
                  type="checkbox"
                  checked={audioAlerts}
                  onChange={(e) => setAudioAlerts(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500"
                />
              </label>

              <label className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700">
                <div>
                  <span className="font-bold text-slate-200 block">Haptic SOS Feedback</span>
                  <span className="text-[10px] text-slate-400">Vibration pulse on mobile dispatch</span>
                </div>
                <input
                  type="checkbox"
                  checked={hapticFeedback}
                  onChange={(e) => setHapticFeedback(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            BioPulse AI Engine • All settings saved automatically
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
          >
            Done & Apply
          </button>
        </div>

      </div>
    </div>
  );
};
