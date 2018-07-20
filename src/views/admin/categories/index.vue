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
            prop="name"
            label="分类名称"
            show-overflow-tooltip
            min-width="120">
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
            prop="name"
            label="标签名称"
            show-overflow-tooltip
            min-width="120">
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
                v-if="scope.row.status == 0"
                @click="underTag(scope.row)">
              </el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-check"
                circle
                v-else
                @click="reUseTag(scope.row)">
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
        },
        {
          name: '删除的标签',
          createTime: '1531733525',
          publishTime: '1531733525',
          updateTime: '1531733525',
          deleteTime: '',
          status: 1,
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
    },
    underTag(tag) {
    },
    reUseTag(tag) {
    },
    editCategory(category) {
    },
    underCategory(category) {
    },
    reUseCategory(category) {
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
