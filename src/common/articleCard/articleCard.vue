<template>
  <div id="article-card">
    <div class="article-card-wrap">
      <div class="article-cover"
        :style="{
          backgroundImage: 'url(' + getCover + ')'
        }">
        <div class="article-title">
          <span @click="showArticle">{{ article.title }}</span>
        </div>
      </div>
      <div class="article-info">
        <i class="iconfont icon-calendar"></i>
        <span class="info-item">发表于 {{ article.publishTime }}</span>
        <span class="line">|</span>
        <i class="iconfont icon-folder"></i>
        <span class="info-item">分类于 <span class="classify" @click="toList('category', article.classify)">{{ article.classify.name }}</span></span>
      </div>
      <div class="article-sub-message">{{ article.subMessage }}</div>
      <div class="read-more" @click="showArticle">阅读全文 >></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'article-card',
  props: ['article'],
  data () {
    return {
      defaultCover: 'http://img1.imgtn.bdimg.com/it/u=3249428919,1915053740&fm=200&gp=0.jpg'
    }
  },
  computed: {
    getCover () {
      if (this.article && this.article.cover) {
        return this.article.cover
      }
      return this.defaultCover
    }
  },
  methods: {
    showArticle () {
      this.$router.push({
        name: 'article',
        params: {
          articleId: '1'
        }
      })
    },
    toList (type, item) {
      this.$router.push({
        name: 'articleList',
        params: {
          type: type,
          itemId: '111'
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#article-card
  position: relative
  background-color: $color-white
  padding: 20px
  margin-bottom: 40px
  &:last-child
    margin-bottom: 0px
  box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
  min-height: 603px
  @media (max-width: 768px)
    min-height: 285.5px
    padding: 10px
  line-height: 1.2
  .article-card-wrap
    position: relative
    animation: show .8s
    .article-cover
      position: relative
      width: 100%
      background-position: center
      background-size: cover
      &:before
        top: 0
        left: 0
        width: 100%
        padding-top: 50%
        content: ' '
        background: rgba(0, 0, 0, .5)
        display: block
      .article-title
        position: absolute
        font-size: 24px
        width: 100%
        height: 100%
        top: 0
        left: 0
        @media (max-width: 768px)
          font-size: 18px
        font-weight: bold
        color: $color-white
        display: flex
        align-items: center
        justify-content: center
        padding: 10px
        span
          position: relative
          cursor: pointer
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
          &:after
            content: ""
            position: absolute
            bottom: 0px
            left: 0
            width: 100%
            height: 2px
            background-color: $color-white
            visibility: hidden
            transform: scaleX(0)
            transition-duration: .2s
            transition-timing-function: ease
          &:hover
            &:after
              visibility: visible
              transform: scaleX(1)
              transition-duration: .2s
              transition-timing-function: ease

    .article-info
      font-size: 14px
      @media (max-width: 768px)
        font-size: 12px
      margin: 20px 0px
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
      font-size: 16px
      @media (max-width: 768px)
        font-size: 14px
      margin-bottom: 20px
    .read-more
      position: relative
      display: inline-block
      font-size: 14px
      @media (max-width: 768px)
        font-size: 12px
      margin-bottom: 10px
      cursor: pointer
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
      &:after
        content: ""
        position: absolute
        bottom: -2px
        left: 0
        width: 100%
        height: 1px
        background-color: $color-main
        visibility: visible
        transform: scaleX(1)
        transition-duration: .2s
        transition-timing-function: ease
      &:hover
        &:after
          visibility: hidden
          transform: scaleX(0)
          transition-duration: .2s
          transition-timing-function: ease

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
