import React, { useState } from 'react';
import { 
  Clock, 
  Activity, 
  Stethoscope, 
  FlaskConical, 
  Image, 
  Brain, 
  AlertTriangle, 
  Pill, 
  Filter, 
  CheckCircle2,
  Calendar,
  User,
  ShieldAlert
} from 'lucide-react';
import { PatientProfile } from '../types/biotech';
import { PATIENT_CHRONOLOGICAL_TIMELINES, TimelineEvent } from '../data/patientTimeline';

interface MedicalTimelineViewProps {
  patient: PatientProfile;
}

export const MedicalTimelineView: React.FC<MedicalTimelineViewProps> = ({ patient }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const events: TimelineEvent[] = PATIENT_CHRONOLOGICAL_TIMELINES[patient.id] || PATIENT_CHRONOLOGICAL_TIMELINES['p-01'];

  const filteredEvents = events.filter((e) => {
    if (selectedFilter === 'All') return true;
    return e.category === selectedFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Vitals': return <Activity className="w-4 h-4 text-cyan-400" />;
      case 'Consultation': return <Stethoscope className="w-4 h-4 text-emerald-400" />;
      case 'Lab Order':
      case 'Lab Result': return <FlaskConical className="w-4 h-4 text-purple-400" />;
      case 'Imaging': return <Image className="w-4 h-4 text-pink-400" />;
      case 'AI Risk': return <Brain className="w-4 h-4 text-amber-400" />;
      case 'Alert': return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'Prescription': return <Pill className="w-4 h-4 text-emerald-400" />;
      default: return <Clock className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Unified Clinical Record
              </span>
              <span className="text-xs font-mono text-purple-300 font-bold">
                Chronological Audit Trail
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <Clock className="w-6 h-6 text-cyan-400" />
              <span>Medical Record & Inpatient Care Timeline for {patient.name}</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Complete chronological audit trail synchronizing vital telemetry, physician consultations, stat laboratory results, PACS imaging, and TreeSHAP AI risk escalations.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto py-1 no-scrollbar text-xs">
            {['All', 'Vitals', 'Consultation', 'Lab Result', 'Imaging', 'AI Risk', 'Prescription'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-glow-cyan font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chronological Timeline Trail */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800">
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-rose-500">
          
          {filteredEvents.map((evt, idx) => (
            <div key={evt.id} className="relative group">
              
              {/* Bullet Node on Line */}
              <div className={`absolute -left-[31px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                evt.severity === 'CRITICAL' ? 'bg-rose-950 border-rose-500 text-rose-300 shadow-glow-cyan' :
                evt.severity === 'WARNING' ? 'bg-amber-950 border-amber-500 text-amber-300' :
                'bg-slate-900 border-cyan-500 text-cyan-300'
              }`}>
                {getCategoryIcon(evt.category)}
              </div>

              {/* Event Card */}
              <div className={`p-4 rounded-2xl border transition-all ${
                evt.severity === 'CRITICAL' ? 'bg-rose-950/20 border-rose-500/40 shadow-glow-cyan' :
                'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-black text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {evt.time}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {evt.category}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    Source: <strong className="text-white">{evt.authorOrSystem}</strong>
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-white mt-1">{evt.title}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{evt.description}</p>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
};
