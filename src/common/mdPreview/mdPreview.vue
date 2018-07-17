<template>
  <div id="md-preview">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
    <section id="markdown-preview-body" class="preview markdown-body" v-html="htmlContent" v-highlight>
    </section>
  </div>
</template>

<script>
import { markdown } from 'UTIL/markdown'

export default {
  name: 'md-preview',
  props: ['contents'],
  data() {
    return  {
      imgList: [],
      htmlContent: ''
    }
  },
  components: {
  },
  created() {
    this.htmlContent = this.markdownHtml(this.contents)
    setTimeout(this.getImg, 1000)
  },
  mounted() {
  },
  methods: {
    markdownHtml: function (str) {
      return markdown(str)
    },
    getImg() {
      let imgDomList = document.getElementById('markdown-preview-body').getElementsByTagName('img')
      this.imgList = []
      Array.prototype.slice.call(imgDomList).forEach((img, index) => {
        img.indexTag = index
        img.onclick = this.showBigImg
        this.imgList.push({
          src: img.src,
          w: img.width,
          h: img.height,
          target: img
        })
      })
    },
    showBigImg(e) {
      this.$photoPreview.open(e.target.indexTag, this.imgList)
    }
  }
}
</script>

<style lang="stylus" src="STYLUS/markdown.styl"></style>

<style lang="stylus">
@import '~STYLUS/color.styl'
#md-preview
  position: relative
  width: 100%
</style>
