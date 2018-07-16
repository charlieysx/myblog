<template>
  <div id="admin-home">
    <p>仪表盘</p>
    <div class="card-wrap">
      <icon-card 
        v-for="(item, index) in messageCards"
        :key="index"
        :backgroundColor="item.backgroundColor"
        :icon="item.icon"
        :topMessage="item.topMessage"
        :middleMessage="item.middleMessage"
        :bottomMessage="item.bottomMessage" />
    </div>
    <div class="card-wrap">
      <message-card title="最新文章">
        <div slot="content">
          <div class="article-content" v-for="(article, index) in newestArticleList" :key="index">
            <span class="article-title">{{ article.title }}</span>
            <span class="time"><i class="iconfont icon-calendar"></i>{{ article.publishTime }}</span>
          </div>
          <p class="more">更多</p>
        </div>
      </message-card>
      <message-card title="系统日志">
        <div slot="content">
          <div class="log-content" v-for="(log, index) in sysLogList" :key="index">
            {{ log.time }} => {{ log.content }}
          </div>
          <p class="more" v-if="sysLogList.length >= 10">更多</p>
        </div>
      </message-card>
    </div>
  </div>
</template>

<script>
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
          middleMessage: '123',
          bottomMessage: '篇文章'
        },
        {
          backgroundColor: '#7e57c2',
          icon: 'icon-drafts',
          topMessage: '草稿箱共有',
          middleMessage: '15',
          bottomMessage: '篇文章'
        },
        {
          backgroundColor: '#33b86c',
          icon: 'icon-classify',
          topMessage: '共有',
          middleMessage: '10',
          bottomMessage: '个分类'
        },
        {
          backgroundColor: '#6e8cd7',
          icon: 'icon-tag',
          topMessage: '共有',
          middleMessage: '666',
          bottomMessage: '个标签'
        }
      ],
      newestArticleList: [
        {
          title: '第一篇文章第一篇文章第一篇文章第一篇文章第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        },
        {
          title: '第一篇文章',
          publishTime: '2018-07-15'
        }
      ],
      sysLogList: [
        {
          time: '2018-07-15 23:45:09',
          content: '管理员 codebear 登录系统'
        },
        {
          time: '2018-07-15 23:45:09',
          content: '管理员 codebear 登录系统'
        },
        {
          time: '2018-07-15 23:45:09',
          content: '管理员 codebear 登录系统'
        }
      ]
    }
  },
  created() {
    this.$store.commit('ADMIN_LEFT_MENU_ACTIVE_ITEM', '1')
  },
  methods: {
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
    .more
      padding: 10px
      margin-top: 10px
      text-align: center
      font-size: 14px
      @media (max-width: 759px)
        font-size: 12px
        padding: 10px
      color: #555555
      background-color: #f9f9f9
      cursor: pointer
      transition: all .3s
      &:hover
        background-color: $color-main
        color: $color-white
</style>
