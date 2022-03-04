import state from './state'
import * as api from './api'

const getFriendList = async (params) => {
    const res = await api.getFriendList(params).catch(() => {})
    return res?.data || []
}

export default {
    getFriendList
}
