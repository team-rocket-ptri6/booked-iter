module.exports = {
  content: [
    './client/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
    './node_modules/flowbite/**/*.js'
  ],

  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("tw-elements/dist/plugin"),
    require('flowbite/plugin')
  ],
  corePlugins: {
    preflight: false,
  },
};
