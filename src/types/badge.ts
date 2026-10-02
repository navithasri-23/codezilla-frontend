export type BadgeCategory = 'milestone' | 'streak' | 'difficulty' | 'speed' | 'special';
export type BadgeRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  xpReward: number;
  requirementDescription: string;
  progressRequired: number; // e.g. 7 for 7-day streak, 10 for 10 problems
}

export interface UserBadgeProgress {
  badgeId: string;
  currentProgress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}
