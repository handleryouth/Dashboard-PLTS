/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "Inter",
            color: "black",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};