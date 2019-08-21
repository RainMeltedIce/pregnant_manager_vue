// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口文件来着，主要作用是初始化vue实例并使用需要的插件。比如下面引用了4个插件，
// 但只用了app（components里面是引用的插件）。
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI, {
  size: 'medium'
})

// new Vue代表新建vue对象
new Vue({
  // el官方解释：为实例提供挂载元素。值可以是 CSS 选择符，或实际 HTML 元素，或返回 HTML 元素的函数。
  // 这里就通过index.html中的<div id="app"><div>中的id=“app”和这里的“#app”进行挂载。
  // 加载index配置的路由路径
  el: '#app',
  router,
  // components:代表组件。这里的App，实际是App:App的省略写法，template里使用的 <App/>标签来自组件App。
  components: { App },
  // template：代表模板。官方解释：模板将会替换挂载的元素。挂载元素的内容都将被忽略。
  // 也就是说:template: '<App/>' 表示用<app></app>替换index.html里面的<div id="app"></div>
  template: '<App/>'
})

new Vue({
  el: '#app1',
  // router,
  components: { App },
  template: '<App/>'
})
