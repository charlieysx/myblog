<template>
  <div id="home">
    <article-card
      v-for="(article, index) in articles"
      :key="index"
      :article="article" />
  </div>
</template>

<script>

import articleCard from 'COMMON/articleCard/articleCard'

export default {
  name: 'home',
  components: {
    articleCard
  },
  data () {
    return {
      articles: [
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        },
        {
          title: '这是标题',
          publishTime: '2018-07-08',
          classify: {
            id: 0,
            name: 'vue'
          },
          subMessage: '这是文章简介'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/color.styl'
*
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
#home
  position: relative
  padding: 30px 10px
</style>
