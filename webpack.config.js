var { BannerPlugin } = require('webpack');
var pkg = require('./cropit.jquery.json');

module.exports = {
  entry: `${__dirname}/src/index.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'jquery.cropit.js',
    library: 'cropit',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-syntax-class-properties',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
    ],
  },
  externals: {
    jquery: {
      root: 'jQuery',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
    },
  },
  plugins: [
    new BannerPlugin(`${pkg.name} - v${pkg.version} <${pkg.homepage}>`),
  ],
};
