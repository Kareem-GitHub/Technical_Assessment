/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        primaryHover: '#535bf2',
        lightPrimaryHover: '#747bff',
        darkBg: '#242424',
        lightBg: '#ffffff',
        buttonDark: '#1a1a1a',
        buttonLight: '#f9f9f9',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      fontSize: {
        h1: ['3.2em', '1.1'],
      },
    },
  },
  plugins: [],
};
