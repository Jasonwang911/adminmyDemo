<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">中国手艺网后台管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
      </el-form-item>
      <!-- 验证码 -->
      <el-row class="clearfix">
        <el-form-item prop="smscode" class="fl"  style="width:50%">
          <el-input style="width:100%" name="smscode" type="text" v-model="loginForm.smscode" autoComplete="on" placeholder="请输入验证码" />
        </el-form-item>
        <div class="fr" @click="getSmsCode">
          <img style="height: 44px" :src="this.smscodeImg" alt="">
        </div>
      </el-row>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">立即登录</el-button>

      <!-- <div class="tips">
        <span>{{$t('login.username')}} : admin</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div>
      <div class="tips">
        <span style="margin-right:18px;">{{$t('login.username')}} : editor</span>
        <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
      </div> -->

      <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button> -->
    </el-form>

    <!-- <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{$t('login.thirdpartyTips')}}
      <br/>
      <br/>
      <br/>
      <social-sign />
    </el-dialog> -->

  </div>
</template>

<script>
import { loginApi } from '@/api/modules/user'
import { userBaseUrl } from '@/config/env'
import { isvalidUsername } from '@/utils/validate'
// import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'

export default {
  components: {  SocialSign },
  name: 'login',
  data() {
    return {
      smsSend: false,
      smscodeImg: `${userBaseUrl}/admin/captcha`,
      loginForm: {
        username: '',
        smscode: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15个字符', trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    // 获取验证码
    getSmsCode: function() {
      this.smscodeImg = `${userBaseUrl}/admin/captcha?time=${new Date().getTime()}`;
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      console.log(this.loginForm.username.trim(), this.loginForm.password.trim())
      loginApi({
        username: this.loginForm.username.trim(),
        password: this.loginForm.password.trim(),
        capkey: this.loginForm.smscode
      })
      .then( res => {
          if( res.code == '0') {
              this.$store.dispatch('StoreToken', res.data.token);
              // this.$get('/admin/user')
              // .then( response => {
              //     this.$store.commit('AM_STORE_USER_INFO', response.data);
              //     sessionStorage.setItem('userInfo', JSON.stringify(response.data) )
              //     this.$router.push({path: '/'});
              // })
              // .catch( error => {
              //     this.$notify.error({
              //       title: '错误',
              //       message: error
              //     });
              // })
          }else {
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
      })
      .catch(err => {
          this.$notify.error({
            title: '错误',
            message: '账号或密码错误'
          });
      })
      // this.$post('/auth', {username: this.loginForm.username.trim(),password: this.loginForm.password.trim(),code: this.loginForm.smscode})
      // .then(res => {
      //   if(res.code == '000000') {
      //       this.$store.dispatch('StoreToken', res.data);
      //       this.$get('/admin/user')
      //       .then(response => {
      //         if(reresponses.code == '000000') {
      //             this.$store.commit('AM_STORE_USER_INFO', response.data);
      //             this.$router.push({path: '/'});
      //         }else {
      //           this.$notify.error({
      //             title: '登录错误',
      //             message: res.msg
      //           });
      //         }

      //       })
      //       .catch( err => {
      //           this.$notify.error({
      //             title: '错误',
      //             message: err
      //           });
      //       })
      //   }else {
      //       this.$notify.error({
      //         title: '登录错误',
      //         message: res.msg
      //       });
      //   }

      // })
      // .catch(error => {
      //   alert(error)
      //     this.$notify.error({
      //       title: '登录错误',
      //       message: '账号或密码错误'
      //     });
      // })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
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
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
