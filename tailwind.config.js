/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./tabs/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#618264",
        "medium-green": "#79AC78",
        "light-green": "#B0D9B1",
        "pale-green": "#D0E7D2",
        "font-black": "#47484B",
        "oldman": "#D9D9D9",
        "light-grey": "#F3F3F3",
      },
    },
  },
  plugins: [],
};
