const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: '.'
  },
  devtool: 'source-map'
})
