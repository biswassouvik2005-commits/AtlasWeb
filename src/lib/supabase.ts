import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WaitlistRecord, ProjectUpdate } from '../types';

// Retrieve credentials safely from client-accessible Vite environment variables
// Supabase now uses Publishable Keys (prefixed with sb_publishable_...) instead of legacy anon keys
const env = (import.meta as any).env || {};
export const supabaseUrl: string = env.VITE_SUPABASE_URL || '';
export const supabasePublishableKey: string =
  env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY || '';

// Backward compatibility alias
export const supabaseAnonKey = supabasePublishableKey;

let supabaseInstance: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabasePublishableKey &&
    supabaseUrl.trim() !== '' &&
    supabasePublishableKey.trim() !== '' &&
    !supabaseUrl.includes('placeholder')
  );
};

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    } catch (err) {
      console.warn('Failed to initialize Supabase client with publishable key:', err);
      return null;
    }
  }

  return supabaseInstance;
};

// Recommended SQL Schema for Scalability (included for developers to run in Supabase SQL editor)
export const SUPABASE_SCHEMA_SQL = `-- Odyssey AI Production Scalable Database Schema
-- Run this in your Supabase SQL Editor

-- 1. Profiles Table linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  organization TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Scalable Waitlist Table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  organization TEXT,
  role TEXT,
  intended_use TEXT,
  delivery_channel TEXT DEFAULT 'all' CHECK (delivery_channel IN ('all', 'hosted_api', 'compiled_binary', 'weights')),
  preferred_hardware TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'approved', 'invited')),
  position SERIAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Public Updates & Changelog Table
CREATE TABLE IF NOT EXISTS public.project_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  version_tag TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT NOT NULL,
  details JSONB DEFAULT '[]'::jsonb,
  is_pinned BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own waitlist entry" ON public.waitlist
  FOR SELECT USING (auth.uid() = user_id OR email = auth.jwt()->>'email');

CREATE POLICY "Users can insert waitlist entry" ON public.waitlist
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own waitlist entry" ON public.waitlist
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read project updates" ON public.project_updates
  FOR SELECT USING (TRUE);

-- 6. High-Performance Indexing for Scale
CREATE INDEX IF NOT EXISTS idx_waitlist_user_id ON public.waitlist(user_id);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_status ON public.waitlist(status);
CREATE INDEX IF NOT EXISTS idx_updates_published ON public.project_updates(published_at DESC);
`;

// Default Seed Updates Feed for the Dashboard
export const INITIAL_PROJECT_UPDATES: ProjectUpdate[] = [
  {
    id: 'up-01',
    title: 'Atlas 0.1 CP Initial Checkpoint Live for Evaluation',
    version_tag: 'v0.1-CP-RC1',
    date: 'March 2026',
    category: 'Milestone',
    summary: 'Our 600M parameter proof-of-concept for Competitive Programming and deterministic algorithmic logic is now benchmark-ready with 100% parameter efficiency.',
    details: [
      'Zero alignment tax: zero weight degradation from conversational fine-tuning.',
      'Throughput exceeding 6,500 tokens/second on commodity hardware.',
      'Pass@1 rate of 89.2% on Codeforces Div1/Div2 logic problems.',
      'Trained for under $300 USD total compute cost on a single cloud NVIDIA L4 GPU.'
    ],
    is_pinned: true,
  },
  {
    id: 'up-02',
    title: 'Three Delivery Channels Operational Blueprint',
    version_tag: 'Architecture-2026.1',
    date: 'February 2026',
    category: 'Delivery',
    summary: 'Finalized specifications for Hosted Verification APIs, Compiled Native C++ Binaries, and Gated Model Weights distribution.',
    details: [
      'Hosted API: Streaming gRPC & REST gateway with sub-10ms response time.',
      'Compiled Binaries: Standalone static C++ runtimes targeting x86_64 and ARM64 without Python overhead.',
      'Private Weights: FP16 and GGUF quantized checkpoints for air-gapped VPC infrastructure.'
    ],
  },
  {
    id: 'up-03',
    title: 'Dynamic Recurrent Core & Linear State Memory Validation',
    version_tag: 'Paper-Preprint',
    date: 'January 2026',
    category: 'Research',
    summary: 'Research preprint by student proponents from CUET CSE validating O(N) linear-time continuous state memory and dual-optimizer stabilization.',
    details: [
      'Slashing KV cache memory footprint by >88% compared to standard Transformers.',
      'Adaptive test-time compute scaling: hard reasoning passes loop recursively through the core.',
      'Eliminating loss spikes and numerical gradient explosions with Muon-AdamW dual optimization.'
    ],
  },
  {
    id: 'up-04',
    title: 'Upcoming: Atlas-SWE and Atlas-Sec Specialized Checkpoints',
    version_tag: 'Roadmap-Q2',
    date: 'April 2026 (Planned)',
    category: 'Architecture',
    summary: 'Next phase scaling to 7B specialist models targeting software repository synthesis, driver verification, and binary exploit discovery.',
    details: [
      'Multi-file AST refactoring without conversational apologetic pauses.',
      'Deterministic pointer safety and kernel memory exploit inspection.',
      'Dedicated research tiers opening for university labs.'
    ],
  },
];
