<!-- helloworld.vue中的内容能在app.vue中显示, 首先在index.js配置了路由路径,在main.js中加载了路由,在app.vue指明了路由显示位置<router-view>标签.  -->
<template>
  <div class="backGoundImg" :style="note">
    <div>
      <h1>{{ msg }}</h1>
    </div>
    <!-- <router-link to="/testVue">
     <button class="btn btn-default">点击跳转</button>
    </router-link> -->
    <!-- {{ fullName }} -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '这是HelloWorld.vue',
      note: {
        backgroundImage: 'url(' + require('../../assets/loginBackground.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        // backgroundImage: "url(" + require("../../assets/save.png") + ")",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "25px auto",
        // marginTop: "5px"
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./HelloWorld.css";
</style>
