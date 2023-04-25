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
      aspectRatio: {
        "4/3": "4 / 3",
      },
      height: {
        "97%": "97%",
      },
      transitionProperty: {
        width: "width",
        visibility: "visibility",
        display: "display",
        widthPaddingMargin: "width, padding, margin",
      },
      screens: {
        smallDisplay: "490px",
        smallToMediumDisplay: "670px",
        mediumDisplay: "960px",
        mediumToBigDisplay: "1130px",
        bigDisplay: "1400px",
        monitoringChartBreakpoint: "550px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
