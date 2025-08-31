/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",  // <-- ADD THIS
  content: ['./index.html','./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.08)'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
