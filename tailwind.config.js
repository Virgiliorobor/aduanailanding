/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#17140f',
          mid: '#3a3630',
          muted: '#6e6a63',
          faint: '#a8a49d',
        },
        paper: {
          DEFAULT: '#f5f2ec',
          warm: '#ece8e0',
          card: '#ffffff',
        },
        gold: {
          DEFAULT: '#b8943e',
          light: '#d4b06a',
          deep: '#7a5f24',
          faint: '#f0e8d5',
        },
        risk: '#7a2828',
        safe: '#2a5c3f',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
      maxWidth: {
        content: '1140px',
        reading: '720px',
        wide: '900px',
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
      },
    },
  },
  plugins: [],
}
