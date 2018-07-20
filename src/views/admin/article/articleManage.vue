<template>
  <div id="article-manage">
    <p>文章管理（共计：{{ total }}篇）</p>
    <div class="article-table-wrap">
      <el-table
        :data="articleList"
        border
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          label="标题"
          show-overflow-tooltip
          min-width="200">
          <template slot-scope="scope">
            <div class="article-title" @click="preview(scope.row)">{{ scope.row.title }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="封面图"
          width="62">
          <template slot-scope="scope">
            <img
              :src="scope.row.cover" 
              style="width: 100%;height: 31px; cursor: pointer"
              @click="previewImg">
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="分类"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="pageview"
          label="阅读量"
          width="60">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="122"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="发布时间"
          width="122"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="122"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="deleteTime"
          label="删除时间"
          width="122"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="70">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == '0' ? 'success' : 'danger'" size="mini">
              {{ formatStatus(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column 
          label="操作" 
          fixed="right"
          width="112">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              circle
              @click="edit(scope.row)">
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              v-if="scope.row.status != '1'"
              @click="under(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div
        class="pagination"
        v-show="articleList.length > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="params.pageSize"
          @current-change="pageChange"
          :current-page="currentPage"
          :total="total">
        </el-pagination>
      </div>
      <!-- 分页 结束 -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { scroll } from 'MIXINS/scroll'

export default {
  name: 'article-manage',
  components: {
  },
  mixins: [scroll],
  data () {
    return {
      articleList: [
        {
          title: '第一篇文章第一篇文章第一篇文章',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '',
          status: 0,
          pageview: 10,
          category: 'test',
          cover: 'http://img1.imgtn.bdimg.com/it/u=3249428919,1915053740&fm=200&gp=0.jpg'
        },
        {
          title: '第一篇文章',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '',
          status: 0,
          pageview: 100,
          category: 'testtest',
          cover: 'http://img1.imgtn.bdimg.com/it/u=3249428919,1915053740&fm=200&gp=0.jpg'
        },
        {
          title: '第一篇文章',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '1531733525',
          status: 1,
          pageview: 10,
          category: 'testtesttesttest',
          cover: 'http://img1.imgtn.bdimg.com/it/u=3249428919,1915053740&fm=200&gp=0.jpg'
        }
      ],
      params: {
        page: 0,
        pageSize: 20
      },
      currentPage: 0,
      total: 0
    }
  },
  created() {
    this.total = this.articleList.length
  },
  methods: {
    formatTime(row, column, cellValue, index) {
      return cellValue ? moment(parseInt(cellValue) * 1000).format('YYYY-MM-DD HH:ss') : '-'
    },
    formatStatus(value) {
      return value == '0' ? '已发布' : (value == '1' ? '已删除' : '待发布')
    },
    edit(article) {
      this.$router.push({
        name: 'editArticle',
        params: {
          articleId: '1'
        }
      })
    },
    under(article) {
      this.showDialog('此操作会将该文章标记为删除，不再显示, 是否继续?', ()=> {
        this.$message({
          type: 'success',
          message: '已删除'
        })
      })
    },
    pageChange(currentPage) {
      this.scrollToTop()
      this.params.page = currentPage - 1
      this.currentPage = currentPage
    },
    previewImg(e) {
      this.$photoPreview.open(0, [{src: e.target.src, w: 41, h: 31, target: e.target}])
    },
    preview (article) {
      this.$router.push({
        name: 'articlePreview',
        params: {
          articleId: '1'
        }
      })
    },
    showDialog(tip, next) {
      this.$confirm(tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          next()
        }).catch(()=>{})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#article-manage
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
  .article-table-wrap
    width: 100%
    animation: show .8s
    .pagination
      width: 100%
      margin-top: 20px
      display: flex
      justify-content: center

.article-title
  cursor: pointer
  &:hover
    color: #29b6f6

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
