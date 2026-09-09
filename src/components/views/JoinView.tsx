import React, { useState } from 'react';
import { RoutePath } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  Building,
  GraduationCap,
  Terminal,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Key,
  Layers,
  Sparkles,
  ExternalLink,
  Check,
  ShieldCheck,
  Zap,
  Globe,
  FileCode,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JoinViewProps {
  initialCode?: string;
  navigate: (route: RoutePath) => void;
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
  onOpenAuth: () => void;
}

export type PersonaType = 'business' | 'academic' | 'general';

export const JoinView: React.FC<JoinViewProps> = ({
  initialCode,
  navigate,
  onOpenDemo,
}) => {
  const { user, submitWaitlist } = useAuth();

  // Extract invite / referral code from URL query parameters or fallback
  const [inviteCode, setInviteCode] = useState<string>(() => {
    if (initialCode && initialCode.trim()) return initialCode.trim().toUpperCase();

    const searchParams = new URLSearchParams(window.location.search);
    const codeFromSearch =
      searchParams.get('ref') ||
      searchParams.get('referral') ||
      searchParams.get('referral_code') ||
      searchParams.get('code') ||
      searchParams.get('invite') ||
      searchParams.get('c');
    if (codeFromSearch) return codeFromSearch.trim().toUpperCase();

    if (window.location.hash.includes('?')) {
      const hashQuery = window.location.hash.split('?')[1];
      const hashParams = new URLSearchParams(hashQuery);
      const codeFromHash =
        hashParams.get('ref') ||
        hashParams.get('referral') ||
        hashParams.get('referral_code') ||
        hashParams.get('code') ||
        hashParams.get('invite') ||
        hashParams.get('c');
      if (codeFromHash) return codeFromHash.trim().toUpperCase();
    }

    return 'ODY-ALPHA-2026';
  });

  const [isEditingCode, setIsEditingCode] = useState(false);
  const [tempCode, setTempCode] = useState(inviteCode);

  // Clean 3-step flow: 1: Persona, 2: Midway (Features & Expectations + Details), 3: Access Ready & Dashboard
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [persona, setPersona] = useState<PersonaType>('academic');

  // Minimal form state - NO delivery format selection (full flexibility) and NO custom hardware questions (handled by us)
  const [fullName, setFullName] = useState((user?.user_metadata?.full_name as string) || '');
  const [email, setEmail] = useState(user?.email || '');
  const [organization, setOrganization] = useState(
    (user?.user_metadata?.organization as string) || ''
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignedToken, setAssignedToken] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tempCode.trim().toUpperCase() || 'ODY-ALPHA-2026';
    setInviteCode(clean);
    setIsEditingCode(false);

    // Sync URL without reload
    try {
      const newUrl = new URL(window.location.href);
      if (newUrl.hash) {
        newUrl.hash = `#/join?ref=${encodeURIComponent(clean)}`;
      } else {
        newUrl.searchParams.set('ref', clean);
      }
      window.history.replaceState({}, '', newUrl.toString());
    } catch {
      // ignore
    }
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const roleName =
      persona === 'business'
        ? 'Enterprise / Production Lead'
        : persona === 'academic'
        ? 'Academic Researcher'
        : 'Developer / Builder';

    const intendedSummary = `[ROLE: ${persona.toUpperCase()} | REF: ${inviteCode}] Full Multi-Channel Delivery (API, Native C++, Weights) | Hardware: Managed by Odyssey`;

    try {
      await submitWaitlist({
        email: email || user?.email || `${persona}-${Date.now()}@odyssey-access.internal`,
        full_name: fullName || 'Verified Researcher',
        organization: organization || (persona === 'business' ? 'Enterprise' : 'Independent'),
        role: roleName,
        delivery_channel: 'all',
        intended_use: intendedSummary,
      });
    } catch (err) {
      console.warn('Registration notice:', err);
    }

    const token = `ODY-${persona.toUpperCase()}-${inviteCode.replace(/[^A-Z0-9]/g, '').slice(0, 6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAssignedToken(token);
    setIsSubmitting(false);
    setStep(3);
  };

  const copyTokenToClipboard = () => {
    if (!assignedToken) return;
    navigator.clipboard.writeText(assignedToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-main py-12 sm:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header & Minimal Referral Badge */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-subtle rounded-full text-xs font-mono">
            <Key className="w-3.5 h-3.5 text-accent-pri" />
            <span className="text-text-muted">Referral:</span>
            {isEditingCode ? (
              <form onSubmit={handleApplyCode} className="inline-flex items-center gap-1.5">
                <input
                  type="text"
                  value={tempCode}
                  onChange={(e) => setTempCode(e.target.value)}
                  className="px-2 py-0.5 bg-canvas border border-accent-pri text-accent-pri rounded font-bold uppercase text-xs focus:outline-none w-32"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-xs bg-accent-pri text-canvas px-2 py-0.5 rounded font-bold hover:bg-accent-pri-hover"
                >
                  Save
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setTempCode(inviteCode);
                  setIsEditingCode(true);
                }}
                className="font-bold text-accent-pri hover:underline cursor-pointer"
                title="Click to edit referral code"
              >
                {inviteCode}
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-text-main font-sans">
            {step === 1 && 'Welcome to Odyssey'}
            {step === 2 && 'Features & Expectations'}
            {step === 3 && 'Access Ready'}
          </h1>
          <p className="text-xs sm:text-sm text-text-muted font-sans max-w-md mx-auto">
            {step === 1 && 'Tell us your focus area to tailor your onboarding experience.'}
            {step === 2 && 'Review what is included, what to expect, and finalize your access pass.'}
            {step === 3 && 'Your access token has been generated. Continue to your dashboard below.'}
          </p>
        </div>

        {/* Minimal Stepper Indicator */}
        <div className="flex items-center justify-center gap-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s
                  ? 'w-10 bg-accent-pri'
                  : step > s
                  ? 'w-6 bg-accent-sec/60'
                  : 'w-6 bg-border-subtle'
              }`}
            />
          ))}
        </div>

        {/* Dynamic Step Content */}
        <AnimatePresence mode="wait">
          {/* STEP 1: SELECT ROLE */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-3">
                {/* Business */}
                <button
                  type="button"
                  onClick={() => setPersona('business')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    persona === 'business'
                      ? 'bg-surface border-accent-pri shadow-sm'
                      : 'bg-surface/50 border-border-subtle hover:border-border-strong hover:bg-surface'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl ${
                      persona === 'business'
                        ? 'bg-accent-pri text-canvas'
                        : 'bg-surface-subtle text-text-muted'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-text-main font-sans">
                        Business &amp; Enterprise
                      </h3>
                      {persona === 'business' && (
                        <Check className="w-4 h-4 text-accent-pri shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Deploying high-throughput reasoning workloads, private VPC endpoints, sub-millisecond SLAs, and strict data governance.
                    </p>
                  </div>
                </button>

                {/* Academic */}
                <button
                  type="button"
                  onClick={() => setPersona('academic')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    persona === 'academic'
                      ? 'bg-surface border-accent-pri shadow-sm'
                      : 'bg-surface/50 border-border-subtle hover:border-border-strong hover:bg-surface'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl ${
                      persona === 'academic'
                        ? 'bg-accent-pri text-canvas'
                        : 'bg-surface-subtle text-text-muted'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-text-main font-sans">
                        Academic &amp; Research
                      </h3>
                      {persona === 'academic' && (
                        <Check className="w-4 h-4 text-accent-pri shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Investigating formal logic, test-time compute scaling laws, reproducible benchmarks, and model internals.
                    </p>
                  </div>
                </button>

                {/* General Developer */}
                <button
                  type="button"
                  onClick={() => setPersona('general')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    persona === 'general'
                      ? 'bg-surface border-accent-pri shadow-sm'
                      : 'bg-surface/50 border-border-subtle hover:border-border-strong hover:bg-surface'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl ${
                      persona === 'general'
                        ? 'bg-accent-pri text-canvas'
                        : 'bg-surface-subtle text-text-muted'
                    }`}
                  >
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-text-main font-sans">
                        Developer &amp; Builder
                      </h3>
                      {persona === 'general' && (
                        <Check className="w-4 h-4 text-accent-pri shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Building applications, competitive programming agents, CLI tools, and integrating reasoning into developer workflows.
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-6 py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: MIDWAY - FEATURES & EXPECTATIONS + MINIMAL DETAILS */}
          {step === 2 && (
            <motion.form
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleComplete}
              className="bg-surface border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Features & Flexibility Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-pri" />
                    <h3 className="text-xs font-mono font-bold text-text-main uppercase tracking-wider">
                      Included Features &amp; Delivery Flexibility
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-accent-pri bg-accent-pri/10 px-2 py-0.5 rounded-full border border-accent-pri/20">
                    Full Access
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 bg-canvas border border-border-subtle rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-accent-pri font-mono text-xs font-bold">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Hosted API</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-snug">
                      Low-latency streaming endpoint compatible with standard OpenAI client libraries.
                    </p>
                  </div>

                  <div className="p-3 bg-canvas border border-border-subtle rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-accent-sec font-mono text-xs font-bold">
                      <FileCode className="w-3.5 h-3.5" />
                      <span>Native C++</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-snug">
                      Standalone single-file binary with zero dependencies. Runs directly without runtime overhead.
                    </p>
                  </div>

                  <div className="p-3 bg-canvas border border-border-subtle rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-text-main font-mono text-xs font-bold">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Open Weights</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-snug">
                      Standard SafeTensors weights for private evaluation, fine-tuning, and research clusters.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-surface-subtle border border-border-subtle rounded-xl flex items-center gap-2.5 text-xs text-text-muted">
                  <Zap className="w-4 h-4 text-accent-pri shrink-0" />
                  <span>
                    <strong className="text-text-main">No Custom Hardware Needed:</strong> Infrastructure, serving, and inference acceleration are fully managed by Odyssey.
                  </span>
                </div>
              </div>

              {/* Expectations Section */}
              <div className="space-y-2.5 pt-2 border-t border-border-subtle">
                <h3 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
                  What to Expect for Your Track
                </h3>
                <div className="p-3.5 bg-canvas border border-border-subtle rounded-xl space-y-2 text-xs">
                  {persona === 'business' && (
                    <div className="space-y-1.5 text-text-muted">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-pri shrink-0 mt-0.5" />
                        <span><strong className="text-text-main">Enterprise SLA &amp; Privacy:</strong> Zero data retention and dedicated throughput guarantees for your team.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-pri shrink-0 mt-0.5" />
                        <span><strong className="text-text-main">Deployment Freedom:</strong> Test via hosted endpoints immediately, then transition to on-prem or VPC binaries whenever ready.</span>
                      </div>
                    </div>
                  )}

                  {persona === 'academic' && (
                    <div className="space-y-1.5 text-text-muted">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-pri shrink-0 mt-0.5" />
                        <span><strong className="text-text-main">Benchmark Verification:</strong> Transparent reasoning logs for algorithmic validation and scaling papers.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-pri shrink-0 mt-0.5" />
                        <span><strong className="text-text-main">Direct Weight Access:</strong> Checkpoints in SafeTensors format ready for Slurm clusters and evaluation suites.</span>
                      </div>
                    </div>
                  )}

                  {persona === 'general' && (
                    <div className="space-y-1.5 text-text-muted">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-pri shrink-0 mt-0.5" />
                        <span><strong className="text-text-main">Instant Prototyping:</strong> Live interactive sandbox testing right from your browser or terminal.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-pri shrink-0 mt-0.5" />
                        <span><strong className="text-text-main">Developer Tooling:</strong> Self-contained C++ executables and REST APIs ready for your local projects.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Minimal Contact Details */}
              <div className="space-y-4 pt-2 border-t border-border-subtle">
                <h3 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
                  Confirm Your Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-text-muted">
                      {persona === 'business'
                        ? 'Company / Organization'
                        : persona === 'academic'
                        ? 'University / Lab'
                        : 'Organization / Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={
                        persona === 'business'
                          ? 'e.g. Acme Capital'
                          : persona === 'academic'
                          ? 'e.g. CUET CSE / Research Lab'
                          : 'e.g. Independent Developer'
                      }
                      className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent-sec"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-text-muted">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent-sec"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-text-muted">
                    Work / Academic Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="researcher@organization.com"
                    className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent-sec"
                  />
                </div>
              </div>

              {/* Form Navigation */}
              <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-text-muted hover:text-text-main text-xs font-bold font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Finalizing...' : 'Complete Onboarding'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 3: ACCESS READY & TRANSITION TO DASHBOARD */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-surface border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Access Token Card */}
              <div className="p-4 bg-canvas border border-border-subtle rounded-xl flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-text-muted uppercase font-bold">
                    Assigned Onboarding Token
                  </div>
                  <div className="font-mono text-sm sm:text-base font-bold text-accent-pri truncate">
                    {assignedToken}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyTokenToClipboard}
                  className="px-3 py-1.5 bg-surface hover:bg-border-subtle border border-border-subtle text-xs font-mono text-text-main rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                >
                  {copiedToken ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-pri" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              {/* Minimal Roadmap / What to Expect */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
                  Access Status &amp; Next Steps
                </h3>
                <div className="space-y-2.5 text-xs text-text-muted font-sans">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-subtle">
                    <CheckCircle2 className="w-4 h-4 text-accent-pri shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-text-main">Pass Validated:</strong> Referral code <span className="font-mono text-accent-pri font-bold">{inviteCode}</span> has been confirmed.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-subtle">
                    <CheckCircle2 className="w-4 h-4 text-accent-pri shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-text-main">Full Flexibility Enabled:</strong> Hosted API, standalone C++ executable, and open weights are all provisioned to your profile.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-subtle">
                    <CheckCircle2 className="w-4 h-4 text-accent-pri shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-text-main">Managed Infrastructure:</strong> Live inference is immediately active with Odyssey-managed high-speed clusters.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Primary leads directly to Dashboard as requested */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="px-4 py-2.5 bg-surface hover:bg-border-subtle text-text-main border border-border-subtle font-mono text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Launch Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('dashboard')}
                  className="px-6 py-2.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
