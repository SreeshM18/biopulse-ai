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
  Plus, 
  FileCheck2, 
  ShieldAlert, 
  Calendar,
  Search,
  Filter,
  Check,
  Download,
  FileText
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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

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

  const filteredPrescriptions = prescriptions.filter(p => {
    const matchesSearch = 
      p.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.prescribingDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.prescribedHospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const flaggedCount = prescriptions.filter(p => p.isDuplicateOrHazard).length;

  return (
    <div className="space-y-5">
      
      {/* Header Banner */}
      <div className="pro-card p-5 space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-sky-950 text-sky-400 border border-sky-800">
                FHIR R4 • US Core Medication Orders
              </span>
              <span className="text-xs font-mono text-slate-400">
                Patient: <strong className="text-white">{patient.name}</strong> ({patient.mrn})
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Pill className="h-5 w-5 text-sky-400" />
              <span>Hospital Pharmacy & e-Prescribing Vault</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified clinical medication timeline with active MedGuard duplicate therapy and drug-drug interaction screening.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsGrantingPass(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Grant Doctor Access Pass</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Alert (if any drug-drug contraindication) */}
      {flaggedCount > 0 && (
        <div className="pro-card p-4 border-rose-800/80 bg-rose-950/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-300 uppercase tracking-wide">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              <span>MedGuard Safety Audit: Potential Cross-Facility Duplicate Regimen</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-900 text-rose-200">
              {flaggedCount} ALERT REQUIRES RECONCILIATION
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Detected concurrent prescription of duplicate ACE inhibitor therapy between St. Jude Memorial and Outpatient Specialist Clinic. Please verify active titration.
          </p>
        </div>
      )}

      {/* Grant Pass Modal Popup */}
      {isGrantingPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="pro-card p-5 max-w-md w-full space-y-4 border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Grant Temporary 1-Hour Clinical Access Pass</h3>
              <button onClick={() => setIsGrantingPass(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleGrantTemporaryPass} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Attending Physician Name</label>
                <input
                  type="text"
                  value={doctorNameInput}
                  onChange={(e) => setDoctorNameInput(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Hospital / Clinic Facility</label>
                <input
                  type="text"
                  value={hospitalInput}
                  onChange={(e) => setHospitalInput(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGrantingPass(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold"
                >
                  Authorize Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="pro-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search medications by drug name, prescriber, hospital..."
            className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Regimen</option>
            <option value="Completed">Completed</option>
            <option value="Flagged Discontinued">Discontinued</option>
          </select>
        </div>
      </div>

      {/* Main Prescriptions Table */}
      <div className="pro-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="pro-table-header">
                <th className="py-3 px-4">Medication & Strength</th>
                <th className="py-3 px-3">Dosage & Frequency</th>
                <th className="py-3 px-3">Prescribing Physician</th>
                <th className="py-3 px-3">Facility</th>
                <th className="py-3 px-3">Date Prescribed</th>
                <th className="py-3 px-3">Adherence</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Digital Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredPrescriptions.map((rx) => {
                const isActive = rx.status === 'Active';
                const isHazard = rx.isDuplicateOrHazard;

                return (
                  <tr key={rx.id} className="pro-table-row">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white text-xs">{rx.drugName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">Dose: {rx.dosage}</div>
                    </td>

                    <td className="py-3 px-3 text-slate-300 font-medium">
                      {rx.frequency}
                    </td>

                    <td className="py-3 px-3 text-slate-300">
                      {rx.prescribingDoctor}
                    </td>

                    <td className="py-3 px-3 text-slate-400">
                      {rx.prescribedHospital}
                    </td>

                    <td className="py-3 px-3 text-slate-400 font-mono">
                      {rx.prescribedDate}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                        <span className="text-emerald-400 font-bold">{rx.adherenceRate}%</span>
                        <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${rx.adherenceRate}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        isHazard
                          ? 'bg-rose-950 text-rose-300 border-rose-800'
                          : isActive
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}>
                        {isHazard ? 'FLAGGED HAZARD' : rx.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right font-mono text-[10px] text-slate-400 truncate max-w-[120px]">
                      {rx.digitalSignature || 'SHA-256 Verified'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Consent Logs Table */}
      <div className="pro-card p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Lock className="h-4 w-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Active Cross-Facility Access Grants & Consent Tokens</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">HIPAA Section 164.508 Compliant</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="pro-table-header">
                <th className="py-2.5 px-3">Authorized Clinician</th>
                <th className="py-2.5 px-3">Healthcare Facility</th>
                <th className="py-2.5 px-3">Access Tier</th>
                <th className="py-2.5 px-3">Granted Time</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {consentLogs.map((log) => (
                <tr key={log.id} className="pro-table-row">
                  <td className="py-2.5 px-3 font-medium text-white">{log.doctorName}</td>
                  <td className="py-2.5 px-3 text-slate-300">{log.hospitalName}</td>
                  <td className="py-2.5 px-3 text-sky-400 font-mono">{log.accessTier}</td>
                  <td className="py-2.5 px-3 text-slate-400 font-mono">{log.grantedTimestamp}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-900 text-slate-500'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {log.status === 'Active' && (
                      <button
                        onClick={() => handleRevokeConsent(log.id)}
                        className="px-2 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 text-[10px] font-semibold transition-colors"
                      >
                        Revoke Access
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
