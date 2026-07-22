/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        surface: "#131316",
        "surface-2": "#1c1c20",
        paper: "#f3f1ea",
        muted: "#8f8f96",
        line: "#28282d",
        accent: {
          DEFAULT: "#c8ff4d",
          dim: "#8fb537",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "clamp-hero": "clamp(2.75rem, 8vw, 7.5rem)",
        "clamp-h2": "clamp(2rem, 5vw, 3.75rem)",
      },
    },
  },
  plugins: [],
}
