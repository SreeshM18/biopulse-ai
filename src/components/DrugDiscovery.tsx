import React, { useState } from 'react';
import { 
  Pill, 
  FlaskConical, 
  Activity, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  BarChart2, 
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DRUG_DATABASE } from '../data/drugDatabase';
import { DrugTarget } from '../types/biotech';

export const DrugDiscovery: React.FC = () => {
  const [selectedDrug, setSelectedDrug] = useState<DrugTarget>(DRUG_DATABASE[0]);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2">
            <FlaskConical className="w-6 h-6 text-cyan-400" />
            <span>Target-to-Drug Discovery & Chemical Explorer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            In-silico binding affinity evaluation ($IC_{50}$, $K_d$), covalent adduction analysis, and mutation resistance bypass metrics.
          </p>
        </div>

        {/* Quick Drug Pills Selector */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {DRUG_DATABASE.map((drug) => (
            <button
              key={drug.id}
              onClick={() => setSelectedDrug(drug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDrug.id === drug.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-glow-cyan scale-105'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {drug.name} ({drug.targetGene})
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Molecule Identity + Bioactivity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Drug Properties & Mechanism */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Molecule Identity Card */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    Target: {selectedDrug.targetGene} ({selectedDrug.targetProtein})
                  </span>
                  <span className="text-xs text-slate-400">
                    Brand: <strong className="text-white">{selectedDrug.brandName}</strong>
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {selectedDrug.name}
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Formula: <span className="text-cyan-300">{selectedDrug.formula}</span> • MW: {selectedDrug.molecularWeight} g/mol
                </p>
              </div>

              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-lg text-xs font-extrabold border ${
                  selectedDrug.fdaStatus === 'Approved'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-emerald'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  FDA {selectedDrug.fdaStatus} {selectedDrug.approvalYear ? `(${selectedDrug.approvalYear})` : ''}
                </span>
                <span className="text-[11px] font-mono text-cyan-300 mt-1">
                  ChEMBL: {selectedDrug.chemblId}
                </span>
              </div>
            </div>

            {/* Biochemical Binding Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Potency ($IC_{50}$)</span>
                <div className="text-sm sm:text-base font-extrabold text-cyan-300 font-mono mt-1">
                  {selectedDrug.ic50}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Dissociation ($K_d$)</span>
                <div className="text-sm sm:text-base font-extrabold text-purple-400 font-mono mt-1">
                  {selectedDrug.kd}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Binding Affinity</span>
                <div className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono mt-1">
                  {selectedDrug.bindingAffinityScore}/100
                </div>
              </div>
            </div>

            {/* Mechanism of Action Box */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Molecular Mechanism of Action:</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedDrug.mechanism}
              </p>
            </div>

            {/* SMILES Chemical Representation */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                SMILES Canonical Sequence
              </span>
              <p className="text-[11px] font-mono text-slate-300 break-all bg-slate-900 p-2 rounded-lg border border-slate-800">
                {selectedDrug.smiles}
              </p>
            </div>

          </div>

          {/* Mutation Coverage Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Effective Sensitizing Alterations</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedDrug.effectiveMutations.map((mut, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    {mut}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-400">
                <AlertCircle className="w-4 h-4" />
                <span>Acquired Resistance Bypass Gaps</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedDrug.resistantMutations.map((mut, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-rose-950/60 text-rose-300 border border-rose-500/30">
                    {mut}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right 5 Cols: In-Vitro Cell Line Viability & IC50 Chart */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span>Cell Line Viability Reduction (%)</span>
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">
                Higher is better
              </span>
            </div>

            {/* Bar Chart Container */}
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedDrug.bioactivityData} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="cellLine" 
                    stroke="#94a3b8" 
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis stroke="#94a3b8" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090e1d', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#00f2fe' }}
                  />
                  <Bar dataKey="viabilityReduction" fill="#00f2fe" radius={[4, 4, 0, 0]} name="Tumor Cell Kill %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* External Reference Action Links */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <a
                href={`https://pubchem.ncbi.nlm.nih.gov/compound/${selectedDrug.pubchemCid}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
              >
                <span>PubChem CID: {selectedDrug.pubchemCid}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={`https://www.ebi.ac.uk/chembl/compound_report_card/${selectedDrug.chemblId}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-purple-400 hover:text-purple-300 font-mono transition-colors"
              >
                <span>ChEMBL Registry</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
