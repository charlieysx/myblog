import { UseApi } from './type'
import { Method } from 'axios'
import { request, post, get } from './axios'
import config from './config'

const authRequest = async (method: Method, url: string, opts?: UseApi.AxiosParams) => {
    const options = Object.assign({ params: {}, headers: {}, data: {} }, opts)
    const user = useStore('user')
    options.headers.userid = user.state.id
    return request(method, url, options)
}

const authGet = async (url: string, opts?: UseApi.AxiosParams) => authRequest('get', url, opts)
const authPost = async (url: string, opts?: UseApi.AxiosParams) => authRequest('post', url, opts)

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
;(window as any).useApi = useApi
