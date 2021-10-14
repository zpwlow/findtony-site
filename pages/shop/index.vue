<template>
    <div class="home page-component">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 2" :key="item">
          <img src="~assets/images/web-banner1.png" alt="">
        </el-carousel-item>
      </el-carousel>
      <!-- 搜索 -->
    </div>
</template>

<script>


export default {

  data() {
    return {
    }
  },
  created() {
  },

  methods: {
    handleSelect(item) {
      // window.location.href = '/hospital/' + item.hoscode
    },

  }
}
</script>

<style>

</style>
