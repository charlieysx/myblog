<template>
  <div id="appindex">
    <div class="content-wrap">
      <!-- header -->
      <m-header />
      <!-- header 结束 -->
      <!-- content -->
      <div class="view-wrap">
        <router-view></router-view>
      </div>
      <!-- content 结束 -->
      <!-- footer -->
      <!-- <Footer></Footer> -->
      <!-- footer 结束 -->
    </div>
    <right-nav />
    <transition name="slide-fade">
      <div class="to-top" @click="scrollToTop" v-show="showScrollToTop">
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
  </div>
</template>

<script>
import {
  SCREEN_CHANGE
} from 'STORE/mutation-types'

import {
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'

import { scroll } from 'MIXINS/scroll'

import mHeader from 'COMMON/mHeader/mHeader'
import rightNav from 'COMMON/rightNav/rightNav'

export default {
  name: 'app',
  components: {
    mHeader,
    rightNav
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
      showScrollToTop: false
    }
  },
  watch: {
  },
  mounted() {
    this.updateScreen()
    window.addEventListener('resize', this.updateScreen)
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateScreen, false)
    window.removeEventListener('scroll', this.scrollListener, false)
  },
  methods: {
    ...mapActions([
      'setShowRightNav'
    ]),
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
    }
  }
}
</script>

<style lang="stylus" src="STYLUS/main.styl"></style>

<style lang="stylus">
@import '~STYLUS/color.styl'
*
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
#appindex
  width: 100%
  height: 100%
  min-width: 320px
  display: flex
  flex-direction: row
  position: absolute
  .content-wrap
    flex: 1
    position: relative
    .view-wrap
      max-width: 1000px
      min-width: 320px
      margin: 0 auto
      height: calc(100vh - 60px)
      padding: 0 10px
  .to-top
    position: fixed
    width: 24px
    height: 24px
    background-color: $color-main
    right: 30px
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
</style>
