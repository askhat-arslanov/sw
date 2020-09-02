const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require("webpack")

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BASE_URL: JSON.stringify('https://swapi.dev/api')
      }
    })
  ],
  devServer: {
    https: false,
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    hot: true,
    port: 3000
  }
})
