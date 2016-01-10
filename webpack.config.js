module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: __dirname + '/build/js'
    filename: "main.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|app)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
