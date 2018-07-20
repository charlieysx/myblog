import axios from 'axios'
import Qs from 'qs'
import store from 'STORE/index'

import {
  getAccessToken,
  removeAccessToken,
  cachedAdminInfo
} from 'API/cacheService'

import {
  IS_LOGIN,
  SHOW_TOKEN_ERROR
} from 'STORE/mutation-types'

/* eslint-disable */
const API_ROOT = 'http://blogapi.codebear.cn/index.php'
const API_ROOT_DEV = '/localapi'

/* eslint-enable */
axios.defaults.baseURL = (process.env.NODE_ENV === 'production' ? API_ROOT : API_ROOT_DEV)

axios.defaults.headers.Accept = 'application/json'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  if (getAccessToken()) {
    config.headers['accessToken'] = getAccessToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.data.code < 0) {
    if (response.data.code === -4001) {
      // 清空登录信息
      removeAccessToken()
      cachedAdminInfo.delete()
      // // 弹出提示信息
      store.commit(SHOW_TOKEN_ERROR, true)
      // // 弹出登录窗口
      store.commit(IS_LOGIN, false)
    }
    let error = {
      msg: response.data.msg
    }
    return Promise.reject(error)
  }
  return response.data
}, function (error) {
  error = {
    msg: '请求出错'
  }
  return Promise.reject(error)
})

export default {
  /**
   * 管理员登录
   */
  adminLogin (params) {
    return axios.post('a/login', Qs.stringify(params))
  },
  /**
   * 获取七牛token
   */
  getQiniuToken (withWater) {
    return axios.get('a/qiniu/token', {
      params: {
        bucket: 'blogimg',
        withWater: withWater
      }
    })
  },
  /**
   * 上传图片到七牛
   */
  uploadToQiniu (params) {
    return axios.post('http://up-z2.qiniu.com', params, {
      headers: {
        'content-type': 'multipart/form-data'
      },
      withCredentials: false
    })
  },
  /**
   * 获取博客配置
   */
  getBlogConfig () {
    return axios.get('a/webConfig')
  },
  /**
   * 修改博客配置
   */
  modifyBlogConfig (params) {
    return axios.post('a/webConfig/modify', Qs.stringify(params))
  },
  /**
   * 获取 关于我 页面
   */
  getAboutMe () {
    return axios.get('a/webConfig/getAbout')
  },
  /**
   * 修改 关于我 页面
   */
  modifyAboutMe (content) {
    return axios.post('a/webConfig/modifyAbout', Qs.stringify({aboutMeContent: content}))
  }
}
