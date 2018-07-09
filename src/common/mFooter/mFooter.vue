<template>
  <div id="m-footer">
    <div class="footer-wrap">
      <p>
        @CodeBear ———— 认识，了解，探索，超越。
      </p>
      <p>
        本站点采用 <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" target="_blank">知识共享 署名-非商业性使用-禁止演绎 4.0 国际 许可协议</a>
      </p>
      <p>
        本站由 @CodeBear 创建。 (●'◡'●)ﾉ 本博客已默默运行了 1 天，总访问量 0 次 - © 2018
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'm-footer',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#m-footer
  position: relative
  height: 120px
  width: 100%
  background-color: #f9f9f9
  .footer-wrap
    position: relative
    max-width: 1000px
    padding: 0 20px
    margin: 0 auto
    height: 120px
    font-size: 14px
    @media (max-width: 768px)
      font-size: 12px
    display: flex
    flex-direction: column
    justify-content: center
    color: #999999
    > p
      margin: 4px 0
      a
        color: #a6a6a6
        text-decoration: underline
</style>
