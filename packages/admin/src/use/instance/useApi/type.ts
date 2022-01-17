import Axios, { Method, AxiosResponse, AxiosRequestConfig } from 'axios'

export namespace UseApi {
    export type AxiosParams = AxiosRequestConfig & {
        refresh?: boolean
        autoLoading?: boolean
        autoLoadingTime?: number
    }

    export type CommonResponse<T = any> = {
        code: number
        data: T
        msg: string
    }
}
