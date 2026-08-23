import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Stethoscope, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Send, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { MAIN_HOSPITAL_DEPARTMENTS, HospitalDepartment } from '../data/hospitalDepartments';
import { PatientProfile, TabType } from '../types/biotech';

interface HospitalDepartmentsGridProps {
  patient: PatientProfile;
  setActiveTab: (tab: TabType) => void;
}

export const HospitalDepartmentsGrid: React.FC<HospitalDepartmentsGridProps> = ({
  patient,
  setActiveTab
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<HospitalDepartment | null>(null);
  const [consultSentDept, setConsultSentDept] = useState<string | null>(null);

  const categories = [
    'All',
    'Critical & Emergency',
    'Clinical Inpatient',
    'Surgical & Procedural',
    'Outpatient & Specialized',
    'Diagnostic & Supportive'
  ];

  const filteredDepts = MAIN_HOSPITAL_DEPARTMENTS.filter((dept) => {
    const matchesSearch = 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.headOfDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.coreServices.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || dept.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSendConsult = (dept: HospitalDepartment) => {
    setConsultSentDept(dept.name);
    setTimeout(() => setConsultSentDept(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 21 Departments by Name, Code, or Service..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto py-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 21-Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepts.map((dept) => {
          const isSelected = selectedDept?.id === dept.id;
          const loadPercent = Math.round((dept.activeLoad / dept.capacity) * 100);
          return (
            <div
              key={dept.id}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3.5 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-glow-cyan scale-[1.01]'
                  : 'glass-card border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider block">
                      {dept.category}
                    </span>
                    <h4 className="text-base font-black text-white">{dept.name}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {dept.code}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>

                {/* Head of Department */}
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center space-x-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate"><strong>HOD:</strong> {dept.headOfDepartment}</span>
                </div>

                {/* Live Capacity Meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Active Load: <strong>{dept.activeLoad} / {dept.capacity}</strong></span>
                    <span className="text-cyan-300 font-bold">{loadPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        loadPercent > 85 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      }`} 
                      style={{ width: `${Math.min(loadPercent, 100)}%` }} 
                    />
                  </div>
                </div>

                {/* Core Services Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {dept.coreServices.slice(0, 2).map((srv, i) => (
                    <span key={i} className="text-[10px] font-mono text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => handleSendConsult(dept)}
                  className="flex-1 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
                >
                  {consultSentDept === dept.name ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Consult Paged!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Page Consult</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('whole_body')}
                  className="p-1.5 rounded-xl bg-cyan-950 text-cyan-300 hover:bg-cyan-900 border border-cyan-500/30 transition-all"
                  title="View Whole-Body Organ Telemetry"
                >
                  <Activity className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
