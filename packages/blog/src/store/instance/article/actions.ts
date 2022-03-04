import state from './state'
import * as api from './api'

const getArticleList = async (params) => {
    const res = await api.getArticleList(params).catch(() => {})
    return res?.data || []
}

const getArticle = async (id: string) => {
    const res = await api.getArticle(id).catch(() => {})
    return res?.data || []
}

const getCategoryList = async () => {
    const res = await api.getCategoryList().catch(() => {})
    return res?.data || []
}

const getTagList = async () => {
    const res = await api.getTagList().catch(() => {})
    return res?.data || []
}

const getArchives = async (params) => {
    const res = await api.getArchives(params).catch(() => {})
    return (
        res?.data || {
            count: 0,
            list: []
        }
    )
}

export default {
    getArticleList,
    getArticle,
    getCategoryList,
    getTagList,
    getArchives
}
