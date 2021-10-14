<template>
  <div class="box">
    <div class="mypage">
      <div style="width:15%;background-color: #ffffff;border-radius: 6px;height:540px">
        <span style="height: 40px;font-size: 24px;padding:15px;">个人主页</span>
        <el-menu
          default-active="page"
          class="el-menu-vertical-demo"
          @select="handleSelect">
          <el-menu-item index="page">
            <i class="el-icon-user"></i>
            <span slot="title">我的主页</span>
          </el-menu-item>
          <el-menu-item index="follow">
            <i class="el-icon-bangzhu"></i>
            <span slot="title">我的关注</span>
          </el-menu-item>
          <el-menu-item index="fans">
            <i class="el-icon-star-off"></i>
            <span slot="title">我的粉丝</span>
          </el-menu-item>
          <el-menu-item index="updateinfo">
            <i class="el-icon-edit"></i>
            <span slot="title">修改信息</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="width:83%;height:540px;margin-left: 17%;margin-top: -530px">
           <nuxt-child></nuxt-child>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/chatmain.css"


export default {
  data(){
    return{

    }
  },
  methods: {
    // 导航栏更改页面
    handleSelect(key) {
      if(key == 'page'){
        this.$router.push({name: 'user-mypage'})
      }else if(key == 'follow'){
        this.$router.push({name: 'user-mypage-follow'})
      }else if(key == 'fans'){
        this.$router.push({name: 'user-mypage-fans'})
      }else if(key == 'updateinfo'){
        this.$router.push({name: 'user-mypage-updateinfo'})
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.mypage{
  display: inline-block;
  width: 70%;
}


.el-menu-item i{
  font-size: 20px
}


</style>
