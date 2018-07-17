import api from 'API/index'
import {
  SCREEN_CHANGE,
  SHOW_RIGHT_NAV,
  IS_ADMIN_WRAP
} from '../mutation-types'

const state = {
  screen: {
    width: 0,
    height: 0
  },
  showRightNav: false,
  isAdminWrap: false
}

const getters = {
  screen (state) {
    return state.screen
  },
  showRightNav (state) {
    return state.showRightNav
  },
  isAdminWrap (state) {
    return state.isAdminWrap
  }
}

const mutations = {
  [SCREEN_CHANGE] (state, data) {
    state.screen = data
  },
  [SHOW_RIGHT_NAV] (state, data) {
    state.showRightNav = data
  },
  [IS_ADMIN_WRAP] (state, data) {
    state.isAdminWrap = data
  }
}

const actions = {
  setShowRightNav (store, show) {
    store.state.showRightNav = show
  },
  setIsAdminWrap (store, isAdminWrap) {
    store.state.isAdminWrap = isAdminWrap
  },
  uploadToQiniu (store, params) {
    return api.uploadToQiniu(params)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
