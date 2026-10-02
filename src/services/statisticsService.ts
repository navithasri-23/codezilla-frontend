import { MOCK_USERS } from '../data/mockUsers';
import { CalendarData, ContributionDay, ContributionWeek, WeeklyRankHistory } from '../types/statistics';

export interface IStatisticsService {
  getContributionCalendar(userId: string, weeksCount?: number): Promise<CalendarData>;
  getUserRankHistory(userId: string): Promise<WeeklyRankHistory[]>;
}

class StatisticsService implements IStatisticsService {
  async getContributionCalendar(userId: string, weeksCount: number = 20): Promise<CalendarData> {
    const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];

    const weeks: ContributionWeek[] = [];
    const today = new Date();
    // Align to the end of the current week (e.g. Saturday)
    const currentDayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
    const daysSinceSunday = currentDayOfWeek;
    
    // We want `weeksCount` weeks
    const totalDays = weeksCount * 7;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (totalDays - (6 - daysSinceSunday)));

    let runningDate = new Date(startDate);
    let totalSolved = 0;
    let totalXp = 0;

    for (let w = 0; w < weeksCount; w++) {
      const days: ContributionDay[] = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = runningDate.toISOString().split('T')[0];
        const isFuture = runningDate > today;

        let count = 0;
        let xpEarned = 0;
        const problems: ContributionDay['problems'] = [];

        if (!isFuture) {
          // If within the user's current streak (last N days), guarantee solves
          const daysAgo = Math.floor((today.getTime() - runningDate.getTime()) / (1000 * 3600 * 24));
          if (daysAgo >= 0 && daysAgo < user.stats.currentStreak) {
            count = ((daysAgo + 3) % 4) + 1; // 1 to 4 solves
          } else {
            // Pseudo-random deterministic distribution based on date hash
            const hash = dateStr.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0) + user.id.charCodeAt(user.id.length - 1);
            if (hash % 3 === 0) {
              count = (hash % 4) + 1;
            } else if (hash % 5 === 0) {
              count = 1;
            } else {
              count = 0;
            }
          }

          if (count > 0) {
            for (let i = 0; i < count; i++) {
              const diff = i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard';
              const xp = diff === 'Easy' ? 2 : diff === 'Medium' ? 3 : 4;
              xpEarned += xp;
              problems.push({
                title: diff === 'Hard' ? 'Trapping Rain Water' : diff === 'Medium' ? 'Subarray Sum Equals K' : 'Two Sum',
                difficulty: diff,
                xp,
              });
            }
          }
        }

        totalSolved += count;
        totalXp += xpEarned;

        days.push({
          date: dateStr,
          count,
          xpEarned,
          problems,
        });

        runningDate.setDate(runningDate.getDate() + 1);
      }
      weeks.push({ days });
    }

    return {
      weeks,
      totalSolvedInPeriod: totalSolved,
      totalXpInPeriod: totalXp,
      currentStreak: user.stats.currentStreak,
      longestStreak: user.stats.longestStreak,
      startDate: startDate.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    };
  }

  async getUserRankHistory(userId: string): Promise<WeeklyRankHistory[]> {
    const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
    const currentRank = user.stats.weeklyRank;

    return [
      { weekNumber: 36, weekLabel: 'Week 36 (Aug)', rank: Math.min(10, currentRank + 3), xp: 28, solvedCount: 9 },
      { weekNumber: 37, weekLabel: 'Week 37 (Aug)', rank: Math.min(10, currentRank + 2), xp: 32, solvedCount: 11 },
      { weekNumber: 38, weekLabel: 'Week 38 (Sep)', rank: Math.max(1, currentRank - 1), xp: 42, solvedCount: 14 },
      { weekNumber: 39, weekLabel: 'Week 39 (Sep)', rank: Math.max(1, user.stats.bestWeeklyRank), xp: 48, solvedCount: 16 },
      { weekNumber: 40, weekLabel: 'Week 40 (Current)', rank: currentRank, xp: user.stats.weeklyXp, solvedCount: user.stats.weeklySolved },
    ];
  }
}

export const statisticsService = new StatisticsService();
