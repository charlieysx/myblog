import { CommonStore } from './type'

const { get } = VV.useApi()

const getBlogInfo = async () => {
    return await get<CommonStore.BlogInfo>('/w/blogInfo')
}

const getAboutMe = async () => {
    return await get('w/getAbout')
}

export { getBlogInfo, getAboutMe }
