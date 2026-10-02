import React from 'react';
import { UserStatistics } from '../../types/user';
import { Flame, Zap, Trophy, CheckCircle2, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  stats: UserStatistics;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Current Streak */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 hover:border-orange-500/40 rounded-2xl p-4 transition-all duration-200 shadow-card group">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>DAILY STREAK</span>
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
            <Flame className="w-4 h-4 fill-orange-500" />
          </div>
        </div>
        <div className="text-2xl font-bold font-mono text-slate-100 flex items-baseline gap-1.5">
          <span>{stats.currentStreak}</span>
          <span className="text-xs text-orange-400 font-sans font-normal">days active</span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 font-mono">
          <span className="text-slate-500">Longest:</span>
          <span className="text-slate-200 font-semibold">{stats.longestStreak} days</span>
        </div>
      </div>

      {/* Weekly XP */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 hover:border-cz-orange/40 rounded-2xl p-4 transition-all duration-200 shadow-card group">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>WEEKLY XP</span>
          <div className="p-1.5 rounded-lg bg-cz-orange/10 text-cz-orange group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4 fill-cz-orange" />
          </div>
        </div>
        <div className="text-2xl font-bold font-mono text-cz-orange flex items-baseline gap-1.5">
          <span>+{stats.weeklyXp}</span>
          <span className="text-xs text-slate-400 font-sans font-normal">XP this sprint</span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 font-mono">
          <span className="text-slate-500">Lifetime:</span>
          <span className="text-slate-200 font-semibold">{stats.lifetimeXp} XP</span>
        </div>
      </div>

      {/* Weekly Rank */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 hover:border-cz-gold/40 rounded-2xl p-4 transition-all duration-200 shadow-card group">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>WEEKLY SPRINT RANK</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-cz-gold group-hover:scale-110 transition-transform">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold font-mono text-slate-100 flex items-baseline gap-1.5">
          <span className="text-cz-gold">#{stats.weeklyRank}</span>
          <span className="text-xs text-slate-400 font-sans font-normal">in College</span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1 font-mono">
          <span className="text-slate-500">Best Rank:</span>
          <span className="text-amber-400 font-semibold">#{stats.bestWeeklyRank}</span>
        </div>
      </div>

      {/* Solved Problems (User Private Dashboard) */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 hover:border-cz-purple/40 rounded-2xl p-4 transition-all duration-200 shadow-card group">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>SOLVED PROBLEMS</span>
          <div className="p-1.5 rounded-lg bg-cz-purple/10 text-cz-purple-neon group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold font-mono text-slate-100 flex items-baseline gap-1.5">
          <span>{stats.lifetimeSolved}</span>
          <span className="text-xs text-slate-400 font-sans font-normal">verified</span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2 font-mono">
          <span className="text-emerald-400">{stats.easySolved}E</span>
          <span className="text-amber-400">{stats.mediumSolved}M</span>
          <span className="text-rose-400">{stats.hardSolved}H</span>
        </div>
      </div>
    </div>
  );
};
