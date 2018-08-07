<template>
  <div id="friends" v-loading="loading">
    <div class="type-wrap" v-for="(item, index) in friends" :key="index">
      <p>{{ item.name }}</p>
      <div class="friends-wrap">
        <a v-for="(friend, index) in item.list" :key="index" :href="friend.url" target="_blank">
          {{ friend.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  name: 'friends',
  components: {
  },
  data () {
    return {
      friends: [],
      loading: false
    }
  },
  created() {
    this.loading = true
    this.getBlogFriendsList()
      .then((data) => {
        this.friends = data
        this.loading = false
      })
      .catch(()=> {
        this.friends = []
        this.loading = false
      })
  },
  methods: {
    ...mapActions([
      'getBlogFriendsList'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
#friends
  position: relative
  padding: 30px 10px
  max-width: 940px
  margin: 0 auto
  animation: show .8s
  .type-wrap
    > p
      border-left: 4px solid #999999
      padding: 5px 10px
      font-weight: bold
      font-size: 16px
    .friends-wrap
      padding: 10px
      display: flex
      flex-direction: row
      flex-wrap: wrap
      font-size: 14px
      a
        color: $color-white
        padding: 5px 10px
        background-color: $color-main
        border-radius: 5px
        margin: 5px
        transition: background-color .3s
        &:hover
          background-color: lighten($color-main, 20%)

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
