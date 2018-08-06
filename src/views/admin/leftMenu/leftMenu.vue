<template>
  <div id="left-menu" :style="{width: collapseMenu ? '64px' : '240px'}">
    <div class="wrap">
    <el-menu
      router
      class="menu"
      background-color="#262a30"
      text-color="#a7b1c2"
      active-text-color="#ffffff"
      :default-active="$route.path"
      :collapse="collapseMenu">
      <el-menu-item index="/admin">
        <i class="iconfont icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-article"></i>
          <span slot="title">文章</span>
        </template>
        <el-menu-item index="/admin/article/publish"><i class="iconfont icon-article-edit"></i>写文章</el-menu-item>
        <el-menu-item index="/admin/article/manage"><i class="iconfont icon-article-manage"></i>文章管理</el-menu-item>
        <el-menu-item index="/admin/article/drafts"><i class="iconfont icon-drafts"></i>草稿箱</el-menu-item>
        <el-menu-item index="/admin/article/deleted"><i class="iconfont icon-deleted"></i>回收站</el-menu-item>
      </el-submenu>
      <el-menu-item index="/admin/categories">
        <i class="iconfont icon-tag"></i>
        <span slot="title">分类/标签</span>
      </el-menu-item>
      <el-menu-item index="/admin/comments">
        <i class="iconfont icon-comments"></i>
        <span slot="title">评论</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icon-config"></i>
          <span slot="title">网站配置</span>
        </template>
        <el-menu-item index="/admin/webConfig"><i class="iconfont icon-base-config"></i>基本配置</el-menu-item>
        <el-menu-item index="/admin/webConfig/about"><i class="iconfont icon-about"></i>关于我</el-menu-item>
        <el-menu-item index="/admin/webConfig/resume"><i class="iconfont icon-resume"></i>我的简历</el-menu-item>
        <el-menu-item index="/admin/webConfig/friends"><i class="iconfont icon-friends-link"></i>友链管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-other"></i>
          <span slot="title">其他</span>
        </template>
        <el-menu-item :route="$route.path" index="0" @click="signOut"><i class="iconfont icon-signout"></i>退出</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="collapse-wrap" @click="toggleCollapse" @mouseover="setLineData" @mouseout="setLineData">
      <span
        class="collapse-line"
        v-for="(line, index) in toggleLineData"
        :key="index"
        :style="{
          width: line.width,
          top: line.top,
          transform: line.transform,
          opacity: line.opacity
        }">
      </span>
    </div>
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
  name: 'left-menu',
  components: {
  },
  data () {
    return {
      collapseMenu: false,
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
        arrowLeftLineData: [
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
        ],
        arrowRightLineData: [
          {
            width: '50%',
            top: '3px',
            transform: 'translateX(7px) rotateZ(45deg)',
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
            transform: 'translateX(7px) rotateZ(-45deg)',
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
      this.collapseMenu = false

      if (value.width <= 580) {
        this.collapseMenu = true
      }
    }
  },
  computed: {
    ...mapGetters([
      'screen'
    ])
  },
  methods: {
    ...mapActions([
      'adminSignOut'
    ]),
    signOut () {
      this.$confirm('是否退出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.adminSignOut()
        }).catch(()=>{})
    },
    toggleCollapse () {
      this.collapseMenu = !this.collapseMenu
      this.toggleLineData = this.collapseMenu ? this.lineStyle.arrowRightLineData : this.lineStyle.arrowLeftLineData
    },
    setLineData (e) {
      if (e.type === 'mouseover') {
        this.toggleLineData = this.collapseMenu ? this.lineStyle.arrowRightLineData : this.lineStyle.arrowLeftLineData
      } else {
        this.toggleLineData = this.lineStyle.normalLineData
      }
    },
    toPage (pageName) {
      this.$router.push({name: pageName})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#left-menu
  position: relative
  height: 100%
  width: 64px
  z-index: 1100
  transition: width .5s
  .wrap
    position: fixed
    height: 100%
    .menu
      position: relative
      height: 100%
      font-weight: bold
      padding-bottom: 30px
      &:not(.el-menu--collapse)
        width: 240px
    .collapse-wrap
      position: absolute
      width: 24px
      height: 24px
      background-color: $color-main
      right: 20px
      bottom: 15px
      padding: 5px
      z-index: 1050
      cursor: pointer
      line-height: 0
      .collapse-line
        position: relative
        display: inline-block
        vertical-align: top
        width: 100%
        height: 2px
        margin-top: 4px
        background-color: $color-white
        transition: all .3s
        &:first-child
          margin-top: 0px
</style>

<style lang="stylus">
.el-menu-item
.el-submenu__title
  font-size: 14px !important
  &.is-active
    background-color: rgb(30, 34, 38) !important
  .iconfont
    margin-right: 10px !important
    font-size: 14px !important
</style>