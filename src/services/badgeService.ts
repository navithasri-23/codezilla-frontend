import { MOCK_BADGES } from '../data/mockBadges';
import { MOCK_USERS } from '../data/mockUsers';
import { Badge, UserBadgeProgress } from '../types/badge';

export interface IBadgeService {
  getAllBadges(): Promise<Badge[]>;
  getUserBadges(userId: string): Promise<{
    unlockedBadges: Badge[];
    lockedBadges: Badge[];
    progress: Record<string, UserBadgeProgress>;
  }>;
  createBadge(badge: Badge): Promise<Badge>;
}

class BadgeService implements IBadgeService {
  private badges: Badge[] = [...MOCK_BADGES];

  async getAllBadges(): Promise<Badge[]> {
    return [...this.badges];
  }

  async getUserBadges(userId: string): Promise<{
    unlockedBadges: Badge[];
    lockedBadges: Badge[];
    progress: Record<string, UserBadgeProgress>;
  }> {
    const user = MOCK_USERS.find(u => u.id === userId);
    const userEarnedSet = new Set(user?.badgesEarned || []);

    const unlockedBadges: Badge[] = [];
    const lockedBadges: Badge[] = [];
    const progress: Record<string, UserBadgeProgress> = {};

    this.badges.forEach(badge => {
      const isUnlocked = userEarnedSet.has(badge.id);
      let currentProgress = 0;

      if (user) {
        if (badge.id === 'fox-initiate') currentProgress = user.stats.lifetimeSolved >= 1 ? 1 : 0;
        else if (badge.id === 'quick-start') currentProgress = Math.min(3, user.stats.weeklySolved);
        else if (badge.id === 'on-fire') currentProgress = Math.min(7, user.stats.currentStreak);
        else if (badge.id === 'problem-crusher') currentProgress = Math.min(10, user.stats.lifetimeSolved);
        else if (badge.id === 'brain-mode') currentProgress = Math.min(5, user.stats.mediumSolved);
        else if (badge.id === 'hard-mode') currentProgress = Math.min(1, user.stats.hardSolved);
        else if (badge.id === 'consistency-beast') currentProgress = Math.min(14, user.stats.currentStreak);
        else if (badge.id === 'top-hunter') currentProgress = user.stats.weeklyRank <= 3 ? 1 : 0;
        else currentProgress = isUnlocked ? badge.progressRequired : 0;
      }

      progress[badge.id] = {
        badgeId: badge.id,
        currentProgress,
        isUnlocked,
      };

      if (isUnlocked) {
        unlockedBadges.push(badge);
      } else {
        lockedBadges.push(badge);
      }
    });

    return { unlockedBadges, lockedBadges, progress };
  }

  async createBadge(badge: Badge): Promise<Badge> {
    this.badges.push(badge);
    return badge;
  }
}

export const badgeService = new BadgeService();
