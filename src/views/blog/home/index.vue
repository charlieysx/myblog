<template>
  <div id="home">
    <article-card
      v-for="(article, index) in articleList"
      :key="index"
      :article="article" />
    <!-- 分页 -->
    <div
      class="pagination"
      v-show="total > 0">
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
import {
  mapActions,
  mapGetters
} from 'vuex'

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
      articleList: [],
      page: 0,
      pageSize: 15,
      currentPage: 0,
      total: 0
    }
  },
  created() {
    this.page = 0
    this.getList()
  },
  methods: {
    ...mapActions([
      'getBlogArticleList'
    ]),
    pageChange(currentPage) {
      this.scrollToTop()
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList() {
      this.getBlogArticleList({
          page: this.page,
          pageSize: this.pageSize
        })
        .then((data) => {
          this.total = data.count
          this.articleList = data.list
        })
        .catch(()=> {
          this.articleList = []
        })
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
