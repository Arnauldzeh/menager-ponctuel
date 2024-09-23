/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'green-light': '#CCF1E5',
        'green-dark': '#00B97B',
        'blue-custom': '#00BDDE',
        'white-custom': '#F3F4F6',
        'slate-custom': '#67727E',
      }
    }
  },
  plugins: [],
}

