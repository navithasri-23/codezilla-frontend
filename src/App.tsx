import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { BadgesPage } from './pages/BadgesPage';
import { AuthModal } from './components/auth/AuthModal';

export type NavigationTab = 'landing' | 'dashboard' | 'leaderboard' | 'badges' | 'profile';

const MainApp: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearSelectedUser = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen bg-cz-dark-950 text-slate-100 flex flex-col font-sans selection:bg-cz-orange selection:text-cz-dark-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'profile') {
            setSelectedUserId(null);
          }
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onEnterArena={() => {
              if (currentUser) {
                setActiveTab('dashboard');
              } else {
                handleOpenAuth('signup');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreLeaderboard={() => {
              setActiveTab('leaderboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectUser={handleSelectUser}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            onNavigateToLeaderboard={() => {
              setActiveTab('leaderboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToBadges={() => {
              setActiveTab('badges');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectUser={handleSelectUser}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardPage onSelectUser={handleSelectUser} />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            selectedUserId={selectedUserId}
            onClearSelectedUser={handleClearSelectedUser}
            onNavigateToBadges={() => {
              setActiveTab('badges');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'badges' && <BadgesPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
