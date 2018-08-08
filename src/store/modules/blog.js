import api from 'API/index'
import {
  SET_BLOG_INFO
} from '../mutation-types'

import {
  cachedBlogInfo
} from 'API/cacheService'

const state = {
  blogInfo: cachedBlogInfo.load() || {}
}

const getters = {
  blogInfo (state) {
    return state.blogInfo
  }
}

const mutations = {
  [SET_BLOG_INFO] (state, data) {
    state.blogInfo = data
  }
}

const actions = {
  /**
   * 获取 关于我 页面
   */
  getBlogAboutMe (store) {
    return api.getBlogAboutMe()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取博客信息
   */
  getBlogInfo (store) {
    return api.getBlogInfo()
      .then((data) => {
        cachedBlogInfo.save(data.data)
        store.commit(SET_BLOG_INFO, data.data)
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取文章列表
   */
  getBlogArticleList (store, params) {
    return api.getBlogArticleList(params)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取文章归档列表
   */
  getBlogArticleArchives (store, params) {
    return api.getBlogArticleArchives(params)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取文章信息
   */
  getBlogArticle (store, articleId) {
    return api.getBlogArticle(articleId)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取分类列表
   */
  getBlogCategoryList (store) {
    return api.getBlogCategoryList()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取标签列表
   */
  getBlogTagList (store) {
    return api.getBlogTagList()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取友链列表
   */
  getBlogFriendsList (store) {
    return api.getBlogFriendsList()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取文章评论列表
   */
  getBlogComments (store, articleId) {
    return api.getBlogComments(articleId)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 添加评论
   */
  replyComments (store, params) {
    return api.replyComments(params)
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 获取 我的简历 页面
   */
  getBlogResume (store) {
    return api.getBlogResume()
      .then((data) => {
        return Promise.resolve(data.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  /**
   * 按文章标题和简介搜索
   */
  searchArticle (store, params) {
    return api.searchArticle(params)
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
