const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './client/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'prod'),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  mode: process.env.NODE_ENV,
  devServer: {
    host: 'localhost',
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'dev'),
      publicPath: '/'     
    },
    proxy: {
      '/api/': 'http://localhost:3000'
    },
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'client/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ],
  },
}