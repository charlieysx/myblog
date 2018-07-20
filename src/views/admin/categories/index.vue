<template>
  <div id="category-tag">
    <p>分类/标签</p>
  </div>
</template>


<script>

export default {
  name: 'category-tag',
  components: {
  },
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
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
</style>
