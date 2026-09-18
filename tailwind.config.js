/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aduanai-dark': '#0a0a0a',
        'aduanai-charcoal': '#1a1a1a',
        'aduanai-steel': '#2a2a2a',
        'aduanai-silver': '#d4d4d4',
        'aduanai-ice': '#f5f5f5',
        'aduanai-accent': '#3b82f6',
        'aduanai-accent-dark': '#1e40af',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
}
