export type StudentYear = 'First Year' | 'Second Year' | 'Third Year';

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  icon: string;
  color: string;
}

export interface UserStatistics {
  lifetimeXp: number;
  weeklyXp: number;
  lifetimeSolved: number;
  weeklySolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  currentStreak: number;
  longestStreak: number;
  weeklyRank: number;
  bestWeeklyRank: number;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar: string;
  year: StudentYear;
  collegeRollNumber?: string;
  leetcodeUsername: string;
  isLeetcodeVerified: boolean;
  joinedDate: string;
  bio?: string;
  stats: UserStatistics;
  badgesEarned: string[]; // Badge IDs
}

export interface AuthResponse {
  user: User;
  token: string;
}
