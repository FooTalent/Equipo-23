/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: {
          main: "#2B2738",
          light: "#3B364C",
        },
        secondary: {
          main: "#5D3CBA",
        },
        text: {
          light: "#7C798A",
        },
        accent: "#E5E504",
      },
    },
  },
  plugins: [],
};