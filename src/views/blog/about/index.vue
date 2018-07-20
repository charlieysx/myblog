<template>
  <div id="about">
    <div class="about-warp">
      <div class="about-message">
        <p class="about-title">
          关于我
        </p>
      </div>
      <md-preview :contents="about.contents" />
      <div class="money-wrap">
        <p>如果我的文章对您有帮助！有钱的捧个钱场，没钱的捧个人场，谢谢您！</p>
        <div class="money-btn" @click="showQrcode = !showQrcode">赞赏支持</div>
        <transition name="slide-fade">
          <div class="qrcode-wrap" v-show="showQrcode">
            <span class="qrcode">
              <img src='~IMAGES/wechatpay.jpg'/>
              <p>微信支付</p>
            </span>
            <span class="qrcode">
              <img src='~IMAGES/alipay.jpg'/>
              <p>支付宝支付</p>
            </span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

import mdPreview from 'COMMON/mdPreview/mdPreview'

export default {
  name: 'about-content',
  components: {
    mdPreview
  },
  data () {
    return {
      showQrcode: false,
      about: {
        contents: `### 一、前言

>本来想做个微信小程序，实现一键生成海报图片（可替换文字、图片，不需要用户排版），所以后台管理系统上需要实现一个制作海报模板的功能（“简单版ps”），写了挺长时间的，逻辑太多了，现在写得差不多了，但是由于各种事情项目一直没有进展，估计是没能做完了，所以把这个“简单版ps”开源出来。

### 二、界面

![](https://user-gold-cdn.xitu.io/2018/6/13/163f7dea6cd6e2af?w=1919&h=958&f=jpeg&s=86423)
![](https://user-gold-cdn.xitu.io/2018/6/13/163f7dee7b1c62f6?w=1919&h=959&f=jpeg&s=273501)

### 三、动态效果图

![](https://user-gold-cdn.xitu.io/2018/6/13/163f7e2439b9e35b?w=1220&h=832&f=gif&s=4549591)

### 四、测试代码高亮

\`\`\`javascript
import Hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'

let Highlight = {}
Highlight.install = function (Vue, options) {
  Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
      Hljs.highlightBlock(block)
    })
  })
}
export default Highlight
\`\`\`
`
      }
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
#about
  position: relative
  padding: 30px 10px
  width: 100%
  .about-warp
    position: relative
    animation: show .8s
    padding: 30px
    width: 100%
    @media (max-width: 768px)
      padding: 30px 15px
    background-color: $color-white
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
    .about-message
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .about-title
        font-size: 26px
        @media (max-width: 768px)
          font-size: 22px
        font-weight: bold
    .money-wrap
      width: 100%
      padding: 20px 30px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      > p
        line-height: 2
        color: #555555
        font-size: 14px
        margin-top: 20px
        text-align: center
      .money-btn
        margin-top: 10px
        padding: 10px 24px
        background-color: #f44336
        border-radius: 5px
        color: $color-white
        font-size: 16px
        font-weight: bold
        cursor: pointer
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        transition: background-color .3s
        &:hover
          background-color: lighten(#f44336, 30%)
      .qrcode-wrap
        margin-top: 10px
        display: flex
        flex-direction: row
        justify-content: center
        align-items: center
        flex-wrap: wrap
        .qrcode
          width: 200px
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          margin-bottom: 10px
          padding: 10px
          > img
            width: 180px
            height: 180px
          > p
            text-align: center
            line-height: 1.5
            color: #555555
            font-size: 14px


.slide-fade-enter-active
  transition: all .3s ease
.slide-fade-leave-active
  transition: all .3s ease
.slide-fade-enter
.slide-fade-leave-to
  transform: translateY(20px)
  opacity: 0
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
