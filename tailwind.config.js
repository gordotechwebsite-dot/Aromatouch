/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f6f1eb',
        sand: '#ece3d8',
        line: '#d9cbbb',
        ink: '#0f3b37',
        teal: { DEFAULT: '#2f6e67', soft: '#9cc5be' },
        aqua: { DEFAULT: '#5cc6b8', dark: '#45b0a2' },
        gold: { DEFAULT: '#9c7641', light: '#d2b483' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
