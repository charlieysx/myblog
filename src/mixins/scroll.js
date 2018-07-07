var scroll = {
  methods: {
    scrollToTop () {
      let timer = null
      let currentNum = document.body.scrollTop || document.documentElement.scrollTop
      let t = 0
      clearInterval(timer)
      timer = setInterval(() => {
        // 匀加速运动
        t++
        currentNum = currentNum - (2 * t)
        if (currentNum <= 0) {
          document.body.scrollTop = document.documentElement.scrollTop = 0
          clearInterval(timer)
        }
        document.body.scrollTop = document.documentElement.scrollTop = currentNum
      }, 16.7)
    }
  }
}

export { scroll }
