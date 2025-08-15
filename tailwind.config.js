
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FADADD',
          mint: '#C7E9E4',
          lavender: '#E4D7FF',
          peach: '#FFD1B3',
          cream: '#FFF5E6',
        }
      },
      boxShadow: {
        card: "0 10px 25px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl2: "1rem",
      }
    },
  },
  plugins: [],
}
