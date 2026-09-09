import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RoutePath } from '../../types';
import {
  ShieldCheck,
  User,
  Building,
  CheckCircle2,
  Layers,
  LogOut,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  Lock,
  Zap,
} from 'lucide-react';

interface ProfileViewProps {
  navigate: (route: RoutePath) => void;
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
  onOpenAuth: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  navigate,
  onOpenDemo,
  onOpenAuth,
}) => {
  const { user, waitlistEntry, submitWaitlist, signOut, refreshData } = useAuth();

  // Profile state
  const [org, setOrg] = useState(waitlistEntry?.organization || '');
  const [role, setRole] = useState(waitlistEntry?.role || 'Researcher / Developer');
  const [deliveryChannel, setDeliveryChannel] = useState<'all' | 'hosted_api' | 'compiled_binary' | 'weights'>(
    waitlistEntry?.delivery_channel || 'all'
  );
  const [intendedUse, setIntendedUse] = useState(
    waitlistEntry?.intended_use || 'Algorithmic logic benchmarking and test-time scaling studies on Atlas 0.1.'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    await submitWaitlist({
      organization: org,
      role,
      delivery_channel: deliveryChannel,
      intended_use: intendedUse,
    });

    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // If user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-canvas text-text-main py-16 sm:py-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-subtle rounded-full text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-accent-pri" />
            <span className="text-text-muted">Account Access Required</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-text-main font-sans">
            Researcher Profile
          </h1>

          <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
            Sign in to view your research credentials, verify referral tokens, and manage application preferences.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAuth}
              className="px-6 py-2.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Sign In / Register
            </button>
            <button
              onClick={() => navigate('join')}
              className="px-6 py-2.5 bg-surface hover:bg-border-subtle text-text-main border border-border-subtle font-mono text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Have a Referral Code?
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-text-main py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Clean Header Bar */}
        <div className="bg-surface border border-border-subtle rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-accent-pri font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified
              </span>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted truncate max-w-[200px] sm:max-w-xs">{user.email}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-text-main font-sans">
              Researcher Profile
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              className="p-2 text-text-muted hover:text-text-main hover:bg-surface-subtle border border-border-subtle rounded-xl transition-all cursor-pointer"
              title="Sync Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('dashboard')}
              className="px-3.5 py-2 bg-surface-subtle hover:bg-border-subtle text-text-main border border-border-subtle text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
            >
              Dashboard
            </button>
            <button
              onClick={signOut}
              className="px-3 py-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 border border-border-subtle rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>

        {/* Minimal Edit Specifications Form */}
        <form
          onSubmit={handleProfileSubmit}
          className="bg-surface border border-border-subtle rounded-2xl p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h2 className="text-sm font-mono font-bold text-text-main uppercase tracking-wider">
              Profile &amp; Deployment Preferences
            </h2>
            {saveSuccess && (
              <div className="text-xs font-mono text-accent-pri flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved successfully</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-accent-pri" />
                Organization / Institution
              </label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="e.g. CUET CSE / Research Lab"
                className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent-sec"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-accent-pri" />
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. ML Researcher, Quant Engineer"
                className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent-sec"
              />
            </div>
          </div>

          {/* Delivery Channel Flexibility Info & Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent-pri" />
                Delivery Flexibility
              </label>
              <span className="text-[10px] font-mono text-accent-pri bg-accent-pri/10 px-2 py-0.5 rounded-full border border-accent-pri/20 font-bold">
                All Formats Included
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {(['all', 'hosted_api', 'compiled_binary', 'weights'] as const).map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setDeliveryChannel(ch)}
                  className={`py-2 px-2.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                    deliveryChannel === ch
                      ? 'bg-accent-pri text-canvas border-accent-pri'
                      : 'bg-surface-subtle text-text-muted border-border-subtle hover:text-text-main'
                  }`}
                >
                  {ch === 'all'
                    ? 'All Channels'
                    : ch === 'hosted_api'
                    ? 'Hosted API'
                    : ch === 'compiled_binary'
                    ? 'Native C++'
                    : 'Weights'}
                </button>
              ))}
            </div>
          </div>

          {/* Fully Managed Compute Note */}
          <div className="p-3.5 bg-canvas border border-border-subtle rounded-xl flex items-center gap-2.5 text-xs text-text-muted">
            <Zap className="w-4 h-4 text-accent-pri shrink-0" />
            <span>
              <strong className="text-text-main">Managed Infrastructure:</strong> Odyssey handles all compute allocation, model serving, and acceleration infrastructure on our side.
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-text-muted">
              Primary Use Case / Research Focus
            </label>
            <textarea
              rows={3}
              value={intendedUse}
              onChange={(e) => setIntendedUse(e.target.value)}
              placeholder="Describe your reasoning evaluation or application goals..."
              className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent-sec resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-subtle">
            <button
              type="button"
              onClick={onOpenDemo}
              className="px-4 py-2 text-text-muted hover:text-text-main border border-border-subtle rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Sandbox Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
