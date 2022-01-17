import { CommonStore } from './instance/common'
import { TemplateStore } from './instance/template'
import { ActivityStore } from './instance/activity'
export interface Store {
    common: CommonStore
    template: TemplateStore
    activity: ActivityStore
}
