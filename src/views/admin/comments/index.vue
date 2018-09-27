<template>
  <div id="comments-manage">
    <p>评论（共计：{{ total }}条）</p>
    <div class="comments-table-wrap">
      <el-table
        :data="commentsList"
        border
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="评论者"
          width="120">
        </el-table-column>
        <el-table-column
          label="评论内容"
          min-width="200">
          <template slot-scope="scope">
            <span 
              v-for="(item, index) in JSON.parse(scope.row.content)"
              :key="index">
              {{ item.type === 'text' ? item.content : '' }}
              <img class="content-emoji" :src="item.content" alt="" v-if="item.type === 'emoji'" />
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="文章"
          show-overflow-tooltip
          min-width="150">
          <template slot-scope="scope">
            <div class="comments-title" @click="preview(scope.row)">{{ scope.row.articleTitle }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="作者"
          width="45">
          <template slot-scope="scope">
            {{ scope.row.isAuthor === '1' ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="128"
          :formatter="formatTime">
        </el-table-column>
        <el-table-column 
          label="操作" 
          fixed="right"
          width="112">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit-outline"
              type="primary"
              circle
              v-if="scope.row.isAuthor == 0"
              @click="reply(scope.row)">
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog title="回复" class="edit-dialog" :visible.sync="dialogFormVisible">
      <el-input
        class="input-title"
        size="mini"
        type="textarea"
        :rows="5"
        resize="none"
        v-model="replyContent"
        :placeholder="placeholder">
      </el-input>
      <div class="btn-wrap">
        <span class="emoji-btn" :class="{active: showEmoji}" @click="showEmoji = !showEmoji">表情</span>
      </div>
      <ul class="emoji-wrap" v-show="showEmoji">
        <li
          v-for="(emoji, index) in emojiList"
          :key="index"
          class="emoji-item"
          :title="emoji.title"
          @click="choseEmoji(emoji.title)">
          <img :src="'/static/emoji/'+emoji.name" alt="">
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
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
import { emoji } from 'MIXINS/emoji'

export default {
  name: 'comments-manage',
  components: {
  },
  mixins: [scroll, emoji],
  data () {
    return {
      placeholder: '',
      commentsList: [],
      dialogFormVisible: false,
      showEmoji: false,
      replyContent: '',
      page: 0,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      comments: {}
    }
  },
  created() {
    this.page = 0
    this.getList()
  },
  methods: {
    ...mapActions([
      'getAllCommentsList',
      'adminReplyComments',
      'deleteComments'
    ]),
    formatTime(row, column, cellValue, index) {
      return cellValue ? moment(parseInt(cellValue) * 1000).format('YYYY-MM-DD HH:mm') : '-'
    },
    reply(comments) {
      this.comments = comments
      this.replyContent = ``
      this.placeholder = `@${this.comments.name} `
      this.dialogFormVisible = true
    },
    del (comments) {
      this.showDialog('此操作将彻底删除该评论，不可恢复, 是否继续?', ()=> {
        this.deleteComments(comments.id)
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
    pageChange (currentPage) {
      this.scrollToTarget(0, false)
      this.page = currentPage - 1
      this.currentPage = currentPage
      this.getList()
    },
    getList() {
      this.getAllCommentsList({
          page: this.page,
          pageSize: this.pageSize
        })
        .then((data) => {
          this.total = data.count
          this.commentsList = data.list
        })
        .catch(()=> {
          this.total = 0
          this.commentsList = []
        })
    },
    preview (comments) {
      this.$router.push({
        name: 'articlePreview',
        query: {
          id: comments.articleId
        }
      })
    },
    choseEmoji(title) {
      // this.content += '[' + title + ']'
      this.replyContent += title
    },
    commit() {
      if (this.replyContent === '') {
        this.$toast('回复内容不能为空', 'error')
        return
      }
      let params = {
        articleId: this.comments.articleId,
        replyId: this.comments.id,
        content: this.analyzeEmoji(`@${this.comments.name} ${this.replyContent}`),
        sourceContent: `@${this.comments.name} ${this.replyContent}`
      }
      this.adminReplyComments(params)
        .then((data) => {
          this.$toast('回复成功~')
          this.page = 0
          this.getList()
          this.dialogFormVisible = false
        })
        .catch((err)=> {
          this.$toast(err.msg, 'error')
        })
    },
    cancel() {
      this.dialogFormVisible = false
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
@import '~STYLUS/mixin.styl'
#comments-manage
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
  .comments-table-wrap
    width: 100%
    animation: show .8s
    .pagination
      width: 100%
      margin: 20px 0
      display: flex
      display: -webkit-flex
      justify-content: center


.comments-title
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

<style lang="stylus">
@import '~STYLUS/color.styl'
.content-emoji
  width: 14px
  height: 14px
  margin: 1px

.edit-dialog
  top: 15vh !important
  .input-title
    margin-bottom: 10px
  .el-dialog
    margin: 0 auto !important
    width: calc(100% - 30px)
    max-width: 400px
    .el-dialog__body
      padding-top: 10px !important
      padding-bottom: 40px !important
  .emoji-wrap
    position: absolute
    background-color: $color-white
    padding: 5px
    top: 201px
    left: 20px
    max-width: calc(100% - 40px)
    height: 90px
    transition: opacity .3s
    z-index: 100
    overflow-y: auto
    border: 1px solid #eeeeee
    border-radius: 0 5px 5px 5px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    .emoji-item
      padding: 5px
      cursor: pointer
      border-radius: 5px
      width: 28px
      height: 28px
      background-color: $color-white
      transition: background-color .3s
      &:hover
        background-color: #999999
      > img
        width: 100%
        height: 100%

.emoji-btn
  position: relative
  padding: 5px
  background-color: $color-main
  border-radius: 5px
  color: $color-white
  font-size: 12px
  font-weight: bold
  cursor: pointer
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  transition: all .3s
  &:hover
    background-color: lighten($color-main, 30%)
  &.active
    z-index: 101
    border-bottom-left-radius: 0px
    border-bottom-right-radius: 0px
    border: 1px solid #eeeeee
    border-bottom: none
    color: $color-main
    background-color: $color-white
</style>