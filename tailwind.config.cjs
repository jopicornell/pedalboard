/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./index.html",
    "./front/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "night"],
  },
  plugins: [
    require('daisyui')
  ],
}
