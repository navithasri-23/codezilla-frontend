import { MOCK_SUBMISSIONS } from '../data/mockSubmissions';
import { MOCK_USERS } from '../data/mockUsers';
import { ProblemDifficulty, ProblemTopic, Submission } from '../types/submission';
import { configService } from './configService';

export interface ISubmissionService {
  getUserSubmissions(userId: string): Promise<Submission[]>;
  getAllRecentSubmissions(limit?: number): Promise<Submission[]>;
  verifySubmission(data: {
    userId: string;
    leetcodeProblemId: number;
    problemTitle: string;
    problemSlug: string;
    difficulty: ProblemDifficulty;
    topic: ProblemTopic;
  }): Promise<{ submission: Submission; xpAwarded: number }>;
}

class SubmissionService implements ISubmissionService {
  private submissions: Submission[] = [...MOCK_SUBMISSIONS];

  async getUserSubmissions(userId: string): Promise<Submission[]> {
    return this.submissions
      .filter(s => s.userId === userId)
      .sort((a, b) => new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime());
  }

  async getAllRecentSubmissions(limit: number = 8): Promise<Submission[]> {
    return this.submissions
      .sort((a, b) => new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime())
      .slice(0, limit);
  }

  async verifySubmission(data: {
    userId: string;
    leetcodeProblemId: number;
    problemTitle: string;
    problemSlug: string;
    difficulty: ProblemDifficulty;
    topic: ProblemTopic;
  }): Promise<{ submission: Submission; xpAwarded: number }> {
    const xpAwarded = configService.getXpForDifficulty(data.difficulty);

    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      userId: data.userId,
      leetcodeProblemId: data.leetcodeProblemId,
      problemTitle: data.problemTitle,
      problemSlug: data.problemSlug,
      difficulty: data.difficulty,
      topic: data.topic,
      xpEarned: xpAwarded,
      verifiedAt: new Date().toISOString(),
      isVerified: true,
      leetcodeUrl: `https://leetcode.com/problems/${data.problemSlug}/`,
      executionTimeMs: Math.floor(Math.random() * 50) + 1,
      memoryMb: +(10 + Math.random() * 15).toFixed(1),
    };

    this.submissions.unshift(newSub);

    // Update user stats
    const user = MOCK_USERS.find(u => u.id === data.userId);
    if (user) {
      user.stats.lifetimeXp += xpAwarded;
      user.stats.weeklyXp += xpAwarded;
      user.stats.lifetimeSolved += 1;
      user.stats.weeklySolved += 1;
      if (data.difficulty === 'Easy') user.stats.easySolved += 1;
      if (data.difficulty === 'Medium') user.stats.mediumSolved += 1;
      if (data.difficulty === 'Hard') user.stats.hardSolved += 1;

      // Unlock badges if criteria met
      if (!user.badgesEarned.includes('fox-initiate')) {
        user.badgesEarned.push('fox-initiate');
      }
      if (data.difficulty === 'Hard' && !user.badgesEarned.includes('hard-mode')) {
        user.badgesEarned.push('hard-mode');
      }
      if (user.stats.mediumSolved >= 5 && !user.badgesEarned.includes('brain-mode')) {
        user.badgesEarned.push('brain-mode');
      }
      if (user.stats.lifetimeSolved >= 10 && !user.badgesEarned.includes('problem-crusher')) {
        user.badgesEarned.push('problem-crusher');
      }
    }

    return { submission: newSub, xpAwarded };
  }
}

export const submissionService = new SubmissionService();
