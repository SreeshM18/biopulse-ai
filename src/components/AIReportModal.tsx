import React, { useEffect } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Dna, 
  FileText, 
  Award,
  Building2,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PatientCaseStudy } from '../types/biotech';

interface AIReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: PatientCaseStudy;
}

export const AIReportModal: React.FC<AIReportModalProps> = ({
  isOpen,
  onClose,
  caseStudy
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyJson = () => {
    const reportData = {
      reportId: `MEN-${Math.floor(100000 + Math.random() * 900000)}`,
      generatedAt: new Date().toISOString(),
      patientCase: caseStudy,
      platform: 'Mentack AI Precision Oncology Suite v2.4'
    };
    navigator.clipboard.writeText(JSON.stringify(reportData, null, 2));
    alert('JSON Clinical Report copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-[#090e1d] print:bg-white text-slate-100 print:text-black border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none">
        
        {/* Top Control Bar (Hidden on Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800 print:hidden">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-sm text-white">
              AI Precision Oncology Molecular Tumor Board Report
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyJson}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy JSON</span>
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

        {/* Printable Report Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header Institutional Banner */}
          <div className="border-b border-slate-800 print:border-black/20 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Dna className="w-6 h-6 text-cyan-400 print:text-blue-600" />
                <h1 className="text-2xl font-black tracking-tight text-white print:text-black">
                  Mentack AI Clinical Genomic Dossier
                </h1>
              </div>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1 font-mono">
                Molecular Tumor Board Decision Support & In-Silico Structural Therapeutics
              </p>
            </div>

            <div className="text-right text-xs font-mono space-y-0.5">
              <p className="text-slate-400 print:text-slate-600">Report ID: <strong className="text-cyan-300 print:text-blue-600">MEN-ONCO-2026-991</strong></p>
              <p className="text-slate-400 print:text-slate-600">Date: {new Date().toLocaleDateString()}</p>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 print:bg-green-100 print:text-green-800 border border-emerald-500/40">
                CLINICAL GRADE LEVEL 1/2
              </span>
            </div>
          </div>

          {/* Patient Demographics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/60 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
            <div>
              <span className="text-slate-400 print:text-slate-500 uppercase font-bold text-[10px]">Patient Code</span>
              <div className="font-mono font-extrabold text-white print:text-black mt-0.5">{caseStudy.caseCode}</div>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-500 uppercase font-bold text-[10px]">Age / Gender</span>
              <div className="font-extrabold text-white print:text-black mt-0.5">{caseStudy.patientAge} y/o • {caseStudy.patientGender}</div>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-500 uppercase font-bold text-[10px]">Primary Diagnosis</span>
              <div className="font-extrabold text-white print:text-black mt-0.5">{caseStudy.diagnosis}</div>
            </div>
            <div>
              <span className="text-slate-400 print:text-slate-500 uppercase font-bold text-[10px]">Tumor Stage</span>
              <div className="font-extrabold text-white print:text-black mt-0.5">{caseStudy.stage}</div>
            </div>
          </div>

          {/* Genomic Biomarker Profile */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-cyan-400 print:text-blue-600 flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Identified Pathogenic Alterations & Structural Impact</span>
            </h3>

            <div className="p-4 rounded-2xl bg-slate-900/40 print:bg-white border border-slate-800 print:border-slate-300 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-lg text-sm font-extrabold bg-cyan-950 text-cyan-300 print:bg-blue-100 print:text-blue-900 border border-cyan-500/40 font-mono">
                    {caseStudy.primaryGene} {caseStudy.primaryVariant}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-300 print:bg-red-100 print:text-red-800 border border-rose-500/40">
                    Pathogenic Driver
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400 print:text-slate-600">
                  AlphaFold Pocket: Residue #{caseStudy.proteinResidue} • PDB: {caseStudy.pdbId}
                </span>
              </div>

              <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed">
                {caseStudy.executiveSummary}
              </p>
            </div>
          </div>

          {/* Recommended vs Contraindicated Therapeutics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Recommended */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 print:bg-emerald-50 border border-emerald-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-400 print:text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Actionable / Sensitive Therapies</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200 print:text-slate-800">
                {caseStudy.recommendedDrugs.map((drug, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-semibold">{drug}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contraindicated */}
            <div className="p-4 rounded-2xl bg-rose-950/20 print:bg-rose-50 border border-rose-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-rose-400 print:text-rose-800 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Contraindicated / Resistant Regimens</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200 print:text-slate-800">
                {caseStudy.contraindicatedDrugs.map((drug, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{drug}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Matched Precision Clinical Trials */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 print:text-slate-700">
              Matched Active Interventional Clinical Trials
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 text-xs font-mono text-cyan-300 print:text-blue-700">
              Priority Clinical Protocol: {caseStudy.matchedTrialIds.join(', ')} — Global Multi-Center Enrollment
            </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-4 border-t border-slate-800 print:border-slate-300 text-[10px] text-slate-500 print:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Synthesized autonomously by Mentack AI Diagnostic Architecture.</span>
            <span>Intended for Molecular Tumor Boards & Clinical Research.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
