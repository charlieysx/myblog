<template>
  <div id="category-tag">
    <p>分类/标签</p>
    <div class="category-tag-wrap">
      <div class="table-wrap">
        <el-table
          :data="catetoryList"
          border
          stripe
          size="mini"
          style="width: 100%">
          <el-table-column
              label="分类名称"
              show-overflow-tooltip
              min-width="120">
            <template slot-scope="scope">
              <div class="title" @click="toList('catetory', '111')">{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="articleCount"
              label="文章数"
              width="60">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间"
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
                  v-if="scope.row.canDel"
                  @click="editCategory(scope.row)">
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  v-if="scope.row.canDel && scope.row.status == 0"
                  @click="underCategory(scope.row)">
                </el-button>
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-check"
                  circle
                  v-if="scope.row.status == 1"
                  @click="reUseCategory(scope.row)">
                </el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-wrap">
        <el-table
          :data="tagList"
          border
          stripe
          size="mini"
          style="width: 100%">
          <el-table-column
              label="标签名称"
              show-overflow-tooltip
              min-width="120">
            <template slot-scope="scope">
              <div class="title" @click="toList('tag', '111')">{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="articleCount"
              label="文章数"
              width="60">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间"
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
                  @click="editTag(scope.row)">
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="underTag(scope.row)">
                </el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>


<script>
import moment from 'moment'

export default {
  name: 'category-tag',
  components: {
  },
  data () {
    return {
      catetoryList: [
        {
          name: '默认分类',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '',
          status: 0,
          canDel: 0,
          articleCount: 10
        },
        {
          name: '第一篇文章',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '',
          status: 0,
          canDel: 1,
          articleCount: 1
        },
        {
          name: '删除了',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '',
          status: 1,
          canDel: 1,
          articleCount: 1
        }
      ],
      tagList: [
        {
          name: '第一个标签',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '',
          status: 0,
          articleCount: 10
        },
        {
          name: '第二个标签',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '',
          status: 0,
          articleCount: 1
        }
      ]
    }
  },
  created() {
  },
  methods: {
    formatTime(row, column, cellValue, index) {
      return cellValue ? moment(parseInt(cellValue) * 1000).format('YYYY-MM-DD HH:ss') : '-'
    },
    formatStatus(value) {
      return value == '0' ? '使用中' : '已删除'
    },
    editTag(tag) {
      this.showDialogWithInput(tag.name, (value)=> {
        this.$message({
          type: 'success',
          message: '标签名: ' + value
        })
      }, '请输入新的标签名')
    },
    underTag(tag) {
      this.showDialog('此操作会将改标签删除，并将所有文章移除改标签, 是否继续?', ()=> {
        this.$message({
          type: 'success',
          message: '已删除'
        })
      })
    },
    toList (type, id) {
      this.$router.push({
        name: 'adminArticleList',
        params: {
          type: type,
          itemId: id
        }
      })
    },
    editCategory(category) {
      this.showDialogWithInput(category.name, (value)=> {
        this.$message({
          type: 'success',
          message: '分类名: ' + value
        })
      }, '请输入新的分类名')
    },
    underCategory(category) {
      this.showDialog('此操作会将改分类下的文章移到默认分类, 是否继续?', ()=> {
        this.$message({
          type: 'success',
          message: '已删除'
        })
      })
    },
    reUseCategory(category) {
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
    },
    showDialogWithInput(tip, next, placeholder) {
      this.$prompt(tip, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: placeholder
        }).then(({ value }) => {
          next(value)
        }).catch(()=>{})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
@import '~STYLUS/mixin.styl'
#category-tag
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
  .category-tag-wrap
    position: relative
    animation: show .8s
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin: 10px
    .table-wrap
      position: relative
      width: calc(50% - 10px)
      margin: 5px
      transition: all .3s
      @media (max-width: 1009px)
        width: calc(100% - 10px)


.title
  cursor: pointer
  &:hover
    color: #29b6f6

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

<style lang="stylus">
.el-message-box__wrapper
  .el-message-box
    width: auto !important
    max-width: calc(100% - 40px)
    .el-message-box__content
      font-size: 14px
      @media (max-width: 760px)
        font-size: 12px
</style>
