import React from 'react';
import { User } from '../../types/user';
import { FoxMascot } from '../common/FoxMascot';
import { XPProgressBar } from '../common/XPProgressBar';
import { LevelBadge } from '../common/LevelBadge';
import { configService } from '../../services/configService';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface WelcomeBannerProps {
  user: User;
  onQuickVerify?: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ user, onQuickVerify }) => {
  const levelData = configService.getLevelInfo(user.stats.lifetimeXp);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cz-dark-900 via-cz-dark-850 to-cz-dark-900 border border-cz-dark-750 p-6 shadow-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Section: Greeting & Info */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cz-orange shadow-cz-orange"
            />
            <div className="absolute -bottom-2 -right-2">
              <FoxMascot mood="playful" size="sm" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
                <span>Welcome back, {user.username}</span>
                <span className="text-xl">🦊</span>
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-cz-dark-800 text-cz-orange border border-cz-orange/30">
                {user.year}
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 font-mono">
              <span className="text-slate-300 font-semibold">{user.fullName}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> LeetCode @{user.leetcodeUsername}
              </span>
            </p>

            <div className="mt-3 flex items-center gap-2">
              <LevelBadge levelNumber={levelData.currentLevel.level} size="md" />
              <span className="text-xs text-slate-400 font-mono">
                Weekly Rank: <strong className="text-cz-gold font-bold">#{user.stats.weeklyRank}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Level XP Progress bar */}
        <div className="w-full md:w-80 bg-cz-dark-950/70 p-4 rounded-xl border border-cz-dark-800">
          <XPProgressBar xp={user.stats.lifetimeXp} showLabels />
        </div>
      </div>
    </div>
  );
};
