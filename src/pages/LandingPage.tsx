import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { MascotShowcase } from '../components/landing/MascotShowcase';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { LeaderboardPodium } from '../components/leaderboard/LeaderboardPodium';
import { leaderboardService } from '../services/leaderboardService';
import { LeaderboardEntry } from '../types/leaderboard';
import { Trophy, ArrowRight, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
  onEnterArena: () => void;
  onExploreLeaderboard: () => void;
  onSelectUser: (userId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterArena,
  onExploreLeaderboard,
  onSelectUser,
}) => {
  const [topThree, setTopThree] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    leaderboardService
      .getLeaderboard({ year: 'All', window: 'this-week' })
      .then((data) => setTopThree(data.slice(0, 3)));
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSection
        onGetStarted={onEnterArena}
        onExploreLeaderboard={onExploreLeaderboard}
      />

      {/* Mascot Section */}
      <MascotShowcase />

      {/* How it Works */}
      <HowItWorksSection />

      {/* Live Weekly Podium Snippet */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-cz-gold mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>CURRENT WEEKLY PODIUM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-100">
            THIS WEEK'S TOP CONTENDERS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
            College students competing for the #1 Apex podium. Resets Sunday night!
          </p>
        </div>

        <LeaderboardPodium entries={topThree} onSelectUser={onSelectUser} />

        <div className="text-center mt-8">
          <button
            onClick={onExploreLeaderboard}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cz-dark-900 hover:bg-cz-dark-850 text-cz-orange border border-cz-orange/40 font-mono text-xs font-bold transition-all shadow-sm group"
          >
            <span>VIEW COMPLETE COLLEGE LEADERBOARD</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
