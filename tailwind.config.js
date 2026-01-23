/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'financial': {
          '50': '#f5f7fa',
          '100': '#e4e7eb',
          '200': '#cbd2d9',
          '300': '#9aa5b1',
          '400': '#7b8794',
          '500': '#616e7c',
          '600': '#52606d',
          '700': '#3e4c59',
          '800': '#323f4b',
          '900': '#1f2933',
        },
        'accent': {
          'primary': '#0052cc',
          'secondary': '#00a3bf',
        }
      },
      fontFamily: {
        'cheque': ['"Courier New"', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
