import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, User, Building, Terminal, GraduationCap, Zap, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDashboard?: () => void;
  onOpenJoin?: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, onOpenDashboard, onOpenJoin }) => {
  const { user, waitlistEntry, submitWaitlist } = useAuth();

  // Direct waitlist form state
  const [email, setEmail] = useState(user?.email || '');
  const [fullName, setFullName] = useState((user?.user_metadata?.full_name as string) || '');
  const [organization, setOrganization] = useState((user?.user_metadata?.organization as string) || '');
  const [track, setTrack] = useState<'general' | 'academic' | 'business'>('general');
  const [showDetails, setShowDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const roleName =
      track === 'business'
        ? 'Enterprise Lead'
        : track === 'academic'
        ? 'Academic Researcher'
        : 'Developer / Builder';

    const { error } = await submitWaitlist({
      email: email.trim(),
      full_name: fullName.trim() || undefined,
      organization: organization.trim() || undefined,
      role: roleName,
      delivery_channel: 'all',
      intended_use: `Early Access Queue [Track: ${track.toUpperCase()}]`,
    });

    setIsSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSubmitSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-surface border border-border-subtle rounded-3xl w-full max-w-lg flex flex-col text-text-main font-sans shadow-2xl relative overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between bg-canvas/60">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-pri animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-text-main flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-pri" />
              <span>Odyssey Access</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-text-dim hover:text-text-main hover:bg-surface rounded-full transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {submitSuccess ? (
            <div className="py-4 space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-accent-pri/10 border border-accent-pri/30 flex items-center justify-center mx-auto text-accent-pri">
                <CheckCircle2 className="w-7 h-7 text-accent-pri" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl font-black text-text-main font-sans">
                  You are in the queue!
                </h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto">
                  We are rolling out Atlas 0.1 sandbox and API access in batches. Check your portal for live status.
                </p>
              </div>

              <div className="p-4 bg-canvas border border-border-subtle rounded-2xl max-w-xs mx-auto text-center space-y-1">
                <div className="text-[11px] font-mono text-text-dim uppercase">QUEUE POSITION</div>
                <div className="text-3xl font-black text-accent-pri font-mono">
                  #{waitlistEntry?.position || 142}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                {onOpenDashboard && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenDashboard();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Open Researcher Portal
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-surface-subtle hover:bg-border-subtle text-text-main font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDirectSubmit} className="space-y-5">
              {/* Headline */}
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-text-main tracking-tight font-sans">
                  Request Early Access
                </h3>
                <p className="text-xs sm:text-sm text-text-muted">
                  Join developers and researchers testing unaligned reasoning models.
                </p>
              </div>

              {/* Minimal Track Pills */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-text-muted">
                  Your Track
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-canvas border border-border-subtle rounded-xl text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setTrack('general')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      track === 'general'
                        ? 'bg-surface text-accent-pri font-bold border border-accent-pri/40 shadow-xs'
                        : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Developer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrack('academic')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      track === 'academic'
                        ? 'bg-surface text-accent-pri font-bold border border-accent-pri/40 shadow-xs'
                        : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Researcher</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrack('business')}
                    className={`py-1.5 px-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      track === 'business'
                        ? 'bg-surface text-accent-pri font-bold border border-accent-pri/40 shadow-xs'
                        : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Enterprise</span>
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300">
                  {errorMsg}
                </div>
              )}

              {/* Email (Primary) */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-text-muted">
                  Email Address <span className="text-accent-pri">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    track === 'business'
                      ? 'you@company.com'
                      : track === 'academic'
                      ? 'researcher@university.edu'
                      : 'you@domain.com'
                  }
                  autoFocus
                  className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                />
              </div>

              {/* Full Name (Mandatory for all tracks) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-text-muted">
                    Full Name <span className="text-accent-pri">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-accent-pri">Required</span>
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                />
              </div>

              {/* Dynamic Organization / Academy requirement */}
              {track === 'business' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-text-muted">
                      Name of Organization <span className="text-accent-pri">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-accent-pri">Required</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Acme AI Systems"
                    className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                  />
                </div>
              )}

              {track === 'academic' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-text-muted">
                      Name of Academy / University <span className="text-accent-pri">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-accent-pri">Required</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Stanford University / Research Lab"
                    className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                  />
                </div>
              )}

              {track === 'general' && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-text-muted">
                      Organization / Project Name <span className="text-text-dim font-normal">(Optional)</span>
                    </label>
                    <span className="text-[10px] font-mono text-text-dim">Optional</span>
                  </div>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Independent Developer / Open Source"
                    className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                  />
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !email ||
                  !fullName.trim() ||
                  ((track === 'business' || track === 'academic') && !organization.trim())
                }
                className="w-full py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Submitting...' : 'Join Waitlist'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Minimal Trust & Links */}
              <div className="pt-2 border-t border-border-subtle flex flex-wrap items-center justify-between text-[11px] text-text-dim font-mono gap-2">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-accent-pri" />
                  Free research tier
                </span>

                {onOpenJoin && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenJoin();
                    }}
                    className="text-accent-pri hover:underline cursor-pointer flex items-center gap-1 font-bold"
                  >
                    <Key className="w-3 h-3" />
                    <span>Have invite code?</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
