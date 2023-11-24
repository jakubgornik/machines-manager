import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBlue: "#1f93e0",
        lighterBlue: "#73abd1",
        slateGray: "#64748B",
        defaultRed: "#F87171",
        defaultGreen: "#05C801",
        defaultOrange: "#F2B412",
        defaultPurple: "#8654C5",
      },
      fontFamily: {
        serif: "ui-serif",
      },
    },
    screens: {
      mobile: "320px",
      "mobile-lg": "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
