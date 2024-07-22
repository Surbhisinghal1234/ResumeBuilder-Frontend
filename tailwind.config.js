/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center:true,
      padding:"0rem",
      screens:{
        "2xl": "1596px",
      },},
    extend: {
      screens: {
        'xs': '400px', // This is your custom breakpoint
      },
    
    },
  },
  plugins: [],
}

