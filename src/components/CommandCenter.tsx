import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  AlertTriangle, 
  Search, 
  Filter, 
  UserPlus, 
  ArrowRight, 
  Heart, 
  Thermometer, 
  Wind, 
  BedDouble, 
  Stethoscope, 
  CheckCircle2, 
  FileText, 
  Pill, 
  ChevronRight, 
  Download, 
  RefreshCw, 
  ShieldAlert, 
  Layers, 
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid
} from 'lucide-react';
import { PatientProfile, TabType } from '../types/biotech';

interface CommandCenterProps {
  patients: PatientProfile[];
  selectedPatient: PatientProfile;
  onSelectPatient: (patient: PatientProfile) => void;
  setActiveTab: (tab: TabType) => void;
  onOpenRegister?: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  patients,
  selectedPatient,
  onSelectPatient,
  setActiveTab,
  onOpenRegister
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bedLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.attendingPhysician.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWard = selectedWard === 'All' || p.bedLocation.includes(selectedWard);
    const matchesSeverity = filterSeverity === 'All' || p.riskAssessment.riskLevel === filterSeverity;

    return matchesSearch && matchesWard && matchesSeverity;
  });

  const criticalCount = patients.filter(p => p.riskAssessment.riskLevel === 'CRITICAL').length;
  const highCount = patients.filter(p => p.riskAssessment.riskLevel === 'HIGH').length;
  const stableCount = patients.filter(p => p.riskAssessment.riskLevel === 'LOW' || p.riskAssessment.riskLevel === 'MODERATE').length;

  const handleExportCensus = () => {
    const headers = ['MRN', 'Name', 'Age', 'Gender', 'Bed', 'Diagnosis', 'Attending', 'HR', 'SpO2', 'BP', 'NEWS2', 'Risk Level'];
    const rows = filteredPatients.map(p => [
      p.mrn,
      p.name,
      p.age,
      p.gender,
      p.bedLocation,
      `"${p.primaryDiagnosis}"`,
      `"${p.attendingPhysician}"`,
      p.vitals.heartRate,
      p.vitals.spo2,
      `${p.vitals.systolicBp}/${p.vitals.diastolicBp}`,
      p.vitals.news2Score,
      p.riskAssessment.riskLevel
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `biopulse_hospital_census_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      
      {/* Top Clinical KPI Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        
        <div className="pro-card p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Active Census</span>
            <BedDouble className="h-4 w-4 text-sky-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white font-tabular">{patients.length}</span>
            <span className="text-xs text-slate-400 font-medium">Inpatients</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-400 font-medium">
            94% Total Bed Occupancy
          </div>
        </div>

        <div className="pro-card p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Level 1 Critical Acuity</span>
            <ShieldAlert className="h-4 w-4 text-rose-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-rose-400 font-tabular">{criticalCount}</span>
            <span className="text-xs text-slate-400 font-medium">Patients</span>
          </div>
          <div className="mt-1 text-[11px] text-rose-300/80 font-medium">
            Immediate Physician Review
          </div>
        </div>

        <div className="pro-card p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Level 2 High Acuity</span>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-amber-400 font-tabular">{highCount}</span>
            <span className="text-xs text-slate-400 font-medium">Patients</span>
          </div>
          <div className="mt-1 text-[11px] text-amber-300/80 font-medium">
            Continuous Telemetry Active
          </div>
        </div>

        <div className="pro-card p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Stable / Step-Down</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-emerald-400 font-tabular">{stableCount}</span>
            <span className="text-xs text-slate-400 font-medium">Patients</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-400/80 font-medium">
            Discharge Planning Ready
          </div>
        </div>

        <div className="pro-card p-4 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Safety Audits (MedGuard)</span>
            <Activity className="h-4 w-4 text-sky-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-sky-400 font-tabular">100%</span>
            <span className="text-xs text-slate-400 font-medium">Audited</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">
            0 Drug Contraindications
          </div>
        </div>

      </div>

      {/* Main Clinical Operations Toolbar */}
      <div className="pro-card p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Search Field */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by patient name, MRN (e.g. MRN-784920), bed location, diagnosis..."
              className="w-full rounded-lg bg-slate-900 border border-slate-800 focus:border-sky-500 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          {/* Filters & View Switches */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Ward Selector */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-slate-400 font-medium hidden sm:inline">Ward:</span>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                aria-label="Filter by Ward"
                className="rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 outline-none cursor-pointer"
              >
                <option value="All">All Care Units</option>
                <option value="ICU">ICU & CCU</option>
                <option value="Ward">General Inpatient</option>
                <option value="Step-Down">Step-Down Unit</option>
                <option value="Oncology">Oncology</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-slate-400 font-medium hidden sm:inline">Triage:</span>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                aria-label="Filter by Triage Acuity"
                className="rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs px-2.5 py-1.5 outline-none cursor-pointer"
              >
                <option value="All">All Triage Levels</option>
                <option value="CRITICAL">Critical (Level 1)</option>
                <option value="HIGH">High Risk (Level 2)</option>
                <option value="MODERATE">Moderate (Level 3)</option>
                <option value="LOW">Low (Level 4)</option>
              </select>
            </div>

            {/* Table / Cards View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'table' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Table Census View"
              >
                <TableIcon className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'cards' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
                title="Bed Telemetry Cards View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCensus}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-colors"
              title="Download Census CSV"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Quick Admit */}
            {onOpenRegister && (
              <button
                onClick={onOpenRegister}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white transition-colors"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>+ Admit</span>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* TABLE VIEW: Production-Grade Clinical Census */}
      {viewMode === 'table' && (
        <div className="pro-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="pro-table-header">
                  <th className="py-3 px-4">Patient / MRN</th>
                  <th className="py-3 px-3">Bed Location</th>
                  <th className="py-3 px-3">Age / Sex</th>
                  <th className="py-3 px-3">Primary Diagnosis</th>
                  <th className="py-3 px-3">Attending Physician</th>
                  <th className="py-3 px-3 text-center">Vitals (HR / SpO2 / BP)</th>
                  <th className="py-3 px-3 text-center">NEWS2</th>
                  <th className="py-3 px-3 text-center">Acuity Triage</th>
                  <th className="py-3 px-4 text-right">Clinical Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredPatients.map((patient) => {
                  const isSelected = selectedPatient.id === patient.id;
                  const isCritical = patient.riskAssessment.riskLevel === 'CRITICAL';
                  const isHigh = patient.riskAssessment.riskLevel === 'HIGH';

                  return (
                    <tr 
                      key={patient.id}
                      onClick={() => onSelectPatient(patient)}
                      className={`pro-table-row cursor-pointer ${
                        isSelected ? 'bg-sky-950/30' : ''
                      }`}
                    >
                      {/* Name & MRN */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white text-xs">{patient.name}</div>
                        <div className="font-mono text-[11px] text-slate-400">{patient.mrn}</div>
                      </td>

                      {/* Bed Location */}
                      <td className="py-3 px-3">
                        <span className="font-mono font-medium text-sky-400 bg-sky-950/60 border border-sky-800/50 px-2 py-0.5 rounded text-[11px]">
                          {patient.bedLocation}
                        </span>
                      </td>

                      {/* Age / Gender */}
                      <td className="py-3 px-3 text-slate-300">
                        {patient.age}y • {patient.gender.slice(0, 1)}
                      </td>

                      {/* Primary Diagnosis */}
                      <td className="py-3 px-3 text-slate-200 max-w-[200px] truncate" title={patient.primaryDiagnosis}>
                        {patient.primaryDiagnosis}
                      </td>

                      {/* Attending Physician */}
                      <td className="py-3 px-3 text-slate-400">
                        {patient.attendingPhysician}
                      </td>

                      {/* Vitals Telemetry */}
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center space-x-2 font-mono text-[11px]">
                          <span className={patient.vitals.heartRate > 100 || patient.vitals.heartRate < 55 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                            {patient.vitals.heartRate} bpm
                          </span>
                          <span className="text-slate-600">|</span>
                          <span className={patient.vitals.spo2 < 94 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                            {patient.vitals.spo2}%
                          </span>
                          <span className="text-slate-600">|</span>
                          <span className="text-slate-300">
                            {patient.vitals.systolicBp}/{patient.vitals.diastolicBp}
                          </span>
                        </div>
                      </td>

                      {/* NEWS2 Score */}
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                          patient.vitals.news2Score >= 7
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : patient.vitals.news2Score >= 5
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-slate-900 text-slate-300 border border-slate-800'
                        }`}>
                          {patient.vitals.news2Score}
                        </span>
                      </td>

                      {/* Acuity Triage Badge */}
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          isCritical
                            ? 'bg-rose-950 text-rose-300 border-rose-800'
                            : isHigh
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        }`}>
                          {patient.riskAssessment.riskLevel}
                        </span>
                      </td>

                      {/* Quick Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              onSelectPatient(patient);
                              setActiveTab('patient_monitor');
                            }}
                            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 text-[11px] font-medium transition-colors"
                            title="Open Realtime Bedside Monitor"
                          >
                            Telemetry
                          </button>
                          <button
                            onClick={() => {
                              onSelectPatient(patient);
                              setActiveTab('whole_body');
                            }}
                            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-[11px] font-medium transition-colors"
                            title="Physician Workstation & SOAP"
                          >
                            Chart
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CARDS VIEW: Bedside Clinical Telemetry Cards */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => {
            const isSelected = selectedPatient.id === patient.id;
            const isCritical = patient.riskAssessment.riskLevel === 'CRITICAL';
            const isHigh = patient.riskAssessment.riskLevel === 'HIGH';

            return (
              <div
                key={patient.id}
                onClick={() => onSelectPatient(patient)}
                className={`pro-card-interactive p-4 cursor-pointer space-y-3 ${
                  isSelected ? 'border-sky-500 bg-sky-950/20' : ''
                }`}
              >
                {/* Header: Name, Bed, Acuity */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white">{patient.name}</h4>
                      <span className="text-xs text-slate-400 font-medium">{patient.age}y • {patient.gender}</span>
                    </div>
                    <div className="font-mono text-xs text-slate-400 mt-0.5">{patient.mrn}</div>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-800/60">
                      {patient.bedLocation}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase border ${
                      isCritical
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : isHigh
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {patient.riskAssessment.riskLevel}
                    </span>
                  </div>
                </div>

                {/* Primary Diagnosis */}
                <div className="text-xs text-slate-300 bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-500 font-medium block text-[10px] uppercase">Diagnosis</span>
                  <span className="font-medium text-white">{patient.primaryDiagnosis}</span>
                </div>

                {/* Live Vitals Grid */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-800/60 font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">HR</span>
                    <span className={`font-bold ${patient.vitals.heartRate > 100 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {patient.vitals.heartRate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">SpO2</span>
                    <span className={`font-bold ${patient.vitals.spo2 < 94 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {patient.vitals.spo2}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">BP</span>
                    <span className="font-bold text-slate-200">
                      {patient.vitals.systolicBp}/{patient.vitals.diastolicBp}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">NEWS2</span>
                    <span className={`font-bold ${patient.vitals.news2Score >= 7 ? 'text-rose-400' : 'text-slate-200'}`}>
                      {patient.vitals.news2Score}
                    </span>
                  </div>
                </div>

                {/* Card Footer: Attending Physician & Direct Action */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                  <div className="text-[11px] truncate max-w-[180px]">
                    MD: <strong className="text-slate-300 font-normal">{patient.attendingPhysician}</strong>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPatient(patient);
                      setActiveTab('patient_monitor');
                    }}
                    className="flex items-center space-x-1 text-sky-400 hover:text-sky-300 font-medium text-xs"
                  >
                    <span>View Monitor</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
