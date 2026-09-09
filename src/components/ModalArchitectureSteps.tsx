import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Server, ShieldCheck, CheckCircle2, Play, Pause, Gauge, Activity, Lock } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const ModalArchitectureSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const steps = [
    {
      step: '01',
      icon: ShieldCheck,
      title: 'Zero Alignment Tax & 100% Logic Density',
      subtitle: 'Where mainstream models sacrifice up to 40% of parameter weights to conversational preambles and constitutional censorship, Odyssey dedicates every parameter strictly to mathematical deduction.',
      readout: [
        { label: 'Evaluation Domain', value: 'Formal Algorithmic Proofs & Invariants' },
        { label: 'Refusal Overhead', value: '0.0% (Zero false refusals or ethical preambles)' },
        { label: 'Deterministic Accuracy', value: '89.2% Pass@1 on Competitive Benchmarks' },
        { label: 'Functional Outcome', value: 'Unwarped latent reasoning without behavioral distortion' },
      ],
      highlight: '100% Latent Reasoning',
      badge: 'Pure Latent Flow',
    },
    {
      step: '02',
      icon: Zap,
      title: 'Sub-Second Waking & 6,500+ tok/s Stream',
      subtitle: 'Instantaneous execution on commodity infrastructure. Memory snapshot restoration eliminates multi-minute container handshakes, weight reloads, and hyperscaler warm-up lag.',
      readout: [
        { label: 'Cold-Start Latency', value: '340ms to first token emit' },
        { label: 'Sustained Streaming', value: '6,532 tokens / sec peak throughput' },
        { label: 'Hardware Requirement', value: 'Single commodity GPU (< 4GB VRAM footprint)' },
        { label: 'Speedup Multiplier', value: '135x throughput over 7B generalist baselines' },
      ],
      highlight: '340ms Snapshot Restore',
      badge: '135x Speedup Multiplier',
    },
    {
      step: '03',
      icon: Lock,
      title: 'Complete Air-Gapped Enterprise Sovereignty',
      subtitle: 'Eliminating the vulnerability of transmitting proprietary IP to public AI APIs. Deploy self-contained, high-density reasoning engines inside your private security perimeter.',
      readout: [
        { label: 'Deployment Topology', value: '100% Isolated Private VPC Perimeter' },
        { label: 'Outbound Egress', value: 'Zero external telemetry or weight checks' },
        { label: 'Compute Cost', value: '$0.35/hr commodity instances (~90% savings)' },
        { label: 'Security Standard', value: 'KYC-gated weights & enterprise governance' },
      ],
      highlight: 'Zero Data Egress',
      badge: 'Air-Gapped Sovereign',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  return (
    <section className="bg-canvas border-b border-border-subtle font-sans py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <div className="border-b border-border-subtle pb-6 flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-3">
            <div className="text-xs sm:text-sm text-accent-pri font-mono flex items-center gap-2.5 font-bold tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-pri animate-pulse" />
              <span>[ REVOLUTIONARY PARADIGM ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight font-sans">
              Unprecedented Performance & Density
            </h2>
            <p className="text-base sm:text-lg text-text-muted font-sans max-w-2xl leading-relaxed">
              A foundational divergence from mainstream AI. Raw unaligned logic engines engineered for mathematical precision, instant cold starts, and absolute sovereignty.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border-subtle text-text-main hover:bg-surface-subtle hover:border-accent-pri transition-colors cursor-pointer font-bold shadow-sm"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4 text-accent-pri" />
                  <span>Pause Sequence</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-accent-pri" />
                  <span>Auto-Play Sequence</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Connecting Pipeline Track */}
        <div className="hidden lg:block relative">
          <div className="h-0.5 bg-border-subtle w-full relative">
            <motion.div
              className="absolute top-0 h-full bg-gradient-to-r from-transparent via-accent-pri to-transparent w-48"
              animate={{
                left: ['-10%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </div>

        {/* 3 Step Cards Grid with Spotlight and Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            const isSecondary = s.step === '03';
            const Icon = s.icon;
            
            let activeBorderClass = 'border-2 border-accent-pri bg-surface shadow-lg ring-1 ring-accent-pri/30';
            if (isSecondary) {
              activeBorderClass = 'border-2 border-accent-sec bg-surface shadow-lg ring-1 ring-accent-sec/30';
            }

            return (
              <SpotlightCard
                key={s.step}
                variant={isSecondary ? 'secondary' : 'primary'}
                onClick={() => {
                  setActiveStep(idx);
                  setIsAutoPlaying(false);
                }}
                className={`p-8 sm:p-9 flex flex-col justify-between space-y-6 cursor-pointer transition-all duration-300 rounded-2xl ${
                  isActive
                    ? activeBorderClass
                    : `border border-border-subtle bg-surface ${isSecondary ? 'hover:border-accent-sec' : 'hover:border-accent-pri'}`
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span
                      className={`font-mono font-bold text-xl flex items-center gap-2 ${
                        isActive
                          ? isSecondary
                            ? 'text-accent-sec'
                            : 'text-accent-pri'
                          : 'text-text-dim'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{s.step}</span>
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-mono rounded-md font-medium ${
                        isActive
                          ? isSecondary
                            ? 'bg-surface-subtle text-accent-sec border border-border-subtle'
                            : 'bg-surface-subtle text-accent-pri border border-border-subtle'
                          : 'bg-canvas text-text-dim border border-border-subtle'
                      }`}
                    >
                      {s.highlight}
                    </span>
                  </div>

                  {/* Active progress indicator bar */}
                  {isActive && (
                    <div className="w-full bg-surface-subtle h-1.5 rounded-full overflow-hidden">
                      <motion.div
                        className={isSecondary ? 'bg-accent-sec h-full' : 'bg-accent-pri h-full'}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: isAutoPlaying ? 4.5 : 0.4, ease: 'linear' }}
                      />
                    </div>
                  )}

                  <h3 className="text-xl sm:text-2xl font-bold text-text-main font-sans">{s.title}</h3>
                  <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">{s.subtitle}</p>
                </div>

                <div className="pt-2">
                  <div className="bg-canvas p-5 rounded-xl border border-border-subtle text-xs font-mono space-y-2.5">
                    {s.readout.map((item, rIdx) => (
                      <div key={rIdx} className="flex justify-between items-start gap-3 border-b border-border-subtle/50 pb-2 last:border-b-0 last:pb-0">
                        <span className="text-text-dim shrink-0">{item.label}:</span>
                        <span className="text-text-main font-semibold text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3.5 text-xs sm:text-sm text-text-muted">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-accent-sec">Verified Empirical Metric</span>
                    <span className={isActive ? (isSecondary ? 'text-accent-sec font-bold font-mono' : 'text-accent-pri font-bold font-mono') : 'font-mono'}>{s.badge}</span>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
