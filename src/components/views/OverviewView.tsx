import React from 'react';
import { RoutePath } from '../../types';
import { HeroSection } from '../HeroSection';
import { ZeroAlignmentTaxSection } from '../ZeroAlignmentTaxSection';
import { ArchitectureTeaserSection } from '../ArchitectureTeaserSection';
import { BusinessModelSection } from '../BusinessModelSection';
import { RevolutionaryProofSection } from '../RevolutionaryProofSection';
import { ResearcherInviteSection } from '../ResearcherInviteSection';
import { EnterprisePitchSection } from '../EnterprisePitchSection';
import { MODEL_FAMILY } from '../../data';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface OverviewViewProps {
  navigate: (route: RoutePath) => void;
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ navigate, onOpenWaitlist, onOpenDemo }) => {
  // Show premier flagship engines on overview, keep detailed matrix in Models view
  const featuredEngines = MODEL_FAMILY.slice(0, 3);

  return (
    <div className="bg-canvas font-sans text-text-main">
      {/* 1. Hero Section */}
      <HeroSection navigate={navigate} onOpenWaitlist={onOpenWaitlist} onOpenDemo={onOpenDemo} />

      {/* 2. Zero Alignment Tax - Directly below Hero */}
      <ZeroAlignmentTaxSection onOpenDemo={onOpenDemo} onOpenWaitlist={onOpenWaitlist} />

      {/* 3. Architectural Blueprint Teaser - Fundamentally changed to support the mission */}
      <ArchitectureTeaserSection onOpenDemo={onOpenDemo} />

      {/* 4. Business Delivery Model - Hosted API, Compiled Binaries, Model Weights */}
      <BusinessModelSection onOpenWaitlist={onOpenWaitlist} onOpenDemo={onOpenDemo} />

      {/* 5. Centerpiece Proof Section: Proof of Concept Sub-1B Engine vs 7B Baselines */}
      <RevolutionaryProofSection onOpenDemo={onOpenDemo} />

      {/* 6. Open Invitation to Researchers and Students */}
      <ResearcherInviteSection onOpenDemo={onOpenDemo} onOpenWaitlist={onOpenWaitlist} />

      {/* 7. Specialized Multi-Domain Production Fleet */}
      <section className="border-b border-border-subtle py-20 sm:py-28 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border-subtle pb-6 gap-5">
            <div className="space-y-3">
              <div className="text-xs sm:text-sm text-accent-pri font-mono font-bold tracking-wider">[ SPECIALIZED FLEET ]</div>
              <h2 className="text-3xl sm:text-5xl font-black text-text-main font-sans tracking-tight">Production Engine Family</h2>
              <p className="text-base sm:text-lg text-text-muted font-sans max-w-2xl leading-relaxed">
                Hyper-specialized unaligned foundation engines targeted across mission-critical verticals.
              </p>
            </div>
            <button
              onClick={() => navigate('models')}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-surface hover:bg-surface-subtle text-text-main border border-border-subtle hover:border-accent-pri text-sm sm:text-base font-bold transition-all cursor-pointer rounded-xl self-start sm:self-auto shadow-sm"
            >
              <span>View All 6 Fleet Engines</span>
              <ArrowRight className="w-4 h-4 text-accent-pri" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEngines.map((m) => {
              const isAtlas01 = m.id === 'atlas-01' || m.id === 'atlas-cp';
              return (
                <motion.div
                  key={m.id}
                  whileHover={{ y: -6, borderColor: 'var(--color-accent-pri)' }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface border border-border-subtle rounded-3xl p-7 sm:p-8 space-y-6 transition-all flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="px-3 py-1 bg-surface-subtle text-accent-pri font-bold border border-border-subtle rounded-lg font-mono">
                        {m.params}
                      </span>
                      <span className={`font-bold font-mono text-xs sm:text-[13px] ${m.status === 'Available' ? 'text-accent-pri' : 'text-text-dim'}`}>
                        {m.status === 'Available' ? '● AVAILABLE NOW' : 'PLANNED'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-main font-sans">{m.name}</h3>
                      <div className="text-sm text-accent-pri font-sans font-semibold mt-1">{m.tag}</div>
                    </div>
                    <p className="text-base text-text-muted font-sans leading-relaxed">{m.highlight}</p>
                  </div>

                  <div className="pt-2">
                    {isAtlas01 ? (
                      <button
                        onClick={onOpenDemo}
                        className="w-full py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer rounded-xl shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <Play className="w-4 h-4 fill-current text-canvas" />
                        <span>Launch Atlas 0.1 Demo</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate('models')}
                        className="w-full py-3 bg-surface-subtle hover:bg-border-subtle text-text-main border border-border-subtle hover:border-accent-pri text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all cursor-pointer rounded-xl hover:scale-[1.01] active:scale-[0.99] shadow-sm"
                      >
                        <span>View Specs & Benchmarks</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Enterprise & Sovereign Deployment Pitch */}
      <EnterprisePitchSection onOpenWaitlist={onOpenWaitlist} />
    </div>
  );
};
