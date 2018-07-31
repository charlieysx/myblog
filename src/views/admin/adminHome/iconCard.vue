<template>
  <div id="icon-card"
    :style="{
      backgroundColor: backgroundColor
    }"
    @click="$router.push({name: to})">
      <span class="icon"><i class="iconfont" :class="icon"></i></span>
      <span class="content">
        {{ topMessage }}
        <p>
          {{ middleMessage }}
        </p>
        {{ bottomMessage }}
      </span>
  </div>
</template>

<script>

export default {
  name: 'icon-card',
  props: ['backgroundColor', 'icon', 'topMessage', 'middleMessage', 'bottomMessage', 'to'],
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
#icon-card
  position: relative
  width: calc(20% - 10px)
  @media (max-width: 1450px)
    width: calc(25% - 10px)
  @media (max-width: 1228px)
    width: calc(33.33% - 10px)
  @media (max-width: 990px)
    width: calc(50% - 10px)
  @media (max-width: 759px)
    width: calc(100% - 10px)
    height: 90px
  height: 120px
  border-radius: 5px
  margin: 5px
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  cursor: pointer
  transition: all .3s
  &:hover
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .3)
  .icon
    display: table
    background-color: rgba(255, 255, 255, .2)
    border-radius: 50%
    text-align: center
    width: 60px
    height: 60px
    color: $color-white
    margin: 0 20px
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
    .iconfont
      display: table-cell
      vertical-align: middle
      font-size: 30px
      line-height: 1
  .content
    margin: 0 20px
    display: flex
    flex-direction: column
    text-align: right
    color: #f9f9f9
    font-size: 16px
    font-weight: bold
    line-height: 1
    @media (max-width: 759px)
      font-size: 12px
    > p
      font-size: 24px
      @media (max-width: 759px)
        font-size: 18px
      color: $color-white
      line-height: 1.2

</style>
