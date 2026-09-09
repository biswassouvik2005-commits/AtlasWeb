import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Cpu, CheckCircle2, ShieldOff, Scale, Server, Terminal, Lock, Gauge, ArrowUpRight } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const FeaturePillarsSection: React.FC = () => {
  const [selectedGpuHours, setSelectedGpuHours] = useState<number>(100);

  return (
    <section className="bg-canvas border-b border-border-subtle font-mono py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-6 gap-4"
        >
          <div className="space-y-3">
            <div className="text-xs sm:text-[13px] text-accent-pri font-mono flex items-center gap-2.5 font-bold tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-pri animate-pulse" />
              <span>[ ARCHITECTURE & HARDWARE EFFICIENCY ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight font-sans">
              Engineered for extreme performance.
            </h2>
            <p className="text-base sm:text-lg text-text-muted font-sans max-w-2xl leading-relaxed">
              Why run bloated 70B censored models when unaligned specialist architectures deliver higher reasoning accuracy with 90% less infrastructure overhead?
            </p>
          </div>
          <div className="text-xs sm:text-sm text-text-dim font-mono hidden md:block text-right space-y-1">
            <div>POOL: MULTI-CLOUD COMMODITY L4 / 4090</div>
            <div>BILLING: PER-SECOND GRANULARITY</div>
          </div>
        </motion.div>

        {/* Modal-style Bento Grid with Motion & Spotlight Glow */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Sub-second Cold Starts (Span 7) */}
          <SpotlightCard className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-between space-y-7">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs sm:text-sm text-text-dim">
                <span className="font-bold flex items-center gap-2 text-accent-pri">
                  <Zap className="w-4 h-4" />
                  <span>[PERF-01] GPU MEMORY SNAPSHOTS</span>
                </span>
                <span className="badge-primary">
                  340ms Cold Start
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-main font-sans">
                Boot in milliseconds, not minutes.
              </h3>
              <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">
                By restoring initialized GPU runtime states directly from memory snapshots, Odyssey cold starts in 340ms—eliminating repeated weights reloads, slow container handshakes, and hyperscaler VM warm-up lag.
              </p>
            </div>

            {/* Interactive Visual Latency Comparison Bar (Animated on view) */}
            <div className="bg-canvas p-5 rounded-xl border border-border-subtle space-y-4 font-mono text-xs sm:text-sm">
              <div className="space-y-1.5">
                <div className="flex justify-between text-text-main">
                  <span className="text-accent-pri font-bold flex items-center gap-1.5">
                    <span>Odyssey Atlas 0.1 (Snapshot Restore)</span>
                  </span>
                  <span className="font-bold text-accent-pri">340 ms</span>
                </div>
                <div className="w-full bg-surface h-3 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-accent-pri h-full rounded-full"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '4%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-text-muted">
                  <span>Standard Cloud Kubernetes (vLLM on L4)</span>
                  <span>14,500 ms (14.5s)</span>
                </div>
                <div className="w-full bg-surface h-3 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-border-subtle h-full rounded-full"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '45%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-text-dim">
                  <span>Hyperscaler GPU VM Fleet (Cold Boot)</span>
                  <span>45,000 ms (45.0s)</span>
                </div>
                <div className="w-full bg-surface h-3 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-border-subtle/60 h-full rounded-full"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '95%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: Zero Alignment Tax (Span 5) */}
          <SpotlightCard className="md:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs sm:text-sm text-text-dim">
                <span className="font-bold flex items-center gap-2 text-accent-pri">
                  <ShieldOff className="w-4 h-4" />
                  <span>[PERF-02] 100% LOGIC DENSITY</span>
                </span>
                <span className="badge-primary">
                  0.0% Tax
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-main font-sans">
                Zero conversational censorship.
              </h3>
              <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">
                Regulated AI models waste upwards of 40% of their parameters on constitutional refusals, preambles, and conversational etiquette. We dedicate 100% of latent capacity strictly to algorithmic execution.
              </p>
            </div>

            <div className="bg-canvas p-5 rounded-xl border border-border-subtle space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex justify-between items-center text-text-main pb-1.5 border-b border-border-subtle">
                <span className="text-text-dim">Latent Allocation:</span>
                <span className="text-accent-pri font-bold">100% Raw Reasoning</span>
              </div>
              <div className="flex justify-between items-center text-text-main pb-1.5 border-b border-border-subtle">
                <span className="text-text-dim">False-Refusal Stops:</span>
                <span className="text-accent-pri font-bold">0.00% (Never Refuses)</span>
              </div>
              <div className="flex justify-between items-center text-text-main">
                <span className="text-text-dim">Deterministic Pass@1:</span>
                <span className="text-accent-pri font-bold">89.2% on Codeforces</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3: Commodity L4 GPU Cost Savings (Span 5) */}
          <SpotlightCard className="md:col-span-5 p-7 sm:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs sm:text-sm text-text-dim">
                <span className="font-bold flex items-center gap-2 text-accent-pri">
                  <Gauge className="w-4 h-4" />
                  <span>[PERF-03] COMMODITY HARDWARE</span>
                </span>
                <span className="badge-primary">
                  ~90% Cost Cut
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-main font-sans">
                Commodity GPUs over $30/hr clusters.
              </h3>
              <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">
                Run high-density sub-1B models on a single $0.35/hr NVIDIA L4 (24GB) or consumer RTX 4090 instead of reserving multi-million dollar 8x H100 clusters.
              </p>
            </div>

            {/* Interactive Hours Slider / Cost Calculator */}
            <div className="bg-canvas p-5 rounded-xl border border-border-subtle space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex justify-between text-text-main">
                <span className="text-text-dim">Monthly Inference Hours:</span>
                <span className="text-accent-pri font-bold">{selectedGpuHours} hrs</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={selectedGpuHours}
                onChange={(e) => setSelectedGpuHours(Number(e.target.value))}
                className="w-full accent-accent-sec cursor-pointer h-2 bg-[#262830] rounded-lg appearance-none"
              />
              <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="bg-surface p-2.5 rounded-lg border border-border-subtle">
                  <div className="text-text-dim">8x H100 Cluster:</div>
                  <div className="text-rose-400 font-bold text-sm sm:text-base">${(selectedGpuHours * 28).toLocaleString()}</div>
                </div>
                <div className="bg-surface-subtle p-2.5 rounded-lg border border-border-subtle">
                  <div className="text-accent-pri font-semibold">Odyssey L4 Fleet:</div>
                  <div className="text-text-main font-bold text-sm sm:text-base">${Math.round(selectedGpuHours * 0.35).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 4: Air-Gapped Private VPC Sovereignty (Span 7) */}
          <SpotlightCard variant="secondary" className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-between space-y-7">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-xs sm:text-sm text-text-dim">
                <span className="font-bold flex items-center gap-2 text-accent-sec">
                  <Lock className="w-4 h-4" />
                  <span>[PERF-04] DATA SOVEREIGNTY</span>
                </span>
                <span className="badge-secondary">
                  Zero Data Egress
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-main font-sans">
                Deploy inside your private perimeter.
              </h3>
              <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">
                Critical algorithms, proprietary IP, and defense systems cannot be sent to third-party public cloud endpoints. Odyssey compiles into isolated containers ready for air-gapped VPCs and on-premise clusters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-canvas rounded-lg border border-border-subtle space-y-1.5 hover:border-accent-sec/50 transition-colors">
                <div className="text-accent-sec font-bold">100% Air-Gapped</div>
                <div className="text-text-muted text-xs font-sans leading-relaxed">Zero outbound telemetry or external telemetry pinging.</div>
              </div>
              <div className="p-3.5 bg-canvas rounded-lg border border-border-subtle space-y-1.5 hover:border-accent-sec/50 transition-colors">
                <div className="text-accent-sec font-bold">Local VRAM &lt; 4GB</div>
                <div className="text-text-muted text-xs font-sans leading-relaxed">Operates effortlessly on single commodity developer workstations.</div>
              </div>
              <div className="p-3.5 bg-canvas rounded-lg border border-border-subtle space-y-1.5 hover:border-accent-sec/50 transition-colors">
                <div className="text-accent-sec font-bold">Kubernetes &amp; Helm</div>
                <div className="text-text-muted text-xs font-sans leading-relaxed">Standard cloud-native packaging with deterministic health checks.</div>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
