export namespace CommonStore {
    export interface State {
        loading: boolean
        jwt: string
        isLogin: boolean
        userInfo?: UserInfo
    }

    export interface UserInfo {
        id: string
        name: string
        password: string
        role: string[]
        roleeName: string
    }
}
