/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'off-white-light': '#fffcf2',
        'blue': '#00003c',
        'blue-light': '#64648C',
        'beige': '#f7f0dc',
        'teal': '#1ed2af',
        'red': '#d00414',
        'light-beige': '#f7ede8',
        'white': 'white',
        'offwhite': '#fef9e6'
      }
    },
  },
  plugins: [],
}
