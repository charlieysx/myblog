/**
 * 管理本地存储
 */
import Cache from 'web-storage-cache'

const lsCache = new Cache()
const ssCache = new Cache({storage: 'sessionStorage'})

const KEYS = {
  token: 'ak',
  adminInfo: 'adminInfo',
  blogInfo: 'blogInfo',
  commentsInfo: 'commentsInfo'
}

// 这里改为自己的nameSpace，比如项目名称
const nameSpace = 'CBBLOG'

for (let i in KEYS) {
  if (KEYS.hasOwnProperty(i)) {
    KEYS[i] = `${nameSpace}:${i}`.toUpperCase()
  }
}

class CommonStorage {
  constructor (key, exp = null, type = 'localStorage') {
    this.key = key
    this.exp = exp
    this.storage = (type === 'localStorage') ? lsCache : ssCache
  }

  save (value) {
    const options = this.exp ? { exp: this.exp } : null
    this.storage.set(this.key, value, options)
  }

  load () {
    return this.storage.get(this.key)
  }

  delete () {
    this.storage.delete(this.key)
  }
}

export function saveAccessToken (token, expiredIn) {
  lsCache.set(KEYS.token, token, { exp: expiredIn })
}

export function getAccessToken () {
  const token = lsCache.get(KEYS.token)
  return token
}

export function removeAccessToken () {
  lsCache.delete(KEYS.token)
}

export const cachedAdminInfo = new CommonStorage(KEYS.adminInfo, 0)
export const cachedBlogInfo = new CommonStorage(KEYS.blogInfo, 0)
export const cachedCommentsInfo = new CommonStorage(KEYS.commentsInfo, 0)
