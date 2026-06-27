/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fafaf8',
        ink: '#1a1a1a',
        muted: '#6b7280',
        subtle: '#9ca3af',
        border: '#e5e7eb',
        accent: '#2563eb',
        'accent-hover': '#1d4ed8',
      },
      fontFamily: {
        serif: ['Georgia', 'ui-serif', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
