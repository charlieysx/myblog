<template>
  <div id="login">
    <div class="login-wrap">
      <h1 class="login-title">博客系统-后台管理</h1>
      <div class="login-form-wrap">
        <el-form :model="loginForm"
                :rules="loginRules"
                ref="loginForm">
          <el-form-item prop="username">
            <el-input type="text"
                      :maxlength="11"
                      placeholder="请输入用户名"
                      v-model="loginForm.username">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"
                      :maxlength="16"
                      placeholder="请输入密码"
                      v-model="loginForm.password">
          </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                      @click="submitForm"
                      :class="{'disabled': btnDisabled}">
                      立即登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '未填写密码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '未填写密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      },
      message: ''
    }
  },
  computed: {
    ...mapGetters([
      'adminInfo'
    ]),
    btnDisabled () {
      return this.loginForm.username === '' ||
            this.loginForm.password === '' ||
            this.loginForm.password.length < 6
    }
  },
  mounted () {
    if (this.adminInfo) {
      this.loginForm.username = this.adminInfo.userName
    }
  },
  methods: {
    ...mapActions([
      'adminLogin'
    ]),
    submitForm () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let loginFormParams = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          this.adminLogin(loginFormParams)
            .then((info) => {
              window.location.reload()
            })
            .catch((err) => {
              this.$toast(err.msg, 'error')
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#login
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 2000
  background-color: $color-white
  background-position: center
  background-size: cover
  background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531830187560&di=7b8aa98324e4bef84b772c236b9bf321&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-12-02%2F5a224e304cc4f.jpg')
  .login-wrap
    position: relative
    background-color: $color-white
    padding: 20px
    border-radius: 10px
    max-width: 460px
    margin: 20px auto
    line-height: 1
    top: 50%
    transform: translateY(-50%)
    .login-title
      font-size: 36px
      color: $color-main
      text-align: center
      margin-top: 20px
      margin-bottom: 30px
      @media (max-width: 759px)
        font-size: 20px
    .login-form-wrap
      margin: 0px auto
    .el-button
      width: 100%
      height: 40px
      font-size: 16px
      border-radius: 5px
      border: none
      background-color: $color-main
      transition: all .3s
      color: $color-white
      &:hover
        background-color: lighten($color-main, 20%)
      &.disabled
        border: none
        background-color: #e5e5e5
        &:hover
          background-color: #e5e5e5
</style>