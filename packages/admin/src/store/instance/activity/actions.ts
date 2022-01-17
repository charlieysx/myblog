import state from './state'
import * as api from './api'
import { Message } from '@arco-design/web-vue'

function loadList() {
    state.activityList.loading = true
    return api
        .loadList(state.activityList.pageOrder - 1, state.activityList.pageNum)
        .then((res) => {
            state.activityList.list = res.activityList.list
            state.activityList.total = res.activityList.totalList
        })
        .catch((err) => {
            Message.error(err.msg || '加载失败')
        })
        .finally(() => {
            state.activityList.loading = false
        })
}

function toWorkbench(activityId: string | number) {
    const commonStore = VV.useStore('common')
    const { WORKBENCH_URL } = VV.useEnvConfig()
    let url = `${WORKBENCH_URL}?id=${activityId}&jwt=${commonStore.state.jwt}`
    let win = window.open('url', '_blank')
    if (win) {
        win.location = url
    }
}

function deleteActivity(activityId: string | number) {
    return api.deleteActivity(activityId)
}

function underActivity(activityId: string | number) {
    return api.underActivity(activityId)
}

export default {
    loadList,
    toWorkbench,
    deleteActivity,
    underActivity
}
