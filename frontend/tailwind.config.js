/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   "#09090b",
          secondary: "#111117",
          card:      "#111117",
          elevated:  "#18181f",
          deep:      "#1e1e27",
        },
        accent: {
          DEFAULT: "#f59e0b",
          light:   "#fbbf24",
          dark:    "#d97706",
          xlight:  "#fcd34d",
          dim:     "rgba(245,158,11,0.1)",
          glow:    "rgba(245,158,11,0.25)",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          md:      "rgba(255,255,255,0.12)",
          lg:      "rgba(255,255,255,0.18)",
          gold:    "rgba(245,158,11,0.3)",
        },
        text: {
          primary:   "#f8fafc",
          secondary: "#94a3b8",
          muted:     "#475569",
        },
        blue:   { DEFAULT: "#3b82f6", dim: "rgba(59,130,246,0.08)" },
        emerald:{ DEFAULT: "#10b981", dim: "rgba(16,185,129,0.08)" },
        amber:  "#f59e0b",
        crimson:"#ef4444",
        violet: "#8b5cf6",
      },
      fontFamily: {
        sans:    ["DM Sans", "system-ui", "sans-serif"],
        display: ["Sora", "sans-serif"],
        brand:   ["Sora", "sans-serif"],
      },
      animation: {
        "fade-up":    "fadeInUp 0.5s ease forwards",
        "fade-in":    "fadeIn 0.3s ease forwards",
        shimmer:      "shimmer 1.8s linear infinite",
        "pulse-soft": "pulse 2s ease-in-out infinite",
        float:        "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.45" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        card:         "0 1px 3px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.4)",
        "card-hover": "0 12px 48px rgba(0,0,0,0.6)",
        gold:         "0 4px 16px rgba(245,158,11,0.3)",
        "gold-lg":    "0 8px 32px rgba(245,158,11,0.45)",
        glow:         "0 0 40px rgba(245,158,11,0.12)",
        "inner-gold": "inset 0 1px 0 rgba(245,158,11,0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-gradient":   "linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)",
      },
    },
  },
  plugins: [],
};
