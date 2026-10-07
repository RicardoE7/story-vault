/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F4F0E8",
        cream: "#FAF8F3",
        ink: "#1D1C19",
        muted: "#706C63",
        stone: "#D8D2C7",
        burgundy: {
          DEFAULT: "#7A2938",
          dark: "#5E1E2A",
        },
        olive: "#62654A",
      },

      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },

      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
      },
    },
  },
  plugins: [],
};
