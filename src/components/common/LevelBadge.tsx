import React from 'react';
import { LEVEL_TIERS } from '../../services/configService';

interface LevelBadgeProps {
  levelNumber: number;
  showTitle?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  levelNumber,
  showTitle = true,
  size = 'md',
  className = '',
}) => {
  const levelInfo = LEVEL_TIERS.find(l => l.level === levelNumber) || LEVEL_TIERS[0];

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md font-mono border backdrop-blur-sm transition-all duration-200 ${sizeStyles[size]} ${className}`}
      style={{
        backgroundColor: 'rgba(23, 29, 45, 0.85)',
        borderColor: `${levelInfo.color}40`,
        color: '#F1F5F9',
        boxShadow: `0 0 12px ${levelInfo.color}20`,
      }}
    >
      <span className="text-base leading-none">{levelInfo.icon}</span>
      <span
        className="font-bold tracking-wider"
        style={{ color: levelInfo.color }}
      >
        LV.{levelInfo.level}
      </span>
      {showTitle && (
        <span className="text-slate-300 font-sans font-medium hidden sm:inline">
          {levelInfo.title}
        </span>
      )}
    </span>
  );
};
