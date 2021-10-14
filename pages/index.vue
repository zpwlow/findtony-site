<template>
  <div id="main">
    <myheader/>
    <div class="main-container">
      <el-scrollbar class='page-component__scroll'>
    <div class="login-container">
      <el-tabs stretch  class="login-form" v-model="activeName" type="border-card" >
        <el-tab-pane  name="user" label="用户登录">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            style="width:100%"
            auto-complete="on"
            label-position="left">
            <el-form-item prop="account">
                      <span class="svg-container">
                        <svg-icon icon-class="user" />
                      </span>
              <el-input v-model="loginForm.account" name="account"
                        type="text" auto-complete="on" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item prop="password">
                      <span class="svg-container">
                        <svg-icon icon-class="password" />
                        </span>
              <el-input
                :type="pwdType"
                v-model="loginForm.password"
                name="password"
                auto-complete="on"
                placeholder="请输入密码"
                @keyup.enter.native="userHandleLogin" show-password/>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" style="width:100%" @click.native.prevent="userHandleLogin">
                登录
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-button type="success" style="width:30%;float: left" round
                           onclick="javascript:window.location='/login/userRegister'">注册</el-button>
                <el-button type="warning" style="width:30%;float: right;" round
                           onclick="javascript:window.location='/login/userUpdate'">忘记密码</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane name="shop" label="店铺登录">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            style="width:100%"
            auto-complete="on"
            label-position="left">
            <el-form-item prop="account">
                    <span class="svg-container">
                      <svg-icon icon-class="user" />
                    </span>
              <el-input v-model="loginForm.account" name="account"
                        type="text" auto-complete="on" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item prop="password">
                    <span class="svg-container">
                      <svg-icon icon-class="password" />
                      </span>
              <el-input
                :type="pwdType"
                v-model="loginForm.password"
                name="password"
                auto-complete="on"
                placeholder="请输入密码"
                @keyup.enter.native="shopHandleLogin" show-password/>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" style="width:100%" @click.native.prevent="shopHandleLogin">
                登录
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-row>
                <el-button type="success" style="width:30%;float: left" round onclick="javascript:window.location='/login/shopRegister'">注册</el-button>
                <el-button type="warning" style="width:30%;float: right;" round onclick="javascript:window.location='/login/shopUpdate'">忘记密码</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
import userApi from "@/api/user/user";
import shopApi from "@/api/user/shop";
import myheader from "@/layouts/myheader";

export default {
  components:{
    myheader
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'user',
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getUser()
  },

  methods: {
    async getUser() {
      const  role = cookie.get('role')
      if (role === 'user') {
        window.location.href = '/user'
      }else if(role === 'shop'){
        window.location.href = '/shop'
      }
    },
    userHandleLogin() {
      userApi.login(this.loginForm).then(response => {
        const info = response.data.data
        const data = JSON.stringify(info)
        this.setCookies(data,info.userId, response.data.token,'user')
        window.location.href = '/user'
      })
    },
    shopHandleLogin() {
      shopApi.login(this.loginForm).then(response => {
        const info = response.data.data
        const data = JSON.stringify(info)
        this.setCookies(data,info.shopId,response.data.token,'shop')
        window.location.href = '/shop'
      })
    },
    setCookies(data,userId, token,role) {
      cookie.set('token', token, { domain: 'localhost' })
      cookie.set('data', data, { domain: 'localhost' })
      cookie.set('userId', userId, { domain: 'localhost' })
      cookie.set('role',role,{ domain: 'localhost' })
      window.location.reload()
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
  }

}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  background:url("../assets/images/login.jpg");
  width:100%;			//大小设置为100%
  height:100%;			//大小设置为100%
  position:fixed;
  background-size:100% 100%;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 540px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    border:1px dashed #000
  }

}
</style>

