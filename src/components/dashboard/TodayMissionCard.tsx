import React, { useState } from 'react';
import { DailyMission } from '../../types/challenge';
import { weeklyService } from '../../services/weeklyService';
import { useAuth } from '../../context/AuthContext';
import { Target, ExternalLink, CheckCircle, Clock, Zap, Sparkles } from 'lucide-react';
import { FoxMascot } from '../common/FoxMascot';

interface TodayMissionCardProps {
  mission: DailyMission;
  onMissionCompleted: () => void;
}

export const TodayMissionCard: React.FC<TodayMissionCardProps> = ({
  mission,
  onMissionCompleted,
}) => {
  const { currentUser, refreshUser, triggerCelebration } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [completed, setCompleted] = useState(mission.isCompleted);

  const handleSimulateSolve = async () => {
    if (!currentUser || completed) return;
    setIsVerifying(true);

    try {
      await weeklyService.completeMission(mission.id, currentUser.id);
      setCompleted(true);
      await refreshUser();
      triggerCelebration();
      onMissionCompleted();
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40';
      case 'Medium':
        return 'text-amber-400 bg-amber-950/80 border-amber-500/40';
      case 'Hard':
        return 'text-rose-400 bg-rose-950/80 border-rose-500/40';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cz-dark-900 via-cz-dark-850 to-cz-dark-900 border border-cz-orange/40 p-6 shadow-cz-orange">
      {/* Background cyber accent pattern */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 opacity-10 pointer-events-none">
        <FoxMascot mood="competitive" size="2xl" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cz-orange/10 border border-cz-orange/40 text-cz-orange">
            <Target className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-cz-orange font-bold">
              DAILY CODEZILLA BOUNTY
            </div>
            <h3 className="font-display font-bold text-lg text-slate-100">
              TODAY'S MISSION
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border flex items-center gap-1.5 ${
              completed
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50'
                : 'bg-cz-dark-950 text-slate-300 border-cz-dark-700'
            }`}
          >
            {completed ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>COMPLETED</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-cz-orange" />
                <span>ACTIVE</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Mission Content */}
      <div className="space-y-3 mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-200">
            Solve a <strong className="text-white">{mission.difficulty}</strong> problem
          </span>
          <span className={`text-xs px-2 py-0.5 rounded border font-mono font-medium ${getDifficultyBadge(mission.difficulty)}`}>
            {mission.difficulty}
          </span>
          <span className="text-xs px-2 py-0.5 rounded border border-cz-purple/40 bg-cz-purple/10 text-cz-purple-neon font-mono">
            Topic: {mission.topic}
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {mission.description}
        </p>

        {/* Recommended problem */}
        <div className="p-3 bg-cz-dark-950/80 rounded-xl border border-cz-dark-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">LeetCode #{mission.recommendedLeetCodeProblem.id}:</span>
            <span className="font-semibold text-slate-200">
              {mission.recommendedLeetCodeProblem.title}
            </span>
          </div>
          <a
            href={mission.recommendedLeetCodeProblem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-cz-orange hover:text-cz-orange-hover hover:underline"
          >
            <span>Solve</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-cz-dark-800/80">
        <div className="flex items-center gap-1.5 text-xs font-mono text-cz-gold font-bold">
          <Zap className="w-4 h-4 fill-cz-gold" />
          <span>Reward: +{mission.xpReward} XP</span>
        </div>

        <button
          onClick={handleSimulateSolve}
          disabled={completed || isVerifying}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 ${
            completed
              ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 cursor-default'
              : 'bg-cz-orange hover:bg-cz-orange-hover text-cz-dark-950 shadow-cz-orange active:scale-95'
          }`}
        >
          {completed ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Bounty Claimed</span>
            </>
          ) : isVerifying ? (
            <span>Verifying LeetCode solve...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Verify & Claim XP</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
