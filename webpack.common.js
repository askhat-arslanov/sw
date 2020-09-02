const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/index.js'],
    vendor: ['react', 'react-dom']
  },

  resolve: {
    alias: {
      helpers: path.resolve(__dirname, 'src/services/helpers'),
      hoc: path.resolve(__dirname, 'src/hoc'),
    },
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader']
      },
      {
        test: /\.ttf$/,
        use: {
          loader: 'file-loader'
        },
        include: [/fonts/]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './public', 'index.html'),
      fileName: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
}
