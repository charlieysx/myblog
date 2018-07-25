import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import admin from './modules/admin'
import blog from './modules/blog'

Vue.use(Vuex)

const modules = { common, admin, blog }

const store = new Vuex.Store({
  modules
})

export default store
