/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: '"Inter", sans-serif',
        bebas: '"Bebas Neue", sans-serif',
      },
      colors: {
        primary: "rgba(11,17,35,1)",
        secondary: "rgba(232,248,139,1)",
        gray: "#1D2237",
      },
    },
  },
  plugins: [],
};
