<template>
  <div id="main">
    <myheader/>
    <div class="login-container">
      <fieldset style="background-color: #3B8070">
        <h3 style="text-align: center" class="title">用户修改账号密码</h3>
        <el-form class="login-form" :model="updateForm" :rules="rules" ref="updateForm">
          <el-form-item prop="account">
            <el-input v-model="updateForm.account" placeholder="请输入账号"/>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input v-model="updateForm.password" placeholder="请输入密码" show-password/>
          </el-form-item>
          <el-form-item  prop="password2">
            <el-input v-model="updateForm.password2" placeholder="请再输入密码" show-password/>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-input v-model="updateForm.code" style="width:60%;float: left;"
                        placeholder="请输入验证码" @keyup.enter.native="userHandleUpdate('updateForm')"></el-input>
              <el-button type="success" style="width:30%;float: right;" round @click="getCode">{{codeText}}</el-button>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width:45%"
                       @click.native.prevent="userHandleUpdate('updateForm')">修改</el-button>
            <el-button style="width: 45%;float: right" onclick="javascript:window.location='/'">取消</el-button>
          </el-form-item>
        </el-form>
      </fieldset>
    </div>
  </div>
</template>

<script>
import smsApi from "~/api/user/sms";
import userApi from "~/api/user/user";
import myheader from "@/layouts/myheader";

export default {
  components:{
    myheader
  },
  data() {
    return {
      codeText: '获取验证码',
      second: -1,
      sending: true,

      updateForm: {
        account: '',
        password: '',
        password2:'',
        code: ''
      },
      rules: {
        account: [{ required: true, message: '请输入正确的手机号码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '密码不能小于5位', trigger: 'blur' }],
        password2: [{ required: true, message: '请再输入密码', trigger: 'blur'},
          { min: 5, message: '密码不能小于5位', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      loading: false,
    }
  },
  created() {
  },

  methods: {
    // 获取验证码
    getCode() {
      if (!(/^1[34578]\d{9}$/.test(this.updateForm.account))) {
        this.$message.error('手机号码不正确')
        return;
      }

      // 控制重复发送
      if (!this.sending) return;
      this.sending = false;
      const h = this.$createElement;
      smsApi.sendCode(this.updateForm.account).then(response => {
        console.log(response.data)
        this.$notify({
          title: '验证码',
          message: h('i', { style: 'color: teal'},response.data),
          duration: 45000,
          position: 'bottom-left',
          showClose: false
        });
        this.timeDown();
      }).catch(e => {
        this.$message.error('发送失败，重新发送')
      })
    },
    // 倒计时
    timeDown() {
      if(this.clearSmsTime) {
        clearInterval(this.clearSmsTime);
      }
      this.second = 60;

      this.clearSmsTime = setInterval(() => {
        --this.second;
        this.codeText = this.second+"s"
        if (this.second < 1) {
          clearInterval(this.clearSmsTime);
          this.sending = true;
          this.second = 0;
          this.codeText = "重新发送"
        }
      }, 1000);
    },
    userHandleUpdate(form) {
      this.rules.username = [{ required: true,message: '请输入正确的手机号码' }]
      if((/^1[34578]\d{9}$/.test(this.updateForm.account))){
        this.rules.username = []
      }
      if(this.updateForm.password2 !== this.updateForm.password){
        this.$message.error('前后密码不一致')
        return
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data={
            account: this.updateForm.account,
            password: this.updateForm.password,
            code: this.updateForm.code
          }
          userApi.userUpdate(data).then(response =>{
            this.$message({
              showClose: true,
              message: '修改密码成功，请重新登录',
              type: 'success'
            });
            window.location.href = '/'
          }).catch(e => {
            this.$message.error('修改失败，请稍后再试！')
            window.location.href = '/'
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">

fieldset {
  /* 表单页面居中，宽度50% ,legend颜色设置，legend圆角*/
  border:2px solid #DCDFE6;  text-align:left;
  border-radius: 8px;margin: 80px auto;width:40%;
}
</style>
