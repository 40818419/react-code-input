const path = require("path");
const loaders = [
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
];

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
    loaders
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
    loaders
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
