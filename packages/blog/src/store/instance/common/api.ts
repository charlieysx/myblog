import { CommonStore } from './type'

const { get } = CC.useApi()

const getBlogInfo = async () => {
    return await get<CommonStore.BlogInfo>('/w/blogInfo')
}

const getAboutMe = async () => {
    return await get('w/getAbout')
}

const getResume = async () => {
    return await get('w/getResume')
}

export { getBlogInfo, getAboutMe, getResume }
