import React from 'react';
import { User } from '../../types/user';
import { LevelBadge } from '../common/LevelBadge';
import { XPProgressBar } from '../common/XPProgressBar';
import { FoxMascot } from '../common/FoxMascot';
import { configService } from '../../services/configService';
import { ShieldCheck, Flame, Trophy, ExternalLink, Calendar, Award } from 'lucide-react';
import { MOCK_BADGES } from '../../data/mockBadges';

interface ProfileHeaderProps {
  user: User;
  isOwner?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isOwner = true }) => {
  const levelData = configService.getLevelInfo(user.stats.lifetimeXp);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-cz-dark-900 border border-cz-dark-800 shadow-card">
      {/* Top Banner Cover with subtle gaming grid & gradient */}
      <div className="h-36 sm:h-44 w-full bg-gradient-to-r from-cz-dark-950 via-cz-dark-900 to-cz-dark-950 relative overflow-hidden border-b border-cz-dark-800">
        <div className="absolute inset-0 bg-cyber-grid opacity-30" />
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-cz-orange/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-cz-purple/15 blur-3xl pointer-events-none" />

        <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2">
          <FoxMascot mood="competitive" size="lg" glow />
        </div>
      </div>

      {/* Main Profile Info Row */}
      <div className="px-6 pb-6 pt-0 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-4">
          {/* Avatar & Identifiers */}
          <div className="flex items-end gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-cz-dark-900 shadow-2xl border-2 border-cz-orange"
              />
              <div className="absolute -bottom-2 -right-2 bg-cz-dark-950 px-2 py-0.5 rounded-lg border border-cz-orange/40 text-[10px] font-mono font-bold text-cz-orange">
                LV.{levelData.currentLevel.level}
              </div>
            </div>

            <div className="mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-100 font-sans">
                  {user.fullName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-md bg-cz-dark-950 text-slate-300 border border-cz-dark-700 text-xs font-mono">
                  {user.year}
                </span>
                {isOwner && (
                  <span className="px-2 py-0.5 rounded-md bg-cz-orange/20 text-cz-orange text-[10px] font-mono font-bold border border-cz-orange/40">
                    YOUR PROFILE
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1 flex-wrap">
                <span className="text-slate-300">@{user.username}</span>
                <span>•</span>
                <a
                  href={`https://leetcode.com/${user.leetcodeUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>LeetCode: {user.leetcodeUsername}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Streak & Rank Badges */}
          <div className="flex items-center gap-2 font-mono flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cz-dark-950 border border-amber-500/30 text-amber-300 text-xs shadow-sm">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>
                <strong>{user.stats.currentStreak}d</strong> active streak
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cz-dark-950 border border-cz-gold/30 text-cz-gold text-xs shadow-sm">
              <Trophy className="w-4 h-4" />
              <span>
                Rank <strong>#{user.stats.weeklyRank}</strong> this week
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-xs text-slate-400 max-w-2xl mb-4 leading-relaxed font-sans">
            {user.bio}
          </p>
        )}

        {/* Level XP Progress Bar */}
        <div className="p-4 bg-cz-dark-950/80 rounded-2xl border border-cz-dark-800">
          <XPProgressBar xp={user.stats.lifetimeXp} showLabels />
        </div>
      </div>
    </div>
  );
};
