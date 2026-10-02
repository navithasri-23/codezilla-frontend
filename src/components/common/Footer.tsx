import React from 'react';
import { FoxMascot } from './FoxMascot';
import { ShieldCheck, Heart, Terminal, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cz-dark-800 bg-cz-dark-950 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <FoxMascot mood="competitive" size="sm" />
              <span className="font-display font-black text-xl text-slate-100 tracking-wider">
                CODEZILLA
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The premier gamified LeetCode coding club for college students. Transforming algorithmic practice into an electrifying competitive sport.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Public Privacy Rule: Solved problem counts are strictly private.</span>
            </div>
          </div>

          {/* Scoring Engine */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs">
              POINT ENGINE
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>Easy Problem</span>
                <span className="text-emerald-400 font-bold">+2 XP</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Medium Problem</span>
                <span className="text-amber-400 font-bold">+3 XP</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Hard Problem</span>
                <span className="text-rose-400 font-bold">+4 XP</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Daily Bounty</span>
                <span className="text-cz-gold font-bold">+2 XP</span>
              </li>
            </ul>
          </div>

          {/* Student Cohorts */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-xs">
              COHORTS
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>First Year Division</li>
              <li>Second Year Division</li>
              <li>Third Year Division</li>
              <li>All-College Apex Arena</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cz-dark-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CODEZILLA Coding Club. Powered by LeetCode external activity telemetry.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with focus for ambitious college coders 🦊</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
