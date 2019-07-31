// js严格模式
'use strict'
const path = require('path')
// 引入config目录下的index.js配置文件
const config = require('../config')
// 一个插件，抽离css样式，防止将样式打包在js中引起样式加载错乱
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
// 导出assetsPath
exports.assetsPath = function (_path) {
  // 如果是生产环境，则assetsSubDirectory的值为index.js文件中的assetsSubDirectory的值，否则...
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  // path.join返回绝对路径（在电脑上的实际位置）；path.posix.join返回相对路径
  return path.posix.join(assetsSubDirectory, _path)
}

// cssloaders相关配置
exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    // loader还是看看webpack官方解释，处理除js之外的文件？
    loader: 'css-loader',
    // 传递参数给loader
    options: {
      // 是否开启cssmap,默认为false
      sourceMap: options.sourceMap
    }
  }

  // postcss-loader相关
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    // 是否使用postCss
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        // 加载对应loader
        loader: loader + '-loader',
        // object.assign浅拷贝合并对象
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
    // 返回最终读取和导入loader
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    // css对应vue-style-loader和css-loader
    css: generateLoaders(),
    // postcss对应vue-style-loader和less-loader
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  // 生成的各种css文件的loader对象
  for (const extension in loaders) {
    // 提取每一种文件的loader
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  // 导入模块，用于node.js模块发送跨平台系统通知
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      // 发生错误时的通知标题
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      // 发生错误时的通知图标
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
