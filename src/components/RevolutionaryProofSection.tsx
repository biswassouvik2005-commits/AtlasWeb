import React, { useState } from 'react';
import { ShieldCheck, Zap, Activity, CheckCircle2, XCircle, ArrowUpRight, Cpu, Server, Lock, Play, ArrowRight } from 'lucide-react';

interface RevolutionaryProofSectionProps {
  onOpenDemo?: () => void;
}

export const RevolutionaryProofSection: React.FC<RevolutionaryProofSectionProps> = ({ onOpenDemo }) => {
  const [activeDimension, setActiveDimension] = useState<'reasoning' | 'throughput' | 'sovereignty'>('reasoning');

  const dimensionData = {
    reasoning: {
      title: 'Latent Space Reasoning & Logic Density',
      description: 'How eliminating regulation and alignment tax unleashes full model intelligence per parameter.',
      monolith: {
        label: 'Standard 7B Regulated Model',
        status: 'Taxed & Degraded',
        points: [
          'Over 60% of active latent capacity consumed by conversational etiquette & internal censorship filters.',
          'Frequent false-refusals on cybersecurity analysis, low-level pointers, and deep recursion trees.',
          'Requires large parameter graphs to compensate for reasoning capabilities lost to alignment.'
        ],
        score: 'Pass@1: 52.4%',
        efficiency: 'Standard Logic Efficiency'
      },
      odyssey: {
        label: 'Odyssey Atlas 0.1 (Sub-1B Specialist)',
        status: '100% Unconstrained Power',
        points: [
          'Zero alignment tax: 100% of parameters dedicated strictly to raw mathematical and algorithmic execution.',
          'Zero false refusal stops. Uninhibited execution on complex logic and systems engineering.',
          'Rivals and surpasses 7B generalist baselines in deterministic competitive programming benchmarks.'
        ],
        score: 'Pass@1: 89.2%',
        efficiency: '100% Logic Efficiency'
      }
    },
    throughput: {
      title: 'Throughput Speed & Inference Latency',
      description: 'Streamlined novel architecture delivering instant execution without conversational bloat.',
      monolith: {
        label: 'Standard 7B Regulated Model',
        status: 'High Overhead & Latency',
        points: [
          'Sluggish 40–50 tokens/second due to massive parameter graph traversal and safety filter checks.',
          'Multi-second round-trip latency over public cloud APIs with strict rate limits.',
          'Heavy conversational preambles and apologetic disclaimers before providing answers.'
        ],
        score: 'Throughput: ~48 tok/s',
        efficiency: 'Standard Latency'
      },
      odyssey: {
        label: 'Odyssey Atlas 0.1 (Sub-1B Specialist)',
        status: 'Blazing Instant Execution',
        points: [
          'Over 6,500 tokens/second raw deterministic throughput on a single commodity GPU.',
          'Sub-millisecond local execution latency, ideal for real-time compilation and automated sub-agents.',
          'Zero conversational filler. Emits pure, deterministic output immediately.'
        ],
        score: 'Throughput: 6,500+ tok/s',
        efficiency: '135x Throughput Multiplier'
      }
    },
    sovereignty: {
      title: 'Hardware Footprint & Enterprise Sovereignty',
      description: 'Eliminating expensive cloud dependencies in favor of private on-premise execution.',
      monolith: {
        label: 'Standard 7B Regulated Model',
        status: 'Prohibitive Infrastructure',
        points: [
          'Requires multi-GPU enterprise instances or perpetual public API lock-in.',
          'Proprietary enterprise code must be transmitted to external third-party servers.',
          'High ongoing cloud operational expenditures and unforecastable inference bills.'
        ],
        score: 'Hardware: Enterprise GPUs',
        efficiency: 'VRAM: 16GB+ Footprint'
      },
      odyssey: {
        label: 'Odyssey Atlas 0.1 (Sub-1B Specialist)',
        status: 'Air-Gapped Sovereignty',
        points: [
          'Runs natively on a single commodity GPU (e.g. NVIDIA L4 or consumer RTX) with < 4GB VRAM footprint.',
          'Complete data sovereignty: Deploy air-gapped Docker containers in your private VPC.',
          'Reduces inference and compute infrastructure expenses by up to 90%.'
        ],
        score: 'Hardware: 1x Commodity GPU',
        efficiency: 'VRAM: < 4GB Local'
      }
    }
  };

  const current = dimensionData[activeDimension];

  return (
    <section className="bg-canvas border-b border-border-subtle font-sans py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Overline + Main Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface border border-border-subtle text-xs sm:text-sm text-text-main font-bold rounded-full shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-pri animate-pulse" />
            <span className="text-accent-pri font-mono">PROOF OF CONCEPT:</span>
            <span className="text-text-main font-bold uppercase tracking-wider">
              SUB-1B REASONING REVOLUTION
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-text-main tracking-tight leading-tight font-sans">
            Specialists beat generalists
          </h2>

          <p className="text-lg sm:text-xl text-text-muted font-sans leading-relaxed">
            Multi-billion dollar compute budgets and weight-level regulations are an inefficient brute-force approach. A 600M sub-1B parameter engine without internal alignment taxes matches and outperforms 7B baselines.
          </p>

          <div className="text-base sm:text-lg text-text-main font-sans border-l-2 border-accent-pri pl-6 py-3.5 text-left max-w-2xl mx-auto bg-surface-subtle rounded-r-lg leading-relaxed shadow-sm">
            "It doesn't chat. It doesn't write poems. It solves complex deterministic logic puzzles at speeds and efficiencies that challenge models 5x to 10x its size."
          </div>

          {onOpenDemo && (
            <div className="pt-4 flex justify-center">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-surface hover:bg-surface-subtle text-text-main border border-border-subtle hover:border-accent-pri font-bold text-sm sm:text-base transition-all cursor-pointer shadow-sm rounded-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                <Play className="w-4 h-4 fill-current text-accent-pri" />
                <span>Test Atlas 0.1 Open Sandbox</span>
                <ArrowRight className="w-4 h-4 text-accent-pri" />
              </button>
            </div>
          )}
        </div>

        {/* Dimension Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3.5 text-sm sm:text-base font-mono font-bold">
          <button
            onClick={() => setActiveDimension('reasoning')}
            className={`px-6 py-3 border transition-all cursor-pointer flex items-center gap-2.5 rounded-xl ${
              activeDimension === 'reasoning'
                ? 'bg-accent-pri text-canvas font-bold border-accent-pri shadow-sm'
                : 'bg-surface text-text-main border-border-subtle hover:bg-surface-subtle'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>[01] Latent Power &amp; Logic Density</span>
          </button>

          <button
            onClick={() => setActiveDimension('throughput')}
            className={`px-6 py-3 border transition-all cursor-pointer flex items-center gap-2.5 rounded-xl ${
              activeDimension === 'throughput'
                ? 'bg-accent-pri text-canvas font-bold border-accent-pri shadow-sm'
                : 'bg-surface text-text-main border-border-subtle hover:bg-surface-subtle'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>[02] Throughput &amp; Zero Latency</span>
          </button>

          <button
            onClick={() => setActiveDimension('sovereignty')}
            className={`px-6 py-3 border transition-all cursor-pointer flex items-center gap-2.5 rounded-xl ${
              activeDimension === 'sovereignty'
                ? 'bg-accent-sec text-canvas font-bold border-accent-sec shadow-sm'
                : 'bg-surface text-text-main border-border-subtle hover:bg-surface-subtle hover:border-accent-sec'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>[03] Hardware Sovereignty &amp; Cost</span>
          </button>
        </div>

        {/* Centerpiece Comparison Panel */}
        <div className="bg-surface border border-border-subtle p-8 sm:p-12 space-y-8 max-w-5xl mx-auto rounded-2xl shadow-sm">
          <div className="border-b border-border-subtle pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs sm:text-sm text-accent-sec uppercase font-bold tracking-wider font-mono">// EMPIRICAL BENCHMARK MATRIX</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-main font-sans mt-1">{current.title}</h3>
            </div>
            <div className="text-sm sm:text-base text-text-muted font-sans max-w-md leading-relaxed">{current.description}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
            {/* Monolith Column */}
            <div className="bg-canvas p-7 sm:p-8 border border-border-subtle space-y-6 flex flex-col justify-between rounded-xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                  <div className="flex items-center gap-2.5 text-text-main font-bold text-base sm:text-lg font-sans">
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>{current.monolith.label}</span>
                  </div>
                  <span className="text-xs sm:text-[13px] px-3 py-1 bg-surface text-text-dim border border-border-subtle font-semibold rounded-md">
                    {current.monolith.status}
                  </span>
                </div>

                <ul className="space-y-3.5 text-text-muted font-sans text-sm sm:text-base leading-relaxed">
                  {current.monolith.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-text-dim font-mono mt-0.5 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-text-muted text-sm sm:text-base font-semibold">
                <span>{current.monolith.score}</span>
                <span className="text-rose-400 font-bold">{current.monolith.efficiency}</span>
              </div>
            </div>

            {/* Odyssey Column (Mint/Sage accented) */}
            <div className="bg-canvas p-7 sm:p-8 border-2 border-accent-pri space-y-6 flex flex-col justify-between relative shadow-sm rounded-xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-border-subtle pb-4">
                  <div className="flex items-center gap-2.5 text-text-main font-bold text-base sm:text-lg font-sans">
                    <CheckCircle2 className="w-5 h-5 text-accent-pri shrink-0" />
                    <span>{current.odyssey.label}</span>
                  </div>
                  <span className="badge-primary">
                    {current.odyssey.status}
                  </span>
                </div>

                <ul className="space-y-3.5 text-text-main font-sans text-sm sm:text-base leading-relaxed">
                  {current.odyssey.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent-pri font-mono mt-0.5 font-bold">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-text-main text-sm sm:text-base font-bold">
                <span className="text-accent-pri font-mono">{current.odyssey.score}</span>
                <span className="text-accent-pri bg-surface-subtle px-3.5 py-1.5 border border-border-subtle rounded-md text-xs sm:text-sm font-mono">{current.odyssey.efficiency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
