import React from 'react';
import { X, ShieldCheck, Zap } from 'lucide-react';
import { AtlasDemoPlayground } from './AtlasDemoPlayground';

interface AtlasDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWaitlist: () => void;
}

export const AtlasDemoModal: React.FC<AtlasDemoModalProps> = ({ isOpen, onClose, onOpenWaitlist }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-canvas/85 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto">
      <div className="bg-canvas border border-border-subtle rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col text-text-main font-sans shadow-2xl relative overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between bg-surface font-mono">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-pri animate-pulse" />
            <div>
              <div className="text-xs sm:text-sm font-bold text-text-main uppercase tracking-wider flex items-center gap-2">
                <span>Atlas 0.1 Open Sandbox</span>
                <span className="text-[10px] px-2 py-0.5 bg-surface-subtle text-accent-pri border border-border-subtle font-normal rounded-lg">
                  In Development
                </span>
              </div>
              <div className="text-[10px] text-text-dim">
                Public Open Test Version (No waitlist registration required for this preview)
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-main bg-surface-subtle rounded-xl border border-border-subtle transition-colors cursor-pointer"
            title="Close test playground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Interactive Playground */}
        <div className="p-6 overflow-y-auto max-h-[calc(94vh-120px)] bg-canvas">
          <AtlasDemoPlayground onOpenWaitlist={onOpenWaitlist} isCompact={true} />
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border-subtle bg-surface text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-3 text-text-muted">
          <div className="text-[11px] text-text-muted">
            Want full access to 7B/14B models or VPC deployment?
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenWaitlist();
              }}
              className="px-4 py-1.5 bg-accent-pri text-canvas font-bold text-xs hover:bg-accent-pri-hover transition-all cursor-pointer rounded-xl shadow-sm"
            >
              Request Full Fleet Beta
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-surface-subtle text-text-muted hover:text-text-main transition-all cursor-pointer border border-border-subtle text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
