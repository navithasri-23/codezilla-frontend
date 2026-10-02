import React from 'react';
import { User } from '../../types/user';
import { ContributionCalendar } from '../calendar/ContributionCalendar';
import { Zap, Flame, Trophy, CheckCircle2, Award, Sparkles, Star } from 'lucide-react';
import { MOCK_BADGES } from '../../data/mockBadges';

interface ProfileOverviewProps {
  user: User;
  onNavigateToBadges?: () => void;
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  user,
  onNavigateToBadges,
}) => {
  const stats = user.stats;
  const total = stats.lifetimeSolved;
  const easyPct = total > 0 ? Math.round((stats.easySolved / total) * 100) : 0;
  const medPct = total > 0 ? Math.round((stats.mediumSolved / total) * 100) : 0;
  const hardPct = total > 0 ? Math.round((stats.hardSolved / total) * 100) : 0;

  // Recent 4 badges
  const earnedBadges = MOCK_BADGES.filter((b) => user.badgesEarned.includes(b.id));

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Solved Problems Card */}
        <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>TOTAL PROBLEMS SOLVED</span>
            <CheckCircle2 className="w-4 h-4 text-cz-orange" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-100">
            {stats.lifetimeSolved}
          </div>
          <div className="mt-2 text-xs font-mono flex items-center gap-2">
            <span className="text-emerald-400 font-bold">{stats.easySolved} Easy</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{stats.mediumSolved} Med</span>
            <span>•</span>
            <span className="text-rose-400 font-bold">{stats.hardSolved} Hard</span>
          </div>
        </div>

        {/* XP Telemetry Card */}
        <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>XP TELEMETRY</span>
            <Zap className="w-4 h-4 text-cz-gold fill-cz-gold" />
          </div>
          <div className="text-3xl font-black font-mono text-cz-orange">
            {stats.lifetimeXp}
            <span className="text-xs font-normal text-slate-400 ml-1">Lifetime</span>
          </div>
          <div className="mt-2 text-xs font-mono text-slate-300">
            <strong className="text-cz-gold">+{stats.weeklyXp} XP</strong> earned this sprint
          </div>
        </div>

        {/* Streaks Card */}
        <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>CONSISTENCY STREAK</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-400">
            {stats.currentStreak}
            <span className="text-xs font-normal text-slate-400 ml-1">days current</span>
          </div>
          <div className="mt-2 text-xs font-mono text-slate-400">
            All-Time Longest: <strong className="text-slate-200">{stats.longestStreak} days</strong>
          </div>
        </div>

        {/* Weekly Ranking Card */}
        <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>WEEKLY RANKING</span>
            <Trophy className="w-4 h-4 text-cz-gold" />
          </div>
          <div className="text-3xl font-black font-mono text-cz-gold">
            #{stats.weeklyRank}
            <span className="text-xs font-normal text-slate-400 ml-1">this week</span>
          </div>
          <div className="mt-2 text-xs font-mono text-slate-400">
            Personal Best: <strong className="text-amber-300">#{stats.bestWeeklyRank}</strong>
          </div>
        </div>
      </div>

      {/* Difficulty Breakdown Bar */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <span className="font-bold text-slate-200 uppercase tracking-wider">
            LeetCode Difficulty Distribution
          </span>
          <span className="text-slate-400">{stats.lifetimeSolved} total solved</span>
        </div>

        {/* Multi-colored bar */}
        <div className="h-3 w-full bg-cz-dark-950 rounded-full overflow-hidden flex p-[1px] border border-cz-dark-800">
          <div
            style={{ width: `${easyPct}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
            title={`Easy: ${stats.easySolved} (${easyPct}%)`}
          />
          <div
            style={{ width: `${medPct}%` }}
            className="h-full bg-amber-500 transition-all duration-500"
            title={`Medium: ${stats.mediumSolved} (${medPct}%)`}
          />
          <div
            style={{ width: `${hardPct}%` }}
            className="h-full bg-rose-500 rounded-r-full transition-all duration-500"
            title={`Hard: ${stats.hardSolved} (${hardPct}%)`}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-3 border-t border-cz-dark-800/80 text-center font-mono">
          <div className="p-2 rounded-xl bg-cz-dark-950 border border-emerald-500/20">
            <div className="text-[11px] text-emerald-400 font-bold uppercase">Easy (+2 XP)</div>
            <div className="text-lg font-black text-slate-100 mt-0.5">{stats.easySolved}</div>
            <div className="text-[10px] text-slate-500">{easyPct}% of total</div>
          </div>
          <div className="p-2 rounded-xl bg-cz-dark-950 border border-amber-500/20">
            <div className="text-[11px] text-amber-400 font-bold uppercase">Medium (+3 XP)</div>
            <div className="text-lg font-black text-slate-100 mt-0.5">{stats.mediumSolved}</div>
            <div className="text-[10px] text-slate-500">{medPct}% of total</div>
          </div>
          <div className="p-2 rounded-xl bg-cz-dark-950 border border-rose-500/20">
            <div className="text-[11px] text-rose-400 font-bold uppercase">Hard (+4 XP)</div>
            <div className="text-lg font-black text-slate-100 mt-0.5">{stats.hardSolved}</div>
            <div className="text-[10px] text-slate-500">{hardPct}% of total</div>
          </div>
        </div>
      </div>

      {/* GitHub-style Contribution Calendar */}
      <ContributionCalendar userId={user.id} />

      {/* Badge Showcase Preview */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-cz-dark-800/80 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cz-gold" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              Badge Collection ({earnedBadges.length} Unlocked)
            </h3>
          </div>
          {onNavigateToBadges && (
            <button
              onClick={onNavigateToBadges}
              className="text-xs font-mono text-cz-orange hover:text-cz-orange-hover"
            >
              View All Badges →
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-cz-dark-950 border border-cz-dark-800 hover:border-cz-orange/40 rounded-xl p-3 flex flex-col items-center text-center transition-all group"
            >
              <div className="text-3xl mb-1.5 transform group-hover:scale-110 transition-transform">
                {badge.icon}
              </div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-cz-orange transition-colors truncate w-full">
                {badge.name}
              </div>
              <div className="text-[10px] font-mono text-cz-gold mt-0.5">
                +{badge.xpReward} XP
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
