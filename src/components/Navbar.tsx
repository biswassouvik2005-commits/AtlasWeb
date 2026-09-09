import React, { useState } from 'react';
import { RoutePath } from '../types';
import { ShieldCheck, Menu, X, Play, User, Sparkles } from 'lucide-react';
import { ModalLogo } from './ModalLogo';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentRoute: RoutePath;
  navigate: (route: RoutePath) => void;
  onOpenWaitlist: () => void;
  onOpenDemo: () => void;
  onOpenAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  navigate,
  onOpenWaitlist,
  onOpenDemo,
  onOpenAuth,
}) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNavItems: { id: RoutePath; label: string; isPill?: boolean; badge?: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'models', label: 'Models' },
    { id: 'updates', label: 'Updates' },
    { id: 'demo', label: 'Atlas 0.1 Demo', isPill: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-border-subtle font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('overview')}
            className="hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            <ModalLogo />
          </button>
        </div>

        {/* Clean Center Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 text-sm font-sans">
          {mainNavItems.map((item) => {
            const isActive = currentRoute === item.id;
            if (item.isPill) {
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`px-3.5 py-1.5 text-xs font-sans font-bold transition-all cursor-pointer flex items-center gap-1.5 rounded-xl border ${
                    isActive
                      ? 'bg-accent-pri text-canvas border-accent-pri shadow-sm'
                      : 'bg-surface text-text-main border-border-subtle hover:bg-surface-subtle hover:border-accent-pri'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-accent-pri animate-pulse" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors cursor-pointer rounded-xl flex items-center gap-1.5 ${
                  isActive
                    ? 'text-accent-pri bg-surface-subtle font-bold border border-border-subtle'
                    : 'text-text-muted hover:text-text-main hover:bg-surface-subtle'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 bg-accent-sec/20 text-[#E3DCFB] border border-accent-sec/40 text-[9px] font-mono rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action Bar: Profile/Auth + Request Access */}
        <div className="hidden sm:flex items-center gap-2.5 font-sans">
          {user ? (
            <button
              onClick={() => navigate('profile')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-sm ${
                currentRoute === 'profile'
                  ? 'bg-accent-sec/30 text-white border-accent-sec'
                  : 'bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border-accent-sec/40 hover:border-accent-sec'
              }`}
            >
              <User className="w-3.5 h-3.5 text-accent-sec" />
              <span className="max-w-[120px] truncate">{user.email?.split('@')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => (onOpenAuth ? onOpenAuth() : navigate('profile'))}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-accent-sec/15 hover:bg-accent-sec/25 text-[#E3DCFB] border border-accent-sec/40 hover:border-accent-sec transition-all cursor-pointer font-bold text-xs rounded-xl shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-accent-sec" />
              <span>Sign In</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={onOpenWaitlist}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-accent-pri hover:bg-accent-pri-hover text-canvas transition-all font-bold cursor-pointer text-xs rounded-xl shadow-sm hover:scale-[1.01] active:scale-[0.99]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Request Access</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {user ? (
            <button
              onClick={() => navigate('profile')}
              className="px-2.5 py-1 bg-accent-sec/15 text-[#E3DCFB] border border-accent-sec/40 text-xs font-bold rounded-lg"
            >
              Profile
            </button>
          ) : (
            <button
              onClick={() => (onOpenAuth ? onOpenAuth() : navigate('profile'))}
              className="px-2.5 py-1 bg-accent-sec/15 text-[#E3DCFB] border border-accent-sec/40 text-xs font-bold rounded-lg"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-text-main hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-text-main" />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border-subtle px-4 py-4 space-y-3 font-sans">
          <div className="text-[11px] font-mono font-bold text-text-dim uppercase tracking-wider px-1">Navigation</div>
          <div className="space-y-1.5">
            {mainNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center justify-between ${
                  currentRoute === item.id
                    ? 'bg-surface-subtle text-accent-pri border border-border-subtle'
                    : 'text-text-muted hover:text-text-main hover:bg-surface-subtle'
                }`}
              >
                <span>{item.label}</span>
                {item.isPill && (
                  <span className="badge-primary text-[10px] py-0.5 px-2 rounded-full">
                    LIVE
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => {
                navigate('join');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 ${
                currentRoute === 'join'
                  ? 'bg-surface-subtle text-accent-pri border border-border-subtle'
                  : 'text-text-muted hover:text-text-main hover:bg-surface-subtle'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-pri" />
              <span>Join with Referral Code</span>
            </button>

            <button
              onClick={() => {
                navigate('profile');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 ${
                currentRoute === 'profile'
                  ? 'bg-surface-subtle text-accent-sec border border-border-subtle'
                  : 'text-text-muted hover:text-text-main hover:bg-surface-subtle'
              }`}
            >
              <User className="w-3.5 h-3.5 text-accent-sec" />
              <span>Researcher Profile &amp; Use Case</span>
            </button>
          </div>

          <div className="pt-3 border-t border-border-subtle space-y-2">
            <button
              onClick={() => {
                onOpenWaitlist();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-accent-pri text-canvas font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Request Verified Access</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
