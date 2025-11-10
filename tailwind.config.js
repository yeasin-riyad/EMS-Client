/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Pacifico", "cursive"],
        // 'heading': ['Poppins', 'sans-serif'],
      },
      colors: {
        "primary-100": "#F5A627", 
        "primary-200": "#D48F22", 

        "secondary-100": "#F9FAFB",
        "secondary-200": "#1E1E1E",
        // 'tertiary': '#e74c3c',
      },
      spacing: {
        // '8': '2rem',
        // '16': '4rem',
        // '24': '6rem',
      },
    },
  },
  plugins: [],
};
