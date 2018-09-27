import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'STORE/index'

import blog from './modules/blog'
import admin from './modules/admin'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {
  getAccessToken
} from 'API/cacheService'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(VueRouter)

const routes = [
  ...admin,
  ...blog
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('/admin') !== -1) {
    store.commit('IS_ADMIN_WRAP', true)
  } else {
    let event = to.name
    if (to.name === 'article') {
      event += ` - ${to.query.id}`
    }
    if (to.name === 'articleList') {
      event += `-${to.query.type} - ${to.query.id}`
    }
    window.baidu({
      event: event
    })
    store.commit('IS_ADMIN_WRAP', false)
  }
  if (to.meta.requireAuth) {
    if (!getAccessToken()) {
      store.commit('IS_LOGIN', false)
    }
    NProgress.start()
    next()
  } else {
    NProgress.start()
    next() // 确保一定要调用 next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})
export default router
