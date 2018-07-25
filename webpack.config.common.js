const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dest',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'awesome-typescript-loader' },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },

      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // Images
      {
        test: /\.(ico|jpe?g|png|gif)$/,
        use: 'file-loader?name=[path][name].[ext]'
      },
      // Fonts and SVGs
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: 'src/assets/images/favicon.ico'
    })
  ]
}
