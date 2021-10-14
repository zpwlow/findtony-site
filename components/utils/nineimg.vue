<template>
  <div class="SongList">
    <div class="covers" :style="{display:MinDisplay}">
      <div class="cover" v-for="img in images" :key='img'>
        <img :src="img.src" width="90%" class="min">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongList",
  data:function() {
    return {
      display: 'none',
      MinDisplay:'flex',
      //Vue模板中使用v-for循环渲染图片时不能直接使用图片文件本地位置
      images:[
        {"src":'http://ww1.sinaimg.cn/mw2000/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg'},
        {"src":'http://ww1.sinaimg.cn/mw2000/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg'},
        {"src":'http://ww1.sinaimg.cn/mw2000/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg'},
      ]
    };
  },
  methods:{
  }
}
</script>

<style scoped>
.SongList{
  width: 40%;
}
.covers{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.cover{
  display: flex;
  justify-content: center;
  width: 33%;
  margin: 10px 0;
}
.min{
  border-radius: 10px;
  cursor: zoom-in;
}

</style>

