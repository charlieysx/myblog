import Axios, { Method, AxiosResponse, AxiosRequestConfig } from 'axios'

export namespace UseApi {
    export type AxiosParams = AxiosRequestConfig & {
        refresh?: boolean
        useAes?: boolean
        autoLoading?: boolean
        autoLoadingTime?: number
        captchaTokenType?: string
    }
}
