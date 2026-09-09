import React, { useState } from 'react';
import { X, ShieldCheck, ExternalLink, RefreshCw, Layers, CheckCircle2, ArrowRight, User, Building, Cpu, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDashboard?: () => void;
  onOpenJoin?: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, onOpenDashboard, onOpenJoin }) => {
  const { user, waitlistEntry, submitWaitlist } = useAuth();
  const [activeTab, setActiveTab] = useState<'direct' | 'tally'>('direct');

  // Direct waitlist form state
  const [email, setEmail] = useState(user?.email || '');
  const [fullName, setFullName] = useState((user?.user_metadata?.full_name as string) || '');
  const [organization, setOrganization] = useState((user?.user_metadata?.organization as string) || '');
  const [deliveryChannel, setDeliveryChannel] = useState<'all' | 'hosted_api' | 'compiled_binary' | 'weights'>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Tally Form ID
  const tallyFormId = 'Mej170';
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (!isOpen) return null;

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    const { error } = await submitWaitlist({
      email,
      full_name: fullName,
      organization,
      delivery_channel: deliveryChannel,
      intended_use: 'Evaluating Atlas 0.1 CP sub-1B deterministic reasoning model.',
    });

    setIsSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSubmitSuccess(true);
    }
  };

  const currentEmbedUrl = `https://tally.so/embed/Mej170?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#040605]/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-surface border border-border-subtle rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col text-text-main font-sans shadow-2xl relative overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between bg-canvas font-mono">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-accent-pri animate-pulse" />
            <div className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent-pri" />
              <span>Odyssey Access &amp; Waitlist</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenDashboard && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDashboard();
                }}
                className="px-3 py-1.5 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border border-accent-sec/40 hover:border-accent-sec text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-accent-sec" />
                <span>Researcher Portal</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-text-dim hover:text-text-main hover:bg-surface-subtle bg-surface rounded-xl border border-border-subtle hover:border-accent-pri transition-colors cursor-pointer shadow-sm"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center justify-between px-6 pt-3 pb-2 bg-canvas border-b border-border-subtle gap-2 font-mono text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('direct')}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 font-bold ${
                activeTab === 'direct'
                  ? 'bg-accent-pri text-canvas border-accent-pri shadow-sm'
                  : 'bg-accent-sec/15 text-[#E3DCFB] border-accent-sec/40 hover:bg-accent-sec/25'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Application</span>
            </button>

            <button
              onClick={() => setActiveTab('tally')}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 font-bold ${
                activeTab === 'tally'
                  ? 'bg-accent-pri text-canvas border-accent-pri shadow-sm'
                  : 'bg-surface text-text-muted border-border-subtle hover:text-text-main'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Tally KYC Form</span>
            </button>
          </div>

          {onOpenJoin && (
            <button
              onClick={() => {
                onClose();
                onOpenJoin();
              }}
              className="px-3 py-1.5 text-accent-pri hover:text-accent-pri-hover border border-accent-pri/30 hover:border-accent-pri bg-accent-pri/10 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <Key className="w-3.5 h-3.5 text-accent-pri" />
              <span>Have an Invite Code?</span>
            </button>
          )}
        </div>

        {/* Direct Tab Content */}
        {activeTab === 'direct' && (
          <div className="p-6 overflow-y-auto space-y-6">
            {submitSuccess ? (
              <div className="py-8 space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-accent-pri/10 border border-accent-pri/30 flex items-center justify-center mx-auto text-accent-pri">
                  <CheckCircle2 className="w-8 h-8 text-accent-pri" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-text-main font-sans">
                    You Are on the Odyssey Waitlist!
                  </h3>
                  <p className="text-sm text-text-muted max-w-md mx-auto">
                    Your application has been registered. You can track deployment bulletins, model updates, and your queue telemetry in your authenticated portal.
                  </p>
                </div>

                <div className="p-4 bg-surface-subtle border border-border-subtle rounded-2xl max-w-xs mx-auto font-mono text-center">
                  <div className="text-xs text-text-dim">ESTIMATED QUEUE POSITION</div>
                  <div className="text-3xl font-black text-accent-pri">
                    #{waitlistEntry?.position || 142}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {onOpenDashboard && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenDashboard();
                      }}
                      className="px-6 py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm rounded-xl cursor-pointer shadow-sm"
                    >
                      Go to Researcher Portal
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border border-accent-sec/40 hover:border-accent-sec font-bold text-sm rounded-xl cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDirectSubmit} className="space-y-4 font-sans text-sm">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-text-dim">
                    Direct entry into Atlas 0.1 CP evaluation pipeline.
                  </div>
                  <span className="text-[10px] font-mono text-accent-pri bg-surface-subtle px-2 py-0.5 rounded border border-border-subtle">
                    Verified Queue
                  </span>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-accent-pri" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:border-accent-sec"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-accent-pri" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@institution.edu"
                    className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:border-accent-sec"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-accent-pri" />
                    Organization or University
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. CUET CSE / Research Lab / Enterprise"
                    className="w-full px-3.5 py-2.5 input-neutral rounded-xl text-xs sm:text-sm placeholder:text-zinc-400 focus:outline-none focus:border-accent-sec"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-text-muted flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-accent-sec" />
                    Delivery Channel Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    {(['all', 'hosted_api', 'compiled_binary', 'weights'] as const).map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setDeliveryChannel(ch)}
                        className={`py-2 px-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          deliveryChannel === ch
                            ? 'bg-accent-sec/20 text-[#E3DCFB] border-accent-sec/50 shadow-sm'
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


                <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering...' : 'Submit Waitlist Application'}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border border-accent-sec/40 hover:border-accent-sec font-bold text-sm rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tally Tab Content */}
        {activeTab === 'tally' && (
          <div className="flex-1 min-h-[480px] sm:min-h-[540px] relative bg-surface flex flex-col items-center justify-center overflow-y-auto">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface font-mono text-xs text-text-dim z-10">
                <RefreshCw className="w-5 h-5 text-accent-pri animate-spin" />
                <span>Loading secure Tally form...</span>
              </div>
            )}

            <iframe
              src={currentEmbedUrl}
              onLoad={() => setIframeLoaded(true)}
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Odyssey Early Access Application Form"
              className="w-full h-full min-h-[480px] sm:min-h-[540px] border-none"
              allow="camera; microphone; autoplay; encrypted-media; fullscreen"
            />
          </div>
        )}

        {/* Footer info banner */}
        <div className="px-6 py-3 border-t border-border-subtle bg-canvas text-[11px] text-text-dim font-mono flex items-center justify-between">
          <span>Enterprise &amp; Academic Security Guaranteed</span>
          <button
            onClick={onClose}
            className="text-text-dim hover:text-accent-pri cursor-pointer"
          >
            [ Close ]
          </button>
        </div>
      </div>
    </div>
  );
};
