// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Pindahkan semua custom colors ke sini
      colors: {
        // Pokemon types
        pokemon: {
          normal: "#a8a878",
          fire: "#f08030",
          water: "#6890f0",
          grass: "#78c850",
          electric: "#f8d030",
          ice: "#98d8d8",
          fighting: "#c03028",
          poison: "#a040a0",
          ground: "#e0c068",
          flying: "#a890f0",
          psychic: "#f85888",
          bug: "#a8b820",
          rock: "#b8a038",
          ghost: "#705898",
          dragon: "#7038f8",
          dark: "#705848",
          steel: "#b8b8d0",
          fairy: "#ee99ac",
        },
        // UI colors
        primary: "#6366f1",
        secondary: "#8b5cf6",
        danger: "#ef4444",
        success: "#10b981",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
      // Glass effects sebagai utilities
      backdropBlur: {
        glass: "16px saturate(180%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.25)",
        "glass-inset":
          "inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
