import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Stethoscope, 
  Video, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Building2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { MASTER_SPECIALIST_DIRECTORY, MedicalSpecialty } from '../data/specialistDirectory';
import { PatientProfile } from '../types/biotech';

interface SpecialistDirectoryProps {
  patient: PatientProfile;
  onInitiateTeleconsult?: (specialty: MedicalSpecialty) => void;
}

export const SpecialistDirectory: React.FC<SpecialistDirectoryProps> = ({
  patient,
  onInitiateTeleconsult
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<MedicalSpecialty | null>(null);
  const [referralSent, setReferralSent] = useState<string | null>(null);

  const categories = [
    'All',
    'Primary & General Care',
    'Internal Medicine Subspecialties',
    'Surgical Specialties',
    'Critical & Emergency Care',
    'Diagnostic & Laboratory',
    'Supportive & Preventive Medicine'
  ];

  const filteredSpecialties = MASTER_SPECIALIST_DIRECTORY.filter((s) => {
    const matchesSearch = 
      s.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.specialistTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.scopeOfPractice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.onCallDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.commonPathologies.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Recommended specialists based on current patient diagnosis & vitals
  const recommendedSpecialties = MASTER_SPECIALIST_DIRECTORY.filter(s => {
    if (patient.riskAssessment.riskLevel === 'CRITICAL') {
      return ['Critical Care', 'Pulmonology', 'Infectious Diseases', 'Nephrology', 'Emergency Medicine'].includes(s.field);
    } else if (patient.primaryDiagnosis.toLowerCase().includes('cardiac') || patient.primaryDiagnosis.toLowerCase().includes('afib')) {
      return ['Cardiology', 'Cardiothoracic Surgery', 'Internal Medicine', 'Pain Medicine'].includes(s.field);
    } else if (patient.primaryDiagnosis.toLowerCase().includes('chemo') || patient.primaryDiagnosis.toLowerCase().includes('neutropenia')) {
      return ['Oncology', 'Hematology', 'Infectious Diseases', 'Allergy & Immunology'].includes(s.field);
    }
    return ['General Medicine', 'Family Medicine', 'General Surgery', 'Preventive Medicine'].includes(s.field);
  });

  const handleSendReferral = (specialty: MedicalSpecialty) => {
    setReferralSent(specialty.field);
    setTimeout(() => setReferralSent(null), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Master Healthcare Directory
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                52 Medical Specialties & On-Call Physicians Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Users className="w-6 h-6 text-cyan-400" />
              <span>Multi-Disciplinary Specialist Directory & Clinical Referral Hub</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Instantly search, triage, and route referrals across all 52 recognized fields of medicine—from Critical Care & Pulmonology to Surgical Subspecialties and Clinical Genetics.
            </p>
          </div>
        </div>

        {/* AI Patient-Specific Smart Referral Recommendations */}
        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1.5 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Smart Referral Routing for {patient.name} ({patient.primaryDiagnosis}):</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40 font-bold">
              Automated Match
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {recommendedSpecialties.map((rec) => (
              <button
                key={rec.id}
                onClick={() => setSelectedSpecialty(rec)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 hover:border-cyan-400 text-xs text-white transition-all shadow-glow-cyan"
              >
                <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold">{rec.specialistTitle}</span>
                <span className="text-[10px] text-cyan-300 font-mono">({rec.field})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Field, Specialist Title, Doctor Name, or Disease..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto py-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
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

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filteredSpecialties.map((specialty) => {
            const isSelected = selectedSpecialty?.id === specialty.id;
            return (
              <div
                key={specialty.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-glow-cyan scale-[1.01]'
                    : 'glass-card border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider block">
                        {specialty.category}
                      </span>
                      <h4 className="text-base font-black text-white">
                        {specialty.field}
                      </h4>
                      <span className="text-xs text-slate-300 font-extrabold flex items-center space-x-1 mt-0.5">
                        <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{specialty.specialistTitle}</span>
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      specialty.availability === 'Available Now' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      specialty.availability === 'In Surgery' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}>
                      {specialty.availability}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {specialty.scopeOfPractice}
                  </p>

                  <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>On-Call: <strong className="text-white">{specialty.onCallDoctor}</strong></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => handleSendReferral(specialty)}
                    className="flex-1 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all flex items-center justify-center space-x-1.5"
                  >
                    {referralSent === specialty.field ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Referral Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Refer Patient</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onInitiateTeleconsult && onInitiateTeleconsult(specialty)}
                    className="p-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 transition-all"
                    title="Launch Teleconsult Video"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
