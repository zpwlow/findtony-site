<template>
 <div>
   <el-scrollbar style="height: 520px;width:101%;border-radius: 8px">
     <div style="width: 95%">
      <div style="background-color: #ffffff;border-radius: 6px">
         <el-input
           style="width: 94%;margin: 20px;color: #c1c0c0;border-color: #ffaa51"
           type="textarea"
           placeholder="请输入内容"
           v-model="showText"
           maxlength="144"
           id="input_text"
           :autosize="{ minRows: 2, maxRows: 4}"
           show-word-limit></el-input>
        <el-upload
          style="margin: 20px;margin-top: -15px"
          action="/api/files/upload"
          list-type="picture-card"
          :limit="9"
          :on-preview="handlePictureCardPreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div style="margin-left: 30px;">
          <el-popover
            placement="bottom"
            width="340"
            trigger="click">
            <div>
              <VEmojiPicker v-if="emojiVisible" style="height: 160px" @select="addwEmoji">
              </VEmojiPicker>
            </div>
            <el-button style="pointer-events: auto;" slot="reference"
                        @click="changeEmoji" circle>😃</el-button>
          </el-popover>
          <div style="width: 120px;margin-left: 60%;margin-top: -25px">
            <span style="text-align: right;width: 100px">{{commandText}}</span>
            <el-dropdown  trigger="click" @command="handleCommand">
              <i style="font-size: 22px" class="el-icon-arrow-down el-icon--right"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="公开" >公开</el-dropdown-item>
                <el-dropdown-item command="粉丝" >粉丝</el-dropdown-item>
                <el-dropdown-item command="仅自己可见" >仅自己可见</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="margin-top: -30px;margin-left: 80%;">
            <el-button style="margin-bottom: 10px;background-color: #ffaa51"
                       round  @click="sendShow">发送</el-button>
          </div>
        </div>
       </div>
       <div style="background-color: #ffffff;border-radius: 6px">

       </div>
     </div>
   </el-scrollbar>
 </div>
</template>

<script>

import {VEmojiPicker} from "v-emoji-picker";
import showApi from "~/api/comment/show";
import cookie from "js-cookie";

export default {
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      userId:'',
      emojiVisible: false, // 表情加载
      showText:'',
      dialogImageUrl: '',
      dialogVisible: false,
      commandText:'公开',
      images:[],
    }
  },
  created() {
    this.userId = cookie.get("userId")
  },
  methods: {
    changeEmoji(){
      this.emojiVisible = true
    },
    handleRemove(file) {
      this.images.some((item,i)=>{
        if(item === file.response.data){
          this.images.splice(i,1)
          return true
        }
      })
    },
    handleSuccess(response){
      this.images.push(response.data)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addwEmoji(emoji){
      if (process.client) {
        let input = document.getElementById("input_text")
        let startPos = input.selectionStart
        let endPos = input.selectionEnd
        let resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
        input.value = resultText
        input.focus()
        input.selectionStart = startPos + emoji.data.length
        input.selectionEnd = startPos + emoji.data.length
        this.showText = resultText
      }
    },
    handleCommand(command) {
      this.commandText = command
    },
    sendShow(){
      let num = 1
      if (this.commandText==="公开"){
        num = 1
      }
      if (this.commandText==="粉丝"){
        num = 2
      }
      if (this.commandText==="仅自己可见"){
        num = 3
      }
      const images = this.images.join(',')
      const show ={
        userId: this.userId,
        text: this.showText,
        imgs: images,
        comments:0,
        likes:0,
        type: num,
      }
      showApi.createShow(show).then(response=>{
        this.$emit('reloadShow')
        console.log(response)
      })
    },
  }

}
</script>

<style scoped>

</style>
