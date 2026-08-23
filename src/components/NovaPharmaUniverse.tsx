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
  RotateCcw
} from 'lucide-react';
import { 
  MasterDrugRecord, 
  PoisoningAntidoteRecord, 
  BatchVerificationReport, 
  ADRSubmissionRecord, 
  ColdChainLog,
  PatientProfile,
  TabType,
  InteractionSeverityTier
} from '../types/biotech';
import { 
  MASTER_DRUG_DATABASE, 
  POISONING_ANTIDOTE_REGISTRY, 
  BATCH_VERIFICATION_RECORDS, 
  PHARMACOVIGILANCE_REPORTS, 
  COLD_CHAIN_UNITS 
} from '../data/novaPharmaUniverseData';

interface NovaPharmaUniverseProps {
  patient?: PatientProfile;
  setActiveTab?: (tab: TabType) => void;
}

type PharmaViewTab = 
  | 'az_browser' 
  | 'molecule_3d' 
  | 'interact' 
  | 'high_alert_safe' 
  | 'poison_antidote' 
  | 'verify_counterfeit' 
  | 'adr_vigilance' 
  | 'stock_coldchain';

export const NovaPharmaUniverse: React.FC<NovaPharmaUniverseProps> = ({
  patient,
  setActiveTab
}) => {
  const [activePharmaTab, setActivePharmaTab] = useState<PharmaViewTab>('az_browser');

  // A-Z Browser State
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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
  const [fiveRights, setFiveRights] = useState({
    patient: true,
    drug: true,
    dose: true,
    route: true,
    time: true
  });
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

  // Filtered Drugs
  const alphabetLetters = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const filteredDrugs = MASTER_DRUG_DATABASE.filter((drug) => {
    const matchLetter = selectedLetter === 'All' || drug.alphabetLetter.toUpperCase() === selectedLetter.toUpperCase();
    const query = searchQuery.toLowerCase();
    const matchSearch = 
      drug.genericName.toLowerCase().includes(query) ||
      drug.brandNames.some(b => b.toLowerCase().includes(query)) ||
      drug.drugClass.toLowerCase().includes(query) ||
      drug.indications.some(i => i.toLowerCase().includes(query));
    const matchCategory = selectedCategory === 'All' || drug.therapeuticCategory.includes(selectedCategory);

    return matchLetter && matchSearch && matchCategory;
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

      // Current Rotation
      let curX = rotationAngle.x;
      let curY = rotationAngle.y;

      if (isAutoSpin) {
        curY += 0.008;
      }

      // 3D Transformation Math
      const transformedAtoms = atoms.map((atom) => {
        // Rotate Y
        const cosY = Math.cos(curY);
        const sinY = Math.sin(curY);
        const x1 = atom.x * cosY + atom.z * sinY;
        const z1 = -atom.x * sinY + atom.z * cosY;

        // Rotate X
        const cosX = Math.cos(curX);
        const sinX = Math.sin(curX);
        const y2 = atom.y * cosX - z1 * sinX;
        const z2 = atom.y * sinX + z1 * cosX;

        // Perspective projection
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

      // Sort atoms by Z for proper depth rendering
      const sortedIndices = transformedAtoms.map((_, i) => i).sort((a, b) => transformedAtoms[a].pz - transformedAtoms[b].pz);

      // Draw Bonds (Cylinders / Lines)
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

      // Draw Atoms (Glowing Spheres)
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

        // Atom Symbol Label
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

  // Mouse drag to rotate molecule
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

  // Submit ADR Report
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

  // Perform Barcode Verification
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
      
      {/* Top Hero Banner & System Overview */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#080e22] via-[#0e1b3d] to-[#080e22] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shadow-glow-cyan">
                <Pill className="w-6 h-6 animate-pulse" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                MASTER PHARMACEUTICAL UNIVERSE v4.0
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/40">
                75+ Clinical Classes • 3D Molecular Engine
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              NOVA PHARMA & Drug Universe
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Complete A–Z pharmaceutical intelligence, 3D chemical ball-and-stick viewer, multidimensional drug-drug-food-disease interaction matrix, high-alert 5-rights bedside safety, emergency poisoning antidote registry, and GS1 counterfeit verification.
            </p>
          </div>

          {/* Quick Stats Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Catalog Drugs</span>
              <span className="text-lg font-black text-cyan-400">75+ Classes</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Interactions</span>
              <span className="text-lg font-black text-purple-400">Multidimensional</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Cold-Chain</span>
              <span className="text-lg font-black text-emerald-400">2°C - 8°C IoT</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 block">Antidotes</span>
              <span className="text-lg font-black text-rose-400">Rapid Registry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar (9 Specialized Pharma Modules) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-800">
        {[
          { id: 'az_browser', label: '1. A–Z Drug Browser', icon: <Database className="w-4 h-4 text-cyan-400" /> },
          { id: 'molecule_3d', label: '2. 3D Molecule & ADME', icon: <Brain className="w-4 h-4 text-purple-400" /> },
          { id: 'interact', label: '3. NOVA INTERACT', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
          { id: 'high_alert_safe', label: '4. High-Alert & 5-Rights', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
          { id: 'poison_antidote', label: '5. Poisoning & Antidotes', icon: <Flame className="w-4 h-4 text-rose-500" /> },
          { id: 'verify_counterfeit', label: '6. Counterfeit Batch Scanner', icon: <Scan className="w-4 h-4 text-cyan-400" /> },
          { id: 'adr_vigilance', label: '7. ADR Pharmacovigilance', icon: <FileText className="w-4 h-4 text-emerald-400" /> },
          { id: 'stock_coldchain', label: '8. Cold-Chain & Stock', icon: <Snowflake className="w-4 h-4 text-cyan-300" /> },
        ].map((tab) => {
          const isActive = activePharmaTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePharmaTab(tab.id as PharmaViewTab)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
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
          MODULE 1: A–Z DRUG BROWSER (SEARCH, FORMULATIONS, ROUTES & DOSING)
          ========================================================================= */}
      {activePharmaTab === 'az_browser' && (
        <div className="space-y-6">
          
          {/* Alphabet Index Filter & Search Bar */}
          <div className="p-5 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
            
            {/* Search + Formulation Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Generic, Brand, Class, or Indication..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 shadow-inner"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                <span className="text-xs text-slate-400 shrink-0 font-medium">Category:</span>
                {['All', 'Cardiovascular', 'Antibiotics', 'Emergency', 'Anesthesia', 'Endocrinology', 'Hematology'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-glow-cyan'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
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

          {/* Drug Cards Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredDrugs.map((drug) => {
              const isExpanded = expandedDrugId === drug.id;

              return (
                <div
                  key={drug.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#0a1024] border-cyan-500/50 shadow-2xl'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Card Main Header */}
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

                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-700">
                            {drug.legalStatus}
                          </span>
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
                        <span className="text-[10px] text-slate-400 block">Stock Available</span>
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

                  {/* Expanded Complete Clinical Details Panel */}
                  {isExpanded && (
                    <div className="p-6 border-t border-slate-800/90 bg-[#060a18] space-y-6 text-xs animate-fade-in">
                      
                      {/* Black Box Warning Alert if present */}
                      {drug.blackBoxWarnings && (
                        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-200 space-y-1">
                          <div className="flex items-center space-x-2 font-black text-rose-400 uppercase tracking-wider">
                            <AlertOctagon className="w-4 h-4" />
                            <span>FDA Boxed Warning / Critical Safety Mandate</span>
                          </div>
                          <p className="text-xs leading-relaxed text-rose-100 font-medium">
                            {drug.blackBoxWarnings}
                          </p>
                        </div>
                      )}

                      {/* 4-Column Clinical Matrix */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        {/* 1. Indications & Dosage Forms */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                          <span className="font-black text-cyan-300 uppercase tracking-wider block">
                            Indications & Formulations
                          </span>
                          <div className="space-y-1">
                            <span className="text-slate-400 font-semibold block text-[11px]">Approved Indications:</span>
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

                        {/* 4. Special Populations */}
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                          <span className="font-black text-emerald-400 uppercase tracking-wider block">
                            Special Populations
                          </span>
                          <div className="space-y-1 text-[11px]">
                            <p><strong className="text-slate-400">Pregnancy FDA:</strong> <span className="font-bold text-amber-300">Category {drug.pregnancyCategory}</span></p>
                            <p><strong className="text-slate-400">Lactation:</strong> <span className="text-slate-300">{drug.lactationSafety}</span></p>
                            <p><strong className="text-slate-400">Pediatric mg/kg:</strong> <span className="text-cyan-300 font-mono">{drug.pediatricDosingRule}</span></p>
                            {drug.geriatricBeersWarning && (
                              <p className="text-amber-300 pt-1">
                                <strong>👴 Beers Criteria:</strong> {drug.geriatricBeersWarning}
                              </p>
                            )}
                            <p><strong className="text-slate-400">Renal (eGFR):</strong> <span className="text-slate-300">{drug.renalAdjustmentGFR}</span></p>
                          </div>
                        </div>

                      </div>

                      {/* Chemical Properties & GS1 Barcode */}
                      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px]">
                        <div className="space-y-0.5">
                          <p><strong className="text-slate-400">Chemical Name:</strong> <span className="text-slate-300">{drug.chemicalName}</span></p>
                          <p><strong className="text-slate-400">Molecular Formula:</strong> <span className="text-cyan-300 font-bold">{drug.molecularFormula}</span> (MW: {drug.molecularWeight} g/mol)</p>
                          <p><strong className="text-slate-400">SMILES:</strong> <span className="text-purple-300 text-[10px] break-all">{drug.smilesNotation}</span></p>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block">Batch & GS1 GTIN</span>
                            <span className="text-slate-200 font-bold">{drug.batchNumber}</span>
                          </div>
                          <button
                            onClick={() => {
                              setVerifyBarcode(drug.barcodeGS1);
                              setActivePharmaTab('verify_counterfeit');
                              handleVerifyScan(drug.barcodeGS1);
                            }}
                            className="px-3 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold flex items-center space-x-1.5 shadow-glow-cyan"
                          >
                            <Scan className="w-3.5 h-3.5" />
                            <span>Scan Batch</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* =========================================================================
          MODULE 2: 3D MOLECULAR & CHEMICAL ADME VIEWER (NOVA MOLECULE)
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
                Drag to rotate 360° • Chemical element colors: C(Cyan), O(Red), N(Purple), S(Yellow), F(Green)
              </div>
            </div>

            {/* Drug Selector Quick Switcher */}
            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-2">
              <span className="text-xs text-slate-400 shrink-0 font-medium">Select Molecule:</span>
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

            {/* ADME Progress & Property Breakdown */}
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
          MODULE 3: MULTIDIMENSIONAL INTERACTION MATRIX (NOVA INTERACT)
          ========================================================================= */}
      {activePharmaTab === 'interact' && (
        <div className="space-y-6">
          
          {/* Interaction Checker Tool */}
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-6">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                NOVA INTERACT ENGINE
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                Multidimensional Drug, Food, Disease & Lab Interaction Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Evaluate cross-pharmacological risks across 5 dimensions: Drug-Drug, Drug-Food, Drug-Alcohol, Drug-Disease, and Drug-Lab.
              </p>
            </div>

            {/* Interactive Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase">Primary Medication</label>
                <select
                  value={interactDrugA.id}
                  onChange={(e) => {
                    const found = MASTER_DRUG_DATABASE.find(d => d.id === e.target.value);
                    if (found) setInteractDrugA(found);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {MASTER_DRUG_DATABASE.map((d) => (
                    <option key={d.id} value={d.id}>{d.genericName} ({d.drugClass})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase">Target Substance / Food / Condition</label>
                <select
                  value={interactTarget}
                  onChange={(e) => setInteractTarget(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {interactDrugA.interactions.map((item, idx) => (
                    <option key={idx} value={item.targetName}>[{item.targetType}] {item.targetName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Interaction Results Cards */}
            <div className="space-y-3 pt-2">
              {interactDrugA.interactions.map((interaction, idx) => {
                const isSelected = interaction.targetName === interactTarget;
                const sev = interaction.severity;

                return (
                  <div
                    key={idx}
                    onClick={() => setInteractTarget(interaction.targetName)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0f1733] border-cyan-400 shadow-glow-cyan'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                      <div className="flex items-center space-x-2.5">
                        <span className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black ${
                          sev === 'CONTRAINDICATED_CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-500' :
                          sev === 'MAJOR' ? 'bg-amber-950 text-amber-300 border border-amber-500' :
                          sev === 'MODERATE' ? 'bg-yellow-950 text-yellow-300 border border-yellow-500' :
                          'bg-emerald-950 text-emerald-300 border border-emerald-500'
                        }`}>
                          {sev === 'CONTRAINDICATED_CRITICAL' ? '🔴 CONTRAINDICATED / CRITICAL' :
                           sev === 'MAJOR' ? '🟠 MAJOR HAZARD' :
                           sev === 'MODERATE' ? '🟡 MODERATE' : '🟢 MINOR'}
                        </span>
                        <h4 className="text-sm font-black text-white">
                          {interactDrugA.genericName} ⇄ {interaction.targetName}
                        </h4>
                      </div>

                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800">
                        {interaction.targetType} Interaction
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">Biological Mechanism:</span>
                        <p className="text-slate-300 leading-relaxed font-medium">
                          {interaction.mechanism}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1">
                        <span className="text-[11px] font-bold text-cyan-300 block">Mandatory Clinical Action:</span>
                        <p className="text-slate-200 leading-relaxed">
                          {interaction.clinicalAction}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          MODULE 4: HIGH-ALERT & 5-RIGHTS BEDSIDE SAFETY (NOVA SAFE)
          ========================================================================= */}
      {activePharmaTab === 'high_alert_safe' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left High-Alert Drug Directory */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                NOVA SAFE • HIGH-ALERT PROTOCOL
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                ISMP High-Alert Medication Verification
              </h3>
              <p className="text-xs text-slate-400">
                High-alert medications bear heightened risk of causing significant patient harm when used in error. Mandatory independent dual-nurse verification required.
              </p>
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

          {/* Right 5-Rights Bedside Verification Simulator */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-[#090f24] border border-cyan-500/40 shadow-2xl space-y-5">
            <div>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                BEDSIDE MEDICATION ADMINISTRATION (BCMA)
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                5-Rights Barcode Verification Checklist
              </h3>
            </div>

            {/* 5-Rights Checklist */}
            <div className="space-y-2.5 font-mono text-xs">
              {[
                { key: 'patient', label: '1. Right Patient', value: `${patient?.name || 'Arthur Pendelton'} (${patient?.id || 'P203'})` },
                { key: 'drug', label: '2. Right Drug', value: 'Human Regular Insulin U-100 (Humulin R)' },
                { key: 'dose', label: '3. Right Dose', value: '6 Units Subcutaneous (Sliding Scale)' },
                { key: 'route', label: '4. Right Route', value: 'Subcutaneous (Abdomen)' },
                { key: 'time', label: '5. Right Time', value: 'Pre-Meal (Within 30 mins of carbohydrate intake)' },
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

            {/* Barcode Wristband Scan Simulation */}
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
          MODULE 5: POISONING & EMERGENCY ANTIDOTE REGISTRY (NOVA TOX)
          ========================================================================= */}
      {activePharmaTab === 'poison_antidote' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
              NOVA TOX • EMERGENCY TOXICOLOGY
            </span>
            <h3 className="text-lg font-black text-white">
              Poisoning, Overdose & Rapid Antidote Protocol Registry
            </h3>
            <p className="text-xs text-slate-400">
              Immediate hospital protocol references for acute drug toxicities, heavy metal exposures, industrial gas poisonings, and snake/spider venoms.
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
          MODULE 6: COUNTERFEIT BATCH SCANNER & RECALLS (NOVA VERIFY)
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
                 currentVerificationReport.status === 'COUNTERFEIT_DETECTED' ? '⚠️ COUNTERFEIT DETECTED' : 'BATCH RECALL'}
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Drug Product Name:</span>
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
          MODULE 7: ADR REPORTING & PHARMACOVIGILANCE (NOVA ADR)
          ========================================================================= */}
      {activePharmaTab === 'adr_vigilance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left ADR Submission Form */}
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

          {/* Right Live Pharmacovigilance Audit Log */}
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
          MODULE 8: COLD-CHAIN TELEMETRY & VACCINE STOCK (NOVA STOCK)
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
            <p className="text-xs text-slate-400">
              Continuous 24/7 temperature sensors for vaccines, insulins, monoclonal antibodies, and blood products with automatic excursions and expiry blockades.
            </p>
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
