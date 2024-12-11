/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkCyan: "hsl(158, 36%, 37%)",
        cream: "hsl(30, 38%, 92%)",
        veryDarkBlue: "hsl(212, 21%, 14%)",
        darkGrayisBlue: "hsl(228, 12%, 48%)",
        white: "hsl(0, 0%, 100%)",
      },
      letterSpacing: {
        'extra-widest': '0.3em',
      },
    },
  },
  plugins: [],
}