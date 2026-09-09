import React from 'react';
import { motion } from 'motion/react';
import { Server, Binary, Key, ShieldCheck, ArrowRight, Check, Zap, Lock } from 'lucide-react';

interface BusinessModelSectionProps {
  onOpenWaitlist?: () => void;
  onOpenDemo?: () => void;
}

export const BusinessModelSection: React.FC<BusinessModelSectionProps> = ({
  onOpenWaitlist,
  onOpenDemo,
}) => {
  const models = [
    {
      id: 'hosted-api',
      icon: Server,
      title: 'Hosted Verification API',
      badge: 'Cloud Deployment',
      subtitle: 'Ultra-low latency managed inference',
      desc: 'High-throughput REST and streaming gRPC endpoints built for engineering platforms, continuous integration test generation, and automated reasoning pipelines.',
      features: [
        'Sub-10ms time-to-first-token emit',
        'Direct JSON & syntax token guarantees',
        'Zero rate-limit throttling for verified teams',
        'Standard OpenAI-compatible API schemas',
      ],
      ctaText: 'Access Cloud API',
      action: onOpenDemo,
    },
    {
      id: 'compiled-binaries',
      icon: Binary,
      title: 'Compiled Native Binaries',
      badge: 'Edge & Embedded',
      subtitle: 'Standalone C++ runtimes with zero cloud calls',
      desc: 'Self-contained, signed native binaries compiled directly for Linux x86_64, ARM64, and robotics silicon. Completely offline execution with absolute data privacy.',
      features: [
        'Zero external network egress or telemetry',
        'Runs directly on commodity workstation GPUs',
        'Sub-4GB VRAM footprint for sub-1B models',
        'Pre-compiled for Docker & air-gapped systems',
      ],
      ctaText: 'Download Binaries',
      action: onOpenWaitlist,
      isPrimary: true,
    },
    {
      id: 'model-weights',
      icon: Key,
      title: 'Self-Hosted Model Weights',
      badge: 'Enterprise Sovereignty',
      subtitle: 'Full parameter checkpoint distribution',
      desc: 'Cryptographically signed weight checkpoints distributed to enterprise clients and verified research institutions for fine-tuning and deployment in private VPC perimeters.',
      features: [
        'Complete data sovereignty inside your VPC',
        'Compatible with standard vLLM and TensorRT-LLM',
        'Enterprise KYC & cryptographic licensing',
        'Tailored vertical adapters (SWE, Sec, Sci)',
      ],
      ctaText: 'Request Weight Access',
      action: onOpenWaitlist,
    },
  ];

  return (
    <section className="bg-canvas border-b border-border-subtle font-sans py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-border-subtle text-xs font-mono text-accent-pri rounded-md font-bold">
            <span>// DEPLOYMENT & DELIVERY MODEL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight font-sans">
            How We Deliver Intelligence
          </h2>
          <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed">
            Choose how you run unaligned reasoning: through high-throughput hosted endpoints, standalone native binaries, or private weights inside your own perimeter.
          </p>
        </div>

        {/* 3 Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch font-sans">
          {models.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`bg-surface border rounded-2xl p-7 sm:p-8 flex flex-col justify-between space-y-8 shadow-sm ${
                  item.isPrimary ? 'border-accent-pri/60' : 'border-border-subtle'
                }`}
              >
                <div className="space-y-6">
                  {/* Top metadata */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-accent-pri">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 bg-surface-subtle border border-border-subtle rounded-md text-text-dim">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl font-bold text-text-main">{item.title}</h3>
                    <div className="text-xs sm:text-sm text-accent-pri font-mono">{item.subtitle}</div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Bullet features */}
                  <div className="space-y-2.5 pt-2 border-t border-border-subtle text-xs sm:text-sm text-text-muted">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-accent-pri shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-2">
                  <button
                    onClick={item.action}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      item.isPrimary
                        ? 'bg-accent-pri hover:bg-accent-pri-hover text-canvas shadow-sm'
                        : 'bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border border-accent-sec/40 hover:border-accent-sec shadow-sm'
                    }`}
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className={`w-4 h-4 ${item.isPrimary ? 'text-canvas' : 'text-accent-sec'}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
