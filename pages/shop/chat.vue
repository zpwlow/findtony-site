<template>
  <div class="box">
    <div class="wechat">

      <div class="sidestrip">
        <div class="am-dropdown" data-am-dropdown>
          <!--头像插件-->
          <el-avatar style="margin-left: 10px;border-radius: 2px;"
                     shape="square" size="large" src="squareUrl"></el-avatar>
        </div>
        <!--三图标-->
        <el-menu default-active="activeIndex" background-color="#2a2e32" class="el-menu-demo"  @select="change">
          <el-menu-item index="1">
            <i style="font-size: 20px"  class="el-icon-chat-dot-round"></i>
          </el-menu-item>
          <el-menu-item index="2">
            <i style="font-size: 20px" class="el-icon-user"></i>
          </el-menu-item>
        </el-menu>
      </div>

      <!--聊天列表-->
      <div class="middle on" v-show="isChat">
        <div class="office_text">
          <ul class="user_list">
            <li class="user_active">
              <div class="user_head">
                <el-image src="images/head/2.jpg"/>
              </div>
              <div class="user_text">
                <p class="user_name">早安无恙</p>
                <p class="user_message">我是傻逼！，金少凯牛逼！</p>
              </div>
              <div class="user_time">下午 2：54</div>
            </li>
            <li>
              <div class="user_head">
                <el-image src="images/head/2.jpg"/>
              </div>
              <div class="user_text">
                <p class="user_name">夏继涛</p>
                <p class="user_message">[小程序]</p>
              </div>
              <div class="user_time">上午 11：03</div>
            </li>
          </ul>
        </div>
      </div>

      <!--好友列表-->
      <div class="middle on" v-show="isFriend">
        <div class="office_text">
          <ul class="friends_list">
            <li>
              <p>公众号</p>
              <div class="friends_box">
                <div class="user_head"><el-image src="images/head/2.jpg"/></div>
                <div class="friends_text">
                  <p class="user_name">公众号</p>
                </div>
              </div>
            </li>
            <li>
              <p>A</p>
              <div class="friends_box">
                <div class="user_head"><el-image src="images/head/3.jpg"/></div>
                <div class="friends_text">
                  <p class="user_name">彭于晏丶plus</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--聊天窗口-->
      <div class="talk_window">
        <div class="windows_top">
          <div class="windows_top_box">
            <span>早安无恙</span>
          </div>
        </div>

        <!--聊天内容-->
        <div class="windows_body">
          <div class="office_text" style="height: 100%;">
            <ul class="content" id="chatbox">
              <li class="me">
                <el-image src="images/own_head.jpg" title="金少凯"/>
                <span>疾风知劲草，板荡识诚臣</span>
              </li>
              <li class="other">
                <el-image src="images/head/15.jpg" title="张文超"/>
                <span>勇夫安知义，智者必怀仁</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="windows_input" id="talkbox">
          <div class="input_icon">
            <a href="javascript:;"></a>
            <a href="javascript:;"></a>
          </div>
          <div class="input_box">
            <textarea  name="" rows="" cols="" id="input_box"/>
            <el-button id="send">发送（S）</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '~/assets/css/chatmain.css'

import cookie from "js-cookie";
import conversationApi from "~/api/chat/conversation";
import collectionApi from "~/api/chat/collection";

import {VEmojiPicker} from 'v-emoji-picker'

import chatApi from "~/api/chat/chat";
import moment from 'moment'
import Cookies from "js-cookie";

export default {
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      activeIndex:'1', //导航栏选项
      isChat:true,    // 是否切换聊天
      isFriend:false, // 是否切换好友

    }
  },

  created() {

  },


  methods: {
    change(key, keyPath){  //切换好友及聊天列表
      if(key== 1){
        this.isChat=true
        this.isFriend=false
      }else{
        this.isChat=false
        this.isFriend=true
      }
      console.log(key,keyPath)
    },


  }
}
</script>

<style>

</style>
