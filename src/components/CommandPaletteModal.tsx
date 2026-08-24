import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Activity, 
  Heart, 
  Stethoscope, 
  Users, 
  Pill, 
  Calendar, 
  FileText, 
  Brain, 
  Layers, 
  Dna, 
  FlaskConical, 
  Flame, 
  BedDouble, 
  QrCode, 
  Globe, 
  Database, 
  UserPlus, 
  Cloud,
  Command,
  ArrowRight,
  Sparkles,
  Barcode
} from 'lucide-react';
import { FigmaIcon } from './ui/FigmaIcon';
import { TabType, PatientProfile } from '../types/biotech';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType) => void;
  onSelectPatient: (patient: PatientProfile) => void;
  patients: PatientProfile[];
  onOpenRegister?: () => void;
  onOpenNotes?: () => void;
  onOpenDatabase?: () => void;
  onOpenFigma?: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Patients' | 'Clinical Actions';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onSelectPatient,
  patients,
  onOpenRegister,
  onOpenNotes,
  onOpenDatabase,
  onOpenFigma
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const allItems: CommandItem[] = [
    // Navigation Modules
    { id: 'nav-healthadmin', category: 'Navigation', title: 'Health Admin & Operations Console', subtitle: 'Ward stability trends, live triage distribution, OR calendar & radar performance', icon: <Activity className="h-4 w-4 text-cyan-400" />, action: () => onSelectTab('health_admin') },
    { id: 'nav-census', category: 'Navigation', title: 'Hospital Census & Triage Hub', subtitle: 'View inpatient census, bed occupancy, and NEWS2 acuity levels', icon: <Activity className="h-4 w-4 text-sky-400" />, action: () => onSelectTab('command_center') },
    { id: 'nav-telemetry', category: 'Navigation', title: 'Bedside Telemetry & Vitals Monitor', subtitle: 'Real-time Lead II ECG, SpO2 plethysmography, and trends', icon: <Heart className="h-4 w-4 text-rose-400" />, action: () => onSelectTab('patient_monitor') },
    { id: 'nav-physician', category: 'Navigation', title: 'Physician Workstation & SOAP Notes', subtitle: 'Multi-organ physiological evaluation and clinical documentation', icon: <Stethoscope className="h-4 w-4 text-sky-400" />, action: () => onSelectTab('whole_body') },
    { id: 'nav-emar', category: 'Navigation', title: 'Nurse eMAR & Medication Schedule', subtitle: 'Electronic Medication Administration Record barcode checks', icon: <Users className="h-4 w-4 text-emerald-400" />, action: () => onSelectTab('nurse_emar') },
    { id: 'nav-pharmacy', category: 'Navigation', title: 'Hospital Pharmacy & Rx Vault', subtitle: 'FHIR medication orders and MedGuard safety screening', icon: <Pill className="h-4 w-4 text-sky-400" />, action: () => onSelectTab('prescription_vault') },
    { id: 'nav-scheduling', category: 'Navigation', title: 'Outpatient Clinic & Telehealth Scheduling', subtitle: 'Book specialist appointments and teleconsult video sessions', icon: <Calendar className="h-4 w-4 text-purple-400" />, action: () => onSelectTab('appointments') },
    { id: 'nav-pacs', category: 'Navigation', title: 'Diagnostic Imaging (DICOM / PACS) & Labs', subtitle: 'Multi-slice radiological viewer, CT/MRI series, pathology', icon: <FileText className="h-4 w-4 text-sky-400" />, action: () => onSelectTab('hospital_reports') },
    { id: 'nav-anatomy', category: 'Navigation', title: '3D Anatomy Digital Twin Explorer', subtitle: 'Multi-scale organ dissection and physiological telemetry overlay', icon: <Brain className="h-4 w-4 text-cyan-400" />, action: () => onSelectTab('nova_anatomy_twin') },
    { id: 'nav-alphafold', category: 'Navigation', title: 'AlphaFold 3D Molecular Viewer', subtitle: '3D protein structural exploration, pLDDT confidence metrics', icon: <Layers className="h-4 w-4 text-purple-400" />, action: () => onSelectTab('structure3d') },
    { id: 'nav-genomics', category: 'Navigation', title: 'Genomic Variant & Mutation Engine', subtitle: 'Variant pathogenicity scoring and transcript effect predictor', icon: <Dna className="h-4 w-4 text-emerald-400" />, action: () => onSelectTab('variant') },
    { id: 'nav-zebra', category: 'Navigation', title: 'Zebra Healthcare (PPID & RFID Suite)', subtitle: 'TC52-HC laser scanner, ZD510-HC wristband printer, RTLS asset tracking', icon: <Barcode className="h-4 w-4 text-amber-400" />, action: () => onSelectTab('zebra_healthcare') },
    { id: 'nav-trauma', category: 'Navigation', title: 'Trauma Emergency SOS Dispatch', subtitle: 'Ambulance telemetry tracking, ETA countdowns, and trauma bay triage', icon: <Flame className="h-4 w-4 text-rose-500" />, action: () => onSelectTab('nova_rescue') },

    // Clinical & Design Actions
    { id: 'act-figma', category: 'Clinical Actions', title: 'Connect Figma & Google Stitch Design System', subtitle: 'Sync live design tokens, preview Figma canvas, and generate React code', icon: <FigmaIcon className="h-4 w-4" />, action: () => onOpenFigma?.() },
    { id: 'act-admit', category: 'Clinical Actions', title: '+ Admit New Inpatient', subtitle: 'Open multi-parameter patient registration wizard', icon: <UserPlus className="h-4 w-4 text-sky-400" />, action: () => onOpenRegister?.() },
    { id: 'act-soap', category: 'Clinical Actions', title: 'Write & Sign Clinical SOAP Note', subtitle: 'Create Subjective, Objective, Assessment, and Plan note', icon: <FileText className="h-4 w-4 text-emerald-400" />, action: () => onOpenNotes?.() },
    { id: 'act-db', category: 'Clinical Actions', title: 'Open Clinical Database Studio', subtitle: 'Inspect PostgreSQL tables and sync with Supabase Cloud', icon: <Database className="h-4 w-4 text-cyan-400" />, action: () => onOpenDatabase?.() },

    // Patient Profiles
    ...patients.map((p) => ({
      id: `pat-${p.id}`,
      category: 'Patients' as const,
      title: `${p.name} (${p.mrn})`,
      subtitle: `${p.bedLocation} • ${p.primaryDiagnosis} • Triage: ${p.riskAssessment.riskLevel}`,
      icon: <BedDouble className="h-4 w-4 text-slate-400" />,
      action: () => {
        onSelectPatient(p);
        onSelectTab('patient_monitor');
      }
    }))
  ];

  const filtered = allItems.filter(item => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-16 sm:pt-24 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-[#0b101d] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#0e1424]">
              <Search className="h-4 w-4 text-sky-400 shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command, patient MRN, or clinical module..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none font-medium"
              />
              <div className="flex items-center space-x-1 text-[10px] font-mono bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400 shrink-0">
                <span>ESC</span>
              </div>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-slate-800/40">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 font-mono">
                  No matching clinical modules or patient records found for "{search}".
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-sky-950/70 border border-sky-800/80 text-white' 
                          : 'hover:bg-slate-900/60 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          isSelected ? 'bg-sky-900/80 text-white' : 'bg-slate-900 text-slate-400'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white truncate">{item.title}</span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                              {item.category}
                            </span>
                          </div>
                          {item.subtitle && (
                            <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <ArrowRight className={`h-3.5 w-3.5 shrink-0 ml-2 ${
                        isSelected ? 'text-sky-400 opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="px-4 py-2 border-t border-slate-800/80 bg-[#080d17] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <kbd className="px-1 py-0.2 bg-slate-900 border border-slate-800 rounded text-[10px]">↑</kbd>
                  <kbd className="px-1 py-0.2 bg-slate-900 border border-slate-800 rounded text-[10px]">↓</kbd>
                  <span>Navigate</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <kbd className="px-1 py-0.2 bg-slate-900 border border-slate-800 rounded text-[10px]">↵</kbd>
                  <span>Select</span>
                </span>
              </div>
              <span className="text-slate-400">{filtered.length} items</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
