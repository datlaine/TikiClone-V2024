/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateRows: {
        // Simple 8 row grid
        16: "repeat(16, minmax(0, 1fr))",
        32: "repeat(2,minmax(0, 150px))",
        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
      animation: {
        showSideBarAni: "showSideBar .8s linear ",
        hideSideBarAni: "hideSideBar 1s linear ",
      },
      keyframes: {
        showSideBar: {
          "0%": { transform: "translateX(-300px)" },
          "100%": { transform: "translateX(0px)" },
        },
        hideSideBar: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-200px)" },
        },
      },
      boxShadow: {
        "3xl":
          "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;",
      },
    },
    screens: {
      dienThoai: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
