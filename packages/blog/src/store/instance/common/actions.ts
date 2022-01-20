import state from './state'
import * as api from './api'

const initBlogInfo = async () => {
    const res = await api.getBlogInfo().catch(() => {})
    if (res?.data) {
        Object.assign(state.blogInfo, res.data)
    }
}

const getAboutMe = async () => {
    const res = await api.getAboutMe().catch(() => {})
    if (res?.data) {
        return res.data
    }
    return {}
}

export default {
    initBlogInfo,
    getAboutMe
}
