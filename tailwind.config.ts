import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#0D0F12",
          subtle: "#12161C",
          elevated: "#181D25",
        },
        brand: {
          DEFAULT: "#65C94B",
          accent: "#65C94B",
          green: "#36C96A",
          gold: "#D6A84B",
          glow: "rgba(101, 201, 75, 0.15)",
        },
        card: {
          DEFAULT: "#151921",
          elevated: "#1A202A",
          border: "#232936",
        },
        ink: {
          primary: "#F3F4F6",
          muted: "#9BA3AF",
          subtle: "#6B7280",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(101, 201, 75, 0.3)",
        "glow-gold": "0 0 25px -5px rgba(214, 168, 75, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;

