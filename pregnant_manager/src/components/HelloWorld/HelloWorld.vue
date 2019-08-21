<!-- helloworld.vue中的内容能在app.vue中显示, 首先在index.js配置了路由路径,在main.js中加载了路由,在app.vue指明了路由显示位置<router-view>标签.  -->
<template>
  <div id="loginDOM" class="backGoundImg" :style="note">
    <div class="centerDiv">
      <!-- <div class="inputLineDiv">
        <span>用户名：</span>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div> -->
      <el-row :gutter="20" type="flex" justify="center" class="inputLineDiv">
        <el-col :span="5" :offset="1" style="margin-top: 4pt;text-align:right">
          <span>用户名：</span>
        </el-col>
        <el-col :span="14">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="5" :offset="1"  style="margin-top: 4pt;text-align:right">
          <span>密码：</span>
        </el-col>
        <el-col :span="14">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" justify="center" id="loginClick">
        <el-col :span="6" :offset="2">
            <el-button v-on:click="okClick('ok')" type="primary" round >确定</el-button>
        </el-col>
        <el-col :span="6" :offset="2">
            <el-button v-on:click="okClick('canel')" type="primary" round>取消</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- <router-link to="/testVue">
     <button class="btn btn-default">点击跳转</button>
    </router-link> -->
    <!-- {{ fullName }} -->
  </div>
</template>

<script>
export default {
  name: 'loginDOM',
  el: 'loginDOM',
  data () {
    return {
      note: {
        backgroundImage: 'url(' + require('../../assets/loginBackground.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      },
      input: ''
    }
  },
  methods: {
    okClick: function (message, event) {
      var tempMessage = ''
      if (message === 'ok') {
        tempMessage = 'ok'
      } else {
        tempMessage = 'canel'
      }
      alert(tempMessage)
      $.ajax({
        url: 'http://192.168.0.6:8763/v1/web/pad/login',
        type: 'post',
        dataType: 'json',
          success: (json) => {
            console.log(json)
          }
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "./HelloWorld.css";
</style>
<style scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
      }
    }
</style>
