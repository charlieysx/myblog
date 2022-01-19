import { createStore } from '../../base/index'
import state from './state'
import actions from './actions'

const store = createStore({
    state,
    actions
})

export type FriendStore = typeof store

export default {
    install: (storeMap: Record<string, any>) => {
        storeMap.friend = store
    }
}
