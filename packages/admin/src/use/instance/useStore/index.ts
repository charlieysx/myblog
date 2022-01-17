import { App } from 'vue'
import commonStore from '/@store/install'

const _store = {}

function useStore(key: string) {
    if (!_store[key]) {
        console.error(`当前未注册${key}-store管理`)
        return
    }
    return _store[key]
}

function useAllStore() {
    return _store
}

// 注册通用的store
commonStore?.store?.forEach((store) => {
    store.install(_store)
})

VV.install('useStore', useStore)
VV.install('useAllStore', useAllStore)

export default {
    install: (app: App) => {
        app.config.globalProperties.$store = _store
    },
    register: (storeList?: Array<{ install: (store: Record<string, any>) => any }>) => {
        storeList?.forEach((store) => {
            store.install(_store)
        })
    }
}
