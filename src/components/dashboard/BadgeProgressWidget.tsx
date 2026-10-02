import React, { useEffect, useState } from 'react';
import { Badge, UserBadgeProgress } from '../../types/badge';
import { badgeService } from '../../services/badgeService';
import { Award, ArrowRight, Sparkles } from 'lucide-react';

interface BadgeProgressWidgetProps {
  userId: string;
  onViewAllBadges: () => void;
}

export const BadgeProgressWidget: React.FC<BadgeProgressWidgetProps> = ({
  userId,
  onViewAllBadges,
}) => {
  const [nextBadge, setNextBadge] = useState<Badge | null>(null);
  const [progress, setProgress] = useState<UserBadgeProgress | null>(null);

  useEffect(() => {
    badgeService.getUserBadges(userId).then(({ lockedBadges, progress: pMap }) => {
      if (lockedBadges.length > 0) {
        // Pick the first locked badge or one with some progress
        const inProgress = lockedBadges.find(b => (pMap[b.id]?.currentProgress || 0) > 0) || lockedBadges[0];
        setNextBadge(inProgress);
        setProgress(pMap[inProgress.id] || null);
      }
    });
  }, [userId]);

  if (!nextBadge || !progress) return null;

  const current = progress.currentProgress;
  const target = nextBadge.progressRequired;
  const percentage = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between pb-3 border-b border-cz-dark-800/80 mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-cz-gold" />
          <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
            NEXT BADGE QUEST
          </h3>
        </div>
        <button
          onClick={onViewAllBadges}
          className="text-xs font-mono text-cz-orange hover:text-cz-orange-hover flex items-center gap-1"
        >
          <span>All Badges</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-cz-dark-950 border border-cz-dark-750 flex items-center justify-center text-2xl shadow-sm shrink-0">
          {nextBadge.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-200 truncate">
              {nextBadge.name}
            </h4>
            <span className="text-[11px] font-mono text-cz-gold font-semibold">
              +{nextBadge.xpReward} XP
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
            {nextBadge.description}
          </p>

          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] font-mono mb-1 text-slate-400">
              <span>{nextBadge.requirementDescription}</span>
              <span>
                <strong className="text-slate-200">{current}</strong> / {target} ({percentage}%)
              </span>
            </div>
            <div className="w-full h-1.5 bg-cz-dark-950 rounded-full overflow-hidden border border-cz-dark-800">
              <div
                className="h-full bg-gradient-to-r from-cz-orange to-cz-gold rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
