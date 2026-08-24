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
  Search,
  Filter,
  Download,
  Check
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
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
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

  const filteredReports = reports.filter(r => {
    const matchesCat = categoryFilter === 'All' || r.category === categoryFilter;
    const matchesSearch = 
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.hospitalDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.findings.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
    <div className="space-y-5">
      
      {/* Header */}
      <div className="pro-card p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-sky-950 text-sky-400 border border-sky-800">
                DICOM / PACS Diagnostic Imaging & Labs
              </span>
              <span className="text-xs font-mono text-slate-400">
                Patient: <strong className="text-white">{patient.name}</strong> ({patient.mrn})
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <FileText className="h-5 w-5 text-sky-400" />
              <span>Diagnostic Imaging (DICOM) & Pathology Reports</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Integrated radiological PACS imaging, CT/MRI series, pathology biopsies, and AI diagnostic impression summaries.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsUploading(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-colors"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              <span>Upload Report / DICOM</span>
            </button>

            <button
              onClick={() => setIsPrescribing(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-medium transition-colors"
            >
              <Pill className="h-3.5 w-3.5 text-sky-400" />
              <span>Order Prescription</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upload Diagnostic Modal */}
      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="pro-card p-5 max-w-lg w-full space-y-4 border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Upload Diagnostic Study / PACS Imaging</h3>
              <button onClick={() => setIsUploading(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleUploadReport} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Study Title</label>
                <input
                  type="text"
                  value={repTitle}
                  onChange={(e) => setRepTitle(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Modality / Category</label>
                  <select
                    value={repCategory}
                    onChange={(e) => setRepCategory(e.target.value as any)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none"
                  >
                    <option value="X-Ray Imaging">X-Ray Imaging</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="MRI Neuro">MRI Neuro</option>
                    <option value="Lab Panel">Lab Panel</option>
                    <option value="Pathology / Biopsy">Pathology / Biopsy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Hospital Department</label>
                  <input
                    type="text"
                    value={repDepartment}
                    onChange={(e) => setRepDepartment(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Radiologist Clinical Findings</label>
                <textarea
                  rows={2}
                  value={repFindings}
                  onChange={(e) => setRepFindings(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">AI Diagnostic Impression</label>
                <textarea
                  rows={2}
                  value={repAiImpression}
                  onChange={(e) => setRepAiImpression(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none resize-none"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold"
                >
                  Upload Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Prescription Modal */}
      {isPrescribing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="pro-card p-5 max-w-md w-full space-y-4 border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Order Hospital Medication Regimen</h3>
              <button onClick={() => setIsPrescribing(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleIssueRx} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Drug Name & Generic</label>
                <input
                  type="text"
                  value={rxDrug}
                  onChange={(e) => setRxDrug(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none focus:border-sky-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Dosage</label>
                  <input
                    type="text"
                    value={rxDosage}
                    onChange={(e) => setRxDosage(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Frequency / Route</label>
                  <input
                    type="text"
                    value={rxFrequency}
                    onChange={(e) => setRxFrequency(e.target.value)}
                    className="w-full rounded-lg bg-slate-950 border border-slate-800 p-2 text-white outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPrescribing(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold"
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout: Reports List & Detailed PACS Study Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Reports List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="pro-card p-3 flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter reports..."
                className="w-full rounded bg-slate-900 border border-slate-800 pl-8 pr-2 py-1 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs px-2 py-1 outline-none cursor-pointer"
            >
              <option value="All">All Modalities</option>
              <option value="X-Ray Imaging">X-Ray</option>
              <option value="CT Scan">CT Scan</option>
              <option value="MRI Neuro">MRI</option>
              <option value="Lab Panel">Lab Panel</option>
            </select>
          </div>

          <div className="space-y-2">
            {filteredReports.map((rep) => {
              const isSelected = selectedReport?.id === rep.id;
              const isCritical = rep.status === 'Critical Alert';

              return (
                <div
                  key={rep.id}
                  onClick={() => setSelectedReport(rep)}
                  className={`pro-card-interactive p-3.5 cursor-pointer space-y-1.5 ${
                    isSelected ? 'border-sky-500 bg-sky-950/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{rep.title}</h4>
                      <span className="text-[11px] text-slate-400 font-medium">{rep.hospitalDepartment}</span>
                    </div>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase border ${
                      isCritical
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : rep.status === 'Abnormal'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {rep.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-300 line-clamp-2">
                    {rep.findings}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                    <span>{rep.timestamp}</span>
                    <span className="text-sky-400 font-semibold">{rep.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Diagnostic Study Detail & PACS Viewer (7 cols) */}
        {selectedReport ? (
          <div className="lg:col-span-7 space-y-4">
            <div className="pro-card p-5 space-y-4">
              
              {/* Study Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center space-x-2 mb-1 font-mono text-[11px]">
                    <span className="text-sky-400 font-bold">{selectedReport.category}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{selectedReport.hospitalDepartment}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{selectedReport.title}</h3>
                  <p className="text-xs text-slate-400">Timestamp: {selectedReport.timestamp} • Verified by Staff</p>
                </div>

                <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase border ${
                  selectedReport.status === 'Critical Alert'
                    ? 'bg-rose-950 text-rose-300 border-rose-800'
                    : selectedReport.status === 'Abnormal'
                    ? 'bg-amber-950 text-amber-300 border-amber-800'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  {selectedReport.status}
                </span>
              </div>

              {/* PACS / Imaging Preview (if available) */}
              {selectedReport.previewImageUrl && (
                <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                  <div className="p-2 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between bg-slate-900/60">
                    <span>DICOM Multi-Slice PACS Preview</span>
                    <span>Window/Level: 400/40 HU</span>
                  </div>
                  <img 
                    src={selectedReport.previewImageUrl} 
                    alt="Radiology Study"
                    className="w-full h-56 object-cover"
                  />
                </div>
              )}

              {/* Radiologist Clinical Findings */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                  Radiologist Clinical Findings
                </h4>
                <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedReport.findings}
                </div>
              </div>

              {/* AI Diagnostic Impression */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wide flex items-center space-x-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Computer-Aided Diagnostic Impression</span>
                </h4>
                <div className="p-3.5 rounded-lg bg-sky-950/20 border border-sky-800/40 text-xs text-sky-200 leading-relaxed">
                  {selectedReport.aiImpression}
                </div>
              </div>

              {/* Physician Verified Sign-off */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Verified Electronic Sign-off (Dr. Sarah Lin, MD)</span>
                </span>
                <span>Audit ID: PACS-2026-9842</span>
              </div>

            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 pro-card p-12 text-center text-slate-500 text-xs">
            Select a diagnostic study from the left to view full findings and PACS imaging.
          </div>
        )}

      </div>

    </div>
  );
};
