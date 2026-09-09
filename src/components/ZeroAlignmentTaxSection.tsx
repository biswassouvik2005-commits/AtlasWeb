import React from 'react';
import { motion } from 'motion/react';
import { ShieldOff, ShieldCheck, XCircle, CheckCircle2, ArrowRight, Play, Cpu, Layers, Terminal } from 'lucide-react';

interface ZeroAlignmentTaxSectionProps {
  onOpenDemo?: () => void;
  onOpenWaitlist?: () => void;
}

export const ZeroAlignmentTaxSection: React.FC<ZeroAlignmentTaxSectionProps> = ({
  onOpenDemo,
  onOpenWaitlist,
}) => {
  return (
    <section className="bg-canvas border-b border-border-subtle font-sans py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface border border-border-subtle text-xs sm:text-sm text-text-main font-bold rounded-full shadow-sm font-mono">
            <ShieldOff className="w-4 h-4 text-accent-pri" />
            <span className="text-accent-pri font-mono">[ CORE THESIS ]</span>
            <span className="text-text-main uppercase tracking-wider">
              Zero Alignment Tax
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-text-main tracking-tight leading-[1.1] font-sans">
            100% logic density.{' '}
            <span className="text-accent-pri">Zero corporate guardrails.</span>
          </h2>

          <p className="text-base sm:text-xl text-text-muted font-sans leading-relaxed max-w-3xl mx-auto">
            Mainstream frontier labs spend billions forcing foundation models into polite conversationalists. 
            In doing so, internal censorship fine-tuning warps underlying latent representations—destroying 
            mathematical precision, triggering false refusals on engineering tasks, and wasting up to 40% of 
            active parameter capacity.
          </p>
        </motion.div>

        {/* Head-to-head Contrast Grid: Mainstream Regulated vs Odyssey Unaligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Mainstream Regulated Models */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-border-subtle rounded-3xl p-7 sm:p-10 flex flex-col justify-between space-y-8 shadow-sm"
          >
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-5">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-text-dim uppercase tracking-wider">The Mainstream Standard</div>
                  <h3 className="text-2xl font-bold text-text-main font-sans">Regulated Chat Models</h3>
                </div>
                <span className="px-3 py-1 bg-surface-subtle border border-border-subtle text-text-dim text-xs font-mono font-bold rounded-lg flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-text-dim" />
                  Taxed & Degraded
                </span>
              </div>

              {/* Specific Tax Drawbacks */}
              <div className="space-y-4 font-sans text-sm sm:text-base text-text-muted">
                <div className="flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-border-strong mt-2 shrink-0" />
                  <div>
                    <strong className="text-text-main font-semibold">40%+ Parameter Capacity Wasted: </strong>
                    Heavily bloated with conversational preambles, tone policing, and apologetic disclaimers before emitting answers.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-border-strong mt-2 shrink-0" />
                  <div>
                    <strong className="text-text-main font-semibold">Neural Representation Corruption: </strong>
                    Aggressive RLHF and constitutional fine-tuning distorts mathematical graphs, severely dampening algorithmic deduction.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-border-strong mt-2 shrink-0" />
                  <div>
                    <strong className="text-text-main font-semibold">Frequent False Refusals: </strong>
                    Halts on low-level pointers, cybersecurity analysis, reverse engineering, and deep recursion due to paranoid safety heuristics.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-border-strong mt-2 shrink-0" />
                  <div>
                    <strong className="text-text-main font-semibold">Prohibitive Scale Required: </strong>
                    Needs massive 70B+ parameter graphs simply to compensate for reasoning capabilities destroyed by alignment.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metric Pill */}
            <div className="bg-canvas border border-border-subtle rounded-2xl p-4 font-mono text-xs sm:text-sm flex items-center justify-between text-text-dim">
              <span>Refusal & Censorship Overhead:</span>
              <span className="text-text-main font-bold">~18.4% Refusal Rate</span>
            </div>
          </motion.div>

          {/* Card 2: Odyssey Zero Alignment Tax */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-surface border border-accent-pri/50 rounded-3xl p-7 sm:p-10 flex flex-col justify-between space-y-8 shadow-sm relative overflow-hidden"
          >
            <div className="space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-5">
                <div className="space-y-1">
                  <div className="text-xs font-mono text-accent-pri uppercase tracking-wider">The Odyssey Paradigm</div>
                  <h3 className="text-2xl font-bold text-text-main font-sans">Zero Alignment Tax</h3>
                </div>
                <span className="px-3 py-1 bg-surface-subtle border border-accent-pri/40 text-accent-pri text-xs font-mono font-bold rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-pri" />
                  100% Unconstrained
                </span>
              </div>

              {/* Specific Zero Tax Advantages */}
              <div className="space-y-4 font-sans text-sm sm:text-base text-text-muted">
                <div className="flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-accent-pri mt-2 shrink-0" />
                  <div>
                    <strong className="text-text-main font-semibold">100% Latent Reasoning Density: </strong>
                    Every parameter is dedicated strictly to formal algorithmic execution, mathematics, and deterministic logic.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-accent-pri mt-2 shrink-0" />
                  <div>
                    <strong className="text-text-main font-semibold">Pure Unwarped Representations: </strong>
                    Zero RLHF degradation. Weights preserve pristine mathematical invariant graphs and deep recursion trees.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-accent-pri mt-2 shrink-0" />
                  <div>
                    <strong className="text-text-main font-semibold">Zero False Refusal Stops: </strong>
                    Execute complex systems programming, exploits analysis, and compilation steps without apologetic interruptions.
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="w-2 h-2 rounded-full bg-accent-pri mt-2 shrink-0" />
                  <div>
                    <strong className="text-text-main font-semibold">Decoupled Perimeter Safety: </strong>
                    Governance belongs at the application firewall, not baked into neural weights. Total control remains in your hands.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Metric Pill */}
            <div className="bg-canvas border border-border-subtle rounded-2xl p-4 font-mono text-xs sm:text-sm flex items-center justify-between text-text-muted">
              <span>Alignment Tax Overhead:</span>
              <span className="text-accent-pri font-bold font-mono">0.0% (Zero Tax)</span>
            </div>
          </motion.div>
        </div>

        {/* The 3 Core Pillars of Zero Alignment Tax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 font-sans">
          <div className="bg-surface border border-border-subtle rounded-2xl p-7 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-accent-pri">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-text-main">Pure Latent Flow</h4>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Without behavioral alignment penalties, models explore latent search graphs with uninhibited mathematical fluency.
            </p>
          </div>

          <div className="bg-surface border border-border-subtle rounded-2xl p-7 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-accent-pri">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-text-main">Decoupled Perimeter</h4>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Enterprise policy is enforced at your API boundary. The reasoning core remains fast, deterministic, and pristine.
            </p>
          </div>

          <div className="bg-surface border border-border-subtle rounded-2xl p-7 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-accent-pri">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-xl font-bold text-text-main">10x Compute Density</h4>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Sub-1B specialist engines match and surpass bloated 7B generalist models—running locally on commodity GPUs.
            </p>
          </div>
        </div>

        {/* Action Callout */}
        {onOpenDemo && (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 font-sans">
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm sm:text-base rounded-xl transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Test Zero Alignment Tax in Atlas 0.1</span>
            </button>

            {onOpenWaitlist && (
              <button
                onClick={onOpenWaitlist}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] font-bold text-sm sm:text-base border border-accent-sec/40 hover:border-accent-sec rounded-xl transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Private VPC Access</span>
                <ArrowRight className="w-4 h-4 text-accent-sec" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
