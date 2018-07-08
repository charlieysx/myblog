<template>
  <div id="article-card">
    <div class="article-card-wrap">
      <div class="article-title">{{ article.title }}</div>
      <div class="article-info">
        <i class="iconfont icon-calendar"></i>
        <span class="info-item">发表于 {{ article.publishTime }}</span>
        <span class="line">|</span>
        <i class="iconfont icon-folder"></i>
        <span class="info-item">分类于 <span class="classify">{{ article.classify.name }}</span></span>
      </div>
      <div class="article-sub-message">{{ article.subMessage }}</div>
      <div class="read-more">阅读全文 >></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'article-card',
  props: ['article'],
  data () {
    return {
    }
  },
  methods: {
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
  min-height: 182px
  @media (max-width: 768px)
    min-height: 174px
    padding: 10px
  line-height: 1.2
  .article-card-wrap
    animation: show .8s
    .article-title
      position: relative
      margin-top: 10px
      margin-bottom: 20px
      font-size: 26px
      @media (max-width: 768px)
        font-size: 20px
      font-weight: bold
      display: inline-block
      cursor: pointer
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
      &:after
        content: ""
        position: absolute
        bottom: 0
        left: 0
        width: 100%
        height: 2px
        background-color: $color-main
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
      margin-bottom: 20px
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
