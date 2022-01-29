import { createState } from '../../base/index'
import { CommonStore } from './type'

export default createState<CommonStore.State>({
    blogInfo: {
        avatar: '',
        blogName: '',
        github: '',
        sign: '',
        articleCount: 0,
        categoryCount: 0,
        tagCount: 0
    },
    rightNav: {
        show: false,
        articleMenu: {
            loading: true,
            show: false,
            list: [],
            source: [],
            tag: '1.'
        }
    }
})
