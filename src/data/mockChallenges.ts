import { DailyMission, WeeklyChallenge } from '../types/challenge';

export const MOCK_DAILY_MISSION: DailyMission = {
  id: 'mission-today',
  title: "Today's Mission",
  description: 'Solve a Medium difficulty problem focusing on Arrays & Sliding Windows.',
  topic: 'Arrays',
  difficulty: 'Medium',
  xpReward: 3,
  bonusBadgeId: 'brain-mode',
  expiresAt: '2026-10-01T23:59:59Z',
  recommendedLeetCodeProblem: {
    id: 53,
    title: 'Maximum Subarray (Kadane)',
    slug: 'maximum-subarray',
    url: 'https://leetcode.com/problems/maximum-subarray/',
  },
  isCompleted: false,
};

export const MOCK_WEEKLY_CHALLENGE: WeeklyChallenge = {
  id: 'weekly-sprint-1',
  title: 'Weekly Sprint: Tree Climber Quest',
  description: 'Solve 3 Tree algorithmic problems this week to earn bonus XP and sprint progress.',
  topic: 'Trees',
  targetCount: 3,
  currentCount: 2,
  xpBonus: 10,
  badgeRewardId: 'tree-whisperer',
  endsAt: '2026-10-04T23:59:59Z',
  isCompleted: false,
};

export const AVAILABLE_TOPICS = [
  'Arrays',
  'Strings',
  'Linked Lists',
  'Stacks',
  'Queues',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Searching',
  'Sorting',
  'Hashing',
  'Recursion',
  'Greedy',
  'Math',
] as const;
