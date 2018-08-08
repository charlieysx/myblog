<template>
  <div id="home" v-loading="loading">
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
    <no-data
      v-if="total === 0"
      text="没有找到文章~"/>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import { scroll } from 'MIXINS/scroll'

import articleCard from 'COMMON/articleCard/articleCard'
import noData from 'COMMON/noData/noData'

export default {
  name: 'home',
  components: {
    articleCard,
    noData
  },
  mixins: [scroll],
  data () {
    return {
      articleList: [],
      page: 0,
      pageSize: 10,
      currentPage: 0,
      total: 0,
      loading: false
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
      this.scrollToTarget(0, false)
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList() {
      this.loading = true
      this.getBlogArticleList({
          page: this.page,
          pageSize: this.pageSize
        })
        .then((data) => {
          this.total = data.count
          this.articleList = data.list
          this.loading = false
        })
        .catch(()=> {
          this.articleList = []
          this.loading = false
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
  min-height: 100px
  .pagination
    width: 100%
    padding: 10px 0
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    background-color: $color-white


.slide-fade-enter
.slide-fade-leave-to
  opacity: 0
</style>
