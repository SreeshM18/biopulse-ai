import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  CheckCircle2, 
  XCircle, 
  Video, 
  Plus, 
  Search, 
  Filter,
  Building2,
  AlertCircle
} from 'lucide-react';
import { INITIAL_APPOINTMENTS, Appointment } from '../data/appointments';
import { PatientProfile, TabType } from '../types/biotech';
import { clinicalDb } from '../services/clinicalDatabaseService';

interface AppointmentsManagerProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const AppointmentsManager: React.FC<AppointmentsManagerProps> = ({
  patient,
  setActiveTab
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  // New Booking Form State
  const [doctorName, setDoctorName] = useState<string>('Dr. Sarah Lin, MD');
  const [department, setDepartment] = useState<string>('Critical Care / Pulmonology');
  const [date, setDate] = useState<string>('Today');
  const [time, setTime] = useState<string>('19:00 PM');
  const [reason, setReason] = useState<string>('Specialist Tele-Consultation & Review');

  const filtered = appointments.filter(a => {
    if (filterStatus === 'All') return true;
    return a.status === filterStatus;
  });

  const handleUpdateStatus = (id: string, newStatus: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      doctorName,
      department,
      date,
      time,
      reason,
      status: 'Scheduled',
      room: 'Consultation Suite 101',
      isTeleconsult: true
    };

    clinicalDb.createAppointment({
      id: newApt.id,
      patientId: patient.id,
      patientName: patient.name,
      mrn: patient.mrn,
      doctorId: 'user-doc-sarah',
      doctorName,
      department,
      dateTime: new Date().toISOString(),
      durationMinutes: 30,
      appointmentType: 'Teleconsult (Video)',
      status: 'Confirmed',
      chiefComplaint: reason,
      roomOrBedLocation: 'Consultation Suite 101'
    });

    setAppointments(prev => [newApt, ...prev]);
    setIsBookingOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Outpatient & Specialist Rounds
              </span>
              <span className="text-xs font-mono text-purple-300 font-bold">
                Hospital Appointments System
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-cyan-400" />
              <span>Consultation Schedule & Specialist Appointments</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Manage in-person clinic visits, telemedicine rounds, patient check-ins, and scheduled specialist follow-ups.
            </p>
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Appointment</span>
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-2 border-t border-slate-800/80 no-scrollbar text-xs">
          {['All', 'Scheduled', 'Checked In', 'Completed', 'Cancelled'].map((status) => (
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

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((apt) => (
          <div
            key={apt.id}
            className={`p-5 rounded-2xl border transition-all space-y-3.5 ${
              apt.status === 'Checked In' ? 'bg-slate-900 border-emerald-500/50 shadow-glow-cyan' :
              apt.status === 'Scheduled' ? 'glass-card border-cyan-500/40' :
              'bg-slate-950/60 border-slate-800 opacity-80'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block">
                  {apt.department}
                </span>
                <h4 className="text-base font-black text-white">{apt.reason}</h4>
                <div className="text-xs text-slate-300 font-bold flex items-center space-x-1.5 mt-0.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Patient: <strong className="text-white">{apt.patientName}</strong></span>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                apt.status === 'Checked In' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse' :
                apt.status === 'Scheduled' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                apt.status === 'Completed' ? 'bg-slate-800 text-slate-300' :
                'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                ● {apt.status}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor / Specialist:</span>
                <span className="text-white font-bold">{apt.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="text-cyan-300 font-bold">{apt.date} • {apt.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location / Suite:</span>
                <span className="text-slate-400">{apt.room}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center space-x-2 pt-1 border-t border-slate-800/60">
              {apt.status === 'Scheduled' && (
                <button
                  onClick={() => handleUpdateStatus(apt.id, 'Checked In')}
                  className="flex-1 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Check In Patient</span>
                </button>
              )}

              {apt.status === 'Checked In' && (
                <button
                  onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                  className="flex-1 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center justify-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Complete Consultation</span>
                </button>
              )}

              {apt.isTeleconsult && (
                <button
                  onClick={() => setActiveTab('whole_body')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 transition-all flex items-center space-x-1"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Launch Telemed</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#090e1d] border border-cyan-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Book New Specialist Appointment</span>
              </h4>
              <button onClick={() => setIsBookingOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Doctor</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Clinical Reason</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
