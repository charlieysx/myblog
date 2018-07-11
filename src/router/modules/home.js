const home = r => require.ensure([], () => r(require('VIEWS/home/index.vue')), 'home')
const categories = r => require.ensure([], () => r(require('VIEWS/categories/index.vue')), 'categories')
const archives = r => require.ensure([], () => r(require('VIEWS/archives/index.vue')), 'archives')
const articleList = r => require.ensure([], () => r(require('VIEWS/categories/articleList.vue')), 'articleList')

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
    path: '/list/:type/:itemId',
    name: 'articleList',
    component: articleList
  }
]
