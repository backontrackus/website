/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: "#EEEEEC",
      red: colors.rose,
      yellow: colors.amber,
      blue: "#007BC1",
      orange: "#FF9900",
    },
    extend: {},
  },
  plugins: [],
};
