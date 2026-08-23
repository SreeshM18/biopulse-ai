import React, { useState } from 'react';
import { 
  Users, 
  Pill, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  Search, 
  Filter, 
  ShieldCheck, 
  Plus,
  Send
} from 'lucide-react';
import { INITIAL_EMAR_RECORDS, MedicationAdministrationRecord } from '../data/nurseEmar';
import { PatientProfile } from '../types/biotech';

interface NurseEmarViewProps {
  patient: PatientProfile;
}

export const NurseEmarView: React.FC<NurseEmarViewProps> = ({ patient }) => {
  const [records, setRecords] = useState<MedicationAdministrationRecord[]>(INITIAL_EMAR_RECORDS);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [administerSuccessId, setAdministerSuccessId] = useState<string | null>(null);

  const filteredRecords = records.filter(r => {
    const matchesPatient = r.patientId === patient.id || r.patientName.toLowerCase().includes(patient.name.toLowerCase().slice(0, 5));
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchesPatient && matchesStatus;
  });

  const handleAdministerDose = (recordId: string) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRecords(prev => prev.map(r => {
      if (r.id === recordId) {
        return {
          ...r,
          status: 'Given',
          administeredTime: currentTime,
          givenBy: 'Nurse Sarah Connor, RN (Current Shift)',
          barcodeVerified: true
        };
      }
      return r;
    }));
    setAdministerSuccessId(recordId);
    setTimeout(() => setAdministerSuccessId(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Nurse Station & eMAR
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Electronic Medication Administration Record
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Users className="w-6 h-6 text-cyan-400" />
              <span>Bedside Medication Administration & Nursing Station</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Verify scheduled medications, barcode scan bedside patient wristbands, log administered doses, and document delayed or missed administrations for <strong>{patient.name}</strong> ({patient.bedLocation}).
            </p>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1 no-scrollbar text-xs">
            {['All', 'Pending', 'Given', 'Delayed', 'Missed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* eMAR Medication Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecords.map((rec) => (
          <div
            key={rec.id}
            className={`p-5 rounded-2xl border transition-all space-y-3 ${
              rec.status === 'Given' ? 'bg-slate-950/60 border-slate-800' :
              rec.status === 'Pending' ? 'glass-card border-cyan-500/40 shadow-glow-cyan' :
              'bg-amber-950/20 border-amber-500/40'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block">
                  Route: {rec.route}
                </span>
                <h4 className="text-base font-black text-white">{rec.drugName}</h4>
                <span className="text-xs font-mono text-cyan-300 font-extrabold">{rec.dosage}</span>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                rec.status === 'Given' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                rec.status === 'Pending' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse' :
                rec.status === 'Delayed' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                ● {rec.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Time:</span>
                <span className="text-white font-bold">{rec.scheduledTime}</span>
              </div>
              {rec.administeredTime && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Administered:</span>
                  <span className="text-emerald-400 font-bold">{rec.administeredTime} by {rec.givenBy}</span>
                </div>
              )}
              {rec.notes && (
                <div className="pt-1 border-t border-slate-800 text-slate-400 text-[11px]">
                  <strong>Clinical Note:</strong> {rec.notes}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{rec.barcodeVerified ? 'Barcode Wristband Verified' : 'Scan Wristband Required'}</span>
              </span>

              {rec.status === 'Pending' && (
                <button
                  onClick={() => handleAdministerDose(rec.id)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-cyan transition-all flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Scan & Administer Dose</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
