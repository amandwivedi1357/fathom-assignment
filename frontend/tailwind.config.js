/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marine': {
          'light': '#E6F0FF',
          'medium': '#1A56DB',
          'dark': '#1E40AF',
          'darker': '#1E3A8A',
        },
      },
    },
  },
  plugins: [],
}
