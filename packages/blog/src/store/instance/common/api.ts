import { CommonStore } from './type'

const { get } = VV.useApi()

const getBlogInfo = async () => {
    return await get<CommonStore.BlogInfo>('/w/blogInfo')
}

export { getBlogInfo }
