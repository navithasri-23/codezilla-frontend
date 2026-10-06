import { LeaderboardEntry, LeaderboardFilters } from '../types/leaderboard';
import { configService } from './configService';

export interface ILeaderboardService {
  getLeaderboard(filters: LeaderboardFilters): Promise<LeaderboardEntry[]>;
}

class LeaderboardService implements ILeaderboardService {
  async getLeaderboard(filters: LeaderboardFilters): Promise<LeaderboardEntry[]> {
    try {
      // Fetch live data from your Node.js backend
      const response = await fetch('https://codezilla-backend.onrender.com/api/leaderboard');
      if (!response.ok) throw new Error('Failed to fetch from backend');
      
      let users = await response.json();

      // Filter by year if specified
      if (filters.year && filters.year !== 'All') {
        users = users.filter(u => u.year === filters.year);
      }

      // Filter by search query if present
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase().trim();
        users = users.filter(
          u =>
            u.fullName.toLowerCase().includes(q) ||
            u.username.toLowerCase().includes(q)
        );
      }

      // Sort users by XP descending (highest first)
      users.sort((a, b) => b.xp - a.xp);

      // Map to public LeaderboardEntry structure expected by frontend
      return users.map((user, index) => {
        const level = configService.getLevelInfo ? configService.getLevelInfo(user.xp) : { currentLevel: { level: user.levelNumber || 1, title: 'Coder' } };

        return {
          rank: index + 1,
          previousRank: index === 0 ? 1 : index === 1 ? 3 : index + 1,
          userId: user.userId,
          fullName: user.fullName,
          username: user.username,
          avatar: user.avatar || "https://assets.leetcode.com/users/default_avatar.jpg",
          year: user.year,
          xp: user.xp,
          streak: user.streak || 0,
          levelNumber: level.currentLevel?.level || 1,
          levelTitle: level.currentLevel?.title || 'Coder',
          featuredBadges: user.featuredBadges || ['🏅'],
        };
      });
    } catch (error) {
      console.error("Error fetching live leaderboard from backend:", error);
      return [];
    }
  }
}

export const leaderboardService = new LeaderboardService();