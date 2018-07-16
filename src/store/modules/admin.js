import {
  IS_LOGIN
} from '../mutation-types'

const state = {
  isLogin: false
}

const getters = {
  isLogin (state) {
    return state.isLogin
  }
}

const mutations = {
  [IS_LOGIN] (state, data) {
    state.isLogin = data
  }
}

const actions = {
  setIsLogin (store, isLogin) {
    store.state.isLogin = isLogin
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
