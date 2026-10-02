import React, { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { WeeklyRankHistory } from '../../types/statistics';
import { statisticsService } from '../../services/statisticsService';
import { TrendingUp, BarChart2, ShieldCheck, Flame, Zap, Award } from 'lucide-react';

interface ProfileStatsProps {
  user: User;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ user }) => {
  const [history, setHistory] = useState<WeeklyRankHistory[]>([]);

  useEffect(() => {
    statisticsService.getUserRankHistory(user.id).then(setHistory);
  }, [user.id]);

  // Topic mastery distribution
  const topics = [
    { name: 'Arrays & Two Pointers', solved: Math.round(user.stats.lifetimeSolved * 0.32), total: 25 },
    { name: 'Strings & Hash Maps', solved: Math.round(user.stats.lifetimeSolved * 0.24), total: 20 },
    { name: 'Trees & Binary Search', solved: Math.round(user.stats.lifetimeSolved * 0.18), total: 18 },
    { name: 'Dynamic Programming', solved: Math.round(user.stats.lifetimeSolved * 0.12), total: 15 },
    { name: 'Graphs & BFS/DFS', solved: Math.round(user.stats.lifetimeSolved * 0.09), total: 12 },
    { name: 'Stacks & Queues', solved: Math.round(user.stats.lifetimeSolved * 0.05), total: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Historical Weekly Rankings */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-cz-dark-800 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cz-orange" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              WEEKLY COMPETITION RANKING ARCHIVE
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Preserved Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-cz-dark-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 px-3">Sprint Cycle</th>
                <th className="pb-3 px-3 text-center">Rank</th>
                <th className="pb-3 px-3 text-center">Sprint XP</th>
                <th className="pb-3 px-3 text-center">Solved Problems</th>
                <th className="pb-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cz-dark-800/60">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-cz-dark-850/60 transition-colors">
                  <td className="py-3 px-3 text-slate-200 font-bold">{h.weekLabel}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded font-black ${
                        h.rank <= 3
                          ? 'bg-amber-400/20 text-cz-gold border border-amber-400/40'
                          : 'bg-cz-dark-950 text-slate-300'
                      }`}
                    >
                      #{h.rank}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center text-cz-orange font-bold">
                    +{h.xp} XP
                  </td>
                  <td className="py-3 px-3 text-center text-slate-300">
                    {h.solvedCount}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      Archived
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Algorithmic Topic Progress */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-cz-dark-800 mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-cz-purple-neon" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              ALGORITHMIC TOPIC MASTERY
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Core Curriculum</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.map((t, idx) => {
            const pct = Math.min(100, Math.round((t.solved / t.total) * 100));
            return (
              <div key={idx} className="bg-cz-dark-950 p-3.5 rounded-xl border border-cz-dark-800">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-slate-200">{t.name}</span>
                  <span className="text-slate-400">
                    <strong className="text-cz-orange">{t.solved}</strong> / {t.total} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-cz-dark-900 rounded-full overflow-hidden border border-cz-dark-800">
                  <div
                    className="h-full bg-gradient-to-r from-cz-orange to-cz-purple rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
