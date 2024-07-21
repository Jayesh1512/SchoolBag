/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-primary-100" : '#FDFF8F',
        "brand-primary-200" : '#FCFF5A',
        "brand-primary-300" : '#E9EC52',
        "brand-primary-400" : '#CCCE48',
        "brand-primary-500" : '#A3A536',
        "base-100" : "#595959",
        "base-200" : "#494949",
        "base-300" : "#393939",
        "base-400" : "#292929",
        "base-500" : "#191919",
        "white-100" : "#FFFFFF",
        "white-200" : "#F0F0F0",
        "white-300" : "#DFDFDF",
        "white-400" : "#BEBEBE",
        "white-500" : "#9A9A9A",
        "Alert" : "#FF4949",
        "Success" : "#00CC03",
        "Warning" : "#FAAD1D",
        "Information" : "1D90FA"

       },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
