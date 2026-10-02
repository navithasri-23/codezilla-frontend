import React, { useState } from 'react';
import { FoxMascot } from './FoxMascot';
import { useAuth } from '../../context/AuthContext';
import { LevelBadge } from './LevelBadge';
import { Flame, Zap, Trophy, Award, LayoutDashboard, User as UserIcon, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { configService } from '../../services/configService';

interface NavbarProps {
  activeTab: 'landing' | 'dashboard' | 'leaderboard' | 'badges' | 'profile';
  setActiveTab: (tab: 'landing' | 'dashboard' | 'leaderboard' | 'badges' | 'profile') => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
}) => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const levelInfo = currentUser
    ? configService.getLevelInfo(currentUser.stats.lifetimeXp).currentLevel
    : null;

  const navLinks: { id: 'landing' | 'dashboard' | 'leaderboard' | 'badges' | 'profile'; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { id: 'badges', label: 'Badges', icon: <Award className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile', icon: <UserIcon className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cz-dark-800 bg-cz-dark-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative">
            <FoxMascot mood="competitive" size="sm" glow />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-cz-dark-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cz-orange via-cz-orange-light to-cz-gold group-hover:opacity-90 transition-opacity">
              CODEZILLA
            </span>
            <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 font-semibold -mt-1 hidden sm:block">
              Gamified LeetCode Arena
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-cz-dark-900/60 p-1 rounded-xl border border-cz-dark-800/80">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-cz-dark-800 text-cz-orange shadow-sm border border-cz-orange/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-cz-dark-800/40'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: User Stats & Account */}
        <div className="hidden lg:flex items-center gap-3">
          {currentUser ? (
            <>
              {/* Streak Counter Pill */}
              <div
                title="Current Consecutive Daily Streak"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cz-dark-900 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold shadow-sm"
              >
                <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
                <span>{currentUser.stats.currentStreak}d Streak</span>
              </div>

              {/* Weekly XP Pill */}
              <div
                title="XP Gained This Week"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cz-dark-900 border border-cz-orange/30 text-cz-orange text-xs font-mono font-bold shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-cz-orange fill-cz-orange" />
                <span>{currentUser.stats.weeklyXp} Weekly XP</span>
              </div>

              {/* Level Badge */}
              {levelInfo && (
                <LevelBadge levelNumber={levelInfo.level} size="sm" showTitle={false} />
              )}

              {/* Profile Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl bg-cz-dark-900 hover:bg-cz-dark-800 border border-cz-dark-750 transition-colors focus:outline-none"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-cz-orange/50"
                  />
                  <span className="text-xs font-medium text-slate-200 max-w-[100px] truncate">
                    {currentUser.username}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-cz-dark-900 border border-cz-dark-700 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <div className="p-2 border-b border-cz-dark-800 mb-1">
                      <div className="text-xs font-bold text-slate-100">{currentUser.fullName}</div>
                      <div className="text-[11px] text-cz-orange font-mono">@{currentUser.leetcodeUsername}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{currentUser.year}</div>
                    </div>

                    <button
                      onClick={() => setActiveTab('profile')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-cz-dark-800 rounded-lg transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-cz-purple-neon" />
                      <span>View My Profile</span>
                    </button>

                    <button
                      onClick={() => onOpenAuth('login')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-cz-dark-800 rounded-lg transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cz-gold" />
                      <span>Switch Student Account</span>
                    </button>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-1.5 text-xs font-bold bg-cz-orange hover:bg-cz-orange-hover text-cz-dark-950 rounded-lg transition-all shadow-cz-orange"
              >
                Join Club
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          {currentUser && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-cz-dark-900 border border-cz-orange/30 text-cz-orange text-xs font-mono">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{currentUser.stats.currentStreak}d</span>
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-cz-dark-900 border border-cz-dark-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cz-dark-800 bg-cz-dark-950 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-mono font-medium ${
                  activeTab === link.id
                    ? 'bg-cz-dark-800 text-cz-orange border border-cz-orange/30'
                    : 'text-slate-300 bg-cz-dark-900/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          {currentUser ? (
            <div className="pt-3 border-t border-cz-dark-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.fullName}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-100">{currentUser.fullName}</div>
                  <div className="text-[10px] text-cz-orange font-mono">@{currentUser.leetcodeUsername}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 text-xs bg-cz-dark-800 border border-cz-dark-700 text-slate-300 rounded-lg"
              >
                Switch
              </button>
            </div>
          ) : (
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-semibold text-slate-300 bg-cz-dark-900 border border-cz-dark-800 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onOpenAuth('signup');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-bold text-cz-dark-950 bg-cz-orange rounded-lg"
              >
                Join Club
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
