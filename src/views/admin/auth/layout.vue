<template>
  <div id="auth-layout">
    <div class="layout-wrap">
      <div class="layout-inner">
        <login />
      </div>
    </div>
  </div>
</template>
<script>
import login from 'VIEWS/admin/auth/login'
export default {
  name: 'auth-layout',
  components: {
    login
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#auth-layout
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 9999
  background: $color-main
  .layout-wrap
    width: 500px
    height: 100%
    margin: 0 auto
    display: table
  .layout-inner
    display: table-cell
    vertical-align: middle
</style>
