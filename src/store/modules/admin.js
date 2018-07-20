import api from 'API/index'
import {
  IS_LOGIN,
  SET_ADMIN_INFO,
  SHOW_TOKEN_ERROR
} from '../mutation-types'

import {
  saveAccessToken,
  getAccessToken,
  cachedAdminInfo,
  removeAccessToken
} from 'API/cacheService'

const state = {
  isLogin: getAccessToken() ? true : false, // eslint-disable-line
  tokenError: false,
  adminInfo: cachedAdminInfo.load() || {}
}

const getters = {
  isLogin (state) {
    return state.isLogin
  },
  tokenError (state) {
    return state.tokenError
  },
  adminInfo (state) {
    return state.adminInfo
  }
}

const mutations = {
  [IS_LOGIN] (state, data) {
    state.isLogin = data
  },
  [SHOW_TOKEN_ERROR] (state, data) {
    state.tokenError = data
  },
  [SET_ADMIN_INFO] (state, data) {
    state.adminInfo = data
  }
}

const actions = {
  setIsLogin (store, isLogin) {
    store.state.isLogin = isLogin
  },
  /**
   * 管理员登录
   */
  adminLogin (store, params) {
    return api.adminLogin(params)
      .then((data) => {
        saveAccessToken(data.data.token.accessToken, data.data.token.exp)
        cachedAdminInfo.save(data.data)
        store.commit(SET_ADMIN_INFO, data.data)
        store.commit(IS_LOGIN, true)
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 退出登录
   */
  adminSignOut (store) {
    console.log('退出登录')
    removeAccessToken()
    cachedAdminInfo.delete()
    this.$store.commit(IS_LOGIN, false)
    this.$store.commit(SET_ADMIN_INFO, {})
  },
  /**
   * 获取七牛token
   */
  getQiniuToken (store, withWater = true) {
    return api.getQiniuToken(withWater)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取博客配置
   */
  getBlogConfig (store) {
    return api.getBlogConfig()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 修改博客配置
   */
  modifyBlogConfig (store, params) {
    return api.modifyBlogConfig(params)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取 关于我 页面
   */
  getAboutMe (store) {
    return api.getAboutMe()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 修改 关于我 页面
   */
  modifyAboutMe (store, content) {
    return api.modifyAboutMe(content)
      .then((data) => {
        return Promise.resolve(data.data)
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
