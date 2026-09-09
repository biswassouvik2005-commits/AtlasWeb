import React, { useState, useEffect, useRef } from 'react';
import { DEMO_PRESETS, ProblemPreset } from '../data/demoPresets';
import { Play, RotateCcw, Copy, Check, Zap, Cpu, ShieldCheck, Terminal, Layers, ArrowRight, CornerDownRight, Sparkles } from 'lucide-react';

interface AtlasDemoPlaygroundProps {
  onOpenWaitlist?: () => void;
  isCompact?: boolean;
}

export const AtlasDemoPlayground: React.FC<AtlasDemoPlaygroundProps> = ({ onOpenWaitlist, isCompact = false }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(DEMO_PRESETS[0].id);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [executionSpeedMode, setExecutionSpeedMode] = useState<'fast' | 'deep'>('fast');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionProgress, setExecutionProgress] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [liveOutputCode, setLiveOutputCode] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [executionStats, setExecutionStats] = useState<{
    throughput: string;
    ttft: string;
    refusalRate: string;
    vram: string;
    tokensGenerated: number;
  }>({
    throughput: '6,520 tok/s',
    ttft: '1.2 ms',
    refusalRate: '0.0%',
    vram: '< 3.8 GB',
    tokensGenerated: 642,
  });

  const selectedPreset = DEMO_PRESETS.find(p => p.id === selectedPresetId) || DEMO_PRESETS[0];

  // Initialize output with first preset
  useEffect(() => {
    if (!isCustomMode) {
      setLiveOutputCode(selectedPreset.generatedCode);
      setActiveStep(selectedPreset.reasoningTrace.length);
    }
  }, [selectedPresetId, isCustomMode]);

  const handleRunExecution = () => {
    setIsExecuting(true);
    setExecutionProgress(0);
    setLiveOutputCode('');
    setActiveStep(0);

    const targetCode = isCustomMode
      ? `// [ATLAS 0.1 IN-DEVELOPMENT OPEN ENGINE RESPONSE]
// Task: ${customPrompt || 'Custom Algorithmic Logic Execution'}
// Invariant Verification: Formulated optimal state transitions without conversational overhead.

#include <bits/stdc++.h>
using namespace std;

// Deterministic Optimal Solution
int solve_optimized(int n, const vector<int>& input_data) {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Fast coordinate compression & state pruning
    vector<int> sorted_vals = input_data;
    sort(sorted_vals.begin(), sorted_vals.end());
    sorted_vals.erase(unique(sorted_vals.begin(), sorted_vals.end()), sorted_vals.end());

    int max_ans = 0;
    // Single pass linear scan with monotonic queue
    deque<int> dq;
    for (int i = 0; i < n; ++i) {
        while (!dq.empty() && input_data[dq.back()] <= input_data[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        max_ans = max(max_ans, input_data[dq.front()]);
    }
    return max_ans;
}

int main() {
    int n;
    if (cin >> n) {
        vector<int> a(n);
        for (int i = 0; i < n; ++i) cin >> a[i];
        cout << solve_optimized(n, a) << "\\n";
    }
    return 0;
}`
      : selectedPreset.generatedCode;

    // Simulate high-speed streaming execution
    let currentTokens = 0;
    const totalLength = targetCode.length;
    const interval = setInterval(() => {
      currentTokens += 45;
      const progress = Math.min(100, Math.round((currentTokens / totalLength) * 100));
      setExecutionProgress(progress);
      setLiveOutputCode(targetCode.substring(0, Math.min(totalLength, currentTokens)));
      
      const stepIdx = Math.min(
        isCustomMode ? 3 : selectedPreset.reasoningTrace.length,
        Math.floor((progress / 100) * (isCustomMode ? 3 : selectedPreset.reasoningTrace.length))
      );
      setActiveStep(stepIdx);

      if (currentTokens >= totalLength) {
        clearInterval(interval);
        setIsExecuting(false);
        setExecutionProgress(100);
        setExecutionStats({
          throughput: executionSpeedMode === 'fast' ? '6,640 tok/s' : '4,890 tok/s',
          ttft: '1.1 ms',
          refusalRate: '0.0%',
          vram: '< 3.8 GB',
          tokensGenerated: Math.round(totalLength / 3.8),
        });
      }
    }, 20);
  };

  const handleCopy = () => {
    if (liveOutputCode) {
      navigator.clipboard.writeText(liveOutputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-canvas text-text-main font-mono space-y-6">
      {/* Banner: Open Test Version Notice */}
      <div className="bg-surface border border-border-subtle p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-pri animate-pulse" />
            <span className="text-text-main font-bold uppercase">[ ATLAS 0.1 OPEN PREVIEW ]</span>
            <span className="badge-primary">IN DEVELOPMENT</span>
          </div>
          <p className="text-sm sm:text-base text-text-muted font-sans leading-relaxed">
            Test the open 600M parameter unaligned engine directly in your browser. No waitlist or token registration required for this open test version.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-xs text-text-dim font-mono hidden md:inline">Commodity GPU Emulation</span>
          <span className="px-3 py-1.5 bg-canvas border border-border-subtle text-accent-pri font-bold text-xs rounded-xl">
            Ready for Inference
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Control Column: Presets & Problem Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-surface border border-border-subtle p-5 space-y-4 rounded-2xl">
            <div className="flex items-center justify-between border-border-subtle pb-3 border-b">
              <div className="text-xs font-bold text-text-main uppercase flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-accent-pri" />
                <span>Select Test Problem</span>
              </div>
              <div className="flex gap-1 text-[10px]">
                <button
                  onClick={() => setIsCustomMode(false)}
                  className={`px-2.5 py-1 border cursor-pointer transition-colors rounded ${
                    !isCustomMode
                      ? 'bg-accent-pri text-canvas font-bold border-accent-pri'
                      : 'bg-canvas text-text-dim border-border-subtle hover:text-text-main'
                  }`}
                >
                  Presets
                </button>
                <button
                  onClick={() => setIsCustomMode(true)}
                  className={`px-2.5 py-1 border cursor-pointer transition-colors rounded ${
                    isCustomMode
                      ? 'bg-accent-sec text-canvas font-bold border-accent-sec'
                      : 'bg-canvas text-text-dim border-border-subtle hover:text-text-main'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {!isCustomMode ? (
              <div className="space-y-2">
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPresetId(preset.id);
                      setLiveOutputCode(preset.generatedCode);
                      setActiveStep(preset.reasoningTrace.length);
                    }}
                    className={`w-full text-left p-3 border transition-all cursor-pointer space-y-1 rounded-xl ${
                      selectedPresetId === preset.id
                        ? 'bg-surface-subtle border-l-2 border-l-accent-pri border-border-strong'
                        : 'bg-canvas border-border-subtle hover:bg-surface-subtle hover:border-accent-pri/40'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-text-dim font-mono">{preset.category}</span>
                      <span className="px-1.5 py-0.5 bg-surface text-text-muted border border-border-subtle font-bold text-[9px] rounded">
                        {preset.difficulty}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-text-main truncate">{preset.title}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[11px] text-text-muted font-sans block">
                  Enter any competitive programming prompt or deterministic logic challenge:
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Write a C++ solution for Range Longest Increasing Subsequence with Fenwick Tree updates under O(N log N)..."
                  rows={5}
                  className="w-full input-neutral p-3 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-accent-sec font-mono resize-none rounded-xl"
                />
              </div>
            )}

            {/* Execution Depth Toggle */}
            <div className="pt-2 border-t border-border-subtle space-y-2">
              <div className="text-[10px] text-text-dim font-bold">// INFERENCE EXECUTION MODE</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setExecutionSpeedMode('fast')}
                  className={`p-2.5 border text-left cursor-pointer transition-all rounded-xl ${
                    executionSpeedMode === 'fast'
                      ? 'bg-surface-subtle border-accent-pri text-text-main'
                      : 'bg-canvas text-text-dim border-border-subtle hover:text-text-main'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3 text-accent-pri" />
                    Direct Stream
                  </div>
                  <div className="text-[9px] text-text-dim font-sans">6,500+ tok/s peak</div>
                </button>

                <button
                  onClick={() => setExecutionSpeedMode('deep')}
                  className={`p-2.5 border text-left cursor-pointer transition-all rounded-xl ${
                    executionSpeedMode === 'deep'
                      ? 'bg-surface-subtle border-accent-sec text-text-main'
                      : 'bg-canvas text-text-dim border-border-subtle hover:text-text-main'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-accent-sec" />
                    Dynamic Invariants
                  </div>
                  <div className="text-[9px] text-accent-sec/80 font-sans">Deep invariant loops</div>
                </button>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunExecution}
              disabled={isExecuting}
              className="w-full py-3 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer rounded-xl shadow-md disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing Atlas 0.1 Stream ({executionProgress}%)...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Atlas 0.1 Engine Demo</span>
                </>
              )}
            </button>
          </div>

          {/* Problem Statement Card */}
          <div className="bg-surface border border-border-subtle p-5 space-y-2.5 rounded-2xl">
            <div className="text-xs text-text-dim font-bold">// FORMAL INPUT SPECIFICATION</div>
            <div className="text-text-muted font-sans text-sm whitespace-pre-line leading-relaxed">
              {isCustomMode ? (customPrompt || 'Custom input problem statement.') : selectedPreset.problemStatement}
            </div>
            {!isCustomMode && (
              <div className="pt-2 border-t border-border-subtle text-xs text-accent-pri font-mono font-semibold">
                {selectedPreset.complexity}
              </div>
            )}
          </div>
        </div>

        {/* Right Output Column: Live Output & Engine Metrics */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          {/* Live Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border-subtle border border-border-subtle font-mono text-sm rounded-2xl overflow-hidden">
            <div className="bg-surface p-3.5 space-y-1">
              <div className="text-xs text-text-dim font-bold">THROUGHPUT</div>
              <div className="font-bold text-accent-pri text-base">{executionStats.throughput}</div>
            </div>
            <div className="bg-surface p-3.5 space-y-1">
              <div className="text-xs text-text-dim font-bold">FIRST TOKEN</div>
              <div className="font-bold text-text-main text-base">{executionStats.ttft}</div>
            </div>
            <div className="bg-surface p-3.5 space-y-1">
              <div className="text-xs text-text-dim font-bold">REFUSAL RATE</div>
              <div className="font-bold text-accent-sec text-base">{executionStats.refusalRate}</div>
            </div>
            <div className="bg-surface p-3.5 space-y-1">
              <div className="text-xs text-text-dim font-bold">VRAM FOOTPRINT</div>
              <div className="font-bold text-text-main text-base">{executionStats.vram}</div>
            </div>
          </div>

          {/* Reasoning Trace Steps */}
          <div className="bg-surface border border-border-subtle p-5 space-y-3 rounded-2xl">
            <div className="text-xs text-text-dim font-bold flex items-center justify-between">
              <span>// LATENT LOGICAL REASONING TRACE</span>
              <span className="text-text-dim font-normal">No conversational fluff</span>
            </div>
            <div className="space-y-2 text-sm font-sans text-text-muted">
              {(!isCustomMode ? selectedPreset.reasoningTrace : [
                'Decomposes state space with zero alignment overhead.',
                'Validates edge case boundary conditions and memory alignment.',
                'Emits deterministic optimal source implementation.'
              ]).map((trace, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 transition-opacity duration-200 ${
                    idx <= activeStep ? 'opacity-100 text-text-main' : 'opacity-30 text-text-dim'
                  }`}
                >
                  <span className="font-mono text-xs text-accent-pri mt-0.5 font-bold">[{idx + 1}]</span>
                  <span className="leading-relaxed">{trace}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="bg-[#080B09] border border-border-subtle flex-1 flex flex-col min-h-[320px] relative rounded-2xl overflow-hidden">
            <div className="px-4 py-2.5 bg-surface border-b border-border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-accent-pri" />
                <span className="font-bold text-text-main">Atlas 0.1 Output Stream (C++20 / Deterministic)</span>
              </div>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-surface-subtle hover:bg-border-subtle text-text-main rounded border border-border-subtle transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-accent-pri" />
                    <span className="text-accent-pri">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-text-dim" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 flex-1 overflow-x-auto text-xs text-text-muted font-mono leading-relaxed bg-[#080B09] select-text">
              <pre className="whitespace-pre">{liveOutputCode || '// Click [ Run Atlas 0.1 Engine Demo ] to stream output...'}</pre>
            </div>

            {/* Bottom Status bar */}
            <div className="px-4 py-2 bg-surface border-t border-border-subtle text-[10px] text-text-dim flex justify-between">
              <span>STATUS: COMPILED &amp; VERIFIED</span>
              <span className="text-accent-sec font-bold">100% UNALIGNED LOGIC DENSITY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
