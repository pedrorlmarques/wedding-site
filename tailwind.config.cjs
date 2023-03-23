/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,ts,js,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["PlusJakartaSans", "sans-serif"],
    },
    extend: {
      colors: {
        white: "#FEFFFA",
        primary: {
          50: "#e6efe3",
          100: "#c4d9bb",
          200: "#9ec090",
          300: "#7aa965",
          400: "#619947",
          500: "#498827",
          600: "#407b20",
          700: "#356b17",
          800: "#2a5b0e",
          900: "#173E00",
        },
        secondary: {
          50: "#f0e8da",
          100: "#dbc6a3",
          200: "#c2a169",
          300: "#ac7f2d",
          400: "#9f6800",
          500: "#925200",
          600: "#904a00",
          700: "#8c3d00",
          800: "#852f00",
          900: "#7c1200",
        },
      },
    },
  },
  variants: {
    extend: {
      "ring-3": ["hover", "active", "focus"],
    },
  },
};
