import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Heart, 
  Brain, 
  Dna, 
  ArrowRight, 
  CheckCircle2, 
  Building,
  Lock
} from 'lucide-react';

interface WelcomeSplashScreenProps {
  onComplete: () => void;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({ onComplete }) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // 3-second rapid initialisation timer
    const intervalTime = 40; // ms
    const totalSteps = (3000 / intervalTime);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / totalSteps) * 100;
      setProgress(currentProgress);

      const secLeft = Math.max(0, Math.ceil(3 - (currentStep * intervalTime) / 1000));
      setSecondsRemaining(secLeft);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        onComplete();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#090d16] text-white flex flex-col items-center justify-between p-6 sm:p-12 overflow-hidden select-none">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white font-bold shadow-sm">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white tracking-wide uppercase">
              BioPulse Clinical EHR Platform
            </span>
            <span className="text-[10px] font-mono text-slate-400 block">
              Version 3.8.0 Enterprise Production Build
            </span>
          </div>
        </div>

        {/* Skip to Login Button */}
        <button
          onClick={onComplete}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-semibold transition-colors"
        >
          <span>Skip to Login</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Center Corporate Clinical Branding */}
      <div className="flex flex-col items-center text-center max-w-xl z-10 space-y-5 my-auto">
        
        {/* Clean Logo Emblem */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg border border-sky-500/40">
          <Shield className="h-10 w-10" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            BioPulse AI
          </h1>
          <p className="text-xs sm:text-sm font-medium text-sky-400 uppercase tracking-wide">
            Enterprise Clinical Intelligence & Bedside Telemetry Platform
          </p>
          <p className="text-xs text-slate-400 leading-relaxed pt-1">
            Real-time multi-parameter inpatient telemetry, explainable risk deterioration algorithms, e-prescriptions, DICOM radiology viewing, and cross-hospital EHR synchronization.
          </p>
        </div>

        {/* Verified Regulatory Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] font-mono text-slate-400">
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>HIPAA Compliant</span>
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <Lock className="h-3.5 w-3.5 text-sky-400" />
            <span>256-Bit Encrypted</span>
          </span>
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
            <Building className="h-3.5 w-3.5 text-slate-400" />
            <span>HL7 FHIR R4 Ready</span>
          </span>
        </div>

      </div>

      {/* Bottom Progress Bar & Countdown Timer */}
      <div className="w-full max-w-sm flex flex-col items-center space-y-2.5 z-10">
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Initializing workspace...</span>
          <span className="text-white font-bold">{secondsRemaining}s</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-900 border border-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-sky-500 rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
};
