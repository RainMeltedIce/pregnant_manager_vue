'use strict'
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
// shelljs插件，执行unix系统命令
const shell = require('shelljs')

function exec (cmd) {
  // 脚本可以通过child_process模块新建子进程，从而执行Unix系统命令
  // 将cmd参数传递的值转换成前后没有空格的字符串，也就是版本号
  return require('child_process').execSync(cmd).toString().trim()
}
// 声明常量数组，数组内容均为node相关信息的对象
const versionRequirements = [
  {
    // 对象名称为node
    name: 'node',
    // 使用semver插件，把版本信息转换为规定格式
    currentVersion: semver.clean(process.version),
    // 规定package.json中engines选项的node版本信息
    versionRequirement: packageConfig.engines.node
  }
]

// which为linux指令，在$path规定的路径下查找符合条件的文件
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    // 调用npm --verison命令，并把参数返回给exec函数获取纯净版本
    currentVersion: exec('npm --version'),
    // 规定package.json中的englines选项的node版本信息
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    // 如果版本号不符合package.json文件中指定的版本号，就执行warning.push
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
        // 当前版本号用红色标识，要求版本号用绿色标识
      )
    }
  }

  // 如果为真，则打印提示用户升级新版本
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
