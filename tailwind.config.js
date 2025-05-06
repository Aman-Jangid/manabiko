// tailwind.config.js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-text)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        strong: "var(--color-strong)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        "accent-secondary": "var(--color-accent-secondary)",
        "accent-tertiary": "var(--color-accent-tertiary)",
        "accent-quaternary": "var(--color-accent-quaternary)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Courier", "monospace"],
        hachi: ["var(--font-hachi-maru-pop)", "cursive"],
        klee: ["var(--font-klee-one)", "sans-serif"],
        noto: ["var(--font-noto-serif-jp)", "serif"],
      },
    },
  },
  plugins: [],
};
