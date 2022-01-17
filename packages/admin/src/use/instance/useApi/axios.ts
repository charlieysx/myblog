import config from './config'
import Axios, { Method, AxiosResponse } from 'axios'
import { UseApi } from './type'

const { md5 } = VV.useUtils()

const axios = Axios.create({
    baseURL: config.host,
    headers: config.defaultHeaders,
    timeout: config.timeout
})

axios.interceptors.request.use(
    (res) => {
        return res
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        return response
    },
    (error) => {
        console.log(error)
        return Promise.reject(error.response && error.response.data)
    }
)

const cacheData: Record<string, any> = {}
const cacheDataKeys: string[] = []
const loadingList: Record<string, { fnList: any }> = {}
const autoLoadingList: Set<string> = new Set()

const clearLoading = (key: string) => {
    if (autoLoadingList.has(key)) {
        autoLoadingList.delete(key)
        if (autoLoadingList.size === 0) {
            // 关闭loading
            VV.useStore('common').hideLoading
        }
    }
}

const getMD5 = (
    method: Method,
    url: string,
    params: Record<string, any>,
    data: Record<string, any>,
    headers: Record<string, any>
) => {
    const str =
        method +
        '_' +
        url +
        '_' +
        Object.entries(data)
            .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
            .sort()
            .join('&') +
        '_' +
        Object.entries(params)
            .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
            .sort()
            .join('&') +
        '_' +
        Object.entries(headers)
            .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
            .sort()
            .join('&')
    return md5(encodeURI(str), 16)
}

const preDeal = async <T = any>(md5Str: string, fn: Promise<AxiosResponse<UseApi.CommonResponse<T>>>) => {
    return fn
        .then((res) => {
            clearLoading(md5Str)
            cacheData[md5Str] = res
            cacheDataKeys.push(md5Str)
            // 只缓存20条数据
            if (cacheDataKeys.length > 20) {
                const key = cacheDataKeys.shift()
                if (key) {
                    delete cacheData[key]
                }
            }
            if (loadingList[md5Str]) {
                loadingList[md5Str].fnList.forEach((resolve) => {
                    resolve(res)
                })
                delete loadingList[md5Str]
            }
            return res.data
        })
        .catch((e) => {
            clearLoading(md5Str)
            // 接口挂了也需要清除
            delete loadingList[md5Str]
            throw e
        })
}

const realRequest = async <T = any>(method: Method, url: string, opts?: UseApi.AxiosParams) => {
    const options = Object.assign({ params: {}, headers: {}, data: {}, refresh: true }, opts)
    console.groupCollapsed('%c api请求发起', 'color: #ffffff;background-color: #8f4b2e;padding: 5px', url)
    console.log('请求方式：', method)
    console.log('请求链接：', url)
    console.log('请求参数：', options)
    const md5Str = getMD5(method, url, options.params, options.data, options.headers)
    let fn: Promise<AxiosResponse<UseApi.CommonResponse<T>>>
    if (loadingList[md5Str]) {
        // 已经有相同的接口发起了，等待结果返回
        console.log('有相同接口发起，整合成一个接口')
        fn = new Promise<AxiosResponse<UseApi.CommonResponse<T>>>((resolve) => {
            loadingList[md5Str].fnList.push(resolve)
        })
    } else {
        loadingList[md5Str] = {
            fnList: []
        }
        if (!options.refresh && cacheData[md5Str]) {
            console.log('从缓存获取数据')
            fn = new Promise<AxiosResponse<UseApi.CommonResponse<T>>>((resolve) => {
                resolve(cacheData[md5Str])
            })
        } else {
            if (opts?.autoLoading) {
                const time = opts.autoLoadingTime || 800
                VV.useStore('common').showLoading()
            }
            fn = axios({
                ...opts,
                url,
                method,
                params: options.params,
                data: options.data,
                headers: options.headers
            })
        }
    }
    console.groupEnd()
    return preDeal<T>(md5Str, fn)
}

const request = async <T = any>(
    method: Method,
    url: string,
    opts?: UseApi.AxiosParams
): Promise<UseApi.CommonResponse<T>> => {
    return realRequest(method, url, opts).then(async (res) => {
        console.groupCollapsed('%c api请求结束', 'color: #ffffff;background-color: #5c7a29;padding: 5px', url)
        console.log('请求方式：', method)
        console.log('请求链接：', url)
        console.log('请求结果：', res)
        console.groupEnd()
        return res
    })
}

const get = async <T = any>(url: string, opts?: UseApi.AxiosParams) => {
    return request<T>('get', url, Object.assign({ params: {}, headers: {}, refresh: true }, opts))
}

const post = async <T = any>(url: string, opts?: UseApi.AxiosParams) => {
    return request<T>('post', url, Object.assign({ data: {}, headers: {}, refresh: true }, opts))
}

export { request, post, get }
