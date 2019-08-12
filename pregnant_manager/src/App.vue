<template>
  <div>
    <div id="app">
      <!-- <img src="./assets/loginBackground.jpg"> -->
      <!-- 加载router注册的信息 -->
      <!-- <p>来自app.vue的div</p> -->
    </div>
    <!-- <div id="app1">
      <span>12312312</span>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  // app.vue是项目的主组件，所有页面都是在app.vue下切换的。一个标准的vue文件，分为三部分
  // 第一装写html代码在<template></template>中，一般在此下面只能定义一个根节点
  // 第二script标签
  // 第三<style scoped></style>用来写样式，其中scoped表示。该style作用于只在当前组件的节点及其子节点，但是不包含子组件
  // <router-view></router-view>是子路由视图，后面的路由页面都显示在此处，相当于一个指示标，指引显示哪个页面
  // 在app.vue指明了路由显示位置<router-view>标签
  // 输出口App.vue
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
