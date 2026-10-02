export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  xpEarned: number;
  problems: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    xp: number;
  }[];
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface CalendarData {
  weeks: ContributionWeek[];
  totalSolvedInPeriod: number;
  totalXpInPeriod: number;
  currentStreak: number;
  longestStreak: number;
  startDate: string;
  endDate: string;
}

export interface WeeklyRankHistory {
  weekNumber: number;
  weekLabel: string;
  rank: number;
  xp: number;
  solvedCount: number;
}
