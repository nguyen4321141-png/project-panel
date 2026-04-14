/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        nx: {
          bg:       '#090b10',
          surface:  '#0f1219',
          raised:   '#141824',
          border:   '#1c2133',
          muted:    '#232b3e',
          text:     '#cdd9f0',
          sub:      '#5c6b8a',
          sky:      '#38bdf8',
          'sky-dim':'rgba(56,189,248,0.12)',
          green:    '#34d399',
          amber:    '#fbbf24',
          red:      '#f87171',
          purple:   '#a78bfa',
        },
      },
      animation: {
        'fade-in':    'fadeIn 0.25s ease-out',
        'slide-in':   'slideIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
};
