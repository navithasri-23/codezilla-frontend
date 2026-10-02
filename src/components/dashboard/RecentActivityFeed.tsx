import React from 'react';
import { Submission } from '../../types/submission';
import { ShieldCheck, ExternalLink, CheckCircle2, Zap } from 'lucide-react';

interface RecentActivityFeedProps {
  submissions: Submission[];
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ submissions }) => {
  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-950/70 border-emerald-500/30';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/70 border-amber-500/30';
      case 'Hard':
        return 'text-rose-400 bg-rose-950/70 border-rose-500/30';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  const formatRelativeTime = (iso: string) => {
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between pb-3 border-b border-cz-dark-800/80 mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            VERIFIED LEETCODE ACTIVITY
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Live Solves</span>
      </div>

      <div className="divide-y divide-cz-dark-800/60">
        {submissions.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 font-mono">
            No verified submissions yet. Solve a problem to initiate your streak!
          </div>
        ) : (
          submissions.slice(0, 6).map((sub) => (
            <div
              key={sub.id}
              className="py-3 flex items-center justify-between gap-3 hover:bg-cz-dark-850/60 px-2 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-cz-dark-950 border border-cz-dark-800 flex items-center justify-center text-slate-400 group-hover:border-cz-orange/40 group-hover:text-cz-orange transition-colors shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-cz-orange transition-colors">
                      {sub.problemTitle}
                    </span>
                    <a
                      href={sub.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                      title="View problem on LeetCode"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-slate-400">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getDifficultyBadge(sub.difficulty)}`}>
                      {sub.difficulty}
                    </span>
                    <span>•</span>
                    <span>{sub.topic}</span>
                    <span>•</span>
                    <span className="text-slate-500">{formatRelativeTime(sub.verifiedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-cz-orange/10 border border-cz-orange/30 text-cz-orange text-xs font-mono font-bold">
                  <Zap className="w-3 h-3 fill-cz-orange" />
                  +{sub.xpEarned} XP
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
