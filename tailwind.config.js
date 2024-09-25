/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-primary': '#16D5FF',
      },
      borderRadius: {
        '3xl': '30px',
      },
    },
  },
  plugins: [],
}

