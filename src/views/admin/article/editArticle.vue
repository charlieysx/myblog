<template>
  <div id="edit-article">
    <p>编辑文章</p>
    <div class="edit-wrap">
      <mavon-editor class="editor"
        v-model="value"
        ref=md
        @imgAdd="$imgAdd"
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

export default {
  name: 'edit-article',
  components: {
    mavonEditor
  },
  data () {
    return {
      value: `### 一、前言

>本来想做个微信小程序，实现一键生成海报图片（可替换文字、图片，不需要用户排版），所以后台管理系统上需要实现一个制作海报模板的功能（“简单版ps”），写了挺长时间的，逻辑太多了，现在写得差不多了，但是由于各种事情项目一直没有进展，估计是没能做完了，所以把这个“简单版ps”开源出来。

### 二、界面

![](https://user-gold-cdn.xitu.io/2018/6/13/163f7dea6cd6e2af?w=1919&h=958&f=jpeg&s=86423)
![](https://user-gold-cdn.xitu.io/2018/6/13/163f7dee7b1c62f6?w=1919&h=959&f=jpeg&s=273501)

### 三、动态效果图

![](https://user-gold-cdn.xitu.io/2018/6/13/163f7e2439b9e35b?w=1220&h=832&f=gif&s=4549591)

### 四、测试代码高亮

\`\`\`js
import Hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      Hljs.highlightBlock(block)
    })
  })
}
export default Highlight
\`\`\`
`
    }
  },
  created() {
  },
  methods: {
    ...mapActions([
      'getQiniuToken',
      'uploadToQiniu'
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
          this.error(err.msg)
        })
    },
    startUploadImg (formParams, pos) {
      this.uploadToQiniu(formParams)
        .then((qiniuData) => {
          this.$refs.md.$img2Url(pos, qiniuData.imgUrl)
        })
        .catch((err) => {
          this.error('上传失败')
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
#edit-article
  position: relative
  padding-top: 52px
  > p
    position: fixed
    width: 100%
    top: 0
    padding: 18px
    font-size: 16px
    font-weight: bold
    background-color: $color-white
    box-shadow: 1px 1px 10px 1px rgba(38, 42, 48, .1)
    z-index: 1000
  .edit-wrap
    padding: 30px 10px
    animation: show .8s
    .editor
      min-width: calc(100% - 84px)
      height: calc(100vh - 112px)


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
  z-index: 900 !important
[type="button"]
  -webkit-appearance: none
</style>
