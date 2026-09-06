import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        "rose-soft": "oklch(var(--rose-soft) / <alpha-value>)",
        "rose-pale": "oklch(var(--rose-pale) / <alpha-value>)",
        "sage-soft": "oklch(var(--sage-soft) / <alpha-value>)",
        "sage-pale": "oklch(var(--sage-pale) / <alpha-value>)",
        "beige-soft": "oklch(var(--beige-soft) / <alpha-value>)",
        success: {
          DEFAULT: "oklch(var(--success) / <alpha-value>)",
          foreground: "oklch(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "oklch(var(--warning) / <alpha-value>)",
          foreground: "oklch(var(--warning-foreground))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        boutique: "0 4px 16px rgba(58, 58, 58, 0.08)",
        "boutique-lg": "0 8px 32px rgba(58, 58, 58, 0.12)",
        soft: "0 2px 8px rgba(58, 58, 58, 0.04)",
        ribbon: "0 2px 8px rgba(58, 58, 58, 0.16)",
        "loyalty-soft": "0 2px 10px rgba(168, 181, 162, 0.35)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(8px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "heart-trail": {
          "0%": { transform: "translate(0, 0) scale(0.6) rotate(-10deg)", opacity: "0.9" },
          "60%": { opacity: "0.7" },
          "100%": { transform: "translate(0, -46px) scale(1) rotate(8deg)", opacity: "0" },
        },
        "petal-burst": {
          "0%": { transform: "translate(0, 0) scale(0.4) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translate(var(--tx, 0), var(--ty, -90px)) scale(1) rotate(var(--tr, 120deg))",
            opacity: "0",
          },
        },
        "ribbon-shimmer": {
          "0%, 100%": { boxShadow: "0 2px 6px rgba(58, 58, 58, 0.14)" },
          "50%": { boxShadow: "0 2px 12px rgba(58, 58, 58, 0.24)" },
        },
        "live-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(168, 181, 162, 0.55)", transform: "scale(1)" },
          "50%": { boxShadow: "0 0 0 5px rgba(168, 181, 162, 0)", transform: "scale(1.15)" },
        },
        "loyalty-shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "heart-trail": "heart-trail 1.1s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
        "petal-burst": "petal-burst 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
        "ribbon-shimmer": "ribbon-shimmer 3s ease-in-out infinite",
        "live-pulse": "live-pulse 1.6s ease-in-out infinite",
        "loyalty-shimmer": "loyalty-shimmer 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
