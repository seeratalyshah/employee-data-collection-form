/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      sm: "567px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      screens: {
        xs: { min: "320px", max: "566px" },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      placeholder: {
        sm: "0.75rem", // 12px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
      },
      colors: {
        blue: {
          100: "#e9f8fc",
          200: "#bdeaf5",
          300: "#91dcee",
          400: "#65cfe7",
          500: "#26BBDD",
          600: "#1fa7c6",
          700: "#18829a",
          800: "#115d6e",
          900: "#0a3842",
        },
      },
    },
  },
  plugins: [],
}

