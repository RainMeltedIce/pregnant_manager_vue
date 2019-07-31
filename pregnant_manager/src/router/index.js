// router下面的index.js文件：路由配置文件。
// 说明：定义了三个路由，分别是路径为/，路径为/msg，路径为/detail。后续会详细说明，因为我也是才学好多东西不懂，囧。
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestVue from '@/pages/TestVue'

Vue.use(Router)

//  还要重点说明index.js，在main.js中new Vue对象中写入router，实际上是router:router，作用是main.js引入了router对象，根据路由的配置方法，需要将router对象加载到根main.js中。
export default new Router({
  // 配置路由路径
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/testVue',
      name: 'TestVue',
      component: TestVue
    }
  ]
})
