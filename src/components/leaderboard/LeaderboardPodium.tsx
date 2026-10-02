import React from 'react';
import { LeaderboardEntry } from '../../types/leaderboard';
import { Crown, Trophy, Medal, Flame, Zap } from 'lucide-react';
import { LevelBadge } from '../common/LevelBadge';
import { FoxMascot } from '../common/FoxMascot';

interface LeaderboardPodiumProps {
  entries: LeaderboardEntry[];
  onSelectUser: (userId: string) => void;
}

export const LeaderboardPodium: React.FC<LeaderboardPodiumProps> = ({
  entries,
  onSelectUser,
}) => {
  if (entries.length < 3) return null;

  const first = entries[0];
  const second = entries[1];
  const third = entries[2];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 pb-2 items-end">
      {/* 2nd Place - Silver Runner Up */}
      <div
        onClick={() => onSelectUser(second.userId)}
        className="order-2 md:order-1 bg-gradient-to-b from-slate-800/40 via-cz-dark-900 to-cz-dark-950 border border-slate-600/40 rounded-2xl p-5 shadow-card hover:border-slate-400 transition-all duration-300 cursor-pointer relative group flex flex-col items-center text-center"
      >
        {/* Silver Rank Badge */}
        <div className="absolute -top-3.5 px-3 py-1 rounded-full bg-slate-300 text-cz-dark-950 font-mono font-black text-xs shadow-md flex items-center gap-1 border border-slate-100">
          <Medal className="w-3.5 h-3.5 text-slate-800" />
          <span>RANK #2</span>
        </div>

        <div className="relative mt-2 mb-3">
          <img
            src={second.avatar}
            alt={second.fullName}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.3)]"
          />
          <div className="absolute -bottom-1 -right-1 bg-slate-900 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-slate-300 border border-slate-600">
            2nd
          </div>
        </div>

        <h4 className="font-bold text-base text-slate-100 group-hover:text-cz-orange transition-colors truncate max-w-[180px]">
          {second.fullName}
        </h4>
        <div className="text-xs font-mono text-slate-400">@{second.username}</div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">{second.year}</div>

        <div className="mt-3 flex items-center gap-2">
          <LevelBadge levelNumber={second.levelNumber} size="sm" />
          <span className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-cz-dark-950 px-2 py-0.5 rounded border border-cz-dark-800">
            <Flame className="w-3 h-3 text-orange-500" />
            {second.streak}d
          </span>
        </div>

        {/* Featured Badges */}
        <div className="flex items-center gap-1 mt-3">
          {second.featuredBadges.map((b, idx) => (
            <span key={idx} className="text-sm p-1 rounded bg-cz-dark-950 border border-cz-dark-800">
              {b}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-cz-dark-800/80 w-full flex items-center justify-center gap-1.5 text-slate-200 font-mono font-bold text-lg">
          <Zap className="w-4 h-4 text-cz-orange fill-cz-orange" />
          <span>{second.xp} XP</span>
        </div>
      </div>

      {/* 1st Place - Apex Gold Champion */}
      <div
        onClick={() => onSelectUser(first.userId)}
        className="order-1 md:order-2 bg-gradient-to-b from-amber-500/15 via-cz-dark-850 to-cz-dark-950 border-2 border-amber-400/80 rounded-3xl p-6 shadow-cz-gold hover:border-amber-300 transition-all duration-300 cursor-pointer relative group flex flex-col items-center text-center -mt-4 md:-mt-6"
      >
        {/* Crown on top */}
        <div className="absolute -top-6 flex items-center justify-center">
          <div className="p-2 rounded-full bg-gradient-to-r from-amber-400 to-cz-orange text-cz-dark-950 shadow-lg animate-float">
            <Crown className="w-6 h-6 fill-cz-dark-950" />
          </div>
        </div>

        <div className="absolute top-3.5 right-3.5">
          <FoxMascot mood="trophy" size="sm" />
        </div>

        <div className="relative mt-4 mb-3">
          <img
            src={first.avatar}
            alt={first.fullName}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)]"
          />
          <div className="absolute -bottom-2 -right-2 bg-amber-400 text-cz-dark-950 font-black text-xs font-mono px-2 py-0.5 rounded-full shadow-md">
            #1 APEX
          </div>
        </div>

        <h4 className="font-bold text-lg text-slate-100 group-hover:text-amber-300 transition-colors truncate max-w-[200px]">
          {first.fullName}
        </h4>
        <div className="text-xs font-mono text-cz-orange">@{first.username}</div>
        <div className="text-xs font-mono text-slate-300 mt-1">{first.year}</div>

        <div className="mt-3 flex items-center gap-2">
          <LevelBadge levelNumber={first.levelNumber} size="md" />
          <span className="flex items-center gap-1 text-xs font-mono text-amber-300 bg-cz-dark-950 px-2 py-1 rounded-md border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            {first.streak}d streak
          </span>
        </div>

        {/* Featured Badges */}
        <div className="flex items-center gap-1.5 mt-3">
          {first.featuredBadges.map((b, idx) => (
            <span key={idx} className="text-base p-1.5 rounded-lg bg-cz-dark-950 border border-amber-500/30">
              {b}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-3.5 border-t border-amber-500/20 w-full flex items-center justify-center gap-2 text-cz-orange font-mono font-black text-2xl">
          <Zap className="w-5 h-5 fill-cz-orange" />
          <span>{first.xp} XP</span>
        </div>
      </div>

      {/* 3rd Place - Bronze Contender */}
      <div
        onClick={() => onSelectUser(third.userId)}
        className="order-3 bg-gradient-to-b from-amber-900/20 via-cz-dark-900 to-cz-dark-950 border border-amber-700/40 rounded-2xl p-5 shadow-card hover:border-amber-600 transition-all duration-300 cursor-pointer relative group flex flex-col items-center text-center"
      >
        {/* Bronze Rank Badge */}
        <div className="absolute -top-3.5 px-3 py-1 rounded-full bg-[#CD7F32] text-cz-dark-950 font-mono font-black text-xs shadow-md flex items-center gap-1 border border-amber-300/40">
          <Medal className="w-3.5 h-3.5 text-cz-dark-950" />
          <span>RANK #3</span>
        </div>

        <div className="relative mt-2 mb-3">
          <img
            src={third.avatar}
            alt={third.fullName}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#CD7F32] shadow-[0_0_15px_rgba(205,127,50,0.3)]"
          />
          <div className="absolute -bottom-1 -right-1 bg-cz-dark-950 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-amber-500 border border-amber-800">
            3rd
          </div>
        </div>

        <h4 className="font-bold text-base text-slate-100 group-hover:text-cz-orange transition-colors truncate max-w-[180px]">
          {third.fullName}
        </h4>
        <div className="text-xs font-mono text-slate-400">@{third.username}</div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">{third.year}</div>

        <div className="mt-3 flex items-center gap-2">
          <LevelBadge levelNumber={third.levelNumber} size="sm" />
          <span className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-cz-dark-950 px-2 py-0.5 rounded border border-cz-dark-800">
            <Flame className="w-3 h-3 text-orange-500" />
            {third.streak}d
          </span>
        </div>

        {/* Featured Badges */}
        <div className="flex items-center gap-1 mt-3">
          {third.featuredBadges.map((b, idx) => (
            <span key={idx} className="text-sm p-1 rounded bg-cz-dark-950 border border-cz-dark-800">
              {b}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-cz-dark-800/80 w-full flex items-center justify-center gap-1.5 text-slate-200 font-mono font-bold text-lg">
          <Zap className="w-4 h-4 text-cz-orange fill-cz-orange" />
          <span>{third.xp} XP</span>
        </div>
      </div>
    </div>
  );
};
