import { TemplateStore } from './type'
const { authGet } = VV.useApi()

function loadAllTheme() {
    return authGet<{ list: TemplateStore.Template[] }>('/api/backweb/index/allTheme')
}

function createActivity(activityId: string | number) {
    return authGet<{ activityId: string }>('/api/backweb/workbench/create', { params: { activityId } })
}

export { loadAllTheme, createActivity }
