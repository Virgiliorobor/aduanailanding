/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chrome: {
          DEFAULT: '#c9d1d9',
          bright: '#f0f6fc',
          muted: '#8b949e',
          dim: '#6e7681',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          bright: '#a78bfa',
        },
        peach: {
          DEFAULT: '#fb923c',
          bright: '#fdba74',
        },
      },
      fontFamily: {
        sans: ['Geist Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
