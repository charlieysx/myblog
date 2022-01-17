import state from './state'
import * as api from './api'

function loadAllTheme() {
    return api.loadAllTheme().then((res) => {
        state.list = res.list
    })
}

function createActivity(activityId: string | number) {
    return api.createActivity(activityId).then((res) => {
        const activityStore = VV.useStore('activity')
        activityStore.toWorkbench(res.activityId)
    })
}

export default {
    loadAllTheme,
    createActivity
}
