import { ArticleStore } from './type'

const { get } = CC.useApi()

const getArticleList = async (params) => {
    return await get('/w/article/list', { params })
}

const getArticle = async (id: string) => {
    return await get('/w/article', { params: { id } })
}

const getCategoryList = async () => {
    return await get('/w/category/list')
}

const getTagList = async () => {
    return await get('/w/tag/list')
}

const getArchives = async (params) => {
    return await get('/w/article/archives', { params })
}

export { getArticleList, getArticle, getCategoryList, getTagList, getArchives }
