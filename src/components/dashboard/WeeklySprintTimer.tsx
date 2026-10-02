import React, { useState, useEffect } from 'react';
import { weeklyService } from '../../services/weeklyService';
import { Clock, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

export const WeeklySprintTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(weeklyService.getTimeRemainingUntilReset());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(weeklyService.getTimeRemainingUntilReset());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-cz-dark-900 border border-cz-dark-800 rounded-2xl p-5 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cz-orange" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider font-mono">
              WEEKLY SPRINT RESET COUNTDOWN
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Weekly XP resets at Sunday 23:59:59. <strong className="text-slate-300">Lifetime stats & badges are never lost.</strong>
          </p>
        </div>

        {/* Countdown Digits */}
        <div className="flex items-center gap-2 font-mono">
          <div className="bg-cz-dark-950 border border-cz-dark-750 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
            <div className="text-lg font-bold text-cz-orange">{timeLeft.days}</div>
            <div className="text-[10px] text-slate-500 uppercase">Days</div>
          </div>
          <span className="text-slate-600 font-bold">:</span>
          <div className="bg-cz-dark-950 border border-cz-dark-750 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
            <div className="text-lg font-bold text-slate-200">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-slate-500 uppercase">Hours</div>
          </div>
          <span className="text-slate-600 font-bold">:</span>
          <div className="bg-cz-dark-950 border border-cz-dark-750 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
            <div className="text-lg font-bold text-slate-200">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-slate-500 uppercase">Mins</div>
          </div>
          <span className="text-slate-600 font-bold">:</span>
          <div className="bg-cz-dark-950 border border-cz-dark-750 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
            <div className="text-lg font-bold text-cz-gold">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-slate-500 uppercase">Secs</div>
          </div>
        </div>
      </div>
    </div>
  );
};
