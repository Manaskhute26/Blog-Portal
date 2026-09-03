import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#09090b", // zinc-950 deep matte obsidian
        foreground: "#f4f4f5", // zinc-100
        muted: {
          DEFAULT: "#27272a", // zinc-800
          foreground: "#a1a1aa", // zinc-400
        },
        border: "#27272a", // zinc-800 crisp 1px hairline border
        accent: {
          DEFAULT: "#18181b", // zinc-900
          foreground: "#fafafa", // zinc-50
        },
        sage: {
          DEFAULT: "#3f3f46",
          light: "#71717a",
          dark: "#18181b",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "Courier New", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#a1a1aa", // zinc-400
            a: {
              color: "#f4f4f5",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              "&:hover": {
                color: "#ffffff",
              },
            },
            h1: {
              color: "#ffffff",
              fontFamily: "Inter, sans-serif",
              fontWeight: "700",
              tracking: "-0.025em",
            },
            h2: {
              color: "#f4f4f5",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              tracking: "-0.02em",
              borderBottom: "1px solid #27272a",
              paddingBottom: "0.5rem",
              marginTop: "2rem",
            },
            h3: {
              color: "#f4f4f5",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
            },
            code: {
              color: "#e4e4e7",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "#09090b",
              border: "1px solid #27272a",
              borderRadius: "0.5rem",
              color: "#e4e4e7",
              fontFamily: "JetBrains Mono, monospace",
            },
            blockquote: {
              color: "#a1a1aa",
              borderLeftColor: "#3f3f46",
              fontStyle: "italic",
            },
            hr: {
              borderColor: "#27272a",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
