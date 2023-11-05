/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        marquee: "marquee 5s linear infinite",
        marqueelg: "marqueelg 5s linear infinite",
        "meteor-effect": "meteor 5s linear infinite",
        "radar-spin": "radar-spin 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(-25%,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        marqueelg: {
          "0%": { transform: "translate3d(calc(-25%+10vw),0,0)" },
          "100%": { transform: "translate3d(calc(-50%+10vw),0,0)" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        "radar-spin": {
          from: {
            transform: "rotate(20deg)",
          },
          to: {
            transform: "rotate(380deg)",
          },
        },
      },
      colors: {
        "primary-blue": "#4287f2",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        heading: "var(--color-heading)",
        text: "var(--color-text)",
        background: "var(--color-background)",
      },
      fontFamily: {
        body: "var(--font-inter), sans-serif",
        heading: "var(--font-cousine), serif",
        ubermove: "ubermove",
      },
    },
  },
  plugins: [],
};
