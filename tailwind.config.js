/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.liquid',
    './assets/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '908px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        squada: ['"Squada One"', 'sans-serif'],
        fraunces: ['"Fraunces"', 'serif'],
      },
      colors: {
      moss: '#6F9570',
    },
    },
  },
  plugins: [],
}
