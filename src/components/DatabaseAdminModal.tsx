import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  Search, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Users, 
  CreditCard, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  HardDrive, 
  Cloud, 
  Sparkles,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { 
  clinicalDb, 
  DbUserAccount, 
  DbBillingInvoice, 
  DbAppointmentRecord, 
  DbClinicalAuditLog 
} from '../services/clinicalDatabaseService';
import { PatientProfile } from '../types/biotech';

interface DatabaseAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData?: () => void;
}

type ActiveDbTable = 'users' | 'patients' | 'invoices' | 'appointments' | 'audit_logs';

export const DatabaseAdminModal: React.FC<DatabaseAdminModalProps> = ({
  isOpen,
  onClose,
  onRefreshData
}) => {
  const [activeTable, setActiveTable] = useState<ActiveDbTable>('users');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Local reactive states
  const [users, setUsers] = useState<DbUserAccount[]>([]);
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [invoices, setInvoices] = useState<DbBillingInvoice[]>([]);
  const [appointments, setAppointments] = useState<DbAppointmentRecord[]>([]);
  const [auditLogs, setAuditLogs] = useState<DbClinicalAuditLog[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const loadData = () => {
    setUsers(clinicalDb.getUsers());
    setPatients(clinicalDb.getPatients());
    setInvoices(clinicalDb.getInvoices());
    setAppointments(clinicalDb.getAppointments());
    setAuditLogs(clinicalDb.getAuditLogs());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Export JSON
  const handleExport = () => {
    const dataStr = clinicalDb.exportEntireDatabaseJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `biopulse_master_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    showNotification('Database backup exported successfully as JSON!');
  };

  // Import JSON
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = clinicalDb.importDatabaseJSON(content);
      if (res.success) {
        loadData();
        if (onRefreshData) onRefreshData();
        showNotification(res.message);
      } else {
        alert(res.message);
      }
    };
    reader.readAsText(file);
  };

  // Reset to Defaults
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all tables to default seed data? Custom records will be replaced.')) {
      clinicalDb.resetToFactoryDefaults();
      loadData();
      if (onRefreshData) onRefreshData();
      showNotification('Database reset to factory default seed data.');
    }
  };

  // Delete Patient
  const handleDeletePatient = (id: string) => {
    clinicalDb.deletePatient(id);
    loadData();
    if (onRefreshData) onRefreshData();
    showNotification('Patient record permanently deleted from database.');
  };

  // Process Invoice Payment
  const handleMarkInvoicePaid = (id: string) => {
    clinicalDb.processPayment(id, 'Credit Card (Visa)');
    loadData();
    if (onRefreshData) onRefreshData();
    showNotification('Invoice payment processed and recorded in ledger.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col rounded-3xl bg-[#060a17] border border-cyan-500/40 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090f24]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-glow-cyan">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  BioPulse Master Clinical Database Studio
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
                  <HardDrive className="w-3 h-3" />
                  <span>PERSISTENT LOCAL + CLOUD READY</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real database engine storing users, authentication, patient EHR, billing payments, appointments, and audit logs.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExport}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-300 border border-cyan-500/30 transition-all"
              title="Download JSON Database Backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <label className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-purple-300 border border-purple-500/30 cursor-pointer transition-all">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Import</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
              title="Reset Database to Seed State"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Alert Banner */}
        {notification && (
          <div className="px-6 py-2 bg-cyan-950/80 border-b border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-between animate-fade-in">
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>{notification}</span>
            </span>
          </div>
        )}

        {/* Navigation Table Selector */}
        <div className="flex items-center space-x-2 px-6 pt-3 pb-2 border-b border-slate-800 bg-[#070c1e] overflow-x-auto scrollbar-thin">
          {[
            { id: 'users', label: 'Users & Auth', count: users.length, icon: <User className="w-4 h-4 text-cyan-400" /> },
            { id: 'patients', label: 'Patients (EHR)', count: patients.length, icon: <Users className="w-4 h-4 text-emerald-400" /> },
            { id: 'invoices', label: 'Billing & Invoices', count: invoices.length, icon: <CreditCard className="w-4 h-4 text-pink-400" /> },
            { id: 'appointments', label: 'Appointments', count: appointments.length, icon: <Calendar className="w-4 h-4 text-purple-400" /> },
            { id: 'audit_logs', label: 'Security Audit Logs', count: auditLogs.length, icon: <FileText className="w-4 h-4 text-amber-400" /> }
          ].map((tab) => {
            const isActive = activeTable === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTable(tab.id as ActiveDbTable)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-glow-cyan font-black'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.2 rounded-md bg-slate-950 text-[10px] font-mono border border-slate-800">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Toolbar */}
        <div className="p-4 bg-[#080d22] border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search across ${activeTable} table...`}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
            <span>Storage Engine: <strong>localStorage / IndexedDB v2</strong></span>
          </div>
        </div>

        {/* Main Table Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* =========================================================================
              TABLE: USERS & AUTHENTICATION
              ========================================================================= */}
          {activeTable === 'users' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">User ID</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">License / Dept</th>
                      <th className="p-3">2FA OTP</th>
                      <th className="p-3">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                    {users
                      .filter(u => !searchQuery || u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3 text-cyan-400 font-bold">{u.id}</td>
                          <td className="p-3 text-white font-bold">{u.fullName}</td>
                          <td className="p-3 text-slate-300">{u.email}</td>
                          <td className="p-3 text-slate-400">{u.phone}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">{u.medicalLicense || u.department || 'Standard Patient'}</td>
                          <td className="p-3 text-emerald-400 font-bold">{u.otpSecret}</td>
                          <td className="p-3 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TABLE: PATIENTS EHR
              ========================================================================= */}
          {activeTable === 'patients' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">MRN</th>
                      <th className="p-3">Patient Name</th>
                      <th className="p-3">Age / Sex</th>
                      <th className="p-3">Bed Location</th>
                      <th className="p-3">Primary Diagnosis</th>
                      <th className="p-3">Attending Physician</th>
                      <th className="p-3">Heart Rate / SpO2</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                    {patients
                      .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.mrn.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3 text-cyan-400 font-bold">{p.mrn}</td>
                          <td className="p-3 text-white font-bold">{p.name}</td>
                          <td className="p-3 text-slate-300">{p.age}y • {p.gender}</td>
                          <td className="p-3 text-amber-400 font-bold">{p.bedLocation}</td>
                          <td className="p-3 text-slate-300 font-sans text-xs">{p.primaryDiagnosis}</td>
                          <td className="p-3 text-slate-400">{p.attendingPhysician}</td>
                          <td className="p-3 text-emerald-400">
                            {p.vitals.heartRate} bpm • {p.vitals.spo2}% SpO2
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleDeletePatient(p.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                              title="Delete Patient Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TABLE: BILLING & INVOICES
              ========================================================================= */}
          {activeTable === 'invoices' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Invoice #</th>
                      <th className="p-3">Patient Name</th>
                      <th className="p-3">Total Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3">Invoice Date</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                    {invoices
                      .filter(i => !searchQuery || i.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3 text-cyan-400 font-bold">{inv.invoiceNumber}</td>
                          <td className="p-3 text-white font-bold">{inv.patientName}</td>
                          <td className="p-3 text-emerald-400 font-bold text-sm">
                            ${inv.totalAmount.toLocaleString()} {inv.currency}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inv.paymentStatus === 'PAID' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                              inv.paymentStatus === 'PENDING_INSURANCE' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                              'bg-rose-950 text-rose-300 border border-rose-500/40'
                            }`}>
                              {inv.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3 text-slate-300">{inv.paymentMethod}</td>
                          <td className="p-3 text-slate-400">{inv.invoiceDate}</td>
                          <td className="p-3">
                            {inv.paymentStatus !== 'PAID' && (
                              <button
                                onClick={() => handleMarkInvoicePaid(inv.id)}
                                className="px-2 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-[10px] font-bold border border-emerald-500/40"
                              >
                                Mark Paid ➔
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TABLE: APPOINTMENTS
              ========================================================================= */}
          {activeTable === 'appointments' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">ID</th>
                      <th className="p-3">Patient</th>
                      <th className="p-3">Doctor</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Date / Time</th>
                      <th className="p-3">Location</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                    {appointments
                      .filter(a => !searchQuery || a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3 text-cyan-400 font-bold">{apt.id}</td>
                          <td className="p-3 text-white font-bold">{apt.patientName}</td>
                          <td className="p-3 text-slate-300">{apt.doctorName}</td>
                          <td className="p-3 text-purple-300">{apt.appointmentType}</td>
                          <td className="p-3 text-slate-400">{new Date(apt.dateTime).toLocaleString()}</td>
                          <td className="p-3 text-amber-400">{apt.roomOrBedLocation}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                              {apt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              TABLE: AUDIT LOGS
              ========================================================================= */}
          {activeTable === 'audit_logs' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">User Name</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-3 text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                            {log.action}
                          </span>
                        </td>
                        <td className="p-3 text-white font-bold">{log.userName}</td>
                        <td className="p-3 text-cyan-400">{log.userRole}</td>
                        <td className="p-3 text-slate-300 font-sans text-xs">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
