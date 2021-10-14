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
          <el-menu-item index="1">
            <i class="el-icon-folder-checked"/>
            <pand>预约记录</pand>
          </el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="店铺秀" placement="bottom">
          <el-menu-item index="2">
            <i class="el-icon-orange"/>
            <pand>店铺秀</pand>
          </el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="消息" placement="bottom">
          <el-menu-item index="3">
            <i  class="el-icon-chat-line-round"/>
            <span>消息</span>
            <el-badge :value="0" class="item"/>
          </el-menu-item>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="托尼管理" placement="bottom">
          <el-menu-item index="4">
            <i  class="el-icon-finished"/>
            <pand>托尼管理</pand>
          </el-menu-item>
        </el-tooltip>
        <el-submenu  index="5">
          <template  slot="title">
            <el-avatar shape="square" size="large" src="imageUrl"></el-avatar>
          </template>
          <el-menu-item index="5-1">
            <i  class="el-icon-user"/>
            <span>我的</span>
          </el-menu-item>
          <el-menu-item index="5-2">
            <i  class="el-icon-setting"/>
            <span>设置</span>
          </el-menu-item>
          <div class="line"></div>
          <el-menu-item index="5-3">
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
export default {
  data() {
    return {
      imageUrl:'',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style>
.item {
  margin-right: 10px;
}
</style>
