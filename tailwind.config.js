/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#1c1c1c',
        muted: '#6f6f6b',
        line: '#e9e8e4',
        paper: '#fafaf8',
        sky: '#3a5bff',
        ember: '#ff7a2f',
      },
    },
  },
  plugins: [],
}
