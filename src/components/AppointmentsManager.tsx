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
  AlertCircle,
  MapPin
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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  // New Booking Form State
  const [doctorName, setDoctorName] = useState<string>('Dr. Sarah Lin, MD');
  const [department, setDepartment] = useState<string>('Critical Care / Pulmonology');
  const [date, setDate] = useState<string>('Today');
  const [time, setTime] = useState<string>('14:30 PM');
  const [reason, setReason] = useState<string>('Specialist Tele-Consultation & Review');

  const filtered = appointments.filter(a => {
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus;
    const matchesSearch = 
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
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
    <div className="space-y-5">
      
      {/* Header */}
      <div className="pro-card p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-sky-950 text-sky-400 border border-sky-800">
                Clinic Scheduling & Telehealth Hub
              </span>
              <span className="text-xs font-mono text-slate-400">
                Active Inpatient: <strong className="text-white">{patient.name}</strong> ({patient.mrn})
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-sky-400" />
              <span>Outpatient & Specialist Clinical Appointments</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Direct clinic scheduling, specialist video teleconsultations, and ICU specialist rounds management.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="pro-card p-5 max-w-md w-full space-y-4 border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Schedule Clinical Appointment</h3>
              <button onClick={() => setIsBookingOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateAppointment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Attending Specialist</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Department / Specialty</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Reason for Consult</label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500 resize-none"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="pro-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search appointments by patient, physician, department..."
            className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400 font-medium">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List Grid */}
      <div className="pro-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="pro-table-header">
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-3">Physician</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Location / Modality</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((apt) => {
                const isComplete = apt.status === 'Completed';
                const isScheduled = apt.status === 'Scheduled';

                return (
                  <tr key={apt.id} className="pro-table-row">
                    <td className="py-3 px-4 font-semibold text-white">
                      {apt.patientName}
                    </td>

                    <td className="py-3 px-3 text-slate-200">
                      {apt.doctorName}
                    </td>

                    <td className="py-3 px-3 text-slate-400">
                      {apt.department}
                    </td>

                    <td className="py-3 px-3 font-mono text-slate-300">
                      {apt.date} • {apt.time}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1.5 text-sky-400 font-medium">
                        {apt.isTeleconsult ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                        <span>{apt.room}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        isComplete
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : isScheduled
                          ? 'bg-sky-950 text-sky-300 border-sky-800'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {isScheduled && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                            className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800 text-[10px] font-semibold transition-colors"
                          >
                            Mark Completed
                          </button>
                        )}
                        {apt.isTeleconsult && (
                          <button
                            onClick={() => alert(`Launching Encrypted Teleconsult Video Bridge with ${apt.doctorName}...`)}
                            className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 hover:bg-sky-900 border border-sky-800 text-[10px] font-semibold transition-colors"
                          >
                            Join Video
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
