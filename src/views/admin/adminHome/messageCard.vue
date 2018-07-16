<template>
  <div id="message-card">
    <p>{{ title }}</p>
    <slot name="content"></slot>
  </div>
</template>

<script>

export default {
  name: 'message-card',
  props: ['title'],
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
#message-card
  position: relative
  width: calc(50% - 10px)
  @media (max-width: 1009px)
    width: calc(100% - 10px)
  margin: 5px
  transition: all .3s
  box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .2)
  > p
    padding: 15px
    width: 100%
    background-color: #f9f9f9
    color: #555555
    font-size: 16px
    @media (max-width: 759px)
      padding: 10px
      font-size: 14px
    font-weight: bold

</style>
