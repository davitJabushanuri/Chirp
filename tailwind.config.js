/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "500px",
      md: "700px",
      lg: "1020px",
      xl: "1120px",
      xxl: "1300px",
    },

    colors: {
      transparent: "transparent",

      primary: {
        100: "rgb(var(--tw-clr-primary-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-primary-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-primary-300) / <alpha-value>)",
      },

      secondary: {
        100: "rgb(var(--tw-clr-secondary-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-secondary-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-secondary-300) / <alpha-value>)",
      },

      tertiary: {
        100: "rgb(var(--tw-clr-tertiary-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-tertiary-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-tertiary-300) / <alpha-value>)",
      },

      neutral: {
        100: "rgb(var(--tw-clr-neutral-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-neutral-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-neutral-300) / <alpha-value>)",
        400: "rgb(var(--tw-clr-neutral-400) / <alpha-value>)",
        500: "rgb(var(--tw-clr-neutral-500) / <alpha-value>)",
        600: "rgb(var(--tw-clr-neutral-600) / <alpha-value>)",
      },

      background: "rgb(var(--tw-clr-background) / <alpha-value>)",

      white: {
        100: "rgb(var(--tw-clr-white-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-white-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-white-300) / <alpha-value>)",
      },
      black: {
        100: "rgb(var(--tw-clr-black-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-black-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-black-300) / <alpha-value>)",
      },

      dim: {
        100: "rgb(var(--tw-clr-dim-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-dim-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-dim-300) / <alpha-value>)",
      },

      blue: {
        100: "rgb(var(--tw-clr-blue-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-blue-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-blue-300) / <alpha-value>)",
      },

      yellow: {
        100: "rgb(var(--tw-clr-yellow-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-yellow-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-yellow-300) / <alpha-value>)",
      },

      rose: {
        100: "rgb(var(--tw-clr-rose-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-rose-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-rose-300) / <alpha-value>)",
      },

      violet: {
        100: "rgb(var(--tw-clr-violet-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-violet-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-violet-300) / <alpha-value>)",
      },

      orange: {
        100: "rgb(var(--tw-clr-orange-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-orange-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-orange-300) / <alpha-value>)",
      },

      green: {
        100: "rgb(var(--tw-clr-green-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-green-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-green-300) / <alpha-value>)",
      },

      red: {
        100: "rgb(var(--tw-clr-red-100) / <alpha-value>)",
        200: "rgb(var(--tw-clr-red-200) / <alpha-value>)",
        300: "rgb(var(--tw-clr-red-300) / <alpha-value>)",
      },
    },

    fontSize: {
      kilo: "var(--tw-fs-kilo)",
      h1: "var(--tw-fs-h1)",
      h2: "var(--tw-fs-h2)",
      h3: "var(--tw-fs-h3)",

      base: "var(--tw-fs-base)",

      large: "var(--tw-fs-large)",
      milli: "var(--tw-fs-milli)",
      micro: "var(--tw-fs-micro)",
      nano: "var(--tw-fs-nano)",
      pico: "var(--tw-fs-pico)",
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },

    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      backdrop: 1040,
      modal: 1050,
      popover: 1060,
      tooltip: 1070,
    },

    extend: {
      spacing: {
        kilo: "var(--tw-fs-kilo)",
        h1: "var(--tw-fs-h1)",
        h2: "var(--tw-fs-h2)",
        h3: "var(--tw-fs-h3)",

        base: "var(--tw-fs-base)",

        large: "var(--tw-fs-large)",
        milli: "var(--tw-fs-milli)",
        micro: "var(--tw-fs-micro)",
        nano: "var(--tw-fs-nano)",
        pico: "var(--tw-fs-pico)",
      },
    },
  },
  plugins: [],
};
