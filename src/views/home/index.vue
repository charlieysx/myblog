<template>
  <div id="home">
    <article-card
      v-for="(article, index) in articles"
      :key="index"
      :article="article" />
    <!-- 分页 -->
    <div
      class="pagination"
      v-show="articles.length > 0">
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

import articleCard from 'COMMON/articleCard/articleCard'

export default {
  name: 'home',
  components: {
    articleCard
  },
  mixins: [scroll],
  data () {
    return {
      articles: [
        {
          title: '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        }
      ],
      page: 0,
      pageSize: 20,
      currentPage: 1,
      total: 0
    }
  },
  created() {
    this.total = this.articles.length
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
#home
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
</style>
