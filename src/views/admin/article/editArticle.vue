<template>
  <div id="edit-article">
    <div class="header-wrap">
      编辑文章
      <div class="action-btn-wrap">
        <span @click="publish" v-if="canPublish">发布</span>
        <span @click="modify" v-if="canModify">提交</span>
        <span @click="save" v-if="canSave">保存</span>
      </div>
    </div>
    <div class="edit-wrap">
      <mavon-editor class="editor"
        v-model="article.content"
        ref=md
        @imgAdd="$imgAdd"
        :boxShadow="false"
        defaultOpen="edit"
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
      <div class="input-wrap">
        <div class="fix-input-wrap">
          <UP class="upload-cover" 
            :default-img="article.cover"
            ratio="2"
            WHRatio="2"
            maxWidth="300"
            maxHeight="150"
            tip="上传文章封面图"
            maxSize="2"
            @uploadSuccess="uploadSuccess"></UP>
          <el-input
            class="input-title"
            size="mini"
            v-model="article.title"
            placeholder="请输入文章标题">
          </el-input>
          <el-input
            class="input-title"
            type="textarea"
            size="mini"
            :rows="6"
            :maxlength="150"
            resize="none"
            v-model="article.subMessage"
            placeholder="请输入文章简介">
          </el-input>
          <div class="label-wrap">
            阅读加密：
            <el-checkbox size="mini" v-model="isEncrypt"></el-checkbox>
          </div>
          <div class="label-wrap">
            分类：
            <el-select
              v-model="category"
              filterable
              allow-create
              default-first-option
              size="mini"
              placeholder="请选择文章分类">
              <el-option
                v-for="item in categoryList"
                size="mini"
                :key="item.categoryId"
                :label="item.categoryName"
                :value="item.categoryName">
              </el-option>
            </el-select>
          </div>
          <div class="label-wrap">
            标签：
            <el-select
              v-model="tags"
              filterable
              allow-create
              default-first-option
              size="mini"
              multiple
              placeholder="请选择文章标签">
              <el-option
                v-for="item in tagList"
                size="mini"
                :key="item.tagId"
                :label="item.tagName"
                :value="item.tagName">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
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
import UP from 'COMMON/upload/upCover.vue'
import { markdown } from 'UTIL/markdown'

export default {
  name: 'edit-article',
  components: {
    mavonEditor,
    UP
  },
  data () {
    return {
      canPublish: false,
      canModify: false,
      canSave: false,
      isEncrypt: false,
      article: {
        content: '',
        title: '',
        cover: '',
        subMessage: '',
        isEncrypt: '0'
      },
      category: '',
      tags: [],
      categoryList: [],
      tagList: []
    }
  },
  created() {
    this.initData()
  },
  watch: {
    $route(route) {
      this.initData()
    }
  },
  methods: {
    ...mapActions([
      'getQiniuToken',
      'uploadToQiniu',
      'getArticle',
      'getCategoryList',
      'getTagList',
      'saveArticle',
      'publishArticle',
      'modifyArticle'
    ]),
    initData() {
      let id = this.$route.query.id
      this.canPublish = false,
      this.canModify = false,
      this.canSave = false,
      this.isEncrypt = false,
      this.article = {
        content: '',
        title: '',
        cover: '',
        subMessage: '',
        isEncrypt: '0'
      },
      this.category = '',
      this.tags = []
      if (id) {
        this.getArticle(id)
          .then((data) => {
            if (data.article.status === '0') {
              this.canModify = true
            } else {
              this.canPublish = true
              this.canSave = true
            }
            this.article = data.article
            this.isEncrypt = this.article.isEncrypt === '1'
            this.init(data.category, data.tags)
          })
          .catch(()=> {})
      } else {
        this.canPublish = true
        this.canSave = true
      }
      this.getCategoryList({all: true})
        .then((data) => {
          this.categoryList = data.list
        })
        .catch(()=> {})
      this.getTagList({all: true})
        .then((data) => {
          this.tagList = data.list
        })
        .catch(()=> {})
    },
    init(oldTategory, oldTags) {
      this.category = oldTategory.name
      oldTags.forEach(item => {
        this.tags.push(item.name)
      })
    },
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
    startUploadImg(formParams, pos) {
      this.uploadToQiniu(formParams)
        .then((qiniuData) => {
          this.$refs.md.$img2Url(pos, qiniuData.imgUrl)
        })
        .catch((err) => {
          this.$toast('上传失败', 'error')
        })
    },
    uploadSuccess(url) {
      this.article.cover = url
    },
    getCategory() {
      let category = this.categoryList.find(item => item.categoryName === this.category)
      if (category) {
        return {id: category.categoryId}
      } else {
        return {name: this.category}
      }
    },
    getTags() {
      let tags = []
      this.tags.forEach(value => {
        let tag = this.tagList.find(item => item.tagName === value)
        if (tag) {
          tags.push({id: tag.tagId})
        } else {
          tags.push({name: value})
        }
      })
      return tags
    },
    markdownHtml(str) {
      return markdown(str)
    },
    getParams() {
      let html = this.markdownHtml(this.article.content)
      let params = {
        title: this.article.title,
        cover: this.article.cover,
        subMessage: this.article.subMessage,
        isEncrypt: this.isEncrypt ? '1' : '0',
        content: this.article.content,
        htmlContent: html
      }
      params.category = this.getCategory()
      params.tags = this.getTags()
      if (this.article.id) {
        params.id = this.article.id
      }
      return params
    },
    publish() {
      let params = this.getParams()
      if (!params.title) {
          this.$toast('文章标题不能为空', 'error')
          return
      }
      if (!params.subMessage) {
          this.$toast('文章简介不能为空', 'error')
          return
      }
      if (!params.content) {
          this.$toast('文章内容不能为空', 'error')
          return
      }
      this.publishArticle(params)
        .then((data) => {
          this.$toast('已发布')
          this.updateRoute('articlePreview', data)
        })
        .catch((err) => {
          this.$toast(err.msg, 'error')
        })
    },
    save() {
      let params = this.getParams()
      this.saveArticle(params)
        .then((data) => {
          this.$toast('已保存')
          this.updateRoute('editArticle', data)
        })
        .catch((err) => {
          this.$toast(err.msg, 'error')
        })
    },
    modify() {
      let params = this.getParams()
      if (!params.id) {
          this.$toast('文章id不能为空', 'error')
          return
      }
      if (!params.title) {
          this.$toast('文章标题不能为空', 'error')
          return
      }
      if (!params.subMessage) {
          this.$toast('文章简介不能为空', 'error')
          return
      }
      if (!params.content) {
          this.$toast('文章内容不能为空', 'error')
          return
      }
      this.modifyArticle(params)
        .then((data) => {
          this.$toast('已更新')
        })
        .catch((err) => {
          this.$toast(err.msg, 'error')
        })
    },
    updateRoute(name, articleId) {
      this.$router.push({
        name: name,
        query: {
          id: articleId
        }
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
    display: flex
    flex-direction: row
    @media (max-width: 1324px)
      flex-direction: column-reverse
    .input-wrap
      position: relative
      width: 300px
      margin-left: 10px
      transition: all .3s
      @media (max-width: 1324px)
        width: 100%
        margin-left: 0px
        margin-bottom: 10px
      .fix-input-wrap
        position: relative
        width: 300px
        height: calc(100vh - 112px)
        transition: all .3s
        display: flex
        flex-direction: column
        align-items: center
        @media (max-width: 1324px)
          width: 100%
          height: auto
        .upload-cover
          margin-bottom: 10px
        .input-title
          margin-bottom: 10px
        .label-wrap
          color: #606266
          font-size: 14px
          width: 100%
          margin-bottom: 10px
          .el-select
            width: calc(100% - 46.7px) !important
    .editor
      min-width: calc(100% - 310px)
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
  z-index: 1 !important
[type="button"]
  -webkit-appearance: none
</style>
