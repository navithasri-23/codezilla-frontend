import React, { useEffect, useState } from 'react';
import { Badge, UserBadgeProgress } from '../../types/badge';
import { badgeService } from '../../services/badgeService';
import { Award, Lock, CheckCircle2, Sparkles, Filter } from 'lucide-react';

interface ProfileBadgesProps {
  userId: string;
}

export const ProfileBadges: React.FC<ProfileBadgesProps> = ({ userId }) => {
  const [unlocked, setUnlocked] = useState<Badge[]>([]);
  const [locked, setLocked] = useState<Badge[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, UserBadgeProgress>>({});
  const [filterRarity, setFilterRarity] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    badgeService.getUserBadges(userId).then((res) => {
      setUnlocked(res.unlockedBadges);
      setLocked(res.lockedBadges);
      setProgressMap(res.progress);
      setLoading(false);
    });
  }, [userId]);

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'text-slate-300 border-slate-700 bg-slate-800/40';
      case 'Rare':
        return 'text-blue-400 border-blue-500/30 bg-blue-950/40';
      case 'Epic':
        return 'text-purple-400 border-purple-500/30 bg-purple-950/40';
      case 'Legendary':
        return 'text-amber-400 border-amber-500/40 bg-amber-950/40 shadow-[0_0_8px_rgba(245,158,11,0.2)]';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800/40';
    }
  };

  const allBadges = [...unlocked, ...locked];
  const filteredBadges = filterRarity === 'All'
    ? allBadges
    : allBadges.filter((b) => b.rarity === filterRarity);

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cz-gold" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              CODEZILLA TROPHY CASE
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">
            {unlocked.length} of {allBadges.length} achievements unlocked ({Math.round((unlocked.length / Math.max(1, allBadges.length)) * 100)}%)
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-cz-dark-950 rounded-xl border border-cz-dark-800 text-xs font-mono">
          {['All', 'Common', 'Rare', 'Epic', 'Legendary'].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRarity(r)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                filterRarity === r
                  ? 'bg-cz-dark-800 text-cz-orange font-bold border border-cz-orange/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => {
          const isUnlocked = unlocked.some((b) => b.id === badge.id);
          const prog = progressMap[badge.id];
          const current = prog ? prog.currentProgress : 0;
          const target = badge.progressRequired;
          const pct = Math.min(100, Math.round((current / target) * 100));

          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden ${
                isUnlocked
                  ? 'bg-gradient-to-br from-cz-dark-900 via-cz-dark-850 to-cz-dark-900 border-cz-dark-750 hover:border-cz-orange/60 shadow-card'
                  : 'bg-cz-dark-950/70 border-cz-dark-850 opacity-75 hover:opacity-100'
              }`}
            >
              {/* Unlocked / Locked Icon Status */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${
                    isUnlocked
                      ? 'bg-cz-dark-950 border-cz-orange/40 shadow-[0_0_15px_rgba(255,107,0,0.25)]'
                      : 'bg-cz-dark-950/90 border-cz-dark-800 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="flex flex-col items-end gap-1 font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getRarityBadge(
                      badge.rarity
                    )}`}
                  >
                    {badge.rarity}
                  </span>
                  <span className="text-[10px] text-cz-gold font-bold">
                    +{badge.xpReward} XP
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-100">{badge.name}</h4>
                  {isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              {/* Requirement / Progress */}
              <div className="pt-3 border-t border-cz-dark-800/80 text-[11px] font-mono">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="truncate max-w-[170px]">
                    {badge.requirementDescription}
                  </span>
                  <span>
                    {isUnlocked ? (
                      <span className="text-emerald-400 font-bold">UNLOCKED</span>
                    ) : (
                      <span>
                        {current}/{target}
                      </span>
                    )}
                  </span>
                </div>

                {!isUnlocked && (
                  <div className="w-full h-1.5 bg-cz-dark-950 rounded-full overflow-hidden border border-cz-dark-800 mt-1">
                    <div
                      className="h-full bg-gradient-to-r from-cz-orange to-cz-gold rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
