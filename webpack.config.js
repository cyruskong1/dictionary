var webpack = require('webpack');
//var CompressionPlugin = require('compression-webpack-plugin');

const config = {
  entry: './App.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/public',
    path: __dirname + '/public'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }  
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;