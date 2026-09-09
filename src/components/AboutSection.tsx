import React from 'react';
import { Globe, GraduationCap, ShieldCheck, Rocket } from 'lucide-react';

interface AboutProps {
  onOpenWaitlist: () => void;
}

export const AboutSection: React.FC<AboutProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="py-16 md:py-20 bg-canvas font-sans border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Story Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle border border-border-subtle text-xs text-accent-pri font-mono">
              <Globe className="w-3.5 h-3.5 text-accent-pri" />
              Founding Story &amp; Student Roots
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main font-mono">
              Challenging Monolithic AI Industry Norms
            </h2>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Odyssey AI was founded by competitive programming competitors and ML engineering students in South Asia (Bangladesh). Observing that mainstream AI labs waste millions censoring models—degrading mathematical logic in the process—we built the opposite paradigm.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm pt-1">
              <div className="p-4 bg-surface border border-border-subtle rounded-2xl space-y-1.5">
                <div className="text-text-main font-bold flex items-center gap-2 text-sm sm:text-base">
                  <GraduationCap className="w-4 h-4 text-accent-pri" />
                  Student Roots
                </div>
                <div className="text-text-muted font-sans text-xs sm:text-sm">
                  Built on efficient single-L4 GPU pipelines by South Asian ML students.
                </div>
              </div>

              <div className="p-4 bg-surface border border-border-subtle rounded-2xl space-y-1.5 hover:border-accent-sec/50 transition-colors">
                <div className="text-text-main font-bold flex items-center gap-2 text-sm sm:text-base">
                  <ShieldCheck className="w-4 h-4 text-accent-sec" />
                  <span className="text-accent-sec">Verified Access</span>
                </div>
                <div className="text-text-muted font-sans text-xs sm:text-sm">
                  Distributed strictly via verified KYC access to prevent misuse.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenWaitlist}
                className="px-5 py-2.5 bg-accent-pri text-canvas font-mono font-bold text-xs sm:text-sm rounded-xl hover:bg-accent-pri-hover transition-all cursor-pointer shadow-md"
              >
                Apply for Verified Access
              </button>
            </div>
          </div>

          {/* Quick Manifesto Card */}
          <div className="lg:col-span-5 bg-surface border border-border-subtle rounded-3xl p-6 space-y-4 font-mono">
            <div className="text-text-main font-bold text-base sm:text-lg border-b border-border-subtle pb-3 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-accent-pri" />
              The Odyssey AI Mission
            </div>

            <div className="space-y-3 text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
              <p>
                <strong className="text-text-main font-mono">1. Maximum Parameter Efficiency:</strong> Why run a 70B monolithic model when a specialized 600M or 7B raw engine accomplishes the task faster?
              </p>
              <p>
                <strong className="text-text-main font-mono">2. Decoupled Governance:</strong> Give enterprise engineering teams complete control over their safety firewalls rather than hardcoding censorship into model weights.
              </p>
              <p>
                <strong className="text-text-main font-mono">3. Seed Milestone:</strong> Demonstrating frontier logic on Atlas 0.1 to secure growth capital for larger 7B–14B vertical specialists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
