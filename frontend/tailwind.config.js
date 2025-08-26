/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: '#fafafa',
        bgPage: '#1f2937',
        border: '#374151',
        textPrimary: '#424344',
        textSecondary: '#817d80',
        button: '#818cf8',
        card: '#3a3a3a',
        card2:'#262729',
        sideBar:'#f4f4f4',
        hover:'#ebebeb'
      }
    },
  },
  plugins: [],
}

