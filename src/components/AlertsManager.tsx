import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  CheckCircle2, 
  Bell, 
  Clock, 
  ArrowRight, 
  UserCheck, 
  ShieldAlert, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { HOSPITAL_ALERTS } from '../data/patientDatabase';
import { HospitalAlert, PatientProfile, TabType } from '../types/biotech';

interface AlertsManagerProps {
  patients: PatientProfile[];
  onSelectPatient: (patient: PatientProfile) => void;
  setActiveTab: (tab: TabType) => void;
}

export const AlertsManager: React.FC<AlertsManagerProps> = ({
  patients,
  onSelectPatient,
  setActiveTab
}) => {
  const [alerts, setAlerts] = useState<HospitalAlert[]>(HOSPITAL_ALERTS);

  const toggleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(a => 
      a.id === id ? { ...a, isAcknowledged: !a.isAcknowledged } : a
    ));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/40 animate-pulse">
                Live Escalation Dispatch
              </span>
              <span className="text-xs font-mono text-slate-400">
                Hospital Rapid Response Protocol
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
              <span>Real-Time Patient Deterioration & Escalation Feed</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Instant multi-bed alert feed triggered when continuous telemetry crosses National Early Warning Score 2 (NEWS2 &gt; 7) or acute biomarker desaturation thresholds.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-glow-cyan">
              {alerts.filter(a => !a.isAcknowledged).length} Unacknowledged
            </span>
          </div>
        </div>
      </div>

      {/* Alert Feed Cards */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const matchedPatient = patients.find(p => p.id === alert.patientId);

          return (
            <div
              key={alert.id}
              className={`glass-card rounded-2xl p-5 sm:p-6 border transition-all ${
                alert.severity === 'CRITICAL'
                  ? 'border-rose-500/50 bg-rose-950/20 shadow-glow-cyan'
                  : alert.severity === 'HIGH'
                  ? 'border-amber-500/40 bg-amber-950/20'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                {/* Alert Left Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold font-mono ${
                      alert.severity === 'CRITICAL' ? 'bg-rose-500 text-slate-950 font-black' :
                      alert.severity === 'HIGH' ? 'bg-amber-400 text-slate-950 font-black' :
                      'bg-yellow-400 text-slate-950 font-bold'
                    }`}>
                      {alert.severity} ALERT
                    </span>

                    <span className="text-sm font-extrabold text-white">
                      {alert.patientName}
                    </span>

                    <span className="text-xs font-mono text-cyan-300">
                      [{alert.bedLocation}]
                    </span>

                    <span className="text-xs text-slate-500 font-mono flex items-center space-x-1 ml-auto md:ml-0">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {alert.message}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-mono font-bold bg-slate-950 px-2.5 py-1 rounded-md text-rose-300 border border-slate-800">
                      Trigger: {alert.triggerVital}
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium">
                      Required Action: <strong className="text-white">{alert.actionRequired}</strong>
                    </span>
                  </div>
                </div>

                {/* Alert Action Buttons */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 w-full md:w-auto">
                  <button
                    onClick={() => toggleAcknowledge(alert.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all w-full md:w-auto text-center ${
                      alert.isAcknowledged
                        ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-glow-emerald font-black'
                    }`}
                  >
                    {alert.isAcknowledged ? '✓ Acknowledged' : 'Acknowledge Alert'}
                  </button>

                  {matchedPatient && (
                    <button
                      onClick={() => {
                        onSelectPatient(matchedPatient);
                        setActiveTab('patient_monitor');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                    >
                      <span>Open Live Monitor</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
