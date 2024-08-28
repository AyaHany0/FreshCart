/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],

  theme: {
    fontFamily: {
      Encode: ["Encode Sans Expanded", "sans-serif"],
    },
    extend: {
      colors: {
        maincolor: "var(--main-color)",
        lightcolor: "var(--light-color)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
