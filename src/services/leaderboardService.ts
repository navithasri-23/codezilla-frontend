import { MOCK_USERS } from '../data/mockUsers';
import { MOCK_BADGES } from '../data/mockBadges';
import { LeaderboardEntry, LeaderboardFilters } from '../types/leaderboard';
import { configService } from './configService';

export interface ILeaderboardService {
  getLeaderboard(filters: LeaderboardFilters): Promise<LeaderboardEntry[]>;
}

class LeaderboardService implements ILeaderboardService {
  async getLeaderboard(filters: LeaderboardFilters): Promise<LeaderboardEntry[]> {
    let users = [...MOCK_USERS];

    // Filter by year if specified
    if (filters.year !== 'All') {
      users = users.filter(u => u.year === filters.year);
    }

    // Filter by search query if present
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      users = users.filter(
        u =>
          u.fullName.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.leetcodeUsername.toLowerCase().includes(q)
      );
    }

    // Sort users according to the chosen window
    if (filters.window === 'all-time') {
      users.sort((a, b) => b.stats.lifetimeXp - a.stats.lifetimeXp);
    } else if (filters.window === 'previous-week') {
      // Deterministic mock previous week shift for realism
      users.sort((a, b) => {
        const prevA = (a.stats.weeklyXp * 1.2 + a.stats.lifetimeXp * 0.1) % 60;
        const prevB = (b.stats.weeklyXp * 1.2 + b.stats.lifetimeXp * 0.1) % 60;
        return prevB - prevA;
      });
    } else {
      // Current weekly competition (default)
      users.sort((a, b) => b.stats.weeklyXp - a.stats.weeklyXp);
    }

    // Map to public LeaderboardEntry (STRICT PRIVACY: DO NOT EXPOSE TOTAL PROBLEMS SOLVED)
    return users.map((user, index) => {
      const xp = filters.window === 'all-time' ? user.stats.lifetimeXp : user.stats.weeklyXp;
      const level = configService.getLevelInfo(user.stats.lifetimeXp);

      // Grab user's top 3 badges icons
      const featuredBadgeIcons = user.badgesEarned
        .slice(0, 3)
        .map(bId => MOCK_BADGES.find(b => b.id === bId)?.icon || '🏅');

      return {
        rank: index + 1,
        previousRank: index === 0 ? 1 : index === 1 ? 3 : index + 1,
        userId: user.id,
        fullName: user.fullName,
        username: user.username,
        avatar: user.avatar,
        year: user.year,
        xp,
        streak: user.stats.currentStreak,
        levelNumber: level.currentLevel.level,
        levelTitle: level.currentLevel.title,
        featuredBadges: featuredBadgeIcons,
      };
    });
  }
}

export const leaderboardService = new LeaderboardService();
