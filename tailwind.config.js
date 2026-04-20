/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        sand: { DEFAULT: '#E8B86D', light: '#FDF3E3', dark: '#C4955A' },
        accent: { DEFAULT: '#D4520D', light: '#FEF0E7' },
        cat:    { DEFAULT: '#2D2926' },
      },
    },
  },
  plugins: [],
};