export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s ease-out",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to bottom left, #8b5cf6, #d946ef)",
      },
    }
  },
  plugins: [],
};