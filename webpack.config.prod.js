const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/'
  },
  plugins: [new CleanWebpackPlugin(['api_tester']), new webpack.DefinePlugin({})]
})
