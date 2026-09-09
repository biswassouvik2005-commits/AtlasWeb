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
  Lock,
  Scale,
  Cpu,
  Database,
  BarChart3,
  Server,
  Code,
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

const PERSONA_BENEFITS: Record<
  PersonaType,
  {
    badge: string;
    title: string;
    tagline: string;
    summary: string;
    statValue: string;
    statLabel: string;
    features: Array<{
      icon: React.ComponentType<{ className?: string }>;
      title: string;
      description: string;
      pill: string;
    }>;
    highlightTitle: string;
    highlightDesc: string;
  }
> = {
  business: {
    badge: 'Enterprise & Production Tier',
    title: 'Atlas for Business & Enterprise',
    tagline: 'Reliable, cost-effective reasoning infrastructure for mission-critical workloads.',
    summary:
      'Atlas replaces bulky cloud frontier models with a dedicated sub-1B deterministic reasoning model that cuts inference bills by up to 88% and eliminates data leakage.',
    statValue: '88%',
    statLabel: 'Compute cost reduction vs hosted frontier APIs',
    features: [
      {
        icon: Lock,
        title: 'Zero Data Leakage & Private VPC',
        description:
          'Deploy compiled binaries in private VPCs with zero external prompt telemetry.',
        pill: 'Private VPC',
      },
      {
        icon: Scale,
        title: 'Deterministic SLA & Audit Trails',
        description:
          'Bit-level reproducible reasoning chains eliminate prompt drift for regulatory audits.',
        pill: 'Zero Drift',
      },
      {
        icon: Cpu,
        title: 'Sub-1B Resource Footprint',
        description:
          'Low GPU VRAM requirements enable massive concurrency without costly H100 clusters.',
        pill: 'High Concurrency',
      },
    ],
    highlightTitle: 'Enterprise Clearance Includes:',
    highlightDesc:
      'Dedicated VPC deployment packages, custom SLA benchmarks, and compliance reporting tools.',
  },
  academic: {
    badge: 'Academic & Research Tier',
    title: 'Atlas for Academic Researchers',
    tagline: 'An open, unaligned reasoning substrate for studying formal logic and compute scaling.',
    summary:
      'Atlas removes conversational RLHF guardrails that hinder formal logic and mathematics, providing clean token-level transparency into search trees and test-time compute.',
    statValue: '0%',
    statLabel: 'Alignment tax — unconstrained reasoning pathways',
    features: [
      {
        icon: Zap,
        title: 'Zero Alignment Tax',
        description:
          'Pure symbolic derivations without conversational guardrails refusing complex logic.',
        pill: 'Pure Logic',
      },
      {
        icon: BarChart3,
        title: 'Observable Test-Time Compute',
        description:
          'Full visibility into rollout trees, backtrack dynamics, and per-token logit probabilities.',
        pill: 'Observability',
      },
      {
        icon: SlidersHorizontal,
        title: 'Reproducible Benchmark Harness',
        description:
          'Standardized evaluation seeds for GSM8K, MATH, and ARC-AGI for peer-reviewed research.',
        pill: 'Verifiable Seeds',
      },
    ],
    highlightTitle: 'Academic Clearance Includes:',
    highlightDesc:
      'Grant compute credits, token-level logit access, and raw trace datasets for published research.',
  },
  general: {
    badge: 'Developer & Builder Tier',
    title: 'Atlas for Developers & Autonomous Agents',
    tagline: 'Sub-15ms local reasoning embedded directly into your tools, CLI, and apps.',
    summary:
      'Atlas brings instantaneous, deterministic reasoning to your local machine. Build autonomous coding agents, CLI tools, and offline applications with zero API fees.',
    statValue: '< 15ms',
    statLabel: 'Time-to-first-token on modern Apple Silicon / CUDA',
    features: [
      {
        icon: Zap,
        title: 'Sub-15ms Local Latency',
        description:
          'Ultra-compact sub-1B footprint runs natively on Apple Silicon, CUDA, or CPU offline.',
        pill: '< 15ms Response',
      },
      {
        icon: Terminal,
        title: 'Deterministic Agent Tool-Calling',
        description:
          'Strict JSON schema outputs and multi-step CLI executions without conversational fluff.',
        pill: 'Agent Ready',
      },
      {
        icon: Server,
        title: 'Drop-In OpenAI & vLLM API',
        description:
          'Connect seamlessly to Cursor, Claude Code, or custom frameworks via standard /v1 endpoints.',
        pill: 'Standard Protocol',
      },
    ],
    highlightTitle: 'Developer Clearance Includes:',
    highlightDesc:
      'Instant sandbox token, native TypeScript/Python SDKs, and local CLI runner instructions.',
  },
};

export const JoinView: React.FC<JoinViewProps> = ({
  initialCode,
  navigate,
  onOpenDemo,
  onOpenAuth,
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

  // 4-step clean flow:
  // Step 1: Persona Focus Area (Welcome to Odyssey)
  // Step 2: Tailored Profession Benefits (Why Atlas for your role)
  // Step 3: Clear details form with dynamic mandatory fields based on profession
  // Step 4: Access Pass Ready
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [persona, setPersona] = useState<PersonaType>('academic');
  const currentBenefits = PERSONA_BENEFITS[persona];

  // Form state
  const [fullName, setFullName] = useState((user?.user_metadata?.full_name as string) || '');
  const [email, setEmail] = useState(user?.email || '');
  const [organization, setOrganization] = useState(
    (user?.user_metadata?.organization as string) || ''
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assignedToken, setAssignedToken] = useState('');
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = tempCode.trim().toUpperCase() || 'ODY-ALPHA-2026';
    setInviteCode(clean);
    setIsEditingCode(false);

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
    if (!email || !email.includes('@')) return;
    if (!fullName.trim()) return;
    if ((persona === 'business' || persona === 'academic') && !organization.trim()) return;

    setIsSubmitting(true);

    const roleName =
      persona === 'business'
        ? 'Enterprise Lead'
        : persona === 'academic'
        ? 'Academic Researcher'
        : 'Developer / Builder';

    const intendedSummary = `[ROLE: ${persona.toUpperCase()} | REF: ${inviteCode}] Early Access Pipeline`;

    try {
      await submitWaitlist({
        email: email.trim(),
        full_name: fullName.trim(),
        organization: organization.trim() || (persona === 'general' ? 'Independent' : undefined),
        role: roleName,
        delivery_channel: 'all',
        intended_use: intendedSummary,
      });
    } catch (err) {
      console.warn('Registration notice:', err);
    }

    const token = `ODY-${persona.toUpperCase().slice(0, 3)}-${inviteCode.replace(/[^A-Z0-9]/g, '').slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAssignedToken(token);
    setIsSubmitting(false);
    setStep(4);
  };

  const copyTokenToClipboard = () => {
    if (!assignedToken) return;
    navigator.clipboard.writeText(assignedToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const copyInviteLink = () => {
    const link = `${window.location.origin}/#/join?ref=${encodeURIComponent(inviteCode)}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-main py-12 sm:py-20 flex flex-col justify-center font-sans">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 w-full space-y-6">
        {/* Referral Pill */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-subtle rounded-full text-xs font-mono shadow-xs">
            <Key className="w-3.5 h-3.5 text-accent-pri" />
            <span className="text-text-muted">Invite:</span>
            {isEditingCode ? (
              <form onSubmit={handleApplyCode} className="inline-flex items-center gap-1.5">
                <input
                  type="text"
                  value={tempCode}
                  onChange={(e) => setTempCode(e.target.value)}
                  className="px-2 py-0.5 bg-canvas border border-accent-pri text-accent-pri rounded font-bold uppercase text-xs focus:outline-none w-28"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-xs bg-accent-pri text-canvas px-2 py-0.5 rounded font-bold hover:bg-accent-pri-hover cursor-pointer"
                >
                  Apply
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setTempCode(inviteCode);
                  setIsEditingCode(true);
                }}
                className="font-bold text-accent-pri hover:underline cursor-pointer flex items-center gap-1"
                title="Click to edit invite code"
              >
                <span>{inviteCode}</span>
                <span className="text-[10px] text-text-dim">✎</span>
              </button>
            )}
          </div>
        </div>

        {/* Top Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-main font-sans">
            {step === 1 && 'Welcome to Odyssey'}
            {step === 2 && 'Tailored for Your Role'}
            {step === 3 && 'Complete Your Details'}
            {step === 4 && 'Access Ready'}
          </h1>
          <p className="text-sm text-text-muted font-sans max-w-md mx-auto">
            {step === 1 && 'Tell us your focus area to tailor your onboarding experience.'}
            {step === 2 && (
              persona === 'business'
                ? 'How Atlas delivers deterministic, cost-effective reasoning for enterprise workloads.'
                : persona === 'academic'
                ? 'How unaligned reasoning expands formal logic proofs, benchmarks, and interpretability.'
                : 'How sub-15ms local reasoning elevates your developer tools, agents, and apps.'
            )}
            {step === 3 && (
              persona === 'business'
                ? 'Enter your organization details for enterprise pipeline clearance.'
                : persona === 'academic'
                ? 'Enter your academy details for research model access.'
                : 'Enter your name and email to receive your developer sandbox pass.'
            )}
            {step === 4 && 'Your access pass has been verified and provisioned.'}
          </p>
        </div>

        {/* 4-Bar Stepper Indicator */}
        <div className="flex items-center justify-center gap-2.5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === s
                  ? 'w-10 bg-accent-pri'
                  : step > s
                  ? 'w-8 bg-accent-sec/50'
                  : 'w-8 bg-border-subtle'
              }`}
            />
          ))}
        </div>

        {/* Dynamic Card Container */}
        <AnimatePresence mode="wait">
          {/* STEP 1: FOCUS AREA SELECTION (Exact match to screenshot) */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-3">
                {/* Business & Enterprise */}
                <button
                  type="button"
                  onClick={() => setPersona('business')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    persona === 'business'
                      ? 'bg-surface border-accent-pri shadow-sm ring-1 ring-accent-pri/30'
                      : 'bg-surface/60 border-border-subtle hover:border-border-strong hover:bg-surface'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl transition-colors shrink-0 ${
                      persona === 'business'
                        ? 'bg-accent-pri text-canvas'
                        : 'bg-surface-subtle text-text-muted'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-text-main font-sans">
                        Business &amp; Enterprise
                      </h3>
                      {persona === 'business' && (
                        <Check className="w-4 h-4 text-accent-pri shrink-0 stroke-[2.5]" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      Deploying high-throughput reasoning workloads, private VPC endpoints, sub-millisecond SLAs, and strict data governance.
                    </p>
                  </div>
                </button>

                {/* Academic & Research */}
                <button
                  type="button"
                  onClick={() => setPersona('academic')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    persona === 'academic'
                      ? 'bg-surface border-accent-pri shadow-sm ring-1 ring-accent-pri/30'
                      : 'bg-surface/60 border-border-subtle hover:border-border-strong hover:bg-surface'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl transition-colors shrink-0 ${
                      persona === 'academic'
                        ? 'bg-accent-pri text-canvas'
                        : 'bg-surface-subtle text-text-muted'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-text-main font-sans">
                        Academic &amp; Research
                      </h3>
                      {persona === 'academic' && (
                        <Check className="w-4 h-4 text-accent-pri shrink-0 stroke-[2.5]" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      Investigating formal logic, test-time compute scaling laws, reproducible benchmarks, and model internals.
                    </p>
                  </div>
                </button>

                {/* Developer & Builder */}
                <button
                  type="button"
                  onClick={() => setPersona('general')}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    persona === 'general'
                      ? 'bg-surface border-accent-pri shadow-sm ring-1 ring-accent-pri/30'
                      : 'bg-surface/60 border-border-subtle hover:border-border-strong hover:bg-surface'
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl transition-colors shrink-0 ${
                      persona === 'general'
                        ? 'bg-accent-pri text-canvas'
                        : 'bg-surface-subtle text-text-muted'
                    }`}
                  >
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-bold text-text-main font-sans">
                        Developer &amp; Builder
                      </h3>
                      {persona === 'general' && (
                        <Check className="w-4 h-4 text-accent-pri shrink-0 stroke-[2.5]" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      Building applications, competitive programming agents, CLI tools, and integrating reasoning into developer workflows.
                    </p>
                  </div>
                </button>
              </div>

              {/* Step 1 Footer with Continue Button (Bottom Right) */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-text-dim font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-pri" />
                  <span>Free access tier • Instant clearance</span>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROFESSION BENEFITS (Why Atlas for Your Role) */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
            >
              {/* Selected Track Reminder & Switcher */}
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-text-dim">Tailored for:</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-accent-pri/10 text-accent-pri border border-accent-pri/20">
                    {persona === 'business' && <Building className="w-3 h-3" />}
                    {persona === 'academic' && <GraduationCap className="w-3 h-3" />}
                    {persona === 'general' && <Terminal className="w-3 h-3" />}
                    <span>{currentBenefits.badge}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-mono text-text-dim hover:text-accent-pri transition-colors cursor-pointer"
                >
                  Change Track
                </button>
              </div>

              {/* Title & Key Stat Headline (Horizontal) */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1 min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-black text-text-main font-sans tracking-tight">
                    {currentBenefits.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
                    {currentBenefits.summary}
                  </p>
                </div>

                <div className="px-4 py-2.5 bg-canvas/80 border border-border-subtle rounded-2xl flex items-center gap-3 shrink-0 self-start sm:self-auto">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-accent-pri">
                    {currentBenefits.statValue}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-text-dim leading-tight max-w-[130px]">
                    {currentBenefits.statLabel}
                  </div>
                </div>
              </div>

              {/* Exactly 3 Horizontal Cards with Description Under the Title */}
              <div className="space-y-3">
                {currentBenefits.features.slice(0, 3).map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-canvas/40 border border-border-subtle hover:border-border-strong hover:bg-canvas/70 transition-all flex items-start gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-accent-pri/10 border border-accent-pri/25 flex items-center justify-center text-accent-pri shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm font-bold text-text-main font-sans">
                            {feat.title}
                          </h3>
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-surface border border-border-subtle text-text-dim group-hover:text-text-main group-hover:border-accent-pri/30 transition-colors shrink-0">
                            {feat.pill}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted font-sans leading-relaxed">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clearance Highlights Banner */}
              <div className="p-3 bg-accent-pri/5 border border-accent-pri/20 rounded-2xl flex items-center gap-3 text-xs">
                <div className="p-1.5 rounded-xl bg-accent-pri/15 text-accent-pri shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-text-main mr-1.5 font-sans">
                    {currentBenefits.highlightTitle}
                  </span>
                  <span className="text-text-muted font-sans leading-relaxed">
                    {currentBenefits.highlightDesc}
                  </span>
                </div>
              </div>

              {/* Step 2 Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-text-muted hover:text-text-main text-xs font-bold font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.98]"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DYNAMIC DETAILS FORM (Minimal & User-Friendly, Uncluttered) */}
          {step === 3 && (
            <motion.form
              key="step-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleComplete}
              className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl"
            >
              {/* Selected Track Reminder Pill */}
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-text-dim">Selected Track:</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-accent-pri/10 text-accent-pri border border-accent-pri/20">
                    {persona === 'business' && <Building className="w-3 h-3" />}
                    {persona === 'academic' && <GraduationCap className="w-3 h-3" />}
                    {persona === 'general' && <Terminal className="w-3 h-3" />}
                    <span>
                      {persona === 'business'
                        ? 'Business & Enterprise'
                        : persona === 'academic'
                        ? 'Academic & Research'
                        : 'Developer & Builder'}
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-mono text-text-dim hover:text-accent-pri transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Clean Inputs */}
              <div className="space-y-4">
                {/* 1. Full Name - Mandatory for all 3 tracks */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-text-muted">
                      Full Name <span className="text-accent-pri">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-accent-pri font-semibold">Required</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    autoFocus
                    className="w-full px-4 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                  />
                </div>

                {/* 2. Organization / Academy Input (Dynamic mandatory rules) */}
                {persona === 'business' && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-text-muted">
                        Name of Organization <span className="text-accent-pri">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-accent-pri font-semibold">Required</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Acme AI Systems / Capital"
                      className="w-full px-4 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                    />
                  </div>
                )}

                {persona === 'academic' && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono font-bold text-text-muted">
                        Name of Academy / University <span className="text-accent-pri">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-accent-pri font-semibold">Required</span>
                    </div>
                    <input
                      type="text"
                      required
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="e.g. Stanford University / Research Lab"
                      className="w-full px-4 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                    />
                  </div>
                )}

                {persona === 'general' && (
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
                      className="w-full px-4 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                    />
                  </div>
                )}

                {/* 3. Email Address - Mandatory for all */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-text-muted">
                      {persona === 'business'
                        ? 'Work Email Address'
                        : persona === 'academic'
                        ? 'Academic / Institutional Email'
                        : 'Email Address'}{' '}
                      <span className="text-accent-pri">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-accent-pri font-semibold">Required</span>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      persona === 'business'
                        ? 'you@company.com'
                        : persona === 'academic'
                        ? 'researcher@university.edu'
                        : 'you@domain.com'
                    }
                    className="w-full px-4 py-2.5 input-neutral rounded-xl text-sm focus:outline-none focus:border-accent-pri"
                  />
                </div>
              </div>

              {/* Navigation & Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-text-muted hover:text-text-main text-xs font-bold font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !email ||
                    !fullName.trim() ||
                    ((persona === 'business' || persona === 'academic') && !organization.trim())
                  }
                  className="px-6 py-2.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>{isSubmitting ? 'Issuing Pass...' : 'Get Instant Access'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Uncluttered trust indicator */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-text-dim font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-accent-pri" />
                  No card required
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-accent-pri" />
                  Instant Sandbox Token
                </span>
              </div>
            </motion.form>
          )}

          {/* STEP 4: ACCESS READY */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-9 space-y-6 shadow-xl"
            >
              {/* Success Badge & Headline */}
              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-accent-pri/10 border border-accent-pri/30 flex items-center justify-center mx-auto text-accent-pri">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-accent-pri uppercase tracking-wider bg-accent-pri/10 px-2.5 py-0.5 rounded-full border border-accent-pri/20">
                    Access Pass Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-text-main font-sans">
                    Welcome to Odyssey, {fullName || 'Researcher'}
                  </h2>
                  <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto">
                    Your early access pass is active. You have full clearance to test Atlas 0.1 models and inspect reasoning outputs.
                  </p>
                </div>
              </div>

              {/* Minimal Token Card */}
              <div className="p-4 bg-canvas border border-border-subtle rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-text-dim">
                  <span>YOUR ACCESS TOKEN</span>
                  <span className="text-accent-pri font-bold capitalize">{persona} Track</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm font-bold text-accent-pri truncate">
                    {assignedToken}
                  </span>
                  <button
                    type="button"
                    onClick={copyTokenToClipboard}
                    className="px-3 py-1.5 bg-surface hover:bg-border-subtle border border-border-subtle text-xs font-mono text-text-main rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1 font-bold"
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
              </div>

              {/* Clear, direct action buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full py-3.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Atlas 0.1 Sandbox Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('dashboard')}
                  className="w-full py-3 bg-surface hover:bg-surface-subtle text-text-main border border-border-subtle hover:border-accent-pri font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Go to Researcher Portal</span>
                  <ArrowRight className="w-4 h-4 text-accent-pri" />
                </button>
              </div>

              {/* Minimal Invite Sharing */}
              <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-dim">
                <span>Invite code: <strong className="text-text-main">{inviteCode}</strong></span>
                <button
                  type="button"
                  onClick={copyInviteLink}
                  className="text-accent-pri hover:underline cursor-pointer flex items-center gap-1"
                >
                  {copiedLink ? <span>Link Copied!</span> : <span>Copy Invite Link</span>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
