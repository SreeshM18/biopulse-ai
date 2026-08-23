import React, { useState } from 'react';
import { 
  Building2, 
  UploadCloud, 
  FileText, 
  Plus, 
  ShieldCheck, 
  Pill, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Image as ImageIcon, 
  Calendar, 
  User, 
  FilePlus2,
  Sparkles,
  Zap
} from 'lucide-react';
import { PatientProfile, MedicalReport, PrescriptionRecord } from '../types/biotech';
import { INITIAL_MEDICAL_REPORTS } from '../data/hospitalReports';

interface HospitalReportsManagerProps {
  patient: PatientProfile;
  onAddPrescription?: (newRx: PrescriptionRecord) => void;
}

export const HospitalReportsManager: React.FC<HospitalReportsManagerProps> = ({
  patient,
  onAddPrescription
}) => {
  const [reports, setReports] = useState<MedicalReport[]>(INITIAL_MEDICAL_REPORTS);
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(INITIAL_MEDICAL_REPORTS[0]);
  
  // Upload Report Modal
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [repTitle, setRepTitle] = useState<string>('Chest X-Ray (Post-Resuscitation Review)');
  const [repCategory, setRepCategory] = useState<'X-Ray Imaging' | 'CT Scan' | 'MRI Neuro' | 'Lab Panel' | 'Pathology / Biopsy'>('X-Ray Imaging');
  const [repDepartment, setRepDepartment] = useState<string>('Emergency Radiology');
  const [repFindings, setRepFindings] = useState<string>('Moderate improvement in aerated lung fields following High-Flow Oxygen initiation. Persistent left lower consolidation.');
  const [repAiImpression, setRepAiImpression] = useState<string>('Positive clinical trajectory post-oxygenation. Residual pneumonia requiring completion of antibiotic course.');
  const [repStatus, setRepStatus] = useState<'Critical Alert' | 'Abnormal' | 'Normal / Verified'>('Abnormal');

  // Issue Prescription Modal
  const [isPrescribing, setIsPrescribing] = useState<boolean>(false);
  const [rxDrug, setRxDrug] = useState<string>('Cefepime IV');
  const [rxDosage, setRxDosage] = useState<string>('2g IV every 8 hours');
  const [rxFrequency, setRxFrequency] = useState<string>('IV Infusion over 30 mins');
  const [rxHospital, setRxHospital] = useState<string>('Memorial Central Hospital');
  const [rxDoctor, setRxDoctor] = useState<string>('Dr. Sarah Lin, MD');

  const handleUploadReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newRep: MedicalReport = {
      id: `rep-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      title: repTitle,
      category: repCategory,
      hospitalDepartment: repDepartment,
      uploadedBy: 'Hospital Lab Staff',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      findings: repFindings,
      aiImpression: repAiImpression,
      status: repStatus,
      previewImageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
    };
    setReports(prev => [newRep, ...prev]);
    setSelectedReport(newRep);
    setIsUploading(false);
  };

  const handleIssueRx = (e: React.FormEvent) => {
    e.preventDefault();
    const newRx: PrescriptionRecord = {
      id: `rx-${Date.now()}`,
      drugName: rxDrug,
      dosage: rxDosage,
      frequency: rxFrequency,
      prescribedHospital: rxHospital,
      prescribingDoctor: rxDoctor,
      prescribedDate: new Date().toISOString().substring(0, 10),
      status: 'Active',
      isDuplicateOrHazard: false,
      refillDueDays: 14,
      adherenceRate: 100,
      digitalSignature: `SIG-VERIFIED-${rxHospital.substring(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
    };

    if (onAddPrescription) {
      onAddPrescription(newRx);
    }
    setIsPrescribing(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                Hospital & Diagnostic Lab Portal
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">
                ABDM & PACS DICOM Cloud Connected
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Building2 className="w-6 h-6 text-purple-400" />
              <span>Diagnostic Imaging, Lab Reports & Prescription Issuance</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Hospital radiology PACS, pathology lab uploads, and digital prescription issuance for <strong>{patient.name}</strong> ({patient.bedLocation}).
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsUploading(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-purple transition-all"
            >
              <UploadCloud className="w-4 h-4" />
              <span>+ Upload X-Ray / Lab Report</span>
            </button>

            <button
              onClick={() => setIsPrescribing(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-cyan transition-all"
            >
              <Pill className="w-4 h-4" />
              <span>+ Issue New Prescription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Reports List + Detailed Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: Reports List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-purple-400" />
                <span>Diagnostic & Imaging Feed</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {reports.length} Reports
              </span>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1 no-scrollbar">
              {reports.map((rep) => {
                const isSelected = selectedReport?.id === rep.id;
                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReport(rep)}
                    className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-purple-400 shadow-glow-purple'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <span className="text-[10px] font-mono text-purple-300 font-bold uppercase block">
                          {rep.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-white">
                          {rep.title}
                        </h4>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rep.status === 'Critical Alert' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                        rep.status === 'Abnormal' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {rep.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-800">
                      <span>{rep.hospitalDepartment}</span>
                      <span>{rep.timestamp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Detailed Report Preview & AI Impression */}
        <div className="lg:col-span-7 space-y-4">
          {selectedReport ? (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-300 font-bold">{selectedReport.category}</span>
                  <h3 className="text-lg font-black text-white">{selectedReport.title}</h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Uploaded by {selectedReport.uploadedBy} • {selectedReport.timestamp}
                  </span>
                </div>

                <span className={`self-start sm:self-auto px-3 py-1 rounded-xl text-xs font-extrabold border ${
                  selectedReport.status === 'Critical Alert' ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' :
                  selectedReport.status === 'Abnormal' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {selectedReport.status}
                </span>
              </div>

              {/* Image Preview if Available */}
              {selectedReport.previewImageUrl && (
                <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <img
                    src={selectedReport.previewImageUrl}
                    alt={selectedReport.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
                    PACS DICOM High-Resolution Radiology Viewer
                  </div>
                </div>
              )}

              {/* Findings Section */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Radiologist / Pathologist Clinical Findings:
                </span>
                <p className="text-xs text-slate-200 bg-slate-950/80 p-4 rounded-xl border border-slate-800 leading-relaxed font-mono">
                  {selectedReport.findings}
                </p>
              </div>

              {/* AI Diagnostic Impression */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/40 space-y-1.5">
                <div className="flex items-center space-x-2 text-purple-300 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>AI Computer-Vision & Diagnostic Inference:</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedReport.aiImpression}
                </p>
              </div>

            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center text-slate-400">
              Select a report from the left to view details.
            </div>
          )}
        </div>

      </div>

      {/* Upload Report Modal */}
      {isUploading && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#090e1d] border border-purple-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <UploadCloud className="w-4 h-4 text-purple-400" />
                <span>Upload Diagnostic Imaging / Lab Report</span>
              </h4>
              <button onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleUploadReport} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Report Title</label>
                <input
                  type="text"
                  value={repTitle}
                  onChange={(e) => setRepTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Category</label>
                  <select
                    value={repCategory}
                    onChange={(e) => setRepCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="X-Ray Imaging">X-Ray Imaging</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="MRI Neuro">MRI Neuro</option>
                    <option value="Lab Panel">Lab Panel</option>
                    <option value="Pathology / Biopsy">Pathology / Biopsy</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Status</label>
                  <select
                    value={repStatus}
                    onChange={(e) => setRepStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Critical Alert">Critical Alert</option>
                    <option value="Abnormal">Abnormal</option>
                    <option value="Normal / Verified">Normal / Verified</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Clinical Findings</label>
                <textarea
                  rows={3}
                  value={repFindings}
                  onChange={(e) => setRepFindings(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">AI Diagnostic Impression</label>
                <input
                  type="text"
                  value={repAiImpression}
                  onChange={(e) => setRepAiImpression(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-glow-purple"
                >
                  Save & Publish to Patient EHR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Prescription Modal */}
      {isPrescribing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#090e1d] border border-emerald-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Pill className="w-4 h-4 text-emerald-400" />
                <span>Issue Digitally-Signed Prescription</span>
              </h4>
              <button onClick={() => setIsPrescribing(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleIssueRx} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Medication Name & Route</label>
                <input
                  type="text"
                  value={rxDrug}
                  onChange={(e) => setRxDrug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Dosage</label>
                  <input
                    type="text"
                    value={rxDosage}
                    onChange={(e) => setRxDosage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Frequency</label>
                  <input
                    type="text"
                    value={rxFrequency}
                    onChange={(e) => setRxFrequency(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase">Prescribing Hospital</label>
                <input
                  type="text"
                  value={rxHospital}
                  onChange={(e) => setRxHospital(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-[11px] text-emerald-300">
                ✓ Cryptographic Digital Signature will be generated and broadcast to the patient's portable health vault.
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsPrescribing(false)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-cyan"
                >
                  Sign & Dispense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
