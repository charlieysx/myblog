<template>
  <div class="no-data" :style="cls">
    <img class="default-img" src="~IMAGES/nodatadefault.png">
    <p v-if="text">{{text}}</p>
    <slot v-else></slot>
  </div>
</template>
<script>
export default {
  name: 'noData',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    cls () {
      return {
        fontSize: '14px'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
.no-data
  width: 100%
  height: 100%
  background-color: $color-white
  font-size: 16px
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  min-height: 450px
  @media (max-width: 450px)
    min-height: 280px
  > p
    margin-top: 20px
    color: $color-light-grey
  .default-img
    width: 240px
    height: 190px
</style>

