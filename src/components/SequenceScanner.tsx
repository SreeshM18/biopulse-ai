import React, { useState } from 'react';
import { 
  GitBranch, 
  Dna, 
  Flame, 
  Activity, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { analyzeDnaSequence } from '../utils/bioCalculations';
import { PATIENT_CASE_STUDIES } from '../data/presets';

export const SequenceScanner: React.FC = () => {
  const [inputSequence, setInputSequence] = useState<string>(
    PATIENT_CASE_STUDIES[0].rawSequenceSnippet
  );
  const [copied, setCopied] = useState<boolean>(false);

  const analysis = analyzeDnaSequence(inputSequence);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputSequence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center space-x-2">
              <GitBranch className="w-6 h-6 text-cyan-400" />
              <span>Real-Time DNA / RNA & FASTQ Sequence Scanner</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              High-throughput sequence parser, nucleotide composition, Open Reading Frame (ORF) finder, and mutation motif detector.
            </p>
          </div>

          {/* Quick Preload Snippet Buttons */}
          <div className="flex flex-wrap gap-2">
            {PATIENT_CASE_STUDIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setInputSequence(c.rawSequenceSnippet)}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all"
              >
                {c.primaryGene} Exon
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400">
              Paste FASTA, FASTQ (4-line format), or raw nucleotide string:
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Sequence'}</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={inputSequence}
            onChange={(e) => setInputSequence(e.target.value)}
            placeholder="e.g. ATGACTGAATATAAACTTGTGGTAGTTGGAGCTGATGGCGTAGGCAAGAGTGC..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400 tracking-wider leading-relaxed shadow-inner"
          />
        </div>
      </div>

      {/* Metrics & Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: Statistical Metrics */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Biochemical Composition</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Length</span>
                <div className="text-lg font-extrabold text-white font-mono mt-0.5">
                  {analysis.length} bp
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Quality (Phred)</span>
                <div className="text-lg font-extrabold text-emerald-400 font-mono mt-0.5">
                  Q{analysis.qualityScoreAvg}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">GC Content</span>
                <div className="text-lg font-extrabold text-cyan-400 font-mono mt-0.5">
                  {analysis.gcContent}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">AT Content</span>
                <div className="text-lg font-extrabold text-purple-400 font-mono mt-0.5">
                  {analysis.atContent}%
                </div>
              </div>
            </div>

            {/* GC Skew Visual Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>GC Skew ({analysis.gcContent}%)</span>
                <span>AT Skew ({analysis.atContent}%)</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-400" 
                  style={{ width: `${analysis.gcContent}%` }}
                />
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500" 
                  style={{ width: `${analysis.atContent}%` }}
                />
              </div>
            </div>

          </div>

          {/* Detected Oncogenic Driver Motifs */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Mutational Signatures Detected</span>
            </h3>

            {analysis.detectedMutations.length > 0 ? (
              <div className="space-y-2">
                {analysis.detectedMutations.map((mut, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                      <span>{mut.aminoAcidChange}</span>
                      <span className="font-mono text-[10px]">Pos {mut.position}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-mono">
                      {mut.wildtypeCodon} &rarr; <span className="text-rose-400 font-bold">{mut.mutantCodon}</span>
                    </p>
                    <p className="text-[10px] text-rose-300/80 font-semibold">
                      {mut.significance}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No canonical oncogenic hotspot signature found in active window.</span>
              </div>
            )}
          </div>

        </div>

        {/* Right 8 Cols: 6-Frame Translation & Open Reading Frames */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Translated Amino Acid Peptide */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Dna className="w-4 h-4 text-cyan-400" />
                <span>Translated Amino Acid Sequence (Reading Frame +1)</span>
              </h3>
              <span className="text-[10px] font-mono text-cyan-300">
                {analysis.translatedAminoAcids.length} AA Residues
              </span>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 break-all leading-relaxed max-h-[140px] overflow-y-auto">
              {analysis.translatedAminoAcids || 'Paste a valid sequence to translate...'}
            </div>
          </div>

          {/* Identified Open Reading Frames (ORFs) */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Identified Open Reading Frames (ORFs)</span>
            </h3>

            {analysis.openReadingFrames.length > 0 ? (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {analysis.openReadingFrames.map((orf, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-purple-500/20 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-300 font-mono">
                        ORF #{idx + 1} (Frame +{orf.frame})
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        Coordinates: {orf.start}..{orf.end} ({orf.length} bp / {Math.floor(orf.length / 3)} AA)
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-300 bg-slate-950/70 p-2 rounded-lg break-all">
                      {orf.proteinSequence}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No standard ATG-initiated Open Reading Frame (&gt;10 AA) detected in this window.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
