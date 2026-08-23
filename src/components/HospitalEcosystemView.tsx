import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Users, 
  BedDouble, 
  Heart, 
  Stethoscope, 
  Brain, 
  Activity, 
  Pill, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  GitBranch, 
  ArrowRight,
  Sparkles,
  Workflow,
  Network
} from 'lucide-react';
import { HOSPITAL_UNITS, SUBSPECIALTY_TREES, CLINICAL_WORKFLOW_STEPS, HospitalUnit } from '../data/hospitalEcosystem';
import { PatientProfile, TabType } from '../types/biotech';
import { HospitalHierarchyTree } from './HospitalHierarchyTree';
import { HospitalDepartmentsGrid } from './HospitalDepartmentsGrid';

interface HospitalEcosystemViewProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const HospitalEcosystemView: React.FC<HospitalEcosystemViewProps> = ({
  patient,
  setActiveTab
}) => {
  const [selectedUnit, setSelectedUnit] = useState<HospitalUnit>(HOSPITAL_UNITS[0]);
  const [activeSubTab, setActiveSubTab] = useState<'main_tree' | 'departments' | 'units' | 'subspecialties' | 'hierarchy' | 'workflow'>('departments');

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Hospital Architecture & Care Units
              </span>
              <span className="text-xs font-mono text-purple-300 font-bold">
                21 Main Departments Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-cyan-400" />
              <span>Hospital Ecosystem, 21 Departments & Care Units</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Complete inpatient clinical ecosystem: Explore all <strong>21 Main Hospital Departments</strong> (Emergency, General Medicine, ICU, Cardiology, Neurology, Pulmonology, Nephrology, Oncology, etc.), Intensive Care Units, and 15-Tier Entity Architecture.
            </p>
          </div>

          {/* Sub-Tabs Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex-wrap gap-y-1">
            <button
              onClick={() => setActiveSubTab('departments')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'departments'
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏢 21 Main Departments
            </button>
            <button
              onClick={() => setActiveSubTab('main_tree')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'main_tree'
                  ? 'bg-purple-600 text-white shadow-glow-purple font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌳 15-Tier Hierarchy
            </button>
            <button
              onClick={() => setActiveSubTab('units')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'units'
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏥 Care Units
            </button>
            <button
              onClick={() => setActiveSubTab('subspecialties')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'subspecialties'
                  ? 'bg-amber-500 text-slate-950 shadow-glow-cyan font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌿 Subspecialties
            </button>
            <button
              onClick={() => setActiveSubTab('hierarchy')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'hierarchy'
                  ? 'bg-slate-800 text-slate-200 hover:text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👥 Staff Roster
            </button>
            <button
              onClick={() => setActiveSubTab('workflow')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'workflow'
                  ? 'bg-slate-800 text-slate-200 hover:text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ 7-Step Workflow
            </button>
          </div>
        </div>
      </div>

      {/* 0. 21 MAIN HOSPITAL DEPARTMENTS */}
      {activeSubTab === 'departments' && (
        <HospitalDepartmentsGrid 
          patient={patient}
          setActiveTab={setActiveTab}
        />
      )}

      {/* 1. MAIN 15-TIER ENTITY HIERARCHY */}
      {activeSubTab === 'main_tree' && (
        <HospitalHierarchyTree 
          patient={patient}
          setActiveTab={setActiveTab}
        />
      )}

      {/* 2. CARE UNITS TAB */}
      {activeSubTab === 'units' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 5 Cols: Unit Roster */}
          <div className="lg:col-span-5 space-y-3">
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                  <BedDouble className="w-5 h-5 text-cyan-400" />
                  <span>Hospital Care Units Matrix</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">{HOSPITAL_UNITS.length} Units</span>
              </div>

              <div className="space-y-2.5">
                {HOSPITAL_UNITS.map((u) => {
                  const isSelected = selectedUnit.id === u.id;
                  const occupancy = Math.round((u.occupiedBeds / u.totalBeds) * 100);
                  return (
                    <div
                      key={u.id}
                      onClick={() => setSelectedUnit(u)}
                      className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 shadow-glow-cyan scale-[1.01]'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase block">
                            {u.category}
                          </span>
                          <h4 className="text-sm font-extrabold text-white">{u.name}</h4>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {u.code}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-slate-800/60">
                        <span>Beds: <strong className="text-white">{u.occupiedBeds}/{u.totalBeds}</strong> ({occupancy}%)</span>
                        <span className="text-rose-400 font-bold">{u.criticalPatients} Critical</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Selected Unit Detail */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-300 font-bold">{selectedUnit.category}</span>
                  <h3 className="text-xl font-black text-white">{selectedUnit.name}</h3>
                  <span className="text-xs text-slate-400 font-mono">{selectedUnit.description}</span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black font-mono text-cyan-300">
                    {selectedUnit.occupiedBeds} / {selectedUnit.totalBeds}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Beds Occupied</span>
                </div>
              </div>

              {/* On-Duty Care Team */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Unit Lead Physician</span>
                  <div className="text-xs font-extrabold text-white flex items-center space-x-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedUnit.leadPhysician}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Charge Nurse (Lead)</span>
                  <div className="text-xs font-extrabold text-white flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{selectedUnit.leadNurse}</span>
                  </div>
                </div>
              </div>

              {/* Active Clinical Equipment */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Active Biomedical Equipment Online:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedUnit.activeEquipment.map((eq, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('command_center')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all flex items-center justify-center space-x-2"
                >
                  <span>View All Inpatient Beds in this Unit ({selectedUnit.code})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 3. SUBSPECIALTY TREES TAB */}
      {activeSubTab === 'subspecialties' && (
        <div className="space-y-6">
          {SUBSPECIALTY_TREES.map((dept) => (
            <div key={dept.id} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-black text-white">{dept.mainDepartment}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dept.subspecialties.map((sub, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-purple-500/40 transition-all">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-extrabold text-white">{sub.name}</h4>
                      <span className="text-[10px] font-mono text-purple-300 font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                        Subspecialist
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {sub.focusArea}
                    </p>

                    <div className="space-y-1 pt-1 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                      <div>On-Duty: <strong className="text-white">{sub.onDutyDoctor}</strong></div>
                      <div className="text-cyan-300 truncate">Procedures: {sub.sampleProcedures.join(', ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. DOCTOR HIERARCHY & ALLIED TEAM TAB */}
      {activeSubTab === 'hierarchy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 6 Cols: Doctor Hierarchy */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Stethoscope className="w-5 h-5 text-cyan-400" />
              <span>Medical Doctor Hierarchy & Clinical Responsibility</span>
            </h3>

            <div className="space-y-2.5">
              {[
                { role: 'Medical Director', desc: 'Executive clinical governance, hospital-wide medical policies.', level: 'Executive' },
                { role: 'HOD / Department Chair', desc: 'Leads clinical department (Cardiology, Surgery, ICU), reviews audit quality.', level: 'Department Head' },
                { role: 'Senior Consultant', desc: 'Most experienced attending specialist; takes final decisions on critical patients.', level: 'Senior Attending' },
                { role: 'Consultant / Attending', desc: 'Independent physician admitting patients, performing surgeries, signing orders.', level: 'Attending' },
                { role: 'Fellow (Subspecialty Trainee)', desc: 'Post-residency doctor in advanced subspecialty training (e.g. Interventional Cardiology).', level: 'Subspecialist' },
                { role: 'Senior Resident (SR)', desc: 'Experienced postgraduate resident leading ward rounds and emergency responses.', level: 'Senior Resident' },
                { role: 'Junior Resident (JR)', desc: 'Postgraduate doctor managing continuous inpatient monitoring and admissions.', level: 'Junior Resident' },
                { role: 'Resident Medical Officer (RMO) / Intern', desc: 'Provides continuous 24/7 bedside coverage and first-response triage.', level: 'First Responder' }
              ].map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-extrabold text-white">{h.role}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-500/20">{h.level}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 6 Cols: Allied Healthcare Professionals */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Multi-Disciplinary Allied Healthcare Team</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { title: 'Critical Care Nurses (CCRN)', role: 'Continuous bedside hemodynamics & drug titration' },
                { title: 'Respiratory Therapists (RT)', role: 'Mechanical ventilator & high-flow O2 management' },
                { title: 'Clinical Pharmacists', role: 'Drug-drug conflict checks & antibiotic stewardship' },
                { title: 'Physiotherapists & PM&R', role: 'Early ICU mobilization & post-stroke rehabilitation' },
                { title: 'Diagnostic Radiographers', role: 'Portable X-Rays, emergency CT & MRI acquisitions' },
                { title: 'Laboratory Technologists', role: 'Stat blood gas, cultures & coagulopathy panels' },
                { title: 'Clinical Dietitians', role: 'Total parenteral nutrition (TPN) & enteral feeds' },
                { title: 'Paramedics & EMTs', role: 'Pre-hospital triage & Emergency QR Passport scanning' }
              ].map((allied, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                  <span className="text-xs font-bold text-emerald-300 block">{allied.title}</span>
                  <span className="text-[11px] text-slate-400">{allied.role}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 5. CLINICAL WORKFLOW TAB */}
      {activeSubTab === 'workflow' && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
          <div className="flex items-center space-x-2">
            <Workflow className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-lg font-black text-white">The 7-Step Inpatient Admission to Discharge Lifecycle</h3>
              <p className="text-xs text-slate-400">Standardized FHIR / EHR compliant hospital lifecycle.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {CLINICAL_WORKFLOW_STEPS.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 flex flex-col justify-between hover:border-amber-400/50 transition-all">
                <div>
                  <span className="w-7 h-7 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold flex items-center justify-center mb-2">
                    {idx + 1}
                  </span>
                  <h4 className="text-xs font-extrabold text-white">{step.step}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{step.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Automated in App</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
