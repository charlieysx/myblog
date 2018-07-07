<template>
  <div id="appindex">
    <!-- header -->
    <!-- <Header></Header> -->
    <!-- header 结束 -->
    <!-- content -->
    <div class="viewWrap">
      <router-view></router-view>
    </div>
    <!-- content 结束 -->
    <!-- footer -->
    <!-- <Footer></Footer> -->
    <!-- footer 结束 -->
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" src="STYLUS/main.styl"></style>

<style lang="stylus">
#appindex
  width: 100%
  min-width: 320px
  .viewWrap
    max-width: 1280px
    min-width: 320px
    margin: 0 auto
    min-height: calc(100vh - 192px)
</style>
