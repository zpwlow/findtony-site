<template>
  <dev>
    <myheader/>
    <div class="login-container" >
      <fieldset style="background-color: #3B8070">
        <el-form ref="form" :model="form" style="background-color: #c6e2ff;border-radius: 3px" :rules="rules" label-width="120px">
          <h3 style="text-align: center" class="title">用户注册</h3>
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" style="width: 360px" placeholder="请输入手机号码"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" style="width: 360px" placeholder="请输入密码" show-password/>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="form.userName" style="width: 360px" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item label="个人简介" prop="introduce">
            <el-input
              v-model="form.introduce"
              type="textarea"
              placeholder="请输入您的个人简介"
              maxlength="100"
              style="width: 480px"
              show-word-limit/></el-form-item>
          <el-form-item label="个性签名" prop="autograph">
            <el-input
              v-model="form.autograph"
              type="textarea"
              placeholder="请输入您的个性签名"
              maxlength="50"
              style="width: 480px"
              show-word-limit/></el-form-item>
          <el-form-item label="性别"  prop="sex">
            <el-select v-model="form.sex" placeholder="">
              <el-option label="男" value="男"/>
              <el-option label="女" value="女"/>
            </el-select>
          </el-form-item>
          <el-form-item label="头像" prop="image">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              :action="actionUrl">
              <img v-if="image" :src="image" class="avatar">
              <i v-else style="background-color: #d9d9d9" class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 25%" @click="onSubmit('form')">注册</el-button>
            <el-button style="width: 25%" onclick="javascript:window.location='/'">取消</el-button>
          </el-form-item>
          <el-form-item></el-form-item>
        </el-form>
      </fieldset>
    </div>
    <myfooter/>
  </dev>
</template>

<script>
// 引入接口定义的js文件

import myfooter from "@/layouts/myfooter";
import myheader from "@/layouts/myheader";
import userApi from "~/api/user/user";
import cookie from "js-cookie";

export default {
  components:{
    myfooter,myheader
  },
  // 定义变量和初始值
  data() {
    return {
      isUpload: false,
      actionUrl: '/api/files/upload',
      image:'',
      form: {
        account: '',
        password: '',
        userName: '',
        sex: '',
        userId: '',
        img: '',
        introduce: '',
        autograph: '',
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        autograph: [
          { required: true, message: '请填写个性签名', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '请上传图片' }
        ],
        introduce: [
          { required: true, message: '请填写个人简介', trigger: 'blur' }
        ]
      }
    }
  },
  // 在页面渲染之前执行
  created() {
  },
  methods: {
    onSubmit(form) {
      this.rules.image = [{ required: true, message: '请上传图片' }]
      if (this.isUpload) {
        this.rules.image = []
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          const user = {
            account: this.form.account,
            password: this.form.password
          }
          userApi.userRegister(user).then(response => {
            const info = {
              userName: this.form.userName,
              sex: this.form.sex,
              userId: response.data.userId,
              img: this.form.img,
              introduce: this.form.introduce,
              autograph: this.form.autograph,}
            const token = response.data.token
            userApi.infoCreate(info).then(response => {
              cookie.set('token', token, { domain: 'localhost' })
              cookie.set('data', info, { domain: 'localhost' })
              cookie.set('role','user',{ domain: 'localhost' })
              window.location.href = '/user'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleAvatarSuccess(res) {
      this.image = '/api/files/view/' + res.data
      this.form.img = res.data
      this.isUpload = true
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
  }

}
</script>

<style scoped>
fieldset {
  /* 表单页面居中，宽度50% ,legend颜色设置，legend圆角*/
  border:2px solid #DCDFE6;  text-align:left; border-radius: 8px;margin: 0 auto;width:50%;
}

.line{
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

