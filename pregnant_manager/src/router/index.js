// router下面的index.js文件：路由配置文件。
// 说明：定义了三个路由，分别是路径为/，路径为/msg，路径为/detail。后续会详细说明，因为我也是才学好多东西不懂，囧。
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
