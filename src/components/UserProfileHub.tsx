import React, { useState } from 'react';
import { 
  User, 
  Stethoscope, 
  Ambulance, 
  Building2, 
  ShieldCheck, 
  QrCode, 
  Heart, 
  Activity, 
  Pill, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  Save, 
  Clock, 
  ShieldAlert, 
  Database, 
  Radio, 
  Zap, 
  BedDouble, 
  DollarSign, 
  Users, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { 
  UserPortalRole, 
  AuthenticatedUser, 
  PatientProfile, 
  TabType 
} from '../types/biotech';
import { clinicalDb } from '../services/clinicalDatabaseService';

interface UserProfileHubProps {
  currentUser: AuthenticatedUser | null;
  activeRole: UserPortalRole;
  setActiveRole: (role: UserPortalRole) => void;
  patient?: PatientProfile;
  setActiveTab?: (tab: TabType) => void;
  onOpenDatabase?: () => void;
  onOpenRegister?: () => void;
}

export const UserProfileHub: React.FC<UserProfileHubProps> = ({
  currentUser,
  activeRole,
  setActiveRole,
  patient,
  setActiveTab,
  onOpenDatabase,
  onOpenRegister
}) => {
  const [selectedRoleView, setSelectedRoleView] = useState<UserPortalRole>(activeRole);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Form State for Editable Fields
  const [doctorState, setDoctorState] = useState({
    name: 'Dr. Sarah Lin, MD, FACC',
    specialty: 'Interventional Cardiology & Critical Care',
    department: 'Cardiology & Cardiovascular Surgery',
    licenseNumber: 'MD-94820-LIC-NY',
    npi: '1948204918',
    hospitalAffiliation: 'St. Jude Memorial Health Ecosystem',
    email: 'sarah.lin.md@biopulse.org',
    phone: '+1 (555) 234-5678',
    officeLocation: 'Tower A, Suite 402 - Heart Center',
    consultationHours: 'Mon - Thu: 08:00 - 16:00 | Fri: ICU Rounds',
    bio: 'Board-certified interventional cardiologist specializing in acute coronary syndromes, transcatheter aortic valve replacement (TAVR), and critical care hemodynamics.'
  });

  const [patientState, setPatientState] = useState({
    name: patient?.name || 'Robert Vance',
    age: patient?.age || 58,
    gender: patient?.gender || 'Male',
    bloodType: patient?.emergencyPassport?.bloodGroup || 'O Positive (O+)',
    mrn: patient?.mrn || 'MRN-784920',
    abhaId: '91-8204-9182-3841',
    organDonor: 'Registered Organ Donor (YES)',
    email: 'robert.vance@gmail.com',
    phone: '+1 (555) 839-2041',
    address: '742 Evergreen Terrace, Springfield, OR',
    emergencyContactName: 'Emily Vance (Wife)',
    emergencyContactPhone: '+1 (555) 839-2042',
    insuranceProvider: 'BlueCross BlueShield Premier Gold',
    insurancePolicyNumber: 'BCBS-918204-A',
    insuranceGroup: 'GRP-TECH-8821'
  });

  const [emergencyState, setEmergencyState] = useState({
    name: 'Paramedic Alex Morgan, NRP, FP-C',
    title: 'Rescue Field Operations Chief',
    registryNumber: 'NREMT-P-902148',
    unitId: 'MEDIC-04 Rapid Trauma Unit',
    dispatchBase: 'District 4 Metro Rescue Station',
    radioFrequency: 'VHF-MED-12 (155.340 MHz)',
    email: 'alex.morgan.emt@biopulse-rescue.gov',
    phone: '+1 (555) 911-0404',
    stationAddress: '400 Emergency Way, Downtown Sector',
    shiftSchedule: 'Shift A (06:00 - 18:00) • Active On-Duty'
  });

  const [hospitalState, setHospitalState] = useState({
    name: 'St. Jude Memorial Health & Research Center',
    accreditation: 'JCI & NABH A++ Gold Standard',
    facilityId: 'HOSP-NY-84920',
    directorName: 'Dr. Michael Chang, Chief Medical Officer',
    address: '100 Medical Plaza, New York, NY 10021',
    phone: '+1 (555) 700-1000',
    erDirectHotline: '+1 (555) 700-9111',
    totalBeds: 150,
    activeIcuBeds: '14 / 16 (87.5% Occupancy)',
    pacsDicomStatus: 'Cloud Sync Online (v4.2)',
    pharmacyColdChainStatus: '4 Units Optimal (2.8°C)'
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    setSaveSuccessMsg('Profile updated and committed to master clinical database!');
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleSwitchActivePortal = (role: UserPortalRole) => {
    setSelectedRoleView(role);
    setActiveRole(role);
  };

  return (
    <div className="w-full flex flex-col space-y-6 text-slate-100 animate-fade-in print:text-black">
      
      {/* 1. Header Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060f26] via-[#091a4a] to-[#060f26] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
                <User className="w-6 h-6 animate-pulse" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                BIOPULSE AI • 4-PERSONA CLINICAL PROFILE HUB
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Clinical Identity & Role Profiles
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              Unified digital identity records across all 4 healthcare roles: <strong className="text-cyan-300">Doctor</strong>, <strong className="text-emerald-300">Patient EHR</strong>, <strong className="text-rose-400">Emergency SOS Paramedic</strong>, and <strong className="text-purple-300">Hospital Ecosystem Administrator</strong>.
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenDatabase && (
              <button
                onClick={onOpenDatabase}
                className="px-4 py-2.5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 font-bold text-xs flex items-center space-x-1.5 shadow-glow-cyan transition-all"
              >
                <Database className="w-4 h-4" />
                <span>Database Studio</span>
              </button>
            )}

            <button
              onClick={() => {
                if (isEditing) handleSaveProfile();
                else setIsEditing(true);
              }}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-glow-cyan ${
                isEditing
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black'
              }`}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccessMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold flex items-center space-x-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* 2. 4-Persona Tab Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            role: 'doctor' as UserPortalRole,
            title: '1. Doctor / Physician',
            subtitle: 'MD-94820 • Interventional Cardiology',
            icon: <Stethoscope className="w-5 h-5 text-emerald-400" />,
            borderActive: 'border-emerald-400 shadow-glow-cyan bg-gradient-to-br from-emerald-950/60 to-slate-900/90'
          },
          {
            role: 'patient' as UserPortalRole,
            title: '2. Patient EHR Profile',
            subtitle: 'MRN-784920 • Robert Vance',
            icon: <User className="w-5 h-5 text-cyan-400" />,
            borderActive: 'border-cyan-400 shadow-glow-cyan bg-gradient-to-br from-cyan-950/60 to-slate-900/90'
          },
          {
            role: 'emergency' as UserPortalRole,
            title: '3. SOS / Paramedic',
            subtitle: 'NREMT-P-9021 • MEDIC-04 Unit',
            icon: <Ambulance className="w-5 h-5 text-rose-500" />,
            borderActive: 'border-rose-400 shadow-glow-cyan bg-gradient-to-br from-rose-950/60 to-slate-900/90'
          },
          {
            role: 'hospital' as UserPortalRole,
            title: '4. Hospital Admin',
            subtitle: 'St. Jude Memorial Health Center',
            icon: <Building2 className="w-5 h-5 text-purple-400" />,
            borderActive: 'border-purple-400 shadow-glow-cyan bg-gradient-to-br from-purple-950/60 to-slate-900/90'
          }
        ].map((tab) => {
          const isSelected = selectedRoleView === tab.role;
          return (
            <button
              key={tab.role}
              onClick={() => handleSwitchActivePortal(tab.role)}
              className={`p-4 rounded-3xl text-left border transition-all relative overflow-hidden ${
                isSelected
                  ? `${tab.borderActive} scale-[1.02]`
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
                  {tab.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs sm:text-sm font-black text-white truncate">
                      {tab.title}
                    </span>
                    {activeRole === tab.role && (
                      <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 block truncate">
                    {tab.subtitle}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          ROLE 1: DOCTOR / PHYSICIAN PROFILE
          ========================================================================= */}
      {selectedRoleView === 'doctor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Identity Card */}
            <div className="lg:col-span-1 bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px] shadow-glow-cyan">
                  <div className="w-full h-full bg-[#050e18] rounded-[14px] flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{doctorState.name}</h3>
                  <span className="text-xs text-emerald-300 font-medium block">{doctorState.specialty}</span>
                  <span className="text-[10px] font-mono text-slate-400">{doctorState.hospitalAffiliation}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Medical License:</span>
                  <span className="font-mono font-bold text-white">{doctorState.licenseNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">National Provider (NPI):</span>
                  <span className="font-mono font-bold text-cyan-300">{doctorState.npi}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Digital Signature Key:</span>
                  <span className="font-mono text-[10px] text-emerald-300 font-bold">VERIFIED (ED25519)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">ICU Privileges:</span>
                  <span className="text-emerald-300 font-bold">Full Inpatient & Surgical</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">CME Credits 2026:</span>
                  <span className="font-mono font-bold text-purple-300">48 / 50 Hours Completed</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <Award className="w-4 h-4" />
                  <span>Board Certifications</span>
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                  <li>American Board of Internal Medicine (ABIM)</li>
                  <li>Subspecialty Certification in Cardiovascular Disease</li>
                  <li>Critical Care Medicine & Hemodynamic Monitoring</li>
                </ul>
              </div>

              {setActiveTab && (
                <button
                  onClick={() => setActiveTab('whole_body')}
                  className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-cyan"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Open Doctor Hub & Inpatient Rounds</span>
                </button>
              )}
            </div>

            {/* Details & Practice Logistics */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Practice Information */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-black text-white">Clinical Practice & Consultation Schedule</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    🟢 ON ACTIVE DUTY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Department:</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={doctorState.department}
                        onChange={(e) => setDoctorState({...doctorState, department: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-white font-bold">{doctorState.department}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Office Location:</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={doctorState.officeLocation}
                        onChange={(e) => setDoctorState({...doctorState, officeLocation: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-white font-bold">{doctorState.officeLocation}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Direct Phone:</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={doctorState.phone}
                        onChange={(e) => setDoctorState({...doctorState, phone: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-cyan-300 font-mono font-bold">{doctorState.phone}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Institutional Email:</span>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={doctorState.email}
                        onChange={(e) => setDoctorState({...doctorState, email: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-cyan-300 font-mono font-bold">{doctorState.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <span className="text-slate-400 font-medium">Consultation & Surgical Operating Slots:</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={doctorState.consultationHours}
                        onChange={(e) => setDoctorState({...doctorState, consultationHours: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-slate-200 font-mono">{doctorState.consultationHours}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <span className="text-slate-400 font-medium">Physician Clinical Biography:</span>
                    {isEditing ? (
                      <textarea 
                        rows={3}
                        value={doctorState.bio}
                        onChange={(e) => setDoctorState({...doctorState, bio: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none font-sans"
                      />
                    ) : (
                      <p className="text-slate-300 leading-relaxed">{doctorState.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Assigned Patients Overview */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-base font-black text-white">Active Inpatients Assigned</h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 font-bold">4 Active Cases</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Robert Vance', mrn: 'MRN-784920', room: 'ICU Bed 04', condition: 'Acute Coronary Syndrome', risk: 'HIGH' },
                    { name: 'Eleanor Vance', mrn: 'MRN-489201', room: 'Step-Down 201', condition: 'Congestive Heart Failure', risk: 'MODERATE' },
                    { name: 'James Wilson', mrn: 'MRN-391024', room: 'CCU Bed 02', condition: 'Post-CABG Recovery', risk: 'LOW' },
                    { name: 'Maria Garcia', mrn: 'MRN-849102', room: 'Ward 308', condition: 'Atrial Fibrillation with RVR', risk: 'MODERATE' }
                  ].map((pt) => (
                    <div key={pt.mrn} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-bold block">{pt.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{pt.mrn} • {pt.room}</span>
                        <span className="text-[11px] text-cyan-300 block">{pt.condition}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        pt.risk === 'HIGH' ? 'bg-rose-950 text-rose-300 border border-rose-500/50' : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                      }`}>
                        {pt.risk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ROLE 2: PATIENT EHR & DEMOGRAPHICS PROFILE
          ========================================================================= */}
      {selectedRoleView === 'patient' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Patient Master Card */}
            <div className="lg:col-span-1 bg-slate-900/90 border border-cyan-500/40 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-glow-cyan">
                  <div className="w-full h-full bg-[#050e18] rounded-[14px] flex items-center justify-center">
                    <User className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{patientState.name}</h3>
                  <span className="text-xs text-cyan-300 font-mono font-bold block">{patientState.mrn}</span>
                  <span className="text-[11px] text-slate-400">ABHA: {patientState.abhaId}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Blood Group:</span>
                  <span className="font-mono font-black text-rose-400">{patientState.bloodType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Age / Gender:</span>
                  <span className="font-mono font-bold text-white">{patientState.age} yrs • {patientState.gender}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Organ Donor Registry:</span>
                  <span className="text-emerald-400 font-bold">{patientState.organDonor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Code Status:</span>
                  <span className="text-cyan-300 font-mono font-bold">FULL CODE</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Emergency Passport:</span>
                  <span className="text-purple-300 font-mono font-bold">QR LINK ACTIVE</span>
                </div>
              </div>

              {/* Critical Allergies Badge */}
              <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 space-y-1.5 text-xs">
                <div className="flex items-center space-x-1.5 text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Documented Severe Allergies</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-rose-900/90 text-rose-200 text-[11px] font-mono font-bold border border-rose-500/40">
                    Penicillin (Anaphylaxis)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-900/90 text-rose-200 text-[11px] font-mono font-bold border border-rose-500/40">
                    Sulfa Antibiotics
                  </span>
                </div>
              </div>

              {setActiveTab && (
                <button
                  onClick={() => setActiveTab('emergency_qr')}
                  className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-cyan"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Emergency QR Medical Passport</span>
                </button>
              )}
            </div>

            {/* Insurance, Contacts, & Connected Health IoT */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Personal & Emergency Contact */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-black text-white">Contact & Emergency Notification</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Patient Phone:</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={patientState.phone}
                        onChange={(e) => setPatientState({...patientState, phone: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-cyan-300 font-mono font-bold">{patientState.phone}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Patient Email:</span>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={patientState.email}
                        onChange={(e) => setPatientState({...patientState, email: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-cyan-300 font-mono font-bold">{patientState.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <span className="text-slate-400 font-medium">Residential Address:</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={patientState.address}
                        onChange={(e) => setPatientState({...patientState, address: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-slate-200">{patientState.address}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Primary Emergency Contact:</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={patientState.emergencyContactName}
                        onChange={(e) => setPatientState({...patientState, emergencyContactName: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-rose-300 font-bold">{patientState.emergencyContactName}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Emergency Phone:</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={patientState.emergencyContactPhone}
                        onChange={(e) => setPatientState({...patientState, emergencyContactPhone: e.target.value})}
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    ) : (
                      <p className="text-rose-300 font-mono font-bold">{patientState.emergencyContactPhone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Health Insurance & Policy */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base font-black text-white">Health Insurance & Coverage Details</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    POLICY ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400">Insurance Carrier:</span>
                    <p className="text-white font-bold">{patientState.insuranceProvider}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400">Policy Number:</span>
                    <p className="text-cyan-300 font-mono font-bold">{patientState.insurancePolicyNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400">Group Number:</span>
                    <p className="text-purple-300 font-mono font-bold">{patientState.insuranceGroup}</p>
                  </div>
                </div>
              </div>

              {/* Connected IoT Telemetry Wearables */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-black text-white">Connected IoT Clinical Wearables</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">Apple Watch Ultra 2</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-300">Continuous 1-Lead ECG</span>
                    <p className="text-slate-400 text-[11px]">Heart Rate: 72 bpm • Sinus</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">Dexcom G7 CGM</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300">Glucose Stream</span>
                    <p className="text-slate-400 text-[11px]">114 mg/dL • In Range (96%)</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">Masimo MightySat</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono text-purple-300">Pulse Oximeter</span>
                    <p className="text-slate-400 text-[11px]">SpO2: 98% • Pleth Index 4.2</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ROLE 3: SOS / EMERGENCY PARAMEDIC PROFILE
          ========================================================================= */}
      {selectedRoleView === 'emergency' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Paramedic Identity Card */}
            <div className="lg:col-span-1 bg-slate-900/90 border border-rose-500/40 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-600 p-[2px] shadow-glow-cyan">
                  <div className="w-full h-full bg-[#0e0508] rounded-[14px] flex items-center justify-center">
                    <Ambulance className="w-8 h-8 text-rose-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{emergencyState.name}</h3>
                  <span className="text-xs text-rose-300 font-bold block">{emergencyState.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">{emergencyState.unitId}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">National Registry:</span>
                  <span className="font-mono font-bold text-white">{emergencyState.registryNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Ambulance Unit ID:</span>
                  <span className="font-mono font-bold text-rose-300">{emergencyState.unitId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Radio Channel:</span>
                  <span className="font-mono text-cyan-300 font-bold">{emergencyState.radioFrequency}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">ALS / Critical Care:</span>
                  <span className="text-emerald-300 font-bold">Level 1 Trauma Endorsed</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Shift Status:</span>
                  <span className="text-emerald-400 font-mono font-bold">ACTIVE ON-DUTY</span>
                </div>
              </div>

              {setActiveTab && (
                <button
                  onClick={() => setActiveTab('nova_rescue')}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-cyan"
                >
                  <Zap className="w-4 h-4" />
                  <span>Open NOVA RESCUE SOS Dispatch Console</span>
                </button>
              )}
            </div>

            {/* Field Rig Inspection & Resuscitation Kit */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Unit Deployment Logistics */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Radio className="w-5 h-5 text-rose-400" />
                  <h3 className="text-base font-black text-white">Emergency Dispatch & Mobile Base Info</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Station & Dispatch Base:</span>
                    <p className="text-white font-bold">{emergencyState.dispatchBase}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Emergency Hotline:</span>
                    <p className="text-rose-300 font-mono font-bold">{emergencyState.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Direct Radio Channel:</span>
                    <p className="text-cyan-300 font-mono font-bold">{emergencyState.radioFrequency}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 font-medium">Shift Schedule:</span>
                    <p className="text-slate-200">{emergencyState.shiftSchedule}</p>
                  </div>
                </div>
              </div>

              {/* Rapid Resuscitation Equipment Check */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-black text-white">Mobile Unit Equipment Readiness (Passed Inspection)</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    100% READY
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { item: 'Lucas 3 Mechanical Chest Compression System', status: 'Battery 100% • Calibrated' },
                    { item: 'Zoll X-Series 12-Lead Monitor / Defibrillator', status: 'Pacing / Cardioversion Ready' },
                    { item: 'Emergency Airway Video Laryngoscope (Glidescope)', status: 'Sterile Blades 3, 4 Ready' },
                    { item: 'Naloxone (Narcan) 4mg Intranasal Auto-Dose', status: '12 Units In-Stock (Exp: 2028)' },
                    { item: 'Epinephrine 1:10,000 (0.1mg/mL) Cardiac Syringes', status: '8 Pre-filled Syringes' },
                    { item: 'TXA (Tranexamic Acid 1g) Trauma Kit', status: 'Ready for Hemorrhage Control' }
                  ].map((eq) => (
                    <div key={eq.item} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-bold block">{eq.item}</span>
                        <span className="text-[11px] font-mono text-emerald-300">{eq.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ROLE 4: HOSPITAL & ECOSYSTEM ADMINISTRATOR PROFILE
          ========================================================================= */}
      {selectedRoleView === 'hospital' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Hospital Master Card */}
            <div className="lg:col-span-1 bg-slate-900/90 border border-purple-500/40 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-[2px] shadow-glow-cyan">
                  <div className="w-full h-full bg-[#0b0514] rounded-[14px] flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{hospitalState.name}</h3>
                  <span className="text-xs text-purple-300 font-bold block">{hospitalState.accreditation}</span>
                  <span className="text-[10px] font-mono text-slate-400">{hospitalState.facilityId}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Chief Medical Officer:</span>
                  <span className="font-bold text-white">{hospitalState.directorName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">ICU Bed Occupancy:</span>
                  <span className="font-mono font-bold text-rose-300">{hospitalState.activeIcuBeds}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">PACS / DICOM Cloud:</span>
                  <span className="font-mono text-emerald-300 font-bold">{hospitalState.pacsDicomStatus}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Pharmacy Cold-Chain:</span>
                  <span className="text-cyan-300 font-mono font-bold">{hospitalState.pharmacyColdChainStatus}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">ER Hotline:</span>
                  <span className="text-rose-400 font-mono font-bold">{hospitalState.erDirectHotline}</span>
                </div>
              </div>

              {setActiveTab && (
                <button
                  onClick={() => setActiveTab('hospital_units')}
                  className="w-full py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 transition-all shadow-glow-cyan"
                >
                  <BedDouble className="w-4 h-4" />
                  <span>Open Care Units & Hospital Inpatient Floor</span>
                </button>
              )}
            </div>

            {/* Department Roster & Live Operational Stats */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Real-Time Facility Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Total Inpatient Beds', val: '150 Beds', sub: '92% Occupied', color: 'text-cyan-300' },
                  { label: 'Operating Theaters', val: '4 / 4 Active', sub: 'Surgeries in progress', color: 'text-emerald-400' },
                  { label: 'Active Clinical Staff', val: '130 On-Duty', sub: '32 MDs • 78 Nurses', color: 'text-purple-300' },
                  { label: 'Billing Settlements', val: '$148,200', sub: '98% Claims Cleared', color: 'text-amber-300' }
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 block">{stat.label}</span>
                    <span className={`text-lg font-black ${stat.color} block`}>{stat.val}</span>
                    <span className="text-[10px] text-slate-300 block">{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* Active Clinical Departments */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <h3 className="text-base font-black text-white">Clinical Departments & Care Units</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { dept: 'Cardiology & Cardiovascular ICU', head: 'Dr. Sarah Lin, MD', beds: '16 ICU Beds', status: 'Optimal' },
                    { dept: 'Emergency & Trauma Resuscitation', head: 'Dr. Marcus Vance, MD', beds: '12 Bays', status: 'Level 1 Trauma' },
                    { dept: 'Pulmonology & Respiratory Care', head: 'Dr. Emily Watson, MD', beds: '20 Beds', status: 'Full Isolation' },
                    { dept: 'Neurology & Neuro-Surgical Unit', head: 'Dr. David Kim, MD', beds: '14 Beds', status: 'Stroke Unit Active' }
                  ].map((d) => (
                    <div key={d.dept} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="text-white font-bold">{d.dept}</span>
                        <span className="px-2 py-0.2 text-[9px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40 rounded">
                          {d.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">Director: {d.head}</p>
                      <p className="text-cyan-300 font-mono text-[10px]">{d.beds}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
