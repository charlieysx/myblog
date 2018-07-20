<template>
  <div id="article-preview">
    <p><span @click="$router.go(-1)" style="margin-right: 20px;cursor: pointer;font-size: 14px"><i class="el-icon-arrow-left"></i>返回</span>文章预览</p>
    <div class="article-preview-wrap">
      <div class="article-warp">
        <div class="article-message">
          <p class="article-title">
            {{ article.title }}
          </p>
          <div class="article-info">
            <i class="iconfont icon-calendar"></i>
            <span class="info-item">发表于 {{ article.publishTime }}</span>
            <span class="line">|</span>
            <i class="iconfont icon-folder"></i>
            <span class="info-item">分类于 <span class="classify">{{ article.classify.name }}</span></span>
          </div>
          <div class="article-sub-message">{{ article.subMessage }}</div>
        </div>
        <md-preview :contents="article.contents" />
        <div class="tags">
          <div
            v-for="(tag, index) in article.tags"
            :key="index"
            class="tag">
            <i class="iconfont icon-tag"></i>
            {{ tag.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import mdPreview from 'COMMON/mdPreview/mdPreview'

export default {
  name: 'article-preview',
  components: {
    mdPreview
  },
  data () {
    return {
      article: {
        title: '用Vue实现海报排版设计功能',
        publishTime: '2018-07-08',
        classify: {
          id: 0,
          name: 'vue'
        },
        subMessage: '这是文章简介',
        tags: [
          {
            name: 'vue'
          },
          {
            name: '设计'
          }
        ],
        contents: `### 一、前言

>本来想做个微信小程序，实现一键生成海报图片（可替换文字、图片，不需要用户排版），所以后台管理系统上需要实现一个制作海报模板的功能（“简单版ps”），写了挺长时间的，逻辑太多了，现在写得差不多了，但是由于各种事情项目一直没有进展，估计是没能做完了，所以把这个“简单版ps”开源出来。

### 二、界面

![](https://user-gold-cdn.xitu.io/2018/6/13/163f7dea6cd6e2af?w=1919&h=958&f=jpeg&s=86423)
![](https://user-gold-cdn.xitu.io/2018/6/13/163f7dee7b1c62f6?w=1919&h=959&f=jpeg&s=273501)

### 三、动态效果图

![](https://user-gold-cdn.xitu.io/2018/6/13/163f7e2439b9e35b?w=1220&h=832&f=gif&s=4549591)

### 四、测试代码高亮

\`\`\`javascript
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
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#article-preview
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
  .article-preview-wrap
    position: relative
    max-width: 1000px
    margin: 0 auto
    width: 100%
    padding: 30px 10px
    .article-warp
      position: relative
      animation: show .8s
      padding: 30px
      width: 100%
      @media (max-width: 768px)
        padding: 30px 15px
      background-color: $color-white
      box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
      .article-message
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        .article-title
          font-size: 26px
          @media (max-width: 768px)
            font-size: 22px
          font-weight: bold
        .article-info
          font-size: 14px
          @media (max-width: 768px)
            font-size: 12px
          margin: 10px 0px
          color: #999999
          display: flex
          flex-direction: row
          justify-content: flex-start
          align-items: flex-end
          .line
            margin: 0 8px
          .info-item
            .classify
              color: #666666
              border-bottom: 1px solid $color-main
              cursor: pointer
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
          .iconfont
            font-size: 14px
            @media (max-width: 768px)
              font-size: 12px
            margin-right: 5px
        .article-sub-message
          font-size: 14px
          color: #999999
          margin-bottom: 20px
    .tags
      width: 100%
      padding: 10px 0px
      display: flex
      flex-direction: row
      align-items: center
      flex-wrap: wrap
      border-bottom: 1px solid #eeeeee
      .tag
        color: $color-white
        padding: 5px
        background-color: $color-main
        font-size: 12px
        margin-right: 5px
        border-radius: 5px
        position: relative
        margin-left: 10px
        margin-top: 10px
        line-height: 1
        transition: all .3s
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        &:hover
          &:before
            border-right: 12px solid lighten($color-main, 10%)
          background-color: lighten($color-main, 10%)
        &:before
          position: absolute
          left: -9px
          top: 0
          width: 0
          height: 0
          content: ""
          border-top: 11px solid transparent
          border-bottom: 11px solid transparent
          border-right: 12px solid $color-main
          transition: all .3s
        .iconfont
          font-size: 12px


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
