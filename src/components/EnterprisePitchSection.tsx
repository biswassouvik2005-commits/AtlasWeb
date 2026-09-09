import React from 'react';
import { ShieldCheck, Server, Lock, Zap, ArrowRight, ShieldOff, CheckCircle2 } from 'lucide-react';

interface EnterprisePitchSectionProps {
  onOpenWaitlist: () => void;
}

export const EnterprisePitchSection: React.FC<EnterprisePitchSectionProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="bg-canvas border-b border-border-subtle font-mono py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-border-subtle p-9 sm:p-14 space-y-12 rounded-3xl relative overflow-hidden shadow-sm">
          {/* Top Marker */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-canvas border border-border-subtle text-xs sm:text-sm text-text-main rounded-xl font-bold">
              <ShieldCheck className="w-4 h-4 text-accent-pri" />
              <span>ENTERPRISE PRIVATE PERIMETER</span>
            </div>
            <div className="text-xs sm:text-sm text-text-dim font-mono hidden sm:block">
              ZERO_DATA_EGRESS // PRIVATE_VPC
            </div>
          </div>

          <div className="max-w-4xl space-y-5">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-text-main tracking-tight leading-tight font-sans">
              The future of enterprise AI is private, sovereign, and specialized
            </h2>

            <p className="text-lg sm:text-xl text-text-muted font-sans leading-relaxed">
              The era of sending proprietary enterprise code to public, heavily censored generalist APIs is ending. Odyssey provides organizations with unaligned base engines that deploy directly inside your private cloud or on-premise hardware. Secure intellectual property, eliminate API latency, remove false refusals, and cut inference costs by up to 90%.
            </p>
          </div>

          {/* Key Enterprise Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 font-mono">
            <div className="bg-canvas p-8 space-y-4 rounded-2xl border border-border-subtle hover:border-accent-sec/50 transition-colors">
              <div className="flex items-center gap-3 text-text-main font-bold text-xl sm:text-2xl font-sans">
                <Lock className="w-5 h-5 text-accent-sec shrink-0" />
                <span className="text-accent-sec">100% Sovereignty</span>
              </div>
              <p className="text-text-muted font-sans leading-relaxed text-base">
                Zero cloud exposure. Deploy air-gapped Docker containers and Kubernetes clusters entirely within your private VPC perimeter.
              </p>
            </div>

            <div className="bg-canvas p-8 space-y-4 rounded-2xl border border-border-subtle hover:border-accent-pri/50 transition-colors">
              <div className="flex items-center gap-3 text-text-main font-bold text-xl sm:text-2xl font-sans">
                <Zap className="w-5 h-5 text-accent-pri shrink-0" />
                <span>Sub-Millisecond</span>
              </div>
              <p className="text-text-muted font-sans leading-relaxed text-base">
                Eliminate external HTTP round-trips with local edge and single commodity GPU runtime integration.
              </p>
            </div>

            <div className="bg-canvas p-8 space-y-4 rounded-2xl border border-border-subtle hover:border-accent-pri/50 transition-colors">
              <div className="flex items-center gap-3 text-text-main font-bold text-xl sm:text-2xl font-sans">
                <Server className="w-5 h-5 text-accent-pri shrink-0" />
                <span>90% Cost Savings</span>
              </div>
              <p className="text-text-muted font-sans leading-relaxed text-base">
                Execute high-density sub-1B and 7B specialists on commodity GPUs ($0.35/hr) instead of multi-million dollar 8x H100 clusters.
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-6 border-t border-border-subtle">
            <div className="text-base text-text-dim font-sans">
              Verified organization queue open for closed beta evaluation.
            </div>

            <button
              onClick={onOpenWaitlist}
              className="inline-flex items-center gap-3 px-7 py-4 bg-accent-pri text-canvas hover:bg-accent-pri-hover font-bold text-base transition-all cursor-pointer rounded-xl shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Apply for Sovereign Deployment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
