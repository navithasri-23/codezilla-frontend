import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { TodayMissionCard } from '../components/dashboard/TodayMissionCard';
import { WeeklySprintTimer } from '../components/dashboard/WeeklySprintTimer';
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed';
import { BadgeProgressWidget } from '../components/dashboard/BadgeProgressWidget';
import { ContributionCalendar } from '../components/calendar/ContributionCalendar';
import { LeaderboardPodium } from '../components/leaderboard/LeaderboardPodium';
import { leaderboardService } from '../services/leaderboardService';
import { submissionService } from '../services/submissionService';
import { weeklyService } from '../services/weeklyService';
import { Submission, ProblemDifficulty, ProblemTopic } from '../types/submission';
import { DailyMission } from '../types/challenge';
import { LeaderboardEntry } from '../types/leaderboard';
import { Sparkles, Trophy, PlusCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Modal } from '../components/common/Modal';

interface DashboardPageProps {
  onNavigateToLeaderboard: () => void;
  onNavigateToBadges: () => void;
  onSelectUser: (userId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateToLeaderboard,
  onNavigateToBadges,
  onSelectUser,
}) => {
  const { currentUser, refreshUser, triggerCelebration } = useAuth();
  const [mission, setMission] = useState<DailyMission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [podium, setPodium] = useState<LeaderboardEntry[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Quick submission simulator form state
  const [probTitle, setProbTitle] = useState('Binary Tree Right Side View');
  const [probDiff, setProbDiff] = useState<ProblemDifficulty>('Medium');
  const [probTopic, setProbTopic] = useState<ProblemTopic>('Trees');
  const [isSimulating, setIsSimulating] = useState(false);

  const loadDashboardData = async () => {
    if (!currentUser) return;
    const [m, subs, lead] = await Promise.all([
      weeklyService.getDailyMission(),
      submissionService.getUserSubmissions(currentUser.id),
      leaderboardService.getLeaderboard({ year: 'All', window: 'this-week' }),
    ]);
    setMission(m);
    setSubmissions(subs);
    setPodium(lead.slice(0, 3));
  };

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const handleSimulateCustomSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSimulating(true);

    try {
      await submissionService.verifySubmission({
        userId: currentUser.id,
        leetcodeProblemId: Math.floor(Math.random() * 500) + 1,
        problemTitle: probTitle,
        problemSlug: probTitle.toLowerCase().replace(/\s+/g, '-'),
        difficulty: probDiff,
        topic: probTopic,
      });

      await refreshUser();
      triggerCelebration();
      setIsSubmitModalOpen(false);
      loadDashboardData();
    } finally {
      setIsSimulating(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <WelcomeBanner user={currentUser} />

      {/* Quick Action Bar for Testing Verification */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-cz-dark-900 border border-cz-dark-800 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>
            Logged in as <strong className="text-white">{currentUser.fullName}</strong> ({currentUser.year})
          </span>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg bg-cz-dark-800 hover:bg-cz-dark-750 text-cz-orange border border-cz-orange/30 text-xs font-mono font-bold transition-all"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Simulate LeetCode Solve (+XP)</span>
        </button>
      </div>

      {/* Quick Stats Grid */}
      <DashboardStats stats={currentUser.stats} />

      {/* Today's Mission & Weekly Reset Timer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          {mission && (
            <TodayMissionCard
              mission={mission}
              onMissionCompleted={() => {
                loadDashboardData();
                refreshUser();
              }}
            />
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          <WeeklySprintTimer />
          <BadgeProgressWidget
            userId={currentUser.id}
            onViewAllBadges={onNavigateToBadges}
          />
        </div>
      </div>

      {/* Contribution Calendar Preview */}
      <div>
        <ContributionCalendar userId={currentUser.id} compact={false} />
      </div>

      {/* Verified Activity Feed & Leaderboard Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RecentActivityFeed submissions={submissions} />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-cz-dark-800 mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-cz-gold" />
                <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
                  WEEKLY APEX PODIUM
                </h3>
              </div>
              <button
                onClick={onNavigateToLeaderboard}
                className="text-xs font-mono text-cz-orange hover:text-cz-orange-hover flex items-center gap-1"
              >
                <span>Full Board</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {podium.map((entry) => (
                <div
                  key={entry.userId}
                  onClick={() => onSelectUser(entry.userId)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-cz-dark-950 hover:bg-cz-dark-850 border border-cz-dark-800 hover:border-cz-orange/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-black font-mono text-sm w-5 text-center ${
                        entry.rank === 1
                          ? 'text-cz-gold'
                          : entry.rank === 2
                          ? 'text-slate-300'
                          : 'text-amber-500'
                      }`}
                    >
                      #{entry.rank}
                    </span>
                    <img
                      src={entry.avatar}
                      alt={entry.fullName}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-cz-orange transition-colors">
                        {entry.fullName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {entry.year}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-cz-orange">
                    {entry.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Simulating LeetCode Solves */}
      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Simulate Verified LeetCode Solve"
        maxWidth="md"
      >
        <form onSubmit={handleSimulateCustomSolve} className="space-y-4">
          <p className="text-xs text-slate-400">
            In production, this verification happens automatically via the Codezilla LeetCode worker. Use this sandbox to test points and streaks.
          </p>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Problem Title
            </label>
            <input
              type="text"
              required
              value={probTitle}
              onChange={(e) => setProbTitle(e.target.value)}
              className="w-full bg-cz-dark-950 border border-cz-dark-750 focus:border-cz-orange rounded-xl px-3 py-2 text-xs text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Difficulty (XP)
              </label>
              <select
                value={probDiff}
                onChange={(e) => setProbDiff(e.target.value as ProblemDifficulty)}
                className="w-full bg-cz-dark-950 border border-cz-dark-750 text-xs font-mono text-slate-100 rounded-xl px-3 py-2"
              >
                <option value="Easy">Easy (+2 XP)</option>
                <option value="Medium">Medium (+3 XP)</option>
                <option value="Hard">Hard (+4 XP)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Topic
              </label>
              <select
                value={probTopic}
                onChange={(e) => setProbTopic(e.target.value as ProblemTopic)}
                className="w-full bg-cz-dark-950 border border-cz-dark-750 text-xs font-mono text-slate-100 rounded-xl px-3 py-2"
              >
                <option value="Arrays">Arrays</option>
                <option value="Strings">Strings</option>
                <option value="Trees">Trees</option>
                <option value="Dynamic Programming">Dynamic Programming</option>
                <option value="Graphs">Graphs</option>
                <option value="Linked Lists">Linked Lists</option>
                <option value="Stacks">Stacks</option>
                <option value="Queues">Queues</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSimulating}
            className="w-full py-2.5 bg-cz-orange hover:bg-cz-orange-hover text-cz-dark-950 font-bold font-mono text-xs rounded-xl shadow-cz-orange transition-all"
          >
            {isSimulating ? 'Verifying...' : 'Verify Solution & Gain XP 🦊'}
          </button>
        </form>
      </Modal>
    </div>
  );
};
