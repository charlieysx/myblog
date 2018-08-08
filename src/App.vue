<template>
  <div id="appindex">
    <!-- 博客页面 -->
    <div class="content-wrap" v-if="!isAdminWrap">
      <!-- header -->
      <m-header />
      <!-- header 结束 -->
      <!-- content -->
      <div class="view-wrap" :style="{width: viewWrapWidth}">
        <router-view></router-view>
      </div>
      <!-- content 结束 -->
      <!-- footer -->
      <m-footer />
      <!-- footer 结束 -->
    </div>
    <right-nav v-if="!isAdminWrap" />
    <!-- 博客页面 结束 -->

    <!-- 博客后台管理页面 -->
    <div class="admin-wrap" v-if="isAdminWrap">
      <leftMenu />
      <!-- content -->
      <div class="view-wrap">
        <router-view></router-view>
      </div>
      <!-- content 结束 -->
    </div>
    <!-- 博客后台管理页面 结束 -->

    <!-- 返回顶部 -->
    <transition name="slide-fade">
      <div class="to-top" @click="scrollToTarget(0)" v-show="showScrollToTop">
        <span
          class="to-top-line"
          v-for="(line, index) in lineData"
          :key="index"
          :style="{
            height: line.height,
            left: line.left,
            transform: line.transform
          }">
        </span>
      </div>
    </transition>
    <!-- 返回顶部 结束 -->
    <!-- 登录 -->
    <transition name="fade">
      <login-layout v-if="!isLogin&&isAdminWrap"></login-layout>
    </transition>
    <!-- 登录 结束 -->
  </div>
</template>

<script>
import {
  SCREEN_CHANGE,
  SHOW_TOKEN_ERROR
} from 'STORE/mutation-types'

import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'

import { scroll } from 'MIXINS/scroll'

import mHeader from 'COMMON/mHeader/mHeader'
import mFooter from 'COMMON/mFooter/mFooter'
import rightNav from 'COMMON/rightNav/rightNav'
import loginLayout from 'VIEWS/admin/auth/login'
import leftMenu from 'VIEWS/admin/leftMenu/leftMenu'

export default {
  name: 'app',
  components: {
    mHeader,
    rightNav,
    mFooter,
    loginLayout,
    leftMenu
  },
  mixins: [scroll],
  data () {
    return {
      lineData: [
        {
          height: '50%',
          left: '3px',
          transform: 'rotateZ(45deg)'
        },
        {
          height: '100%',
          top: '0px',
          transform: 'rotateZ(0deg)'
        },
        {
          height: '50%',
          left: '-3px',
          transform: 'rotateZ(-45deg)'
        }
      ],
      showScrollToTop: false,
      evtname: '',
      viewWrapWidth: '1000px'
    }
  },
  watch: {
    tokenError (value) {
      if (value) {
        this.$store.commit(SHOW_TOKEN_ERROR, false)
        this.message = this.$message({
          showClose: true,
          message: '账号过期，请重新登录',
          type: 'error'
        })
      }
    },
    showRightNav (value) {
      this.setViewWrapWidth()
    },
    screen (value) {
      this.setViewWrapWidth()
    }
  },
  computed: {
    ...mapGetters([
      'isAdminWrap',
      'isLogin',
      'tokenError',
      'articleMenu',
      'articleMenuSource',
      'blogInfo',
      'showRightNav',
      'screen'
    ])
  },
  created() {
    if (!this.isAdminWrap) {
      this.getBlogInfo().catch(()=> {})
    }
  },
  mounted() {
    document.title = `被发现啦(*´∇｀*)---${this.blogInfo.blogName}的博客`;
    this.updateScreen()
    window.addEventListener('resize', this.updateScreen)
    window.addEventListener('scroll', this.scrollListener)
    let visProp = this.getHiddenProp()
    this.evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange'
    document.addEventListener(this.evtname, this.visibilityChange, false)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateScreen, false)
    window.removeEventListener('scroll', this.scrollListener, false)
    document.removeEventListener(this.evtname, this.visibilityChange, false)
  },
  methods: {
    ...mapActions([
      'setShowRightNav',
      'getBlogInfo',
      'setArticleMenuTag'
    ]),
    setViewWrapWidth () {
      let temp = 20
      if (this.screen.width > 990 && this.showRightNav) {
        temp = 340
      }
      this.viewWrapWidth = this.screen.width - temp + 'px'
    },
    updateScreen () {
      this.$store.commit(SCREEN_CHANGE, {
        width: window.innerWidth,
        height: window.innerHeight
      })
    },
    scrollListener () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 60) {
        this.showScrollToTop = true
      } else {
        this.showScrollToTop = false
      }
      if (this.articleMenu) {
        for (let i = 0, len = this.articleMenuSource.length; i < len; ++i) {
          let item = this.articleMenuSource[i]
          let top = document.getElementById(item.id).getBoundingClientRect().top
          top += document.body.scrollTop || document.documentElement.scrollTop
          if (scrollTop <= top + 20) {
            this.setArticleMenuTag(item.tag)
            break
          }
        }
      }
    },
    getHiddenProp () {
      var prefixes = ['webkit', 'moz', 'ms', 'o']
      // if 'hidden' is natively supported just return it
      if ('hidden' in document) {
        return 'hidden'
      }
      // otherwise loop over all the known prefixes until we find one
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'Hidden') in document) {
          return prefixes[i] + 'Hidden'
        }
      }
      // otherwise it's not supported
      return null
    },
    getVisibilityState () {
      var prefixes = ['webkit', 'moz', 'ms', 'o']
      if ('visibilityState' in document) return 'visibilityState'
      for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document) {
          return prefixes[i] + 'VisibilityState'
        }
      }
      // otherwise it's not supported
      return null
    },
    visibilityChange () {
      switch (document[this.getVisibilityState()]) {
        case 'visible':
          document.title = `被发现啦(*´∇｀*)---${this.blogInfo.blogName}的博客`;
          break
        case 'hidden':
        default:
          document.title = `藏好啦(つд⊂)---${this.blogInfo.blogName}的博客`;
          break
      }
    }
  }
}
</script>

<style lang="stylus" src="STYLUS/main.styl"></style>

<style lang="stylus">
@import '~STYLUS/color.styl'
#appindex
  width: 100%
  min-height: 100%
  min-width: 320px
  display: flex
  flex-direction: row
  position: absolute
  .admin-wrap
    width: 100%
    position: relative
    display: flex
    flex-direction: row
    .view-wrap
      flex: 1
      min-width: 311px
      height: calc(100vh)
  .content-wrap
    flex: 1
    position: relative
    .view-wrap
      max-width: 1000px
      min-width: 320px
      margin: 0 auto
      padding: 0 10px
      min-height: calc(100vh - 120px)
      transition: width .3s
  .to-top
    position: fixed
    width: 24px
    height: 24px
    background-color: $color-main
    right: 10px
    bottom: 15px
    padding: 5px
    z-index: 1050
    cursor: pointer
    line-height: 0
    display: flex
    flex-direction: row
    align-items: flex-start
    .to-top-line
      position: relative
      width: 2px
      height: 100%
      margin-left: 4px
      background-color: $color-white
      &:first-child
        margin-left: 0px

.slide-fade-enter-active
  transition: all .3s ease
.slide-fade-leave-active
  transition: all .3s ease
.slide-fade-enter
.slide-fade-leave-to
  transform: translateY(20px)
  opacity: 0

.fade-enter-active, .fade-leave-active
  transition: opacity .3s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
