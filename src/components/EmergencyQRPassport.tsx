import React, { useState } from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  Heart, 
  Printer, 
  Lock, 
  Unlock, 
  Copy, 
  Sparkles, 
  UserCheck,
  Building2,
  FileCheck2,
  Share2
} from 'lucide-react';
import { PatientProfile } from '../types/biotech';

interface EmergencyQRPassportProps {
  patient: PatientProfile;
}

export const EmergencyQRPassport: React.FC<EmergencyQRPassportProps> = ({ patient }) => {
  const passport = patient.emergencyPassport;
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '7749' || pinInput === '1234') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                Universal Health Interoperability
              </span>
              <span className="text-xs font-mono text-slate-400">
                Passport ID: <strong className="text-white">{passport.passportId}</strong>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <QrCode className="w-6 h-6 text-purple-400" />
              <span>Patient Emergency QR Health Passport</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Instant scan-to-triage emergency passport. Allows first responders and ER clinicians to access life-saving allergies, blood type, and active medications in 2 seconds while keeping full EHR locked.
            </p>
          </div>

          <button
            onClick={handlePrintCard}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-glow-purple transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Emergency Wallet Card</span>
          </button>
        </div>
      </div>

      {/* Main Grid: QR Card + Emergency Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: Scannable Emergency QR Badge */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-purple-500/30 shadow-glow-purple text-center space-y-5 bg-gradient-to-b from-[#101428] via-[#090e1d] to-[#101428]">
            
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-xs font-extrabold text-purple-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>NOVA Emergency Pass</span>
              </div>
              <h3 className="text-lg font-black text-white">
                {patient.name}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">{patient.mrn}</p>
            </div>

            {/* Dynamic SVG QR Code Visualizer */}
            <div className="relative mx-auto w-52 h-52 bg-white p-3 rounded-2xl shadow-2xl flex items-center justify-center group">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full text-slate-950" 
                fill="currentColor"
              >
                {/* QR Pattern Representation */}
                <rect x="5" y="5" width="25" height="25" fill="#090e1d" rx="2" />
                <rect x="8" y="8" width="19" height="19" fill="#ffffff" rx="1" />
                <rect x="11" y="11" width="13" height="13" fill="#090e1d" rx="1" />

                <rect x="70" y="5" width="25" height="25" fill="#090e1d" rx="2" />
                <rect x="73" y="8" width="19" height="19" fill="#ffffff" rx="1" />
                <rect x="76" y="11" width="13" height="13" fill="#090e1d" rx="1" />

                <rect x="5" y="70" width="25" height="25" fill="#090e1d" rx="2" />
                <rect x="8" y="73" width="19" height="19" fill="#ffffff" rx="1" />
                <rect x="11" y="76" width="13" height="13" fill="#090e1d" rx="1" />

                {/* Random Pattern Dots */}
                <rect x="35" y="10" width="8" height="8" fill="#090e1d" />
                <rect x="50" y="8" width="8" height="8" fill="#090e1d" />
                <rect x="40" y="25" width="15" height="8" fill="#090e1d" />
                <rect x="10" y="38" width="8" height="8" fill="#090e1d" />
                <rect x="25" y="42" width="12" height="6" fill="#090e1d" />
                <rect x="45" y="40" width="18" height="18" fill="#7e22ce" rx="2" />
                <rect x="70" y="35" width="10" height="8" fill="#090e1d" />
                <rect x="85" y="45" width="8" height="15" fill="#090e1d" />
                <rect x="35" y="65" width="12" height="12" fill="#090e1d" />
                <rect x="55" y="65" width="8" height="20" fill="#090e1d" />
                <rect x="70" y="70" width="20" height="8" fill="#090e1d" />
                <rect x="75" y="82" width="12" height="10" fill="#090e1d" />
              </svg>

              {/* Center Overlay Logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Heart className="w-5 h-5 fill-current animate-pulse" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-300 font-mono block">
                Scan with any Smartphone Camera
              </span>
              <p className="text-[10px] text-slate-400">
                Zero-app required. Instantly renders emergency dossier.
              </p>
            </div>

          </div>
        </div>

        {/* Right 8 Cols: Emergency Safe Medical Dossier */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Critical Triage Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Blood Group</span>
              <div className="text-xl font-black text-rose-400 font-mono">
                {passport.bloodGroup}
              </div>
              <span className="text-[10px] text-slate-500">Crossmatch verified</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Code Status</span>
              <div className="text-xl font-black text-emerald-400 font-mono">
                {passport.resuscitationDNR ? 'DNR / DNI' : 'FULL CODE'}
              </div>
              <span className="text-[10px] text-slate-500">Resuscitation directive</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Organ Donor</span>
              <div className="text-xl font-black text-purple-400 font-mono">
                {passport.organDonorStatus ? 'REGISTERED' : 'NO'}
              </div>
              <span className="text-[10px] text-slate-500">Registry status</span>
            </div>

          </div>

          {/* Anaphylactic Allergies Alert Box */}
          <div className="glass-card rounded-2xl p-5 border border-rose-500/40 bg-rose-950/20 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-rose-300 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Fatal / Critical Anaphylactic Allergies</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {passport.criticalAllergies.map((allergy, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/20 text-rose-200 border border-rose-500/50 shadow-glow-cyan"
                >
                  ⚠️ {allergy}
                </span>
              ))}
            </div>
          </div>

          {/* Chronic Conditions & Active Regimens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Chronic Medical Conditions
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {passport.chronicConditions.map((cond, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Current Active Medications
              </span>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {passport.activeMedications.map((med, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span className="font-mono">{med}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Emergency Next-of-Kin Contact */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Next-of-Kin</span>
              <div className="text-xs sm:text-sm font-bold text-white">
                {passport.emergencyContact.name} ({passport.emergencyContact.relation})
              </div>
              <div className="text-xs font-mono text-cyan-300">
                {passport.emergencyContact.phone}
              </div>
            </div>

            <a
              href={`tel:${passport.emergencyContact.phone}`}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-glow-emerald"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Contact</span>
            </a>
          </div>

          {/* Clinician Deep Unlock Barrier */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300">
                {isUnlocked ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-slate-400" />}
                <span>Comprehensive Clinical Longitudinal History</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {isUnlocked ? 'Verified Clinician Access' : 'Privacy Locked'}
              </span>
            </div>

            {!isUnlocked ? (
              <form onSubmit={handleUnlock} className="flex space-x-2">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Hospital Staff PIN (e.g. 1234)..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all"
                >
                  Unlock EHR
                </button>
              </form>
            ) : (
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-emerald-500/30 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-emerald-300">
                  ✓ Full Longitudinal Medical Record Unlocked for Hospital Episode #2026-902
                </p>
                <div className="text-[11px] text-slate-400 leading-relaxed font-mono">
                  Previous Surgeries: Appendectomy (2012), Left Inguinal Herniorrhaphy (2018). Genomic Profile: CYP2C19 *1/*2 Intermediate Clopidogrel Metabolizer. Social History: Non-smoker, no ethanol abuse.
                </div>
              </div>
            )}

            {pinError && (
              <p className="text-[11px] text-rose-400 font-mono">
                Incorrect PIN. Use demo code: 1234 or 7749.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
