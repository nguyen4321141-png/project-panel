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
          bg:       'var(--nx-bg)',
          surface:  'var(--nx-surface)',
          raised:   'var(--nx-raised)',
          border:   'var(--nx-border)',
          muted:    'var(--nx-muted)',
          text:     'var(--nx-text)',
          sub:      'var(--nx-sub)',
          sky:      'var(--nx-sky)',
          'sky-dim':'var(--nx-sky-dim)',
          green:    'var(--nx-green)',
          amber:    'var(--nx-amber)',
          red:      'var(--nx-red)',
          purple:   'var(--nx-purple)',
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
