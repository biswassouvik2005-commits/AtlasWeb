import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Copy, Check, Terminal, Cpu, Zap, CheckCircle2, RotateCcw, ExternalLink, ShieldCheck } from 'lucide-react';

interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  code: string;
  defaultOutput: string[];
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: 'runtime-request',
    filename: 'atlas_query.json',
    language: 'json',
    code: `{
  "engine": "atlas-0.1-600m",
  "cluster_mode": "sovereign_airgapped",
  "parameters": {
    "latent_mode": "unaligned_deterministic",
    "alignment_tax": "0.0%",
    "refusal_filters": "disabled",
    "target_hardware": "commodity_gpu_l4"
  },
  "workload": {
    "domain": "Formal Algorithmic Deduction",
    "specification": "Verify topological invariants under dynamic edge insertions across 2^16 vertex acyclic graphs."
  }
}`,
    defaultOutput: [
      '[sovereign:init] Restoring GPU memory snapshot... [DONE in 340ms]',
      '[sovereign:weights] Atlas 0.1 active on single commodity NVIDIA L4 (24GB).',
      '[sovereign:tax] Alignment Tax: 0.0% | Internal Censorship: DISABLED.',
      '[sovereign:latent] Exploring state-space graph across 65,536 vertices...',
      '[sovereign:invariant] Depth delta <= 1 verified across all paths. Zero hallucinations.',
      '[sovereign:metrics] 584 tokens generated in 89ms | Throughput: 6,561 tok/s',
      'Result: {"verdict": "AC", "cold_start_ms": 340, "refusal_count": 0}',
    ],
  },
  {
    id: 'benchmark-matrix',
    filename: 'benchmark_telemetry.json',
    language: 'json',
    code: `{
  "evaluation_suite": "Competitive Logic & Formal Proofs",
  "models_evaluated": [
    {
      "model": "Standard 7B Regulated Baseline",
      "alignment_tax": "42.8% compute consumed by ethical hedging",
      "throughput_tok_sec": 48.2,
      "p99_latency_sec": 2.84,
      "deterministic_pass_rate": "52.4%"
    },
    {
      "model": "Odyssey Atlas 0.1 (Sub-1B Specialist)",
      "alignment_tax": "0.0% (100% parameter efficiency)",
      "throughput_tok_sec": 6540.0,
      "p99_latency_sec": 0.09,
      "deterministic_pass_rate": "89.2%"
    }
  ],
  "speedup_multiplier": "135.6x faster throughput on commodity hardware"
}`,
    defaultOutput: [
      '[bench:run] Executing comparative evaluation across 1,000 algorithmic proofs...',
      '[baseline] Standard 7B (Regulated): 48.2 tok/s | Latency: 2.84s | Refusal rate: 8.4%',
      '[odyssey]  Atlas 0.1 (Specialist):  6,540 tok/s | Latency: 0.09s | Refusal rate: 0.0%',
      '[odyssey]  Hardware Footprint: 3.4 GB VRAM (Atlas 0.1) vs 16.8 GB (Standard 7B)',
      '[odyssey]  Speedup Multiplier: 135.6x throughput advantage on single L4 GPU.',
      'Empirical Verdict: Sub-1B specialist outperforms bloated 7B generalists.',
    ],
  },
  {
    id: 'airgap-spec',
    filename: 'sovereign_perimeter.yaml',
    language: 'yaml',
    code: `apiVersion: sovereign.engine/v1
kind: SovereignDeployment
metadata:
  name: atlas-01-node
  namespace: private-ai-perimeter
spec:
  isolation: air-gapped
  security_policy:
    data_egress: block_all_external
    telemetry: zero_outbound
  runtime:
    model: atlas-0.1-600m
    alignment_tax: zero
    snapshot_restore: 340ms
    hardware: 1x commodity GPU (< 4GB VRAM)`,
    defaultOutput: [
      '[k8s:deploy] Applying air-gapped security manifest: sovereign_perimeter.yaml...',
      '[k8s:security] External network routing: DISABLED (zero egress policy active).',
      '[k8s:nodes] Scheduling Atlas 0.1 on local on-premise commodity GPU.',
      '[odyssey:sovereign] Data privacy guaranteed: zero bytes leave private perimeter.',
      '[odyssey:health] Ready in 340ms. Serving low-latency gRPC on localhost:50051.',
      'Status: ACTIVE (Air-Gapped Sovereign Node running with 100% privacy).',
    ],
  },
];

interface ModalCodeRunnerProps {
  onOpenDemo?: () => void;
}

export const ModalCodeRunner: React.FC<ModalCodeRunnerProps> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<string>('runtime-request');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [outputLogs, setOutputLogs] = useState<string[]>(SNIPPETS[0].defaultOutput);
  const [copied, setCopied] = useState<boolean>(false);
  const [bootProgress, setBootProgress] = useState<number>(100);

  const currentSnippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  useEffect(() => {
    setOutputLogs(currentSnippet.defaultOutput);
    setBootProgress(100);
  }, [activeTab]);

  const handleRun = () => {
    setIsRunning(true);
    setBootProgress(15);
    setOutputLogs(['[odyssey] Waking serverless container on NVIDIA L4...']);

    const fullLogs = currentSnippet.defaultOutput;
    let idx = 0;

    const progressTimer = setInterval(() => {
      setBootProgress((prev) => Math.min(prev + 20, 100));
    }, 60);

    const timer = setInterval(() => {
      idx += 1;
      setOutputLogs(fullLogs.slice(0, idx));

      if (idx >= fullLogs.length) {
        clearInterval(timer);
        clearInterval(progressTimer);
        setBootProgress(100);
        setIsRunning(false);
      }
    }, 170);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className={`w-full bg-canvas border rounded-2xl overflow-hidden shadow-2xl font-mono text-left relative transition-all duration-300 ${
        isRunning ? 'border-accent-pri shadow-[0_0_30px_rgba(145,201,168,0.15)]' : 'border-border-subtle'
      }`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-pri/40 to-transparent" />

      {/* Top Bar: Tabs + GPU Status + Run Button */}
      <div className="bg-surface border-b border-border-subtle px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Window Controls + Animated Tabs */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-border-subtle inline-block" />
            <span className="w-3 h-3 rounded-full bg-border-subtle inline-block" />
            <span className="w-3 h-3 rounded-full bg-border-subtle inline-block" />
          </div>

          <div className="flex items-center gap-1.5 relative">
            {SNIPPETS.map((snippet) => {
              const isActive = activeTab === snippet.id;
              return (
                <button
                  key={snippet.id}
                  onClick={() => setActiveTab(snippet.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-mono transition-colors rounded-lg cursor-pointer relative z-10 ${
                    isActive ? 'text-text-main font-bold' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCodeTabGlider"
                      className="absolute inset-0 bg-surface-subtle border border-border-subtle rounded-lg shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span>{snippet.filename}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: GPU Status Badge + Action Buttons */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-canvas border border-border-subtle text-xs sm:text-[13px] text-text-muted rounded-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-pri animate-pulse" />
            <span className="text-text-dim font-mono">GPU:</span>
            <span className="font-bold text-text-main">NVIDIA L4 (24GB)</span>
            <span className="text-border-subtle">|</span>
            <span className="text-accent-pri font-bold">340ms cold start</span>
          </div>

          <button
            onClick={handleCopyCode}
            className="p-2 text-text-muted hover:text-text-main hover:bg-surface-subtle rounded-xl transition-colors cursor-pointer border border-transparent hover:border-border-subtle"
            title="Copy specification"
          >
            {copied ? <Check className="w-4 h-4 text-accent-pri" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isRunning ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Spec</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Animated Cold-Start Progress Line when running */}
      {isRunning && (
        <div className="w-full bg-surface h-1 overflow-hidden">
          <motion.div
            className="bg-accent-pri h-full"
            initial={{ width: '0%' }}
            animate={{ width: `${bootProgress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      )}

      {/* Code & Terminal Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
        {/* Left Pane: Protocol Specification */}
        <div className="lg:col-span-7 p-5 sm:p-6 text-xs sm:text-[14px] leading-relaxed overflow-x-auto bg-canvas">
          <pre className="font-mono text-text-muted">
            <code>
              {currentSnippet.code.split('\n').map((line, i) => {
                const isKey = line.trim().startsWith('"') && line.includes('":');
                const isStringVal = line.includes('": "') || line.includes(': "');
                const isYamlKey = line.trim().includes(':') && !line.includes('"');

                let lineClass = 'text-text-muted';
                if (isKey) lineClass = 'text-accent-pri font-medium';
                else if (isStringVal) lineClass = 'text-text-main';
                else if (isYamlKey) lineClass = 'text-accent-sec font-semibold';

                return (
                  <div key={i} className="flex">
                    <span className="w-8 select-none text-border-subtle text-right pr-3.5 shrink-0">{i + 1}</span>
                    <span className={lineClass}>{line}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>

        {/* Right Pane: Live Cloud Terminal */}
        <div className="lg:col-span-5 bg-surface/50 p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-[13px] text-text-dim pb-2.5 border-b border-border-subtle">
              <div className="flex items-center gap-2 text-text-main font-bold">
                <Terminal className="w-4 h-4 text-accent-pri" />
                <span>INFERENCE TELEMETRY STREAM</span>
              </div>
              <span className="text-text-muted flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-accent-pri animate-ping" />
                <span>live</span>
              </span>
            </div>

            <div className="space-y-2 text-xs sm:text-[13.5px] font-mono leading-relaxed min-h-[220px]">
              {outputLogs.map((log, idx) => {
                const isSuccess = log.includes('[DONE') || log.includes('verified') || log.includes('Passed') || log.includes('ACTIVE');
                const isHighlight = log.includes('6,5') || log.includes('340ms') || log.includes('Speedup');
                const isPrompt = log.startsWith('>');

                let color = 'text-text-muted';
                if (isSuccess) color = 'text-accent-pri font-semibold';
                else if (isHighlight) color = 'text-text-main font-bold';
                else if (isPrompt) color = 'text-text-main';

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex items-start gap-2.5 ${color}`}
                  >
                    <span className="text-accent-pri/40 select-none">$</span>
                    <span className="break-all">{log}</span>
                  </motion.div>
                );
              })}

              {isRunning && (
                <div className="flex items-center gap-2 text-accent-pri font-mono">
                  <span className="text-accent-pri/40 select-none">$</span>
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                  >
                    ▌
                  </motion.span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Terminal Callout & Direct Demo Action */}
          <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-text-muted">
              <span className="w-2 h-2 rounded-full bg-accent-pri" />
              <span>Zero Alignment Tax Active</span>
            </div>

            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-1.5 text-accent-pri hover:text-text-main font-bold hover:underline cursor-pointer"
              >
                <span>Open Full Demo on Modal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
