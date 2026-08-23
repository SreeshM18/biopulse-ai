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
  Laptop,
  Globe,
  Share2
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
  const [copiedLocal, setCopiedLocal] = useState<boolean>(false);
  const [copiedPublic, setCopiedPublic] = useState<boolean>(false);
  const [copiedPass, setCopiedPass] = useState<boolean>(false);
  const [activeShareTab, setActiveShareTab] = useState<'wifi' | 'public'>('wifi');
  const [audioAlerts, setAudioAlerts] = useState<boolean>(true);
  const [hapticFeedback, setHapticFeedback] = useState<boolean>(true);

  if (!isOpen) return null;

  // Local Wi-Fi Network URL (Same Wi-Fi)
  const wifiNetworkUrl = 'http://192.168.1.4:5173/';
  
  // Permanent Worldwide Global Vercel HTTPS URL (24/7 on any phone or network)
  const publicGlobalUrl = 'https://biopulse-ai-iota.vercel.app';

  const currentUrl = activeShareTab === 'wifi' ? wifiNetworkUrl : publicGlobalUrl;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(currentUrl)}&bgcolor=090e1d&color=00f2fe&margin=10`;

  const copyUrl = (text: string, type: 'wifi' | 'public' | 'pass') => {
    navigator.clipboard.writeText(text);
    if (type === 'wifi') {
      setCopiedLocal(true);
      setTimeout(() => setCopiedLocal(false), 2000);
    } else if (type === 'public') {
      setCopiedPublic(true);
      setTimeout(() => setCopiedPublic(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-10 sm:pt-6 pb-20 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="glass-card w-full max-w-2xl rounded-3xl border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.25)] bg-[#070b18] overflow-hidden flex flex-col max-h-[86dvh] sm:max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              className="sm:hidden flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold mr-1"
            >
              <span>← Back</span>
            </button>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1.5px] shadow-glow-cyan shrink-0">
              <div className="w-full h-full bg-[#090e1d] rounded-[14px] flex items-center justify-center">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-black text-white flex items-center space-x-2">
                <span>Share App to Another Device</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Live Sync
                </span>
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 font-mono line-clamp-1">
                Open on iPhone, Android, iPad, or any external device
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300 no-scrollbar">
          
          {/* SECTION 1: INSTANT SHARE & QR CODE SCANNER */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/40 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 space-y-4">
            
            {/* Share Type Selector Tabs */}
            <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveShareTab('wifi')}
                className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  activeShareTab === 'wifi'
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wifi className="w-4 h-4" />
                <span>1. Same Wi-Fi Link (Recommended)</span>
              </button>

              <button
                onClick={() => setActiveShareTab('public')}
                className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  activeShareTab === 'public'
                    ? 'bg-purple-600 text-white shadow-glow-purple font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>2. Worldwide Public HTTPS Link</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeShareTab === 'wifi' 
                ? 'Scan with your iPhone/Android camera to open directly on your local Wi-Fi:'
                : 'Share this link to anyone in the world (on mobile data, 4G/5G, or any Wi-Fi):'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
              {/* QR Code Container */}
              <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-glow-cyan bg-[#090e1d] p-1 shrink-0 flex items-center justify-center">
                <img 
                  src={qrCodeUrl} 
                  alt="Scan on Mobile Device" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              {/* URL & Instructions */}
              <div className="space-y-3 flex-1 w-full">
                
                {activeShareTab === 'wifi' ? (
                  <>
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400 font-bold">
                      <Wifi className="w-4 h-4 text-emerald-400" />
                      <span>Local Wi-Fi Network URL</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 select-all flex items-center justify-between">
                      <span className="truncate">{wifiNetworkUrl}</span>
                      <button
                        onClick={() => copyUrl(wifiNetworkUrl, 'wifi')}
                        className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center space-x-1 shrink-0"
                      >
                        {copiedLocal ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px]">{copiedLocal ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      ✓ Open Safari or Chrome on your phone connected to the same Wi-Fi and open this URL.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-purple-400 font-bold">
                      <Globe className="w-4 h-4 text-purple-400" />
                      <span>Permanent 24/7 Vercel Global URL</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-purple-300 select-all flex items-center justify-between">
                      <span className="truncate">{publicGlobalUrl}</span>
                      <button
                        onClick={() => copyUrl(publicGlobalUrl, 'public')}
                        className="ml-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center space-x-1 shrink-0"
                      >
                        {copiedPublic ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px]">{copiedPublic ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-[10px] font-mono text-emerald-300">
                      <span>✓ High-Speed Global CDN • Zero Passwords Needed</span>
                    </div>

                    <p className="text-[10px] text-slate-400">
                      * Accessible worldwide on any iPhone, Android, tablet, or desktop connected to any network.
                    </p>
                  </>
                )}

              </div>
            </div>

          </div>

          {/* SECTION 2: DEVICE VIEWPORT PRESETS */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-white flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  <span>Display & Viewport Mode</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Simulate different hardware screen sizes on your computer:
                </p>
              </div>

              <button
                onClick={() => {
                  setAutoDetectDevice(!autoDetectDevice);
                  if (!autoDetectDevice) setDeviceMode('responsive');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  autoDetectDevice
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {autoDetectDevice ? '✓ Auto-Detect Active' : 'Manual Preset'}
              </button>
            </div>

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

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            BioPulse AI • Real-Time Device Sync
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
