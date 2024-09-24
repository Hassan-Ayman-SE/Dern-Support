/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        robotoSlab: [
          "Roboto Slab",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        customLight: "#31363F", // Light color
        customBlueLight: "#76ABAE", // Light blue
        customBlueDark: "#1A4870", // Dark blue
        customBlueDarker: "#1F316F", // Even darker blue
        customBlueLightBg: "#4e7a99", // For Background
        customWhite: "#F5F5F5", // Light white/Gray
        customCyan: "#48CFCB", // Light cyan
        customTeal: "#229799", // Teal
        customDarkGray: "#424242", // Dark gray
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right top, #90afdf, #50c5eb, #10d7d6, #69e2a5, #bfe36f)',
        'background-gradient': 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)',

      },
    },
  },
  plugins: [],
};
