import api from 'API/index'
import {
  SCREEN_CHANGE,
  SHOW_RIGHT_NAV,
  IS_ADMIN_WRAP,
  SET_ARTICLE_MENU,
  SET_ARTICLE_MENU_SOURCE,
  SET_ARTICLE_MENU_TAG,
  SET_COMMENTS_INFO
} from '../mutation-types'

import {
  cachedCommentsInfo
} from 'API/cacheService'

const state = {
  screen: {
    width: 0,
    height: 0
  },
  showRightNav: false,
  isAdminWrap: false,
  articleMenu: false,
  articleMenuSource: [],
  articleMenuTag: '1.',
  commentsInfo: cachedCommentsInfo.load() || {}
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
  articleMenu (state) {
    return state.articleMenu
  },
  articleMenuSource (state) {
    return state.articleMenuSource
  },
  articleMenuTag (state) {
    return state.articleMenuTag
  },
  commentsInfo (state) {
    return state.commentsInfo
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
  [SET_ARTICLE_MENU] (state, data) {
    state.articleMenu = data
  },
  [SET_ARTICLE_MENU_SOURCE] (state, data) {
    state.articleMenuSource = data
  },
  [SET_ARTICLE_MENU_TAG] (state, data) {
    state.articleMenuTag = data
  },
  [SET_COMMENTS_INFO] (state, data) {
    state.commentsInfo = data
  }
}

const actions = {
  setShowRightNav (store, show) {
    store.state.showRightNav = show
  },
  setIsAdminWrap (store, isAdminWrap) {
    store.state.isAdminWrap = isAdminWrap
  },
  setArticleMenu (store, articleMenu) {
    store.state.articleMenu = articleMenu
  },
  setArticleMenuSource (store, articleMenuSource) {
    store.state.articleMenuSource = articleMenuSource
  },
  setArticleMenuTag (store, articleMenuTag) {
    store.state.articleMenuTag = articleMenuTag
  },
  setCommentsInfo (store, commentsInfo) {
    cachedCommentsInfo.save(commentsInfo)
    store.state.commentsInfo = commentsInfo
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
