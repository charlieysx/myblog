import state from './state'
import * as api from './api'

const getFriendList = async (params) => {
    const res = await api.getFriendList(params).catch(() => {})
    if (res?.data) {
        return res.data
    }
    return []
}

export default {
    getFriendList
}
