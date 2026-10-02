import React, { useState, useEffect } from 'react';
import { CalendarData, ContributionDay } from '../../types/statistics';
import { statisticsService } from '../../services/statisticsService';
import { Flame, Trophy, Calendar, Sparkles } from 'lucide-react';

interface ContributionCalendarProps {
  userId: string;
  compact?: boolean;
}

export const ContributionCalendar: React.FC<ContributionCalendarProps> = ({
  userId,
  compact = false,
}) => {
  const [data, setData] = useState<CalendarData | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    day: ContributionDay;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    statisticsService.getContributionCalendar(userId, compact ? 12 : 20).then(setData);
  }, [userId, compact]);

  if (!data) {
    return (
      <div className="h-44 flex items-center justify-center text-slate-500 font-mono text-xs">
        Loading contribution telemetry...
      </div>
    );
  }

  // Get color for intensity according to Codezilla specs:
  // 0 contributions -> dark (#111622)
  // 1 -> low orange tint
  // 2 -> medium orange
  // 3 -> stronger orange
  // 4+ -> bright accent (#FF6B00)
  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-cz-dark-800/80 border-cz-dark-750/50 hover:border-slate-500';
    if (count === 1) return 'bg-[#5A2500] border-[#8A3700] hover:border-orange-400';
    if (count === 2) return 'bg-[#9E3E00] border-[#C44E00] hover:border-orange-300';
    if (count === 3) return 'bg-[#D95200] border-[#FF6B00] shadow-[0_0_8px_rgba(217,82,0,0.5)]';
    return 'bg-[#FF6B00] border-[#FFA15C] shadow-[0_0_12px_rgba(255,107,0,0.8)] animate-pulse-slow';
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card relative">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-cz-dark-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cz-orange" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              Contribution Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified LeetCode problem solving activity and consistency
          </p>
        </div>

        {/* Streak & Solved Counters */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cz-dark-950 border border-orange-500/30 text-amber-300">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>
              Current: <strong>{data.currentStreak} days</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cz-dark-950 border border-cz-purple/30 text-indigo-300">
            <Trophy className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              Best: <strong>{data.longestStreak} days</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          <div className="flex gap-1.5">
            {/* Weekday indicator labels */}
            <div className="flex flex-col gap-1.5 pr-2 text-[10px] font-mono text-slate-500 select-none pt-0.5">
              <span className="h-3 leading-3">M</span>
              <span className="h-3 leading-3 opacity-0">T</span>
              <span className="h-3 leading-3">W</span>
              <span className="h-3 leading-3 opacity-0">T</span>
              <span className="h-3 leading-3">F</span>
              <span className="h-3 leading-3 opacity-0">S</span>
              <span className="h-3 leading-3">S</span>
            </div>

            {/* Weeks columns */}
            {data.weeks.map((week, wIndex) => (
              <div key={wIndex} className="flex flex-col gap-1.5">
                {week.days.map((day) => {
                  return (
                    <div
                      key={day.date}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredDay({
                          day,
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-3.5 h-3.5 rounded-sm border transition-all duration-150 cursor-pointer ${getIntensityClass(
                        day.count
                      )}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Intensity Legend */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-cz-dark-800/60 text-[11px] font-mono text-slate-400">
            <div>
              <span className="text-slate-200 font-semibold">{data.totalSolvedInPeriod}</span> problems solved in past {compact ? '12' : '20'} weeks (
              <span className="text-cz-orange font-semibold">+{data.totalXpInPeriod} XP</span>)
            </div>

            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-cz-dark-800/80 border border-cz-dark-750/50" />
              <div className="w-3 h-3 rounded-sm bg-[#5A2500] border-[#8A3700]" />
              <div className="w-3 h-3 rounded-sm bg-[#9E3E00] border-[#C44E00]" />
              <div className="w-3 h-3 rounded-sm bg-[#D95200] border-[#FF6B00]" />
              <div className="w-3 h-3 rounded-sm bg-[#FF6B00] border-[#FFA15C] shadow-[0_0_6px_rgba(255,107,0,0.8)]" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-cz-dark-950 border border-cz-dark-700/90 rounded-xl p-3 shadow-2xl text-xs font-mono min-w-[210px] animate-in fade-in zoom-in-95 duration-100"
          style={{
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y - 8}px`,
          }}
        >
          <div className="flex items-center justify-between border-b border-cz-dark-800 pb-1.5 mb-2">
            <span className="text-slate-300 font-semibold">{hoveredDay.day.date}</span>
            <span className="text-cz-orange font-bold">
              {hoveredDay.day.count > 0 ? `+${hoveredDay.day.xpEarned} XP` : '0 XP'}
            </span>
          </div>

          {hoveredDay.day.count === 0 ? (
            <div className="text-slate-500 italic">No verified solves on this day</div>
          ) : (
            <div className="space-y-1.5">
              <div className="text-slate-200 font-bold">
                {hoveredDay.day.count} {hoveredDay.day.count === 1 ? 'problem' : 'problems'} verified:
              </div>
              {hoveredDay.day.problems.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px] gap-2">
                  <span className="text-slate-400 truncate max-w-[130px]">{p.title}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      p.difficulty === 'Easy'
                        ? 'text-emerald-400 bg-emerald-950/60'
                        : p.difficulty === 'Medium'
                        ? 'text-amber-400 bg-amber-950/60'
                        : 'text-rose-400 bg-rose-950/60'
                    }`}
                  >
                    {p.difficulty}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
