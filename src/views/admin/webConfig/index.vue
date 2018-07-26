<template>
  <div id="web-config">
    <div class="header-wrap">
      网站基本信息配置
      <div class="action-btn-wrap">
        <span @click="commit">提交</span>
      </div>
    </div>
    <div class="edit-wrap">
      <UP class="upload-cover" 
        :default-img="params.avatar"
        ratio="1"
        WHRatio="1"
        maxWidth="100"
        maxHeight="100"
        tip="上传头像"
        maxSize="2"
        @uploadSuccess="uploadAvatar"></UP>
      <el-input
        class="input-title"
        size="mini"
        v-model="params.blogName"
        placeholder="请输入网站名称">
        <template slot="prepend">网站名称</template>
      </el-input>
      <el-input
        class="input-title"
        size="mini"
        v-model="params.github"
        placeholder="请输入github地址">
        <template slot="prepend">github</template>
      </el-input>
      <el-input
        class="input-title"
        type="textarea"
        size="mini"
        :rows="6"
        :maxlength="150"
        resize="none"
        v-model="params.sign"
        placeholder="请输入个性签名">
      </el-input>
      <div class="label-wrap">
        设置阅读密码：
        <el-checkbox size="mini" v-model="params.settingPassword"></el-checkbox>
      </div>
      <el-input
        class="input-title"
        size="mini"
        type="password"
        v-if="params.settingPassword && hadOldPassword"
        v-model="params.oldPassword"
        placeholder="请输入原密码">
        <template slot="prepend">原密码</template>
      </el-input>
      <el-input
        class="input-title"
        size="mini"
        type="password"
        v-if="params.settingPassword"
        v-model="params.viewPassword"
        placeholder="请输入新密码">
        <template slot="prepend">新密码</template>
      </el-input>
      <el-input
        class="input-title"
        size="mini"
        type="password"
        v-if="params.settingPassword"
        v-model="newPassword"
        placeholder="请再次输入新密码">
        <template slot="prepend">新密码</template>
      </el-input>
      <UP class="upload-cover" 
        :default-img="params.wxpayQrcode"
        ratio="1"
        WHRatio="1"
        maxWidth="100"
        maxHeight="100"
        tip="上传微信二维码"
        maxSize="2"
        @uploadSuccess="uploadWxpayQrcode"></UP>
      <UP class="upload-cover" 
        :default-img="params.alipayQrcode"
        ratio="1"
        WHRatio="1"
        maxWidth="100"
        maxHeight="100"
        tip="上传支付宝二维码"
        maxSize="2"
        @uploadSuccess="uploadAlipayQrcode"></UP>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import UP from 'COMMON/upload/upCover.vue'

export default {
  name: 'web-config',
  components: {
    UP
  },
  data () {
    return {
      params: {
        blogName: '',
        avatar: '',
        sign: '',
        wxpayQrcode: '',
        alipayQrcode: '',
        github: '',
        sign: '',
        settingPassword: false,
        viewPassword: '',
        oldPassword: ''
      },
      newPassword: '',
      hadOldPassword: false
    }
  },
  created () {
    this.getBlogConfig()
      .then((data) => {
        if (data) {
          this.hadOldPassword = data.hadOldPassword
          this.params = data
          delete this.params['hadOldPassword']
        }
      })
      .catch(()=> {})
  },
  methods: {
    ...mapActions([
      'getBlogConfig',
      'modifyBlogConfig'
    ]),
    uploadAvatar(url) {
      this.params.avatar = url
    },
    uploadWxpayQrcode(url) {
      this.params.wxpayQrcode = url
    },
    uploadAlipayQrcode(url) {
      this.params.alipayQrcode = url
    },
    commit() {
      if (this.params.settingPassword) {
        if (this.params.viewPassword.length < 6) {
          this.$toast('密码不能小于6位', 'error')
          return
        } else if (this.params.viewPassword !== this.newPassword) {
          this.$toast('两个新密码不匹配', 'error')
          return
        }
      }
      const loading = this.$loading({
        lock: true,
        text: '',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.modifyBlogConfig(this.params)
        .then((data) => {
          loading.close()
          this.$toast('已更新')
        })
        .catch((err) => {
          loading.close()
          this.$toast(err.msg, 'error')
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#web-config
  position: relative
  padding-top: 52px
  .header-wrap
    position: absolute
    width: 100%
    top: 0
    padding: 18px
    font-size: 16px
    font-weight: bold
    background-color: $color-white
    box-shadow: 1px 1px 10px 1px rgba(38, 42, 48, .1)
    z-index: 1000
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .action-btn-wrap
      > span
        padding: 5px 10px
        margin-right: 5px
        font-size: 14px
        cursor: pointer
        background-color: $color-main
        color: $color-white
        border-radius: 8px
        &:hover
          background-color: lighten($color-main, 10%)
        &:last-child
          margin-right: 0px
  .edit-wrap
    animation: show .8s
    padding: 10px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    max-width: 400px
    margin: 0 auto
    border: 1px solid #eeeeee
    justify-content: center
    .upload-cover
      margin-bottom: 10px
      margin-right: 10px
    .input-title
      margin-bottom: 10px
    .label-wrap
      color: #606266
      font-size: 14px
      width: 100%
      margin-bottom: 10px


@keyframes show {
  from {
    margin-top: -10px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
</style>
