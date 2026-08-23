import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Heart, 
  Brain, 
  Dna, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  Radio, 
  Layers,
  Fingerprint
} from 'lucide-react';

interface WelcomeSplashScreenProps {
  onComplete: () => void;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({ onComplete }) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(5);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // 5-second interval timer
    const intervalTime = 50; // ms
    const totalSteps = (5000 / intervalTime);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / totalSteps) * 100;
      setProgress(currentProgress);

      const secLeft = Math.max(0, Math.ceil(5 - (currentStep * intervalTime) / 1000));
      setSecondsRemaining(secLeft);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        onComplete();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#04060d] text-white flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none">
      
      {/* Background Animated Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header & Skip Button */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shadow-glow-cyan">
            <Radio className="w-4 h-4 text-cyan-400 animate-ping" />
          </div>
          <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest">
            NOVA Core v3.8 • Live Initialization
          </span>
        </div>

        {/* Skip to Login Button */}
        <button
          onClick={onComplete}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all shadow-glow-cyan group"
        >
          <span>Skip to Login</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Center Cinematic 3D Emblem & Title */}
      <div className="flex flex-col items-center text-center max-w-2xl z-10 space-y-6 my-auto">
        
        {/* Animated Hologram Orb */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[2px] shadow-glow-cyan animate-pulse">
            <div className="w-full h-full bg-[#070b16] rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <ShieldCheck className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400" />
              
              {/* Internal ECG Line scanning effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scan" />
            </div>
          </div>

          {/* Floating Pill Badges */}
          <div className="absolute -top-3 -right-6 px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 font-bold shadow-lg flex items-center space-x-1">
            <Brain className="w-3 h-3 text-cyan-400" />
            <span>3D Digital Twin</span>
          </div>

          <div className="absolute -bottom-3 -left-6 px-2.5 py-1 rounded-full bg-rose-950/90 border border-rose-500/50 text-[10px] font-mono text-rose-300 font-bold shadow-lg flex items-center space-x-1">
            <Flame className="w-3 h-3 text-rose-400" />
            <span>SOS Rescue</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-purple-400 bg-clip-text text-transparent">
              BioPulse AI
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            NOVA Intelligent Clinical Deterioration & Emergency Health Platform
          </p>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed pt-1">
            Real-Time Physiological Telemetry • Explainable AI (XAI) Risk Engine • Multi-Scale 3D Micro-to-Macro Anatomy Digital Twin • Universal Emergency QR Passport
          </p>
        </div>

        {/* Feature Icons Continuum */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-8 pt-2 text-slate-400 text-xs font-mono">
          <div className="flex items-center space-x-1.5 text-cyan-300">
            <Heart className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Telemetry</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5 text-purple-300">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>3D Anatomy</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5 text-emerald-300">
            <Dna className="w-4 h-4 text-emerald-400" />
            <span>Genomics</span>
          </div>
        </div>

      </div>

      {/* Bottom Progress Bar & Countdown Timer */}
      <div className="w-full max-w-md flex flex-col items-center space-y-3 z-10">
        
        <div className="w-full flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center space-x-1.5">
            <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
            <span>Loading Clinical Workspace...</span>
          </span>
          <span className="text-cyan-400 font-black px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
            {secondsRemaining}s
          </span>
        </div>

        {/* Animated Loading Bar */}
        <div className="w-full h-2 bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-[1px]">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-500 rounded-full transition-all duration-75 shadow-glow-cyan"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[10px] font-mono text-slate-500">
          Auto-entering manual authentication portal in {secondsRemaining} seconds
        </p>

      </div>

    </div>
  );
};
