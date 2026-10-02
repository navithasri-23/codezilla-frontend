import { StudentYear } from './user';

export type LeaderboardTimeWindow = 'this-week' | 'previous-week' | 'all-time';

export interface LeaderboardEntry {
  rank: number;
  previousRank?: number;
  userId: string;
  fullName: string;
  username: string;
  avatar: string;
  year: StudentYear;
  xp: number;
  streak: number;
  levelNumber: number;
  levelTitle: string;
  featuredBadges: string[]; // Badge icon identifiers
  // NOTE: In compliance with Codezilla Privacy Rules, total problems solved is NOT on the public leaderboard.
}

export interface LeaderboardFilters {
  year: 'All' | StudentYear;
  window: LeaderboardTimeWindow;
  searchQuery?: string;
}
