const path = require("path");

module.exports = [{
  entry: "./src/ReactCodeInput.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "ReactCodeInput.js",
    libraryTarget: "umd",
    library: "ReactCodeInput"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loaders: ["css", "sass"]
      }
    ]
  },
  externals: {
    react: "react"
  }
},
{
  output: {
    path: path.resolve(__dirname, "example/dist"),
    filename: "example.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        loaders: ["css", "sass"]
      }
    ]
  },
  entry: [
    'babel-polyfill',
    './example/example.js'
  ],
  stats: {
    colors: true
  },
  devtool: "source-map"
}];
