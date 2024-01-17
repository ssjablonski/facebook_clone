/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx}', './components/**/*.{html,js,jsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dark-back" : "#212121",
        "dark-primary" : "#323232",
        "dark-secondary" : "#0D7377",
        "dark-third" : "#3D3D3D",
        "dark-color" : "#14FFEC",
        "dark-text" : "#FFFFFF",
        "light-back" : "#F5F5F5",
        "light-primary" : "#FFFFFF",
        "light-secondary" : "#0D7377",
        "light-third" : "#DEDEDE",
        "light-color" : "#14FFEC",
        "light-text" : "#000000",

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// background: '#212121',
//       primary: '#323232',
//       secondary: '#0D7377',
//       color: '#14FFEC'