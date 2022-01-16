const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'tabs': ['AT Arges Black Cond', 'ui-sans-serif', 'system-ui'],
    },
    backgroundImage: {
      'button': "url('./assets/button.svg')"
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      gray: {
        10: 'rgba(0, 0, 0, 0.4)',
        40: '#4F4F4F',
        60: '#757575',
        70: '#808080',
        75: '#C0BBBB',
        80: '#C4C4C4',
        90: '#E5E5E5',
        95: '#ECECEC',
        500: '#171617',
        510: '#16141C',
        525: '#1B1B1B',
        550: '#0D0C11',
        '500-85': 'rgba(23, 22, 23, .85)',
        'modal-bg': 'rgb(39, 49, 56)',
        'modal-main': 'rgb(199, 199, 199)',
        'modal-secondary': 'rgb(136, 136, 136)',
        'modal-border': 'rgba(195, 195, 195, 0.14)',
        'modal-hover': 'rgb(16, 26, 32)',
      },
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      green: {
        50: '#02E8B1',
        '50h': 'rgba(0,255,194,0.5)',
      },
      pink: {
        50: '#FF79C9',
        70: '#AC0167',
        80: '#E86FB7',
        '80h': 'rgba(152,1,91,0.5)',
      },
      blue: colors.blue,
      orange: colors.orange,
      black: colors.black,
      red: colors.red,
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'fade-gray-500': "linear-gradient(180deg, rgba(23, 22, 23, 0.0) 0%, rgba(23, 22, 23, 1.0) 79.76%);"
      },
      zIndex: {
        '-10': '-10',
        '1': '1',
        '2': '2',
        '999': '999',
        '1100': '1100',
      },
      gridTemplateColumns: {
        'modal': 'repeat(auto-fit, minmax(320px, 1fr))',
        'modal-mobile': '1fr',
      },
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      navbar: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '15': '15px',
      '12': '12px',
    },
    minHeight: {
      '72': '18rem',
      ...defaultTheme.minHeight,
    }
  },
  variants: {
    extend: {
      backgroundColor: ['checked', 'active', 'hover'],
      borderColor: ['checked'],
    },
  },
  plugins: [],
}
