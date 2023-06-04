/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        portage: {
          50: '#f6f4fe',
          100: '#eeebfc',
          200: '#e0d9fb',
          300: '#c8baf8',
          400: '#ad93f2',
          500: '#9e78ed',
          600: '#8247e0',
          700: '#7335cc',
          800: '#5f2cab',
          900: '#50268c',
        },
      },
    },
  },
  plugins: [],
};
