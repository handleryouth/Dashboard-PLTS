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
      transitionProperty: {
        width: "width",
        visibility: "visibility",
        display: "display",
        widthPaddingMargin: "width, padding, margin",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
