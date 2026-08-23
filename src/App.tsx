import React, { useState } from 'react';
import { WelcomeSplashScreen } from './components/WelcomeSplashScreen';
import { AuthPortal, AuthenticatedUser } from './components/AuthPortal';
import { Navbar } from './components/Navbar';
import { JudgePitchBanner } from './components/JudgePitchBanner';
import { MultiDeviceViewportSimulator, ViewportDeviceMode } from './components/MultiDeviceViewportSimulator';
import { SettingsModal } from './components/SettingsModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { UniversalPageHeader } from './components/UniversalPageHeader';
import { CommandCenter } from './components/CommandCenter';
import { NovaPharmaUniverse } from './components/NovaPharmaUniverse';
import { NovaAnatomyTwin3D } from './components/NovaAnatomyTwin3D';
import { PatientMonitor } from './components/PatientMonitor';
import { OrganDigitalTwin3D } from './components/OrganDigitalTwin3D';
import { NovaRescueEmergencyNetwork } from './components/NovaRescueEmergencyNetwork';
import { MasterMedicalUniverseAtlas } from './components/MasterMedicalUniverseAtlas';
import { MedicalTimelineView } from './components/MedicalTimelineView';
import { NurseEmarView } from './components/NurseEmarView';
import { AppointmentsManager } from './components/AppointmentsManager';
import { DoctorWholeBodyMonitor } from './components/DoctorWholeBodyMonitor';
import { SpecialistDirectory } from './components/SpecialistDirectory';
import { HospitalEcosystemView } from './components/HospitalEcosystemView';
import { HospitalReportsManager } from './components/HospitalReportsManager';
import { XAIRiskPredictor } from './components/XAIRiskPredictor';
import { ClinicalKnowledgeSearch } from './components/ClinicalKnowledgeSearch';
import { NovaMedSearch } from './components/NovaMedSearch';
import { NovaCareGuide } from './components/NovaCareGuide';
import { EmergencyQRPassport } from './components/EmergencyQRPassport';
import { PrescriptionVault } from './components/PrescriptionVault';
import { AlertsManager } from './components/AlertsManager';
import { ClinicalNotesModal } from './components/ClinicalNotesModal';
import { PatientRegistrationModal } from './components/PatientRegistrationModal';
import { DatabaseAdminModal } from './components/DatabaseAdminModal';
import { UserProfileHub } from './components/UserProfileHub';
import { LogoutScreen } from './components/LogoutScreen';
import { clinicalDb } from './services/clinicalDatabaseService';

import { StructureViewer3D } from './components/StructureViewer3D';
import { VariantAnalyzer } from './components/VariantAnalyzer';
import { DrugDiscovery } from './components/DrugDiscovery';
import { ClinicalTrials } from './components/ClinicalTrials';
import { SequenceScanner } from './components/SequenceScanner';

import { PATIENT_DATABASE } from './data/patientDatabase';
import { PROTEIN_STRUCTURES } from './data/proteinStructures';
import { PatientProfile, ProteinStructure, TabType, UserPortalRole, PrescriptionRecord } from './types/biotech';
import { MedicalSpecialty } from './data/specialistDirectory';
import { ShieldCheck, Activity, Radio, Layers, User, Stethoscope, Building2, ShieldAlert, Users, BedDouble, Clock, Calendar, Globe, Flame, Brain, Heart, Dna, Database } from 'lucide-react';

type AppFlowState = 'welcome' | 'auth' | 'main' | 'logout';

export const App: React.FC = () => {
  // Application Top-Level Lifecycle: 5s Welcome -> Manual Auth -> Main Clinical Dashboard -> Logout Screen
  const [appState, setAppState] = useState<AppFlowState>('welcome');
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);

  const [activeTab, setActiveTab] = useState<TabType>('command_center');
  const [activeRole, setActiveRole] = useState<UserPortalRole>('doctor');
  const [patients, setPatients] = useState<PatientProfile[]>(() => clinicalDb.getPatients());
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile>(() => clinicalDb.getPatients()[0] || PATIENT_DATABASE[0]);
  const [selectedStructure, setSelectedStructure] = useState<ProteinStructure>(PROTEIN_STRUCTURES[0]);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isDatabaseOpen, setIsDatabaseOpen] = useState<boolean>(false);
  const [deviceMode, setDeviceMode] = useState<ViewportDeviceMode>('responsive');
  const [autoDetectDevice, setAutoDetectDevice] = useState<boolean>(true);

  // When 5-second welcome screen finishes
  const handleWelcomeComplete = () => {
    setAppState('auth');
  };

  // When user successfully verifies OTP in Auth Portal
  const handleAuthenticated = (user: AuthenticatedUser) => {
    setCurrentUser(user);
    setActiveRole(user.role);
    
    // Automatically direct to role-specific main view
    if (user.role === 'emergency') {
      setActiveTab('nova_rescue');
    } else if (user.role === 'doctor') {
      setActiveTab('command_center');
    } else if (user.role === 'hospital') {
      setActiveTab('hospital_units');
    } else {
      setActiveTab('patient_monitor');
    }

    setAppState('main');
  };

  // Logout handler - Transition to dedicated Logout Screen
  const handleLogout = () => {
    setAppState('logout');
  };

  const handleAddPatient = (newPatient: PatientProfile) => {
    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatient(newPatient);
    setActiveTab('patient_monitor');
  };

  const handleAddPrescription = (newRx: PrescriptionRecord) => {
    setPatients(prev => prev.map(p => {
      if (p.id === selectedPatient.id) {
        const updated = {
          ...p,
          emergencyPassport: {
            ...p.emergencyPassport,
            prescriptions: [newRx, ...(p.emergencyPassport.prescriptions || [])],
            activeMedications: [`${newRx.drugName} ${newRx.dosage}`, ...p.emergencyPassport.activeMedications]
          }
        };
        setSelectedPatient(updated);
        return updated;
      }
      return p;
    }));
  };

  const handleInitiateTeleconsult = (specialty: MedicalSpecialty) => {
    setActiveTab('whole_body');
  };

  // 1. STEP A: 5-Second Visible Welcome Splash Screen
  if (appState === 'welcome') {
    return <WelcomeSplashScreen onComplete={handleWelcomeComplete} />;
  }

  // 2. STEP B: Complete Manual Authentication Portal (Sign In, Sign Up, Forgot Pass, 6-Digit OTP)
  if (appState === 'auth') {
    return <AuthPortal onAuthenticated={handleAuthenticated} />;
  }

  // 2.5 STEP B.5: Dedicated Logout & Session Termination Screen
  if (appState === 'logout') {
    return (
      <LogoutScreen 
        lastUser={currentUser}
        lastRole={activeRole}
        onRelogin={(role) => {
          if (role) setActiveRole(role);
          setCurrentUser(null);
          setAppState('auth');
        }}
        onReturnToWelcome={() => {
          setCurrentUser(null);
          setAppState('welcome');
        }}
        onOpenDatabase={() => setIsDatabaseOpen(true)}
      />
    );
  }

  // 3. STEP C: Main BioPulse AI / NOVA Platform (After Successful OTP Verification)
  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 pb-16 md:pb-0">
      
      {/* 1. Header Navigation with 4 Access Portals Switcher & Logged In User */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenNotes={() => setIsNotesOpen(true)} 
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenDatabase={() => setIsDatabaseOpen(true)}
      />

      {/* 2. Top Judge Pitch Showcase Banner */}
      <JudgePitchBanner 
        patients={patients}
        selectedPatient={selectedPatient} 
        onSelectPatient={setSelectedPatient} 
      />

      {/* 3. Multi-Device Viewport Simulator Wrapper */}
      <MultiDeviceViewportSimulator
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        selectedPatient={selectedPatient}
        patients={patients}
        setSelectedPatient={setSelectedPatient}
        setActiveTab={setActiveTab}
      >
        {/* Main Workspace Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          
          {/* Universal Page Header & Back Navigation for all non-root tabs */}
          <UniversalPageHeader 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            selectedPatient={selectedPatient}
            onOpenPatientNotes={() => setIsNotesOpen(true)}
          />

          {/* === SECTION A: 4 ACCESS PORTALS & CLINICAL CORE === */}
          {activeTab === 'user_profile' && (
            <UserProfileHub 
              currentUser={currentUser}
              activeRole={activeRole}
              setActiveRole={setActiveRole}
              patient={selectedPatient}
              setActiveTab={setActiveTab}
              onOpenDatabase={() => setIsDatabaseOpen(true)}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          )}

          {activeTab === 'command_center' && (
            <CommandCenter 
              patients={patients}
              selectedPatient={selectedPatient}
              onSelectPatient={setSelectedPatient}
              setActiveTab={setActiveTab}
              onOpenRegister={() => setIsRegisterOpen(true)}
            />
          )}

          {activeTab === 'nova_pharma' && (
            <NovaPharmaUniverse 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'nova_anatomy_twin' && (
            <NovaAnatomyTwin3D 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'organ_3d_twin' && (
            <OrganDigitalTwin3D 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'nova_rescue' && (
            <NovaRescueEmergencyNetwork 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'patient_monitor' && (
            <PatientMonitor 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'medical_atlas' && (
            <MasterMedicalUniverseAtlas 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'medical_timeline' && (
            <MedicalTimelineView 
              patient={selectedPatient}
            />
          )}

          {activeTab === 'nurse_emar' && (
            <NurseEmarView 
              patient={selectedPatient}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsManager 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'hospital_units' && (
            <HospitalEcosystemView 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'whole_body' && (
            <DoctorWholeBodyMonitor 
              patient={selectedPatient}
              onOpenNotes={() => setIsNotesOpen(true)}
            />
          )}

          {activeTab === 'specialists' && (
            <SpecialistDirectory 
              patient={selectedPatient}
              onInitiateTeleconsult={handleInitiateTeleconsult}
            />
          )}

          {activeTab === 'hospital_reports' && (
            <HospitalReportsManager 
              patient={selectedPatient}
              onAddPrescription={handleAddPrescription}
            />
          )}

          {activeTab === 'xai_risk' && (
            <XAIRiskPredictor 
              patient={selectedPatient}
            />
          )}

          {activeTab === 'clinical_search' && (
            <NovaMedSearch 
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'nova_careguide' && (
            <NovaCareGuide 
              patient={selectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'emergency_qr' && (
            <EmergencyQRPassport 
              patient={selectedPatient}
            />
          )}

          {activeTab === 'prescription_vault' && (
            <PrescriptionVault 
              patient={selectedPatient}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsManager 
              patients={patients}
              onSelectPatient={setSelectedPatient}
              setActiveTab={setActiveTab}
            />
          )}

          {/* === SECTION B: COMPUTATIONAL GENOMICS & 3D ALPHAFOLD === */}
          {activeTab === 'structure3d' && (
            <StructureViewer3D 
              selectedStructure={selectedStructure}
              onSelectStructure={setSelectedStructure}
              highlightResidue={12}
            />
          )}

          {activeTab === 'variant' && (
            <VariantAnalyzer 
              currentGene="KRAS"
            />
          )}

          {activeTab === 'drugs' && (
            <DrugDiscovery />
          )}

          {activeTab === 'trials' && (
            <ClinicalTrials 
              currentBiomarker="KRAS G12D"
            />
          )}

          {activeTab === 'sequence' && (
            <SequenceScanner />
          )}

        </main>
      </MultiDeviceViewportSimulator>

      {/* 4. Native Mobile Bottom Navigation Bar */}
      <MobileBottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 5. Automated Clinical SOAP Notes Modal */}
      <ClinicalNotesModal 
        isOpen={isNotesOpen} 
        onClose={() => setIsNotesOpen(false)} 
        patient={selectedPatient} 
      />

      {/* 6. Patient Admission Modal */}
      <PatientRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onAddPatient={handleAddPatient}
      />

      {/* 7. Settings & Mobile Connect QR Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        autoDetectDevice={autoDetectDevice}
        setAutoDetectDevice={setAutoDetectDevice}
      />

      {/* 8. Master Persistent Clinical Database Studio Modal */}
      <DatabaseAdminModal
        isOpen={isDatabaseOpen}
        onClose={() => setIsDatabaseOpen(false)}
        onRefreshData={() => {
          const fresh = clinicalDb.getPatients();
          setPatients(fresh);
          if (selectedPatient) {
            const updated = fresh.find(p => p.id === selectedPatient.id);
            if (updated) setSelectedPatient(updated);
          }
        }}
      />

      {/* 8. Footer (Hidden on mobile to save vertical space) */}
      <footer className="hidden md:block border-t border-slate-800/80 bg-[#060913]/90 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">BioPulse AI • NOVA Ecosystem</span>
            <span>— Multi-Screen Viewport & Clinical Intelligence Platform</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[11px] text-slate-400">
            <span className="flex items-center space-x-1 text-cyan-400">
              <Brain className="w-3 h-3 animate-pulse" />
              <span>Anatomy Twin 3D</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1 text-purple-400">
              <Layers className="w-3 h-3" />
              <span>Auto-Detect Screen</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1 text-emerald-400">
              <Dna className="w-3 h-3" />
              <span>DNA Double Helix Synced</span>
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
