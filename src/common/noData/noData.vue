<template>
  <div class="no-data" :style="cls">
    <img class="defalit-img" v-if="this.imgSize === 'default'" src="~IMAGES/nodatadefault.png">
    <img class="small-img" v-else src="~IMAGES/nodatasmall.png">
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
      },
      imgSize: {
        type: String,
        default: 'default'
      }
    },
    computed: {
      cls () {
        if (this.imgSize === 'default') {
          return {
            fontSize: '14px',
            padding: '60px'
          }
        } else {
          return {
            fontSize: '12px',
            padding: '30px'
          }
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
  .defalit-img
    width: 240px
    height: 190px
  .small-img
    width: 120px
    height: 100px
</style>

