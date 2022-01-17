import { createState } from '../../base/index'
import { TemplateStore } from './type'

export default createState<TemplateStore.State>({
    loading: false,
    list: []
})
