const suffix: string[] = ['codebear', 'blog']

function genKey(key: string) {
    return [...suffix, key].join(':')
}

function customSave(key: string, value: any) {
    try {
        let saveValue
        try {
            saveValue = JSON.stringify(value)
        } catch (e) {
            saveValue = value
        }
        window.localStorage.setItem(key, saveValue)
    } catch (e) {
        console.log(e)
        console.log('存储数据失败', key, value)
    }
}

function customLoad<T = any | null>(key: string, defaultValue?: T): T {
    let value: any = window.localStorage.getItem(key)
    if (value === null) {
        return defaultValue as T
    }
    try {
        value = JSON.parse(value)
    } catch (e) {
        console.log(e)
        value = value || defaultValue
    }
    return value
}

function customRemove(key: string) {
    window.localStorage.removeItem(key)
}

function save(key: string, value: any, exp?: number) {
    key = genKey(key)
    const data = {
        v: value,
        e: exp || -1,
        t: new Date().getTime() / 1000
    }
    localStorage.setItem(key, JSON.stringify(data))
}

function load<T = any | null>(key: string, defaultValue?: T): T {
    key = genKey(key)
    const item = localStorage.getItem(key)
    if (item === null) {
        return defaultValue as T
    }
    try {
        let data = JSON.parse(item || '{}')
        if (!data.e || !data.t) {
            localStorage.removeItem(key)
            return defaultValue as T
        }
        if (data.e === -1) {
            return data.v
        }
        if (data.t + data.e <= new Date().getTime() / 1000) {
            localStorage.removeItem(key)
            return defaultValue as T
        }
        return data.v
    } catch (e) {
        localStorage.removeItem(key)
        return defaultValue as T
    }
}

function remove(key: string) {
    key = genKey(key)
    localStorage.removeItem(key)
}

function useStorage() {
    return {
        customSave,
        customLoad,
        customRemove,
        save,
        load,
        remove
    }
}

export type UseStorageReturnValue = ReturnType<typeof useStorage>

VV.install('useStorage', useStorage)
