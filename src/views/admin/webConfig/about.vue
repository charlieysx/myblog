<template>
  <div id="web-config-about">
    <div class="header-wrap">
      编辑“关于我”页面
      <div class="action-btn-wrap">
        <span @click="commit">更新</span>
      </div>
    </div>
    <div class="edit-wrap">
      <mavon-editor class="editor"
        v-model="value"
        ref=md
        @imgAdd="$imgAdd"
        :boxShadow="false"
        defaultOpen="preview"
        :toolbars="{
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: false, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          navigation: false, // 导航目录
          alignleft: false, // 左对齐
          aligncenter: false, // 居中
          alignright: false, // 右对齐
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }"/>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { markdown } from 'UTIL/markdown'

export default {
  name: 'web-config-about',
  components: {
    mavonEditor
  },
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.getAboutMe()
      .then((data) => {
        this.value = data.md
      })
      .catch(()=> {})
  },
  methods: {
    ...mapActions([
      'getQiniuToken',
      'uploadToQiniu',
      'getAboutMe',
      'modifyAboutMe'
    ]),
    $imgAdd(pos, $file) {
      this.getQiniuToken(true)
        .then((data) => {
          let formParams = new FormData()
          formParams.append('token', data.token)
          formParams.append('file', $file)
          this.startUploadImg(formParams, pos)
        })
        .catch((err) => {
          this.$toast(err.msg, 'error')
        })
    },
    startUploadImg (formParams, pos) {
      this.uploadToQiniu(formParams)
        .then((qiniuData) => {
          this.$refs.md.$img2Url(pos, qiniuData.imgUrl)
        })
        .catch((err) => {
          this.$toast('上传失败', 'error')
        })
    },
    uploadSuccess(url) {
      this.params.imageUrl = url
    },
    markdownHtml(str) {
      return markdown(str)
    },
    commit() {
      const loading = this.$loading({
        lock: true,
        text: '',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let html = this.markdownHtml(this.value)
      this.modifyAboutMe({
          aboutMeContent: this.value,
          htmlContent: html
        })
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
#web-config-about
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
    padding: 30px 10px
    padding-top: 10px
    animation: show .8s
    .editor
      min-width: calc(100% - 310px)
      height: calc(100vh - 80px)


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

<style lang="stylus">
.v-note-wrapper
  z-index: 1 !important
[type="button"]
  -webkit-appearance: none
</style>