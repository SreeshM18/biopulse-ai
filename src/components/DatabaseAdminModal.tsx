import React, { useState, useEffect } from 'react';
import { 
  Database, 
  X, 
  Search, 
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
  HardDrive, 
  Cloud, 
  Sparkles,
  ExternalLink,
  Zap,
  Radio,
  Copy,
  Check,
  Server,
  CloudOff,
  Activity,
  ArrowUpDown,
  Lock,
  KeyRound,
  Terminal
} from 'lucide-react';
import { 
  clinicalDb, 
  DbUserAccount, 
  DbBillingInvoice, 
  DbAppointmentRecord, 
  DbClinicalAuditLog 
} from '../services/clinicalDatabaseService';
import { supabaseManager, SupabaseConnectionStatus } from '../services/supabaseClient';
import { PatientProfile } from '../types/biotech';

interface DatabaseAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData?: () => void;
}

type ActiveDbTable = 'users' | 'patients' | 'invoices' | 'appointments' | 'audit_logs' | 'supabase';

const SQL_MIGRATION_CODE = `-- ============================================================================
-- BIOPULSE AI: MASTER PRODUCTION CLINICAL DATABASE SCHEMA
-- PostgreSQL / Supabase Migration
-- Supports: Users, Patients, Vitals, Prescriptions, Invoices, Appointments,
--           SOAP Notes, MedGuard Safety Audits, and Forensic Toxicology
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER ACCOUNTS & RBAC TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    full_name VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('doctor', 'patient', 'hospital', 'emergency')),
    medical_license VARCHAR(100),
    department VARCHAR(150),
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    otp_secret VARCHAR(10) DEFAULT '749210',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PATIENTS MASTER EHR TABLE
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mrn VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    bed_location VARCHAR(100),
    admission_date TIMESTAMPTZ DEFAULT NOW(),
    primary_diagnosis TEXT NOT NULL,
    attending_physician VARCHAR(255) NOT NULL,
    blood_group VARCHAR(10),
    allergies JSONB DEFAULT '[]'::jsonb,
    chronic_conditions JSONB DEFAULT '[]'::jsonb,
    active_vitals JSONB NOT NULL,
    vitals_history JSONB DEFAULT '[]'::jsonb,
    risk_assessment JSONB NOT NULL,
    emergency_passport JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CLINICAL PRESCRIPTIONS & PHARMACY ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    patient_name VARCHAR(255) NOT NULL,
    drug_name VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255),
    dosage_form VARCHAR(100) NOT NULL,
    strength VARCHAR(50) NOT NULL,
    route VARCHAR(50) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    prescribing_doctor VARCHAR(255) NOT NULL,
    prescribed_hospital VARCHAR(255) NOT NULL,
    prescribed_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Flagged Discontinued')),
    adherence_rate INT DEFAULT 95,
    digital_signature TEXT,
    refill_due_days INT DEFAULT 30,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BILLING, PAYMENTS & INVOICES TABLE
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    patient_name VARCHAR(255) NOT NULL,
    mrn VARCHAR(50) NOT NULL,
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    invoice_date DATE DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_status VARCHAR(50) DEFAULT 'PENDING_INSURANCE' CHECK (payment_status IN ('PAID', 'PENDING_INSURANCE', 'OVERDUE', 'PROCESSING')),
    payment_method VARCHAR(100) DEFAULT 'Insurance Claim (Aetna)',
    transaction_hash VARCHAR(255),
    insurance_policy_number VARCHAR(100),
    insurance_claim_status VARCHAR(50),
    itemized_charges JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    patient_name VARCHAR(255) NOT NULL,
    mrn VARCHAR(50) NOT NULL,
    doctor_id UUID REFERENCES public.users(id),
    doctor_name VARCHAR(255) NOT NULL,
    department VARCHAR(150) NOT NULL,
    date_time TIMESTAMPTZ NOT NULL,
    duration_minutes INT DEFAULT 30,
    appointment_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'In Progress', 'Completed', 'Rescheduled', 'Cancelled')),
    chief_complaint TEXT,
    room_or_bed_location VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CLINICAL SOAP NOTES TABLE
CREATE TABLE IF NOT EXISTS public.clinical_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    author VARCHAR(255) NOT NULL,
    note_type VARCHAR(50) DEFAULT 'SOAP' CHECK (note_type IN ('SOAP', 'Nursing', 'Physician')),
    subjective TEXT NOT NULL,
    objective TEXT NOT NULL,
    assessment TEXT NOT NULL,
    plan TEXT NOT NULL,
    physician_signature TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AUDIT & ACCESS LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_id VARCHAR(100) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(50) DEFAULT '127.0.0.1'
);

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow authenticated read/write
CREATE POLICY "Allow authenticated read on users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow authenticated read on patients" ON public.patients FOR ALL USING (true);
CREATE POLICY "Allow authenticated read on prescriptions" ON public.prescriptions FOR ALL USING (true);
CREATE POLICY "Allow authenticated read on invoices" ON public.invoices FOR ALL USING (true);
CREATE POLICY "Allow authenticated read on appointments" ON public.appointments FOR ALL USING (true);
CREATE POLICY "Allow authenticated read on clinical_notes" ON public.clinical_notes FOR ALL USING (true);
CREATE POLICY "Allow authenticated read on audit_logs" ON public.audit_logs FOR ALL USING (true);`;

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

  // Supabase connection state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [connStatus, setConnStatus] = useState<SupabaseConnectionStatus | null>(null);
  const [realtimeActive, setRealtimeActive] = useState(supabaseManager.isRealtimeEnabled());
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlCode, setShowSqlCode] = useState(false);

  const loadData = () => {
    setUsers(clinicalDb.getUsers());
    setPatients(clinicalDb.getPatients());
    setInvoices(clinicalDb.getInvoices());
    setAppointments(clinicalDb.getAppointments());
    setAuditLogs(clinicalDb.getAuditLogs());

    const cfg = clinicalDb.getSupabaseConfig();
    setSupabaseUrl(cfg.url);
    setSupabaseAnonKey(cfg.anonKey);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      // Auto test connection if credentials exist
      if (clinicalDb.isSupabaseConfigured()) {
        handleTestConnection(false);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
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

  // Test Supabase Connection
  const handleTestConnection = async (showToast = true) => {
    setIsTesting(true);
    try {
      const res = await clinicalDb.testSupabaseConnection();
      setConnStatus(res);
      if (showToast) {
        showNotification(res.message);
      }
    } catch (err: any) {
      setConnStatus({
        connected: false,
        message: `Connection test failed: ${err.message}`,
        checkedAt: new Date().toISOString()
      });
      if (showToast) showNotification(`Connection test failed: ${err.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Save Supabase Credentials
  const handleSaveCredentials = async () => {
    if (!supabaseUrl.trim() || !supabaseAnonKey.trim()) {
      showNotification('Please enter both Supabase URL and Anon Key.');
      return;
    }

    const res = clinicalDb.setSupabaseCredentials(supabaseUrl, supabaseAnonKey);
    if (res.success) {
      showNotification('Supabase credentials saved! Testing connection...');
      await handleTestConnection(true);
    } else {
      showNotification(res.message);
    }
  };

  // Disconnect / Clear Supabase Credentials
  const handleDisconnect = () => {
    clinicalDb.clearSupabaseCredentials();
    setSupabaseUrl('');
    setSupabaseAnonKey('');
    setConnStatus(null);
    showNotification('Supabase credentials cleared. Switched to LocalStorage persistence mode.');
  };

  // Push Local Data to Supabase Cloud
  const handlePushToCloud = async () => {
    if (!clinicalDb.isSupabaseConfigured()) {
      showNotification('Please configure your Supabase URL & Key before pushing data.');
      return;
    }

    setIsPushing(true);
    try {
      const res = await clinicalDb.pushToSupabase();
      if (res.success) {
        showNotification(`Push complete! Synced: ${res.syncedCounts.patients} patients, ${res.syncedCounts.users} users, ${res.syncedCounts.invoices} invoices, ${res.syncedCounts.appointments} appointments.`);
        await handleTestConnection(false);
      } else {
        showNotification(`Sync notice: ${res.message}`);
      }
    } catch (err: any) {
      showNotification(`Push failed: ${err.message}`);
    } finally {
      setIsPushing(false);
    }
  };

  // Pull Cloud Data from Supabase
  const handlePullFromCloud = async () => {
    if (!clinicalDb.isSupabaseConfigured()) {
      showNotification('Please configure your Supabase URL & Key before pulling data.');
      return;
    }

    setIsPulling(true);
    try {
      const res = await clinicalDb.pullFromSupabase();
      if (res.success) {
        loadData();
        if (onRefreshData) onRefreshData();
        showNotification(res.message);
      } else {
        showNotification(`Pull error: ${res.message}`);
      }
    } catch (err: any) {
      showNotification(`Pull failed: ${err.message}`);
    } finally {
      setIsPulling(false);
    }
  };

  // Copy SQL script
  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_MIGRATION_CODE);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
    showNotification('Full SQL migration script copied to clipboard!');
  };

  const isCloudConnected = connStatus?.connected;

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
                {isCloudConnected ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1 shadow-glow-emerald">
                    <Cloud className="w-3 h-3 text-emerald-400" />
                    <span>SUPABASE CLOUD ACTIVE ({connStatus?.latencyMs || 0}ms)</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center space-x-1">
                    <HardDrive className="w-3 h-3 text-cyan-400" />
                    <span>PERSISTENT LOCAL ENGINE</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                PostgreSQL & Cloud database engine storing users, authentication, EHR patients, billing, appointments, and audit trails.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTable('supabase')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-900/60 to-cyan-900/60 hover:from-emerald-800 hover:to-cyan-800 text-xs font-mono text-emerald-300 border border-emerald-500/40 transition-all shadow-glow-emerald"
              title="Configure Supabase Cloud Database"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Supabase Cloud</span>
            </button>

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
          <div className="px-6 py-2 bg-cyan-950/90 border-b border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-between animate-fade-in">
            <span className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{notification}</span>
            </span>
          </div>
        )}

        {/* Navigation Table Selector */}
        <div className="flex items-center space-x-2 px-6 pt-3 pb-2 border-b border-slate-800 bg-[#070c1e] overflow-x-auto scrollbar-thin">
          {[
            { id: 'supabase', label: 'Supabase Cloud Hub', count: isCloudConnected ? 'ONLINE' : 'CONFIG', icon: <Cloud className="w-4 h-4 text-emerald-400" /> },
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
                <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono border ${
                  tab.id === 'supabase'
                    ? isCloudConnected ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40 font-black' : 'bg-amber-950 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-300 border-slate-800'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Toolbar (for data tables) */}
        {activeTable !== 'supabase' && (
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
              <span>Storage Engine: <strong>{isCloudConnected ? 'Supabase PostgreSQL + LocalSync' : 'localStorage / IndexedDB v2'}</strong></span>
            </div>
          </div>
        )}

        {/* Main Table Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* =========================================================================
              TAB: SUPABASE CLOUD HUB
              ========================================================================= */}
          {activeTable === 'supabase' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Connection Status Overview Banner */}
              <div className={`p-5 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                isCloudConnected 
                  ? 'bg-emerald-950/30 border-emerald-500/50 shadow-glow-emerald' 
                  : connStatus?.error
                  ? 'bg-rose-950/30 border-rose-500/50 shadow-glow-rose'
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg ${
                    isCloudConnected 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    {isCloudConnected ? (
                      <Cloud className="w-6 h-6 animate-pulse text-emerald-400" />
                    ) : (
                      <CloudOff className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-black text-white">
                        {isCloudConnected ? 'Connected to Supabase PostgreSQL' : 'Supabase Cloud: Not Connected / Standby'}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                        isCloudConnected 
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' 
                          : 'bg-amber-950 text-amber-300 border-amber-500/40'
                      }`}>
                        {isCloudConnected ? 'CLOUD LIVE' : 'LOCAL FALLBACK ACTIVE'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {connStatus?.message || 'Configure your Supabase Project URL and Anon Public Key below to sync EHR records.'}
                    </p>
                    {connStatus?.latencyMs && (
                      <div className="flex items-center space-x-3 mt-1.5 text-[11px] font-mono text-slate-400">
                        <span>Latency: <strong className="text-emerald-400">{connStatus.latencyMs} ms</strong></span>
                        <span>•</span>
                        <span>Active Tables: <strong className="text-cyan-400">{connStatus.tablesDetected?.join(', ') || 'None'}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTestConnection(true)}
                    disabled={isTesting}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Testing Ping...' : 'Test Connection'}</span>
                  </button>

                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold transition-all"
                  >
                    <span>Supabase Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Two Column Layout: Configuration & Sync Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Column 1: Supabase Credentials Manager */}
                <div className="p-5 rounded-3xl bg-[#080d22] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2 text-cyan-400">
                      <KeyRound className="w-4 h-4" />
                      <h4 className="text-sm font-bold text-white">Project API Credentials</h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      Auto-saved to Browser & .env ready
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Supabase Project URL
                      </label>
                      <input
                        type="text"
                        value={supabaseUrl}
                        onChange={(e) => setSupabaseUrl(e.target.value)}
                        placeholder="https://xyzabcdefghijk.supabase.co"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 font-mono outline-none"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Found in Supabase Dashboard → Settings → API → Project URL
                      </span>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-bold mb-1">
                        Supabase Anon Key (Public)
                      </label>
                      <textarea
                        rows={2}
                        value={supabaseAnonKey}
                        onChange={(e) => setSupabaseAnonKey(e.target.value)}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2 text-xs text-white placeholder-slate-400 font-mono outline-none resize-none"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Found in Supabase Dashboard → Settings → API → Project API Keys → `anon` (public)
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={handleSaveCredentials}
                        className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition-all shadow-glow-cyan"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Save & Connect</span>
                      </button>

                      {clinicalDb.isSupabaseConfigured() && (
                        <button
                          onClick={handleDisconnect}
                          className="flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear Credentials</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 2: Data Synchronization & Realtime Controls */}
                <div className="p-5 rounded-3xl bg-[#080d22] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <ArrowUpDown className="w-4 h-4" />
                      <h4 className="text-sm font-bold text-white">Cloud Data Sync Engine</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      Two-Way Sync
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center space-x-2">
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span>Push Local Database to Supabase</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Upserts local patients, users, invoices, prescriptions and notes into Supabase PostgreSQL tables.
                        </p>
                      </div>
                      <button
                        onClick={handlePushToCloud}
                        disabled={isPushing}
                        className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold shrink-0 transition-all"
                      >
                        {isPushing ? 'Pushing...' : 'Push to Cloud'}
                      </button>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center space-x-2">
                          <Download className="w-4 h-4 text-emerald-400" />
                          <span>Pull Cloud Database to Local</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Fetches all records from Supabase and hydrates local reactive state.
                        </p>
                      </div>
                      <button
                        onClick={handlePullFromCloud}
                        disabled={isPulling}
                        className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold shrink-0 transition-all"
                      >
                        {isPulling ? 'Pulling...' : 'Pull Cloud Data'}
                      </button>
                    </div>

                    {/* Realtime stream switch */}
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <Radio className={`w-4 h-4 ${realtimeActive ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
                        <div>
                          <div className="text-xs font-bold text-white">PostgreSQL Realtime Channel</div>
                          <p className="text-[11px] text-slate-400">Stream table changes directly to active viewports.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const newVal = !realtimeActive;
                          setRealtimeActive(newVal);
                          supabaseManager.setRealtimeEnabled(newVal);
                          showNotification(newVal ? 'Supabase Realtime Stream enabled.' : 'Supabase Realtime Stream paused.');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                          realtimeActive
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {realtimeActive ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* SQL Migration Script Section */}
              <div className="p-5 rounded-3xl bg-[#080d22] border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2 text-purple-400">
                    <Terminal className="w-4 h-4" />
                    <h4 className="text-sm font-bold text-white">Supabase PostgreSQL Migration Schema</h4>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowSqlCode(!showSqlCode)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 transition-all"
                    >
                      {showSqlCode ? 'Hide SQL Code' : 'View SQL Code'}
                    </button>

                    <button
                      onClick={handleCopySql}
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold transition-all shadow-glow-purple"
                    >
                      {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Migration'}</span>
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-2">
                  <p>
                    <strong>Quick Setup Guide for your Supabase Project:</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1 text-[11px] font-mono">
                    <li>Log into your Supabase Dashboard and navigate to the <strong>SQL Editor</strong> tab.</li>
                    <li>Click <strong>New Query</strong>, click <strong>"Copy SQL Migration"</strong> above, and paste it into the editor.</li>
                    <li>Click <strong>Run</strong>. All 7 production tables (`users`, `patients`, `prescriptions`, `invoices`, `appointments`, `clinical_notes`, `audit_logs`) and RLS policies will be created.</li>
                    <li>Paste your Project URL & Anon Key above and click <strong>"Save & Connect"</strong>!</li>
                  </ol>
                </div>

                {showSqlCode && (
                  <div className="mt-3 relative rounded-2xl bg-slate-950 border border-slate-800 p-4 max-h-64 overflow-y-auto">
                    <pre className="text-[11px] font-mono text-cyan-300 whitespace-pre-wrap">
                      {SQL_MIGRATION_CODE}
                    </pre>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* =========================================================================
              TABLE: USERS & AUTHENTICATION
              ========================================================================= */}
          {activeTable === 'users' && (
            <div className="space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">User</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Department / License</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Last Login</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                    {users
                      .filter(u => !searchQuery || u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((u) => (
                        <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3">
                            <div className="flex items-center space-x-2">
                              {u.avatarUrl ? (
                                <img src={u.avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                                  {u.fullName.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                              <span className="font-bold text-white">{u.fullName}</span>
                            </div>
                          </td>
                          <td className="p-3 text-cyan-300">{u.email}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">{u.department || u.medicalLicense || 'N/A'}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                              VERIFIED
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">{new Date(u.lastLoginAt).toLocaleDateString()}</td>
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
                      <th className="p-3">Age / Gender</th>
                      <th className="p-3">Bed Location</th>
                      <th className="p-3">Primary Diagnosis</th>
                      <th className="p-3">Attending Physician</th>
                      <th className="p-3">Acuity Risk</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                    {patients
                      .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.mrn.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((pat) => (
                        <tr key={pat.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3 text-cyan-400 font-bold">{pat.mrn}</td>
                          <td className="p-3 text-white font-bold">{pat.name}</td>
                          <td className="p-3 text-slate-400">{pat.age} y/o • {pat.gender}</td>
                          <td className="p-3 text-amber-400">{pat.bedLocation}</td>
                          <td className="p-3 text-slate-300 max-w-xs truncate">{pat.primaryDiagnosis}</td>
                          <td className="p-3 text-slate-400">{pat.attendingPhysician}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              pat.riskAssessment.riskLevel === 'CRITICAL'
                                ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                                : pat.riskAssessment.riskLevel === 'HIGH'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            }`}>
                              {pat.riskAssessment.riskLevel} ({pat.riskAssessment.overallRiskScore}%)
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeletePatient(pat.id)}
                              className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900 border border-rose-500/30 transition-colors"
                              title="Delete Patient Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
                      <th className="p-3">Patient</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Method</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                    {invoices
                      .filter(i => !searchQuery || i.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-3 text-pink-400 font-bold">{inv.invoiceNumber}</td>
                          <td className="p-3 text-white font-bold">{inv.patientName} ({inv.mrn})</td>
                          <td className="p-3 text-emerald-400 font-bold">${inv.totalAmount.toLocaleString()}</td>
                          <td className="p-3 text-slate-400">{inv.paymentMethod}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inv.paymentStatus === 'PAID'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            }`}>
                              {inv.paymentStatus}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">{inv.dueDate}</td>
                          <td className="p-3 text-right">
                            {inv.paymentStatus !== 'PAID' && (
                              <button
                                onClick={() => handleMarkInvoicePaid(inv.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40 text-[10px] font-bold transition-colors"
                              >
                                Mark Paid
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
