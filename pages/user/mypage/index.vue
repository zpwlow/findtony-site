<template>
  <div>
    <el-scrollbar style="height: 520px;width:101%;border-radius: 8px">
      <div style="width: 95%">
        <div style="background-color: #ffffff;border-radius: 6px;margin-bottom: 10px">
          <el-image style="width: 100%;height: 350px;border-radius: 8px"
                    src="http://ww1.sinaimg.cn/mw2000/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg"></el-image>
          <el-row>
            <el-avatar style="width: 100px;height: 100px;margin-left: 50px;margin-top: -50px"
                       :src="'/api/files/view/'+logo">
            </el-avatar>
            <div style="margin-left: 180px;margin-top: -42px">
              <el-col>
                      <span style="font-size: 20px;font-family: 黑体;font-weight: bold">{{userName}}
                        <i v-if="userInfo.sex==='女'" style="color: palevioletred" class="el-icon-female"></i>
                        <i v-if="userInfo.sex==='男'" style="color: #4b80ff;" class="el-icon-male"></i>
                     </span>
              </el-col>
              <el-col >
                <span>粉丝  {{fansNum}}</span>
                <span style="margin-left: 10px">关注  {{startNum}}</span>
              </el-col>
            </div>
          </el-row>
          <el-row style="padding-top: 10px;">
                  <span style="padding: 60px;">
                    <i style="margin-right: 20px" class="el-icon-document"></i>
                    {{userInfo.autograph}}
                  </span>
          </el-row>
          <el-row style="height: 10px"></el-row>
        </div>
        <div style="height: 15px">
          <el-col>
            <span style="margin-left: 15px;margin-top: 10px;font-family: 黑体;font-weight: bold">个人秀 (2)</span>
          </el-col>
        </div>
        <div style="height: 100%" v-infinite-scroll="load"  infinite-scroll-distance="20" >
          <li  class="follow-li" v-for="(item,index) in count" :key="index">
              <el-row style="height: 80px">
                <el-avatar style="width: 60px;height: 60px; margin: 15px" src="">
                </el-avatar>
                <div style="margin-left: 90px;margin-top: -70px;width: 150px">
                  <el-col>
                      <span style="font-size: 20px;font-family: 黑体;font-weight: bold">{{userInfo.userName}}
                        <i v-if="userInfo.sex==='女'" style="color: palevioletred" class="el-icon-female"></i>
                        <i v-if="userInfo.sex==='男'" style="color: #4b80ff;" class="el-icon-male"></i>
                        <i  style="color: #ffaa51;" class="el-icon-medal"></i>
                     </span>
                  </el-col>
                  <el-col >
                    <span>2021-2-8 10:38</span>
                  </el-col>
                </div>
                <div style="margin-left: 90%;margin-top: -70px;">
                  <el-dropdown   trigger="click" @command="handleCommand">
                    <i style="font-size: 22px" class="el-icon-arrow-down el-icon--right"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-row>
              <div style="width: 80%;margin-left: 10%;">
                <span style="font-family: 微软雅黑">
                  10月8日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例17例，
                  均为境外输入病例（广西3例，云南3例，天津2例，辽宁2例，上海2例，湖南2例，福建1例，山东1例，陕西1例），
                  含2例由无症状感染者转为确诊病例（均在湖南）。无新增死亡病例。新增疑似病例1例，为境外输入病例（在上海）。
                </span>
              </div>
              <!--  九宫格图片        -->
              <div class="SongList" style="margin-left: 10%;width: 60%">
                <div class="covers" :style="{display:MinDisplay}">
                  <div class="cover" v-for="(img,index) in images" :key='index'>
                    <img :src="img.src" width="90%" class="min">
                  </div>
                </div>
              </div>
              <div class="talk" style="height: 25px;">
                <el-row style="margin-bottom: 10px;margin-left: 20%">
                  <i  class="el-icon-chat-dot-square" @click="showComment = !showComment"><span></span></i>
                  <i v-if="!star" class="el-icon-star-on"><span></span></i>
                  <i v-if="star" class="el-icon-star-off"><span></span></i>
                </el-row>
              </div>
              <div v-if="showComment">
                <el-row style="margin-bottom: 10px">
                  <el-avatar style="width: 50px;height: 50px;margin: 10px" src="">
                  </el-avatar>
                  <div style="width: 80%;margin-left: 70px;margin-top: -55px">
                    <el-input
                      type="textarea"
                      autosize
                      maxlength="144"
                      show-word-limit
                      v-model="comment"></el-input>
                  </div>
                </el-row>
                <div style="margin-left: 75px;">
                  <el-popover
                    placement="bottom"
                    width="340"
                    trigger="hover">
                    <div>
                      <VEmojiPicker  style="height: 160px" @select="addEmoji">
                      </VEmojiPicker>
                    </div>
                    <el-button style="pointer-events: auto;" slot="reference"
                               icon="el-icon-edit" circle></el-button>
                  </el-popover>
                  <el-button style="margin-bottom: 10px;margin-left: 70%;background-color: #ffaa51" round>评论</el-button>
                </div>
              </div>
            </li>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>

import collectionApi from "~/api/chat/collection";
import cookie from "js-cookie";
import {VEmojiPicker} from "v-emoji-picker";

export default {
  components: {
    VEmojiPicker,
  },
  data(){
    return{
      star:true,
      display: 'none',
      MinDisplay:'flex',

      userInfo:'', // 用户信息
      userId:'', // 用户id
      userName:'', // 用户名
      logo:'', //  用户logo
      startNum:'', // 用户关注数
      fansNum:'', // 用户粉丝数

      count: 2,
      loading: false, //加载数据
      current: 1, //当前页
      size:5, // 每页数
      total:'', // 总页数
      list:[], //查询的数据列表
      comment:'' ,// 评论
      showComment: false,// 显示评论信息


      //Vue模板中使用v-for循环渲染图片时不能直接使用图片文件本地位置
      images:[
        {"src":'http://ww1.sinaimg.cn/mw2000/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg'},
        {"src":'http://ww1.sinaimg.cn/mw2000/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg'},
        {"src":'http://ww1.sinaimg.cn/mw2000/70ace9b7ly1ggzusnypoej20yi0yiaop.jpg'},
      ]

    }
  },
  created(){
    this.getUserInfo()
  },
  mounted() {

  },
  methods:{
    // 获取用户信息
    getUserInfo() {
      const  data = cookie.get("data")
      this.userId = cookie.get("userId")
      if(data){
        const userInfo = JSON.parse(data)
        this.userInfo = userInfo
        this.userName = userInfo.userName
        this.logo = userInfo.img
      }
      collectionApi.getCollectionNumber(this.userId).then(response=>{
        this.startNum = response.data
      })
      collectionApi.getFansNumber(this.userId).then(response=>{
        this.fansNum = response.data
      })

    },

    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 1000)
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    addEmoji(emoji){

    },
    goBack(){

    }
  }
}
</script>

<style scoped>
.follow-li{
  height: calc(100% + 60px);
  list-style-type:none;
  background-color: #ffffff;
  border-radius: 6px;
  margin-top: 10px;
  margin-bottom: 10px;
}
/*.follow-li:hover{*/
/*  background-color: #e3e3e3;*/
/*}*/
.talk i{
  font-size: 20px;
  margin-right: 40%;
}
.talk i:hover{
  color: #ffaa51;
}
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
