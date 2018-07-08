<template>
  <div v-show="show" id="right-nav" :style="{
      'width': showRightNav ? '320px' : '0px',
      'transition': 'all .3s'
    }">
    <div class="right-nav-wrap" :style="{
      'width': showRightNav ? '320px' : '0px',
      'transition': 'all .3s'
    }">
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
