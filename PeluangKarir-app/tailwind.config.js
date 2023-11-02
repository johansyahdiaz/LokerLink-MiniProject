/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#44adee",

          secondary: "#6ee7b7",

          accent: "#fff133",

          neutral: "#1a1a1a",

          "base-100": "#ffffff",

          info: "#4aa8bf",

          success: "#4ade80",

          warning: "#ef8234",

          error: "#ea4034",
        },
      },
    ],
  },
};
