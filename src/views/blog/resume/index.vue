<template>
  <div id="resume">
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  name: 'resume',
  components: {
  },
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
    ...mapActions([
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#resume
  position: relative
  padding: 30px 10px
  max-width: 940px
  margin: 0 auto
  animation: show .8s

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
