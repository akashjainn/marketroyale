module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { 
    extend: {
      colors: {
        'football-gold': '#f4c430',
        'football-green': '#0d4f3a',
        'endzone-blue': '#1e3a8a',
        'field-green': '#22c55e',
        'turf-dark': '#166534',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'field-goal': 'fieldGoal 2s ease-in-out infinite',
        'touchdown': 'touchdown 0.6s ease-in-out',
        'slide-in-field': 'slideInField 0.8s ease-out',
      },
    }
  },
  plugins: []
};
