import { ActivityStore } from './type'
const { authGet, authPost } = VV.useApi()

function loadList(pageOrder: number, pageNum: number) {
    return authGet<{ activityList: { list: ActivityStore.Activity[]; totalList: number } }>(
        '/api/backweb/manage/list',
        {
            params: { pageOrder, pageNum }
        }
    )
}

function deleteActivity(activityId: string | number) {
    return authGet('/api/backweb/workbench/workbench/delete', { params: { activityId } })
}

function underActivity(activityId: string | number) {
    return authGet('/api/backweb/workbench/workbench/offline', { params: { activityId } })
}

export { loadList, deleteActivity, underActivity }
