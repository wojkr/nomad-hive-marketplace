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
        dark: "#333544", //added in calendar!
        light: "#FFF9F3",
        accent: "#C25963",
        accent2: "#4078b5",
        accentDark: "#AE5430",
        white: "#FFF",
        neutral: "#767b98",
        neutralLight: "#b8c4c2",
        black: "#001e2b",
      },
    },
  },
  plugins: [],
};
