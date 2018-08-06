<template>
  <div id="web-config-friends">
    <div class="header-wrap">
      友链管理（共计：{{ total }}条）
      <div class="action-btn-wrap">
        <span @click="add">新增</span>
      </div>
    </div>
    <div class="friends-table-wrap">
      <el-table
        :data="friendsList"
        border
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          label="标题"
          show-overflow-tooltip
          min-width="200">
          <template slot-scope="scope">
            <a class="friends-title" :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="分类"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="128"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="128"
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
        v-show="friendsList.length > 0">
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
    <el-dialog :title="tip" class="edit-dialog" :visible.sync="dialogFormVisible">
      <el-input
        class="input-title"
        size="mini"
        v-model="friend.name"
        placeholder="请输入友链名称">
      </el-input>
      <el-input
        class="input-title"
        size="mini"
        v-model="friend.url"
        placeholder="请输入友链链接">
      </el-input>
      <div class="label-wrap">
        分类：
        <el-select
          v-model="typeValue"
          filterable
          allow-create
          default-first-option
          size="mini"
          placeholder="请选择文章分类">
          <el-option
            v-for="item in typeList"
            size="mini"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="commit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import moment from 'moment'
import { scroll } from 'MIXINS/scroll'

export default {
  name: 'web-config-friends',
  components: {
  },
  mixins: [scroll],
  data () {
    return {
      friendsList: [],
      page: 0,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      dialogFormVisible: false,
      typeList: [],
      typeValue: '',
      tip: '新增',
      friend: {}
    }
  },
  created() {
    this.page = 0
    this.getList()
  },
  methods: {
    ...mapActions([
      'getFriendsList',
      'deleteFriend',
      'getFriendTypeList',
      'addFriend',
      'modifyFriend'
    ]),
    formatTime(row, column, cellValue, index) {
      return cellValue ? moment(parseInt(cellValue) * 1000).format('YYYY-MM-DD HH:mm') : '-'
    },
    formatStatus(value) {
      return value == '0' ? '已发布' : '已删除'
    },
    edit(friend) {
      this.tip = '编辑'
      this.getTypeList()
      this.friend = JSON.parse(JSON.stringify(friend))
      this.typeValue = friend.typeName
      this.dialogFormVisible = true
    },
    under(friend) {
      this.showDialog('此操作会将该友链标删除，不能恢复, 是否继续?', ()=> {
        this.deleteFriend(friend.friendId)
          .then((data) => {
            this.$toast('已删除')
            this.page = 0
            this.getList()
          })
          .catch((err)=> {
            this.$toast(err.msg, 'error')
          })
      })
    },
    pageChange(currentPage) {
      this.scrollToTarget(0, false)
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList() {
      this.getFriendsList({
          page: this.page,
          pageSize: this.pageSize
        })
        .then((data) => {
          this.total = data.count
          this.friendsList = data.list
        })
        .catch(()=> {
          this.friendsList = []
        })
    },
    getTypeList() {
      this.getFriendTypeList()
        .then((data) => {
          this.typeList = data
        })
        .catch(()=> {
          this.typeList = []
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
        }).catch(()=>{
          this.friend = {}
          this.typeValue = ''
        })
    },
    commit() {
      if (!this.friend.name) {
        this.$toast('请输入友链名称', 'error')
        return
      }
      if (!this.friend.url) {
        this.$toast('请输入友链链接', 'error')
        return
      }
      if (!this.typeValue) {
        this.$toast('请选择友链类型', 'error')
        return
      }
      let params = {
        name: this.friend.name,
        url: this.friend.url
      }
      let type = this.typeList.find(item => item.name === this.typeValue)
      if (type) {
        params.typeId = type.id
      } else {
        params.typeName = this.typeValue
      }

      if (this.friend.friendId) {
        params.friendId = this.friend.friendId
        this.modifyFriend(params)
          .then((data) => {
            this.$toast('已修改')
            this.page = 0
            this.getList()
            this.dialogFormVisible = false
          })
          .catch((err)=> {
            this.$toast(err.msg, 'error')
          })
      } else {
        this.addFriend(params)
          .then((data) => {
            this.$toast('已添加')
            this.page = 0
            this.getList()
            this.dialogFormVisible = false
          })
          .catch((err)=> {
            this.$toast(err.msg, 'error')
          })
      }
    },
    add() {
      this.tip = '新增'
      this.getTypeList()
      this.friend = {}
      this.typeValue = ''
      this.dialogFormVisible = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#web-config-friends
  position: relative
  padding-top: 52px
  .header-wrap
    position: absolute
    width: 100%
    top: 0
    padding: 18px
    font-size: 16px
    font-weight: bold
    background-color: $color-white
    box-shadow: 1px 1px 10px 1px rgba(38, 42, 48, .1)
    z-index: 1000
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .action-btn-wrap
      > span
        padding: 5px 10px
        margin-right: 5px
        font-size: 14px
        cursor: pointer
        background-color: $color-main
        color: $color-white
        border-radius: 8px
        &:hover
          background-color: lighten($color-main, 10%)
        &:last-child
          margin-right: 0px
  .friends-table-wrap
    width: 100%
    animation: show .8s
    .pagination
      width: 100%
      margin: 20px 0
      display: flex
      justify-content: center

.friends-title
  cursor: pointer
  &:hover
    color: #29b6f6
a
  color: #555555

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

<style lang="stylus">
.edit-dialog
  top: 15vh !important
  .el-dialog
    margin: 0 auto !important
    width: calc(100% - 30px)
    max-width: 400px
  .input-title
    margin-bottom: 10px
  .label-wrap
    color: #606266
    font-size: 14px
    width: 100%
    margin-bottom: 10px
    .el-select
      width: calc(100% - 46.7px) !important
</style>
