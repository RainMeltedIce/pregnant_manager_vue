// build.js中具体含义标注（vue-cli脚手架官方文件解释，大家可自行定制这里面的内容）：
// 是webpack的打包文件，通过配置在package.json中的script下来执行脚本 npm run build其实就是运行的node build/build js
// ECMsoript ipt 5添加了javascript的第二种运行模式，即严格模式。使js更合理、安全的运行。
'use strict'
// node和npm版本检查（具体配置在本目录下check-versions.js文件中）
require('./check-versions')()
// 设置环境变量为生产模式
process.env.NODE_ENV = 'production'
// const是es6语法，现在配置webpack一般都用es6，不用es6也可以
// 导入模块ora，类似java中的import xxx包名xxx
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

// 实现loading的模块，具体可上npm上查
const spinner = ora('building for production...')
spinner.start()

// 这个代码表示的rm -rf删除操作，第一个参数是根据config.build中配置的打包后的文件路径(dist/static)，进行删除操作，可以是文件，也可以是文件夹。
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  // 如果删除中有错误就抛出异常并终止程序
  if (err) throw err
  // 如果没错误就往下执行，这一步是构建webpack
  webpack(webpackConfig, (err, stats) => {
    // 结束loading动画
    spinner.stop()
    // 如果有异常就抛出
    if (err) throw err
    // 标准输出流，类似console.log
    process.stdout.write(stats.toString({
      // 增加控制台颜色开关
      colors: true,
      // 是否增加内置模块信息
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      // 允许较少的输出
      chunks: false,
      // false不将内置模块的信息加到包信息
      chunkModules: false
    }) + '\n\n')// 这些是编译过程中，持续打印信息

    // 编译出错的信息
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 编译成功的信息
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
