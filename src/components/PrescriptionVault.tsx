import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Pill, 
  AlertTriangle, 
  Building2, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Clock, 
  RefreshCw, 
  Plus, 
  FileCheck2, 
  Sparkles, 
  UserCheck, 
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { PatientProfile, PrescriptionRecord, ConsentLog } from '../types/biotech';

interface PrescriptionVaultProps {
  patient: PatientProfile;
}

export const PrescriptionVault: React.FC<PrescriptionVaultProps> = ({ patient }) => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionRecord[]>(
    patient.emergencyPassport.prescriptions || []
  );
  const [consentLogs, setConsentLogs] = useState<ConsentLog[]>(
    patient.emergencyPassport.consentLogs || []
  );
  const [isGrantingPass, setIsGrantingPass] = useState<boolean>(false);
  const [doctorNameInput, setDoctorNameInput] = useState<string>('Dr. Emily Watson, MD');
  const [hospitalInput, setHospitalInput] = useState<string>('City Cardiology Clinic');

  const handleGrantTemporaryPass = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: ConsentLog = {
      id: `c-${Date.now()}`,
      doctorName: doctorNameInput,
      hospitalName: hospitalInput,
      accessTier: '1-Hour Full Clinical',
      grantedTimestamp: new Date().toLocaleTimeString(),
      expiryTimestamp: new Date(Date.now() + 3600000).toLocaleTimeString(),
      status: 'Active'
    };
    setConsentLogs(prev => [newLog, ...prev]);
    setIsGrantingPass(false);
  };

  const handleRevokeConsent = (id: string) => {
    setConsentLogs(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'Revoked by Patient' } : c
    ));
  };

  const flaggedCount = prescriptions.filter(p => p.isDuplicateOrHazard).length;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                FHIR / ABDM Interoperability
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">
                ABHA ID: {patient.emergencyPassport.abhaId || '91-8820-4102-9912'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Pill className="w-6 h-6 text-purple-400" />
              <span>Cross-Hospital Prescription Vault & Consent Manager</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              One patient across multiple health systems. Patient-owned unified prescription timeline with automated AI duplicate therapy and cross-hospital drug-drug hazard detection.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsGrantingPass(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-purple transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Grant 1-Hour Doctor Pass</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Cross-Hospital Safety Hazard Alert (if any) */}
      {flaggedCount > 0 && (
        <div className="glass-card rounded-2xl p-5 border border-rose-500/50 bg-rose-950/20 shadow-glow-cyan space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-rose-300 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-400 animate-bounce" />
              <span>AI Cross-Hospital Prescription Hazard Intercept ({flaggedCount} Flagged)</span>
            </div>
            <span className="text-[10px] font-mono text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-500/40 font-bold">
              Automatic Clinical Flag
            </span>
          </div>

          <div className="space-y-2">
            {prescriptions.filter(p => p.isDuplicateOrHazard).map((rx) => (
              <div key={rx.id} className="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/40 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{rx.drugName} ({rx.dosage})</span>
                  <span className="font-mono text-[10px] text-rose-400">{rx.prescribedHospital}</span>
                </div>
                <p className="text-xs text-rose-200 leading-relaxed font-medium">
                  {rx.safetyRiskAlert}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Prescription Timeline + Dynamic Consent Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Unified Cross-Hospital Prescription Vault */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4 text-purple-400" />
                <span>Unified Cross-Hospital Medication Records</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {prescriptions.length} Records Synced
              </span>
            </div>

            <div className="space-y-3">
              {prescriptions.map((rx) => (
                <div
                  key={rx.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    rx.isDuplicateOrHazard
                      ? 'bg-rose-950/10 border-rose-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-sm text-white">{rx.drugName}</span>
                        <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                          {rx.dosage}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {rx.frequency}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      rx.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}>
                      {rx.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800/60">
                    <div className="flex items-center space-x-1 truncate">
                      <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{rx.prescribedHospital}</span>
                    </div>
                    <div className="text-right">
                      Adherence: <strong className="text-white">{rx.adherenceRate}%</strong> • Refill in {rx.refillDueDays}d
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1.5">
                    <span>Rx by: {rx.prescribingDoctor}</span>
                    <span className="text-purple-400 flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
                      <span>{rx.digitalSignature}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Patient-Controlled Consent Access Log */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Patient Consent & Access Grants</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">
                Active Policy
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              The patient maintains sovereign ownership of their data. Doctors access records only through temporary timed consent tokens or emergency QR triage scans.
            </p>

            {/* Grant List */}
            <div className="space-y-2.5">
              {consentLogs.map((log) => (
                <div 
                  key={log.id} 
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    log.status === 'Active'
                      ? 'bg-slate-900/80 border-cyan-500/40'
                      : 'bg-slate-950/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{log.doctorName}</div>
                      <div className="text-[11px] text-slate-400">{log.hospitalName}</div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {log.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                    <span>Tier: {log.accessTier}</span>
                    <span>Expires: {log.expiryTimestamp}</span>
                  </div>

                  {log.status === 'Active' && (
                    <button
                      onClick={() => handleRevokeConsent(log.id)}
                      className="w-full py-1 rounded-lg text-[10px] font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all mt-1"
                    >
                      Revoke Consent Now
                    </button>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Grant Temporary Pass Modal Dialog */}
      {isGrantingPass && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#090e1d] border border-purple-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Issue 1-Hour Clinician Access Token</span>
              </h4>
              <button
                onClick={() => setIsGrantingPass(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGrantTemporaryPass} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Doctor Name</label>
                <input
                  type="text"
                  value={doctorNameInput}
                  onChange={(e) => setDoctorNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Hospital / Clinic</label>
                <input
                  type="text"
                  value={hospitalInput}
                  onChange={(e) => setHospitalInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-[11px] text-purple-300">
                ✓ Token automatically self-destructs and expires in exactly 60 minutes.
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsGrantingPass(false)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-glow-purple"
                >
                  Authorize Grant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
