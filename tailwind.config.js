/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#05061B",
        primary: "#081338",
        main: "#0092EF",
        card: "#070E27",
        tertiary: "#00154A",
      },
    },
  },
  plugins: [],
};
