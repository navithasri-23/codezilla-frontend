import { MOCK_DAILY_MISSION, MOCK_WEEKLY_CHALLENGE } from '../data/mockChallenges';
import { DailyMission, WeeklyChallenge } from '../types/challenge';
import { MOCK_USERS } from '../data/mockUsers';

export interface IWeeklyService {
  getDailyMission(): Promise<DailyMission>;
  getWeeklyChallenge(): Promise<WeeklyChallenge>;
  completeMission(missionId: string, userId: string): Promise<{ mission: DailyMission; xpAwarded: number }>;
  getTimeRemainingUntilReset(): { days: number; hours: number; minutes: number; seconds: number };
  simulateWeeklyReset(): Promise<void>;
}

class WeeklyService implements IWeeklyService {
  private dailyMission: DailyMission = { ...MOCK_DAILY_MISSION };
  private weeklyChallenge: WeeklyChallenge = { ...MOCK_WEEKLY_CHALLENGE };

  async getDailyMission(): Promise<DailyMission> {
    return { ...this.dailyMission };
  }

  async getWeeklyChallenge(): Promise<WeeklyChallenge> {
    return { ...this.weeklyChallenge };
  }

  async completeMission(missionId: string, userId: string): Promise<{ mission: DailyMission; xpAwarded: number }> {
    this.dailyMission.isCompleted = true;
    this.dailyMission.completedAt = new Date().toISOString();

    const xpAwarded = this.dailyMission.xpReward;
    const user = MOCK_USERS.find(u => u.id === userId);
    if (user) {
      user.stats.lifetimeXp += xpAwarded;
      user.stats.weeklyXp += xpAwarded;
      user.stats.lifetimeSolved += 1;
      user.stats.weeklySolved += 1;
      if (this.dailyMission.difficulty === 'Medium') user.stats.mediumSolved += 1;
      if (this.dailyMission.difficulty === 'Hard') user.stats.hardSolved += 1;
      if (this.dailyMission.difficulty === 'Easy') user.stats.easySolved += 1;
    }

    return {
      mission: { ...this.dailyMission },
      xpAwarded,
    };
  }

  getTimeRemainingUntilReset(): { days: number; hours: number; minutes: number; seconds: number } {
    // Current week ends on Sunday 23:59:59
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

    const resetDate = new Date(now);
    resetDate.setDate(now.getDate() + daysUntilSunday);
    resetDate.setHours(23, 59, 59, 999);

    const diffMs = Math.max(0, resetDate.getTime() - now.getTime());
    const totalSecs = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSecs / (3600 * 24));
    const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    return { days, hours, minutes, seconds };
  }

  async simulateWeeklyReset(): Promise<void> {
    // Historical statistics are PRESERVED!
    // Only weekly counters reset:
    MOCK_USERS.forEach(u => {
      u.stats.weeklyXp = 0;
      u.stats.weeklySolved = 0;
    });
    this.dailyMission.isCompleted = false;
    this.weeklyChallenge.currentCount = 0;
    this.weeklyChallenge.isCompleted = false;
  }
}

export const weeklyService = new WeeklyService();
