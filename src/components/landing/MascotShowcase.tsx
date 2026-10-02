import React, { useState } from 'react';
import { FoxMascot, FoxMood } from '../common/FoxMascot';
import { Sparkles, Brain, Zap, Trophy, HelpCircle, Flame } from 'lucide-react';

export const MascotShowcase: React.FC = () => {
  const [selectedTrait, setSelectedTrait] = useState<'smart' | 'fast' | 'competitive' | 'curious' | 'mischievous'>('competitive');

  const traits = [
    {
      id: 'smart' as const,
      mood: 'smart' as FoxMood,
      label: 'Smart',
      icon: <Brain className="w-4 h-4" />,
      tagline: 'Algorithmic Intuition',
      description: 'Breaks complex subproblems down with sharp mathematical clarity and clean space complexity.',
      quote: '"Why brute force in O(N²) when a clever two-pointer scans in O(N)?"',
    },
    {
      id: 'fast' as const,
      mood: 'smart' as FoxMood,
      label: 'Fast',
      icon: <Zap className="w-4 h-4" />,
      tagline: 'Optimal Execution',
      description: 'Finds optimal asymptotic bounds quickly, blazing past time-limit exceeded edge cases.',
      quote: '"Zero allocations, zero hesitation. Runtime: beats 99.4% of submissions."',
    },
    {
      id: 'competitive' as const,
      mood: 'competitive' as FoxMood,
      label: 'Competitive',
      icon: <Trophy className="w-4 h-4" />,
      tagline: 'Podium Hunger',
      description: 'Thrives on the thrill of the weekly college leaderboard sprint and refuses to lose a streak.',
      quote: '"A 7-day streak is good. A podium crown in the 3rd Year bracket is legendary."',
    },
    {
      id: 'curious' as const,
      mood: 'curious' as FoxMood,
      label: 'Curious',
      icon: <HelpCircle className="w-4 h-4" />,
      tagline: 'Hard Problem Hunter',
      description: 'Never backs down from Hard Dynamic Programming or Graph problems. Every bug is a riddle.',
      quote: '"Segment trees, monotonic queues, bitmask DP... show me the hardest one you have."',
    },
    {
      id: 'mischievous' as const,
      mood: 'playful' as FoxMood,
      label: 'Mischievous',
      icon: <Flame className="w-4 h-4" />,
      tagline: 'Edge Case Specialist',
      description: 'Loves spotting the tricky edge cases nobody else tested for: empty inputs, integer overflow, cycle loops.',
      quote: '"Did you remember negative numbers and empty arrays? Hehe, I caught that one."',
    },
  ];

  const current = traits.find((t) => t.id === selectedTrait) || traits[0];

  return (
    <section className="py-16 bg-cz-dark-900/60 border-y border-cz-dark-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cz-orange/10 border border-cz-orange/30 text-xs font-mono text-cz-orange mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLUB EMBLEM & MASCOT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-slate-100">
            MEET THE CODEZILLA FOX
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
            Intelligent. Competitive. Playful. Never childish. The clever fox embodies the spirit of our algorithmic journey.
          </p>
        </div>

        {/* Interactive Personality Showcase */}
        <div className="max-w-4xl mx-auto bg-cz-dark-950 border border-cz-dark-750 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center gap-8">
          {/* Mascot Centerpiece */}
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-cz-dark-900 to-cz-dark-950 rounded-2xl border border-cz-dark-800 w-full md:w-64 shrink-0 shadow-cz-orange">
            <FoxMascot mood={current.mood} size="2xl" glow />
            <span className="mt-4 text-xs font-mono font-bold tracking-widest text-cz-orange uppercase">
              {current.label} FOX
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Codezilla Spirit</span>
          </div>

          {/* Traits Selector & Description */}
          <div className="flex-1 space-y-5">
            {/* Trait Tabs */}
            <div className="flex flex-wrap gap-2">
              {traits.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrait(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedTrait === t.id
                      ? 'bg-cz-orange text-cz-dark-950 shadow-cz-orange'
                      : 'bg-cz-dark-900 text-slate-300 border border-cz-dark-800 hover:border-slate-600'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Trait Details */}
            <div className="p-4 rounded-2xl bg-cz-dark-900 border border-cz-dark-800">
              <div className="text-xs font-mono font-bold text-cz-gold uppercase tracking-wider">
                {current.tagline}
              </div>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                {current.description}
              </p>
              <div className="mt-3 pt-3 border-t border-cz-dark-800 text-xs italic font-mono text-cz-orange">
                {current.quote}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
