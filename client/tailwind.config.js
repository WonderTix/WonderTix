/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  screens: {
    'sm': '360px',
    // => @media (min-width: 576px) { ... }

    'md': '960px',
    // => @media (min-width: 960px) { ... }

    'lg': '1440px',
    // => @media (min-width: 1440px) { ... }
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
