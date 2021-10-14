<template>
  <div class="box">
    <div class="wechat">

      <div class="sidestrip">
        <div class="am-dropdown" data-am-dropdown>
          <!--头像插件-->
          <el-avatar style="margin-left: 10px;border-radius: 2px;"
                     shape="square" size="large" :src="'/api/files/view/'+this.logo"></el-avatar>
        </div>
        <!--三图标-->
        <el-menu :default-active="activeIndex" background-color="#2a2e32" class="el-menu-demo"  @select="change">
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
            <li :class="{user_active:categoryIndex==index}" v-for="(item,index) in talkList" :key="'user'+index" @click="getNowChat(item)">
              <div class="user_head">
                <el-image v-if="item.sender!==userId" :src="'/api/files/view/'+ item.senderImg"/>
                <el-image v-if="item.sender===userId" :src="'/api/files/view/'+ item.recipientImg"/>
              </div>
              <div class="user_text">
                <p v-if="item.sender!==userId" class="user_name">{{item.senderName}}</p>
                <p v-if="item.sender===userId" class="user_name">{{item.recipientName}}</p>
                <p v-if="item.type==1" class="user_message">{{item.lastMsg}}</p>
                <p v-if="item.type==2" class="user_message">[图片]</p>
              </div>
              <div class="user_time">{{item.lastTime | dateFormat('MM-DD HH:mm')}}</div>
              <el-badge v-if="item.unread>0" style="margin-top: 50px;margin: 30px" :value="item.unread" class="item"/>
            </li>
          </ul>
        </div>
      </div>

      <!--好友列表-->
      <div class="middle on" v-show="isFriend">
        <div class="office_text">
          <ul class="friends_list">
            <p v-if="shopFriendList.length>0" style="margin: 6px;font-family: 仿宋">商家</p>
            <li v-for="(item,index) in shopFriendList" :key="'shop'+index" @click="shopFriendToTalk(item)">
              <div class="friends_box">
                <div class="user_head"><el-image :src="'/api/files/view/'+ item.logo"/></div>
                <div class="friends_text">
                  <p class="user_name">{{item.shopName}}</p>
                </div>
              </div>
            </li>
            <p v-if="userFriendList.length>0" style="margin: 6px;font-family: 仿宋">好友</p>
            <li v-for="(item,index) in userFriendList" :key="'friend'+index" @click="userFriendToTalk(item)">
              <div class="friends_box">
                <div class="user_head"><el-image :src="'/api/files/view/'+ item.img"/></div>
                <div class="friends_text">
                  <p class="user_name">{{item.userName}}</p>
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
            <span >{{newChat.recipientName}}</span>
          </div>
        </div>

        <!--聊天内容-->
        <div class="windows_body">
          <div class="office_text" id="office_text" style="height: 100%;" updated>
            <ul class="content"  id="chatbox">
              <li v-for="(item,index) in chatList" :key="'chat'+index" :class="{'me':item.sender===userId,
                            'other':item.recipient===userId}" >
                <el-image :src="'/api/files/view/'+item.senderImg" :title="item.senderName"/>
                <span v-if="item.type==1">{{item.message}}</span>
                <div :class="{'meImg':item.sender===userId,
                            'otherImg':item.recipient===userId}">
                    <el-image
                      style="width: 150px; height: 150px"
                      v-if="item.type==2"
                      :src="'/api/files/view/'+item.message"
                      :preview-src-list="newChat.srcList"
                      fit="fill"
                      :load="loadImg(item.message)">
                    </el-image>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="windows_input" id="talkbox">
          <div class="input_icon">
            <el-popover
              placement="top-start"
              width="340"
              trigger="click">
              <VEmojiPicker v-if="emojiVisible" style="height: 150px" @select="addEmoji">
              </VEmojiPicker>
              <a href="javascript:;" slot="reference" @click="changeEmoji" ></a>
            </el-popover>
            <a>
              <el-upload
                  class="icon-upload"
                  :show-file-list="false"
                  :on-success="sendImg"
                  action="/api/files/upload">
                  <a></a>
              </el-upload>
            </a>

          </div>
          <div class="input_box">
            <textarea v-model="message"  name="" rows="" cols="" id="input_box"/>
            <el-button id="send" @click="sendMsg">发送（S）</el-button>
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
      emojiVisible: false, // 表情加载
      categoryIndex : 0,
      activeIndex:'1', //导航栏选项
      isChat:true,    // 是否切换聊天
      isFriend:false, // 是否切换好友

      userInfo:'',
      userId:'', // 用户id
      userName:'', // 用户名
      logo:'', //  用户logo

      userFriendList:[], // 关注的好友列表
      shopFriendList:[], // 关注的商家列表
      chatList: [], //聊天记录
      talkList: [], // 会话列表
      newChat:{
        sessionId:'',
        recipient:'',
        recipientName:'',
        recipientImg:'',
        srcList:[]
      }, // 当前聊天信息
      onlineUser: [], // 在线用户
      message:'' ,// 发送的消息

    }
  },
  updated : function(){
    this.$nextTick(function(){
      var div = document.getElementById('office_text');
      div.scrollTop = div.scrollHeight;
    })

  },

  created() {
    const token = Cookies.get('token')
    if (!token) {
      this.$router.push('/')
    }else {
      this.getUserInfo()
      this.getUserFriendList()
      this.getShopFriendList()
      this.getTalkList()
    }
  },
  watch: {
    // userId:{
    //   handler(newVal, oldVal) {
    //     this.userGoOnline()
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // talkList:{
    //   handler(newVal, oldVal) {
    //     this.joinRoom()
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },

  mounted() {
    this.initWebsocket();
  },


  methods: {
      //==============webSocket======================
      initWebsocket: function () {
        if(typeof(WebSocket) === "undefined"){
          alert("您的浏览器不支持socket")
        }else{
          // 实例化socket
          this.socket = new WebSocket(`ws://localhost/wsserver/${this.userId}`)
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket消息
          this.socket.onmessage = this.getMessage
        }
      },
      open: function () {
        console.log("socket连接成功")
      },
      error: function () {
        console.log("连接错误")
      },
      getMessage: function (msg) {
        const session = JSON.parse(msg.data)
        console.log("收到的消息",session)
        const newchat = {
          sessionId:session.sessionId,
          sender:session.sender,
          recipient:session.recipient,
          senderImg:session.senderImg,
          senderName:session.senderName,
          message:session.lastMsg,
          type:session.type,
          time:session.lastTime,
        }
        this.talkList.some((item, i) => {
          if(item.sessionId == session.sessionId){
            if(session.sessionId == this.newChat.sessionId){
              this.talkList.splice(i,1)
              session.unread = 0
              conversationApi.updateUnRead(session.sessionId)
              this.talkList.unshift(session)
              this.chatList.push(newchat)
              console.log('更新后的消息1',newchat)
              return true
            }else {
              this.talkList.splice(i,1)
              this.talkList.unshift(session)
              this.chatList.push(newchat)
              console.log('更新后的消息2',newchat)
              return true
            }
          }
        })

      },
      send: function (params) {
        this.socket.send(params)
      },
      close: function () {
        console.log("socket已经关闭")
      },
      //==============webSocket======================

    changeEmoji(){
        this.emojiVisible = true
    },
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
    },
    // 获取关注的好友列表
    getUserFriendList(){
      const userId =  cookie.get("userId")
      collectionApi.getUserList(userId)
        .then(response =>{
          this.userFriendList = response.data
      })
    },

    // 获取关注的商家列表
    getShopFriendList(){
      const userId =  cookie.get("userId")
      collectionApi.getShopList(userId)
        .then(response =>{
          this.shopFriendList = response.data
      })
    },
    // 获取聊天列表
    getTalkList(){
      const userId =  cookie.get("userId")
      conversationApi.queryTalk(userId)
        .then(response => {
          this.talkList = response.data
          this.getNowChat(this.talkList[0])
        })

    },
    // 获取聊天记录
    getChatList(sessionId){
      chatApi.queryAllById(sessionId).then(response =>{
        this.chatList = response.data
      })
    },
    // 关注的店家列表到聊天列表
    shopFriendToTalk(shop){
      const talk = {
        recipient: shop.shopId,
        recipientImg: shop.logo,
        recipientName: shop.shopName,
        sender: this.userId,
        senderImg: this.logo,
        senderName: this.userName,
      }
      conversationApi.createTalk(talk).then(response=>{
        this.getNowChat(response.data)
        this.talkList.some((item, i) => {
          if(item.sessionId ===response.data.sessionId){
            this.talkList.splice(i,1)
            return true
          }
        })
        this.talkList.unshift(response.data)
        this.activeIndex = 1
        this.isChat=true
        this.isFriend=false
        this.getChatList()
      })
    },
    // 关注的好友列表到聊天列表
    userFriendToTalk(user){
      const talk = {
        recipient: user.userId,
        recipientImg: user.img,
        recipientName: user.userName,
        sender: this.userId,
        senderImg: this.logo,
        senderName: this.userName,
      }
      conversationApi.createTalk(talk).then(response=>{
        this.getNowChat(response.data)
        this.talkList.some((item, i) => {
          if(item.sessionId ===response.data.sessionId){ // 如果新增的聊天在聊天列表中存在则删除然后插入到最前面
            this.talkList.splice(i,1)
            return true
          }
        })
        this.talkList.unshift(response.data)
        this.activeIndex = 1
        this.isChat=true
        this.isFriend=false
        this.getChatList()
      })
    },
    // 更换当前聊天的信息
    getNowChat(session){
        if(session.sender==this.userId){
          this.newChat.sessionId = session.sessionId
          this.newChat.recipient = session.recipient
          this.newChat.recipientName = session.recipientName
          this.newChat.recipientImg = session.recipientImg
        }else {
          this.newChat.sessionId = session.sessionId
          this.newChat.recipient = session.sender
          this.newChat.recipientName = session.senderName
          this.newChat.recipientImg = session.senderImg
        }
      this.newChat.srcList = []
      this.talkList.some((item, i) => {
        if(item.sessionId ===session.sessionId){
          this.talkList[i].unread = 0
        }
      })
      conversationApi.updateUnRead(session.sessionId)
      this.getChatList(this.newChat.sessionId)
    },
    loadImg(img){
        const url = "/api/files/view/"+img
        this.newChat.srcList.push(url)
    },
    // 添加表情
    addEmoji(emoji){
      if (process.client) {
        let input = document.getElementById("input_box")
        let startPos = input.selectionStart
        let endPos = input.selectionEnd
        let resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
        input.value = resultText
        input.focus()
        input.selectionStart = startPos + emoji.data.length
        input.selectionEnd = startPos + emoji.data.length
        this.message = resultText
      }
    },
    // 发送消息
    sendMsg(){
      if(this.message===''|| this.message.length===0){
        return
      }
      const session ={
        sessionId:this.newChat.sessionId,
        sender:this.userId,
        senderName:this.userName,
        senderImg:this.logo,
        recipient:this.newChat.recipient,
        recipientImg:this.newChat.recipientImg,
        recipientName:this.newChat.recipientName,
        lastMsg:this.message,
        type:1
      }
      this.message = ''
      const message=JSON.stringify(session)
      this.socket.send(message)
    },
    sendImg(response){
      const session ={
        sessionId:this.newChat.sessionId,
        sender:this.userId,
        senderName:this.userName,
        senderImg:this.logo,
        recipient:this.newChat.recipient,
        recipientImg:this.newChat.recipientImg,
        recipientName:this.newChat.recipientName,
        lastMsg:response.data,
        type:2
      }
      this.message = ''
      const message=JSON.stringify(session)
      this.socket.send(message)
      console.log(response.data)
    },

    // 更改聊天列表和好友列表
    change(key){
      if(key == 1){
        this.activeIndex = 1
        this.isChat=true
        this.isFriend=false
      }else{
        this.activeIndex = 2
        this.isChat=false
        this.isFriend=true
      }
    },
  }
}
</script>
