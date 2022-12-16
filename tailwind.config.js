module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "scrollbar",
    "scrollbar-thin",
    "scrollbar-thumb-dark-very-soft",
    "scrollbar-track-dark-soft",
    "scrollbar-none"
  ],
  theme: {
    extend: {
      colors: {
        blue: "#2072E5",
        "blue-dark": "#1560CA",
        "blue-light": "#3B5E8D",
        yellow: "#FFCE79",
        green: "#4CB675",
        'green-dark': "#2A8E51",
        red: "#F15858",
        'red-dark': "#D63F3F",
        dark: {
          hard: "#0F121D",
          medium: "#131625",
          soft: "#1B2035",
          "very-soft": "#494F6A",
          "border-soft": "#1F243E"
        }
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif']
      }
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp'),],
}