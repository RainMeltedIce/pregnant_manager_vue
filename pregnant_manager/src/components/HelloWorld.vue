<!-- helloworld.vue中的内容能在app.vue中显示, 首先在index.js配置了路由路径,在main.js中加载了路由,在app.vue指明了路由显示位置<router-view>标签.  -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/testVue">
     <button class="btn btn-default">点击跳转</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '这是HelloWorld.vue'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
