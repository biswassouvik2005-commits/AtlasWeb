import React, { useEffect } from 'react';
import { ExternalLink, Play, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface DemoViewProps {
  onOpenWaitlist: () => void;
  onOpenDemo?: () => void;
}

export const DemoView: React.FC<DemoViewProps> = ({ onOpenWaitlist, onOpenDemo }) => {
  const demoUrl = 'https://madcoderme--atlas-rdt-chat-ui.modal.run/';

  const handleLaunch = () => {
    if (onOpenDemo) {
      onOpenDemo();
    } else {
      window.open(demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-canvas font-sans text-text-main py-12 md:py-20 space-y-10 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="border-b border-border-subtle pb-8 space-y-3">
          <div className="text-[11px] text-accent-pri font-mono flex items-center gap-2 font-bold">
            <span>[ ROUTE: /DEMO ]</span>
            <span>//</span>
            <span>PUBLIC OPEN PREVIEW</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-main tracking-tight font-sans">
            Atlas 0.1 Interactive Chat UI
          </h1>
          <p className="text-sm text-text-muted font-sans max-w-2xl leading-relaxed">
            Directly test the 600M unaligned reasoning engine in the dedicated Modal execution environment with real-time streaming output.
          </p>
        </div>

        {/* Launch Card */}
        <div className="bg-surface border border-border-subtle p-8 sm:p-12 space-y-6 text-center rounded-3xl relative overflow-hidden shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-subtle border border-border-subtle text-xs text-accent-pri font-bold rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent-pri animate-pulse" />
            <span>LIVE HOSTED ENVIRONMENT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight max-w-xl mx-auto font-sans">
            Atlas 0.1 Reasoning Chat UI
          </h2>

          <p className="text-xs sm:text-sm text-text-muted max-w-lg mx-auto font-sans leading-relaxed">
            Click below to open the official interactive Atlas 0.1 sandbox hosted on Modal. No waitlist or token approval required.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleLaunch}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm transition-all cursor-pointer shadow-sm rounded-xl"
            >
              <Play className="w-4 h-4 fill-current text-canvas" />
              <span>Launch Atlas 0.1 Sandbox</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWaitlist}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-subtle hover:bg-border-subtle text-text-main font-bold text-sm border border-border-subtle hover:border-accent-sec transition-all cursor-pointer rounded-xl shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-accent-sec" />
              <span>Request Full Fleet Beta</span>
            </button>
          </div>

          <div className="text-[11px] text-text-dim font-mono pt-4 border-t border-border-subtle">
            Target Host: <span className="text-text-main font-semibold">{demoUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
