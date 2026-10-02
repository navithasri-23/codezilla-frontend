import React from 'react';

export type FoxMood = 'competitive' | 'playful' | 'curious' | 'smart' | 'trophy' | 'badge';

interface FoxMascotProps {
  mood?: FoxMood;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  glow?: boolean;
}

const SIZE_MAP = {
  sm: 'w-7 h-7',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
  '2xl': 'w-36 h-36',
};

export const FoxMascot: React.FC<FoxMascotProps> = ({
  mood = 'smart',
  size = 'md',
  className = '',
  glow = false,
}) => {
  const sizeClasses = SIZE_MAP[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className} ${
        glow ? 'drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]' : ''
      }`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="foxBodyGrad" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#FFA15C" />
            <stop offset="45%" stopColor="#FF6B00" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>

          <linearGradient id="darkEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#26304B" />
            <stop offset="100%" stopColor="#0E121B" />
          </linearGradient>

          <linearGradient id="eyeGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>

          <linearGradient id="goldCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Outer subtle geometric aura */}
        <polygon
          points="50,4 94,26 94,74 50,96 6,74 6,26"
          stroke="#FF6B00"
          strokeWidth="1.2"
          strokeOpacity="0.2"
          fill="none"
        />

        {/* Left Ear */}
        <polygon points="18,12 40,40 16,46" fill="url(#foxBodyGrad)" />
        <polygon points="22,18 36,38 20,42" fill="url(#darkEarGrad)" />

        {/* Right Ear */}
        <polygon points="82,12 84,46 60,40" fill="url(#foxBodyGrad)" />
        <polygon points="78,18 80,42 64,38" fill="url(#darkEarGrad)" />

        {/* Head Main Shape */}
        <polygon
          points="50,84 14,46 28,28 50,40 72,28 86,46"
          fill="url(#foxBodyGrad)"
        />

        {/* Cheek Fur Panels - Sharp Angular Facets */}
        <polygon points="14,46 50,84 34,60" fill="#F8FAFC" />
        <polygon points="86,46 66,60 50,84" fill="#E2E8F0" />

        {/* Forehead Smart Diamond Accent */}
        <polygon points="50,38 43,48 50,58 57,48" fill="#FDE047" opacity="0.95" />

        {/* Eyes & Mood Expressions */}
        {mood === 'competitive' || mood === 'smart' ? (
          <>
            {/* Competitive Slanted Intellect Eyes */}
            <polygon points="31,48 44,52 35,55" fill="url(#eyeGlowGrad)" />
            <circle cx="37" cy="51" r="1.5" fill="#FFFFFF" />
            <polygon points="69,48 65,55 56,52" fill="url(#eyeGlowGrad)" />
            <circle cx="63" cy="51" r="1.5" fill="#FFFFFF" />
          </>
        ) : mood === 'playful' ? (
          <>
            {/* Playful Wink */}
            <path
              d="M30 52 Q37 46 44 52"
              stroke="#6366F1"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <polygon points="69,48 65,55 56,52" fill="url(#eyeGlowGrad)" />
            <circle cx="63" cy="51" r="1.5" fill="#FFFFFF" />
          </>
        ) : (
          <>
            {/* Wide Curious / Focused Eyes */}
            <polygon points="31,48 43,51 35,55" fill="url(#eyeGlowGrad)" />
            <circle cx="37" cy="51" r="1.5" fill="#FFFFFF" />
            <polygon points="69,48 65,55 57,51" fill="url(#eyeGlowGrad)" />
            <circle cx="63" cy="51" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* Sleek Nose Tip */}
        <polygon points="50,84 45,78 55,78" fill="#07090E" />

        {/* Smart Whiskers (Geometric Cyber-style) */}
        <line x1="20" y1="62" x2="6" y2="60" stroke="#FF6B00" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="22" y1="68" x2="10" y2="72" stroke="#FF6B00" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="80" y1="62" x2="94" y2="60" stroke="#FF6B00" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="78" y1="68" x2="90" y2="72" stroke="#FF6B00" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Trophy / Crown for Top Winners */}
        {mood === 'trophy' && (
          <g transform="translate(0, -6)">
            <polygon
              points="38,20 44,10 50,16 56,10 62,20"
              fill="url(#goldCrownGrad)"
              stroke="#B45309"
              strokeWidth="1"
            />
            <circle cx="50" cy="12" r="1.5" fill="#FEF08A" />
          </g>
        )}
      </svg>
    </div>
  );
};
