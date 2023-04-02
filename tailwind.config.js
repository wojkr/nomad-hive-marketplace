/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./page/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // mode: "jit",
  theme: {
    extend: {
      colors: {
        dark: "#4d5053",
        "light": "#fdead4",
        accent: "#c87958",
        accentDark: "#ae5430",
        white: "#fff",
        black: "#131313",
      },
    },
  },
  plugins: [],
};
