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
          darkGreen: "#16A34A",
          lime: "#A3E635",
          gold: "#D6A84B",
          goldLight: "#F4D477",
          goldDark: "#B98528",
          glow: "rgba(101, 201, 75, 0.15)",
        },
        card: {
          DEFAULT: "#151921",
          elevated: "#1A202A",
          border: "#232936",
          borderHover: "#374151",
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
        glow: "0 0 30px -5px rgba(101, 201, 75, 0.35)",
        "glow-subtle": "0 0 20px -5px rgba(101, 201, 75, 0.2)",
        "glow-gold": "0 0 30px -5px rgba(214, 168, 75, 0.35)",
        "glow-gold-subtle": "0 0 20px -5px rgba(214, 168, 75, 0.2)",
        "device-3d": "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px -10px rgba(101, 201, 75, 0.25)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-border": "linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02))",
        "gold-border": "linear-gradient(135deg, rgba(214, 168, 75, 0.3), rgba(214, 168, 75, 0.05))",
      },
    },
  },
  plugins: [],
};

export default config;
