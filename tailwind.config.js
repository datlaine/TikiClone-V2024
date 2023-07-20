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

        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
    },
    screens: {
      'dienThoai': '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'

    },
  },
  plugins: [],
};
