'use strict'
const utils = require('./utils')
const config = require('../config')
// 是否是生产模式
const isProduction = process.env.NODE_ENV === 'production'
// 设置是否允许开启资源map
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  // 载入utils中的css loaders 返回配置好的css-loader和vue-style-loader
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  // 是否开启css资源map
  cssSourceMap: sourceMapEnabled,
  // 是否开启cacheBusting
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
