module.exports = {
  entry: "./js/app.js",
  output: {
    path: 'js',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { loader: 'jsx-loader' }
    ]
  }
};
