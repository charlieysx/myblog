import state from './state'
import * as api from './api'
import JwtDecode from 'jwt-decode'
import { CommonStore } from './type'

const decodeJwt = <T = any>(jwt: string): { data: T; exp: number } | null => {
    try {
        const data = JwtDecode<{ data: T; exp: number }>(jwt)
        const { dayjs, current } = VV.useDayjs()
        console.log(dayjs(data.exp * 1000).format())
        if (current.isSameOrAfter(dayjs(data.exp * 1000))) {
            return null
        }
        return data
    } catch (e) {}
    return null
}

function showLoading() {
    state.loading = true
}

function hideLoading() {
    state.loading = false
}

async function checkLogin(jwt?: string) {
    state.userInfo = undefined
    state.jwt = ''
    state.isLogin = false
    if (!jwt) {
        jwt = VV.useStorage().load('login-jwt', '')
    }
    if (!jwt) {
        throw '未登录'
    }
    const jwtInfo = decodeJwt<CommonStore.UserInfo>(jwt)
    if (!jwtInfo) {
        VV.useStorage().remove('login-jwt')
        throw '未登录'
    }
    state.userInfo = jwtInfo.data
    state.jwt = jwt
    state.isLogin = true
    const { dayjs, current } = VV.useDayjs()
    VV.useStorage().save('login-jwt', state.jwt, dayjs(jwtInfo.exp * 1000).diff(current))
}

async function login(name: string, password: string) {
    return api.login(name, password).then((res) => {
        checkLogin(res.jwt)
    })
}

function logout() {
    state.userInfo = undefined
    state.jwt = ''
    state.isLogin = false
    VV.useStorage().remove('login-jwt')
    const { router } = VV.useRouter()
    router.replace({
        path: '/user/login'
    })
}

async function uploadImage(data: FormData) {}

export default {
    showLoading,
    hideLoading,
    checkLogin,
    uploadImage,
    login,
    logout
}
