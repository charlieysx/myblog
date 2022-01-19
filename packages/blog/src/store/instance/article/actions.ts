import state from './state'
import * as api from './api'

const getArticleList = async (params) => {
    const res = await api.getArticleList(params).catch(() => {})
    if (res?.data) {
        return res.data
    }
    return []
}

const getCategoryList = async () => {
    const res = await api.getCategoryList().catch(() => {})
    if (res?.data) {
        return res.data
    }
    return []
}

const getTagList = async () => {
    const res = await api.getTagList().catch(() => {})
    if (res?.data) {
        return res.data
    }
    return []
}

const getArchives = async (params) => {
    const res = await api.getArchives(params).catch(() => {})
    if (res?.data) {
        return res.data
    }
    return {
        count: 0,
        list: []
    }
}

export default {
    getArticleList,
    getCategoryList,
    getTagList,
    getArchives
}
