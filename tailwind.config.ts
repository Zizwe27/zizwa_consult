import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--bg-base)",
        raised: "var(--bg-raised)",
        cyan: {
          DEFAULT: "var(--accent-cyan)",
          50: "rgba(34,211,238,0.05)",
          100: "rgba(34,211,238,0.10)",
          200: "rgba(34,211,238,0.20)",
        },
        ember: {
          DEFAULT: "var(--accent-ember)",
          50: "rgba(242,118,46,0.05)",
          100: "rgba(242,118,46,0.10)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        success: "var(--success)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
