<template>
  <div className="app-container">
    <div id="main">
      <shopheader/>
      <div className="main-container">
        <el-scrollbar className='page-component__scroll'>
          <!-- 内容区域 -->
          <nuxt-child/>
          <myfooter style="margin-top: 10px"/>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import shopheader from "@/layouts/shopheader";
import myfooter from "@/layouts/myfooter";


export default {
  components: {
    myfooter, shopheader
  },
}
</script>

