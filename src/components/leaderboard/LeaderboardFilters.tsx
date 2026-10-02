import React from 'react';
import { LeaderboardFilters as IFilters, LeaderboardTimeWindow } from '../../types/leaderboard';
import { StudentYear } from '../../types/user';
import { Search, Filter, Calendar, Users } from 'lucide-react';

interface LeaderboardFiltersProps {
  filters: IFilters;
  onChange: (updated: Partial<IFilters>) => void;
}

export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({
  filters,
  onChange,
}) => {
  const yearOptions: Array<'All' | StudentYear> = [
    'All',
    'First Year',
    'Second Year',
    'Third Year',
  ];

  const windowOptions: Array<{ id: LeaderboardTimeWindow; label: string }> = [
    { id: 'this-week', label: 'This Week (Sprint)' },
    { id: 'previous-week', label: 'Previous Week' },
    { id: 'all-time', label: 'All-Time Ranks' },
  ];

  return (
    <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-4 shadow-card space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Year Filter Tabs */}
        <div>
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cz-orange" />
            <span>Filter By College Year</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-cz-dark-950 rounded-xl border border-cz-dark-800">
            {yearOptions.map((yr) => {
              const isSelected = filters.year === yr;
              return (
                <button
                  key={yr}
                  onClick={() => onChange({ year: yr })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 ${
                    isSelected
                      ? 'bg-cz-dark-800 text-cz-orange border border-cz-orange/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-cz-dark-900'
                  }`}
                >
                  {yr === 'All' ? 'All Cohorts' : yr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Window Switcher */}
        <div>
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cz-purple-neon" />
            <span>Competition Window</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-cz-dark-950 rounded-xl border border-cz-dark-800">
            {windowOptions.map((opt) => {
              const isSelected = filters.window === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onChange({ window: opt.id })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-150 ${
                    isSelected
                      ? 'bg-cz-dark-800 text-cz-purple-neon border border-cz-purple/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-cz-dark-900'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search coder by name, username, or LeetCode handle..."
          value={filters.searchQuery || ''}
          onChange={(e) => onChange({ searchQuery: e.target.value })}
          className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cz-orange font-mono"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onChange({ searchQuery: '' })}
            className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-300 font-mono"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
