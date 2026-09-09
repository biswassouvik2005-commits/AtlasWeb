import React, { useState } from 'react';
import { BENCHMARK_COMPARISONS } from '../../data';
import { ShieldCheck, Cpu, Cloud, Server, Code, CheckCircle2, Zap } from 'lucide-react';

interface SpecsViewProps {
  onOpenWaitlist: () => void;
}

export const SpecsView: React.FC<SpecsViewProps> = ({ onOpenWaitlist }) => {
  const [selectedCase, setSelectedCase] = useState(BENCHMARK_COMPARISONS[0]);

  return (
    <div className="bg-canvas font-sans text-text-main py-12 md:py-16 space-y-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="border-b border-border-subtle pb-6 space-y-3">
          <div className="text-xs text-accent-pri font-mono flex items-center gap-2 font-bold">
            <span>[ ROUTE: /SPECS ]</span>
            <span>//</span>
            <span>EMPIRICAL BENCHMARKS &amp; EFFICIENCY MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight font-sans">
            Performance &amp; Efficiency Specifications
          </h1>
          <p className="text-sm sm:text-base text-text-muted font-sans max-w-3xl leading-relaxed">
            Head-to-head empirical evaluation demonstrating how Atlas unaligned logic engines challenge and rival standard 7B regulated models at a fraction of compute overhead.
          </p>
        </div>

        {/* Benchmarks Section */}
        <div className="bg-surface border border-border-subtle p-6 sm:p-8 space-y-6 rounded-3xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-5">
            <div>
              <div className="text-xs text-accent-pri font-bold">// LOGICAL EXECUTION BENCHMARKS</div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-main font-sans">Deterministic Task Evaluation Matrix</h2>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {BENCHMARK_COMPARISONS.map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCase(b)}
                  className={`px-3 py-1.5 border transition-all cursor-pointer text-xs font-mono font-bold rounded-lg shadow-sm ${
                    selectedCase.task === b.task
                      ? 'bg-accent-pri text-canvas border-accent-pri'
                      : 'bg-surface text-text-main border-border-subtle hover:bg-surface-subtle hover:border-accent-pri'
                  }`}
                >
                  Benchmark 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs sm:text-sm font-bold text-accent-pri font-mono">
              [ EVALUATION DOMAIN ]: {selectedCase.task}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
              {/* Standard Regulated Baseline */}
              <div className="bg-canvas p-5 sm:p-6 border border-border-subtle space-y-3 rounded-2xl">
                <div className="text-accent-sec font-bold flex justify-between items-center text-sm sm:text-base font-sans">
                  <span>Standard 7B Regulated Model</span>
                  <span className="text-xs bg-surface px-2 py-0.5 text-text-dim border border-border-subtle font-bold rounded-md">
                    Conversational Overhead
                  </span>
                </div>
                <p className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">{selectedCase.monolith}</p>
              </div>

              {/* Odyssey Specialist Execution */}
              <div className="bg-canvas p-5 sm:p-6 border border-accent-pri/50 space-y-3 rounded-2xl">
                <div className="text-text-main font-bold flex justify-between items-center text-sm sm:text-base font-sans">
                  <span>Odyssey Specialist Engine</span>
                  <span className="text-xs bg-surface-subtle text-accent-pri px-2.5 py-0.5 border border-border-subtle font-bold rounded-md">
                    {selectedCase.speedup}
                  </span>
                </div>
                <p className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">{selectedCase.atlas}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Integration Options */}
        <div className="space-y-5">
          <div className="border-b border-border-subtle pb-3 font-mono">
            <h2 className="text-xl sm:text-2xl font-bold text-text-main font-sans">Enterprise Deployment Infrastructure</h2>
            <p className="text-xs sm:text-sm text-accent-pri mt-0.5">Three streamlined delivery channels for verified teams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface border border-border-subtle rounded-2xl p-6 space-y-2.5 hover:border-accent-pri/50 transition-colors">
              <div className="flex items-center gap-2 text-text-main font-bold text-base font-sans">
                <Cloud className="w-4 h-4 text-accent-pri" />
                Hosted Cloud API
              </div>
              <p className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
                Low-latency REST and gRPC endpoints hosted on dedicated Odyssey infrastructure for sub-agent pipelines and developer automation tools.
              </p>
            </div>

            <div className="bg-surface border border-border-subtle rounded-2xl p-6 space-y-2.5 hover:border-accent-sec/50 transition-colors">
              <div className="flex items-center gap-2 text-text-main font-bold text-base font-sans">
                <Server className="w-4 h-4 text-accent-sec" />
                <span className="text-accent-sec">Private VPC Containers</span>
              </div>
              <p className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
                Pre-packaged Docker images and Kubernetes helm charts for enterprise clients requiring 100% data sovereignty and air-gapped execution.
              </p>
            </div>

            <div className="bg-surface border border-border-subtle rounded-2xl p-6 space-y-2.5 hover:border-accent-pri/50 transition-colors">
              <div className="flex items-center gap-2 text-text-main font-bold text-base font-sans">
                <Code className="w-4 h-4 text-accent-pri" />
                Gated Weights &amp; Binaries
              </div>
              <p className="text-text-muted font-sans text-xs sm:text-sm leading-relaxed">
                Compiled C++ inference binaries and gated model checkpoints distributed strictly to KYC-verified research organizations and labs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
