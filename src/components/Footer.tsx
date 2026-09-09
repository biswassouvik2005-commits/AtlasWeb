import React from 'react';
import { RoutePath } from '../types';
import { ShieldCheck, Play, ExternalLink } from 'lucide-react';
import { ModalLogo } from './ModalLogo';

interface FooterProps {
  navigate: (route: RoutePath) => void;
  onOpenWaitlist: () => void;
  onOpenDemo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate, onOpenWaitlist, onOpenDemo }) => {
  return (
    <footer className="bg-canvas text-text-main font-sans text-sm border-t border-border-subtle">
      {/* Call To Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-border-subtle">
        <div className="bg-surface border border-border-subtle p-8 sm:p-12 text-center space-y-6 rounded-3xl relative overflow-hidden shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-canvas border border-border-subtle text-xs text-text-main rounded-full font-bold shadow-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-accent-pri animate-pulse" />
            <span>[ OPEN SANDBOX // NO REGISTRATION REQUIRED ]</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-text-main tracking-tight max-w-2xl mx-auto font-sans">
            Ready to test unconstrained intelligence
          </h2>

          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto font-sans leading-relaxed">
            Run competitive programming challenges on our live 600M parameter model or join the closed beta for enterprise air-gapped deployments.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-sm transition-all cursor-pointer rounded-xl shadow-sm hover:scale-[1.01] active:scale-[0.99]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Atlas 0.1 Demo</span>
              </button>
            )}

            <button
              onClick={onOpenWaitlist}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] font-bold text-sm transition-all cursor-pointer border border-accent-sec/40 hover:border-accent-sec rounded-xl shadow-sm hover:scale-[1.01] active:scale-[0.99]"
            >
              <ShieldCheck className="w-4 h-4 text-accent-sec" />
              <span>Request Verified Access</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation & Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <ModalLogo />
          <div className="hidden sm:block text-border-subtle">|</div>
          {/* Live System Operational Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface border border-border-subtle text-[11px] text-text-main rounded-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent-pri animate-pulse" />
            <span>All Systems Operational</span>
            <span className="text-border-subtle">•</span>
            <span className="text-accent-pri font-bold">P99: 340ms</span>
          </div>
        </div>

        {/* Route Links */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs font-sans">
          <button
            onClick={() => navigate('overview')}
            className="px-2.5 py-1.5 text-text-muted hover:text-text-main rounded transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            onClick={() => navigate('models')}
            className="px-2.5 py-1.5 text-text-muted hover:text-text-main rounded transition-colors cursor-pointer"
          >
            Models
          </button>
          <button
            onClick={() => navigate('updates')}
            className="px-2.5 py-1.5 text-text-muted hover:text-text-main rounded transition-colors cursor-pointer"
          >
            Updates
          </button>
          <button
            onClick={() => navigate('profile')}
            className="px-2.5 py-1.5 text-text-muted hover:text-text-main rounded transition-colors cursor-pointer"
          >
            Profile
          </button>
          <button
            onClick={() => navigate('join')}
            className="px-2.5 py-1.5 text-accent-sec hover:text-accent-sec-hover font-medium rounded transition-colors cursor-pointer"
          >
            Join with Code
          </button>
          <button
            onClick={() => navigate('demo')}
            className="px-2.5 py-1.5 text-accent-pri hover:text-accent-pri-hover font-bold rounded transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Atlas 0.1 Demo</span>
          </button>
          <button
            onClick={() => navigate('philosophy')}
            className="px-2.5 py-1.5 text-text-muted hover:text-text-main rounded transition-colors cursor-pointer"
          >
            Philosophy
          </button>
          <button
            onClick={() => navigate('specs')}
            className="px-2.5 py-1.5 text-text-muted hover:text-text-main rounded transition-colors cursor-pointer"
          >
            Specs
          </button>
          <button
            onClick={() => navigate('about')}
            className="px-2.5 py-1.5 text-text-muted hover:text-text-main rounded transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => navigate('faq')}
            className="px-2.5 py-1.5 text-text-muted hover:text-text-main rounded transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </div>

        <div className="text-xs text-text-dim">
          &copy; {new Date().getFullYear()} Odyssey AI Inc.
        </div>
      </div>
    </footer>
  );
};
