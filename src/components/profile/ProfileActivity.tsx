import React, { useState, useEffect } from 'react';
import { Submission, ProblemTopic } from '../../types/submission';
import { submissionService } from '../../services/submissionService';
import { ExternalLink, CheckCircle2, Zap, Clock, Cpu, Filter } from 'lucide-react';

interface ProfileActivityProps {
  userId: string;
}

export const ProfileActivity: React.FC<ProfileActivityProps> = ({ userId }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTopic, setFilterTopic] = useState<string>('All');

  useEffect(() => {
    setLoading(true);
    submissionService.getUserSubmissions(userId).then((data) => {
      setSubmissions(data);
      setLoading(false);
    });
  }, [userId]);

  const filtered = filterTopic === 'All'
    ? submissions
    : submissions.filter((s) => s.topic === filterTopic);

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

  const topics = ['All', ...Array.from(new Set(submissions.map((s) => s.topic)))];

  return (
    <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-cz-dark-800 gap-3">
        <div>
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            VERIFIED LEETCODE LOG
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            {submissions.length} verified solutions synced with Codezilla
          </p>
        </div>

        {/* Topic Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="bg-cz-dark-950 border border-cz-dark-750 text-xs font-mono text-slate-200 rounded-lg px-2.5 py-1.5 focus:border-cz-orange focus:outline-none"
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All Topics' : t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-slate-500">
          Syncing verified submissions...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-xs font-mono text-slate-500">
          No verified submissions found for this filter.
        </div>
      ) : (
        <div className="divide-y divide-cz-dark-800/60">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className="py-3.5 flex items-center justify-between gap-4 hover:bg-cz-dark-850/60 px-3 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-cz-dark-950 border border-cz-dark-750 flex items-center justify-center text-emerald-400 group-hover:border-cz-orange/40 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-100 group-hover:text-cz-orange transition-colors truncate">
                      {sub.leetcodeProblemId}. {sub.problemTitle}
                    </span>
                    <a
                      href={sub.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                      title="Open LeetCode problem"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 mt-1 text-[11px] font-mono text-slate-400 flex-wrap">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getDifficultyBadge(
                        sub.difficulty
                      )}`}
                    >
                      {sub.difficulty}
                    </span>
                    <span className="text-cz-purple-neon">#{sub.topic}</span>
                    {sub.executionTimeMs !== undefined && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3 h-3" /> {sub.executionTimeMs} ms
                      </span>
                    )}
                    {sub.memoryMb !== undefined && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <Cpu className="w-3 h-3" /> {sub.memoryMb} MB
                      </span>
                    )}
                    <span className="text-slate-500">
                      {new Date(sub.verifiedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cz-orange/10 border border-cz-orange/30 text-cz-orange text-xs font-mono font-bold">
                  <Zap className="w-3.5 h-3.5 fill-cz-orange" />
                  +{sub.xpEarned} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
