<template>
  <div class="box">
    <div class="show">
      <div style="width:15%;background-color: #ffffff;border-radius: 6px;height:540px">
        <span style="height: 40px;font-size: 24px;padding:25px;">个人秀</span>
        <el-menu
          default-active="start"
          class="el-menu-vertical-demo"
          @select="handleSelect">
          <el-menu-item index="start">
            <i class="el-icon-bangzhu"></i>
            <span slot="title">全部关注</span>
          </el-menu-item>
          <el-menu-item index="nowshow">
            <i class="el-icon-time"></i>
            <span slot="title">最新秀</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div style="width:83%;height:540px;margin-left: 17%;margin-top: -530px">
        <nuxt-child @fatherMethod="reloadShow"></nuxt-child>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/chatmain.css"


export default {
  data(){
    return{
      change:'start'
    }
  },
  methods: {
    // 导航栏更改页面
    handleSelect(key) {
      if(key === 'start'){
        this.change = 'start'
        this.$router.push({name: 'user-show'})
      }else if(key === 'nowshow'){
        this.change = 'nowshow'
        // this.$router.push({name: 'user-mypage-follow'})
      }
    },
    reloadShow(){
      if(this.change === 'start'){
        this.$router.push({name: 'user-show'})
      }else if(this.change === 'nowshow'){
        // this.$router.push({name: 'user-mypage-follow'})
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.show{
  display: inline-block;
  width: 70%;
}


.el-menu-item i{
  font-size: 20px
}


</style>
