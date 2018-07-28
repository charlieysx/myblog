import marked from 'marked'

let renderer = new marked.Renderer()

let index = 0
renderer.heading = function (text, level) {
  return `<h${level} class="my-blog-head" id="my-blog-head${index++}">${text}</h${level}>`
}

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true
})

export function markdown (str) {
  return marked(str, { renderer: renderer })
}
