import { createState } from '../../base/index'
import { ActivityStore } from './type'

export default createState<ActivityStore.State>({
    activityList: {
        loading: false,
        list: [],
        total: 0,
        pageOrder: 1,
        pageNum: 10
    }
})
