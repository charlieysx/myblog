<template>
  <div id="article-card">
    <div class="article-card-wrap">
      <div class="article-title" @click="showArticle">
        {{ article.title }}
      </div>
      <div class="article-info">
        <i class="iconfont icon-calendar"></i>
        <span class="info-item">发表于 {{ article.publishTime }}</span>
      </div>
      <div class="article-sub-message">{{ article.subMessage }}</div>
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
</template>

<script>

export default {
  name: 'article-card',
  props: ['article'],
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    showArticle () {
      this.$router.push({
        name: 'article',
        params: {
          articleId: '1'
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
  min-height: 183px
  @media (max-width: 768px)
    min-height: 151px
    padding: 10px
  line-height: 1.2
  .article-card-wrap
    position: relative
    animation: show .8s
    .article-title
      position: relative
      display: inline-block
      font-size: 22px
      color: $color-main
      @media (max-width: 768px)
        font-size: 18px
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
      margin: 10px 0px
      color: #999999
      display: flex
      flex-direction: row
      justify-content: flex-start
      align-items: flex-end
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
      margin-bottom: 10px
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
        transition: all .3s
        position: relative
        margin-left: 10px
        line-height: 1
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
