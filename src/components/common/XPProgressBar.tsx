import React from 'react';
import { configService } from '../../services/configService';

interface XPProgressBarProps {
  xp: number;
  showLabels?: boolean;
  className?: string;
}

export const XPProgressBar: React.FC<XPProgressBarProps> = ({
  xp,
  showLabels = true,
  className = '',
}) => {
  const levelData = configService.getLevelInfo(xp);

  return (
    <div className={`w-full ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-cz-orange font-bold">
              Level {levelData.currentLevel.level}: {levelData.currentLevel.title}
            </span>
          </div>
          <div className="text-slate-400">
            {levelData.nextLevel ? (
              <span>
                <strong className="text-white font-semibold">{levelData.currentLevelXp}</strong> / {levelData.neededLevelXp} XP{' '}
                <span className="text-cz-orange/80">({levelData.progressPercentage}%)</span>
              </span>
            ) : (
              <span className="text-cz-gold font-bold">MAX LEVEL REACHED</span>
            )}
          </div>
        </div>
      )}

      {/* Progress Track */}
      <div className="relative w-full h-2.5 bg-cz-dark-800 rounded-full overflow-hidden border border-cz-dark-700/60 p-[1px]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out relative"
          style={{
            width: `${levelData.progressPercentage}%`,
            background: 'linear-gradient(90deg, #FF6B00 0%, #FF8533 70%, #FBBF24 100%)',
            boxShadow: '0 0 12px rgba(255, 107, 0, 0.6)',
          }}
        >
          {/* Subtle shimmer scan line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full animate-pulse-slow" />
        </div>
      </div>

      {showLabels && levelData.nextLevel && (
        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-mono">
          <span>{levelData.currentLevel.minXp} XP</span>
          <span className="text-slate-400">
            Next: <span className="text-slate-200">{levelData.nextLevel.title}</span> ({levelData.nextLevel.minXp - xp} XP to go)
          </span>
          <span>{levelData.nextLevel.minXp} XP</span>
        </div>
      )}
    </div>
  );
};
