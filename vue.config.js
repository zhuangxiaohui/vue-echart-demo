'use strict'

const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 是否启动Gzip
const enableGzip = process.env.VUE_APP_GZ === 'true'

module.exports = {
  publicPath: process.env.BASE_URL || './',
  productionSourceMap: process.env.VUE_APP_SOURCE_MAP === 'on',

  devServer: {
    // display console info on page
    overlay: {
      warnings: false,
      errors: true
    }
  },

  chainWebpack(config) {
    // https://github.com/webpack-contrib/compression-webpack-plugin
    if (process.env.NODE_ENV === 'production') {
      if (enableGzip) {
        config
          .plugin('compression-webpack-plugin-gzip')
          .use(CompressionWebpackPlugin, [
            {
              filename: '[path][base].gz[query]',
              algorithm: 'gzip',
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240,
              minRatio: 0.8
            }
          ])
      }
    }
  }
}
