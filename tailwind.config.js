// const { Colors } = require("chart.js");
module.exports = {
  content: [
    './index.html',
    './src/**/*/.{vue,js,ts,jsx,tsx}',
  ],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      bgChart: '#133E87',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
