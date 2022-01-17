import { ArticleStore } from './type'

const { get } = VV.useApi()

const getArticleList = async (params) => {
    return await get('/w/article/list', { params })
}

export { getArticleList }
