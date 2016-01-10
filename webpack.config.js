module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + '/app'
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
