const article = r => require.ensure([], () => r(require('VIEWS/article/index.vue')), 'article')

export default [
  {
    path: '/admin',
    name: 'article',
    component: article
  }
]
