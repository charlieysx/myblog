<template>
  <div id="categories">
    <p class="title">分类</p>
    <div class="categories-wrap">
      <div 
        v-for="(category, index) in categories"
        :key="index"
        class="category-item">
        {{ category.name }}
        <span>{{ category.count }}篇</span>
      </div>
    </div>
    <p class="title">标签</p>
    <div class="tags-wrap">
      <div 
        v-for="(tag, index) in tags"
        :key="index"
        class="tag-item"
        :style="{
          fontSize: getFontSize(tag.count),
          color: getColor(tag.count)
        }">
        {{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'categories',
  components: {
  },
  data () {
    return {
      categories: [
        {
          name: 'vue',
          count: 1
        },
        {
          name: 'android',
          count: 1
        },
        {
          name: '记录',
          count: 10
        },
        {
          name: '生活',
          count: 125
        },
        {
          name: '生活',
          count: 1
        },
        {
          name: '生活',
          count: 1
        },
        {
          name: '生活',
          count: 1
        },
        {
          name: '生活',
          count: 1
        },
        {
          name: '生活',
          count: 1
        }
      ],
      tags: [
        {
          name: 'ui',
          count: 1
        },
        {
          name: 'vue',
          count: 10
        },
        {
          name: 'vue',
          count: 10
        },
        {
          name: 'vue',
          count: 100
        },
        {
          name: 'Hexo',
          count: 14
        },
        {
          name: 'vue',
          count: 7
        },
        {
          name: 'vue',
          count: 25
        },
        {
          name: '编译原理',
          count: 9
        },
        {
          name: 'vue',
          count: 9
        },
        {
          name: 'vue',
          count: 20
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    getFontSize (count) {
      let size = 14
      if (count < 5) {
        size = 14
      } else if (count < 10) {
        size = 18
      } else if (count < 15) {
        size = 24
      } else if (count < 25) {
        size = 32
      } else {
        size = 40
      }
      return size + 'px'
    },
    getColor (count) {
      let alpha = 0.2
      if (count < 5) {
        alpha = 0.2
      } else if (count < 10) {
        alpha = 0.4
      } else if (count < 15) {
        alpha = 0.6
      } else if (count < 25) {
        alpha = 0.8
      } else {
        alpha = 1
      }
      return 'rgba(38, 42, 48, ' + alpha + ')'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#categories
  position: relative
  padding: 30px 10px
  display: flex
  flex-direction: column
  align-items: center
  animation: show .8s
  .title
    font-size: 22px
    @media (max-width: 768px)
      font-size: 18px
    font-weight: blod
    margin-bottom: 20px
  .categories-wrap
    max-width: 600px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin-bottom: 60px
    align-items: center
    justify-content: center
    .category-item
      padding: 5px 10px
      margin: 5px
      border: 1px solid #eeeeee
      border-radius: 5px
      cursor: pointer
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
      color: $color-main
      transition: all .3s
      font-size: 16px
      @media (max-width: 768px)
        font-size: 14px
      > span
        font-size: 12px
        color: #999999
      &:hover
        background-color: $color-main
        color: $color-white
  .tags-wrap
    max-width: 600px
    display: flex
    flex-direction: row
    flex-wrap: wrap
    margin-bottom: 20px
    align-items: flex-end
    justify-content: center
    .tag-item
      position: relative
      padding: 5px 10px
      margin: 5px
      cursor: pointer
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
      color: $color-main
      &:after
        content: ""
        position: absolute
        bottom: 0px
        left: 0
        width: 100%
        height: 2px
        background-color: $color-main
        visibility: hidden
        transform: scaleX(0)
        transition-duration: .2s
        transition-timing-function: ease
      &:hover
        &:after
          visibility: visible
          transform: scaleX(1)
          transition-duration: .2s
          transition-timing-function: ease


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
