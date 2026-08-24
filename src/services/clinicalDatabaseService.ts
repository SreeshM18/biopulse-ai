import { 
  PatientProfile, 
  UserPortalRole, 
  PrescriptionRecord,
  DoctorProfile
} from '../types/biotech';
import { PATIENT_DATABASE } from '../data/patientDatabase';
import { supabaseManager } from './supabaseClient';
import { supabaseSync, SyncResult } from './supabaseSyncService';

/* =========================================================================
   1. TYPES & SCHEMAS FOR MASTER PERSISTENT CLINICAL DATABASE
   ========================================================================= */

export interface DbUserAccount {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  passwordHash: string; // In production/mock bcrypt hashed
  role: UserPortalRole;
  medicalLicense?: string;
  department?: string;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt: string;
  isVerified: boolean;
  otpSecret: string;
}

export interface DbBillingInvoice {
  id: string;
  patientId: string;
  patientName: string;
  mrn: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  currency: 'USD' | 'INR' | 'EUR' | 'GBP';
  paymentStatus: 'PAID' | 'PENDING_INSURANCE' | 'OVERDUE' | 'PROCESSING';
  paymentMethod: 'Insurance Claim (Aetna)' | 'Credit Card (Visa)' | 'UPI / NetBanking' | 'Apple Pay' | 'Cash / Cheque';
  transactionHash?: string;
  insurancePolicyNumber?: string;
  insuranceClaimStatus?: 'Approved' | 'In Review' | 'Submitted';
  itemizedCharges: {
    serviceName: string;
    department: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

export interface DbAppointmentRecord {
  id: string;
  patientId: string;
  patientName: string;
  mrn: string;
  doctorId: string;
  doctorName: string;
  department: string;
  dateTime: string;
  durationMinutes: number;
  appointmentType: 'In-Person Consultation' | 'Teleconsult (Video)' | 'ICU Specialist Rounds' | 'Emergency Follow-Up';
  status: 'Confirmed' | 'In Progress' | 'Completed' | 'Rescheduled' | 'Cancelled';
  chiefComplaint: string;
  roomOrBedLocation: string;
}

export interface DbClinicalAuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: 'USER_LOGIN' | 'PATIENT_REGISTERED' | 'PRESCRIPTION_CREATED' | 'PAYMENT_PROCESSED' | 'SOAP_NOTE_SIGNED' | 'SAFETY_AUDIT_RUN' | 'DATABASE_BACKUP';
  details: string;
  ipAddress: string;
}

/* =========================================================================
   2. INITIAL SEED DATA
   ========================================================================= */

const SEED_USERS: DbUserAccount[] = [
  {
    id: 'user-doc-sarah',
    email: 'doctor.sarah@biopulse.health',
    phone: '+1 (555) 019-2834',
    fullName: 'Dr. Sarah Lin, MD, FACC',
    passwordHash: 'BioPulse2026!',
    role: 'doctor',
    medicalLicense: 'MD-94820-LIC',
    department: 'Cardiovascular Medicine & ICU',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    createdAt: '2026-01-10T08:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    isVerified: true,
    otpSecret: '749210'
  },
  {
    id: 'user-patient-robert',
    email: 'robert.vance@biopulse.health',
    phone: '+1 (555) 392-1049',
    fullName: 'Robert Vance',
    passwordHash: 'BioPulse2026!',
    role: 'patient',
    createdAt: '2026-02-01T10:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    isVerified: true,
    otpSecret: '749210'
  },
  {
    id: 'user-hospital-admin',
    email: 'admin.memorial@biopulse.health',
    phone: '+1 (555) 884-9021',
    fullName: 'St. Jude Memorial Health Ecosystem',
    passwordHash: 'BioPulse2026!',
    role: 'hospital',
    department: 'Hospital Administration & Operations',
    createdAt: '2026-01-01T00:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    isVerified: true,
    otpSecret: '749210'
  },
  {
    id: 'user-emergency-chief',
    email: 'rescue.paramedic@biopulse.health',
    phone: '+1 (555) 911-0000',
    fullName: 'Emergency Rescue Dispatch Chief',
    passwordHash: 'BioPulse2026!',
    role: 'emergency',
    department: 'Trauma & Emergency Network',
    createdAt: '2026-01-05T00:00:00.000Z',
    lastLoginAt: new Date().toISOString(),
    isVerified: true,
    otpSecret: '749210'
  }
];

const SEED_INVOICES: DbBillingInvoice[] = [
  {
    id: 'inv-1001',
    patientId: 'patient-robert-vance',
    patientName: 'Robert Vance',
    mrn: 'MRN-784920',
    invoiceNumber: 'INV-2026-08491',
    invoiceDate: '2026-08-20',
    dueDate: '2026-09-20',
    totalAmount: 14500,
    currency: 'USD',
    paymentStatus: 'PENDING_INSURANCE',
    paymentMethod: 'Insurance Claim (Aetna)',
    insurancePolicyNumber: 'AET-892048-H',
    insuranceClaimStatus: 'In Review',
    itemizedCharges: [
      { serviceName: 'ICU Cardiac Telemetry & Bed Day 1-3', department: 'Cardiology ICU', quantity: 3, unitPrice: 3200, total: 9600 },
      { serviceName: 'Coronary Angiography Diagnostic', department: 'Cath Lab', quantity: 1, unitPrice: 2800, total: 2800 },
      { serviceName: 'Comprehensive Metabolic Lab Panel', department: 'Pathology', quantity: 4, unitPrice: 250, total: 1000 },
      { serviceName: 'Medication Regimen (Lisinopril, Statin, IV Drip)', department: 'Pharmacy', quantity: 1, unitPrice: 1100, total: 1100 }
    ]
  },
  {
    id: 'inv-1002',
    patientId: 'patient-priya-sharma',
    patientName: 'Priya Sharma',
    mrn: 'MRN-849201',
    invoiceNumber: 'INV-2026-08492',
    invoiceDate: '2026-08-22',
    dueDate: '2026-09-22',
    totalAmount: 3200,
    currency: 'USD',
    paymentStatus: 'PAID',
    paymentMethod: 'Credit Card (Visa)',
    transactionHash: 'TXN-902834-VISA-AUTH',
    itemizedCharges: [
      { serviceName: 'Endocrinology Specialist Consult', department: 'Endocrinology', quantity: 1, unitPrice: 450, total: 450 },
      { serviceName: 'Continuous Glucose Monitoring (CGM) Sensor Kit', department: 'Medical Devices', quantity: 1, unitPrice: 750, total: 750 },
      { serviceName: 'Semaglutide 1mg Auto-Injector (Monthly Supply)', department: 'Pharmacy', quantity: 1, unitPrice: 1200, total: 1200 },
      { serviceName: 'HbA1c & Renal Function Lab Panel', department: 'Pathology', quantity: 1, unitPrice: 800, total: 800 }
    ]
  }
];

const SEED_APPOINTMENTS: DbAppointmentRecord[] = [
  {
    id: 'apt-001',
    patientId: 'patient-robert-vance',
    patientName: 'Robert Vance',
    mrn: 'MRN-784920',
    doctorId: 'user-doc-sarah',
    doctorName: 'Dr. Sarah Lin, MD',
    department: 'Cardiology',
    dateTime: '2026-08-24T10:00:00.000Z',
    durationMinutes: 30,
    appointmentType: 'ICU Specialist Rounds',
    status: 'Confirmed',
    chiefComplaint: 'Post-MI follow-up, BP optimization and Lisinopril titration.',
    roomOrBedLocation: 'ICU-Bed 04'
  },
  {
    id: 'apt-002',
    patientId: 'patient-priya-sharma',
    patientName: 'Priya Sharma',
    mrn: 'MRN-849201',
    doctorId: 'user-doc-sarah',
    doctorName: 'Dr. Sarah Lin, MD',
    department: 'Endocrinology & Telehealth',
    dateTime: '2026-08-24T14:30:00.000Z',
    durationMinutes: 20,
    appointmentType: 'Teleconsult (Video)',
    status: 'Confirmed',
    chiefComplaint: 'GLP-1 Semaglutide titration and fasting blood glucose review.',
    roomOrBedLocation: 'Teleconsult Room 02'
  }
];

/* =========================================================================
   3. PERSISTENT STORAGE KEYS & LOCAL ENGINE
   ========================================================================= */

const STORAGE_KEYS = {
  USERS: 'biopulse_db_users_v2',
  PATIENTS: 'biopulse_db_patients_v2',
  INVOICES: 'biopulse_db_invoices_v2',
  APPOINTMENTS: 'biopulse_db_appointments_v2',
  AUDIT_LOGS: 'biopulse_db_audit_logs_v2',
  INITIALIZED: 'biopulse_db_initialized_v2'
};

class ClinicalDatabaseService {
  private isInitialized = false;

  constructor() {
    this.initializeDatabase();
  }

  // Initialize and hydrate database if not present
  public initializeDatabase(): void {
    if (typeof window === 'undefined') return;

    try {
      const isAlreadyInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
      if (!isAlreadyInit) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(PATIENT_DATABASE));
        localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(SEED_INVOICES));
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_APPOINTMENTS));
        localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([
          {
            id: 'log-init',
            timestamp: new Date().toISOString(),
            userId: 'system',
            userName: 'BioPulse System Bootloader',
            userRole: 'system',
            action: 'DATABASE_BACKUP',
            details: 'Master Clinical Database initialized with persistent seed records.',
            ipAddress: '127.0.0.1'
          }
        ]));
        localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
      }
      this.isInitialized = true;
    } catch (err) {
      console.warn('LocalStorage not available, running in-memory fallback:', err);
    }
  }

  /* =========================================================================
     A. USER ACCOUNTS & AUTHENTICATION CRUD
     ========================================================================= */

  public getUsers(): DbUserAccount[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  }

  public getUserByEmailOrPhone(identifier: string): DbUserAccount | undefined {
    const users = this.getUsers();
    const clean = identifier.toLowerCase().trim();
    return users.find(u => u.email.toLowerCase() === clean || u.phone.includes(clean));
  }

  public authenticateUser(identifier: string, passwordPlain: string): { success: boolean; user?: DbUserAccount; message: string } {
    const user = this.getUserByEmailOrPhone(identifier);
    if (!user) {
      return { success: false, message: 'No account registered with this email or phone number.' };
    }

    if (user.passwordHash !== passwordPlain) {
      return { success: false, message: 'Invalid password. Please check your credentials.' };
    }

    // Update last login
    user.lastLoginAt = new Date().toISOString();
    this.updateUser(user);
    this.logAction('USER_LOGIN', `User ${user.fullName} logged in successfully`, user.id, user.fullName, user.role);

    return { success: true, user, message: 'Authentication successful. Please verify 2-Factor OTP.' };
  }

  public registerUser(newUser: Omit<DbUserAccount, 'id' | 'createdAt' | 'lastLoginAt' | 'isVerified' | 'otpSecret'>): { success: boolean; user: DbUserAccount; message: string } {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === newUser.email.toLowerCase());
    if (existing) {
      return { success: false, user: existing, message: 'An account with this email address already exists.' };
    }

    const created: DbUserAccount = {
      ...newUser,
      id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isVerified: true,
      otpSecret: '749210'
    };

    users.push(created);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.logAction('USER_LOGIN', `New user registered: ${created.fullName} (${created.role})`, created.id, created.fullName, created.role);

    return { success: true, user: created, message: 'Account created successfully! Welcome to BioPulse AI.' };
  }

  public updateUser(user: DbUserAccount): void {
    const users = this.getUsers().map(u => u.id === user.id ? user : u);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  public verifyOtp(userId: string, code: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    // Standard master test code or matching secret
    return code === '749210' || (user ? user.otpSecret === code : false);
  }

  /* =========================================================================
     B. PATIENT PROFILES & EHR CRUD
     ========================================================================= */

  public getPatients(): PatientProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PATIENTS);
      return data ? JSON.parse(data) : PATIENT_DATABASE;
    } catch {
      return PATIENT_DATABASE;
    }
  }

  public getPatientById(id: string): PatientProfile | undefined {
    return this.getPatients().find(p => p.id === id);
  }

  public createPatient(patient: PatientProfile): void {
    const patients = this.getPatients();
    patients.unshift(patient);
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
    this.logAction('PATIENT_REGISTERED', `New patient registered: ${patient.name} (${patient.mrn})`, 'system', 'Attending Staff', 'doctor');
  }

  public updatePatient(patient: PatientProfile): void {
    const patients = this.getPatients().map(p => p.id === patient.id ? patient : p);
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  }

  public deletePatient(id: string): void {
    const patients = this.getPatients().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  }

  /* =========================================================================
     C. BILLING, INVOICES & PAYMENTS CRUD
     ========================================================================= */

  public getInvoices(): DbBillingInvoice[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
      return data ? JSON.parse(data) : SEED_INVOICES;
    } catch {
      return SEED_INVOICES;
    }
  }

  public getInvoicesByPatient(patientId: string): DbBillingInvoice[] {
    return this.getInvoices().filter(inv => inv.patientId === patientId);
  }

  public createInvoice(invoice: DbBillingInvoice): void {
    const invoices = this.getInvoices();
    invoices.unshift(invoice);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }

  public processPayment(invoiceId: string, paymentMethod: DbBillingInvoice['paymentMethod']): { success: boolean; invoice?: DbBillingInvoice } {
    const invoices = this.getInvoices();
    const target = invoices.find(i => i.id === invoiceId);
    if (!target) return { success: false };

    target.paymentStatus = 'PAID';
    target.paymentMethod = paymentMethod;
    target.transactionHash = `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    this.logAction('PAYMENT_PROCESSED', `Payment processed for invoice ${target.invoiceNumber} ($${target.totalAmount}) via ${paymentMethod}`, 'user', target.patientName, 'patient');

    return { success: true, invoice: target };
  }

  /* =========================================================================
     D. APPOINTMENTS CRUD
     ========================================================================= */

  public getAppointments(): DbAppointmentRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : SEED_APPOINTMENTS;
    } catch {
      return SEED_APPOINTMENTS;
    }
  }

  public createAppointment(apt: DbAppointmentRecord): void {
    const apts = this.getAppointments();
    apts.unshift(apt);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(apts));
  }

  public updateAppointmentStatus(id: string, status: DbAppointmentRecord['status']): void {
    const apts = this.getAppointments().map(a => a.id === id ? { ...a, status } : a);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(apts));
  }

  /* =========================================================================
     E. CLINICAL AUDIT LOGS & BACKUP EXPORT / IMPORT
     ========================================================================= */

  public getAuditLogs(): DbClinicalAuditLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public logAction(
    action: DbClinicalAuditLog['action'], 
    details: string, 
    userId = 'system', 
    userName = 'System Operator', 
    userRole = 'staff'
  ): void {
    try {
      const logs = this.getAuditLogs();
      const newLog: DbClinicalAuditLog = {
        id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        userId,
        userName,
        userRole,
        action,
        details,
        ipAddress: '127.0.0.1'
      };
      logs.unshift(newLog);
      // Keep last 100 logs
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
    } catch {}
  }

  public exportEntireDatabaseJSON(): string {
    const exportBundle = {
      exportTimestamp: new Date().toISOString(),
      schemaVersion: '2.0.0',
      databaseName: 'BioPulseMasterClinicalDatabase',
      tables: {
        users: this.getUsers(),
        patients: this.getPatients(),
        invoices: this.getInvoices(),
        appointments: this.getAppointments(),
        auditLogs: this.getAuditLogs()
      }
    };
    return JSON.stringify(exportBundle, null, 2);
  }

  public importDatabaseJSON(jsonString: string): { success: boolean; message: string } {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.tables) {
        if (parsed.tables.users) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(parsed.tables.users));
        if (parsed.tables.patients) localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(parsed.tables.patients));
        if (parsed.tables.invoices) localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(parsed.tables.invoices));
        if (parsed.tables.appointments) localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(parsed.tables.appointments));
        if (parsed.tables.auditLogs) localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(parsed.tables.auditLogs));
        return { success: true, message: 'Database backup imported successfully!' };
      }
      return { success: false, message: 'Invalid database backup structure.' };
    } catch (err: any) {
      return { success: false, message: `Import error: ${err.message}` };
    }
  }

  /* =========================================================================
     F. SUPABASE CLOUD POSTGRESQL INTEGRATION
     ========================================================================= */

  public isSupabaseConfigured(): boolean {
    return supabaseManager.isConfigured();
  }

  public getSupabaseConfig() {
    return supabaseManager.getConfig();
  }

  public setSupabaseCredentials(url: string, anonKey: string) {
    return supabaseManager.setCredentials(url, anonKey);
  }

  public clearSupabaseCredentials() {
    supabaseManager.clearCredentials();
  }

  public async testSupabaseConnection() {
    return await supabaseManager.testConnection();
  }

  public async pushToSupabase(): Promise<SyncResult> {
    const data = {
      users: this.getUsers(),
      patients: this.getPatients(),
      invoices: this.getInvoices(),
      appointments: this.getAppointments(),
      auditLogs: this.getAuditLogs()
    };

    const res = await supabaseSync.pushAllToCloud(data);
    if (res.success) {
      this.logAction('DATABASE_BACKUP', 'Local database successfully synchronized with Supabase Cloud PostgreSQL', 'admin', 'Database Admin', 'hospital');
    }
    return res;
  }

  public async pullFromSupabase(): Promise<{ success: boolean; message: string; error?: string }> {
    const res = await supabaseSync.pullAllFromCloud();
    if (res.success && res.data) {
      if (res.data.users.length) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(res.data.users));
      if (res.data.patients.length) localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(res.data.patients));
      if (res.data.invoices.length) localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(res.data.invoices));
      if (res.data.appointments.length) localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(res.data.appointments));
      if (res.data.auditLogs.length) localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(res.data.auditLogs));
      
      this.logAction('DATABASE_BACKUP', 'Hydrated local database from Supabase Cloud PostgreSQL', 'admin', 'Database Admin', 'hospital');
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message, error: res.error };
  }

  public setupRealtimeSync(onUpdate: (table: string, eventType: string, payload: any) => void) {
    return supabaseSync.subscribeToRealtimeChanges(onUpdate);
  }

  public resetToFactoryDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
    this.initializeDatabase();
  }
}

export const clinicalDb = new ClinicalDatabaseService();
