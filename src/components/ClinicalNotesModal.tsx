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
  ShieldCheck,
  ArrowLeft,
  Share2
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
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const note = patient.clinicalNotes[0] || {
    subjective: 'Patient admitted with acute fatigue, dyspnea, marked accessory muscle use, and progressive tachypnea.',
    objective: `HR ${patient.vitals.heartRate} bpm, SpO2 ${patient.vitals.spo2}%, RR ${patient.vitals.respiratoryRate} bpm, Temp ${patient.vitals.temperature}°C, BP ${patient.vitals.systolicBp}/${patient.vitals.diastolicBp}. NEWS2: ${patient.vitals.news2Score}. Bilateral crackles on auscultation.`,
    assessment: `${patient.riskAssessment.primaryRiskDiagnosis} (XAI Deterioration Risk Score: ${patient.riskAssessment.overallRiskScore}%). High risk of multi-organ hypoperfusion and septic decompensation.`,
    plan: '1. Continuous multi-parameter telemetry monitoring & high-flow O2 titration.\n2. Initiate targeted broad-spectrum IV antimicrobials & fluid resuscitation per sepsis protocol.\n3. Continuous invasive arterial line BP monitoring.\n4. Reassess arterial blood gas (ABG) and serum lactate Q2H.\n5. Notify ICU Attending and prepare for escalated respiratory support if PaO2/FiO2 drops < 200.'
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `NOVA SENTINEL CLINICAL SOAP NOTE\nPatient: ${patient.name} (${patient.mrn})\nBed: ${patient.bedLocation}\nDate: ${new Date().toLocaleString()}\n\n[S] SUBJECTIVE:\n${note.subjective}\n\n[O] OBJECTIVE:\n${note.objective}\n\n[A] ASSESSMENT:\n${note.assessment}\n\n[P] PLAN & INTERVENTIONS:\n${note.plan}`;
    navigator.clipboard.writeText(text);
    alert('Clinical SOAP Note copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-start justify-center p-2 sm:p-6 pt-10 sm:pt-6 pb-20 print:p-0 print:bg-white animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[86dvh] sm:max-h-[90vh] bg-[#090e1d] print:bg-white text-slate-100 print:text-black border border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden print:border-none print:shadow-none">
        
        {/* Sticky Top Modal Navigation Bar with prominent Back button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shrink-0 print:hidden">
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-bold transition-all shadow-glow-cyan"
              title="Navigate Back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="hidden sm:flex items-center space-x-1.5 ml-2">
              <Stethoscope className="w-4 h-4 text-cyan-400" />
              <span className="font-extrabold text-xs text-white">
                SOAP Note Dossier
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              title="Copy Text"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-glow-cyan"
              title="Print / Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable SOAP Note Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 overscroll-contain">
          
          {/* Note Header */}
          <div className="border-b border-slate-800 print:border-black/20 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 print:text-blue-600 shrink-0" />
                <h1 className="text-lg sm:text-xl font-black text-white print:text-black">
                  NOVA Sentinel Clinical Documentation
                </h1>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 print:text-slate-600 font-mono mt-0.5">
                Intelligent Early Warning & Multi-Parameter SOAP Note
              </p>
            </div>

            <div className="text-left sm:text-right text-xs font-mono">
              <p className="text-slate-400 print:text-slate-600">Generated: {new Date().toLocaleDateString()}</p>
              <span className="text-cyan-300 print:text-blue-600 font-bold">MRN: {patient.mrn}</span>
            </div>
          </div>

          {/* Patient Quick Info Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 rounded-2xl bg-slate-900/80 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold block">Patient</span>
              <div className="font-extrabold text-white print:text-black">{patient.name} ({patient.age}y)</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold block">Bed Location</span>
              <div className="font-bold text-cyan-300 print:text-blue-700 font-mono">{patient.bedLocation}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold block">Attending</span>
              <div className="font-semibold text-white print:text-black truncate">{patient.attendingPhysician}</div>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[10px] font-bold block">Risk Assessment</span>
              <div className="font-extrabold text-rose-400 font-mono">{patient.riskAssessment.riskLevel} ({patient.riskAssessment.overallRiskScore}%)</div>
            </div>
          </div>

          {/* SOAP Note Sections */}
          <div className="space-y-4 text-xs leading-relaxed">
            
            {/* [S] Subjective */}
            <div className="p-4 rounded-2xl bg-slate-900/50 print:bg-white border border-slate-800 print:border-slate-300 space-y-1.5">
              <span className="font-black text-cyan-400 print:text-blue-700 uppercase tracking-wider text-[11px] block">
                [S] Subjective Findings
              </span>
              <p className="text-slate-200 print:text-slate-800 leading-relaxed font-medium">
                {note.subjective}
              </p>
            </div>

            {/* [O] Objective */}
            <div className="p-4 rounded-2xl bg-slate-900/50 print:bg-white border border-slate-800 print:border-slate-300 space-y-1.5">
              <span className="font-black text-cyan-400 print:text-blue-700 uppercase tracking-wider text-[11px] block">
                [O] Objective Telemetry & Biomarkers
              </span>
              <p className="text-slate-200 print:text-slate-800 font-mono leading-relaxed">
                {note.objective}
              </p>
            </div>

            {/* [A] Assessment */}
            <div className="p-4 rounded-2xl bg-slate-900/50 print:bg-white border border-slate-800 print:border-slate-300 space-y-1.5">
              <span className="font-black text-purple-400 print:text-purple-700 uppercase tracking-wider text-[11px] block">
                [A] Assessment & XAI Deterioration Diagnosis
              </span>
              <p className="text-slate-200 print:text-slate-800 leading-relaxed font-medium">
                {note.assessment}
              </p>
            </div>

            {/* [P] Plan & Physician Orders */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 print:bg-emerald-50 border border-emerald-500/40 print:border-emerald-300 space-y-1.5 shadow-glow-cyan">
              <span className="font-black text-emerald-400 print:text-emerald-800 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>[P] Actionable Clinical Plan & Physician Orders</span>
              </span>
              <pre className="text-slate-100 print:text-slate-800 font-sans whitespace-pre-line leading-relaxed text-xs font-medium">
                {note.plan}
              </pre>
            </div>

          </div>

          {/* Legal / Clinical Sign-off Footer */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-400 print:border-black/20">
            <span>Signed electronically by: <strong>{patient.attendingPhysician}</strong></span>
            <span className="text-cyan-400">BioPulse Sentinel AI Clinical CDSS v4.2 • HIPAA Verified</span>
          </div>

        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 z-20 px-4 sm:px-6 py-3 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex items-center justify-between shrink-0 print:hidden">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Close / Return</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-all shadow-glow-cyan"
            >
              <Printer className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
