// const postcssLightningcss = require('postcss-lightningcss');

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'postcss-lightningcss': {
      browsers: '>= 1%',
      lightningcssOptions: {
        minify: true,
      },
    },
    // autoprefixer: {},
  },
};

module.exports = config;
