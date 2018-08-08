const home = r => require.ensure([], () => r(require('VIEWS/blog/home/index.vue')), 'home')
const categories = r => require.ensure([], () => r(require('VIEWS/blog/categories/index.vue')), 'categories')
const archives = r => require.ensure([], () => r(require('VIEWS/blog/archives/index.vue')), 'archives')
const articleList = r => require.ensure([], () => r(require('VIEWS/blog/categories/articleList.vue')), 'articleList')
const article = r => require.ensure([], () => r(require('VIEWS/blog/article/index.vue')), 'article')
const about = r => require.ensure([], () => r(require('VIEWS/blog/about/index.vue')), 'about')
const friends = r => require.ensure([], () => r(require('VIEWS/blog/friends/index.vue')), 'friends')
const resume = r => require.ensure([], () => r(require('VIEWS/blog/resume/index.vue')), 'resume')
const search = r => require.ensure([], () => r(require('VIEWS/blog/search/index.vue')), 'search')

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
    path: '/friends',
    name: 'friends',
    component: friends
  },
  {
    path: '/list',
    name: 'articleList',
    component: articleList
  },
  {
    path: '/article',
    name: 'article',
    component: article
  },
  {
    path: '/resume',
    name: 'resume',
    component: resume
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
]
