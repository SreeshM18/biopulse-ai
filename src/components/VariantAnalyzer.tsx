import React, { useState } from 'react';
import { 
  Dna, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  Activity, 
  BarChart3, 
  Pill, 
  Zap, 
  ExternalLink,
  Info
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { GenomicVariant } from '../types/biotech';

const PRELOADED_VARIANTS: Record<string, GenomicVariant> = {
  'kras-g12d': {
    gene: 'KRAS',
    hgvsc: 'c.35G>A',
    hgvsp: 'p.Gly12Asp',
    rsId: 'rs121913529',
    chromosome: 'chr12',
    position: 25245350,
    ref: 'G',
    alt: 'A',
    clinvarSignificance: 'Pathogenic',
    alphaMissenseScore: 0.985,
    siftScore: 0.00,
    polyphenScore: 0.998,
    gnomadAf: 0.00000398,
    cancerType: 'Pancreatic Ductal Adenocarcinoma, Colorectal Adenocarcinoma',
    consequence: 'Missense variant disrupting intrinsic and GAP-catalyzed GTP hydrolysis',
    drugSensitivity: ['MRTX1133 (Selective G12D)', 'RMC-6236', 'FOLFIRINOX'],
    drugResistance: ['Sotorasib (Lumakras)', 'Adagrasib (Krazati)', 'Cetuximab'],
    actionabilityLevel: 'Level 2 (Standard of Care)',
    summary: 'The KRAS p.G12D mutation introduces a bulky charged aspartate residue at codon 12, sterically preventing GAP-mediated GTP hydrolysis and locking the oncoprotein in a constitutively active GTP-bound signaling state.'
  },
  'egfr-t790m': {
    gene: 'EGFR',
    hgvsc: 'c.2369C>T',
    hgvsp: 'p.Thr790Met',
    rsId: 'rs121434569',
    chromosome: 'chr7',
    position: 55181378,
    ref: 'C',
    alt: 'T',
    clinvarSignificance: 'Pathogenic',
    alphaMissenseScore: 0.962,
    siftScore: 0.00,
    polyphenScore: 0.995,
    gnomadAf: 0.00000795,
    cancerType: 'Non-Small Cell Lung Cancer',
    consequence: 'Gatekeeper missense substitution in the ATP-binding pocket',
    drugSensitivity: ['Osimertinib (Tagrisso)', 'Lazertinib', 'Amivantamab'],
    drugResistance: ['Gefitinib (Iressa)', 'Erlotinib (Tarceva)', 'Afatinib (Gilotrif)'],
    actionabilityLevel: 'Level 1 (FDA Approved)',
    summary: 'The EGFR T790M gatekeeper mutation substitutes threonine with a bulky methionine side chain, causing steric clash with 1st/2nd-gen TKIs while restoring high affinity for cellular ATP.'
  },
  'braf-v600e': {
    gene: 'BRAF',
    hgvsc: 'c.1799T>A',
    hgvsp: 'p.Val600Glu',
    rsId: 'rs113488022',
    chromosome: 'chr7',
    position: 140753336,
    ref: 'T',
    alt: 'A',
    clinvarSignificance: 'Pathogenic',
    alphaMissenseScore: 0.991,
    siftScore: 0.00,
    polyphenScore: 1.000,
    gnomadAf: 0.0000012,
    cancerType: 'Cutaneous Melanoma, Papillary Thyroid, Colorectal',
    consequence: 'Constitutive activation of serine/threonine kinase domain',
    drugSensitivity: ['Dabrafenib + Trametinib', 'Encorafenib + Cetuximab', 'Vemurafenib'],
    drugResistance: ['Single-agent Anti-BRAF without MEK inhibition'],
    actionabilityLevel: 'Level 1 (FDA Approved)',
    summary: 'The V600E substitution introduces a negatively charged glutamate into the activation segment, mimicking regulatory phosphorylation and enabling active kinase monomers without upstream RAS activation.'
  },
  'tp53-r273h': {
    gene: 'TP53',
    hgvsc: 'c.818G>A',
    hgvsp: 'p.Arg273His',
    rsId: 'rs28934578',
    chromosome: 'chr17',
    position: 7673802,
    ref: 'G',
    alt: 'A',
    clinvarSignificance: 'Pathogenic',
    alphaMissenseScore: 0.978,
    siftScore: 0.00,
    polyphenScore: 0.992,
    gnomadAf: 0.0000158,
    cancerType: 'Li-Fraumeni Syndrome, Ovarian, Breast, Colorectal',
    consequence: 'Loss of direct DNA contact in tumor suppressor core domain',
    drugSensitivity: ['WEE1 Inhibitors (Adavosertib)', 'APR-246 (Eprenetapopt)', 'ATR Inhibitors'],
    drugResistance: ['Standard alkylating monotherapy (relative resistance)'],
    actionabilityLevel: 'Level 3A (Clinical Evidence)',
    summary: 'R273H is a primary DNA-contact hotspot mutation that abolishes critical electrostatic interactions with the DNA phosphate backbone, inactivating p53 transcriptional transactivation.'
  }
};

interface VariantAnalyzerProps {
  currentGene?: string;
}

export const VariantAnalyzer: React.FC<VariantAnalyzerProps> = ({ currentGene }) => {
  const [searchTerm, setSearchTerm] = useState<string>('KRAS G12D');
  const [activeVariant, setActiveVariant] = useState<GenomicVariant>(PRELOADED_VARIANTS['kras-g12d']);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const clean = term.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (clean.includes('kras') || clean.includes('g12d') || clean.includes('35g')) {
      setActiveVariant(PRELOADED_VARIANTS['kras-g12d']);
    } else if (clean.includes('egfr') || clean.includes('t790m') || clean.includes('2369')) {
      setActiveVariant(PRELOADED_VARIANTS['egfr-t790m']);
    } else if (clean.includes('braf') || clean.includes('v600e') || clean.includes('1799')) {
      setActiveVariant(PRELOADED_VARIANTS['braf-v600e']);
    } else if (clean.includes('tp53') || clean.includes('r273h') || clean.includes('818')) {
      setActiveVariant(PRELOADED_VARIANTS['tp53-r273h']);
    }
  };

  const radarData = [
    { subject: 'Evolutionary Conservation', value: 95 },
    { subject: 'AlphaMissense Pathogenicity', value: Math.round(activeVariant.alphaMissenseScore * 100) },
    { subject: 'Steric Disruption', value: 92 },
    { subject: 'Catalytic Perturbation', value: 88 },
    { subject: 'Rarity / gnomAD AF', value: 98 },
    { subject: 'Clinical Actionability', value: activeVariant.actionabilityLevel.includes('Level 1') ? 100 : 85 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Search Bar & Quick Tags */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
              <Dna className="w-5 h-5 text-cyan-400" />
              <span>Genomic Variant & Pathogenicity Predictor</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Multi-algorithmic classification synthesizing ClinVar, DeepMind AlphaMissense, PolyPhen-2, SIFT, and gnomAD.
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search Gene, rsID, or cDNA..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Preloaded Quick Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400">Canonical Drivers:</span>
          {Object.entries(PRELOADED_VARIANTS).map(([key, v]) => (
            <button
              key={key}
              onClick={() => {
                setActiveVariant(v);
                setSearchTerm(`${v.gene} ${v.hgvsp}`);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                activeVariant.gene === v.gene
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {v.gene} {v.hgvsp}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Variant Scores & Deep Insights */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Core Identifiers & Significance */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    {activeVariant.chromosome}:{activeVariant.position} ({activeVariant.ref}&gt;{activeVariant.alt})
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeVariant.rsId}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {activeVariant.gene} <span className="text-cyan-400">{activeVariant.hgvsp}</span>
                </h3>
                <p className="text-xs font-mono text-slate-400">{activeVariant.hgvsc}</p>
              </div>

              <div className="flex flex-col items-end space-y-1">
                <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-glow-cyan">
                  {activeVariant.clinvarSignificance}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {activeVariant.actionabilityLevel}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              {activeVariant.summary}
            </p>

            {/* In-Silico Algorithm Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">AlphaMissense</span>
                <div className="text-lg font-extrabold text-rose-400 font-mono">
                  {activeVariant.alphaMissenseScore}
                </div>
                <span className="text-[10px] text-slate-500">Likely Pathogenic</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">SIFT Score</span>
                <div className="text-lg font-extrabold text-rose-400 font-mono">
                  {activeVariant.siftScore.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-500">Deleterious (&lt;0.05)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">PolyPhen-2</span>
                <div className="text-lg font-extrabold text-rose-400 font-mono">
                  {activeVariant.polyphenScore.toFixed(3)}
                </div>
                <span className="text-[10px] text-slate-500">Probably Damaging</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">gnomAD Pop AF</span>
                <div className="text-lg font-extrabold text-cyan-300 font-mono">
                  {activeVariant.gnomadAf.toExponential(2)}
                </div>
                <span className="text-[10px] text-slate-500">Ultra-rare somatic</span>
              </div>
            </div>

          </div>

          {/* Targeted Therapy Sensitivity vs Resistance Matrix */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Pill className="w-4 h-4 text-cyan-400" />
              <span>Targeted Therapy Response Profile</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Sensitive / Recommended */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Predicted Sensitive Therapies</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeVariant.drugSensitivity.map((d, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resistant / Contraindicated */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-rose-400">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Known Resistance Mutations</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeVariant.drugResistance.map((d, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Right 5 Cols: Multi-Metric Pathogenicity Radar Chart */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col items-center">
            <div className="w-full flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Multi-Omic Pathogenicity Radar</span>
              </h4>
              <span className="text-[11px] font-mono text-cyan-300 font-bold">
                AlphaMissense: {activeVariant.alphaMissenseScore}
              </span>
            </div>

            {/* Radar Chart Container */}
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis stroke="#334155" angle={30} domain={[0, 100]} />
                  <Radar
                    name="Pathogenicity"
                    dataKey="value"
                    stroke="#00f2fe"
                    fill="#00f2fe"
                    fillOpacity={0.45}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-normal">
              <strong>Interpretation:</strong> The radar plot demonstrates extreme disruption across evolutionary conservation and catalytic perturbation, reinforcing high-confidence clinical actionable pathogenicity.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
