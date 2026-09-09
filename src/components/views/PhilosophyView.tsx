import React from 'react';
import { PHILOSOPHY_PILLARS } from '../../data';
import { Layers, Lock, ShieldCheck, CheckCircle2, XCircle, Zap, ShieldOff } from 'lucide-react';

interface PhilosophyViewProps {
  onOpenWaitlist: () => void;
}

export const PhilosophyView: React.FC<PhilosophyViewProps> = ({ onOpenWaitlist }) => {
  return (
    <div className="bg-canvas font-sans text-text-main py-12 md:py-16 space-y-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b border-border-subtle pb-6 space-y-3">
          <div className="text-xs text-accent-pri font-mono flex items-center gap-2 font-bold">
            <span>[ ROUTE: /PHILOSOPHY ]</span>
            <span>//</span>
            <span>THE UNCONSTRAINED INTELLIGENCE MANIFESTO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight font-sans">
            The Zero Alignment Tax Thesis
          </h1>
          <p className="text-sm sm:text-base text-text-muted font-sans max-w-3xl leading-relaxed">
            Mainstream AI providers spend massive compute budgets on internal behavioral regulation and conversational censorship (RLHF). While meant for consumer chatbots, this alters the underlying neural representations—destroying raw mathematical logic and triggering severe false refusals on engineering tasks.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PHILOSOPHY_PILLARS.map((p, idx) => (
            <div key={p.id} className="bg-surface border border-border-subtle p-6 space-y-2.5 rounded-2xl relative">
              <div className={`text-xs font-mono font-bold ${idx === 1 ? 'text-accent-sec' : 'text-accent-pri'}`}>
                [{p.id}]
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-text-main font-sans">{p.title}</h2>
              <div className={`text-xs font-semibold font-sans ${idx === 1 ? 'text-accent-sec' : 'text-accent-pri'}`}>
                {p.subtitle}
              </div>
              <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        {/* Deep Comparison Section */}
        <div className="bg-surface border border-border-subtle p-6 sm:p-8 space-y-6 rounded-3xl shadow-sm">
          <div className="border-b border-border-subtle pb-4 font-mono space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-text-main font-sans">Architectural Paradigm Shift</h2>
            <p className="text-xs sm:text-sm text-accent-pri">Decoupling Safety from Neural Weights to Unleash 100% Parameter Efficiency</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
            {/* Monolithic Paradigm */}
            <div className="bg-canvas p-6 border border-border-subtle space-y-4 rounded-2xl">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2 text-accent-sec font-bold text-base font-sans">
                  <XCircle className="w-4 h-4 text-accent-sec" />
                  Standard Regulated Models
                </div>
                <span className="text-xs text-text-dim bg-surface px-2 py-0.5 border border-border-subtle font-bold rounded-md">
                  Standard 7B Generalists
                </span>
              </div>
              <div className="space-y-3 text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong className="text-text-main">1. Heavy Internal Regulation:</strong> Bakes conversational censorship directly into model weights, corrupting dense mathematical pathways.
                </p>
                <p>
                  <strong className="text-text-main">2. False-Refusal Liabilities:</strong> Triggers safety stops on low-level pointer arithmetic, security penetration traces, and recursion trees.
                </p>
                <p>
                  <strong className="text-text-main">3. Conversational Parameter Overhead:</strong> Wastes large parameter capacity on chat pleasantries and conversational padding.
                </p>
                <p>
                  <strong className="text-text-main">4. Cloud Latency &amp; Lock-in:</strong> Requires constant external API calls and locks enterprise codebases into public cloud endpoints.
                </p>
              </div>
            </div>

            {/* Odyssey Paradigm */}
            <div className="bg-canvas p-6 border border-accent-pri/50 space-y-4 rounded-2xl">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <div className="flex items-center gap-2 text-text-main font-bold text-base font-sans">
                  <CheckCircle2 className="w-4 h-4 text-accent-pri" />
                  Odyssey Unaligned Base Engines
                </div>
                <span className="text-xs text-accent-pri bg-surface-subtle px-2 py-0.5 border border-border-subtle font-bold rounded-md">
                  Sub-1B to 14B Specialists
                </span>
              </div>
              <div className="space-y-3 text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
                <p>
                  <strong className="text-text-main">1. Zero Alignment Tax:</strong> 100% of parameters dedicated strictly to raw, uninhibited reasoning and mathematical precision.
                </p>
                <p>
                  <strong className="text-text-main">2. Zero False Refusals:</strong> Uninhibited execution on competitive programming, memory debugging, and systems engineering.
                </p>
                <p>
                  <strong className="text-text-main">3. Decoupled Perimeter Governance:</strong> Safety transitions to application-layer firewalls, giving teams full control without intelligence loss.
                </p>
                <p>
                  <strong className="text-text-main">4. Commodity Edge Deployment:</strong> Operates at 6,500+ tok/s on a single commodity GPU with &lt; 4GB VRAM in private VPCs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Callout */}
        <div className="p-6 bg-surface border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 font-mono rounded-3xl shadow-sm">
          <div className="space-y-1">
            <div className="text-text-main font-bold font-sans text-base sm:text-lg">Interested in Testing Unconstrained Latent Models</div>
            <div className="text-text-muted text-xs sm:text-sm">Apply for verified organization queue access for Atlas 0.1</div>
          </div>
          <button
            onClick={onOpenWaitlist}
            className="px-5 py-2.5 bg-accent-pri text-canvas font-bold text-xs sm:text-sm hover:bg-accent-pri-hover transition-all cursor-pointer whitespace-nowrap shadow-sm rounded-xl"
          >
            Request Early Access
          </button>
        </div>
      </div>
    </div>
  );
};
