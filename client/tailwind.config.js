/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        mainBg:'#0C1016',
        lightBg:'#161b22',
        bg:'rgba(17, 25, 40, 0.93)',
        myborder:'1px solid rgba(255, 255, 255, 0.125)'
      }
    },
  },
  plugins: [],
}

