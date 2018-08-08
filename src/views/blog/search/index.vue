<template>
  <div id="search" v-loading="loading">
    <div class="search-input-wrap">
      <input 
        v-model="searchValue"
        @keyup.enter="toSearch()"
        type="search"
        placeholder="输入关键字搜索..."
        id="search-input"
        class="search-real-input">
    </div>
    <div class="search-article-wrap">
      <article-card2
        v-for="(article, index) in articleList"
        :key="index"
        :article="article" />
    </div>
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
  mapActions
} from 'vuex'

import { scroll } from 'MIXINS/scroll'
import articleCard2 from 'COMMON/articleCard/articleCard2'
import noData from 'COMMON/noData/noData'

export default {
  name: 'search',
  components: {
    articleCard2,
    noData
  },
  mixins: [scroll],
  data () {
    return {
      page: 0,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      type: 'category',
      id: '',
      articleList: [],
      loading: false,
      searchValue: ''
    }
  },
  created() {
  },
  mounted() {
    this.initData()
  },
  watch: {
    $route(route) {
      this.initData()
    }
  },
  methods: {
    ...mapActions([
      'searchArticle'
    ]),
    initData() {
      this.searchValue = this.$route.query.value
      this.total = 0
      this.articleList = []
      this.page = 0
      if (this.searchValue || this.searchValue == '0') {
        this.getList()
      } else {
        document.getElementById('search-input').focus()
      }
    },
    pageChange(currentPage) {
      this.scrollToTarget(0, false)
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList() {
      this.loading = true
      this.searchArticle({
          searchValue: this.searchValue,
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
    },
    toSearch() {
      if (this.searchValue === '') {
        this.$toast('搜索内容不能为空', 'error')
        return
      }
      this.$router.push({
        name: 'search',
        query: {
          value: this.searchValue
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#search
  position: relative
  padding: 30px 10px
  display: flex
  flex-direction: column
  align-items: center
  .pagination
    width: 100%
    padding: 10px 0
    display: flex
    display: -webkit-flex
    flex-direction: row
    justify-content: center
    background-color: $color-white
  .search-input-wrap
    width: 100%
    max-width: 900px
    height: 30px
    border-radius: 5px
    border: 1px solid #eeeeee
    .search-real-input
      width: 100%
      height: 28px
      padding: 5px 10px
      border-radius: 5px
      border: none
      font-size: 14px
      background-color: $color-white
      &::placeholder
        color: $text-tip
  .search-article-wrap
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
