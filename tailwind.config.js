module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        pale: 'rgb(254,232,201)'
      },
      // flex: {
      //   'split-1': '0.1',
      //   'split-2': '0.2',
      //   'split-3': '0.3',
      //   'split-4': '0.4',
      //   'split-5': '0.5',
      //   'split-6': '0.6',
      //   'split-7': '0.7',
      //   'split-8': '0.8',
      //   'split-9': '0.9'
      // }
      fontFamily:{
        'poppins': 'poppins'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
