import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/registry/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          "linear-gradient(180deg, hsla(0, 0%, 100%, 0.03), hsla(0, 0%, 100%, 0.1))",
      },
      colors: {
        background: {
          DEFAULT: "hsl(var(--grey-900))",
          muted: "#0d0d0d",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          accent: "#f1f7feb5",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        grey: {
          50: "hsl(var(--grey-50) / <alpha-value>))",
          100: "hsl(var(--grey-100))",
          200: "hsl(var(--grey-200))",
          300: "hsl(var(--grey-300))",
          400: "hsl(var(--grey-400))",
          500: "hsl(var(--grey-500))",
          600: "hsl(var(--grey-600))",
          700: "hsl(var(--grey-700))",
          800: "hsl(var(--grey-800))",
          900: "hsl(var(--grey-900))",
        },
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        "border-width": "border-width 3s infinite alternate",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        "border-width": {
          from: {
            width: "10%",
            opacity: "0",
          },
          to: {
            width: "72%",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
