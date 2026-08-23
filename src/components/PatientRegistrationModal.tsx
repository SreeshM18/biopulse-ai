import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Activity, 
  Heart, 
  Wind, 
  Thermometer, 
  ShieldCheck, 
  BedDouble,
  CheckCircle2
} from 'lucide-react';
import { PatientProfile, RiskLevel } from '../types/biotech';

interface PatientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (newPatient: PatientProfile) => void;
}

export const PatientRegistrationModal: React.FC<PatientRegistrationModalProps> = ({
  isOpen,
  onClose,
  onAddPatient
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(55);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bedLocation, setBedLocation] = useState('ICU-Bed 06');
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState('Acute Exacerbation of COPD');
  const [bloodGroup, setBloodGroup] = useState('O+ (O Positive)');
  const [allergies, setAllergies] = useState('Penicillin');
  const [medications, setMedications] = useState('Albuterol Inhaler, Prednisone');

  // Vitals
  const [heartRate, setHeartRate] = useState<number>(104);
  const [spo2, setSpo2] = useState<number>(91);
  const [respiratoryRate, setRespiratoryRate] = useState<number>(25);
  const [temperature, setTemperature] = useState<number>(38.1);
  const [systolicBp, setSystolicBp] = useState<number>(110);
  const [diastolicBp, setDiastolicBp] = useState<number>(70);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Calculate initial risk score dynamically
    let calculatedRisk = 15;
    let riskLevel: RiskLevel = 'LOW';

    if (spo2 < 90 || heartRate > 120 || respiratoryRate > 28 || temperature >= 39.0) {
      calculatedRisk = 88;
      riskLevel = 'CRITICAL';
    } else if (spo2 < 93 || heartRate > 100 || respiratoryRate > 22 || temperature >= 38.0) {
      calculatedRisk = 65;
      riskLevel = 'HIGH';
    } else if (spo2 < 95 || heartRate > 90) {
      calculatedRisk = 38;
      riskLevel = 'MODERATE';
    }

    const newId = `p${Math.floor(100 + Math.random() * 900)}`;
    const newMrn = `MRN-${Math.floor(10000 + Math.random() * 90000)}`;

    const newPatient: PatientProfile = {
      id: newId,
      mrn: newMrn,
      name: name.trim(),
      age: Number(age),
      gender,
      bedLocation,
      admissionDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      primaryDiagnosis,
      attendingPhysician: 'Dr. Sarah Lin, MD (On-Duty)',
      vitals: {
        heartRate: Number(heartRate),
        spo2: Number(spo2),
        respiratoryRate: Number(respiratoryRate),
        temperature: Number(temperature),
        systolicBp: Number(systolicBp),
        diastolicBp: Number(diastolicBp),
        news2Score: riskLevel === 'CRITICAL' ? 11 : riskLevel === 'HIGH' ? 7 : 3,
        lastUpdated: 'Just now'
      },
      riskAssessment: {
        overallRiskScore: calculatedRisk,
        riskLevel,
        primaryRiskDiagnosis: `Admission Evaluation: ${primaryDiagnosis}`,
        contributingFactors: [
          { feature: 'SpO2 Saturation', currentValue: `${spo2}%`, normalRange: '95 - 100%', impactPercentage: spo2 < 93 ? 35 : 10, direction: 'depressed' },
          { feature: 'Heart Rate', currentValue: `${heartRate} bpm`, normalRange: '60 - 90 bpm', impactPercentage: heartRate > 100 ? 30 : 10, direction: 'elevated' },
          { feature: 'Respiratory Rate', currentValue: `${respiratoryRate} bpm`, normalRange: '12 - 20 bpm', impactPercentage: respiratoryRate > 22 ? 25 : 10, direction: 'elevated' }
        ],
        counterfactualPrediction: [
          { action: 'Administer 2L Supplemental O2 + Nebulizer', projectedRiskScore: Math.max(15, calculatedRisk - 35), projectedRiskLevel: 'MODERATE' }
        ]
      },
      emergencyPassport: {
        passportId: `PASSPORT-${newMrn}`,
        abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        bloodGroup,
        criticalAllergies: allergies.split(',').map(a => a.trim()),
        chronicConditions: [primaryDiagnosis],
        activeMedications: medications.split(',').map(m => m.trim()),
        emergencyContact: {
          name: 'Next of Kin',
          relation: 'Family',
          phone: '+1 (555) 019-2834'
        },
        organDonorStatus: true,
        resuscitationDNR: false,
        qrCodeValue: `https://biopulse.health/passport/${newMrn}`,
        prescriptions: [],
        consentLogs: []
      },
      vitalsHistory: [
        { time: 'Admit', heartRate: Number(heartRate), spo2: Number(spo2), respiratoryRate: Number(respiratoryRate), temperature: Number(temperature), systolicBp: Number(systolicBp) }
      ],
      clinicalNotes: [
        {
          timestamp: new Date().toLocaleString(),
          author: 'Triage Nurse',
          noteType: 'Nursing',
          subjective: 'Patient admitted through ED with respiratory symptoms.',
          objective: `Initial vitals: HR ${heartRate}, SpO2 ${spo2}%, RR ${respiratoryRate}, Temp ${temperature}°C.`,
          assessment: `Admission risk calculated at ${calculatedRisk}% (${riskLevel}).`,
          plan: 'Initiate continuous BioPulse AI telemetry and baseline lab draw.'
        }
      ]
    };

    onAddPatient(newPatient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#090e1d] text-slate-100 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-cyan-400" />
            <h3 className="font-extrabold text-sm text-white">
              Admit New Patient to BioPulse AI Telemetry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Patient Demographics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Patient Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arthur Pendelton"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Ward / Bed Location</label>
              <input
                type="text"
                value={bedLocation}
                onChange={(e) => setBedLocation(e.target.value)}
                placeholder="e.g. ICU-Bed 05, Ward 3A"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="O+ (O Positive)">O+ (O Positive)</option>
                <option value="O- (O Universal Donor)">O- (O Universal Donor)</option>
                <option value="A+ (A Positive)">A+ (A Positive)</option>
                <option value="A- (A Negative)">A- (A Negative)</option>
                <option value="B+ (B Positive)">B+ (B Positive)</option>
                <option value="AB+ (AB Universal Recipient)">AB+ (AB Universal)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Primary Admission Diagnosis</label>
            <input
              type="text"
              value={primaryDiagnosis}
              onChange={(e) => setPrimaryDiagnosis(e.target.value)}
              placeholder="e.g. Acute Coronary Syndrome, Sepsis, Post-Op"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Baseline Telemetry Vitals Grid */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Initial Baseline Telemetry Vitals</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400">Heart Rate (BPM)</label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400">SpO2 (%)</label>
                <input
                  type="number"
                  value={spo2}
                  onChange={(e) => setSpo2(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400">Resp Rate (bpm)</label>
                <input
                  type="number"
                  value={respiratoryRate}
                  onChange={(e) => setRespiratoryRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400">Temp (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400">Systolic BP</label>
                <input
                  type="number"
                  value={systolicBp}
                  onChange={(e) => setSystolicBp(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Emergency Allergies & Meds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Critical Allergies</label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="e.g. Penicillin, Sulfa"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Current Medications</label>
              <input
                type="text"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                placeholder="e.g. Lisinopril, Metformin"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-glow-cyan transition-all"
            >
              Admit Patient & Start AI Telemetry
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
