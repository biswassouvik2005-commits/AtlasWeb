import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Mail, Lock, User, Building, X, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin',
}) => {
  const { signIn, signUp, isConfigured } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    if (mode === 'signup' && password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password || 'defaultpass');
        if (error) {
          setErrorMsg(error.message);
          setIsSubmitting(false);
          return;
        }
        setSuccessMsg('Authenticated successfully.');
      } else {
        const { error } = await signUp(email, password, fullName, organization);
        if (error) {
          setErrorMsg(error.message);
          setIsSubmitting(false);
          return;
        }
        setSuccessMsg('Account created! Session initialized.');
      }

      setTimeout(() => {
        setIsSubmitting(false);
        if (onSuccess) onSuccess();
        onClose();
      }, 500);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected authentication error occurred.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-text-main font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-text-dim hover:text-text-main bg-surface-subtle hover:bg-border-subtle rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-text-main font-sans">
            {mode === 'signin' ? 'Sign In to Odyssey' : 'Create Researcher Account'}
          </h2>
          <p className="text-sm text-text-muted">
            {mode === 'signin'
              ? 'Access your authenticated dashboard, waitlist position, and deployment updates.'
              : 'Register to unlock waitlist priority, technical updates, and API key access.'}
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex p-1 bg-surface-subtle border border-border-subtle rounded-xl font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-accent-sec/20 text-[#E3DCFB] border border-accent-sec/40 shadow-sm'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-accent-sec/20 text-[#E3DCFB] border border-accent-sec/40 shadow-sm'
                : 'text-text-muted hover:text-text-main'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm">
          {errorMsg && (
            <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-accent-pri/10 border border-accent-pri/30 rounded-xl text-xs text-accent-pri flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-accent-pri" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Jane Doe"
                  className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm placeholder:text-zinc-400 focus:outline-none focus:border-accent-sec"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-accent-pri" />
                  Organization / University
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. CUET CSE / Research Lab"
                  className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm placeholder:text-zinc-400 focus:outline-none focus:border-accent-sec"
                />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-accent-pri" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@institution.edu"
              className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm placeholder:text-zinc-400 focus:outline-none focus:border-accent-sec"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-accent-pri" />
              Password
            </label>
            <input
              type="password"
              required={mode === 'signup'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'signin' ? 'Enter password' : 'At least 6 characters'}
              className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm placeholder:text-zinc-400 focus:outline-none focus:border-accent-sec"
            />
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm transition-all cursor-pointer rounded-xl flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
