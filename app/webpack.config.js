const path = require('path')

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    host: "0.0.0.0",
    inline: true,
    contentBase: "static",
    historyApiFallback: true
  }
}