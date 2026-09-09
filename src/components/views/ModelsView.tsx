import React, { useState } from 'react';
import { MODEL_FAMILY } from '../../data';
import { ModelSpec } from '../../types';
import { Cpu, ShieldCheck, Zap, ArrowRight, CornerDownRight, CheckCircle2, Play } from 'lucide-react';

interface ModelsViewProps {
  onOpenWaitlist: () => void;
  onOpenDemo?: () => void;
}

export const ModelsView: React.FC<ModelsViewProps> = ({ onOpenWaitlist, onOpenDemo }) => {
  const [selectedModel, setSelectedModel] = useState<ModelSpec>(MODEL_FAMILY[0]);

  const isAtlas01 = selectedModel.id === 'atlas-01' || selectedModel.id === 'atlas-cp';

  return (
    <div className="bg-canvas font-sans text-text-main py-12 md:py-16 space-y-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b border-border-subtle pb-6 space-y-3">
          <div className="text-xs text-accent-pri font-mono flex items-center gap-2 font-bold">
            <span>[ ROUTE: /MODELS ]</span>
            <span>//</span>
            <span>UNCONSTRAINED SPECIALIST FLEET</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-main tracking-tight font-sans">
            Specialized Engine Fleet &amp; Matrix
          </h1>
          <p className="text-base sm:text-lg text-text-muted font-sans max-w-3xl leading-relaxed">
            Lightweight vertical foundation models tailored for algorithmic logic, competitive coding, kernel engineering, and formal proofs. Delivered unaligned for maximum performance on commodity hardware.
          </p>
        </div>

        {/* Geometric Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {MODEL_FAMILY.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`p-6 cursor-pointer transition-all space-y-3 rounded-2xl border ${
                  isSelected
                    ? 'bg-surface-subtle border-accent-pri ring-1 ring-accent-pri/30 shadow-md'
                    : 'bg-surface border-border-subtle hover:border-accent-pri/50 hover:bg-surface-subtle'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2.5 py-0.5 bg-canvas text-accent-pri font-bold border border-border-subtle rounded-lg">
                    {model.params}
                  </span>
                  <span
                    className={`uppercase font-bold ${
                      model.status === 'Available' ? 'text-accent-pri' : 'text-text-dim'
                    }`}
                  >
                    {model.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-text-main font-sans">{model.name}</h3>
                  <div className="text-xs text-accent-sec font-sans mt-0.5 font-semibold">{model.tag}</div>
                </div>

                <div className="pt-2 border-t border-border-subtle space-y-2">
                  <div className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">{model.highlight}</div>
                  <div className="text-xs text-text-dim flex justify-between pt-1 font-mono font-medium">
                    <span>{model.context}</span>
                    <span className="text-accent-pri font-bold">{model.speed}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Model Detail Panel */}
        <div className="bg-surface border border-border-subtle p-6 sm:p-8 space-y-6 rounded-3xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
            <div className="space-y-1.5">
              <div className="text-xs text-text-dim font-bold">// ACTIVE SPECIFICATION INSPECTION</div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-main flex items-center gap-2.5 font-sans">
                {selectedModel.name}
                <span className="text-xs px-2.5 py-0.5 bg-surface-subtle text-accent-pri border border-border-subtle font-semibold rounded-lg font-mono">
                  {selectedModel.params} Active Parameters
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {isAtlas01 && onOpenDemo && (
                <button
                  onClick={onOpenDemo}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface hover:bg-surface-subtle text-text-main font-bold text-xs sm:text-sm border border-border-subtle hover:border-accent-pri transition-all cursor-pointer shadow-sm rounded-xl"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-accent-pri" />
                  <span>Test Open Demo (No Waitlist)</span>
                </button>
              )}

              <button
                onClick={onOpenWaitlist}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-pri text-canvas font-bold text-xs sm:text-sm hover:bg-accent-pri-hover transition-all cursor-pointer shadow-sm rounded-xl"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Apply for {selectedModel.name} Access</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            <div className="bg-canvas p-5 border border-border-subtle space-y-1 rounded-2xl">
              <div className="text-text-dim text-xs font-semibold">TARGET REASONING DOMAIN</div>
              <div className="text-text-main font-bold text-sm sm:text-base font-sans">{selectedModel.domain}</div>
            </div>

            <div className="bg-canvas p-5 border border-border-subtle space-y-1 rounded-2xl">
              <div className="text-text-dim text-xs font-semibold">RAW THROUGHPUT FLOOR</div>
              <div className="text-accent-pri font-bold text-sm sm:text-base">{selectedModel.speed}</div>
            </div>

            <div className="bg-canvas p-5 border border-border-subtle space-y-1 rounded-2xl">
              <div className="text-text-dim text-xs font-semibold">CONTEXT ARCHITECTURE</div>
              <div className="text-text-main font-bold text-sm sm:text-base">{selectedModel.context}</div>
            </div>
          </div>

          <div className="p-5 bg-canvas border border-border-subtle space-y-2 font-sans rounded-2xl">
            <div className="font-mono text-accent-pri font-bold text-xs sm:text-sm">// UNCONSTRAINED EFFICIENCY ADVANTAGE</div>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              {selectedModel.highlight} Delivered with 100% parameter efficiency without internal weight censorship to ensure maximum reasoning speed on single GPU hardware.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
