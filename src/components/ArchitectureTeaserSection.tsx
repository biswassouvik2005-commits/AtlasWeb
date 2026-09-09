import React from 'react';
import { motion } from 'motion/react';
import { Cpu, RefreshCw, Layers, ShieldCheck, ArrowRight, Zap, Database } from 'lucide-react';

interface ArchitectureTeaserSectionProps {
  onOpenDemo?: () => void;
}

export const ArchitectureTeaserSection: React.FC<ArchitectureTeaserSectionProps> = ({ onOpenDemo }) => {
  return (
    <section className="bg-canvas border-b border-border-subtle font-sans py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-6 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-subtle text-xs font-mono text-accent-pri rounded-md font-bold">
              <span>// ARCHITECTURAL BLUEPRINT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight font-sans">
              Fundamentally Re-Engineered.
            </h2>
            <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed">
              Mainstream models brute-force intelligence by stacking dozens of redundant physical layers. 
              Project Atlas changes the core substrate: a dynamic recurrent core with test-time compute scaling and linear state memory.
            </p>
          </div>

          <div className="text-xs sm:text-sm font-mono text-text-muted space-y-1 bg-surface p-4 rounded-xl border border-border-subtle shrink-0">
            <div><span className="text-text-dim">PARADIGM:</span> Dynamic Recurrent Core</div>
            <div><span className="text-text-dim">CONTEXT:</span> O(N) Linear State Space</div>
            <div><span className="text-text-dim">TRAINING:</span> Dual-Optimizer Stabilized</div>
          </div>
        </div>

        {/* Minimal ASCII Architecture Diagram */}
        <div className="bg-surface border border-border-subtle rounded-2xl p-6 sm:p-8 font-mono text-xs sm:text-sm text-text-muted overflow-x-auto shadow-sm">
          <div className="text-text-dim text-[11px] uppercase tracking-wider mb-3">
            [ High-Level Proprietary Dataflow ]
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
            {/* Stage 1 */}
            <div className="bg-canvas border border-border-subtle p-5 rounded-xl space-y-2">
              <div className="text-accent-pri font-bold">PROPRIETARY PRELUDE</div>
              <div className="text-text-dim text-xs">Static Token Representation Layer</div>
              <div className="text-[11px] text-text-muted pt-1">Dense vocabulary projection without alignment masks</div>
            </div>

            {/* Stage 2 (Core) */}
            <div className="bg-canvas border-2 border-accent-pri p-5 rounded-xl space-y-2 relative shadow-sm">
              <div className="text-accent-pri font-bold flex items-center justify-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>DYNAMIC RECURRENT CORE</span>
              </div>
              <div className="text-text-main text-xs font-semibold">Adaptive Test-Time Latent Loop</div>
              <div className="text-[11px] text-accent-pri">Recursive depth scales with problem complexity</div>
            </div>

            {/* Stage 3 */}
            <div className="bg-canvas border border-border-subtle p-5 rounded-xl space-y-2">
              <div className="text-accent-pri font-bold">PROPRIETARY CODA</div>
              <div className="text-text-dim text-xs">Deterministic Logit Mapping</div>
              <div className="text-[11px] text-text-muted pt-1">Zero conversational hedging. Direct solution emit</div>
            </div>
          </div>
        </div>

        {/* 4 Core Architectural Innovations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {/* Pillar 1 */}
          <div className="bg-surface border border-border-subtle p-6 rounded-2xl space-y-3.5">
            <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-accent-pri">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-text-main">Dynamic Recurrent Depth</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Instead of static physical layers, tokens traverse a compact, recursively unrolled recurrent core. Hard problems dynamically get deeper compute passes.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-surface border border-border-subtle p-6 rounded-2xl space-y-3.5">
            <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-accent-pri">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-text-main">Linear-Time State O(N)</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Continuous state-space tracking alongside attention enables long-context dependency tracing with over 88% reduction in Key-Value memory footprint.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-surface border border-border-subtle p-6 rounded-2xl space-y-3.5">
            <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-accent-pri">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-text-main">Dual-Optimizer Stability</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Proprietary multi-optimizer training mathematically guarantees recurrent gradient stability, preventing loss divergence across deep recursive loops.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-surface border border-border-subtle p-6 rounded-2xl space-y-3.5">
            <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-accent-pri">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-text-main">External Sandboxing</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Safety is decoupled entirely from neural weights. Evaluations execute inside air-gapped system runtime sandboxes, leaving model intelligence unwarped.
            </p>
          </div>
        </div>

        {/* Demo Link */}
        {onOpenDemo && (
          <div className="flex justify-center pt-2">
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 text-sm font-mono text-accent-pri hover:underline cursor-pointer font-bold"
            >
              <span>See Atlas 0.1 CP in action on competitive programming benchmarks</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
