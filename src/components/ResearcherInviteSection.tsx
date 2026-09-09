import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Terminal, Play, ArrowRight, Sparkles, BookOpen, Code, FlaskConical } from 'lucide-react';

interface ResearcherInviteSectionProps {
  onOpenDemo?: () => void;
  onOpenWaitlist?: () => void;
}

export const ResearcherInviteSection: React.FC<ResearcherInviteSectionProps> = ({
  onOpenDemo,
  onOpenWaitlist,
}) => {
  return (
    <section className="bg-canvas border-b border-border-subtle font-sans py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-border-subtle rounded-3xl p-8 sm:p-14 space-y-10 shadow-sm relative overflow-hidden">
          {/* Top Label */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-canvas border border-border-subtle text-xs font-mono text-accent-pri rounded-lg font-bold">
              <GraduationCap className="w-4 h-4 text-accent-pri" />
              <span>// ACADEMIC & RESEARCH INITIATIVE</span>
            </div>
            <div className="text-xs font-mono text-text-dim">
              ORIGIN: CHITTAGONG UNIVERSITY OF ENGINEERING & TECHNOLOGY (CUET)
            </div>
          </div>

          {/* Heading and Mission */}
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-text-main tracking-tight font-sans">
              Calling Researchers & Students to Experiment
            </h2>
            <p className="text-base sm:text-lg text-text-muted font-sans leading-relaxed">
              Atlas was born from student researchers and competitive programmers determined to prove that compact, 
              unaligned architectures can out-think multi-hundred-billion parameter giants. 
              We trained Atlas 0.1 CP on a single commodity GPU for under $300 total compute cost.
            </p>
            <p className="text-base sm:text-lg text-text-main font-sans font-medium leading-relaxed">
              We invite researchers, computer science students, and algorithmists worldwide to experiment with our initial models, benchmark hard edge cases, and advance unconstrained reasoning.
            </p>
          </div>

          {/* 3 Research Collaboration Tracks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
            <div className="bg-canvas p-6 rounded-2xl border border-border-subtle space-y-3">
              <div className="text-accent-pri font-mono text-xs font-bold flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>[ TRACK 01 ]</span>
              </div>
              <h3 className="text-lg font-bold text-text-main">Competitive Programming</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Benchmark Atlas 0.1 CP on complex Div1/Div2 code problems, dynamic programming trees, and rigorous time-complexity constraints.
              </p>
            </div>

            <div className="bg-canvas p-6 rounded-2xl border border-border-subtle space-y-3">
              <div className="text-accent-pri font-mono text-xs font-bold flex items-center gap-2">
                <FlaskConical className="w-4 h-4" />
                <span>[ TRACK 02 ]</span>
              </div>
              <h3 className="text-lg font-bold text-text-main">Dynamic Test-Time Scaling</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Evaluate our recursive depth unrolling loops and state-space memory mechanics under deep recursion and long algorithmic contexts.
              </p>
            </div>

            <div className="bg-canvas p-6 rounded-2xl border border-border-subtle space-y-3">
              <div className="text-accent-pri font-mono text-xs font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>[ TRACK 03 ]</span>
              </div>
              <h3 className="text-lg font-bold text-text-main">Zero Alignment Studies</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                Analyze why removing behavioral alignment eliminates false refusals while maintaining mathematical invariant validity.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-border-subtle font-sans">
            <div className="text-sm text-text-dim">
              Direct access for academic institutions, labs, and student clubs.
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {onOpenDemo && (
                <button
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Launch Atlas 0.1 Sandbox</span>
                </button>
              )}

              {onOpenWaitlist && (
                <button
                  onClick={onOpenWaitlist}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border border-accent-sec/40 hover:border-accent-sec font-bold text-sm rounded-xl transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Request Academic Checkpoints</span>
                  <ArrowRight className="w-4 h-4 text-accent-sec" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
