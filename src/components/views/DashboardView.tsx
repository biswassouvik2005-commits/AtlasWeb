import React, { useState } from 'react';
import { RoutePath } from '../../types';
import { ProfileView } from './ProfileView';
import { UpdatesView } from './UpdatesView';
import { User, Sparkles } from 'lucide-react';

interface DashboardViewProps {
  navigate: (route: RoutePath) => void;
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
  onOpenAuth: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = (props) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'updates'>('profile');

  return (
    <div className="min-h-screen bg-canvas text-text-main">
      {/* Sub-nav switcher */}
      <div className="bg-canvas border-b border-border-subtle sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 font-bold ${
                activeTab === 'profile'
                  ? 'bg-accent-sec/20 text-[#E3DCFB] border-accent-sec/50'
                  : 'bg-surface-subtle text-text-muted border-border-subtle hover:text-text-main'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Researcher Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('updates')}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 font-bold ${
                activeTab === 'updates'
                  ? 'bg-accent-pri text-canvas border-accent-pri'
                  : 'bg-surface-subtle text-text-muted border-border-subtle hover:text-text-main'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Waitlist Telemetry &amp; Releases</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'profile' ? (
        <ProfileView {...props} />
      ) : (
        <UpdatesView {...props} />
      )}
    </div>
  );
};
