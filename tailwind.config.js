/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: '#c084fc',
        modal_bg: '#00000054',
        userMenuBg: '#ececec94',
      },
      backgroundImage: {
        banner1: "url('../public/img/b-1.jpg')",
        banner2: "url('../public/img/b-2.jpg')",
        banner3: "url('../public/img/b-3.jpg')",
      },
    },
  },
  plugins: [],
};
