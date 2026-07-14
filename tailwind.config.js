/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
  important: '#root', // Ensures utility classes overlay MUI properly
  
  theme: {
    extend: {},
  },
  plugins: [],
}

