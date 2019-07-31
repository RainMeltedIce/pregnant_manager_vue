'use strict'
const path = require('path')
//引入utils工具模块，主要处理css-loader和vue-style-loader
const utils = require('./utils')
const config = require('../config')
//引入vue-loader工具模块
const vueLoaderConfig = require('./vue-loader.conf')

//返回当前目录的平行目录的路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 输入
  entry: {
    // 入口文件为main.js
    app: './src/main.js'
  },
  // 输出
  output: {
    // 打包后文件输出路径，看看自己的index.js中build配置中的assetsRoot是啥目录
    path: config.build.assetsRoot,
    // 输出文件名称默认使用原名
    filename: '[name].js',
    // 真正的文件引用路径，请看自己的index.js中build配置中写的啥
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 决定要做的事情
  resolve: {
    // 省略扩展名，也就是说当使用.js .vue .json文件导入可以省略后缀名
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // $符号指精确匹配，路径和文件名要详细
      'vue$': 'vue/dist/vue.esm.js',
      // resolve('src‘)//resolve('src')指的是项目根目录中的src文件夹目录，导入文件的时候路径可以这样简写 import somejs from "@/some.js"就可以导入指定文件
      '@': resolve('src'),
    }
  },
  // 用来解析不同模块
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        // 正则表达式，表示当前loader能检测.vue类型的文件（分析这个正则：/标记正则表达式的开始和结束，指的是在开始和结尾处哦，否则要使用/就得转义\/;\.表示.,此处的\将.标记为原意字符；$是正则表达式的结束？这个我不知道...）
        test: /\.vue$/,
        // 对vue文件使用vue-loader，该loader是vue单文件组件的实现核心，解析.vue文件
        loader: 'vue-loader',
        // 将vueLoaderConfig当做参数传递给vue-loader,解析css相关文件
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // 对js文件使用babel-loader转码，该插件用来解析es6等代码
        loader: 'babel-loader',
        // 指明src文件夹 test文件夹 client文件夹下的js文件要使用该loader
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        // 这些格式结尾的图片文件
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        // 图片文件使用url-loader插件，将图片转为base64格式字符串
        loader: 'url-loader',
        options: {
          // 10000个字节以下的文件才用来转为dataUrl
          limit: 10000,
          // 超过10000字节的图片，就按照制定规则设置生成的图片名称，可以看到用了7位hash码来标记，.ext文件是一种索引式文件系统
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        // 音频 视频类文件
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        // 也是用url-loader
        loader: 'url-loader',
        options: {
          // 10000个字节以下的文件才进行转换
          limit: 10000,
          // 这个name到底是给谁起的啊喂，给超过limit字节限制的文件起的
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        // 处理字体相关
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // 一个对象，每个属性都是node.js全局变量或模块的名称，value为empty表示提供空对象
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    // false表示什么都不提供，话说参数setImmediate表示异步递归？？？需要查阅node文档了
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
