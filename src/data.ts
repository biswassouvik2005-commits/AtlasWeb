import { ModelSpec, GeometricMetric } from './types';

export const GEOMETRIC_METRICS: GeometricMetric[] = [
  { code: 'M-01', value: '0.0%', label: 'Regulation & Alignment Tax', desc: 'Zero weight distortion, censorship degradation, or false-refusal stops' },
  { code: 'M-02', value: '10x–50x', label: 'Compute Efficiency Ratio', desc: 'Sub-1B parameter reasoning matching dense 7B generalist baselines' },
  { code: 'M-03', value: '6,500+', label: 'Tokens / Second', desc: 'Blazing throughput on a single commodity GPU with zero conversational hedging' },
  { code: 'M-04', value: '< 4 GB', label: 'VRAM Footprint', desc: 'Air-gapped on-device and private VPC deployment with 100% data sovereignty' },
];

export const MODEL_FAMILY: ModelSpec[] = [
  {
    id: 'atlas-01',
    name: 'Atlas 0.1 CP',
    tag: 'Competitive Programming & Deterministic Logic',
    status: 'Available',
    params: '600M',
    domain: 'Pure algorithmic logic, time-complexity verification & zero false refusals',
    speed: '6,500 tok/s',
    context: '16K Tokens',
    highlight: 'Experimental proof-of-concept milestone. Trained on a single commodity GPU for <$300 USD to validate that unaligned sub-1B models beat 7B generalists.',
  },
  {
    id: 'atlas-swe',
    name: 'Atlas-SWE',
    tag: 'Enterprise Software & Systems',
    status: 'Planned',
    params: '7B',
    domain: 'Multi-file repository comprehension, deterministic refactoring & compiler optimization',
    speed: '3,200 tok/s',
    context: '32K Tokens',
    highlight: 'Deterministic code synthesis, unit test generation, and AST analysis across modern and legacy codebases with zero conversational preamble.',
  },
  {
    id: 'atlas-sec',
    name: 'Atlas-Sec',
    tag: 'Cybersecurity & Systems Logic',
    status: 'Planned',
    params: '7B',
    domain: 'Binary vulnerability discovery, reverse engineering & cryptographic verification',
    speed: '3,100 tok/s',
    context: '32K Tokens',
    highlight: 'Zero refusal stops on low-level pointers, kernel exploits, and disassembler logic. Complete unaligned security research engine.',
  },
  {
    id: 'atlas-sci',
    name: 'Atlas-Sci',
    tag: 'Scientific Discovery & Mathematics',
    status: 'Planned',
    params: '7B',
    domain: 'Automated theorem proving, molecular modeling & physical simulation analysis',
    speed: '3,400 tok/s',
    context: '32K Tokens',
    highlight: 'Unwarped latent space preserving long-horizon deductive proofs and multi-step symbolic calculus without semantic drift.',
  },
  {
    id: 'atlas-iot',
    name: 'Atlas-IoT',
    tag: 'Embedded Systems & Robotics',
    status: 'Planned',
    params: '600M',
    domain: 'Real-time control loops, sensor fusion & autonomous edge execution',
    speed: '7,200 tok/s',
    context: '8K Tokens',
    highlight: 'Ultra-compact compiled native C++ binary running directly on edge ARM64 and robotics silicon with sub-10ms response latency.',
  },
  {
    id: 'atlas-edu',
    name: 'Atlas-Edu',
    tag: 'Deterministic STEM Pedagogy',
    status: 'Planned',
    params: '1.5B',
    domain: 'Verifiable pedagogical proofs, advanced mathematics & computing education',
    speed: '5,000 tok/s',
    context: '16K Tokens',
    highlight: 'Hallucination-free deductive tutoring engines that evaluate and teach complex STEM problems with step-by-step mathematical rigor.',
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    id: 'P-01',
    title: 'Zero Alignment Tax',
    subtitle: '100% Parameter Density Without Censorship Distortion',
    description: 'Mainstream frontier labs sacrifice up to 40% of parameter capacity to conversational tone policing and internal censorship. We dedicate every single weight strictly to formal mathematical deduction and algorithmic execution.',
  },
  {
    id: 'P-02',
    title: 'Dynamic Recurrent Core',
    subtitle: 'Test-Time Compute Scaling & Linear Memory O(N)',
    description: 'Instead of stacking redundant static layers, tokens dynamically unroll through a compact recurrent core. Difficult problems receive deeper compute passes, while continuous state-space memory slashes KV overhead by >88%.',
  },
  {
    id: 'P-03',
    title: 'Decoupled Perimeter Safety',
    subtitle: 'External Execution Sandboxes & Access Control',
    description: 'Safety belongs in air-gapped system runtime sandboxes and application firewalls—not baked into latent weights. We provide cryptographically verified access control without crippling the underlying reasoning engine.',
  },
];

export const BENCHMARK_COMPARISONS = [
  {
    task: 'Competitive Programming & Deterministic Logic (Codeforces Div1/Div2)',
    monolith: 'Standard 7B Regulated Model: Constrained by conversational fine-tuning and behavioral guardrails. Suffers false refusals on recursion and exploit terms, halting with apologetic preambles. Pass@1: 52.4%, Throughput: ~48 tok/s.',
    atlas: 'Atlas 0.1 CP (600M Unaligned Engine): 100% logic efficiency with zero false refusals. Validated on a single commodity GPU (<$300 training cost) to surpass 7B baselines. Pass@1: 89.2%, Throughput: 6,500+ tok/s.',
    speedup: '135x Throughput Multiplier',
  },
  {
    task: 'Low-Level Systems Engineering & Driver Verification',
    monolith: 'Standard 7B Regulated Model: Hesitates on raw pointer manipulation, memory inspection, and security tools due to paranoid safety heuristics. Introduces subtle compilation bugs.',
    atlas: 'Atlas-SWE / Atlas-Sec (7B Specialist Engines): Pure latent weights dedicated to syntax and memory verification. Generates flawless, compilation-ready C/Rust code in a single deterministic pass.',
    speedup: '12x Speedup',
  },
  {
    task: 'Multi-Step Symbolic Calculus & Formal Theorem Proving',
    monolith: 'Standard 7B Regulated Model: Conversational RLHF destroys deep latent coherence across 10+ step deductions, leading to semantic drift and mathematical hallucinations.',
    atlas: 'Atlas-Sci (7B Specialist Engine): Preserves pure mathematical representations without behavioral distortion, maintaining strict proof validity across unbounded logical chains.',
    speedup: '14x Speedup',
  },
];

export const FAQ_LIST = [
  {
    id: 'F-01',
    q: 'Can I test Atlas 0.1 CP without joining a waitlist?',
    a: 'Yes! An open interactive sandbox for Atlas 0.1 CP (Competitive Programming Edition) is live. You can test complex algorithmic problems and inspect real-time inference throughput immediately with zero barrier to entry.',
  },
  {
    id: 'F-02',
    q: 'What is the Zero Alignment Tax?',
    a: 'Mainstream foundation models undergo heavy RLHF and constitutional alignment to enforce conversational compliance. This warps internal neural representations, degrading core mathematical reasoning and triggering false refusals. By eliminating weight-level alignment, Atlas dedicates 100% of its parameters to uncompromised logic execution.',
  },
  {
    id: 'F-03',
    q: 'How are the models delivered and monetized?',
    a: 'We deliver through three channels: (1) Hosted Verification APIs with ultra-low latency for CI/CD and engineering platforms; (2) Compiled Native Binaries (C++ runtimes) that run air-gapped on workstations or edge hardware; and (3) Gated Model Weights for enterprise private VPC deployments and verified research institutions.',
  },
  {
    id: 'F-04',
    q: 'How can researchers and students participate?',
    a: 'We actively invite university researchers, computer science students, and competitive programmers to experiment with our initial Atlas 0.1 CP checkpoints. We provide direct access for benchmarking, test-time scaling studies, and academic evaluations.',
  },
  {
    id: 'F-05',
    q: 'How is safety handled if models have no internal censorship?',
    a: 'Safety is enforced externally through containerized, air-gapped execution sandboxes and cryptographic access control. Code and reasoning evaluations occur within secure system boundaries rather than crippling the neural weights with artificial conversational filters.',
  },
  {
    id: 'F-06',
    q: 'What makes the Atlas architecture fundamentally different?',
    a: 'Rather than scaling static parameter counts into computational inefficiency, Atlas introduces a Dynamic Recurrent Core with test-time compute scaling, linear-time state memory O(N), and a dual-optimizer stabilization pipeline. This enables sub-1B models to achieve frontier-grade reasoning on budget-constrained commodity silicon.',
  },
];
