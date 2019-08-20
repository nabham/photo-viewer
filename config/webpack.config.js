const path = require('path');

module.exports = {
  entry: path.join(__dirname, '..', 'lib', 'index.js'),
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, '..', 'public')
  }
};