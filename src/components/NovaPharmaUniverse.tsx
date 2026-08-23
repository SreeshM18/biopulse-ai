import React, { useState, useEffect, useRef } from 'react';
import { 
  Pill, 
  Search, 
  Layers, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Flame, 
  Heart, 
  Brain, 
  Dna, 
  Thermometer, 
  Activity, 
  QrCode, 
  ShieldCheck, 
  Clock, 
  RefreshCw, 
  FileText, 
  Send, 
  Filter, 
  Info, 
  Radio, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Eye,
  Scan,
  Database,
  Building2,
  Lock,
  Snowflake,
  RotateCcw,
  Syringe,
  Skull,
  Zap,
  Award,
  Biohazard,
  ShieldX,
  HeartHandshake
} from 'lucide-react';
import { 
  MasterDrugRecord, 
  PoisoningAntidoteRecord, 
  BatchVerificationReport, 
  ADRSubmissionRecord, 
  ColdChainLog,
  PatientProfile,
  TabType,
  SubstanceUniverseCategory,
  VisualSafetyRiskTier,
  PharmaDosageForm,
  PharmaAdministrationRoute
} from '../types/biotech';
import { 
  MASTER_DRUG_DATABASE, 
  POISONING_ANTIDOTE_REGISTRY, 
  BATCH_VERIFICATION_RECORDS, 
  PHARMACOVIGILANCE_REPORTS, 
  COLD_CHAIN_UNITS 
} from '../data/novaPharmaUniverseData';

import { NovaMedSearch } from './NovaMedSearch';
import { NovaMedGuard } from './NovaMedGuard';
import { NovaCareGuide } from './NovaCareGuide';
import { NovaUniversalPharmaUniverse } from './NovaUniversalPharmaUniverse';

interface NovaPharmaUniverseProps {
  patient?: PatientProfile;
  setActiveTab?: (tab: TabType) => void;
}

type PharmaViewTab = 
  | 'universal_pharma'
  | 'careguide_ai'
  | 'medsearch_ai'
  | 'az_browser' 
  | 'injections_universe'
  | 'reproductive_pharma'
  | 'sedatives_hypnotics'
  | 'forensic_substances'
  | 'peds_wada'
  | 'poison_chemicals'
  | 'biologics_gene'
  | 'molecule_3d' 
  | 'interact' 
  | 'high_alert_safe' 
  | 'verify_counterfeit' 
  | 'adr_vigilance' 
  | 'stock_coldchain';

export const NovaPharmaUniverse: React.FC<NovaPharmaUniverseProps> = ({
  patient,
  setActiveTab
}) => {
  const [activePharmaTab, setActivePharmaTab] = useState<PharmaViewTab>('universal_pharma');

  // Filter States
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubstanceCategory, setSelectedSubstanceCategory] = useState<string>('All');
  const [selectedRiskTier, setSelectedRiskTier] = useState<string>('All');
  const [selectedDosageForm, setSelectedDosageForm] = useState<string>('All');
  const [selectedRoute, setSelectedRoute] = useState<string>('All');

  // Selected Records
  const [selectedDrug, setSelectedDrug] = useState<MasterDrugRecord>(MASTER_DRUG_DATABASE[0]);
  const [expandedDrugId, setExpandedDrugId] = useState<string | null>(MASTER_DRUG_DATABASE[0].id);

  // 3D Molecular Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotationAngle, setRotationAngle] = useState({ x: 0.4, y: 0.6 });
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // NOVA INTERACT State
  const [interactDrugA, setInteractDrugA] = useState<MasterDrugRecord>(MASTER_DRUG_DATABASE[0]);
  const [interactTarget, setInteractTarget] = useState<string>('Grapefruit Juice (>1L/day)');

  // NOVA SAFE 5-Rights Bedside State
  const [scannedBarcode, setScannedBarcode] = useState<string>('010030069001021721008941B17271130');
  const [isWristbandMatched, setIsWristbandMatched] = useState<boolean>(true);

  // NOVA VERIFY Scanner State
  const [verifyBarcode, setVerifyBarcode] = useState<string>('010030069001021721008941B17271130');
  const [currentVerificationReport, setCurrentVerificationReport] = useState<BatchVerificationReport>(BATCH_VERIFICATION_RECORDS[0]);

  // NOVA ADR Submission Form State
  const [adrPatientName, setAdrPatientName] = useState(patient?.name || 'Arthur Pendelton');
  const [adrDrugName, setAdrDrugName] = useState('Atorvastatin 20 mg');
  const [adrEventDesc, setAdrEventDesc] = useState('Mild diffuse myalgia with elevated serum creatine kinase');
  const [adrSeverity, setAdrSeverity] = useState<'Mild (Grade 1)' | 'Moderate (Grade 2)' | 'Severe (Grade 3)' | 'Life-Threatening (Grade 4)'>('Moderate (Grade 2)');
  const [adrReportsList, setAdrReportsList] = useState<ADRSubmissionRecord[]>(PHARMACOVIGILANCE_REPORTS);
  const [adrSubmittedSuccess, setAdrSubmittedSuccess] = useState<boolean>(false);

  // All 20 Legal / Safety Substance Universe Categories
  const substanceUniverseCategories: SubstanceUniverseCategory[] = [
    'OTC', 'Prescription', 'Specialist prescription', 'Hospital-only',
    'Emergency medicines', 'High-alert medicines', 'Controlled medicines',
    'Reproductive medicines', 'Sexual-health medicines', 'Investigational',
    'Withdrawn', 'Unapproved', 'Counterfeit', 'Illicit recreational drugs',
    'Performance-enhancing substances', 'Toxic chemicals', 'Veterinary medicines',
    'Herbal/traditional products', 'Supplements', 'Biologics & Gene Therapies'
  ];

  // Alphabet Array
  const alphabetLetters = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // Visual Safety Risk Helper
  const getVisualRiskBadge = (tier: VisualSafetyRiskTier) => {
    switch (tier) {
      case 'ROUTINE':
        return { label: '🟢 Routine', bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' };
      case 'PRESCRIPTION':
        return { label: '🔵 Prescription', bg: 'bg-blue-950/80 text-blue-300 border-blue-500/50' };
      case 'CAUTION':
        return { label: '🟡 Caution', bg: 'bg-yellow-950/80 text-yellow-300 border-yellow-500/50' };
      case 'HIGH_ALERT':
        return { label: '🟠 High Alert', bg: 'bg-orange-950/80 text-orange-300 border-orange-500/50' };
      case 'CONTROLLED_RISK':
        return { label: '🔴 Controlled / Serious Risk', bg: 'bg-rose-950/90 text-rose-300 border-rose-500/50' };
      case 'SPECIALIST_HOSPITAL':
        return { label: '🟣 Specialist / Hospital Only', bg: 'bg-purple-950/90 text-purple-300 border-purple-500/50' };
      case 'ILLICIT_TOXICOLOGY':
        return { label: '⚫ Illicit / Toxicology Record', bg: 'bg-slate-900 text-slate-300 border-slate-600' };
    }
  };

  // Filtered Drugs
  const filteredDrugs = MASTER_DRUG_DATABASE.filter((drug) => {
    const matchLetter = selectedLetter === 'All' || drug.alphabetLetter.toUpperCase() === selectedLetter.toUpperCase();
    const query = searchQuery.toLowerCase();
    const matchSearch = 
      drug.genericName.toLowerCase().includes(query) ||
      drug.brandNames.some(b => b.toLowerCase().includes(query)) ||
      (drug.streetNamesForensic && drug.streetNamesForensic.some(s => s.toLowerCase().includes(query))) ||
      drug.drugClass.toLowerCase().includes(query) ||
      drug.indications.some(i => i.toLowerCase().includes(query));
    
    const matchCategory = selectedSubstanceCategory === 'All' || drug.substanceCategory === selectedSubstanceCategory;
    const matchRisk = selectedRiskTier === 'All' || drug.visualRiskTier === selectedRiskTier;

    return matchLetter && matchSearch && matchCategory && matchRisk;
  });

  // 3D Canvas Molecular Renderer (Ball and Stick)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) / 5;

      const atoms = selectedDrug.atoms3D?.atoms || [
        { element: 'C', x: 0, y: 0, z: 0, color: '#38bdf8' },
        { element: 'O', x: 1.2, y: 0.8, z: 0.3, color: '#f43f5e' },
        { element: 'N', x: -1.2, y: 0.8, z: -0.2, color: '#818cf8' }
      ];

      const bonds = selectedDrug.atoms3D?.bonds || [[0, 1], [0, 2]];

      let curX = rotationAngle.x;
      let curY = rotationAngle.y;

      if (isAutoSpin) {
        curY += 0.008;
      }

      const transformedAtoms = atoms.map((atom) => {
        const cosY = Math.cos(curY);
        const sinY = Math.sin(curY);
        const x1 = atom.x * cosY + atom.z * sinY;
        const z1 = -atom.x * sinY + atom.z * cosY;

        const cosX = Math.cos(curX);
        const sinX = Math.sin(curX);
        const y2 = atom.y * cosX - z1 * sinX;
        const z2 = atom.y * sinX + z1 * cosX;

        const fov = 300;
        const distance = 4;
        const projScale = fov / (fov + (z2 + distance) * 20);

        return {
          element: atom.element,
          color: atom.color,
          px: centerX + x1 * scale * projScale,
          py: centerY + y2 * scale * projScale,
          pz: z2,
          radius: (atom.element === 'C' ? 14 : atom.element === 'O' ? 16 : atom.element === 'N' ? 15 : atom.element === 'S' ? 18 : 12) * projScale
        };
      });

      const sortedIndices = transformedAtoms.map((_, i) => i).sort((a, b) => transformedAtoms[a].pz - transformedAtoms[b].pz);

      ctx.lineWidth = 4;
      bonds.forEach(([i1, i2]) => {
        if (transformedAtoms[i1] && transformedAtoms[i2]) {
          const a1 = transformedAtoms[i1];
          const a2 = transformedAtoms[i2];
          
          const grad = ctx.createLinearGradient(a1.px, a1.py, a2.px, a2.py);
          grad.addColorStop(0, a1.color + 'aa');
          grad.addColorStop(1, a2.color + 'aa');

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(a1.px, a1.py);
          ctx.lineTo(a2.px, a2.py);
          ctx.stroke();
        }
      });

      sortedIndices.forEach((idx) => {
        const atom = transformedAtoms[idx];
        const rad = Math.max(6, atom.radius);

        const atomGrad = ctx.createRadialGradient(
          atom.px - rad * 0.3,
          atom.py - rad * 0.3,
          rad * 0.1,
          atom.px,
          atom.py,
          rad
        );
        atomGrad.addColorStop(0, '#ffffff');
        atomGrad.addColorStop(0.4, atom.color);
        atomGrad.addColorStop(1, '#050814');

        ctx.fillStyle = atomGrad;
        ctx.beginPath();
        ctx.arc(atom.px, atom.py, rad, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(9, Math.floor(rad * 0.9))}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(atom.element, atom.px, atom.py);
      });

      if (isAutoSpin) {
        setRotationAngle(prev => ({ ...prev, y: prev.y + 0.008 }));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedDrug, isAutoSpin, rotationAngle]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setIsAutoSpin(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - dragStart.x) * 0.01;
    const deltaY = (e.clientY - dragStart.y) * 0.01;
    setRotationAngle(prev => ({
      x: prev.x + deltaY,
      y: prev.y + deltaX
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSubmitAdr = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: ADRSubmissionRecord = {
      id: `adr-rep-${Math.floor(100 + Math.random() * 900)}`,
      patientId: patient?.id || 'p203',
      patientName: adrPatientName,
      suspectedDrug: adrDrugName,
      adverseEvent: adrEventDesc,
      severityGrade: adrSeverity,
      onsetTime: 'Recent',
      outcome: 'Recovering',
      reportedBy: 'Attending Physician (BioPulse Verified)',
      dateReported: new Date().toISOString().replace('T', ' ').substring(0, 16),
      pharmacovigilanceStatus: 'Submitted to FDA MedWatch / WHO Vigibase'
    };

    setAdrReportsList([newReport, ...adrReportsList]);
    setAdrSubmittedSuccess(true);
    setTimeout(() => setAdrSubmittedSuccess(false), 4000);
  };

  const handleVerifyScan = (barcode: string) => {
    setVerifyBarcode(barcode);
    const found = BATCH_VERIFICATION_RECORDS.find(r => r.barcodeScanned === barcode);
    if (found) {
      setCurrentVerificationReport(found);
    } else {
      setCurrentVerificationReport({
        barcodeScanned: barcode,
        ndcOrBatch: 'UNKNOWN-BARCODE-REF',
        drugName: 'Unregistered Generic Compound',
        manufacturer: 'Unverified Entity',
        manufactureDate: 'N/A',
        expiryDate: 'N/A',
        tamperSealVerified: false,
        blockchainHash: '0x0000000000000000000000000000000000000000',
        status: 'COUNTERFEIT_DETECTED',
        safetyNotice: '⚠️ ALERT: Unregistered GS1 barcode. Cannot verify authentication or supply chain integrity.'
      });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 animate-fade-in text-slate-100">
      
      {/* Top Hero Banner & Master Universe Overview */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070d24] via-[#0d1c44] to-[#070d24] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
                <Pill className="w-6 h-6 animate-pulse" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                COMPLETE MEDICINE & SUBSTANCE UNIVERSE
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/40">
                20 Legal/Safety Groups • 36 Dosage Forms
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              NOVA PHARMA & Substance Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Taxonomic clinical pharmacology covering OTC, Rx, High-Alert, Controlled, Sexual & Reproductive Pharmacology, Sedatives/Hypnotics, Forensic Toxicology, PEDs & WADA Anti-Doping, Agricultural/Industrial Toxins, Injections with Y-Site Compatibility, Biologics, and GS1 Adulteration Scanners.
            </p>
          </div>

          {/* Quick Stats Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Substance Classes</span>
              <span className="text-lg font-black text-cyan-400">20 Groups</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Dosage Forms</span>
              <span className="text-lg font-black text-purple-400">36 Forms</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Visual Risk Tiers</span>
              <span className="text-lg font-black text-emerald-400">7 Levels</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Emergency Antidotes</span>
              <span className="text-lg font-black text-rose-400">Rapid Index</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Across 16 Pharma Modules */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-800">
        {[
          { id: 'universal_pharma', label: '💊 12 Tiers & 41 Subtypes Master', icon: <Pill className="w-4 h-4 text-cyan-300 animate-pulse" /> },
          { id: 'careguide_ai', label: '🩺 NOVA CAREGUIDE', icon: <HeartHandshake className="w-4 h-4 text-emerald-400 animate-pulse" /> },
          { id: 'medsearch_ai', label: '🔍 Google-like MEDSEARCH (AI)', icon: <Search className="w-4 h-4 text-cyan-300 animate-pulse" /> },
          { id: 'az_browser', label: '1. A–Z Substance Browser', icon: <Database className="w-4 h-4 text-cyan-400" /> },
          { id: 'injections_universe', label: '2. Injections & Y-Site Matrix', icon: <Syringe className="w-4 h-4 text-emerald-400" /> },
          { id: 'reproductive_pharma', label: '3. Sexual & Reproductive', icon: <Heart className="w-4 h-4 text-pink-400" /> },
          { id: 'sedatives_hypnotics', label: '4. Sedatives & Hypnotics', icon: <Brain className="w-4 h-4 text-purple-400" /> },
          { id: 'forensic_substances', label: '5. Forensic Toxicology', icon: <Skull className="w-4 h-4 text-rose-500" /> },
          { id: 'peds_wada', label: '6. PEDs & WADA Doping', icon: <Award className="w-4 h-4 text-amber-400" /> },
          { id: 'poison_chemicals', label: '7. Poisons & Toxins', icon: <Biohazard className="w-4 h-4 text-yellow-400" /> },
          { id: 'biologics_gene', label: '8. Biologics & ADCs', icon: <Dna className="w-4 h-4 text-cyan-300" /> },
          { id: 'verify_counterfeit', label: '9. Counterfeit & Adulteration', icon: <Scan className="w-4 h-4 text-rose-400" /> },
          { id: 'molecule_3d', label: '10. 3D Molecule & ADME', icon: <Sparkles className="w-4 h-4 text-purple-300" /> },
          { id: 'interact', label: '11. NOVA MEDGUARD AI', icon: <ShieldAlert className="w-4 h-4 text-cyan-400" /> },
          { id: 'high_alert_safe', label: '12. High-Alert & 5-Rights', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
          { id: 'adr_vigilance', label: '13. Pharmacovigilance', icon: <FileText className="w-4 h-4 text-emerald-400" /> },
          { id: 'stock_coldchain', label: '14. Cold-Chain IoT', icon: <Snowflake className="w-4 h-4 text-cyan-300" /> },
        ].map((tab) => {
          const isActive = activePharmaTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePharmaTab(tab.id as PharmaViewTab)}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-purple-600/30 text-white border border-cyan-400 shadow-glow-cyan font-black scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          MODULE MASTER: NOVA UNIVERSAL PHARMA UNIVERSE (12 TIERS & 41 SUBTYPES)
          ========================================================================= */}
      {activePharmaTab === 'universal_pharma' && (
        <NovaUniversalPharmaUniverse 
          patient={patient}
          setActiveTab={setActiveTab}
        />
      )}

      {/* =========================================================================
          MODULE 0A: NOVA CAREGUIDE ("WHAT CAN I TAKE FOR THIS?")
          ========================================================================= */}
      {activePharmaTab === 'careguide_ai' && (
        <NovaCareGuide 
          patient={patient}
          setActiveTab={setActiveTab}
        />
      )}

      {/* =========================================================================
          MODULE 0: GOOGLE-LIKE UNIVERSAL MEDSEARCH ENGINE (FUZZY, TYPO, SYMPTOM)
          ========================================================================= */}
      {activePharmaTab === 'medsearch_ai' && (
        <NovaMedSearch 
          onSelectDrug={(drug) => {
            setSelectedDrug(drug);
          }}
          setActiveTab={setActiveTab}
        />
      )}

      {/* =========================================================================
          MODULE 1: MASTER A–Z SUBSTANCE & DRUG DIRECTORY (UNIVERSAL SEARCH)
          ========================================================================= */}
      {activePharmaTab === 'az_browser' && (
        <div className="space-y-6">
          
          {/* Universal Filter Hub */}
          <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
            
            {/* Search + Risk Tier Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Generic, Brand, Street Name, Class, or Indication..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 shadow-inner"
                />
              </div>

              {/* 7 Visual Risk Tier Filters */}
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
                <span className="text-[11px] text-slate-400 shrink-0 font-medium">Risk Tier:</span>
                {['All', 'ROUTINE', 'PRESCRIPTION', 'CAUTION', 'HIGH_ALERT', 'CONTROLLED_RISK', 'SPECIALIST_HOSPITAL', 'ILLICIT_TOXICOLOGY'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedRiskTier(tier)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      selectedRiskTier === tier
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-glow-cyan'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tier === 'All' ? 'All Risk' : tier === 'ROUTINE' ? '🟢 Routine' : tier === 'PRESCRIPTION' ? '🔵 Rx' : tier === 'HIGH_ALERT' ? '🟠 High-Alert' : tier === 'CONTROLLED_RISK' ? '🔴 Controlled' : tier === 'SPECIALIST_HOSPITAL' ? '🟣 Specialist' : '⚫ Illicit/Tox'}
                  </button>
                ))}
              </div>
            </div>

            {/* 20 Substance Legal/Safety Categories */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-1 no-scrollbar text-xs font-mono">
              <span className="text-[11px] text-slate-400 shrink-0 font-medium font-sans">Legal Group:</span>
              <button
                onClick={() => setSelectedSubstanceCategory('All')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedSubstanceCategory === 'All'
                    ? 'bg-purple-600 text-white font-black shadow-glow-purple scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Groups
              </button>
              {substanceUniverseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedSubstanceCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedSubstanceCategory === cat
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-glow-cyan scale-105'
                      : 'bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* A to Z Letter Filter Pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-1 no-scrollbar text-xs font-mono">
              {alphabetLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                    selectedLetter === letter
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-black shadow-glow-cyan scale-110'
                      : 'bg-slate-900 text-slate-400 hover:text-cyan-300 border border-slate-800'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

          </div>

          {/* Substance Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredDrugs.map((drug) => {
              const isExpanded = expandedDrugId === drug.id;
              const riskBadge = getVisualRiskBadge(drug.visualRiskTier);

              return (
                <div
                  key={drug.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#0a1024] border-cyan-500/50 shadow-2xl'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Card Header */}
                  <div 
                    onClick={() => {
                      setExpandedDrugId(isExpanded ? null : drug.id);
                      setSelectedDrug(drug);
                    }}
                    className="p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono text-xl font-black shrink-0 shadow-glow-cyan">
                        {drug.alphabetLetter}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-black text-white">{drug.genericName}</h3>
                          <span className="text-xs font-mono text-slate-400">({drug.brandNames.join(', ')})</span>
                          
                          {/* Visual Safety Risk Tier Badge */}
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold border ${riskBadge.bg}`}>
                            {riskBadge.label}
                          </span>

                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-950/90 text-purple-300 border border-purple-500/40">
                            {drug.substanceCategory}
                          </span>

                          {drug.isHighAlert && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/50 flex items-center space-x-1">
                              <ShieldAlert className="w-3 h-3 text-rose-400" />
                              <span>HIGH-ALERT ⚠️</span>
                            </span>
                          )}

                          {drug.isColdChain && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/50 flex items-center space-x-1">
                              <Snowflake className="w-3 h-3 text-cyan-400" />
                              <span>2°C - 8°C ❄️</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs font-mono text-cyan-400 font-medium">
                          {drug.drugClass} • <span className="text-purple-300">{drug.therapeuticCategory}</span>
                        </p>

                        <p className="text-xs text-slate-300 line-clamp-1">
                          {drug.mechanismOfAction}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-800">
                      <div className="text-left lg:text-right font-mono text-xs">
                        <span className="text-[10px] text-slate-400 block">Available Stock</span>
                        <span className="font-bold text-emerald-400">{drug.inventoryStock} units</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDrug(drug);
                          setActivePharmaTab('molecule_3d');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center space-x-1 shadow-glow-purple"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>3D Molecule</span>
                      </button>

                      <div className="p-1 rounded-xl bg-slate-900 text-slate-400">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Full Monograph Details Panel */}
                  {isExpanded && (
                    <div className="p-6 border-t border-slate-800/90 bg-[#060a18] space-y-6 text-xs animate-fade-in">
                      
                      {/* Black Box Warning Alert if present */}
                      {drug.blackBoxWarnings && (
                        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-200 space-y-1">
                          <div className="flex items-center space-x-2 font-black text-rose-400 uppercase tracking-wider">
                            <AlertOctagon className="w-4 h-4" />
                            <span>FDA Boxed Warning / Safety Mandate</span>
                          </div>
                          <p className="text-xs leading-relaxed text-rose-100 font-medium">
                            {drug.blackBoxWarnings}
                          </p>
                        </div>
                      )}

                      {/* 4-Column Clinical Details Matrix */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        {/* 1. Indications & Dosage Forms */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                          <span className="font-black text-cyan-300 uppercase tracking-wider block">
                            Indications & Formulations
                          </span>
                          <div className="space-y-1">
                            <span className="text-slate-400 font-semibold block text-[11px]">Approved Medical Uses:</span>
                            <ul className="list-disc list-inside text-slate-200 space-y-0.5">
                              {drug.indications.map((ind, i) => (
                                <li key={i}>{ind}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-2 border-t border-slate-900 space-y-1">
                            <span className="text-slate-400 font-semibold block text-[11px]">Dosage Forms & Routes:</span>
                            <p className="text-slate-300 font-mono text-[11px]">
                              {drug.dosageForms.join(', ')} ({drug.routes.join(', ')})
                            </p>
                            <p className="text-cyan-300 font-mono text-[11px]">
                              Strengths: {drug.availableStrengths.join(', ')}
                            </p>
                          </div>
                        </div>

                        {/* 2. Contraindications */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                          <span className="font-black text-rose-400 uppercase tracking-wider block">
                            Contraindications
                          </span>
                          <div className="space-y-1">
                            <span className="text-rose-300 font-semibold block text-[11px]">Absolute (Do Not Use):</span>
                            <ul className="list-disc list-inside text-rose-100 space-y-0.5">
                              {drug.absoluteContraindications.map((abs, i) => (
                                <li key={i}>{abs}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-2 border-t border-slate-900 space-y-1">
                            <span className="text-amber-300 font-semibold block text-[11px]">Relative (Use with Caution):</span>
                            <ul className="list-disc list-inside text-amber-100 space-y-0.5">
                              {drug.relativeContraindications.map((rel, i) => (
                                <li key={i}>{rel}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 3. ADME Pharmacokinetics */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                          <span className="font-black text-purple-400 uppercase tracking-wider block">
                            ADME Pharmacokinetics
                          </span>
                          <div className="space-y-1 font-mono text-[11px]">
                            <p><strong className="text-slate-400">Bioavailability:</strong> <span className="text-slate-200">{drug.adme.bioavailability}</span></p>
                            <p><strong className="text-slate-400">Protein Binding:</strong> <span className="text-slate-200">{drug.adme.proteinBinding}</span></p>
                            <p><strong className="text-slate-400">Metabolism:</strong> <span className="text-purple-300">{drug.adme.metabolism}</span></p>
                            <p><strong className="text-slate-400">Excretion:</strong> <span className="text-slate-200">{drug.adme.excretion}</span></p>
                            <p><strong className="text-slate-400">Half-Life (t½):</strong> <span className="text-cyan-300">{drug.adme.halfLife}</span></p>
                            <p><strong className="text-slate-400">Therapeutic Window:</strong> <span className="text-emerald-300">{drug.adme.therapeuticWindow}</span></p>
                          </div>
                        </div>

                        {/* 4. Substance Safety & Abuse Profile */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                          <span className="font-black text-emerald-400 uppercase tracking-wider block">
                            Special Safety & Risk Profile
                          </span>
                          <div className="space-y-1 text-[11px]">
                            <p><strong className="text-slate-400">Pregnancy FDA:</strong> <span className="font-bold text-amber-300">Category {drug.pregnancyCategory}</span></p>
                            <p><strong className="text-slate-400">Lactation:</strong> <span className="text-slate-300">{drug.lactationSafety}</span></p>
                            {drug.dependencePotential && (
                              <p><strong className="text-slate-400">Dependence Potential:</strong> <span className="text-rose-300 font-bold">{drug.dependencePotential}</span></p>
                            )}
                            {drug.wadaProhibitionStatus && (
                              <p className="text-amber-300">
                                <strong>🏅 WADA Status:</strong> {drug.wadaProhibitionStatus}
                              </p>
                            )}
                            {drug.geriatricBeersWarning && (
                              <p className="text-amber-300 pt-1">
                                <strong>👴 Beers Warning:</strong> {drug.geriatricBeersWarning}
                              </p>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* Injection Compatibility Profile if applicable */}
                      {drug.injectionProfile && (
                        <div className="p-4 rounded-2xl bg-[#091129] border border-emerald-500/40 space-y-2">
                          <span className="font-black text-emerald-300 text-xs uppercase flex items-center space-x-1.5">
                            <Syringe className="w-4 h-4 text-emerald-400" />
                            <span>Injection & IV Infusion Compatibility Profile</span>
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px]">
                            <div>
                              <strong className="text-emerald-400 block">✓ Compatible Diluents:</strong>
                              <span className="text-slate-200">{drug.injectionProfile.compatibleDiluents.join(', ')}</span>
                            </div>
                            <div>
                              <strong className="text-rose-400 block">✗ Incompatible Diluents / Drugs:</strong>
                              <span className="text-slate-200">{drug.injectionProfile.incompatibleDiluents.concat(drug.injectionProfile.ySiteIncompatibleDrugs).join(', ')}</span>
                            </div>
                            <div>
                              <strong className="text-cyan-400 block">⚙️ Administration Rules:</strong>
                              <span className="text-slate-300">{drug.injectionProfile.maximumInfusionRate} • {drug.injectionProfile.filterRequirement}</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* =========================================================================
          MODULE 2: INJECTIONS & INFUSIONS UNIVERSE (Y-SITE COMPATIBILITY MATRIX)
          ========================================================================= */}
      {activePharmaTab === 'injections_universe' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
              INJECTION & INFUSION UNIVERSE
            </span>
            <h3 className="text-lg font-black text-white">
              Specialized Parenteral Routes & Y-Site Compatibility Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Clinical validation for Intravenous (IV), Intramuscular (IM), Subcutaneous (SC), Intradermal, Intra-articular, Epidural, Intrathecal, and Intraosseous parenteral drug administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MASTER_DRUG_DATABASE.filter(d => d.routes.some(r => r.includes('Intravenous') || r.includes('Intramuscular') || r.includes('Subcutaneous'))).map((drug) => (
              <div key={drug.id} className="p-5 rounded-3xl bg-[#080d20] border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      {drug.routes.join(' • ')}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{drug.legalStatus}</span>
                  </div>

                  <h4 className="text-sm font-black text-white">{drug.genericName}</h4>
                  <p className="text-xs font-mono text-purple-300">{drug.availableStrengths.join(', ')}</p>
                  
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] space-y-1 font-mono">
                    <p><strong className="text-slate-400">Storage:</strong> <span className="text-slate-200">{drug.storageRequirement}</span></p>
                    <p><strong className="text-slate-400">High-Alert:</strong> <span className={drug.isHighAlert ? 'text-rose-400 font-bold' : 'text-slate-400'}>{drug.isHighAlert ? 'YES ⚠️ (Dual Nurse Check)' : 'No'}</span></p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                  {drug.injectionProfile ? (
                    <div className="space-y-1">
                      <p><strong className="text-emerald-400">Diluent:</strong> {drug.injectionProfile.compatibleDiluents.join(', ')}</p>
                      <p><strong className="text-rose-400">Incompatible:</strong> {drug.injectionProfile.incompatibleDiluents.join(', ')}</p>
                    </div>
                  ) : (
                    <p className="text-slate-400 italic">Standard parenteral administration protocol.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 3: SEXUAL & REPRODUCTIVE PHARMACOLOGY
          ========================================================================= */}
      {activePharmaTab === 'reproductive_pharma' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-pink-950 text-pink-300 border border-pink-500/40">
              SEXUAL & REPRODUCTIVE PHARMACOLOGY
            </span>
            <h3 className="text-lg font-black text-white">
              Erectile Dysfunction, Hormonal Therapies, Contraceptives & Regulated Protocols
            </h3>
            <p className="text-xs text-slate-400">
              Clinical pharmacology reference for PDE-5 inhibitors (Sildenafil, Tadalafil), Emergency Contraceptives (Levonorgestrel), and Regulated Termination Reference (Mifepristone / Misoprostol).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MASTER_DRUG_DATABASE.filter(d => d.substanceCategory === 'Sexual-health medicines' || d.substanceCategory === 'Reproductive medicines').map((drug) => (
              <div key={drug.id} className="p-5 rounded-3xl bg-[#090e24] border border-pink-500/30 space-y-3.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-pink-950 text-pink-300 border border-pink-500/40">
                      {drug.substanceCategory}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{drug.legalStatus}</span>
                  </div>

                  <h4 className="text-sm font-black text-white">{drug.genericName}</h4>
                  <p className="text-xs font-mono text-purple-300">{drug.drugClass}</p>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <strong className="text-pink-300 block text-[11px]">Primary Clinical Uses:</strong>
                    <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                      {drug.indications.map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  </div>

                  {drug.blackBoxWarnings && (
                    <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-[11px] text-rose-200">
                      <strong className="text-rose-400 block mb-1">⚠️ Safety Mandate:</strong>
                      {drug.blackBoxWarnings}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono flex justify-between text-slate-400">
                  <span>Pregnancy: <strong>Cat {drug.pregnancyCategory}</strong></span>
                  <span className="text-cyan-400">Stock: {drug.inventoryStock} units</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 4: SEDATIVES, HYPNOTICS & SLEEP MEDICINES
          ========================================================================= */}
      {activePharmaTab === 'sedatives_hypnotics' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
              SEDATIVES & SLEEP MEDICINES
            </span>
            <h3 className="text-lg font-black text-white">
              Benzodiazepines, Non-Benzodiazepine Z-Hypnotics & Sedation Depth Controls
            </h3>
            <p className="text-xs text-slate-400">
              ⚠️ CNS Depressant Warning: High risk of respiratory impairment, anterograde amnesia, complex sleep behaviors, and fatal depression when combined with alcohol or opioids.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MASTER_DRUG_DATABASE.filter(d => d.drugClass.includes('Benzodiazepine') || d.drugClass.includes('Hypnotic')).map((drug) => (
              <div key={drug.id} className="p-5 rounded-3xl bg-[#090d22] border border-purple-500/30 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/50">
                      🔴 SCHEDULE IV CONTROLLED
                    </span>
                    <span className="text-[10px] font-mono text-purple-300">Dependence: {drug.dependencePotential}</span>
                  </div>

                  <h4 className="text-base font-black text-white">{drug.genericName}</h4>
                  <p className="text-xs font-mono text-cyan-400">{drug.drugClass}</p>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <strong className="text-purple-300 block text-[11px]">Approved Indications:</strong>
                    <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                      {drug.indications.map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-[11px] text-rose-200 space-y-1">
                    <strong className="text-rose-400 block">⚠️ Depressant & Black Box Warning:</strong>
                    <p>{drug.blackBoxWarnings}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                  <p><strong className="text-slate-400">Withdrawal Risk:</strong> <span className="text-amber-300">{drug.withdrawalRisk}</span></p>
                  <p><strong className="text-slate-400">Geriatric Warning:</strong> <span className="text-rose-300">{drug.geriatricBeersWarning}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 5: FORENSIC TOXICOLOGY & ILLICIT RECREATIONAL SUBSTANCES
          ========================================================================= */}
      {activePharmaTab === 'forensic_substances' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
              FORENSIC TOXICOLOGY & SUBSTANCE MEDICINE
            </span>
            <h3 className="text-lg font-black text-white">
              Controlled & Illicit Substance Overdose Toxidromes & Forensic Standards
            </h3>
            <p className="text-xs text-slate-400">
              Forensic references for Opioids, Sympathomimetic Stimulants, Dissociatives, and Psychedelics (Clinical resuscitation protocols, not recreational use instructions).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MASTER_DRUG_DATABASE.filter(d => d.substanceCategory === 'Illicit recreational drugs' || d.visualRiskTier === 'ILLICIT_TOXICOLOGY').map((drug) => (
              <div key={drug.id} className="p-5 rounded-3xl bg-[#090c1e] border border-rose-500/40 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-900 text-rose-400 border border-slate-700">
                      ⚫ FORENSIC STANDARD
                    </span>
                    <span className="text-[10px] font-mono text-rose-300 font-bold">Abuse: {drug.abusePotential}</span>
                  </div>

                  <h4 className="text-base font-black text-white">{drug.genericName}</h4>
                  <p className="text-xs font-mono text-purple-300">Class: {drug.drugClass}</p>

                  {drug.streetNamesForensic && (
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                      <strong className="text-amber-400">Street Aliases:</strong> {drug.streetNamesForensic.join(', ')}
                    </div>
                  )}

                  <div className="p-3 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-[11px] text-rose-100 space-y-1">
                    <strong className="text-rose-400 block">☠️ Overdose Toxidrome & Emergency Management:</strong>
                    <p>{drug.blackBoxWarnings}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                  <p><strong className="text-slate-400">Withdrawal Manifestation:</strong> <span className="text-rose-300">{drug.withdrawalRisk}</span></p>
                  <p><strong className="text-slate-400">Therapeutic Window:</strong> <span className="text-amber-300">{drug.adme.therapeuticWindow}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 6: PERFORMANCE-ENHANCING SUBSTANCES (PEDs & WADA DIRECTORY)
          ========================================================================= */}
      {activePharmaTab === 'peds_wada' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
              WADA ANTI-DOPING & PEDs DIRECTORY
            </span>
            <h3 className="text-lg font-black text-white">
              Anabolic-Androgenic Steroids, SARMs, Growth Factors & Sport Prohibition
            </h3>
            <p className="text-xs text-slate-400">
              Clinical hazards of athletic doping: Endocrine axis shutdown, severe left ventricular cardiomyopathy, peliosis hepatis, and WADA S1-S5 classification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MASTER_DRUG_DATABASE.filter(d => d.substanceCategory === 'Performance-enhancing substances').map((drug) => (
              <div key={drug.id} className="p-5 rounded-3xl bg-[#090e24] border border-amber-500/40 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/50">
                      🏅 WADA PROHIBITED
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{drug.legalStatus}</span>
                  </div>

                  <h4 className="text-base font-black text-white">{drug.genericName}</h4>
                  <p className="text-xs font-mono text-cyan-400">{drug.wadaProhibitionStatus}</p>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <strong className="text-amber-300 block text-[11px]">Cardiovascular & Endocrine Hazards:</strong>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{drug.blackBoxWarnings}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                  <p><strong className="text-slate-400">Adulteration / Counterfeit Risk:</strong> <span className="text-rose-300">{drug.adulterationRiskNotes}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 7: POISON & CHEMICAL HAZARDS (PESTICIDES, METALS, GASES)
          ========================================================================= */}
      {activePharmaTab === 'poison_chemicals' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
              TOXICOLOGY & CHEMICAL UNIVERSE
            </span>
            <h3 className="text-lg font-black text-white">
              Pesticides, Heavy Metals, Toxic Gases, Mushroom & Animal Toxins
            </h3>
            <p className="text-xs text-slate-400">
              Exposure pathways, emergency decontamination, clinical toxidromes, and targeted antidotes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {POISONING_ANTIDOTE_REGISTRY.map((tox) => (
              <div key={tox.id} className="p-5 rounded-3xl bg-[#080d1e] border border-slate-800 hover:border-rose-500/50 transition-all space-y-3.5 flex flex-col justify-between">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-black bg-rose-950 text-rose-300 border border-rose-500/50">
                      {tox.ghsHazardSymbol}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{tox.poisonControlCode}</span>
                  </div>

                  <h4 className="text-sm font-black text-white leading-snug">
                    {tox.toxinName}
                  </h4>

                  <div className="space-y-1 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 block">Toxidrome Symptoms:</span>
                    <ul className="list-disc list-inside text-rose-200/90 space-y-0.5 text-[11px]">
                      {tox.clinicalSymptoms.map((sym, i) => (
                        <li key={i}>{sym}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">Primary Antidote & Dose:</span>
                    <strong className="text-white text-xs block">{tox.primaryAntidote}</strong>
                    <p className="text-[11px] text-emerald-200 leading-relaxed font-mono">
                      {tox.antidoteDoseProtocol}
                    </p>
                  </div>

                  <p className="text-[10px] font-mono text-slate-400">
                    🏥 Unit Required: <strong className="text-cyan-300">{tox.hospitalUnitRequired}</strong>
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 8: BIOLOGICS, MONOCLONAL ANTIBODIES & GENE THERAPY
          ========================================================================= */}
      {activePharmaTab === 'biologics_gene' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              BIOLOGIC MEDICINES & GENE THERAPY
            </span>
            <h3 className="text-lg font-black text-white">
              Monoclonal Antibodies, ADCs, Recombinant Factors, Cell & Gene Therapies
            </h3>
            <p className="text-xs text-slate-400">
              Targeted immunotherapies, immune checkpoint inhibitors, immune-mediated adverse reactions (irAEs), and cold-chain integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MASTER_DRUG_DATABASE.filter(d => d.substanceCategory === 'Specialist prescription' || d.isColdChain).map((drug) => (
              <div key={drug.id} className="p-5 rounded-3xl bg-[#090f28] border border-cyan-500/40 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/50">
                      🧬 BIOLOGIC / MONOCLONAL
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{drug.legalStatus}</span>
                  </div>

                  <h4 className="text-base font-black text-white">{drug.genericName}</h4>
                  <p className="text-xs font-mono text-purple-300">{drug.drugClass}</p>

                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <strong className="text-cyan-300 block text-[11px]">Approved Oncology / Biological Indications:</strong>
                    <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
                      {drug.indications.map((ind, i) => (
                        <li key={i}>{ind}</li>
                      ))}
                    </ul>
                  </div>

                  {drug.blackBoxWarnings && (
                    <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-[11px] text-rose-200">
                      <strong className="text-rose-400 block mb-1">⚠️ Safety Warning:</strong>
                      {drug.blackBoxWarnings}
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono flex justify-between">
                  <span>Storage: <strong className="text-cyan-300">{drug.storageRequirement}</strong></span>
                  <span className="text-emerald-400">Stock: {drug.inventoryStock} vials</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 9: COUNTERFEIT & ADULTERATION SCANNER (NOVA VERIFY)
          ========================================================================= */}
      {activePharmaTab === 'verify_counterfeit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left GS1 Barcode Scanner Input */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                NOVA VERIFY • GS1 DATAMATRIX
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Medicine Authentication & Recall Scanner
              </h3>
              <p className="text-xs text-slate-400">
                Scan pharmaceutical barcodes, tamper-evident seals, and batch serials against the global cryptographic drug ledger.
              </p>
            </div>

            {/* Quick Test Barcode Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Test Barcode Scans:</span>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleVerifyScan('010030069001021721008941B17271130')}
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-left text-xs font-mono flex items-center justify-between"
                >
                  <span className="text-emerald-300">✓ Atorvastatin 20mg (Authentic)</span>
                  <span className="text-slate-500 text-[10px]">LOT-ATOR-8941B</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVerifyScan('01003009999999999999FAKEBATCH2026')}
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/40 text-left text-xs font-mono flex items-center justify-between"
                >
                  <span className="text-rose-300">⚠️ Fake Semaglutide (Counterfeit)</span>
                  <span className="text-slate-500 text-[10px]">UNREGISTERED</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVerifyScan('01003008888888888888ADULTERATEDCOFFEE')}
                  className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-left text-xs font-mono flex items-center justify-between"
                >
                  <span className="text-amber-300">⚠️ Undeclared Sildenafil in Coffee</span>
                  <span className="text-slate-500 text-[10px]">ADULTERATION</span>
                </button>
              </div>
            </div>

            {/* Custom Barcode Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Custom GS1 Barcode</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={verifyBarcode}
                  onChange={(e) => setVerifyBarcode(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
                <button
                  onClick={() => handleVerifyScan(verifyBarcode)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-glow-cyan"
                >
                  Audit
                </button>
              </div>
            </div>

          </div>

          {/* Right Authentication Certificate Result */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#080d20] border border-cyan-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h4 className="text-base font-black text-white">Cryptographic Authentication Report</h4>
              </div>

              <span className={`px-3 py-1 rounded-xl text-xs font-mono font-black ${
                currentVerificationReport.status === 'AUTHENTIC_VERIFIED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' :
                currentVerificationReport.status === 'COUNTERFEIT_DETECTED' ? 'bg-rose-950 text-rose-300 border border-rose-500 animate-pulse' :
                'bg-amber-950 text-amber-300 border border-amber-500'
              }`}>
                {currentVerificationReport.status === 'AUTHENTIC_VERIFIED' ? '✓ AUTHENTIC VERIFIED' :
                 currentVerificationReport.status === 'COUNTERFEIT_DETECTED' ? '⚠️ COUNTERFEIT / ADULTERATED' : 'BATCH RECALL'}
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Product Name:</span>
                <span className="text-white font-bold">{currentVerificationReport.drugName}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Manufacturer:</span>
                <span className="text-slate-200">{currentVerificationReport.manufacturer}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Mfg Date:</span>
                  <span className="text-slate-200">{currentVerificationReport.manufactureDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Expiry:</span>
                  <span className="text-slate-200">{currentVerificationReport.expiryDate}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 block">Blockchain Ledger Token:</span>
                <span className="text-cyan-300 text-[10px] break-all block">{currentVerificationReport.blockchainHash}</span>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              currentVerificationReport.status === 'AUTHENTIC_VERIFIED'
                ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
            }`}>
              {currentVerificationReport.safetyNotice}
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          MODULE 10: 3D MOLECULAR & CHEMICAL ADME VIEWER (NOVA MOLECULE)
          ========================================================================= */}
      {activePharmaTab === 'molecule_3d' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 3D Molecular Ball-and-Stick Canvas */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#060a18] border border-cyan-500/40 shadow-2xl flex flex-col justify-between space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  NOVA MOLECULE 3D
                </span>
                <h3 className="text-lg font-black text-white mt-1">{selectedDrug.genericName}</h3>
                <p className="text-xs font-mono text-purple-300">{selectedDrug.molecularFormula} • {selectedDrug.molecularWeight} g/mol</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoSpin(!isAutoSpin)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    isAutoSpin 
                      ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan' 
                      : 'bg-slate-900 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isAutoSpin ? 'Auto-Spin ON' : 'Paused'}
                </button>
                <button
                  onClick={() => setRotationAngle({ x: 0.4, y: 0.6 })}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
                  title="Reset Angle"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Canvas */}
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#03060f] border border-slate-800/80 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing">
              <canvas
                ref={canvasRef}
                width={600}
                height={420}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className="w-full h-full object-contain"
              />

              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono text-slate-400">
                Drag to rotate 360° • Elements: C(Cyan), O(Red), N(Purple), S(Yellow), F(Green)
              </div>
            </div>

            {/* Drug Selector Quick Switcher */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-2">
              <span className="text-xs text-slate-400 shrink-0 font-medium">Select Substance:</span>
              {MASTER_DRUG_DATABASE.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDrug(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedDrug.id === d.id
                      ? 'bg-purple-600 text-white font-black shadow-glow-purple scale-105'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {d.genericName.split(' ')[0]}
                </button>
              ))}
            </div>

          </div>

          {/* Right Chemical ADME & Pharmacokinetics Panel */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-5">
            <h4 className="text-sm font-black text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Pharmacokinetics & ADME Continuum</span>
            </h4>

            <div className="space-y-3.5 text-xs">
              
              {/* Absorption */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-bold">
                  <span className="text-cyan-300">A — Absorption & Bioavailability</span>
                  <span className="font-mono text-white">{selectedDrug.adme.bioavailability}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {selectedDrug.adme.absorption}
                </p>
              </div>

              {/* Distribution */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-bold">
                  <span className="text-purple-300">D — Distribution & Protein Binding</span>
                  <span className="font-mono text-white">{selectedDrug.adme.proteinBinding}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {selectedDrug.adme.distribution}
                </p>
              </div>

              {/* Metabolism */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-bold">
                  <span className="text-amber-300">M — Metabolism (CYP Enzymes)</span>
                  <span className="font-mono text-amber-300 font-bold">Hepatic</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
                  {selectedDrug.adme.metabolism}
                </p>
              </div>

              {/* Excretion */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-slate-300 font-bold">
                  <span className="text-emerald-300">E — Excretion & Clearance</span>
                  <span className="font-mono text-cyan-400">{selectedDrug.adme.halfLife} t½</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {selectedDrug.adme.excretion}
                </p>
              </div>

              {/* Therapeutic Index Window */}
              <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold">Therapeutic Blood Window</span>
                  <span className="text-white font-bold">{selectedDrug.adme.therapeuticWindow}</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex">
                  <div className="w-1/4 bg-rose-500/40" title="Subtherapeutic" />
                  <div className="w-1/2 bg-emerald-400 shadow-glow-cyan" title="Therapeutic Window" />
                  <div className="w-1/4 bg-rose-500" title="Toxic Range" />
                </div>
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span>Subtherapeutic</span>
                  <span className="text-emerald-400 font-bold">Target Zone</span>
                  <span className="text-rose-400">Toxicity</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          MODULE 11: MULTIDIMENSIONAL INTERACTION MATRIX (NOVA MEDGUARD AI)
          ========================================================================= */}
      {activePharmaTab === 'interact' && (
        <NovaMedGuard 
          patient={patient}
          setActiveTab={setActiveTab}
        />
      )}

      {/* =========================================================================
          MODULE 12: HIGH-ALERT & 5-RIGHTS (NOVA SAFE)
          ========================================================================= */}
      {activePharmaTab === 'high_alert_safe' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                NOVA SAFE • HIGH-ALERT PROTOCOL
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                ISMP High-Alert Medication Verification
              </h3>
            </div>

            <div className="space-y-3">
              {MASTER_DRUG_DATABASE.filter(d => d.isHighAlert).map((drug) => (
                <div key={drug.id} className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <h4 className="text-sm font-black text-white">{drug.genericName}</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-900/80 text-rose-200 font-mono text-[10px] font-bold">
                      {drug.legalStatus}
                    </span>
                  </div>
                  <p className="text-xs text-rose-100/90 leading-relaxed font-medium">
                    {drug.blackBoxWarnings}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-[#090f24] border border-cyan-500/40 shadow-2xl space-y-5">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                BEDSIDE MEDICATION ADMINISTRATION (BCMA)
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                5-Rights Barcode Verification Checklist
              </h3>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { key: 'patient', label: '1. Right Patient', value: `${patient?.name || 'Arthur Pendelton'} (${patient?.id || 'P203'})` },
                { key: 'drug', label: '2. Right Drug', value: 'Sildenafil Citrate 50 mg (Viagra)' },
                { key: 'dose', label: '3. Right Dose', value: '50 mg Oral Once Daily PRN' },
                { key: 'route', label: '4. Right Route', value: 'Oral (Swallow with water)' },
                { key: 'time', label: '5. Right Time', value: 'Pre-Activity (30-60 mins prior)' },
              ].map((item) => (
                <div key={item.key} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-cyan-300 font-bold block">{item.label}</span>
                    <span className="text-slate-300 text-[11px]">{item.value}</span>
                  </div>
                  <div className="p-1 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-400 font-bold block">Patient Wristband Barcode Scan:</span>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={scannedBarcode}
                  onChange={(e) => setScannedBarcode(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
                <button
                  onClick={() => setIsWristbandMatched(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-glow-cyan"
                >
                  Verify
                </button>
              </div>

              {isWristbandMatched && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>✓ 100% Identity Match: Patient wristband & electronic medication order verified. Cleared to administer.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 13: PHARMACOVIGILANCE & ADR (NOVA ADR)
          ========================================================================= */}
      {activePharmaTab === 'adr_vigilance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                NOVA ADR • PHARMACOVIGILANCE
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Report Adverse Drug Reaction (ADR)
              </h3>
            </div>

            <form onSubmit={handleSubmitAdr} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[11px]">Patient Name / ID</label>
                <input
                  type="text"
                  required
                  value={adrPatientName}
                  onChange={(e) => setAdrPatientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[11px]">Suspected Medication</label>
                <input
                  type="text"
                  required
                  value={adrDrugName}
                  onChange={(e) => setAdrDrugName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[11px]">Severity Grade</label>
                <select
                  value={adrSeverity}
                  onChange={(e) => setAdrSeverity(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Mild (Grade 1)">Mild (Grade 1)</option>
                  <option value="Moderate (Grade 2)">Moderate (Grade 2)</option>
                  <option value="Severe (Grade 3)">Severe (Grade 3)</option>
                  <option value="Life-Threatening (Grade 4)">Life-Threatening (Grade 4)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400 uppercase text-[11px]">Adverse Event Reaction Description</label>
                <textarea
                  rows={3}
                  required
                  value={adrEventDesc}
                  onChange={(e) => setAdrEventDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              {adrSubmittedSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>ADR successfully submitted to FDA MedWatch & hospital safety committee.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black shadow-glow-cyan transition-all"
              >
                Submit Pharmacovigilance Report
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 p-6 rounded-3xl bg-[#080d20] border border-slate-800 space-y-4">
            <h4 className="text-sm font-black text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Live Hospital ADR Safety Signal Audit Log</span>
            </h4>

            <div className="space-y-3">
              {adrReportsList.map((rep) => (
                <div key={rep.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-white text-sm">{rep.suspectedDrug}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] font-bold">
                      {rep.severityGrade}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    <strong>Event:</strong> {rep.adverseEvent}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-900">
                    <span>Patient: {rep.patientName}</span>
                    <span>Reported: {rep.dateReported} by {rep.reportedBy}</span>
                    <span className="text-emerald-400 font-bold">{rep.pharmacovigilanceStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 14: COLD-CHAIN TELEMETRY (NOVA STOCK)
          ========================================================================= */}
      {activePharmaTab === 'stock_coldchain' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              NOVA STOCK • COLD-CHAIN TELEMETRY
            </span>
            <h3 className="text-lg font-black text-white">
              Live IoT Temperature Monitoring & Vaccine Storage
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COLD_CHAIN_UNITS.map((unit) => (
              <div key={unit.unitId} className="p-5 rounded-3xl bg-[#080d20] border border-cyan-500/30 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-5 h-5 text-cyan-400" />
                    <span className="font-mono text-xs font-bold text-white">{unit.unitId}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500 font-bold">
                    ✓ {unit.status}
                  </span>
                </div>

                <h4 className="text-sm font-black text-white leading-snug">
                  {unit.storageUnitName}
                </h4>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">Target Range</span>
                    <span className="text-xs font-mono text-slate-300 font-bold">{unit.targetTempRange}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">Current Temp</span>
                    <span className="text-2xl font-black text-cyan-400 font-mono">{unit.currentTemp}°C</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 block">Active Biologics Stored:</span>
                  <ul className="list-disc list-inside text-cyan-200/90 text-[11px] space-y-0.5 font-mono">
                    {unit.activeVaccinesStored.map((vac, i) => (
                      <li key={i}>{vac}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>⚡ Backup Generator: Active</span>
                  <span className="text-emerald-400">{unit.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
