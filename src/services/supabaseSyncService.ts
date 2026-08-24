import { supabaseManager } from './supabaseClient';
import { 
  DbUserAccount, 
  DbBillingInvoice, 
  DbAppointmentRecord, 
  DbClinicalAuditLog 
} from './clinicalDatabaseService';
import { PatientProfile, UserPortalRole } from '../types/biotech';

export interface SyncResult {
  success: boolean;
  message: string;
  syncedCounts: {
    users: number;
    patients: number;
    invoices: number;
    appointments: number;
    auditLogs: number;
    prescriptions: number;
    clinicalNotes: number;
  };
  errors: string[];
  timestamp: string;
}

export interface CloudPatientRow {
  id?: string;
  mrn: string;
  name: string;
  age: number;
  gender: string;
  bed_location: string;
  admission_date?: string;
  primary_diagnosis: string;
  attending_physician: string;
  blood_group?: string;
  allergies?: any;
  chronic_conditions?: any;
  active_vitals: any;
  vitals_history?: any;
  risk_assessment: any;
  emergency_passport: any;
  created_at?: string;
  updated_at?: string;
}

class SupabaseSyncService {
  private activeSubscription: any = null;

  /* =========================================================================
     1. PUSH LOCAL DATABASE TO SUPABASE CLOUD (UPSERT)
     ========================================================================= */
  public async pushAllToCloud(data: {
    users: DbUserAccount[];
    patients: PatientProfile[];
    invoices: DbBillingInvoice[];
    appointments: DbAppointmentRecord[];
    auditLogs: DbClinicalAuditLog[];
  }): Promise<SyncResult> {
    const client = supabaseManager.getClient();
    const result: SyncResult = {
      success: false,
      message: '',
      syncedCounts: {
        users: 0,
        patients: 0,
        invoices: 0,
        appointments: 0,
        auditLogs: 0,
        prescriptions: 0,
        clinicalNotes: 0
      },
      errors: [],
      timestamp: new Date().toISOString()
    };

    if (!client) {
      result.message = 'Supabase is not configured. Please set your Supabase URL and Key.';
      result.errors.push('Missing Supabase credentials');
      return result;
    }

    try {
      // 1. Upsert Users
      if (data.users && data.users.length > 0) {
        const userRows = data.users.map(u => ({
          email: u.email,
          phone: u.phone,
          full_name: u.fullName,
          password_hash: u.passwordHash,
          role: u.role,
          medical_license: u.medicalLicense || null,
          department: u.department || null,
          avatar_url: u.avatarUrl || null,
          is_verified: u.isVerified,
          otp_secret: u.otpSecret || '749210',
          last_login_at: u.lastLoginAt || new Date().toISOString()
        }));

        const { error: userErr } = await client
          .from('users')
          .upsert(userRows, { onConflict: 'email' });

        if (userErr) {
          result.errors.push(`Users sync error: ${userErr.message}`);
        } else {
          result.syncedCounts.users = data.users.length;
        }
      }

      // 2. Upsert Patients
      if (data.patients && data.patients.length > 0) {
        const patientRows: CloudPatientRow[] = data.patients.map(p => ({
          mrn: p.mrn,
          name: p.name,
          age: p.age,
          gender: p.gender,
          bed_location: p.bedLocation,
          admission_date: p.admissionDate || new Date().toISOString(),
          primary_diagnosis: p.primaryDiagnosis,
          attending_physician: p.attendingPhysician,
          blood_group: p.emergencyPassport?.bloodGroup || 'O+',
          allergies: p.emergencyPassport?.criticalAllergies || [],
          chronic_conditions: p.emergencyPassport?.chronicConditions || [],
          active_vitals: p.vitals,
          vitals_history: p.vitalsHistory || [],
          risk_assessment: p.riskAssessment,
          emergency_passport: p.emergencyPassport,
          updated_at: new Date().toISOString()
        }));

        const { error: patErr } = await client
          .from('patients')
          .upsert(patientRows, { onConflict: 'mrn' });

        if (patErr) {
          result.errors.push(`Patients sync error: ${patErr.message}`);
        } else {
          result.syncedCounts.patients = data.patients.length;
        }

        // Also sync prescriptions and clinical notes
        for (const patient of data.patients) {
          if (patient.emergencyPassport?.prescriptions?.length) {
            const rxRows = patient.emergencyPassport.prescriptions.map(rx => ({
              patient_name: patient.name,
              drug_name: rx.drugName,
              dosage_form: 'Oral Tablet',
              strength: rx.dosage,
              route: 'Oral',
              frequency: rx.frequency,
              prescribing_doctor: rx.prescribingDoctor,
              prescribed_hospital: rx.prescribedHospital,
              prescribed_date: rx.prescribedDate ? rx.prescribedDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
              status: rx.status,
              adherence_rate: rx.adherenceRate || 95,
              digital_signature: rx.digitalSignature,
              refill_due_days: rx.refillDueDays || 30
            }));

            const { error: rxErr } = await client.from('prescriptions').insert(rxRows);
            if (!rxErr) {
              result.syncedCounts.prescriptions += rxRows.length;
            }
          }

          if (patient.clinicalNotes?.length) {
            const noteRows = patient.clinicalNotes.map(n => ({
              timestamp: n.timestamp,
              author: n.author,
              note_type: n.noteType,
              subjective: n.subjective,
              objective: n.objective,
              assessment: n.assessment,
              plan: n.plan,
              physician_signature: `${n.author} (Digital SHA-256)`
            }));

            const { error: noteErr } = await client.from('clinical_notes').insert(noteRows);
            if (!noteErr) {
              result.syncedCounts.clinicalNotes += noteRows.length;
            }
          }
        }
      }

      // 3. Upsert Invoices
      if (data.invoices && data.invoices.length > 0) {
        const invRows = data.invoices.map(inv => ({
          patient_name: inv.patientName,
          mrn: inv.mrn,
          invoice_number: inv.invoiceNumber,
          invoice_date: inv.invoiceDate,
          due_date: inv.dueDate,
          total_amount: inv.totalAmount,
          currency: inv.currency,
          payment_status: inv.paymentStatus,
          payment_method: inv.paymentMethod,
          transaction_hash: inv.transactionHash || null,
          insurance_policy_number: inv.insurancePolicyNumber || null,
          insurance_claim_status: inv.insuranceClaimStatus || null,
          itemized_charges: inv.itemizedCharges
        }));

        const { error: invErr } = await client
          .from('invoices')
          .upsert(invRows, { onConflict: 'invoice_number' });

        if (invErr) {
          result.errors.push(`Invoices sync error: ${invErr.message}`);
        } else {
          result.syncedCounts.invoices = data.invoices.length;
        }
      }

      // 4. Upsert Appointments
      if (data.appointments && data.appointments.length > 0) {
        const aptRows = data.appointments.map(apt => ({
          patient_name: apt.patientName,
          mrn: apt.mrn,
          doctor_name: apt.doctorName,
          department: apt.department,
          date_time: apt.dateTime,
          duration_minutes: apt.durationMinutes,
          appointment_type: apt.appointmentType,
          status: apt.status,
          chief_complaint: apt.chiefComplaint,
          room_or_bed_location: apt.roomOrBedLocation
        }));

        const { error: aptErr } = await client
          .from('appointments')
          .insert(aptRows);

        if (aptErr) {
          result.errors.push(`Appointments sync error: ${aptErr.message}`);
        } else {
          result.syncedCounts.appointments = data.appointments.length;
        }
      }

      // 5. Upsert Audit Logs
      if (data.auditLogs && data.auditLogs.length > 0) {
        const logRows = data.auditLogs.slice(0, 50).map(l => ({
          timestamp: l.timestamp,
          user_id: l.userId,
          user_name: l.userName,
          user_role: l.userRole,
          action: l.action,
          details: l.details,
          ip_address: l.ipAddress || '127.0.0.1'
        }));

        const { error: logErr } = await client
          .from('audit_logs')
          .insert(logRows);

        if (logErr) {
          result.errors.push(`Audit logs sync error: ${logErr.message}`);
        } else {
          result.syncedCounts.auditLogs = logRows.length;
        }
      }

      result.success = result.errors.length === 0;
      result.message = result.success
        ? `Successfully pushed all local database records to Supabase Cloud!`
        : `Synced with partial notices: ${result.errors.join('; ')}`;

      return result;
    } catch (err: any) {
      result.success = false;
      result.message = `Sync failed: ${err.message || 'Unknown network error'}`;
      result.errors.push(err.message);
      return result;
    }
  }

  /* =========================================================================
     2. PULL FROM SUPABASE CLOUD TO HYDRATE LOCAL DATABASE
     ========================================================================= */
  public async pullAllFromCloud(): Promise<{
    success: boolean;
    message: string;
    data?: {
      users: DbUserAccount[];
      patients: PatientProfile[];
      invoices: DbBillingInvoice[];
      appointments: DbAppointmentRecord[];
      auditLogs: DbClinicalAuditLog[];
    };
    error?: string;
  }> {
    const client = supabaseManager.getClient();
    if (!client) {
      return {
        success: false,
        message: 'Supabase is not configured. Please enter your Supabase URL and Key.'
      };
    }

    try {
      const [usersRes, patientsRes, invRes, aptRes, logsRes] = await Promise.all([
        client.from('users').select('*').limit(100),
        client.from('patients').select('*').limit(100),
        client.from('invoices').select('*').limit(100),
        client.from('appointments').select('*').limit(100),
        client.from('audit_logs').select('*').order('timestamp', { ascending: false }).limit(100)
      ]);

      const users: DbUserAccount[] = (usersRes.data || []).map((row: any) => ({
        id: row.id,
        email: row.email,
        phone: row.phone || '',
        fullName: row.full_name || row.email,
        passwordHash: row.password_hash || 'BioPulse2026!',
        role: row.role as UserPortalRole,
        medicalLicense: row.medical_license || undefined,
        department: row.department || undefined,
        avatarUrl: row.avatar_url || undefined,
        createdAt: row.created_at || new Date().toISOString(),
        lastLoginAt: row.last_login_at || new Date().toISOString(),
        isVerified: row.is_verified ?? true,
        otpSecret: row.otp_secret || '749210'
      }));

      const patients: PatientProfile[] = (patientsRes.data || []).map((row: any) => ({
        id: row.id,
        mrn: row.mrn,
        name: row.name,
        age: row.age,
        gender: row.gender,
        bedLocation: row.bed_location,
        admissionDate: row.admission_date,
        primaryDiagnosis: row.primary_diagnosis,
        attendingPhysician: row.attending_physician,
        vitals: row.active_vitals || {
          heartRate: 75,
          spo2: 98,
          respiratoryRate: 16,
          temperature: 37.0,
          systolicBp: 120,
          diastolicBp: 80,
          news2Score: 0,
          lastUpdated: new Date().toISOString()
        },
        vitalsHistory: row.vitals_history || [],
        riskAssessment: row.risk_assessment || {
          overallRiskScore: 12,
          riskLevel: 'LOW',
          primaryRiskDiagnosis: row.primary_diagnosis,
          contributingFactors: [],
          counterfactualPrediction: []
        },
        emergencyPassport: row.emergency_passport || {
          passportId: `PASS-${row.mrn}`,
          bloodGroup: row.blood_group || 'O+',
          criticalAllergies: row.allergies || [],
          chronicConditions: row.chronic_conditions || [],
          activeMedications: [],
          emergencyContact: { name: 'Emergency Contact', relation: 'Family', phone: '+1-555-0100' },
          organDonorStatus: true,
          resuscitationDNR: false,
          qrCodeValue: `BIOPULSE-EMERGENCY-${row.mrn}`,
          prescriptions: [],
          consentLogs: []
        },
        clinicalNotes: []
      }));

      const invoices: DbBillingInvoice[] = (invRes.data || []).map((row: any) => ({
        id: row.id,
        patientId: row.patient_id || '',
        patientName: row.patient_name,
        mrn: row.mrn,
        invoiceNumber: row.invoice_number,
        invoiceDate: row.invoice_date,
        dueDate: row.due_date,
        totalAmount: Number(row.total_amount),
        currency: row.currency || 'USD',
        paymentStatus: row.payment_status,
        paymentMethod: row.payment_method,
        transactionHash: row.transaction_hash || undefined,
        insurancePolicyNumber: row.insurance_policy_number || undefined,
        insuranceClaimStatus: row.insurance_claim_status || undefined,
        itemizedCharges: row.itemized_charges || []
      }));

      const appointments: DbAppointmentRecord[] = (aptRes.data || []).map((row: any) => ({
        id: row.id,
        patientId: row.patient_id || '',
        patientName: row.patient_name,
        mrn: row.mrn,
        doctorId: row.doctor_id || '',
        doctorName: row.doctor_name,
        department: row.department,
        dateTime: row.date_time,
        durationMinutes: row.duration_minutes || 30,
        appointmentType: row.appointment_type,
        status: row.status,
        chiefComplaint: row.chief_complaint || '',
        roomOrBedLocation: row.room_or_bed_location || ''
      }));

      const auditLogs: DbClinicalAuditLog[] = (logsRes.data || []).map((row: any) => ({
        id: row.id,
        timestamp: row.timestamp,
        userId: row.user_id,
        userName: row.user_name,
        userRole: row.user_role,
        action: row.action,
        details: row.details,
        ipAddress: row.ip_address || '127.0.0.1'
      }));

      return {
        success: true,
        message: `Successfully pulled ${patients.length} patients, ${users.length} users, ${invoices.length} invoices, and ${appointments.length} appointments from Supabase!`,
        data: {
          users,
          patients,
          invoices,
          appointments,
          auditLogs
        }
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Error pulling from Supabase: ${err.message}`,
        error: err.message
      };
    }
  }

  /* =========================================================================
     3. REALTIME POSTGRESQL SUBSCRIPTION
     ========================================================================= */
  public subscribeToRealtimeChanges(onChange: (table: string, eventType: string, payload: any) => void): () => void {
    const client = supabaseManager.getClient();
    if (!client || !supabaseManager.isRealtimeEnabled()) {
      return () => {};
    }

    try {
      if (this.activeSubscription) {
        this.activeSubscription.unsubscribe();
      }

      this.activeSubscription = client
        .channel('biopulse-cloud-realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'patients' }, (payload) => {
          onChange('patients', payload.eventType, payload.new);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'invoices' }, (payload) => {
          onChange('invoices', payload.eventType, payload.new);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, (payload) => {
          onChange('appointments', payload.eventType, payload.new);
        })
        .subscribe();

      return () => {
        if (this.activeSubscription) {
          this.activeSubscription.unsubscribe();
          this.activeSubscription = null;
        }
      };
    } catch (err) {
      console.warn('Realtime subscription error:', err);
      return () => {};
    }
  }

  /* =========================================================================
     4. SUPABASE AUTH WRAPPERS
     ========================================================================= */
  public async signUpWithSupabase(email: string, passwordPlain: string, fullName: string, role: UserPortalRole) {
    const client = supabaseManager.getClient();
    if (!client) {
      return { success: false, message: 'Supabase client not configured.' };
    }

    try {
      const { data, error } = await client.auth.signUp({
        email,
        password: passwordPlain,
        options: {
          data: {
            full_name: fullName,
            role
          }
        }
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { 
        success: true, 
        user: data.user, 
        session: data.session, 
        message: 'Supabase account created! Please check email or continue to verification.' 
      };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }

  public async signInWithSupabase(email: string, passwordPlain: string) {
    const client = supabaseManager.getClient();
    if (!client) {
      return { success: false, message: 'Supabase client not configured.' };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password: passwordPlain
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { 
        success: true, 
        user: data.user, 
        session: data.session, 
        message: 'Successfully authenticated with Supabase Cloud Auth!' 
      };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }

  public async signOutSupabase() {
    const client = supabaseManager.getClient();
    if (!client) return;
    try {
      await client.auth.signOut();
    } catch {}
  }
}

export const supabaseSync = new SupabaseSyncService();
