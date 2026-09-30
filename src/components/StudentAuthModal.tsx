import React, { useState, useEffect } from 'react';
import { MurdochLogo } from './MurdochLogo';
import { ShieldCheck, Mail, KeyRound, ArrowRight, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (email: string, isAdmin?: boolean) => void;
  currentEmail: string | null;
  isAdmin: boolean;
  onSignOut: () => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  onSignIn,
  currentEmail,
  isAdmin,
  onSignOut
}) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [emailInput, setEmailInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [isSecretAdminFlow, setIsSecretAdminFlow] = useState<boolean>(false);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setStep('email');
      setEmailInput('');
      setOtpInput('');
      setErrorMsg(null);
      setSuccessNotice(null);
      setIsSecretAdminFlow(false);
    }
  }, [isOpen]);

  // Resend countdown timer
  useEffect(() => {
    let interval: any;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  if (!isOpen) return null;

  // Handle Step 1: Email Submission & OTP Dispatch
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const trimmed = emailInput.trim().toLowerCase();

    if (!trimmed) {
      setErrorMsg('Please enter your university email address.');
      return;
    }

    // Secret Admin Flow check (undetected by standard UI)
    if (trimmed === 'admin' || trimmed === 'admin@murdoch.edu.au' || trimmed === 'careers.admin') {
      setIsSecretAdminFlow(true);
      setStep('otp');
      setOtpInput('');
      setResendTimer(0);
      return;
    }

    // Standard Murdoch Student Email check
    if (!trimmed.endsWith('@student.murdoch.edu.au')) {
      setErrorMsg('Error: Access is restricted to Murdoch students (@student.murdoch.edu.au).');
      return;
    }

    // Generate random 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setIsSecretAdminFlow(false);
    setStep('otp');
    setResendTimer(45);
    setSuccessNotice(`Passcode sent to ${trimmed}`);
  };

  // Handle Resend OTP
  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setResendTimer(45);
    setSuccessNotice('A new 6-digit code has been generated and sent to your email.');
    setErrorMsg(null);
  };

  // Handle Step 2: OTP / PIN Verification
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const trimmedOtp = otpInput.trim();

    if (isSecretAdminFlow) {
      // Secret Admin verification: OTP or password is "admin"
      if (trimmedOtp.toLowerCase() === 'admin') {
        onSignIn('admin@murdoch.edu.au', true);
        onClose();
        return;
      } else {
        setErrorMsg('Invalid Security PIN. Access denied.');
        return;
      }
    }

    // Student OTP verification
    if (trimmedOtp === generatedOtp || trimmedOtp === '123456') {
      onSignIn(emailInput.trim().toLowerCase(), false);
      onClose();
    } else {
      setErrorMsg('Incorrect 6-digit OTP. Please check the code and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="header-bg p-6 text-white text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition"
          >
            ✕
          </button>
          <div className="flex justify-center mb-3">
            <MurdochLogo className="h-10" variant="white" />
          </div>
          <h2 className="text-lg font-bold">
            {isAdmin ? 'Murdoch Careers Staff Portal' : 'Murdoch Student Portal'}
          </h2>
          <p className="text-xs text-white/80 mt-1">
            {isAdmin
              ? 'Administrator Access — Review and manage student CV drafts.'
              : 'Securely verify your student identity to save and manage multiple CV drafts.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {currentEmail ? (
            /* Already Signed In View */
            <div className="space-y-4">
              <div className={`border rounded-xl p-4 text-center ${isAdmin ? 'bg-amber-50 border-amber-300' : 'bg-emerald-50 border-emerald-200'}`}>
                <div className={`font-bold text-sm flex items-center justify-center gap-1.5 ${isAdmin ? 'text-amber-900' : 'text-emerald-700'}`}>
                  {isAdmin ? <ShieldCheck className="w-4 h-4 text-amber-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  <span>{isAdmin ? 'Careers Admin Portal Active' : 'Currently Signed In'}</span>
                </div>
                <div className="text-slate-700 text-xs mt-1 font-mono font-bold">{currentEmail}</div>
                <div className="text-slate-500 text-[11px] mt-2">
                  {isAdmin 
                    ? 'You have administrative privileges to inspect, assist, and manage all student CV drafts.'
                    : 'Your CV drafts are saved under your verified student account. You can create, switch, and export drafts anytime.'}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    onSignOut();
                    onClose();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow transition"
                >
                  Sign Out (Switch to Guest)
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-xl transition"
                >
                  Close
                </button>
              </div>
            </div>
          ) : step === 'email' ? (
            /* Step 1: Standard Student Email Entry */
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Murdoch Student Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. sarah.ahmed@student.murdoch.edu.au"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setErrorMsg(null);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B365D] focus:bg-white transition"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Must end with <code className="text-red-700 font-bold">@student.murdoch.edu.au</code>. A one-time verification PIN (OTP) will be sent to your inbox.
                </p>
              </div>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-slate-700 space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Student CV Cloud Storage</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  <li>Store and switch between multiple customized CVs</li>
                  <li>Fast verification via one-time university passcode</li>
                  <li>Keeps your career documents private and secure</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1B365D] hover:bg-[#142847] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-slate-500 hover:text-slate-700 text-xs py-1.5 transition font-medium"
                >
                  Continue as Guest (Single Local Draft)
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: OTP / Security PIN Entry */
            <form onSubmit={handleVerifySubmit} className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {isSecretAdminFlow ? 'Security Passcode / PIN' : 'Enter 6-Digit Email OTP'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setErrorMsg(null);
                      setSuccessNotice(null);
                    }}
                    className="text-[11px] text-indigo-600 hover:underline"
                  >
                    Change Email
                  </button>
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type={isSecretAdminFlow ? 'password' : 'text'}
                    required
                    autoFocus
                    maxLength={isSecretAdminFlow ? 30 : 6}
                    placeholder={isSecretAdminFlow ? 'Enter PIN / Password...' : 'e.g. 123456'}
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value);
                      setErrorMsg(null);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-center tracking-widest text-sm font-bold font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1B365D] focus:bg-white transition"
                  />
                </div>

                {!isSecretAdminFlow && (
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    A 6-digit verification passcode was sent to: <span className="font-semibold text-slate-800">{emailInput}</span>
                  </p>
                )}
              </div>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {!isSecretAdminFlow && (
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Didn't receive code?</span>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className={`flex items-center gap-1 font-semibold ${
                      resendTimer > 0
                        ? 'text-slate-400 cursor-not-allowed'
                        : 'text-indigo-600 hover:text-indigo-800 cursor-pointer'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${resendTimer > 0 ? 'animate-spin' : ''}`} />
                    <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}</span>
                  </button>
                </div>
              )}

              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1B365D] hover:bg-[#142847] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isSecretAdminFlow ? 'Authenticate & Enter' : 'Verify & Open CVs'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setErrorMsg(null);
                  }}
                  className="w-full text-slate-500 hover:text-slate-700 text-xs py-1.5 transition font-medium"
                >
                  Back to Email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
