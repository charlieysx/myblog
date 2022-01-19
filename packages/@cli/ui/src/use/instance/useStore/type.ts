import { Store } from '@/store/index'

export namespace UseStore {
    export type UseStore = <K extends keyof Store>(key: K) => Store[K]
    export type UseAllStore = () => Store
}
