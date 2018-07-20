<template>
  <div id="archives">
    <div class="archives-wrap">
      <article-card2
        v-for="(article, index) in archives"
        :key="index"
        :article="article" />
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
    }
  },
  created() {
    this.total = this.archives.length
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
