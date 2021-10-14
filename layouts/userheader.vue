<template>
  <div class="header-container" style="background-color: #f5f7fa;border-radius: 5px">
    <div class="wrapper">
      <!-- logo -->
      <div class="left-wrapper v-link selected">
        <img style="width: 50px" width="50" height="50" src="~assets/images/logo.jpg">
        <span class="text">Find 托尼交流网站</span>
      </div>
      <el-menu  class="el-menu-demo" style="background-color: #f5f7fa;" mode="horizontal" @select="handleSelect">
        <el-menu-item index="home">
          <i class="el-icon-house"/>
          <pand>首页</pand>
        </el-menu-item>
        <el-tooltip class="item" effect="dark" content="预约理发" placement="bottom">
          <el-menu-item index="order">
            <i class="el-icon-folder-checked"/>
            <pand>预约</pand>
          </el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="个人秀" placement="bottom">
          <el-menu-item index="show">
            <i class="el-icon-orange"/>
            <pand>个人秀</pand>
          </el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="我的" placement="bottom">
          <el-menu-item index="message">
              <i  class="el-icon-chat-line-round"/>
              <span>消息</span>
              <el-badge :value="0" class="item"/>
          </el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
          <el-menu-item  index="mypage">
            <i  class="el-icon-user"/>
            <span>我的</span>
            <!--            <nuxt-link to="/user/mypage">我的</nuxt-link>-->
          </el-menu-item>
        </el-tooltip>
        <el-submenu  index="4">
          <template  slot="title">
            <el-avatar shape="square" size="large" :src="'/api/files/view/'+userInfo.img"></el-avatar>
            <span>{{userInfo.userName}}</span>
          </template>
          <el-divider></el-divider>
          <el-menu-item index="logout">
            <i  class="el-icon-d-arrow-left"/>
            <span>退出</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import 'assets/css/app.css'
import 'assets/css/chunk.css'
import 'assets/css/iconfont.css'
import 'assets/css/main.css'
import cookie from "js-cookie";
export default {
  data() {
    return {
      userInfo:'',
    };
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const userInfo = cookie.get("data")
      if(userInfo){
        this.userInfo = JSON.parse(userInfo)
      }

    },
    // 导航栏更改页面
    handleSelect(key) {
      if(key === 'mypage'){
        // window.location = '/user/mypage'
        this.$router.push({name: 'user-mypage'})
      }else if(key === 'message'){
        this.$router.push({name: 'user-chat'})
      } else if(key === 'home'){
        this.$router.push({name: 'user'})
      } else if(key === 'show'){
        this.$router.push({name: 'user-show'})
      }else if(key === 'logout'){
        cookie.set('token', '', { domain: 'localhost' })
        cookie.set('data', '', { domain: 'localhost' })
        cookie.set('userId', '', { domain: 'localhost' })
        cookie.set('role','',{ domain: 'localhost' })
        this.$router.push({name: 'index'})
      }
    }
  },

}
</script>
<style>
.item {
  margin-right: 10px;
}
</style>
