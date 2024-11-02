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
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { backgroundColor: '#3b364c' },
          '100%': { backgroundColor: '#5d3cba' },
        },
        'glow-border': {
          '0%': { 
            borderColor: '#3b364c',
            borderWidth: '0'
          },
          '100%': { 
            borderColor: '#7654d4',
            borderWidth: '1.5px'
          },
        },
        'scale-in-tr': {
          '0%': {
            transform: 'scale(0)',
            transformOrigin: '100% 0%',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1)',
            transformOrigin: '100% 0%',
            opacity: '1'
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'glow-fast': 'glow 0.8s infinite alternate',
        'glow-slow': 'glow 1.5s infinite alternate',
        'glow-border': 'glow-border 1s infinite alternate',
        'scale-in-tr': 'scale-in-tr 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-arrows': {
          '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0'
          },
          '-moz-appearance': 'textfield',
          'appearance': 'textfield'
        },
        '.chatbot-container': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none'
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
};
