<template>
  <dev>
    <myheader/>
    <div class="login-container" >
      <fieldset style="background-color: #3B8070">
        <el-form ref="form" :model="form" style="background-color: #c6e2ff;border-radius: 3px" :rules="rules" label-width="120px">
          <h3 style="text-align: center" class="title">店铺注册</h3>
          <el-form-item label="账号" prop="account" >
            <el-input v-model="form.account" placeholder="请输入账号" style="width: 420px"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" style="width: 420px" placeholder="请输入密码" show-password/>
          </el-form-item>
          <el-form-item label="店铺名" prop="shopName">
            <el-input v-model="form.shopName" placeholder="请输入店铺名" style="width: 420px"/>
          </el-form-item>
          <el-form-item label="店铺简介" prop="introduce">
            <el-input
              v-model="form.introduce"
              type="textarea"
              placeholder="请输入店铺的简介"
              maxlength="100"
              style="width: 480px"
              show-word-limit/></el-form-item>
          <el-form-item label="服务宣言" prop="autograph">
            <el-input
              v-model="form.autograph"
              type="textarea"
              placeholder="请输入店铺的服务宣言"
              maxlength="50"
              style="width: 480px;"
              show-word-limit/></el-form-item>
          <el-form-item label="区域" prop="province">
            <el-col :span="6">
              <el-select
                v-model="form.province"
                style="width: 120px;"
                placeholder="请选择省"
                @change="provinceChanged">
                <el-option
                  v-for="item in provinceList"
                  :key="item.areaCode"
                  :label="item.areaName"
                  :value="item.areaName"/>
              </el-select>
            </el-col>
            <el-col :span="6" >
              <el-select
                v-model="form.city"
                style="width: 120px;"
                placeholder="请选择市"
                @change="cityChanged">
                <el-option
                  v-for="item in cityList"
                  :key="item.areaCode"
                  :label="item.areaName"
                  :value="item.areaName"/>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-select v-model="form.area" style="width: 120px;" placeholder="请选择区">
                <el-option
                  v-for="item in areaList"
                  :key="item.areaCode"
                  :label="item.areaName"
                  :value="item.areaName"/>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="详细地址" prop="area">
            <el-input v-model="form.address" placeholder="请输入店铺的详细地址" style="width: 420px;"/>
          </el-form-item>
          <el-form-item label="经度" prop="lng">
            <el-col :span="7">
              <el-input v-model="form.lng" placeholder="请输入店铺的位置经度" style="width: 180px"/>
            </el-col>
            <el-col :span="5" class="line">纬度</el-col>
            <el-col :span="7" >
              <el-input v-model="form.lat" placeholder="请输入店铺的位置纬度" style="width: 180px"/>
            </el-col>
          </el-form-item>
          <el-form-item label="logo" prop="logo">
            <el-upload
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              class="avatar-uploader"
              action="/api/files/upload">
              <img v-if="form.logo" :src="form.logo" class="avatar">
              <i v-else style="background-color: #d9d9d9" class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item label="店铺图片" prop="image">
            <el-upload
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
              style="width: 400px;"
              class="upload-demo"
              action="/api/files/upload"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 35%;" @click="onSubmit('form')">注册</el-button>
            <el-button style="width: 35%;" onclick="javascript:window.location='/'">取消</el-button>
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
import myheader from "@/layouts/myheader"
import areaApi from "~/api/user/area";
import shopApi from "~/api/user/shop";
import cookie from "js-cookie";
export default {
  components:{
    myfooter,myheader
  },
  // 定义变量和初始值
  data() {
    return {
      isUpload: false,
      fileList: [],
      provinceList: [],
      cityList: [],
      areaList: [],
      provinceCode: '',
      cityCode: '',
      form: {
        account: '', // 账号
        password: '', // 密码
        shopName: '', // 店铺名
        logo: '', // 店铺logo
        introduce: '', // 店铺简介
        autograph: '', // 服务宣言
        province: '', // 省份
        city: '', // 市
        area: '', // 区
        address: '', // 详细地址
        lng: '', // 经度
        lat: '', // 纬度
        shopId: '', // 店铺id
        data: '', // logo图片的id
        images: [] // 店铺图片的id集合
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
        shopName: [
          { required: true, message: '请输入店铺名', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ],
        autograph: [
          { required: true, message: '请填写服务宣言', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ],
        lng: [
          { required: true, message: '请填写店铺的经纬度', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传店铺logo' }
        ],
        image: [
          { required: true, message: '请上传店铺图片' }
        ],
        introduce: [
          { required: true, message: '请填写店铺简介', trigger: 'blur' }
        ]
      }
    }
  },
  // 在页面渲染之前执行
  created() {
    this.getProvinceList()
  },
  methods: {
    // 获取各省的数据
    getProvinceList() {
      areaApi.getAreaChild(100000)
        .then(response => {
          this.provinceList = response.data
          this.provinceList.unshift('')
        })
    },
    // 获取各市的数据
    provinceChanged() {
      if (this.code.provinceCode !== '') {
        this.cityList = []
        this.areaList = []
        this.code.cityCode = ''
        this.code.areaCode = ''
        areaApi.getAreaChild(this.code.provinceCode)
          .then(response => {
            this.cityList = response.data
            this.cityList.unshift('')
          })
      }
    },
    // 获取各县的数据
    cityChanged() {
      if (this.code.cityCode !== '') {
        this.areaList = []
        this.code.areaCode = ''
        areaApi.getAreaChild(this.code.cityCode)
          .then(response => {
            this.areaList = response.data
            this.areaList.unshift('')
          })
      }
    },
    // 提交数据创建用户信息
    onSubmit(form) {
      this.rules.logo = [{ required: true, message: '请上传店铺logo' }]
      if (this.isUpload) {
        this.rules.logo = []
      }
      this.rules.image = [{ required: true, message: '请上传店铺图片' }]
      if (this.form.images.length > 0) {
        this.rules.image = []
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          const shop = {
            account : this.form.account,
            password : this.form.password
          }
          shopApi.shopRegister(shop)
            .then(response => {
              const images = this.form.images.join(',')
              const token = response.data.token
              const info = {
                shopName: this.form.shopName, // 店铺名
                logo: this.form.data, // 店铺logo
                introduce: this.form.introduce, // 店铺简介
                declaration: this.form.autograph, // 服务宣言
                province: this.form.province, // 省份
                city: this.form.city, // 市
                area: this.form.area, // 区
                address: this.form.address, // 详细地址
                lng: this.form.lng, // 经度
                lat: this.form.lat, // 纬度
                shopId: response.data.shopId, // 店铺id
                images: images // 店铺图片的id集合
              }
              shopApi.infoCreate(info)
                .then(response => {
                  cookie.set('token', token, { domain: 'localhost' })
                  cookie.set('data', info, { domain: 'localhost' })
                  cookie.set('role','shop',{ domain: 'localhost' })
                  window.location.href = '/shop'
                })
                .catch(error => {
                  console.log(error)
                })
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上传图片后显示图片
    handleAvatarSuccess(res) {
      this.form.logo = '/api/files/view/' + res.data
      this.form.data = res.data
      this.isUpload = true
    },
    // 验证图片大小
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleSuccess(res) {
      this.form.images.push(res.data)
    },
    handleRemove(file) {
      this.form.images.pop(file.response.data)
    },

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

