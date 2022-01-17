import { createState } from '../../base/index'
import { CommonStore } from './type'

export default createState<CommonStore.State>({
    loading: false,
    jwt: '',
    isLogin: false
})
