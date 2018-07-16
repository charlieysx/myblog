import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import admin from './modules/admin'
import user from './modules/user'

Vue.use(Vuex)

const modules = { common, admin, user }

const store = new Vuex.Store({
  modules
})

export default store
