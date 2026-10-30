import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
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
          subtle: "#121519",
        },
        surface: {
          1: "#14181D",
          2: "#1B2128",
          3: "#242C36",
        },
        brand: {
          primary: "#65C94B",
          accent: "#A3E635",
          green: "#36C96A",
          greenDark: "#16A34A",
          gold: "#D6A84B",
          goldLight: "#F4D477",
          goldDark: "#B98528",
        },
        fk: {
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.16)",
          textPrimary: "#F8FAFC",
          textSecondary: "#94A3B8",
          textMuted: "#64748B",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        hindi: [
          "var(--font-noto-hindi)",
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1280px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

