<template>
  <div class="app-container">
    <div id="main">
      <userheader/>
      <div class="main-container">
        <el-scrollbar class='page-component__scroll'>
          <!-- 内容区域 -->
          <nuxt-child/>
          <myfooter style="margin-top: 10px"/>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>

import myfooter from "~/layouts/myfooter";
import userheader from "~/layouts/userheader";

export default {
  components:{
    myfooter,userheader
  },

}
</script>

