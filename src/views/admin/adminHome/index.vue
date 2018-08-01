<template>
  <div id="admin-home">
    <p>首页</p>
    <div class="card-wrap">
      <icon-card 
        v-for="(item, index) in messageCards"
        :key="index"
        :backgroundColor="item.backgroundColor"
        :icon="item.icon"
        :topMessage="item.topMessage"
        :middleMessage="item.middleMessage"
        :bottomMessage="item.bottomMessage"
        :to="item.to" />
    </div>
    <div class="card-wrap">
      <message-card title="最新文章">
        <div slot="content">
          <div class="article-content" v-for="(article, index) in newestArticleList" :key="index">
            <span class="article-title" @click="$router.push({name: 'articlePreview', query:{id: article.id}})">{{ article.title }}</span>
            <span class="time"><i class="iconfont icon-calendar"></i>{{ article.publishTime | time }}</span>
          </div>
          <p class="more" @click="$router.push({name: 'articleManage'})">更多</p>
        </div>
      </message-card>
      <message-card title="系统日志">
        <div slot="content">
          <div class="log-content" v-for="(log, index) in sysLogList" :key="index">
            <p>ip地址: {{ log.ip }}</p>
            {{ log.time | time }} => {{ log.content }}
          </div>
          <p class="more-log">
            <span v-if="logParams.page > 0 && !loadLogMore" @click="getLog(logParams.page - 1)">上一页</span>
            <span v-if="hadMoreLog && !loadLogMore" @click="getLog(logParams.page + 1)">下一页</span>
          </p>
        </div>
      </message-card>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import iconCard from 'VIEWS/admin/adminHome/iconCard'
import messageCard from 'VIEWS/admin/adminHome/messageCard'

export default {
  name: 'admin-home',
  components: {
    iconCard,
    messageCard
  },
  data () {
    return {
      messageCards: [
        {
          backgroundColor: '#29b6f6',
          icon: 'icon-article',
          topMessage: '共发表了',
          middleMessage: '0',
          bottomMessage: '篇文章',
          to: 'articleManage'
        },
        {
          backgroundColor: '#7e57c2',
          icon: 'icon-drafts',
          topMessage: '草稿箱共有',
          middleMessage: '0',
          bottomMessage: '篇文章',
          to: 'articleDrafts'
        },
        {
          backgroundColor: '#33b86c',
          icon: 'icon-deleted',
          topMessage: '垃圾箱共有',
          middleMessage: '0',
          bottomMessage: '篇文章',
          to: 'articleDeleted'
        },
        {
          backgroundColor: '#6e8cd7',
          icon: 'icon-tag',
          topMessage: '共有',
          middleMessage: '0',
          bottomMessage: '个分类/标签',
          to: 'adminCategories'
        },
        {
          backgroundColor: '#E6A23C',
          icon: 'icon-comments',
          topMessage: '共有',
          middleMessage: '0',
          bottomMessage: '条评论',
          to: 'adminComments'
        }
      ],
      newestArticleList: [
      ],
      sysLogList: [
      ],
      logParams: {
        page: 0,
        pageSize: 8
      },
      hadMoreLog: false,
      loadLogMore: false
    }
  },
  created() {
    this.getHomeStatistics()
      .then((data) => {
        this.messageCards[0].middleMessage = data.publishCount
        this.messageCards[1].middleMessage = data.draftsCount
        this.messageCards[2].middleMessage = data.deletedCount
        this.messageCards[3].middleMessage = data.categoryCount + '/' + data.tagCount
        this.messageCards[4].middleMessage = data.commentsCount
      })
      .catch(()=> {})
    this.getLog(0)
    this.getArticleList({
        by: 'status',
        status: '0',
        page: 0,
        pageSize: 10
      })
      .then((data) => {
        this.newestArticleList = data.list
      })
      .catch(()=> {})
  },
  methods: {
    ...mapActions([
      'getHomeStatistics',
      'getSysLog',
      'getArticleList'
    ]),
    getLog(page) {
      this.logParams.page = page
      this.loadLogMore = true
      this.getSysLog(this.logParams)
        .then((data) => {
          this.loadLogMore = false
          this.hadMoreLog = (parseInt(data.page) + 1) * parseInt(data.pageSize) < data.count
          this.sysLogList = data.list
        })
        .catch(()=> {
          this.loadLogMore = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#admin-home
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
  .card-wrap
    position: relative
    animation: show .8s
    margin: 10px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    align-items: flex-start
    .article-content
      padding: 15px 10px
      margin: 0px 10px
      border: 1px solid #eeeeee
      border-top: 0px
      @media (max-width: 759px)
        font-size: 12px
        padding: 10px
      font-size: 14px
      color: #555555
      position: relative
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      &:first-child
        margin-top: 10px
        border-top: 1px solid #eeeeee
      .article-title
        position: relative
        cursor: pointer
        flex: 1
        padding-bottom: 2px
        single-text-ellipsis()
        transition: color .3s
        &:hover
          color: #29b6f6
      .time
        color: #999999
        margin-left: 10px
        .iconfont
          font-size: 14px
          margin-right: 5px
    .log-content
      padding: 15px 10px
      margin: 0px 10px
      border: 1px solid #eeeeee
      border-top: 0px
      font-size: 14px
      color: #555555
      @media (max-width: 759px)
        font-size: 12px
        padding: 10px
      &:first-child
        margin-top: 10px
        border-top: 1px solid #eeeeee
      &:last-child
        margin-bottom: 10px
      > p
        margin-bottom: 3px
    .more
      padding: 10px
      margin-top: 10px
      text-align: center
      font-size: 14px
      @media (max-width: 759px)
        font-size: 12px
      color: #555555
      background-color: #f9f9f9
      cursor: pointer
      transition: all .3s
      &:hover
        background-color: $color-main
        color: $color-white
    .more-log
      margin-top: 10px
      text-align: center
      font-size: 14px
      display: flex
      flex-direction: row
      @media (max-width: 759px)
        font-size: 12px
      > span
        color: #555555
        background-color: #f9f9f9
        cursor: pointer
        padding: 10px
        flex: 1
        transition: all .3s
        &:hover
          background-color: $color-main
          color: $color-white
        


@keyframes show {
  from {
    margin-top: 0px;
    opacity: 0;
  }
  to {
    margin-top: 10px;
    opacity: 1;
  }
}
</style>
