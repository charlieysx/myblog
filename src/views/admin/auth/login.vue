<template>
  <div id="login">
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
                     @click="submitForm('loginForm')"
                     :disabled="btnDisabled">
                     立即登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import {
//   mapActions,
//   mapGetters
// } from 'vuex'

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
    // ...mapGetters([
    //   'username'
    // ]),
    btnDisabled () {
      return this.loginForm.username === '' ||
            this.loginForm.password === '' ||
            this.loginForm.password.length < 6
    }
  },
  mounted () {
    this.loginForm.username = this.username
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loginFormParams = {
            username: this.loginForm.username,
            password: this.loginForm.password
          }
          if (this.message) {
            this.message.close()
          }
          // this.login(loginFormParams)
          //   .then((info) => {
          //     window.location.reload()
          //   })
          //   .catch((err) => {
          //     this.error(err.data.msg)
          //   })
        } else {
          return false
        }
      })
    },
    error (err) {
      this.message = this.$message({
        showClose: true,
        message: err,
        type: 'error'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#login
  background-color: $color-white
  padding: 20px 0
  border-radius: 10px
  .login-title
    margin-top: 50px
    font-size: 38px
    color: $color-main
    text-align: center
  .login-form-wrap
    margin: 40px auto
    width: 400px
  .el-button
    width: 100%
    height: 40px
    font-size: 16px
    border-radius: 5px
    border: none
    background-color: $color-main
    transition: all .3s
    &.is-disabled
      border: none
      background-color: #e5e5e5
      color: $color-white
      &:hover
        background-color: #e5e5e5
        color: $color-white
</style>