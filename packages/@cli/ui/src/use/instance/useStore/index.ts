import commonStore from '@/store/install'

const _store = {}

function useStore(key: string) {
    if (!_store[key]) {
        console.error(`当前模板未注册${key}-store管理`)
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
;(window as any).useStore = useStore
;(window as any).useAllStore = useAllStore

export default {
    register: (storeList?: Array<{ install: (store: Record<string, any>) => any }>) => {
        storeList?.forEach((store) => {
            store.install(_store)
        })
    }
}
