const path = require("path");
const loaders = [
  {
    test: /\.js$/,
    loader: "babel-loader",
    query: {
      presets: ["es2015", "stage-0", "react"]
    }
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
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
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
  entry: "./example/example.js",
  output: {
    path: path.resolve(__dirname, "example/dist"),
    filename: "example.js"
  },
  module: {
    loaders
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
}];
