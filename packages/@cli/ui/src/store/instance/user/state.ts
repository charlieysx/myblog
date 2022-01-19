import { createState } from '../../base/index'
import { UserStore } from './type'

export default createState<UserStore.State>({
    id: useUtils().md5(`${new Date().getTime()}-${Math.random()}`, 16)
})
