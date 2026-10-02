import React, { useState, useEffect } from 'react';
import { LeaderboardPodium } from '../components/leaderboard/LeaderboardPodium';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';
import { LeaderboardFilters } from '../components/leaderboard/LeaderboardFilters';
import { leaderboardService } from '../services/leaderboardService';
import { LeaderboardEntry, LeaderboardFilters as IFilters } from '../types/leaderboard';
import { Trophy, ShieldCheck, Clock, Users, Sparkles } from 'lucide-react';
import { weeklyService } from '../services/weeklyService';

interface LeaderboardPageProps {
  onSelectUser: (userId: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onSelectUser }) => {
  const [filters, setFilters] = useState<IFilters>({
    year: 'All',
    window: 'this-week',
    searchQuery: '',
  });

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(weeklyService.getTimeRemainingUntilReset());

  useEffect(() => {
    setLoading(true);
    leaderboardService.getLeaderboard(filters).then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, [filters]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(weeklyService.getTimeRemainingUntilReset());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFilterChange = (updated: Partial<IFilters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const topThree = entries.slice(0, 3);
  const tableEntries = entries; // Show full ranking with ranks clearly indicated

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cz-dark-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-cz-gold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>COLLEGE COMPETITIVE ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-slate-100">
            WEEKLY LEADERBOARD
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            Verified LeetCode XP standings. Fresh sprint every week, lifetime achievements preserved.
          </p>
        </div>

        {/* Sprint Reset Clock */}
        <div className="flex items-center gap-3 p-3 bg-cz-dark-900 border border-cz-dark-800 rounded-xl font-mono text-xs">
          <Clock className="w-4 h-4 text-cz-orange" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase">Sprint Closes In</div>
            <div className="font-bold text-slate-200">
              <span className="text-cz-orange">{timeLeft.days}d</span> {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Notice Banner (Prominent and clear) */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-cz-dark-900/60 border border-cz-dark-800 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            <strong className="text-slate-200">Privacy Safeguard Active:</strong> Solved problem quantities are confidential to personal profiles and hidden on public leaderboards.
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-slate-500">
          Ranked by Verified XP
        </span>
      </div>

      {/* Interactive Filters: Year + Window + Search */}
      <LeaderboardFilters filters={filters} onChange={handleFilterChange} />

      {/* Visual Top 3 Podium (Only shown if at least 3 matching results and not searching heavily) */}
      {!filters.searchQuery && topThree.length === 3 && (
        <div className="pt-2">
          <LeaderboardPodium entries={topThree} onSelectUser={onSelectUser} />
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div>
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
          <span className="font-bold uppercase tracking-wider text-slate-300">
            {filters.year === 'All' ? 'All College Cohorts' : filters.year} Rankings ({entries.length} coders)
          </span>
          <span>Click any coder to inspect game profile</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs font-mono text-slate-500">
            Recalculating verified leaderboard standings...
          </div>
        ) : (
          <LeaderboardTable entries={tableEntries} onSelectUser={onSelectUser} />
        )}
      </div>
    </div>
  );
};
