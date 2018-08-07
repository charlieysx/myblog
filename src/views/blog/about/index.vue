<template>
  <div id="about" v-loading="loading">
    <div class="about-warp">
      <div class="about-message">
        <p class="about-title">
          关于我
        </p>
      </div>
      <md-preview :contents="htmlContent" />
      <div class="money-wrap" v-if="qrcode">
        <p>如果我的文章对您有帮助！有钱的捧个钱场，没钱的捧个人场，谢谢您！</p>
        <div class="money-btn" @click="showQrcode = !showQrcode">赞赏支持</div>
        <transition name="slide-fade">
          <div class="qrcode-wrap" v-show="showQrcode">
            <span class="qrcode">
              <img :src='qrcode.wxpayQrcode'/>
              <p>微信支付</p>
            </span>
            <span class="qrcode">
              <img :src='qrcode.alipayQrcode'/>
              <p>支付宝支付</p>
            </span>
          </div>
        </transition>
      </div>
      <comments id="-1" />
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

import mdPreview from 'COMMON/mdPreview/mdPreview'
import comments from 'COMMON/comments/comments'

export default {
  name: 'about-content',
  components: {
    mdPreview,
    comments
  },
  data () {
    return {
      showQrcode: false,
      htmlContent: '',
      qrcode: '',
      loading: false
    }
  },
  created() {
    this.loading = true
    this.getBlogAboutMe()
      .then((data) => {
        this.htmlContent = data.html
        this.qrcode = data.qrcode
        this.loading = false
      })
      .catch(()=> {
        this.loading = false
      })
  },
  methods: {
    ...mapActions([
      'getBlogAboutMe'
    ])
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
