import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Barcode, 
  QrCode, 
  Printer, 
  Radio, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  RefreshCw, 
  Battery, 
  Wifi, 
  Zap, 
  FileText, 
  Pill, 
  Heart, 
  Activity, 
  BedDouble, 
  Users, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Check, 
  Layers, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { PatientProfile, TabType } from '../types/biotech';
import { SpotlightCard } from './ui/SpotlightCard';
import { ShinyBadge } from './ui/ShinyBadge';
import { AnimatedCounter } from './ui/AnimatedCounter';

interface ZebraHealthcareSuiteProps {
  patient: PatientProfile;
  patients: PatientProfile[];
  onSelectPatient: (patient: PatientProfile) => void;
  setActiveTab: (tab: TabType) => void;
}

interface AssetLocation {
  id: string;
  name: string;
  category: 'Infusion Pump' | 'Ventilator' | 'Defibrillator' | 'Telemetry Pack';
  serial: string;
  location: string;
  battery: number;
  status: 'In Use' | 'Available' | 'Maintenance Required';
  lastPing: string;
}

const HOSPITAL_ASSETS: AssetLocation[] = [
  { id: 'AST-101', name: 'Alaris Smart IV Pump #14', category: 'Infusion Pump', serial: 'SN-882910-ZB', location: 'Floor 3 • Bed 304A', battery: 94, status: 'In Use', lastPing: '12s ago' },
  { id: 'AST-102', name: 'Hamilton-G5 Intensive Care Ventilator', category: 'Ventilator', serial: 'SN-449102-ZB', location: 'ICU • Bay 02', battery: 100, status: 'In Use', lastPing: '4s ago' },
  { id: 'AST-103', name: 'ZOLL R Series Crash Defibrillator', category: 'Defibrillator', serial: 'SN-192083-ZB', location: 'Floor 3 • Central Nursing Station', battery: 98, status: 'Available', lastPing: '1m ago' },
  { id: 'AST-104', name: 'ApexPro Telemetry Transmitter #08', category: 'Telemetry Pack', serial: 'SN-772819-ZB', location: 'Floor 4 • Step-Down Ward', battery: 72, status: 'Available', lastPing: '30s ago' },
  { id: 'AST-105', name: 'Alaris Smart IV Pump #22', category: 'Infusion Pump', serial: 'SN-882922-ZB', location: 'Biomedical Depot • Room B12', battery: 28, status: 'Maintenance Required', lastPing: '5m ago' }
];

export const ZebraHealthcareSuite: React.FC<ZebraHealthcareSuiteProps> = ({
  patient,
  patients,
  onSelectPatient,
  setActiveTab
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'scanner' | 'wristband' | 'rfid_assets' | 'blood_bank'>('scanner');
  const [scannedCode, setScannedCode] = useState<string>('');
  const [scanResult, setScanResult] = useState<{
    type: 'patient' | 'med' | 'specimen' | 'blood';
    title: string;
    verified: boolean;
    details: string;
    timestamp: string;
  } | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [printedCount, setPrintedCount] = useState<number>(0);
  const [bloodBagCode, setBloodBagCode] = useState<string>('ISBT-W0452-19-281902-A+');
  const [isBloodVerified, setIsBloodVerified] = useState<boolean | null>(null);

  // Play realistic Zebra scanner confirmation beep (2400Hz pure clinical tone)
  const playScanBeep = (isSuccess = true) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isSuccess ? 2400 : 600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (isSuccess ? 0.08 : 0.25));

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + (isSuccess ? 0.08 : 0.25));
    } catch (e) {
      console.warn('Audio not allowed', e);
    }
  };

  const handleSimulateScan = (type: 'wristband' | 'medication' | 'specimen') => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      playScanBeep(true);

      if (type === 'wristband') {
        const code = `PPID-${patient.mrn}-${patient.id.toUpperCase()}`;
        setScannedCode(code);
        setScanResult({
          type: 'patient',
          title: `Verified Patient: ${patient.name}`,
          verified: true,
          details: `MRN: ${patient.mrn} • Bed: ${patient.bedLocation} • Blood Group: ${patient.emergencyPassport.bloodGroup} • Allergies: ${patient.emergencyPassport.criticalAllergies?.join(', ') || 'NKDA'}`,
          timestamp: new Date().toLocaleTimeString()
        });
      } else if (type === 'medication') {
        const code = `GS1-0030045182910-LOT8891-EXP2027`;
        setScannedCode(code);
        setScanResult({
          type: 'med',
          title: 'Verified Medication: Ceftriaxone 1g IV Infusion',
          verified: true,
          details: 'Dose: 1g IV Q24H • 5 Rights Verified: Right Patient, Right Dose, Right Route, Right Time, Right Drug',
          timestamp: new Date().toLocaleTimeString()
        });
      } else {
        const code = `LIS-SPECIMEN-CBC-DIFF-991823`;
        setScannedCode(code);
        setScanResult({
          type: 'specimen',
          title: 'Specimen Tube: Lavender Top (EDTA K2)',
          verified: true,
          details: `Order: CBC with Auto Differential • Patient: ${patient.name} (${patient.mrn}) • Phlebotomy Timestamp Logged`,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }, 600);
  };

  const handleVerifyBloodTransfusion = () => {
    playScanBeep(true);
    setIsBloodVerified(true);
  };

  const handlePrintWristband = () => {
    playScanBeep(true);
    setPrintedCount(prev => prev + 1);
    window.print();
  };

  return (
    <div className="space-y-5">
      
      {/* Top Zebra Partner Header Banner */}
      <div className="bg-[#0b1220] border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black shadow-sm">
            <Barcode className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Zebra Healthcare Technology Suite</h2>
              <ShinyBadge variant="amber">Enterprise Certified</ShinyBadge>
            </div>
            <p className="text-xs text-slate-400">
              Positive Patient ID (PPID) • ZD510-HC Thermal Wristband Printing • RFID Hospital Asset RTLS
            </p>
          </div>
        </div>

        {/* Handheld Device Status Indicators */}
        <div className="flex items-center space-x-3 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <Wifi className="h-3.5 w-3.5" />
            <span>Zebra TC52-HC Connected</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1.5 text-slate-300">
            <Battery className="h-3.5 w-3.5 text-emerald-400" />
            <span>98%</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('scanner')}
          className={`py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all ${
            activeSubTab === 'scanner'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Barcode className="h-4 w-4" />
          <span>Bedside Scanner (PPID)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('wristband')}
          className={`py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all ${
            activeSubTab === 'wristband'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Printer className="h-4 w-4" />
          <span>ZD510-HC Wristband Printer</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rfid_assets')}
          className={`py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all ${
            activeSubTab === 'rfid_assets'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="h-4 w-4" />
          <span>RFID Asset Tracking (RTLS)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('blood_bank')}
          className={`py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-all ${
            activeSubTab === 'blood_bank'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>ISBT 128 Blood Match</span>
        </button>
      </div>

      {/* TAB 1: BEDSIDE LASER BARCODE SCANNER TERMINAL */}
      {activeSubTab === 'scanner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Laser Viewfinder Simulator (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <SpotlightCard glowColor="amber" className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-amber-400" />
                    <span>Zebra TC52-HC Healthcare Mobile Scanner</span>
                  </h3>
                  <p className="text-xs text-slate-400">Target SE4720 1D/2D Imager at wristband or vial</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Ready to Scan
                </span>
              </div>

              {/* Viewfinder Target Area with Red Laser Sweep */}
              <div className="h-56 w-full rounded-xl bg-slate-950 border-2 border-dashed border-slate-800 relative overflow-hidden flex items-center justify-center">
                {/* Simulated Red Laser Line */}
                <motion.div
                  animate={{ y: [-90, 90, -90] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-8 right-8 h-0.5 bg-rose-500 shadow-[0_0_12px_#f43f5e] z-10"
                />

                {/* Center Crosshairs */}
                <div className="w-36 h-28 border border-amber-500/30 rounded-lg flex flex-col items-center justify-center space-y-2 p-2">
                  <Barcode className="h-10 w-10 text-slate-600" />
                  <span className="text-[10px] font-mono text-slate-500">Align Barcode Inside Frame</span>
                </div>

                {isScanning && (
                  <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-xs flex items-center justify-center z-20">
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-amber-500/40">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Decoding GS1 DataMatrix...</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Trigger Buttons */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <button
                  onClick={() => handleSimulateScan('wristband')}
                  disabled={isScanning}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-white flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Barcode className="h-3.5 w-3.5 text-amber-400" />
                  <span>Scan Wristband</span>
                </button>

                <button
                  onClick={() => handleSimulateScan('medication')}
                  disabled={isScanning}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-white flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Pill className="h-3.5 w-3.5 text-sky-400" />
                  <span>Scan Medication</span>
                </button>

                <button
                  onClick={() => handleSimulateScan('specimen')}
                  disabled={isScanning}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-white flex items-center justify-center space-x-1.5 transition-all"
                >
                  <FileText className="h-3.5 w-3.5 text-purple-400" />
                  <span>Scan Lab Vial</span>
                </button>
              </div>
            </SpotlightCard>
          </div>

          {/* Verification Audit Trail & 5 Rights (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Scan Output Log */}
            <SpotlightCard glowColor="cyan" className="p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verification Log</h4>
                <span className="text-[10px] font-mono text-slate-400">EHR Positive Match</span>
              </div>

              {scanResult ? (
                <div className="space-y-3 animate-fade-in">
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-emerald-300">
                      <span className="flex items-center space-x-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>{scanResult.title}</span>
                      </span>
                      <span className="text-[10px] font-mono">{scanResult.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{scanResult.details}</p>
                    <div className="font-mono text-[10px] text-slate-400 pt-1 border-t border-emerald-900">
                      Code: {scannedCode}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-500 space-y-1">
                  <Barcode className="h-8 w-8 mx-auto text-slate-700" />
                  <p>Click any trigger above to simulate scanning patient or medication barcodes.</p>
                </div>
              )}
            </SpotlightCard>

            {/* 5 Rights of Medication Administration Checklist */}
            <SpotlightCard glowColor="emerald" className="p-4 space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                5 Rights of Medication Administration
              </span>

              <div className="space-y-1.5 text-xs">
                {[
                  { label: 'Right Patient', detail: `${patient.name} (${patient.mrn})`, pass: true },
                  { label: 'Right Drug', detail: 'Ceftriaxone 1g IV vial', pass: true },
                  { label: 'Right Dose', detail: '1000 mg in 50mL D5W', pass: true },
                  { label: 'Right Route', detail: 'Intravenous Infusion over 30m', pass: true },
                  { label: 'Right Time', detail: 'Scheduled 08:00 (Given on time)', pass: true }
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/80">
                    <span className="font-semibold text-slate-200 flex items-center space-x-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{r.label}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{r.detail}</span>
                  </div>
                ))}
              </div>
            </SpotlightCard>

          </div>

        </div>
      )}

      {/* TAB 2: ZEBRA ZD510-HC THERMAL WRISTBAND PRINTER */}
      {activeSubTab === 'wristband' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Wristband Preview (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <SpotlightCard glowColor="amber" className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Printer className="h-4 w-4 text-amber-400" />
                    <span>Zebra ZD510-HC Direct Thermal Wristband Terminal</span>
                  </h3>
                  <p className="text-xs text-slate-400">Z-Band UltraSoft Antimicrobial Hospital Wristband (300 DPI)</p>
                </div>

                <button
                  onClick={handlePrintWristband}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Wristband & Labels</span>
                </button>
              </div>

              {/* High-Fidelity Printable Thermal Wristband Mockup */}
              <div className="p-4 rounded-2xl bg-white text-slate-950 font-sans shadow-2xl border-4 border-slate-300 space-y-2 select-text">
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-base tracking-tighter text-black">ST. JUDE HEALTH SYSTEM</span>
                    <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">INPATIENT ADMIT</span>
                  </div>
                  <div className="text-right text-xs font-mono font-bold">
                    BED: {patient.bedLocation}
                  </div>
                </div>

                <div className="flex items-start justify-between py-1">
                  <div>
                    <h2 className="text-2xl font-black text-black tracking-tight">{patient.name.toUpperCase()}</h2>
                    <div className="font-mono text-sm font-bold text-slate-800 mt-0.5">
                      MRN: {patient.mrn} • AGE: {patient.age} • SEX: {patient.gender}
                    </div>
                    <div className="text-xs font-bold text-slate-700 mt-1">
                      DOB: 1984-04-12 • ATTENDING: {patient.attendingPhysician}
                    </div>
                  </div>

                  {/* 2D QR Code & Barcode */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className="p-1 bg-white border-2 border-black rounded">
                      <QrCode className="h-16 w-16 text-black" />
                    </div>
                    <span className="font-mono text-[9px] font-bold">GS1-DATAMATRIX</span>
                  </div>
                </div>

                {/* Critical Safety Badges Strip */}
                <div className="flex items-center gap-2 pt-2 border-t-2 border-slate-900 text-xs font-bold">
                  <span className="bg-rose-600 text-white px-2 py-0.5 rounded uppercase">
                    ALLERGIES: {patient.emergencyPassport.criticalAllergies?.join(', ') || 'NKDA'}
                  </span>
                  <span className="bg-black text-white px-2 py-0.5 rounded uppercase font-mono">
                    BLOOD: {patient.emergencyPassport.bloodGroup}
                  </span>
                  <span className="bg-amber-500 text-black px-2 py-0.5 rounded uppercase">
                    FALL RISK: LOW
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Printer Configuration (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <SpotlightCard glowColor="sky" className="p-5 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                Printer Hardware Status
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Cartridge</span>
                  <span className="font-mono font-bold text-emerald-400">Z-Band Direct (180 left)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Resolution</span>
                  <span className="font-mono text-white">300 DPI Micro-Crisp</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">IP Address</span>
                  <span className="font-mono text-sky-400">192.168.10.42 (ZebraNet)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Print Jobs Today</span>
                  <span className="font-mono text-white">{14 + printedCount} wristbands</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

        </div>
      )}

      {/* TAB 3: ZEBRA RFID ASSET TRACKING (RTLS) */}
      {activeSubTab === 'rfid_assets' && (
        <SpotlightCard glowColor="purple" className="p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Radio className="h-4 w-4 text-purple-400" />
                <span>Zebra FX9600 Fixed RFID Asset Locator (RTLS)</span>
              </h3>
              <p className="text-xs text-slate-400">Real-time hospital equipment beacon triangulation across all wards</p>
            </div>
            <ShinyBadge variant="purple">5 Assets Tracked</ShinyBadge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <th className="py-2.5 px-3">Equipment Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Serial / RFID Tag</th>
                  <th className="py-2.5 px-3">Live Location</th>
                  <th className="py-2.5 px-3">Battery</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {HOSPITAL_ASSETS.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">{asset.name}</td>
                    <td className="py-3 px-3 text-slate-300">{asset.category}</td>
                    <td className="py-3 px-3 font-mono text-slate-400">{asset.serial}</td>
                    <td className="py-3 px-3 font-medium text-sky-400 flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-sky-400 shrink-0" />
                      <span>{asset.location}</span>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className={asset.battery < 30 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                        {asset.battery}%
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        asset.status === 'In Use'
                          ? 'bg-sky-950 text-sky-300 border-sky-800'
                          : asset.status === 'Available'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border-rose-800'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SpotlightCard>
      )}

      {/* TAB 4: BLOOD BANK ISBT 128 CROSS-MATCH VERIFICATION */}
      {activeSubTab === 'blood_bank' && (
        <SpotlightCard glowColor="rose" className="p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-rose-400" />
                <span>ISBT 128 Bedside Blood Bag Cross-Match Verification</span>
              </h3>
              <p className="text-xs text-slate-400">Zero-error transfusion safety protocol: Scans recipient wristband and donor unit</p>
            </div>
            <ShinyBadge variant="rose">Blood Safety</ShinyBadge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Recipient Profile */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">1. Intended Recipient</span>
              <h4 className="text-sm font-bold text-white">{patient.name} ({patient.mrn})</h4>
              <div className="flex items-center space-x-2 text-xs">
                <span>Blood Type:</span>
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono font-bold">
                  {patient.emergencyPassport.bloodGroup}
                </span>
              </div>
            </div>

            {/* Donor Blood Bag */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">2. Donor Unit ISBT 128 Tag</span>
              <div className="font-mono text-xs text-sky-400 font-bold">{bloodBagCode}</div>
              <div className="flex items-center space-x-2 text-xs">
                <span>Unit Blood Type:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                  {patient.emergencyPassport.bloodGroup} (Compatible)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-slate-400">
              {isBloodVerified ? (
                <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Dual Clinician Verification Complete • Safe for Transfusion</span>
                </span>
              ) : (
                <span>Requires dual-barcode scanning prior to IV line connection</span>
              )}
            </div>

            <button
              onClick={handleVerifyBloodTransfusion}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Verify & Authorize Transfusion</span>
            </button>
          </div>
        </SpotlightCard>
      )}

    </div>
  );
};
