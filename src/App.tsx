import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { JudgePitchBanner } from './components/JudgePitchBanner';
import { MultiDeviceViewportSimulator } from './components/MultiDeviceViewportSimulator';
import { CommandCenter } from './components/CommandCenter';
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
import { EmergencyQRPassport } from './components/EmergencyQRPassport';
import { PrescriptionVault } from './components/PrescriptionVault';
import { AlertsManager } from './components/AlertsManager';
import { ClinicalNotesModal } from './components/ClinicalNotesModal';
import { PatientRegistrationModal } from './components/PatientRegistrationModal';

import { StructureViewer3D } from './components/StructureViewer3D';
import { VariantAnalyzer } from './components/VariantAnalyzer';
import { DrugDiscovery } from './components/DrugDiscovery';
import { ClinicalTrials } from './components/ClinicalTrials';
import { SequenceScanner } from './components/SequenceScanner';

import { PATIENT_DATABASE } from './data/patientDatabase';
import { PROTEIN_STRUCTURES } from './data/proteinStructures';
import { PatientProfile, ProteinStructure, TabType, UserPortalRole, PrescriptionRecord } from './types/biotech';
import { MedicalSpecialty } from './data/specialistDirectory';
import { ShieldCheck, Activity, Radio, Layers, User, Stethoscope, Building2, ShieldAlert, Users, BedDouble, Clock, Calendar, Globe, Flame, Brain, Heart, Dna } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('command_center');
  const [activeRole, setActiveRole] = useState<UserPortalRole>('patient');
  const [patients, setPatients] = useState<PatientProfile[]>(PATIENT_DATABASE);
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile>(PATIENT_DATABASE[0]);
  const [selectedStructure, setSelectedStructure] = useState<ProteinStructure>(PROTEIN_STRUCTURES[0]);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

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

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. Header Navigation with 4 Access Portals Switcher */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenNotes={() => setIsNotesOpen(true)} 
        onOpenRegister={() => setIsRegisterOpen(true)}
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
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* === SECTION A: 4 ACCESS PORTALS & CLINICAL CORE === */}
          {activeTab === 'command_center' && (
            <CommandCenter 
              patients={patients}
              selectedPatient={selectedPatient}
              onSelectPatient={setSelectedPatient}
              setActiveTab={setActiveTab}
              onOpenRegister={() => setIsRegisterOpen(true)}
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
            <ClinicalKnowledgeSearch 
              patient={selectedPatient}
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

      {/* 4. Automated Clinical SOAP Notes Modal */}
      <ClinicalNotesModal 
        isOpen={isNotesOpen} 
        onClose={() => setIsNotesOpen(false)} 
        patient={selectedPatient} 
      />

      {/* 5. Patient Admission Modal */}
      <PatientRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onAddPatient={handleAddPatient}
      />

      {/* 6. Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060913]/90 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
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
              <span>Multi-Screen Grid</span>
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
