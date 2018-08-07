<template>
  <div id="resume" v-loading="loading">
    <div class="resume-warp">
      <div class="resume-message">
        <p class="resume-title">
          我的简历
        </p>
      </div>
      <md-preview :contents="htmlContent" />
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

import mdPreview from 'COMMON/mdPreview/mdPreview'

export default {
  name: 'resume',
  components: {
    mdPreview
  },
  data () {
    return {
      htmlContent: '',
      loading: false
    }
  },
  created() {
    this.loading = true
    this.getBlogResume()
      .then((data) => {
        this.htmlContent = data.html
        this.loading = false
      })
      .catch(()=> {
        this.loading = false
      })
  },
  methods: {
    ...mapActions([
      'getBlogResume'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#resume
  position: relative
  padding: 30px 10px
  width: 100%
  .resume-warp
    position: relative
    animation: show .8s
    padding: 30px
    width: 100%
    @media (max-width: 768px)
      padding: 30px 15px
    background-color: $color-white
    box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, .1)
    .resume-message
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .resume-title
        font-size: 26px
        @media (max-width: 768px)
          font-size: 22px
        font-weight: bold

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
