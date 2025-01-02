/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "border-width": "border-width 3s infinite alternate",
      },
      keyframes: {
        "border-width": {
          from: {
            width: "10%",
            opacity: "0",
          },
          to: {
            // You can customize the 'width'
            width: "72%",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
