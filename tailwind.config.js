/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        'node-trigger': 'var(--color-node-trigger)',
        'node-reason': 'var(--color-node-reason)',
        'node-action': 'var(--color-node-action)',
        'node-review': 'var(--color-node-review)',
        'node-handoff': 'var(--color-node-handoff)',
      },
    },
  },
  plugins: [],
};
