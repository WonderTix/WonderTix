/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'sm': '360px',
      // => @media (min-width: 360px) { ... }

      'tab': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
    // => @media (min-width: 1440px) { ... }
    },

    extend: {
      backgroundImage: {
        'hero': 'url(../src/assets/pexels-cottonbro-6896179.jpg)',
      },
    },
  },
  plugins: [],
};
