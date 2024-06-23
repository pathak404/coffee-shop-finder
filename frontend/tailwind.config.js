/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        'black': '#000506',
        'lagoon-blue': '#003B40',
        'white': '#FFFFFF',
        'sea-form-1': '#EDF0EF',
        'sea-form-2': '#A4ADAE',
        'disabled': '#B7C1C2',
        'mint': '#E8F2F1',
        'gold': '#FDCB6E',
        'salmon': '#F6AF9E',
      }
    },
  },
  plugins: [],
}

