import api from 'API/index'

const state = {
}

const getters = {
}

const mutations = {
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
