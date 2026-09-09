import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import { Navbar } from './components/Navbar';
import { OverviewView } from './components/views/OverviewView';
import { ModelsView } from './components/views/ModelsView';
import { PhilosophyView } from './components/views/PhilosophyView';
import { SpecsView } from './components/views/SpecsView';
import { AboutView } from './components/views/AboutView';
import { FAQView } from './components/views/FAQView';
import { DemoView } from './components/views/DemoView';
import { ProfileView } from './components/views/ProfileView';
import { UpdatesView } from './components/views/UpdatesView';
import { DashboardView } from './components/views/DashboardView';
import { JoinView } from './components/views/JoinView';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { AuthModal } from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>('overview');
  const [joinCode, setJoinCode] = useState<string>('');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenDemo = () => {
    window.open('https://madcoderme--atlas-rdt-chat-ui.modal.run/', '_blank', 'noopener,noreferrer');
  };

  // Sync hash routing and URL parameters
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash;
      const search = window.location.search;

      // Extract code / referral query parameter
      const searchParams = new URLSearchParams(search);
      let detectedCode =
        searchParams.get('ref') ||
        searchParams.get('referral') ||
        searchParams.get('referral_code') ||
        searchParams.get('code') ||
        searchParams.get('invite') ||
        searchParams.get('c') ||
        '';

      if (!detectedCode && hash.includes('?')) {
        const hashQuery = hash.split('?')[1];
        const hashParams = new URLSearchParams(hashQuery);
        detectedCode =
          hashParams.get('ref') ||
          hashParams.get('referral') ||
          hashParams.get('referral_code') ||
          hashParams.get('code') ||
          hashParams.get('invite') ||
          hashParams.get('c') ||
          '';
      }

      if (detectedCode) {
        setJoinCode(detectedCode.trim().toUpperCase());
      }

      // Check if user is accessing /join or #/join
      if (
        pathname === '/join' ||
        pathname.startsWith('/join/') ||
        hash.startsWith('#/join') ||
        hash === '#join' ||
        searchParams.get('page') === 'join'
      ) {
        setCurrentRoute('join');
        return;
      }

      const cleanHash = hash.replace('#/', '').split('?')[0] as RoutePath;
      if (cleanHash === 'demo') {
        handleOpenDemo();
        setCurrentRoute('overview');
      } else if (
        ['overview', 'models', 'philosophy', 'specs', 'about', 'faq', 'dashboard', 'profile', 'updates', 'join'].includes(
          cleanHash
        )
      ) {
        setCurrentRoute(cleanHash);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigate = (route: RoutePath) => {
    if (route === 'demo') {
      handleOpenDemo();
      return;
    }
    setCurrentRoute(route);
    if (route === 'join' && joinCode) {
      window.location.hash = `#/join?code=${encodeURIComponent(joinCode)}`;
    } else {
      window.location.hash = `#/${route}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-canvas text-text-main font-sans selection:bg-accent-pri selection:text-canvas antialiased flex flex-col justify-between">
        <div>
          {/* Modal-style Navbar */}
          <Navbar
            currentRoute={currentRoute}
            navigate={navigate}
            onOpenWaitlist={() => setIsWaitlistOpen(true)}
            onOpenDemo={handleOpenDemo}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />

          {/* Dedicated Route Views */}
          <main>
            {currentRoute === 'overview' && (
              <OverviewView
                navigate={navigate}
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
                onOpenDemo={handleOpenDemo}
              />
            )}

            {currentRoute === 'join' && (
              <JoinView
                initialCode={joinCode}
                navigate={navigate}
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
                onOpenDemo={handleOpenDemo}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {currentRoute === 'profile' && (
              <ProfileView
                navigate={navigate}
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
                onOpenDemo={handleOpenDemo}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {currentRoute === 'updates' && (
              <UpdatesView
                navigate={navigate}
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
                onOpenDemo={handleOpenDemo}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {currentRoute === 'dashboard' && (
              <DashboardView
                navigate={navigate}
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
                onOpenDemo={handleOpenDemo}
                onOpenAuth={() => setIsAuthModalOpen(true)}
              />
            )}

            {currentRoute === 'demo' && (
              <DemoView onOpenWaitlist={() => setIsWaitlistOpen(true)} onOpenDemo={handleOpenDemo} />
            )}

            {currentRoute === 'models' && (
              <ModelsView
                onOpenWaitlist={() => setIsWaitlistOpen(true)}
                onOpenDemo={handleOpenDemo}
              />
            )}

            {currentRoute === 'philosophy' && (
              <PhilosophyView onOpenWaitlist={() => setIsWaitlistOpen(true)} />
            )}

            {currentRoute === 'specs' && (
              <SpecsView onOpenWaitlist={() => setIsWaitlistOpen(true)} />
            )}

            {currentRoute === 'about' && (
              <AboutView onOpenWaitlist={() => setIsWaitlistOpen(true)} />
            )}

            {currentRoute === 'faq' && (
              <FAQView onOpenWaitlist={() => setIsWaitlistOpen(true)} />
            )}
          </main>
        </div>

        {/* Footer */}
        <Footer
          navigate={navigate}
          onOpenWaitlist={() => setIsWaitlistOpen(true)}
          onOpenDemo={handleOpenDemo}
        />

        {/* Waitlist Modal */}
        <WaitlistModal
          isOpen={isWaitlistOpen}
          onClose={() => setIsWaitlistOpen(false)}
          onOpenDashboard={() => navigate('profile')}
          onOpenJoin={() => navigate('join')}
        />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => navigate('profile')}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
