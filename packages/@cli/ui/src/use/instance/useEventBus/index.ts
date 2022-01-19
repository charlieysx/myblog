const pubSubCache = {
    $$vuuid: 1,
    id_0: {
        // 全局列表
        $$vuuid: 1
    }
}
const messageCache = {
    $$vuuid: 1
}

function register(instance?: any) {
    try {
        instance.$$vuuid = instance.$$vuuid || pubSubCache.$$vuuid++
        pubSubCache[`id_${instance.$$vuuid}`] = {
            $$vuuid: 1
        }
    } catch (e) {
        console.log(`can't register by ${instance}`)
    }
}

function unregister(instance?: any) {
    try {
        delete pubSubCache[`id_${instance.$$vuuid}`]
    } catch (e) {
        console.log(`can't unregister by ${instance}`)
    }
}

function on(type: string, handler: any, instance?: any) {
    if (typeof instance?.$$vuuid === 'undefined') {
        // 直接挂在全局
        instance = {
            $$vuuid: 0
        }
    }
    const handleList = pubSubCache[`id_${instance.$$vuuid}`]
    if (!handleList) {
        throw Error('未注册instance')
    }
    let cache = handleList[type] || (handleList[type] = {})
    handler.$$vuuid = handler.$$vuuid || handleList.$$vuuid++
    cache[handler.$$vuuid] = handler
    checkMessage(type)
}

function checkMessage(type: string) {
    if (messageCache[type]) {
        emit(type, ...messageCache[type])
        delete messageCache[type]
    }
}

function once(type: string, handler: any, instance?: any) {
    handler.$$once = true
    on(type, handler, instance)
}

function emit(type: string, ...params: any) {
    for (const k of Object.keys(pubSubCache)) {
        const handlelist = pubSubCache[k]
        let cache = handlelist[type]
        if (!cache) {
            continue
        }
        for (const key of Object.keys(cache)) {
            const fn = cache[key]
            if (fn.$$once) {
                off(type, fn, {
                    $$vuuid: k.replace('id_', '')
                })
            }
            fn(...params)
        }
    }
}

function stickyEmit(type: string, ...params: any) {
    let hasEmit = false
    for (const k of Object.keys(pubSubCache)) {
        const handlelist = pubSubCache[k]
        let cache = handlelist[type]
        if (!cache) {
            continue
        }
        for (const key of Object.keys(cache)) {
            const fn = cache[key]
            if (fn.$$once) {
                off(type, fn, {
                    $$vuuid: k.replace('id_', '')
                })
            }
            hasEmit = true
            fn(...params)
        }
    }
    if (!hasEmit) {
        messageCache[type] = params
        return
    }
    delete messageCache[type]
}

function off(type: string, handler: any, instance?: any) {
    try {
        instance.$$vuuid = instance.$$vuuid
    } catch (e) {
        // 直接挂在全局
        instance = {
            $$vuuid: 0
        }
    }
    if (!handler || !handler.$$vuuid) {
        // 全部删除
        for (const k of Object.keys(pubSubCache)) {
            const handlelist = pubSubCache[k]
            delete handlelist[type]
        }
        return
    }
    const handleList = pubSubCache[`id_${instance.$$vuuid}`]
    let cache = handleList[type] || (handleList[type] = {})
    if (!cache) {
        return
    }
    if (handler.$$vuuid in cache) {
        delete cache[handler.$$vuuid]
    }
    if (Object.keys(cache).length <= 0) {
        delete handleList[type]
    }
}

function useEventBus() {
    return {
        register,
        unregister,
        on,
        once,
        emit,
        stickyEmit,
        off
    }
}

export type UseEventBusReturnValue = ReturnType<typeof useEventBus>
;(window as any).useEventBus = useEventBus
