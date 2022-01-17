import { reactive } from 'vue'

type Primitive = string | number | boolean | bigint | symbol | undefined | null
type Builtin = Primitive | Function | Date | Error | RegExp
type DeepReadonly<T> = T extends Builtin
    ? T
    : T extends Map<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends ReadonlyMap<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends WeakMap<infer K, infer V>
    ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends Set<infer U>
    ? ReadonlySet<DeepReadonly<U>>
    : T extends ReadonlySet<infer U>
    ? ReadonlySet<DeepReadonly<U>>
    : T extends WeakSet<infer U>
    ? WeakSet<DeepReadonly<U>>
    : T extends Promise<infer U>
    ? Promise<DeepReadonly<U>>
    : T extends {}
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : Readonly<T>

type State = Record<string, any>
type Action = Record<string, Function>

interface StoreOptions<S extends State, A extends Action> {
    state: S
    actions: A
}

export function createState<S extends State>(state: S) {
    return reactive(state)
}

type DeepReadonlyStore<S, A> = DeepReadonly<
    {
        state: S
    } & A
>

export function createStore<S extends State, A extends Action>(store: StoreOptions<S, A>) {
    const innerStore = {
        state: store.state,
        ...store.actions
    }
    return innerStore
}
