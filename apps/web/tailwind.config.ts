import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/ui/tailwind.config';

const config: Config = {
  presets: [sharedConfig],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /**
       * LingoLearn brand palette (Figma "How to Learn").
       * Lives alongside the semantic shadcn tokens in globals.css — these are
       * the fixed marketing/auth colors, so they are plain hex, not HSL vars.
       */
      colors: {
        brand: {
          DEFAULT: "#4648d4",
          ink: "#191c1e",
          body: "#464554",
          muted: "#767586",
          line: "#c6c5d7",
          surface: "#f7f9fb",
          subtle: "#f2f4f6",
          track: "#e6e8ea",
          lilac: "#e1e0ff",
          violet: "#6b38d4",
          plum: "#8455ef",
          success: "#006a48",
          emerald: "#10b981",
          mint: "#8df7c4",
        },
      },
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "brand-card":
          "0px 20px 25px -5px rgba(216,218,220,0.4), 0px 8px 10px -6px rgba(216,218,220,0.4)",
        "brand-cta":
          "0px 4px 6px -1px rgba(70,72,212,0.25), 0px 2px 4px -2px rgba(70,72,212,0.25)",
        "brand-pill":
          "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
      },
    },
  },
};

export default config;
