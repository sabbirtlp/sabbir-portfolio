import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        "unbounded": ["var(--font-unbounded)", "sans-serif"],
        "fira-code": ["var(--font-fira-code)", "monospace"],
      },
      colors: {
        background: "#0a0a0a",
        surface: "#111111",
        "surface-2": "#1a1a1a",
        accent: "#ea580c",
        "accent-light": "#fb923c",
        "text-primary": "#ffffff",
        "text-secondary": "#a3a3a3",
        "text-muted": "#525252",
        border: "#262626",
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 10vw, 10rem)", { lineHeight: "0.88", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(3rem, 7.5vw, 7rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2.5rem, 5.5vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.8rem, 3.5vw, 3.2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      spacing: {
        "section": "120px",
        "section-sm": "80px",
      },
      animation: {
        "gradient-x": "gradient-x 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "marquee": "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
