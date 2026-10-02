import React from 'react';
import { FoxMascot } from '../common/FoxMascot';
import { ArrowRight, Flame, Trophy, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreLeaderboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onExploreLeaderboard,
}) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial-gradient blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cz-dark-900 border border-cz-orange/40 text-xs font-mono text-cz-orange mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-cz-orange animate-ping" />
            <span className="font-bold">SEASON 2026 LIVE</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Weekly LeetCode Sprint in Progress</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-slate-100 leading-tight">
            CONQUER LEETCODE.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cz-orange via-cz-orange-light to-cz-gold">
              BECOME CODEZILLA.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The competitive gamified coding club for college students. Solve problems on LeetCode, earn verified XP, maintain fire streaks, and climb the weekly cohort leaderboards.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cz-orange hover:bg-cz-orange-hover text-cz-dark-950 font-bold font-mono text-sm tracking-wide shadow-cz-orange-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>ENTER THE ARENA</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreLeaderboard}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-cz-dark-900 hover:bg-cz-dark-850 text-slate-200 border border-cz-dark-750 font-semibold font-mono text-sm transition-all duration-200 hover:border-cz-purple/50 flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4 text-cz-gold" />
              <span>VIEW WEEKLY LEADERBOARD</span>
            </button>
          </div>

          {/* Key Quick Metrics */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-cz-dark-900/90 border border-cz-dark-800 rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>VERIFICATION</span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">LeetCode API</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Real Accepted Solves</div>
            </div>

            <div className="bg-cz-dark-900/90 border border-cz-dark-800 rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                <Zap className="w-3.5 h-3.5 text-cz-orange" />
                <span>POINT ENGINE</span>
              </div>
              <div className="text-xl font-bold font-mono text-cz-orange">2 / 3 / 4 XP</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Easy • Medium • Hard</div>
            </div>

            <div className="bg-cz-dark-900/90 border border-cz-dark-800 rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                <Trophy className="w-3.5 h-3.5 text-cz-gold" />
                <span>SPRINT CYCLE</span>
              </div>
              <div className="text-xl font-bold font-mono text-cz-gold">7-Day Reset</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Lifetime Preserved</div>
            </div>

            <div className="bg-cz-dark-900/90 border border-cz-dark-800 rounded-2xl p-4 shadow-card">
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>COHORTS</span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-100">1st • 2nd • 3rd</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Year-Based Brackets</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
