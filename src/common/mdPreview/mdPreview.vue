<template>
  <div id="md-preview">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
    <section id="markdown-preview-body" class="preview markdown-body" v-html="contents" v-highlight>
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
      imgList: []
    }
  },
  components: {
  },
  created() {
  },
  watch: {
    contents (content) {
      setTimeout(this.init, 1000)
    }
  },
  mounted() {
    setTimeout(this.init, 1000)
  },
  methods: {
    init() {
      this.getImg()
      this.getMenu()
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
    },
    getMenu() {
      let headNodes = document.getElementById('markdown-preview-body').getElementsByClassName('my-blog-head')
      let headList = []
      Array.prototype.forEach.call(headNodes, item => {
        headList.push({
          top: item.getBoundingClientRect().top,
          index: parseInt(item.tagName.replace('H', '')),
          title: item.innerText
        })
      })
      let tree = this.treeify(headList)
      // console.log(tree)
    },
    treeify(data) {
      let tree = []
      data.forEach(item => {
        item.children = []
        let len = tree.length
        if (len === 0) {
          tree.push(item) // 第一个元素，直接放进tree
        } else {
          let last = tree[len - 1]
          if (item.index <= last.index) { // 如果index比tree最后一个的index小或等于，说明是同级存进去
            tree.push(item)
          } else {
            last.children.push(item) // 否则存进最后一个元素的children
          }
        }
      })
      // 因为上面一层循环，只能处理两层，所以需要遍历孩子节点，出现index不一样的说明不是同级，需要对孩子节点再递归调用生成
      tree.forEach(item => {
        let children = item.children
        let ids = []
        // 判断是否存在index不一样的
        children.forEach(item => {
          if (ids.indexOf(item.index) === -1) {
            ids.push(item.index)
          }
        })
        if (ids.length > 1) {
          // ids的元素大于1说明存在，需要再递归孩子节点
          item.children = this.treeify(children)
        }
      })
      return tree
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
