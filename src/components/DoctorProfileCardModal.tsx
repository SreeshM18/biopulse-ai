import React from 'react';
import { 
  Stethoscope, 
  Award, 
  Clock, 
  CheckCircle2, 
  Users, 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Video, 
  AlertTriangle, 
  ExternalLink,
  X
} from 'lucide-react';
import { DoctorProfile, PatientProfile } from '../types/biotech';

interface DoctorProfileCardModalProps {
  doctor: DoctorProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectAssignedPatient?: (patientId: string) => void;
  onLaunchTeleconsult?: (doctor: DoctorProfile) => void;
}

export const DoctorProfileCardModal: React.FC<DoctorProfileCardModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onSelectAssignedPatient,
  onLaunchTeleconsult
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#090e1d] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Doctor Header Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 border-2 border-cyan-500/40 shrink-0">
            {doctor.avatarUrl ? (
              <img src={doctor.avatarUrl} alt={doctor.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-cyan-950 text-cyan-400 font-bold text-xl">
                {doctor.name.slice(0, 2)}
              </div>
            )}
            <span className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-[#090e1d] ${
              doctor.availability === 'Available Now' ? 'bg-emerald-500 animate-pulse' :
              doctor.availability === 'In Surgery' ? 'bg-rose-500' : 'bg-purple-500'
            }`} />
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {doctor.department}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                doctor.availability === 'Available Now' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' :
                doctor.availability === 'In Surgery' ? 'bg-rose-950 text-rose-300 border border-rose-500/30' :
                'bg-purple-950 text-purple-300 border border-purple-500/30'
              }`}>
                ● {doctor.availability}
              </span>
            </div>
            <h3 className="text-xl font-black text-white">{doctor.name}</h3>
            <p className="text-xs text-cyan-400 font-semibold">{doctor.specialty}</p>
          </div>
        </div>

        {/* Doctor Metadata Grid (Department, Qualification, Experience, License) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold uppercase">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>Medical Qualifications</span>
            </div>
            <p className="text-xs font-mono text-slate-200 font-semibold">{doctor.qualification}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold uppercase">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clinical Experience</span>
            </div>
            <p className="text-xs font-mono text-emerald-300 font-semibold">{doctor.experience}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold uppercase">
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Hospital Affiliation</span>
            </div>
            <p className="text-xs font-mono text-slate-200">{doctor.hospitalAffiliation}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Medical License ID</span>
            </div>
            <p className="text-xs font-mono text-cyan-300 font-bold">{doctor.licenseNumber}</p>
          </div>

        </div>

        {/* Patients Assigned Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Inpatients Currently Assigned ({doctor.patientsAssigned.length}):</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Bedside Telemetry Linked</span>
          </div>

          <div className="space-y-2">
            {doctor.patientsAssigned.map((p, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between transition-all"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-extrabold text-white">{p.patientName}</span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-500/30 font-bold">
                      {p.bedLocation}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      p.acuity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {p.acuity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{p.diagnosis}</p>
                </div>

                <button
                  onClick={() => {
                    if (onSelectAssignedPatient) onSelectAssignedPatient(p.patientId);
                    onClose();
                  }}
                  className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all flex items-center space-x-1"
                >
                  <span>View Telemetry</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Actions */}
        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            Close
          </button>
          
          <button
            onClick={() => {
              if (onLaunchTeleconsult) onLaunchTeleconsult(doctor);
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan transition-all flex items-center space-x-1.5"
          >
            <Video className="w-4 h-4" />
            <span>Launch Tele-Round with {doctor.name.split(',')[0]}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
