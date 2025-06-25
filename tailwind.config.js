/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexos': {
          'orange': '#E59222',
          'blue': '#74AEE1',
          'orange-light': '#F5A85A',
          'blue-light': '#8FC1E8',
          'orange-dark': '#C7761A',
          'blue-dark': '#5A9BD6',
        }
      },
      gradientColorStops: {
        'nexos-orange': '#E59222',
        'nexos-blue': '#74AEE1',
      }
    },
  },
  plugins: [],
}
