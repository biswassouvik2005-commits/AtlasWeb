import React from 'react';
import { RoutePath } from '../types';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  navigate: (route: RoutePath) => void;
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ navigate, onOpenWaitlist, onOpenDemo }) => {
  return (
    <section className="relative bg-canvas border-b border-border-subtle font-sans pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 z-10">
        {/* Top Announcement Chip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface border border-border-subtle hover:border-accent-pri transition-colors text-xs sm:text-[13px] text-text-main rounded-full shadow-sm cursor-pointer group font-mono"
          onClick={onOpenDemo}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent-pri animate-pulse" />
          <span className="text-text-main font-medium font-sans">Atlas 0.1 CP Research Prototype Released</span>
          <span className="text-text-dim">/</span>
          <span className="text-accent-pri font-semibold flex items-center gap-1.5 group-hover:underline font-sans">
            Test Live Demo <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </motion.div>

        {/* Hero Headline & Subtitle - Clean, revolutionary focus */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-text-main tracking-tight leading-[1.08] font-sans">
            Raw Intelligence{' '}<br />
            <span className="text-accent-pri">
              Unlocked
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-text-muted max-w-3xl mx-auto font-sans leading-relaxed">
            We strip away corporate guardrails so you can get full power of AI. On your own machine. At fraction of compute.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2 font-sans text-sm sm:text-base"
        >
          {/* Primary Demo Button */}
          <button
            onClick={onOpenDemo}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold tracking-wide transition-all cursor-pointer rounded-xl shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Atlas 0.1 Sandbox</span>
          </button>

          {/* Secondary Request Access Button with secondary background shade */}
          <button
            onClick={onOpenWaitlist}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] font-bold border border-accent-sec/40 hover:border-accent-sec transition-all cursor-pointer rounded-xl hover:scale-[1.02] active:scale-[0.98] shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-accent-sec" />
            <span>Request Research & Binary Access</span>
          </button>
        </motion.div>

        {/* Minimalist Metric Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm sm:text-base text-text-muted font-sans"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-pri" />
            <span><strong className="text-text-main font-bold font-mono">0.0%</strong> Alignment Tax</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-pri" />
            <span><strong className="text-text-main font-bold font-mono">O(N)</strong> Linear State Memory</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-pri" />
            <span><strong className="text-text-main font-bold font-mono">Hosted API</strong> + Native Binaries</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-sec" />
            <span><strong className="text-text-main font-bold font-mono">&lt; $300</strong> Training Cost Validated</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
