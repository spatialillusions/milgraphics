const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT = __dirname;
const EXAMPLES_DIR = path.join(ROOT, 'example');
const NODE_MODULES_DIR = path.join(ROOT, 'node_modules');

module.exports = {
  mode: 'development',
  cache: true,
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    path.join(EXAMPLES_DIR, 'index.js')
  ],
  output: {
    filename: 'bundle.js',
    pathinfo: false
  },
  module: {
    rules: [
     {
       test: /\.js$/,
       enforce: 'pre',
       loader: 'source-map-loader'
     },
     {
        test: /\.js$/,
        exclude: NODE_MODULES_DIR,
        loader: 'babel-loader'
     }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(EXAMPLES_DIR, 'index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      "src",
      NODE_MODULES_DIR,
      EXAMPLES_DIR
    ]
  },
  target: 'web',
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    port: 8080
  }
};
