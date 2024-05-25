/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : 'hsl(259, 100%, 65%)',
        error: 'hsl(0, 100%, 67%)',
        offwhite: 'hsl(0, 0%, 94%)',
        grey: 'hsl(0, 0%, 86%)',
        smokey: 'hsl(0, 1%, 44%)',
        offblack: 'hsl(0, 0%, 8%)'
      },
      borderRadius: {
        '4xl': '120px'
      }
    },
  },
  plugins: [],
};
