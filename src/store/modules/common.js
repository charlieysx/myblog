import {
  SCREEN_CHANGE,
  SHOW_RIGHT_NAV
} from '../mutation-types'

const state = {
  screen: {
    width: 0,
    height: 0
  },
  showRightNav: false
}

const getters = {
  screen (state) {
    return state.screen
  },
  showRightNav (state) {
    return state.showRightNav
  }
}

const mutations = {
  [SCREEN_CHANGE] (state, data) {
    state.screen = data
  },
  [SHOW_RIGHT_NAV] (state, data) {
    state.showRightNav = data
  }
}

const actions = {
  setShowRightNav (store, show) {
    store.state.showRightNav = show
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
