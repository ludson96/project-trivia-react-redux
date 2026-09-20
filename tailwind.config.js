/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        trivia: {
          bg: '#1f1338',
          dark: '#160b2e',
          purple: '#3C1B7A',
          deep: '#230E4E',
          card: '#ffffff',
          green: '#2FC18C',
          red: '#EA5D5D',
          cyan: '#00D5E2',
          yellow: '#F9BA18',
          input: '#EBEBEB',
          muted: '#6B7588',
          border: '#E1E5EB'
        }
      },
      boxShadow: {
        'trivia': '0 8px 30px rgba(0, 0, 0, 0.25)',
        'glow-green': '0 0 15px rgba(47, 193, 140, 0.4)',
        'glow-red': '0 0 15px rgba(234, 93, 93, 0.4)'
      }
    },
  },
  plugins: [],
}
