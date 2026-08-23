import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Stethoscope, 
  Activity,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PatientProfile } from '../types/biotech';

interface ClinicalNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
}

export const ClinicalNotesModal: React.FC<ClinicalNotesModalProps> = ({
  isOpen,
  onClose,
  patient
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const note = patient.clinicalNotes[0] || {
    subjective: 'Patient admitted with acute fatigue, dyspnea, and progressive tachypnea.',
    objective: `HR ${patient.vitals.heartRate} bpm, SpO2 ${patient.vitals.spo2}%, RR ${patient.vitals.respiratoryRate} bpm, Temp ${patient.vitals.temperature}°C, BP ${patient.vitals.systolicBp}/${patient.vitals.diastolicBp}. NEWS2: ${patient.vitals.news2Score}.`,
    assessment: `${patient.riskAssessment.primaryRiskDiagnosis} (XAI Risk Score: ${patient.riskAssessment.overallRiskScore}%).`,
    plan: '1. Continuous multi-parameter telemetry monitoring.\n2. Targeted intervention per protocol.\n3. Reassess arterial blood gas and serum lactate in 2 hours.'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `NOVA SENTINEL CLINICAL SOAP NOTE\nPatient: ${patient.name} (${patient.mrn})\nBed: ${patient.bedLocation}\nDate: ${new Date().toLocaleString()}\n\nSUBJECTIVE:\n${note.subjective}\n\nOBJECTIVE:\n${note.objective}\n\nASSESSMENT:\n${note.assessment}\n\nPLAN:\n${note.plan}`;
    navigator.clipboard.writeText(text);
    alert('Clinical SOAP Note copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl bg-[#090e1d] print:bg-white text-slate-100 print:text-black border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none">
        
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-sm text-white">
              AI Clinical Decision Support & SOAP Note Dossier
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Text</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-glow-cyan"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable SOAP Note Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="border-b border-slate-800 print:border-black/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-6 h-6 text-cyan-400 print:text-blue-600" />
                <h1 className="text-xl font-black text-white print:text-black">
                  NOVA Sentinel Clinical Documentation
                </h1>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600 font-mono mt-0.5">
                Intelligent Early Warning & Multi-Parameter SOAP Note
              </p>
            </div>

            <div className="text-right text-xs font-mono">
              <p className="text-slate-400 print:text-slate-600">Generated: {new Date().toLocaleDateString()}</p>
              <span className="text-cyan-300 print:text-blue-600 font-bold">MRN: {patient.mrn}</span>
            </div>
          </div>

          {/* Patient Quick Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold">Patient</span>
              <div className="font-extrabold text-white print:text-black">{patient.name} ({patient.age}y)</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold">Bed Location</span>
              <div className="font-bold text-cyan-300 print:text-blue-700 font-mono">{patient.bedLocation}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold">Attending</span>
              <div className="font-semibold text-white print:text-black">{patient.attendingPhysician}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold">Risk Assessment</span>
              <div className="font-extrabold text-rose-400 font-mono">{patient.riskAssessment.riskLevel} ({patient.riskAssessment.overallRiskScore}%)</div>
            </div>
          </div>

          {/* SOAP Note Blocks */}
          <div className="space-y-4 text-xs leading-relaxed">
            
            {/* Subjective */}
            <div className="p-4 rounded-xl bg-slate-900/40 print:bg-white border border-slate-800 print:border-slate-300 space-y-1">
              <span className="font-extrabold text-cyan-400 print:text-blue-700 uppercase tracking-wider text-[11px] block">
                [S] Subjective Findings
              </span>
              <p className="text-slate-200 print:text-slate-800">{note.subjective}</p>
            </div>

            {/* Objective */}
            <div className="p-4 rounded-xl bg-slate-900/40 print:bg-white border border-slate-800 print:border-slate-300 space-y-1">
              <span className="font-extrabold text-cyan-400 print:text-blue-700 uppercase tracking-wider text-[11px] block">
                [O] Objective Telemetry & Biomarkers
              </span>
              <p className="text-slate-200 print:text-slate-800 font-mono">{note.objective}</p>
            </div>

            {/* Assessment */}
            <div className="p-4 rounded-xl bg-slate-900/40 print:bg-white border border-slate-800 print:border-slate-300 space-y-1">
              <span className="font-extrabold text-purple-400 print:text-purple-700 uppercase tracking-wider text-[11px] block">
                [A] Assessment & XAI Deterioration Diagnosis
              </span>
              <p className="text-slate-200 print:text-slate-800">{note.assessment}</p>
            </div>

            {/* Plan */}
            <div className="p-4 rounded-xl bg-emerald-950/20 print:bg-emerald-50 border border-emerald-500/30 print:border-emerald-300 space-y-1">
              <span className="font-extrabold text-emerald-400 print:text-emerald-800 uppercase tracking-wider text-[11px] block">
                [P] Actionable Clinical Plan & Physician Orders
              </span>
              <pre className="text-slate-200 print:text-slate-800 font-sans whitespace-pre-line">{note.plan}</pre>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
