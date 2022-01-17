import { UseApi } from './type'
import { Method } from 'axios'
import { request, post, get } from './axios'
import config from './config'

const authRequest = async <T = any>(method: Method, url: string, opts?: UseApi.AxiosParams): Promise<T> => {
    const options = Object.assign({ params: {}, headers: {}, data: {} }, opts)
    const commonStore = VV.useStore('common')
    if (commonStore.state.jwt) {
        options.headers.Authorization = `Bear ${commonStore.state.jwt}`
    }
    return request<T>(method, url, options).then((res) => {
        if (+res.code === 503) {
            commonStore.logout()
        }
        if (+res.code !== 0) {
            throw res
        }
        return res.data
    })
}

const authGet = async <T = any>(url: string, opts?: UseApi.AxiosParams) => authRequest<T>('get', url, opts)
const authPost = async <T = any>(url: string, opts?: UseApi.AxiosParams) => authRequest<T>('post', url, opts)

function useApi() {
    return {
        host: config.host,
        request,
        post,
        get,
        authRequest,
        authGet,
        authPost
    }
}

export type UseApiReturnValue = ReturnType<typeof useApi>

VV.install('useApi', useApi)
