const article = r => require.ensure([], () => r(require('VIEWS/article/index.vue')), 'article')

export default [
  {
    path: '/article/:articleId',
    name: 'article',
    component: article
  }
]
