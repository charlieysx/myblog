const home = r => require.ensure([], () => r(require('VIEWS/home/index.vue')), 'home')
const categories = r => require.ensure([], () => r(require('VIEWS/categories/index.vue')), 'categories')
const archives = r => require.ensure([], () => r(require('VIEWS/archives/index.vue')), 'archives')

export default [
  {
    path: '/',
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
  }
]
