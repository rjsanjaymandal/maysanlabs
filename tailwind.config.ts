import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "375px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "var(--ring)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "brand-primary": "#1A6DD6",
        "brand-light": "#60A5FA",
        "brand-deep": "#0F1923",
        "brand-navy": {
          DEFAULT: "#0D1117",
          light: "#1A2535",
          accent: "#1E3A5F",
        },
        titanium: {
          DEFAULT: "#1e293b",
          light: "#334155",
          dark: "#0f172a",
        },
        "protocol-orange": "#f97316",
        surface: {
          elevated: "#0D1117",
          base: "#0F1923",
          subtle: "#1A2535",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        dim: {
          DEFAULT: "rgba(255, 255, 255, 0.3)",
          light: "rgba(255, 255, 255, 0.5)",
          muted: "rgba(255, 255, 255, 0.2)",
        },
        emphasis: {
          high: "#E2F0FF",
          med: "#B0CCE8",
          low: "#6B8FAB",
          subtle: "rgba(255, 255, 255, 0.3)",
          disabled: "rgba(255, 255, 255, 0.15)",
        },
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.02em",
        wide: "0.1em",
        widest: "0.25em",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(26, 109, 214, 0.15)',
        'glow-md': '0 0 40px rgba(26, 109, 214, 0.25)',
        'glow-lg': '0 0 60px rgba(26, 109, 214, 0.35)',
        'glow-xl': '0 0 80px rgba(26, 109, 214, 0.45)',
        'inner-glow': 'inset 0 0 20px rgba(26, 109, 214, 0.1)',
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shimmer: {
          "0%, 90%, 100%": {
            "background-position": "calc(-100% - var(--shimmer-width)) 0",
          },
          "30%, 60%": {
            "background-position": "calc(100% + var(--shimmer-width)) 0",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        shimmer: "shimmer 8s infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-out": "cubic-bezier(0, 0, 0, 1)",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
