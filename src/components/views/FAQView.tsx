import React, { useState } from 'react';
import { FAQ_LIST } from '../../data';
import { HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';

interface FAQViewProps {
  onOpenWaitlist: () => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ onOpenWaitlist }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_LIST[0].id);

  return (
    <div className="bg-canvas font-sans text-text-main py-12 md:py-16 space-y-12 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b border-border-subtle pb-6 space-y-3 text-center sm:text-left">
          <div className="text-xs text-accent-pri font-mono flex items-center justify-center sm:justify-start gap-2 font-bold">
            <span>[ ROUTE: /FAQ ]</span>
            <span>//</span>
            <span>KNOWLEDGE BASE &amp; VERIFICATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight font-sans">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-text-muted font-sans max-w-3xl leading-relaxed">
            Everything you need to know about Odyssey AI raw base models, zero alignment tax, and decoupled application sandboxing.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 font-mono">
          {FAQ_LIST.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-surface border border-border-subtle transition-colors overflow-hidden rounded-2xl shadow-sm"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full p-4 sm:p-5 text-left flex justify-between items-center text-text-main font-bold hover:bg-surface-subtle transition-colors cursor-pointer text-sm sm:text-base font-sans"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-accent-pri font-mono font-normal">[{item.id}]</span>
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-text-dim transition-transform shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-accent-pri' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-text-muted font-sans text-xs sm:text-sm leading-relaxed border-t border-border-subtle">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Verified Queue Banner */}
        <div className="p-6 bg-surface border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 font-mono rounded-2xl shadow-sm">
          <div className="space-y-1">
            <div className="text-text-main font-bold font-sans text-base sm:text-lg">Have additional technical questions</div>
            <div className="text-text-muted text-xs sm:text-sm">Submit an access request for full technical documentation and verification</div>
          </div>
          <button
            onClick={onOpenWaitlist}
            className="px-5 py-2.5 bg-accent-pri text-canvas font-bold text-xs sm:text-sm hover:bg-accent-pri-hover transition-all cursor-pointer whitespace-nowrap shadow-sm rounded-xl"
          >
            Apply for Verification
          </button>
        </div>
      </div>
    </div>
  );
};
