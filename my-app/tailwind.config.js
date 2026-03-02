/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        afro: {
          black: "#1A1A1A",
          dark: "#2D2D2D",
          gray: "#6B6B6B",
          "light-gray": "#F5F5F5",
          border: "#E5E5E5",
          white: "#FFFFFF",
          gold: "#C9A84C",
          "tag-bg": "#EFEFEF",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
