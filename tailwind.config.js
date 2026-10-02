/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cz: {
          orange: {
            DEFAULT: '#FF6B00',
            hover: '#FF7E1D',
            dark: '#D95200',
            glow: 'rgba(255, 107, 0, 0.25)',
            light: '#FFA666',
          },
          dark: {
            950: '#07090E',
            900: '#0C0F17',
            850: '#111622',
            800: '#171D2D',
            750: '#1D253A',
            700: '#26304B',
            600: '#38466B',
          },
          purple: {
            DEFAULT: '#6366F1',
            glow: 'rgba(99, 102, 241, 0.25)',
            deep: '#4338CA',
            neon: '#818CF8',
          },
          gold: {
            DEFAULT: '#F59E0B',
            bright: '#FBBF24',
            subtle: '#D97706',
          }
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'cz-orange': '0 0 25px -5px rgba(255, 107, 0, 0.3)',
        'cz-orange-lg': '0 0 40px -10px rgba(255, 107, 0, 0.45)',
        'cz-purple': '0 0 25px -5px rgba(99, 102, 241, 0.3)',
        'cz-gold': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
