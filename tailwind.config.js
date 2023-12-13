/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cookie: {
          50: '#fff8eb',
          100: '#ffebc6',
          200: '#fecf75',
          300: '#feba4b',
          400: '#fda122',
          500: '#f77d09',
          600: '#db5804',
          700: '#b63a07',
          800: '#932d0d',
          900: '#79260e',
          950: '#461002'
        }
      }
    }
  },
  plugins: []
}
