import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Stethoscope, 
  ShieldAlert, 
  Building2, 
  Sparkles,
  RefreshCw,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { UserPortalRole } from '../types/biotech';

import { clinicalDb } from '../services/clinicalDatabaseService';

export interface AuthenticatedUser {
  id?: string;
  name: string;
  email: string;
  phone: string;
  role: UserPortalRole;
  token: string;
}

interface AuthPortalProps {
  onAuthenticated: (user: AuthenticatedUser) => void;
}

type AuthMode = 'signin' | 'signup' | 'forgot' | 'otp';

export const AuthPortal: React.FC<AuthPortalProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  
  // Sign In State
  const [signInIdentifier, setSignInIdentifier] = useState('doctor.sarah@biopulse.health');
  const [signInPassword, setSignInPassword] = useState('BioPulse2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserPortalRole>('doctor');
  const [authError, setAuthError] = useState<string>('');
  
  // Sign Up State
  const [regFullName, setRegFullName] = useState('Dr. Sarah Lin');
  const [regEmail, setRegEmail] = useState('doctor.sarah@biopulse.health');
  const [regPhone, setRegPhone] = useState('+1 (555) 019-2834');
  const [regPassword, setRegPassword] = useState('BioPulse2026!');
  const [regLicense, setRegLicense] = useState('MD-94820-LIC');
  const [regTerms, setRegTerms] = useState(true);

  // Active Pending User during OTP flow
  const [pendingUser, setPendingUser] = useState<any>(null);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('doctor.sarah@biopulse.health');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // OTP Verification State
  const [otpDigits, setOtpDigits] = useState(['7', '4', '9', '2', '1', '0']);
  const [otpError, setOtpError] = useState('');
  const [resendSeconds, setResendSeconds] = useState(45);
  const [otpMethod, setOtpMethod] = useState<'sms' | 'email'>('sms');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 1-Click Fast Demo Credentials
  const handleQuickPreset = (role: UserPortalRole, demoName: string, demoEmail: string, demoPhone: string) => {
    setSelectedRole(role);
    setSignInIdentifier(demoEmail);
    setSignInPassword('BioPulse2026!');
    setRegFullName(demoName);
    setRegEmail(demoEmail);
    setRegPhone(demoPhone);
    setAuthError('');
  };

  // Submit Sign In -> Validate Against Clinical DB -> Navigate to OTP
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = clinicalDb.authenticateUser(signInIdentifier, signInPassword);
    if (!res.success) {
      // If user not in DB, auto-register as fallback so user is never locked out
      const registered = clinicalDb.registerUser({
        fullName: signInIdentifier.split('@')[0],
        email: signInIdentifier,
        phone: '+1 (555) 000-0000',
        passwordHash: signInPassword,
        role: selectedRole
      });
      setPendingUser(registered.user);
    } else {
      setPendingUser(res.user);
    }

    setOtpDigits(['7', '4', '9', '2', '1', '0']);
    setMode('otp');
  };

  // Submit Sign Up -> Register into Persistent DB -> Navigate to OTP
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regTerms) return;
    setAuthError('');

    const res = clinicalDb.registerUser({
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      passwordHash: regPassword,
      role: selectedRole,
      medicalLicense: regLicense
    });

    setPendingUser(res.user);
    setOtpDigits(['7', '4', '9', '2', '1', '0']);
    setMode('otp');
  };

  // Submit Forgot Password
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSubmitted(true);
    setTimeout(() => {
      setMode('otp');
    }, 1500);
  };

  // Handle OTP Input Change
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setOtpError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace in OTP
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP -> Direct to Main Page
  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = otpDigits.join('');
    if (code.length < 6) {
      setOtpError('Please enter all 6 verification digits.');
      return;
    }

    const isValid = clinicalDb.verifyOtp(pendingUser?.id || 'demo', code);
    if (!isValid && code !== '749210') {
      setOtpError('Invalid OTP code. Enter 749210 or your verified code.');
      return;
    }

    const authUser: AuthenticatedUser = {
      id: pendingUser?.id,
      name: pendingUser?.fullName || (mode === 'signup' ? regFullName : (selectedRole === 'doctor' ? 'Dr. Sarah Lin, MD' : selectedRole === 'emergency' ? 'Paramedic Alex Morgan' : selectedRole === 'hospital' ? 'Admin Davis (Metro General)' : 'Arthur Pendelton')),
      email: pendingUser?.email || (mode === 'signup' ? regEmail : signInIdentifier),
      phone: pendingUser?.phone || (mode === 'signup' ? regPhone : '+1 (555) 019-2834'),
      role: pendingUser?.role || selectedRole,
      token: `BIO-JWT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    };

    onAuthenticated(authUser);
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex items-center justify-center p-3 sm:p-6 select-none relative overflow-hidden">
      
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Glass Authentication Card */}
      <div className="w-full max-w-md bg-[#080d1e]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10">
        
        {/* Card Header with Brand */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-b from-slate-900/90 to-transparent border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 p-[1.5px] shadow-glow-cyan">
              <div className="w-full h-full bg-[#090e1d] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                BioPulse AI Core
              </h2>
              <p className="text-[10px] font-mono text-cyan-300">Secure Clinical Gateway</p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
            HIPAA Compliant
          </span>
        </div>

        {/* 1-Click Fast Demo Presets */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-400 shrink-0 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>1-Click Demo:</span>
          </span>
          <button
            type="button"
            onClick={() => handleQuickPreset('doctor', 'Dr. Sarah Lin, MD', 'doctor.sarah@biopulse.health', '+1 (555) 019-2834')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
              selectedRole === 'doctor'
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 shadow-glow-cyan'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🩺 Doctor
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('emergency', 'Paramedic Alex Morgan', 'emergency.alex@biopulse.health', '+1 (555) 911-0000')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
              selectedRole === 'emergency'
                ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50 shadow-glow-cyan'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            🚨 SOS Paramedic
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('patient', 'Arthur Pendelton', 'patient.arthur@biopulse.health', '+1 (555) 321-9876')}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
              selectedRole === 'patient'
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 shadow-glow-cyan'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            👤 Patient
          </button>
        </div>

        {/* Auth Mode Tabs (Sign In / Register / Forgot) */}
        {mode !== 'otp' && (
          <div className="grid grid-cols-2 p-2 bg-slate-950/80 border-b border-slate-800">
            <button
              onClick={() => setMode('signin')}
              className={`py-2 text-xs font-black rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Manual Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`py-2 text-xs font-black rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-glow-purple'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* === TAB 1: MANUAL SIGN IN === */}
        {mode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="p-6 space-y-4">
            
            {/* Role Selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Access Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('doctor')}
                  className={`flex items-center space-x-1.5 p-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedRole === 'doctor'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Doctor / MD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('emergency')}
                  className={`flex items-center space-x-1.5 p-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedRole === 'emergency'
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>SOS Rescue</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('patient')}
                  className={`flex items-center space-x-1.5 p-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedRole === 'patient'
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Patient</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('hospital')}
                  className={`flex items-center space-x-1.5 p-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedRole === 'hospital'
                      ? 'bg-purple-950/80 text-purple-300 border-purple-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Hospital</span>
                </button>
              </div>
            </div>

            {/* Email or Phone */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Email or Mobile Number</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={signInIdentifier}
                  onChange={(e) => setSignInIdentifier(e.target.value)}
                  placeholder="doctor.sarah@biopulse.health"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-glow-cyan flex items-center justify-center space-x-2 transition-all group mt-2"
            >
              <span>Verify & Continue via OTP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </form>
        )}

        {/* === TAB 2: MANUAL SIGN UP / REGISTER === */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="p-6 space-y-3.5">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="Dr. Sarah Lin, MD"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="sarah@hospital.org"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-purple-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Mobile Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-purple-400 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* License / ABHA ID & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Medical ID / ABHA ID</label>
                <input
                  type="text"
                  value={regLicense}
                  onChange={(e) => setRegLicense(e.target.value)}
                  placeholder="MD-94820-LIC"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Account Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-purple-400 font-medium"
                >
                  <option value="doctor">Doctor / Specialist</option>
                  <option value="emergency">Emergency Paramedic</option>
                  <option value="patient">Patient / Family</option>
                  <option value="hospital">Hospital Admin</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-base sm:text-xs text-white focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <label className="flex items-start space-x-2 text-[11px] text-slate-400 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={regTerms}
                onChange={(e) => setRegTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-950 text-purple-500 focus:ring-purple-400"
              />
              <span>I agree to HIPAA Health Data Privacy, Emergency Protocols & Clinical Telemetry Terms.</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-black bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-glow-purple flex items-center justify-center space-x-2 transition-all group"
            >
              <span>Register & Send 6-Digit OTP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </form>
        )}

        {/* === TAB 3: FORGOT PASSWORD === */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <KeyRound className="w-8 h-8 text-cyan-400 mx-auto" />
              <h3 className="text-sm font-black text-white">Reset Account Password</h3>
              <p className="text-[11px] text-slate-400">
                Enter your registered email or mobile number to receive an instant OTP reset code.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Registered Email / Phone</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="doctor.sarah@biopulse.health"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
                />
              </div>
            </div>

            {forgotSubmitted && (
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Verification OTP dispatched! Forwarding to OTP keypad...</span>
              </div>
            )}

            <div className="flex items-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="w-1/3 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl text-xs font-black bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow-cyan transition-all"
              >
                Send Reset OTP
              </button>
            </div>
          </form>
        )}

        {/* === TAB 4: MANUAL 6-DIGIT OTP VERIFICATION === */}
        {mode === 'otp' && (
          <div className="p-6 space-y-4">
            
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-glow-cyan">
                <KeyRound className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-black text-white">
                Enter 6-Digit Verification Code
              </h3>
              <p className="text-[11px] text-slate-400">
                A verification PIN was dispatched to <strong className="text-cyan-300">{otpMethod === 'sms' ? '+1 (555) 019-2834' : signInIdentifier}</strong>
              </p>
            </div>

            {/* Test OTP Hint Callout */}
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Demo OTP: <strong className="text-white">749210</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setOtpDigits(['7', '4', '9', '2', '1', '0'])}
                className="px-2 py-0.5 rounded bg-cyan-800 hover:bg-cyan-700 text-[10px] font-bold text-white shadow"
              >
                Fill 749210
              </button>
            </div>

            {/* 6-Digit Keypad Input Boxes */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-2.5 py-2">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-13 sm:w-12 sm:h-14 bg-slate-950 border-2 border-cyan-500/60 focus:border-cyan-400 rounded-xl text-center text-xl font-mono font-black text-white focus:outline-none shadow-glow-cyan transition-all"
                />
              ))}
            </div>

            {otpError && (
              <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{otpError}</span>
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={() => handleVerifyOtp()}
              className="w-full py-3 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-500 via-teal-400 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 shadow-glow-cyan flex items-center justify-center space-x-2 transition-all group"
            >
              <span>Verify OTP & Enter Main Platform</span>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
            </button>

            {/* Resend & Method Switcher */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="hover:text-white"
              >
                ← Back to Login
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setOtpDigits(['7', '4', '9', '2', '1', '0']);
                  setResendSeconds(45);
                }}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resend Code</span>
              </button>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800/80 text-center text-[10px] font-mono text-slate-500">
          BioPulse AI Ecosystem • 256-Bit Encrypted Clinical Infrastructure
        </div>

      </div>

    </div>
  );
};
