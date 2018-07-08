<template>
  <div id="header-tab-view">
    <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)">
      <i class="iconfont" :class="tab.icon"></i>
      <span>{{ tab.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-tab-view',
  props: ['tabs'],
  data () {
    return {

    }
  },
  methods: {
    selectTab (tab) {
      this.$emit('tab-click', tab)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#header-tab-view
  position: relative
  font-size: 14px
  cursor: default
  animation: show .5s
  .tab
    padding: 5px 8px
    display: inline-block
    cursor: pointer
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    color: $color-main
    background-color: #f9f9f9
    transition: all .5s
    border-radius: 5px
    margin-right: 5px
    &:last-child
      margin-right: 0px
    &:hover
      color: $color-white
      background-color: $color-main
    .iconfont
      font-size: 12px
    .name
      margin-left: 8px


@keyframes show {
  from {
    margin-top: -30px;
    opacity: 0;
  }
  to {
    margin-top: 0px;
    opacity: 1;
  }
}
</style>
