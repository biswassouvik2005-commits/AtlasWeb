import React from 'react';
import { GraduationCap, ShieldCheck, Rocket, Users, Lock, Zap } from 'lucide-react';

interface AboutViewProps {
  onOpenWaitlist: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenWaitlist }) => {
  return (
    <div className="bg-canvas font-sans text-text-main py-12 md:py-16 space-y-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b border-border-subtle pb-6 space-y-3">
          <div className="text-xs text-accent-pri font-mono flex items-center gap-2 font-bold">
            <span>[ ROUTE: /ABOUT ]</span>
            <span>//</span>
            <span>ENGINEERING STUDENT FOUNDERS IN ASIA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight font-sans">
            Origins &amp; Vision
          </h1>
          <p className="text-sm sm:text-base text-text-muted font-sans max-w-3xl leading-relaxed">
            Founded in Asia by engineering student researchers and competitive programming competitors challenging the mainstream brute-force scaling orthodoxy.
          </p>
        </div>

        {/* Founding Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5 font-sans text-xs sm:text-sm text-text-muted leading-relaxed">
            <div className="p-6 bg-surface border border-border-subtle space-y-2.5 font-mono rounded-2xl shadow-sm">
              <div className="text-xs sm:text-sm text-accent-pri font-bold flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent-pri" />
                // THE FIRST PRINCIPLES HYPOTHESIS
              </div>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-sans">
                While mainstream frontier labs spend billions fine-tuning massive models for polite conversation, our research team asked a fundamental question: <em>How much latent mathematical intelligence is destroyed by internal behavioral alignment?</em>
              </p>
            </div>

            <p>
              By eliminating internal censorship from base neural weights, we proved that compact recurrent models can rival standard 7B generalists on deterministic logic, competitive programming, and systems engineering.
            </p>

            <p>
              Our proof-of-concept milestone, <strong className="text-text-main font-mono font-bold">Atlas 0.1 CP (600M)</strong>, was developed and trained on a single commodity cloud GPU (NVIDIA L4 24GB) for less than $300 USD total compute cost. We are currently inviting researchers, students, and engineering teams to experiment with Atlas 0.1 as we scale into production.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenWaitlist}
                className="px-6 py-3 bg-accent-pri text-canvas font-mono font-bold text-xs sm:text-sm hover:bg-accent-pri-hover transition-all cursor-pointer shadow-sm rounded-xl"
              >
                Request Research Checkpoints & Binaries
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 font-mono">
            <div className="p-6 bg-surface border border-border-subtle space-y-2 rounded-2xl shadow-sm">
              <div className="text-text-main font-bold flex items-center gap-2 text-sm sm:text-base font-sans">
                <Users className="w-4 h-4 text-accent-pri" />
                Research Proponents (CUET CSE)
              </div>
              <p className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
                Department of Computer Science &amp; Engineering, Chittagong University of Engineering and Technology (CUET): Abrar Fairuj Raiyan, Israt Jahan, and Souvik Biswas.
              </p>
            </div>

            <div className="p-6 bg-surface border border-border-subtle space-y-2 rounded-2xl shadow-sm">
              <div className="text-text-main font-bold flex items-center gap-2 text-sm sm:text-base font-sans">
                <ShieldCheck className="w-4 h-4 text-accent-sec" />
                <span className="text-accent-sec">Three Delivery Channels</span>
              </div>
              <p className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
                We deliver intelligence via high-throughput Hosted APIs, standalone compiled C++ native binaries for air-gapped systems, and gated model weights for private VPC perimeters.
              </p>
            </div>

            <div className="p-6 bg-surface border border-border-subtle space-y-2 rounded-2xl shadow-sm">
              <div className="text-text-main font-bold flex items-center gap-2 text-sm sm:text-base font-sans">
                <Rocket className="w-4 h-4 text-accent-pri" />
                Seed Capital &amp; Scaling
              </div>
              <p className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
                Transitioning from Phase 1 PoC to seed capitalization for our specialized 7B vertical fleet (Atlas-SWE, Atlas-Sec, Atlas-Sci, Atlas-IoT, Atlas-Edu).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
