/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#161d22',
        paper: '#f7f8f5',
        moss: { 50:'#f1f7ed',100:'#dfecd6',200:'#c4dbb4',300:'#9fc58a',400:'#78a95f',500:'#5b8e44',600:'#467235',700:'#395b2d',800:'#304a29',900:'#293f25' },
        sun: '#f1b957',
      },
      boxShadow: { soft: '0 14px 50px rgba(30, 42, 34, .08)', lift: '0 22px 60px rgba(21, 31, 25, .13)' },
      fontFamily: { sans: ['Inter','ui-sans-serif','system-ui'], display: ['Manrope','Inter','ui-sans-serif','system-ui'], mono: ['JetBrains Mono','ui-monospace','monospace'] },
      backgroundImage: { 'dot-grid': 'radial-gradient(circle, rgba(80,100,75,.14) 1px, transparent 1px)' },
    },
  },
  plugins: [],
}

