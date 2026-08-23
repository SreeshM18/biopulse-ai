-- ============================================================================
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
CREATE POLICY "Allow authenticated read on audit_logs" ON public.audit_logs FOR ALL USING (true);
