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
        dark: "#333544",
        light: "#FFF4EA",
        accent: "#C25963",
        accent2: "#4078b5",
        accentDark: "#AE5430",
        white: "#FFF",
        neutral: "#767b98",
        black: "#131313",
      },
    },
  },
  plugins: [],
};
