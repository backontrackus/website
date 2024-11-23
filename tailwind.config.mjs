/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: "#EEEEEC",
        red: colors.rose,
        yellow: colors.amber,
        "bot-blue": "#007BC1",
        "bot-orange": "#FF9900",
      },
    },
    fontFamily: {
      heading: ["Roboto", "sans-serif"],
      paragraph: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
