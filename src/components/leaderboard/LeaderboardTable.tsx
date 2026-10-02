import React from 'react';
import { LeaderboardEntry } from '../../types/leaderboard';
import { LevelBadge } from '../common/LevelBadge';
import { Flame, Zap, ArrowUp, ArrowDown, Minus, ShieldCheck, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  onSelectUser: (userId: string) => void;
  startIndex?: number;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  onSelectUser,
  startIndex = 0,
}) => {
  const { currentUser } = useAuth();

  const getRankShift = (rank: number, prevRank?: number) => {
    if (!prevRank || prevRank === rank) {
      return <Minus className="w-3 h-3 text-slate-500" />;
    }
    if (prevRank > rank) {
      return (
        <span className="flex items-center text-emerald-400 font-mono text-[10px]">
          <ArrowUp className="w-3 h-3" />
          {prevRank - rank}
        </span>
      );
    }
    return (
      <span className="flex items-center text-rose-400 font-mono text-[10px]">
        <ArrowDown className="w-3 h-3" />
        {rank - prevRank}
      </span>
    );
  };

  return (
    <div className="w-full bg-cz-dark-900 border border-cz-dark-800 rounded-2xl overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-cz-dark-800 bg-cz-dark-950/60 text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4 text-center w-14">Rank</th>
              <th className="py-3.5 px-4">Student</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">Year</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Level</th>
              <th className="py-3.5 px-4 text-center">Streak</th>
              <th className="py-3.5 px-4 hidden lg:table-cell">Badges</th>
              <th className="py-3.5 px-4 text-right">XP</th>
              <th className="py-3.5 px-4 text-center w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cz-dark-800/60 text-xs">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500 font-mono">
                  No competitors found matching this filter criteria.
                </td>
              </tr>
            ) : (
              entries.map((entry) => {
                const isMe = currentUser?.id === entry.userId;
                return (
                  <tr
                    key={entry.userId}
                    onClick={() => onSelectUser(entry.userId)}
                    className={`cursor-pointer transition-colors duration-150 group ${
                      isMe
                        ? 'bg-cz-orange/10 hover:bg-cz-orange/15 font-semibold'
                        : 'hover:bg-cz-dark-850/80'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      <div className="flex flex-col items-center justify-center">
                        <span
                          className={`font-black text-sm ${
                            entry.rank === 1
                              ? 'text-cz-gold'
                              : entry.rank === 2
                              ? 'text-slate-300'
                              : entry.rank === 3
                              ? 'text-amber-500'
                              : 'text-slate-400'
                          }`}
                        >
                          #{entry.rank}
                        </span>
                        <div className="mt-0.5">{getRankShift(entry.rank, entry.previousRank)}</div>
                      </div>
                    </td>

                    {/* Student Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={entry.avatar}
                            alt={entry.fullName}
                            className={`w-9 h-9 rounded-xl object-cover ring-1 ${
                              isMe ? 'ring-cz-orange' : 'ring-cz-dark-700'
                            }`}
                          />
                          {isMe && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cz-orange ring-2 ring-cz-dark-900" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-100 group-hover:text-cz-orange transition-colors truncate">
                              {entry.fullName}
                            </span>
                            {isMe && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cz-orange text-cz-dark-950 font-mono font-bold">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 truncate">
                            @{entry.username}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* College Year */}
                    <td className="py-3.5 px-4 hidden sm:table-cell font-mono text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-cz-dark-950 border border-cz-dark-800 text-[11px]">
                        {entry.year}
                      </span>
                    </td>

                    {/* Level */}
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <LevelBadge levelNumber={entry.levelNumber} size="sm" showTitle />
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-cz-dark-950 border border-amber-500/20 text-amber-300 font-bold text-xs">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                        {entry.streak}d
                      </span>
                    </td>

                    {/* Badges Indicator */}
                    <td className="py-3.5 px-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        {entry.featuredBadges.map((badgeIcon, idx) => (
                          <span
                            key={idx}
                            className="p-1 rounded bg-cz-dark-950 border border-cz-dark-800 text-sm"
                          >
                            {badgeIcon}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* XP Score (Privacy Note: Total Solved Problems is NOT displayed) */}
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span className="inline-flex items-center gap-1 font-black text-sm text-cz-orange">
                        <Zap className="w-3.5 h-3.5 fill-cz-orange" />
                        {entry.xp} XP
                      </span>
                    </td>

                    {/* Row Arrow */}
                    <td className="py-3.5 px-4 text-center text-slate-500 group-hover:text-slate-300">
                      <ChevronRight className="w-4 h-4" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
