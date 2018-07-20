<template>
  <div id="archives">
    <div class="archives-wrap">
      <div class="time-line"></div>
      <div class="list-content">
        <p class="normal-node">目前共计 {{ total }} 篇文章~</p>
        <div
          class="bold-node"
          v-for="(node, index) in archives"
          :key="index">
          <p>{{ node.title }}</p>
          <article-card2
            v-for="(article, index) in node.list"
            :key="index"
            :article="article" />
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div
      class="pagination"
      v-show="true">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        @current-change="pageChange"
        :current-page="currentPage"
        :total="total">
      </el-pagination>
    </div>
    <!-- 分页 结束 -->
  </div>
</template>

<script>
import { scroll } from 'MIXINS/scroll'
import articleCard2 from 'COMMON/articleCard/articleCard2'

export default {
  name: 'archives',
  components: {
    articleCard2
  },
  mixins: [scroll],
  data () {
    return {
      page: 0,
      pageSize: 20,
      currentPage: 1,
      total: 0,
      archives: [
        {
          title: '2018',
          list: [
            {
              title: '这是标题',
              publishTime: '07-08',
              classify: {
                id: 0,
                name: 'vue'
              },
              tags: [
                {
                  name: 'vue'
                },
                {
                  name: 'test'
                },
                {
                  name: 'test'
                },
                {
                  name: 'testtest'
                },
                {
                  name: 'testtesttesttest'
                }
              ] ,
              subMessage: '这是文章简介'
            },
            {
              title: '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
              publishTime: '07-08',
              classify: {
                id: 0,
                name: 'vue'
              },
              tags: [
                {
                  name: 'vue'
                },
                {
                  name: 'test'
                }
              ] ,
              subMessage: '这是文章简介'
            }
          ]
        },
        {
          title: '2017',
          list: [
            {
              title: '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
              publishTime: '07-08',
              classify: {
                id: 0,
                name: 'vue'
              },
              tags: [
                {
                  name: 'vue'
                },
                {
                  name: 'test'
                }
              ] ,
              subMessage: '这是文章简介'
            },
            {
              title: '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
              publishTime: '07-08',
              classify: {
                id: 0,
                name: 'vue'
              },
              tags: [
                {
                  name: 'vue'
                },
                {
                  name: 'test'
                }
              ] ,
              subMessage: '这是文章简介'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.total = 0
    this.archives.forEach(item => {
      this.total += item.list.length
    })
  },
  methods: {
    pageChange (currentPage) {
      this.scrollToTop()
      this.page = currentPage - 1
      this.currentPage = currentPage
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#archives
  position: relative
  padding: 30px 10px
  .pagination
    width: 100%
    padding: 10px 0
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    background-color: $color-white
  .archives-wrap
    position: relative
    width: 100%
    padding: 10px 30px
    animation: show .8s
    @media (max-width: 768px)
      padding: 5px
    .time-line
      position: absolute
      left: 30px
      @media (max-width: 768px)
        left: 5px
      top: 15px
      bottom: 0
      width: 2px
      background-color: #eeeeee
    .list-content
      .normal-node
        position: relative
        color: #555555
        padding: 0 15px
        font-size: 16px
        margin-bottom: 20px
        @media (max-width: 768px)
          font-size: 14px
        &:before
          position: absolute
          left: -4px
          top: 5px
          content: ""
          width: 10px
          height: 10px
          border-radius: 10px
          background-color: #999999
          @media (max-width: 768px)
            left: -3px
            top: 4px
            width: 8px
            height: 8px
            border-radius: 8px
      .bold-node
        position: relative
        color: #555555
        padding: 0 15px
        font-size: 28px
        margin-bottom: 20px
        @media (max-width: 768px)
          font-size: 22px
        &:before
          position: absolute
          left: -4px
          top: 10px
          content: ""
          width: 10px
          height: 10px
          border-radius: 10px
          background-color: #999999
          @media (max-width: 768px)
            left: -3px
            top: 8px
            width: 8px
            height: 8px
            border-radius: 8px
        > p
          margin-bottom: 20px

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
