/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#f5f5f0',
          light: '#fafaf8',
          dark: '#e8e8e0',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#4a4a4a',
          tertiary: '#6a6a6a',
        },
        accent: {
          DEFAULT: '#2a5a8f',
          hover: '#1e4470',
        },
      },
      fontFamily: {
        sans: ['Geist Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Geist Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
}
