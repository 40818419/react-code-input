const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = [{
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'ReactCodeInput'
  },
  module: {
    loaders: [
      {
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ["css", "sass"]
      }
    ]
  },
  externals: {
    react: 'react'
  }
},
{
  entry: './example/example.js',
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: 'example.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: ["css", "sass"]
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
}];
