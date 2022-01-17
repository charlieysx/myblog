import state from './state'
import * as api from './api'

const getArticleList = async (params) => {
    const res = await api.getArticleList(params).catch(() => {})
    if (res?.data) {
        return res.data
    }
    return []
}

export default {
    getArticleList
}
