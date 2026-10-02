import { ProblemDifficulty, ProblemTopic } from './submission';

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  topic: ProblemTopic;
  difficulty: ProblemDifficulty;
  xpReward: number;
  bonusBadgeId?: string;
  expiresAt: string; // ISO date
  recommendedLeetCodeProblem: {
    id: number;
    title: string;
    slug: string;
    url: string;
  };
  isCompleted: boolean;
  completedAt?: string;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  topic: ProblemTopic;
  targetCount: number;
  currentCount: number;
  xpBonus: number;
  badgeRewardId?: string;
  endsAt: string;
  isCompleted: boolean;
}
