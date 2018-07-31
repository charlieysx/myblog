<template>
  <div id="comments">
    <div id="comments-input-top" class="input-wrap">
      <div class="input-top">
        <el-input
          class="top-item"
          size="mini"
          v-model="name"
          placeholder="称呼（必填）">
        </el-input>
        <el-input
          class="top-item"
          size="mini"
          v-model="email"
          placeholder="邮箱（选填，方便联系您，不会公开）">
        </el-input>
      </div>
      <el-input
        class="input-area"
        type="textarea"
        size="mini"
        :rows="5"
        resize="none"
        v-model="content"
        :placeholder="placeholder">
      </el-input>
      <div class="btn-wrap" :style="{paddingBottom: showEmoji ? '96px' : '0px'}">
        <span class="emoji-btn" :class="{active: showEmoji}" @click="showEmoji = !showEmoji">表情</span>
        <div class="action-btn">
          <span class="cancel-btn" @click="content = ''" v-show="content !== ''">取消</span>
          <span class="send-btn" @click="send">发送~</span>
        </div>
      </div>
      <transition name="slide-fade">
        <ul class="emoji-wrap" v-show="showEmoji">
          <li
            v-for="(emoji, index) in emojiList"
            :key="index"
            class="emoji-item"
            :title="emoji.title"
            @click="choseEmoji(emoji.title)">
            <img :src="'static/emoji/'+emoji.name" alt="">
          </li>
        </ul>
      </transition>
    </div>
    <p class="count">{{ count }}条评论</p>
    <no-data
      v-if="commentsList.length === 0"
      text="还没有评论~"/>
    <ul class="comments-wrap">
      <li
        class="comments-item"
        v-for="(comments, index) in commentsList"
        :key="index">
        <div class="comments-info">
          <img class="avatar" src="~IMAGES/avatar.jpg" />
          <div class="name-time">
            <p class="name">
              {{ comments.name }}
              <span @click="reply(comments)">回复</span>
            </p>
            <p class="time">{{ comments.createTime | time }}</p>
          </div>
        </div>
        <p class="content" v-html="comments.content"></p>
        <ul class="comments-children" v-if="comments.children.length > 0">
          <li
            class="comments-child"
            v-for="(child, index) in comments.children"
            :key="index">
            <div class="comments-info">
              <img class="avatar" src="~IMAGES/avatar.jpg" />
              <div class="name-time">
                <p class="name">
                  {{ child.name }}
                  <span @click="reply(child)">回复</span>
                </p>
                <p class="time">{{ child.createTime | time }}</p>
              </div>
            </div>
            <p class="content" v-html="child.content"></p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import noData from 'COMMON/noData/noData'
import { scroll } from 'MIXINS/scroll'

export default {
  name: 'comments',
  props: ['id'],
  components: {
    noData
  },
  mixins: [scroll],
  data () {
    return {
      placeholder: '写下您的评论~',
      content: '',
      emojiList: [
        {title: '[微笑]', name: 'weixiao.gif'},
        {title: '[嘻嘻]', name: 'xixi.gif'},
        {title: '[哈哈]', name: 'haha.gif'},
        {title: '[可爱]', name: 'keai.gif'},
        {title: '[可怜]', name: 'kelian.gif'},
        {title: '[挖鼻]', name: 'wabi.gif'},
        {title: '[吃惊]', name: 'chijing.gif'},
        {title: '[害羞]', name: 'haixiu.gif'},
        {title: '[挤眼]', name: 'jiyan.gif'},
        {title: '[闭嘴]', name: 'bizui.gif'},
        {title: '[鄙视]', name: 'bishi.gif'},
        {title: '[爱你]', name: 'aini.gif'},
        {title: '[泪]', name: 'lei.gif'},
        {title: '[偷笑]', name: 'touxiao.gif'},
        {title: '[亲亲]', name: 'qinqin.gif'},
        {title: '[生病]', name: 'shengbing.gif'},
        {title: '[太开心]', name: 'taikaixin.gif'},
        {title: '[白眼]', name: 'baiyan.gif'},
        {title: '[右哼哼]', name: 'youhengheng.gif'},
        {title: '[左哼哼]', name: 'zuohengheng.gif'},
        {title: '[嘘]', name: 'xu.gif'},
        {title: '[衰]', name: 'shuai.gif'},
        {title: '[吐]', name: 'tu.gif'},
        {title: '[哈欠]', name: 'haqian.gif'},
        {title: '[抱抱]', name: 'baobao.gif'},
        {title: '[怒]', name: 'nu.gif'},
        {title: '[疑问]', name: 'yiwen.gif'},
        {title: '[馋嘴]', name: 'chanzui.gif'},
        {title: '[拜拜]', name: 'baibai.gif'},
        {title: '[思考]', name: 'sikao.gif'},
        {title: '[汗]', name: 'han.gif'},
        {title: '[困]', name: 'kun.gif'},
        {title: '[睡]', name: 'shui.gif'},
        {title: '[钱]', name: 'qian.gif'},
        {title: '[失望]', name: 'shiwang.gif'},
        {title: '[酷]', name: 'ku.gif'},
        {title: '[色]', name: 'se.gif'},
        {title: '[哼]', name: 'heng.gif'},
        {title: '[鼓掌]', name: 'guzhang.gif'},
        {title: '[晕]', name: 'yun.gif'},
        {title: '[悲伤]', name: 'beishang.gif'},
        {title: '[抓狂]', name: 'zhuakuang.gif'},
        {title: '[黑线]', name: 'heixian.gif'},
        {title: '[阴险]', name: 'yinxian.gif'},
        {title: '[怒骂]', name: 'numa.gif'},
        {title: '[互粉]', name: 'hufen.gif'},
        {title: '[书呆子]', name: 'shudaizi.gif'},
        {title: '[愤怒]', name: 'fennu.gif'},
        {title: '[感冒]', name: 'ganmao.gif'},
        {title: '[心]', name: 'xin.gif'},
        {title: '[伤心]', name: 'shangxin.gif'},
        {title: '[猪]', name: 'zhu.gif'},
        {title: '[熊猫]', name: 'xiongmao.gif'},
        {title: '[兔子]', name: 'tuzi.gif'},
        {title: '[喔克]', name: 'ok.gif'},
        {title: '[耶]', name: 'ye.gif'},
        {title: '[棒棒]', name: 'good.gif'},
        {title: '[不]', name: 'no.gif'},
        {title: '[赞]', name: 'zan.gif'},
        {title: '[来]', name: 'lai.gif'},
        {title: '[弱]', name: 'ruo.gif'},
        {title: '[草泥马]', name: 'caonima.gif'},
        {title: '[神马]', name: 'shenma.gif'},
        {title: '[囧]', name: 'jiong.gif'},
        {title: '[浮云]', name: 'fuyun.gif'},
        {title: '[给力]', name: 'geili.gif'},
        {title: '[围观]', name: 'weiguan.gif'},
        {title: '[威武]', name: 'weiwu.gif'},
        {title: '[话筒]', name: 'huatong.gif'},
        {title: '[蜡烛]', name: 'lazhu.gif'},
        {title: '[蛋糕]', name: 'dangao.gif'},
        {title: '[发红包]', name: 'fahongbao.gif'}
      ],
      showEmoji: false,
      count: 0,
      name: '',
      email: '',
      commentsList: [
        {
          id: 1,
          name: '匿名',
          createTime: 1532945798,
          children: [],
          content: 'test'
        },
        {
          id: 1,
          name: '匿名匿名匿名匿名匿名匿名匿名',
          createTime: 1532945798,
          children: [
            {
              id: 1,
              name: '作者',
              createTime: 1532945798,
              children: [],
              content: '@匿名匿名匿名匿名匿名匿名匿名 test'
            },
            {
              id: 2,
              name: '哈哈',
              createTime: 1532945798,
              children: [],
              content: '@作者 <img class="content-emoji" src="static/emoji/weixiao.gif" alt="" />'
            }
          ],
          content: 'testtest'
        },
        {
          id: 1,
          name: '匿名',
          createTime: 1532945798,
          children: [],
          content: 'test'
        }
      ],
      parentsId: '',
      parentsName: ''
    }
  },
  computed: {
  },
  watch: {
    content(value) {
      if (this.parentsName !== '') {
        if (value.indexOf(`@${this.parentsName} `) !== 0) {
          this.parentsId = ''
          this.parentsName = ''
        }
      }
    },
    parentsName(value) {
      this.content = `@${this.parentsName} `
    }
  },
  methods: {
    choseEmoji(title) {
      // this.content += '[' + title + ']'
      this.content += title
    },
    send() {
      if (this.content === '') {
        this.$toast('评论内容不能为空', 'error')
        return
      }
      if (this.name === '') {
        this.$toast('请填写您的称呼', 'error')
        return
      }
      let params = {
        name: this.name,
        content: this.analyzeEmoji()
      }
      if (!this.email === '') {
        params.email = this.email
      }
      this.commentsList.push({
        id: 1,
        name: 'haha',
        createTime: 1532945798,
        children: [],
        content: params.content
      })
    },
    analyzeEmoji() {
      let pattern = /\[[\u4e00-\u9fa5]+\]/g
      let patternResult = this.content.match(pattern)
      let result = this.content
      if(patternResult) {
        // let list = patternResult.filter((element, index, self)=> {
        //   return self.indexOf(element) === index
        // })
        for(let i = 0; i < patternResult.length; ++i) {
          let emoji = this.emojiList.find(item=> {
            return item.title === patternResult[i]
          })
          if (emoji) {
            result = result.replace(emoji.title, '<img class="content-emoji" src="static/emoji/' + emoji.name + '" alt="" />')
          }
        }
      }
      result = result.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;')
      return result
    },
    reply(comments) {
      this.parentsId = comments.id
      this.parentsName = comments.name
      let top = document.getElementById('comments-input-top').getBoundingClientRect().top
      top += document.body.scrollTop || document.documentElement.scrollTop
      this.scrollToTarget(top)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#comments
  margin-top: 20px
  position: relative
  background-color: $color-white
  animation: show .8s
  .input-wrap
    position: relative
    .input-top
      margin-bottom: 5px
      .top-item
        min-width: 194px
        margin-top: 5px
    .btn-wrap
      position: relative
      margin-top: 10px
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: flex-end
      transition: padding-bottom .3s
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
      .action-btn
        .cancel-btn
          font-size: 14px
          cursor: pointer
          color: lighten($color-main, 30%)
          transition: color .3s
          margin-right: 10px
          &:hover
            color: $color-main
        .send-btn
          display: inline-block
          padding: 8px 18px
          background-color: #409EFF
          border-radius: 5px
          color: $color-white
          font-size: 14px
          font-weight: bold
          cursor: pointer
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
          transition: background-color .3s
          &:hover
            background-color: lighten(#409EFF, 30%)
    .emoji-wrap
      position: absolute
      background-color: $color-white
      padding: 5px
      top: 214px
      left: 0
      max-width: 770px
      height: 96px
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
  .count
    margin-top: 10px
    font-size: 14px
    color: $color-main
    font-weight: bold
    border-bottom: 1px solid #eeeeee
    padding: 5px 0px
  .comments-wrap
    .comments-item
      padding: 10px 5px
      transition: background-color .3s
      &:hover
        background-color: #eeeeee
      .comments-info
        display: flex
        flex-direction: row
        margin-bottom: 5px
        .avatar
          width: 32px
          height: 32px
          margin-right: 5px
          border-radius: 50%
        .name-time
          flex: 1
          .name
            font-size: 14px
            color: #555555
            margin-bottom: 2px
            > span
              font-size: 12px
              float: right
              cursor: pointer
              color: lighten($color-main, 30%)
              &:hover
                color: $color-main
          .time
            font-size: 12px
            color: #999999
      .content
        padding-left: 40px
        font-size: 14px
        color: #555555
        line-height: 16px
  .comments-children
    margin-left: 12px
    border-left: 2px solid #999999
    margin-top: 5px
    .comments-child
      padding: 10px 5px
      padding-left: 17px
      transition: background-color .3s
      &:hover
        background-color: #dddddd
      .comments-info
        display: flex
        flex-direction: row
        margin-bottom: 5px
        .avatar
          width: 32px
          height: 32px
          margin-right: 5px
          border-radius: 50%
        .name-time
          flex: 1
          .name
            font-size: 14px
            color: #555555
            margin-bottom: 2px
            > span
              font-size: 12px
              float: right
              cursor: pointer
              color: lighten($color-main, 30%)
              &:hover
                color: $color-main
          .time
            font-size: 12px
            color: #999999
      .content
        padding-left: 40px
        font-size: 14px
        color: #555555
        line-height: 16px

.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to
  opacity: 0

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
.content-emoji
  width: 14px
  height: 14px
  margin: 1px
</style>
