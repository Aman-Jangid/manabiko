// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable dark mode via class (for manual control or theme switching)
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "border-color": "var(--border-color)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};
