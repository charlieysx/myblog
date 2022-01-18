import { ArticleStore } from './type'

const { get } = VV.useApi()

const getArticleList = async (params) => {
    return await get('/w/article/list', { params })
}

const getCategoryList = async () => {
    return await get('/w/category/list')
}

const getTagList = async () => {
    return await get('/w/tag/list')
}

export { getArticleList, getCategoryList, getTagList }
