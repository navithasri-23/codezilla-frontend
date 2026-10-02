export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export type ProblemTopic =
  | 'Arrays'
  | 'Strings'
  | 'Linked Lists'
  | 'Stacks'
  | 'Queues'
  | 'Trees'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Searching'
  | 'Sorting'
  | 'Hashing'
  | 'Recursion'
  | 'Greedy'
  | 'Math';

export interface Submission {
  id: string;
  userId: string;
  leetcodeProblemId: number;
  problemTitle: string;
  problemSlug: string;
  difficulty: ProblemDifficulty;
  topic: ProblemTopic;
  xpEarned: number;
  verifiedAt: string; // ISO string
  isVerified: boolean;
  leetcodeUrl: string;
  executionTimeMs?: number;
  memoryMb?: number;
}
