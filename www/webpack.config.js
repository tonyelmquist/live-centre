const path = require('path');
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV.trim() === 'development';
const webpack = require('webpack');

console.log(this);
module.exports = {
  watch: isDev,
  devtool: isDev ? 'cheap-module-inline-source-map' : null,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: path.join(__dirname, "app/scripts"),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
      new webpack.NoEmitOnErrorsPlugin()
  ]

};
