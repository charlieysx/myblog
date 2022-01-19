import { createStore } from '../../base/index'
import state from './state'
import actions from './actions'

const store = createStore({
    state,
    actions
})

export type UserStore = typeof store

export default {
    install: (storeMap: Record<string, any>) => {
        storeMap.user = store
    }
}
