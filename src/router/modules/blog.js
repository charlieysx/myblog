const home = r => require.ensure([], () => r(require('VIEWS/blog/home/index.vue')), 'home')
const categories = r => require.ensure([], () => r(require('VIEWS/blog/categories/index.vue')), 'categories')
const archives = r => require.ensure([], () => r(require('VIEWS/blog/archives/index.vue')), 'archives')
const articleList = r => require.ensure([], () => r(require('VIEWS/blog/categories/articleList.vue')), 'articleList')
const article = r => require.ensure([], () => r(require('VIEWS/blog/article/index.vue')), 'article')
const about = r => require.ensure([], () => r(require('VIEWS/blog/about/index.vue')), 'about')

export default [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/categories',
    name: 'categories',
    component: categories
  },
  {
    path: '/archives',
    name: 'archives',
    component: archives
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/list/:type/:itemId',
    name: 'articleList',
    component: articleList
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: article
  }
]
