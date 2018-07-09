<template>
  <div v-show="show" id="right-nav" :style="{
      'width': showRightNav ? '320px' : '0px',
      'transition': 'all .3s'
    }">
    <div class="right-nav-wrap" :style="{
      'width': showRightNav ? '320px' : '0px',
      'transition': 'all .3s'
    }">
      <img class="avatar" src="~IMAGES/avatar.jpg"/>
      <p class="name">CodeBear</p>
      <p class="motto">认识，了解，探索，超越</p>
      <div class="menu-wrap">
        <span class="menu-item" @click="toView('archives')">
          <p class="count">27</p>
          <p>文章</p>
        </span>
        <span class="menu-item" @click="toView('categories')">
          <p class="count">10</p>
          <p>分类</p>
        </span>
        <span class="menu-item" @click="toView('categories')">
          <p class="count">124</p>
          <p>标签</p>
        </span>
      </div>
      <div class="social-wrap">
        <a class="social-item" href="https://github.com/CB-ysx" target="_blank">
          <i class="iconfont icon-github"></i>
          github
        </a>
      </div>
    </div>
    <div class="toggle" @click="toggle" @mouseover="setLineData" @mouseout="setLineData">
      <span
        class="toggle-line"
        v-for="(line, index) in toggleLineData"
        :key="index"
        :style="{
          width: line.width,
          top: line.top,
          transform: line.transform,
          opacity: line.opacity,
          transition: 'all .3s'
        }">
      </span>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  name: 'right-nav',
  components: {
  },
  data () {
    return {
      show: true,
      lineStyle: {
        normalLineData: [
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          }
        ],
        closeLineData: [
          {
            width: '100%',
            top: '6px',
            transform: 'rotateZ(-45deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '0'
          },
          {
            width: '100%',
            top: '-6px',
            transform: 'rotateZ(45deg)',
            opacity: '1'
          }
        ],
        arrowLineData: [
          {
            width: '50%',
            top: '3px',
            transform: 'rotateZ(-45deg)',
            opacity: '1'
          },
          {
            width: '100%',
            top: '0px',
            transform: 'rotateZ(0deg)',
            opacity: '1'
          },
          {
            width: '50%',
            top: '-3px',
            transform: 'rotateZ(45deg)',
            opacity: '1'
          }
        ]
      },
      toggleLineData: []
    }
  },
  created() {
    this.toggleLineData = this.lineStyle.normalLineData
  },
  watch: {
    screen (value) {
      this.show = true

      if (value.width <= 960) {
        this.show = false
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'screen',
      'showRightNav'
    ])
  },
  methods: {
    ...mapActions([
      'setShowRightNav'
    ]),
    toggle () {
      this.setShowRightNav(!this.showRightNav)
      this.toggleLineData = this.showRightNav ? this.lineStyle.closeLineData : this.lineStyle.normalLineData
    },
    setLineData (e) {
      if (this.showRightNav) {
        return
      }
      if (e.type === 'mouseover') {
        this.toggleLineData = this.lineStyle.arrowLineData
      } else {
        this.toggleLineData = this.lineStyle.normalLineData
      }
    },
    toView (to) {
      this.$router.push({
        name: to
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#right-nav
  position: relative
  width: 320px
  .right-nav-wrap
    position: fixed
    right: 0
    top: 0
    bottom: 0
    width: 320px
    background-color: $color-main
    color: $color-white
    z-index: 1000
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 30px
    overflow: hidden
    .avatar
      border: 4px solid $color-white
      border-radius: 50%
      width: 100px
      height: 100px
    .name
      color: $color-white
      padding: 15px
      font-size: 18px
      font-weight: bold
    .motto
      color: #999999
      padding: 5px 15px
      font-size: 14px
      font-weight: bold
    .menu-wrap
      display: flex
      flex-direction: row
      align-items: center
      margin-top: 15px
      .menu-item
        display: flex
        flex-direction: column
        align-items: center
        border-right: 1px solid #555555
        font-size: 14px
        padding: 0 15px
        color: #999999
        transition: all .3s
        cursor: pointer
        font-weight: bold
        &:last-child
          border-right: 0px
        &:hover
          color: $color-white
        .count
          margin-bottom: 5px
          font-size: 20px
    .social-wrap
      padding: 20px
      display: flex
      flex-direction: row
      align-items: center
      flex-wrap: wrap
      .social-item
        padding: 8px
        border: 1px solid #fc6423
        border-radius: 5px
        font-size: 14px
        line-height: 1
        color: #fc6423
        transition: all .3s
        cursor: pointer
        &:hover
          background-color: #fc6423
          color: $color-white
        .iconfont
          font-size: 14px

  .toggle
    position: fixed
    width: 24px
    height: 24px
    background-color: $color-main
    right: 30px
    bottom: 45px
    padding: 5px
    z-index: 1050
    cursor: pointer
    line-height: 0
    .toggle-line
      position: relative
      display: inline-block
      vertical-align: top
      width: 100%
      height: 2px
      margin-top: 4px
      background-color: $color-white
      &:first-child
        margin-top: 0px
</style>
