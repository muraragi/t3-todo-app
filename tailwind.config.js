/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'Arial', 'sans-serif']
      }
    },
    fontSize: {
      base: ['18px', '28px']
    }
  },
  plugins: []
}
