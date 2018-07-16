import {
  SCREEN_CHANGE,
  SHOW_RIGHT_NAV,
  IS_ADMIN_WRAP,
  ADMIN_LEFT_MENU_ACTIVE_ITEM
} from '../mutation-types'

const state = {
  screen: {
    width: 0,
    height: 0
  },
  showRightNav: false,
  isAdminWrap: false,
  adminLeftMenuActiveItem: '1'
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
  },
  adminLeftMenuActiveItem (state) {
    return state.adminLeftMenuActiveItem
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
  },
  [ADMIN_LEFT_MENU_ACTIVE_ITEM] (state, data) {
    state.adminLeftMenuActiveItem = data
  }
}

const actions = {
  setShowRightNav (store, show) {
    store.state.showRightNav = show
  },
  setIsAdminWrap (store, isAdminWrap) {
    store.state.isAdminWrap = isAdminWrap
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
