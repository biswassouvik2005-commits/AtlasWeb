import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RoutePath } from '../../types';
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  User,
  ArrowRight,
  ExternalLink,
  Layers,
  Terminal,
  Activity,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

interface UpdatesViewProps {
  navigate: (route: RoutePath) => void;
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
  onOpenAuth: () => void;
}

export const UpdatesView: React.FC<UpdatesViewProps> = ({
  navigate,
  onOpenWaitlist,
  onOpenDemo,
  onOpenAuth,
}) => {
  const { user, waitlistEntry, updates, refreshData } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredUpdates = selectedCategory === 'all'
    ? updates
    : updates.filter((u) => u.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-canvas text-text-main py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Header Card */}
        <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <span className="px-2.5 py-0.5 bg-accent-pri/20 text-accent-pri border border-accent-pri/40 font-bold rounded-md">
                LIVE ENGINE TELEMETRY
              </span>
              <span className="text-text-dim">//</span>
              <span className="text-text-muted font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-accent-pri" />
                Continuous Build Stream
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-text-main font-sans tracking-tight">
              Waitlist Priority &amp; Model Release Feed
            </h1>

            <p className="text-xs sm:text-sm text-text-muted font-sans max-w-2xl leading-relaxed">
              Track real-time engine release bulletins, architecture milestones, and your verified queue status for Odyssey reasoning model rollouts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={refreshData}
              className="px-4 py-2.5 bg-surface-subtle hover:bg-border-subtle text-text-muted hover:text-text-main border border-border-subtle hover:border-accent-pri text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
              title="Refresh telemetry"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Feed</span>
            </button>

            {user ? (
              <button
                onClick={() => navigate('profile')}
                className="px-4 py-2.5 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border border-accent-sec/40 hover:border-accent-sec text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-accent-sec" />
                <span>My Profile</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2.5 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border border-accent-sec/40 hover:border-accent-sec text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-accent-sec" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Top Priority Telemetry Banner */}
        <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-accent-sec flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent-sec" />
                <span>[ EARLY ACCESS PIPELINE TELEMETRY ]</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-main font-sans">
                Active Queue Status
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenWaitlist}
                className="px-4 py-2 bg-accent-pri hover:bg-accent-pri-hover text-canvas font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{user ? 'Update Waitlist Info' : 'Join Waitlist'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-surface-subtle border border-border-subtle rounded-2xl space-y-1">
              <div className="text-text-dim">QUEUE POSITION</div>
              <div className="text-2xl font-black text-accent-pri">
                #{waitlistEntry?.position || (user ? 142 : '—')}
              </div>
              <div className="text-[11px] text-text-dim">
                {user ? 'Verified researcher slot' : 'Sign in to check position'}
              </div>
            </div>

            <div className="p-4 bg-surface-subtle border border-border-subtle rounded-2xl space-y-1">
              <div className="text-text-dim">APPLICATION STATUS</div>
              <div className="text-base font-bold text-accent-pri flex items-center gap-1.5 capitalize">
                <CheckCircle2 className="w-4 h-4 text-accent-pri" />
                <span>{waitlistEntry?.status || (user ? 'In Review' : 'Public Queue')}</span>
              </div>
              <div className="text-[11px] text-text-dim">Cluster access priority</div>
            </div>

            <div className="p-4 bg-surface-subtle border border-border-subtle rounded-2xl space-y-1">
              <div className="text-text-dim">DELIVERY CHANNEL</div>
              <div className="text-base font-bold text-accent-sec">
                {waitlistEntry?.delivery_channel === 'all'
                  ? 'All 3 Formats'
                  : waitlistEntry?.delivery_channel === 'hosted_api'
                  ? 'Hosted API'
                  : waitlistEntry?.delivery_channel === 'compiled_binary'
                  ? 'Native Binaries'
                  : waitlistEntry?.delivery_channel === 'weights'
                  ? 'Model Weights'
                  : 'Multi-Format'}
              </div>
              <div className="text-[11px] text-text-dim">API / C++ / PyTorch</div>
            </div>

            <div className="p-4 bg-surface-subtle border border-border-subtle rounded-2xl space-y-1">
              <div className="text-text-dim">FLAGSHIP TARGET</div>
              <div className="text-base font-bold text-text-main">Atlas 0.1 CP</div>
              <div className="text-[11px] text-text-dim">600M Params Deterministic</div>
            </div>
          </div>
        </div>

        {/* Releases & Bulletins Section */}
        <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-4">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-accent-pri flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent-pri" />
                <span>[ OFFICIAL RESEARCH &amp; ENGINE BULLETINS ]</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-main font-sans">
                Release Bulletins &amp; Engineering Changelog
              </h2>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {['all', 'milestone', 'delivery', 'research'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer capitalize font-bold ${
                    selectedCategory === cat
                      ? 'bg-accent-sec/20 text-[#E3DCFB] border-accent-sec/40 shadow-sm'
                      : 'bg-surface-subtle text-text-muted border-border-subtle hover:text-text-main'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Updates Feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredUpdates.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border space-y-3.5 transition-all flex flex-col justify-between ${
                  item.is_pinned
                    ? 'bg-surface-subtle border-accent-pri/40 ring-1 ring-accent-pri/20'
                    : 'bg-canvas border-border-subtle hover:border-border-strong'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-surface text-accent-pri border border-border-subtle rounded">
                        {item.version_tag}
                      </span>
                      <span className="text-[10px] font-mono text-accent-sec px-2 py-0.5 bg-surface border border-border-subtle rounded">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-text-dim">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-text-main font-sans leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-muted font-sans leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {item.details && item.details.length > 0 && (
                  <ul className="space-y-1.5 pt-3 border-t border-border-subtle/70">
                    {item.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-text-muted flex items-start gap-2 font-sans"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-pri shrink-0 mt-1.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
