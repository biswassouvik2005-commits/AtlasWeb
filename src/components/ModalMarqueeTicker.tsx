import React from 'react';
import { motion } from 'motion/react';
import { Zap, Cpu, Server, ShieldOff, Lock, Terminal, Activity } from 'lucide-react';

export const ModalMarqueeTicker: React.FC = () => {
  const items = [
    { label: 'P99 Cold Start: 340ms', icon: Zap, highlight: 'Snapshot Restore' },
    { label: 'Throughput: 6,500+ tok/s', icon: Activity, highlight: 'NVIDIA L4' },
    { label: 'Alignment Tax: 0.0%', icon: ShieldOff, highlight: 'Pure Latent Flow' },
    { label: 'Compute Density: 10x–50x', icon: Cpu, highlight: 'Density Paradigm' },
    { label: 'Commodity GPU Cost: $0.35/hr', icon: Cpu, highlight: '~90% Savings' },
    { label: 'Air-Gapped Sovereign Containers', icon: Lock, highlight: 'Zero Egress' },
    { label: 'Deterministic Verification: 89.2%', icon: Server, highlight: 'Pass@1 Codeforces' },
  ];

  // Duplicate items for seamless infinite marquee loop
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-surface border-y border-border-subtle py-3 font-mono">
      {/* Subtle Gradient Fade on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-6 whitespace-nowrap"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          duration: 35,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-canvas border border-border-subtle hover:border-accent-pri transition-colors text-xs text-text-main shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-pri animate-pulse" />
              <Icon className="w-3.5 h-3.5 text-accent-pri shrink-0" />
              <span className="text-text-main font-semibold font-sans">{item.label}</span>
              <span className="text-text-dim">//</span>
              <span className="text-accent-sec text-[11px] font-mono font-bold">{item.highlight}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
