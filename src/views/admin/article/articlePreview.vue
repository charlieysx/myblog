<template>
  <div id="article-preview">
    <p><span @click="$router.go(-1)" style="margin-right: 20px;cursor: pointer;font-size: 14px"><i class="el-icon-arrow-left"></i>返回</span>文章预览</p>
    <div class="article-preview-wrap">
      <div class="article-warp" v-if="article.id">
        <div class="article-message">
          <p class="article-title">
            {{ article.title }}
          </p>
          <div class="article-info" v-if="article.status === '0'">
            <span class="info">
              <i class="iconfont icon-calendar"></i>
              <span class="info-item">发表于 {{ article.publishTime | time }}</span>
            </span>
            <span class="line">|</span>
            <span class="info">
              <i class="iconfont icon-folder"></i>
              <span class="info-item">分类于 
                <span class="classify" @click="$router.push({name: 'adminArticleList', query:{type: 'category', id: category.id}})">
                  {{ category.name }}
                </span>
              </span>
            </span>
          </div>
          <div class="article-sub-message">{{ article.subMessage }}</div>
        </div>
        <md-preview :contents="article.htmlContent" />
        <div class="tags">
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="tag"
             @click="$router.push({name: 'adminArticleList', query:{type: 'tag', id: tag.id}})">
            <i class="iconfont icon-tag"></i>
            {{ tag.name }}
          </div>
        </div>
        <comments :id="article.id" />
      </div>
      <no-data
        v-if="!article.id"
        text="没有找到该文章~"/>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import mdPreview from 'COMMON/mdPreview/mdPreview'
import noData from 'COMMON/noData/noData'
import comments from 'COMMON/comments/comments'

export default {
  name: 'article-preview',
  components: {
    mdPreview,
    noData,
    comments
  },
  data () {
    return {
      article: {},
      category: {},
      tags: []
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.getArticle(id)
        .then((data) => {
          this.article = data.article
          this.category = data.category
          this.tags = data.tags
        })
        .catch((err)=> {console.log(err)})
    }
  },
  methods: {
    ...mapActions([
      'getArticle'
    ])
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
          justify-content: center
          align-items: flex-end
          flex-wrap: wrap
          .line
            margin-bottom: 4px
            @media (max-width: 460px)
              display: none
          .info
            margin-bottom: 4px
            margin-left: 4px
            margin-right: 4px
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
