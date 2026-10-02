import React from 'react';
import { Code2, ShieldCheck, Zap, Trophy, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Solve on LeetCode',
      description: 'Practice directly on LeetCode. Tackle your favorite topics: Arrays, Binary Trees, Dynamic Programming, and more.',
      icon: <Code2 className="w-5 h-5 text-cz-orange" />,
    },
    {
      step: '02',
      title: 'Verified Telemetry',
      description: 'Codezilla verifies your accepted solution timestamps, runtime stats, and ensures authentic student achievements.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      step: '03',
      title: 'Gain XP & Badges',
      description: 'Collect 2 XP for Easy, 3 XP for Medium, and 4 XP for Hard problems. Unlock prestigious Codezilla fox badges and levels.',
      icon: <Zap className="w-5 h-5 text-cz-gold" />,
    },
    {
      step: '04',
      title: 'Climb Weekly Podiums',
      description: 'Weekly competitions keep the arena fresh and competitive. Reset weekly XP every Sunday night while preserving lifetime records.',
      icon: <Trophy className="w-5 h-5 text-cz-purple-neon" />,
    },
  ];

  return (
    <section className="py-20 bg-cz-dark-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cz-purple/10 border border-cz-purple/30 text-xs font-mono text-cz-purple-neon mb-3">
            <span>THE CODEZILLA PROTOCOL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-slate-100">
            HOW CODEZILLA WORKS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
            Bridging external LeetCode practice with a thrilling, college-wide competitive game loop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-cz-dark-900 border border-cz-dark-800 hover:border-cz-orange/40 rounded-2xl p-6 transition-all duration-300 relative group shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cz-dark-950 border border-cz-dark-750 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-2xl font-black font-mono text-cz-dark-700 group-hover:text-cz-orange transition-colors">
                    {s.step}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-100 mb-2 font-sans">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-cz-dark-800/80 flex items-center text-[11px] font-mono text-cz-orange font-bold">
                <span>Phase {s.step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
