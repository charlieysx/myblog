const { CDN_URL, BASE_URL } = CC.useEnvConfig()
const { md5 } = CC.useUtils()

const baseUrl = BASE_URL.replace(/\/$/, '')

/**
 * 创建资源加载器
 */
const createAssetsLoader = () => {
    /**
     * 用于监听资源加载回调
     * @param scope
     * @param resolve
     * @param reject
     */
    const listenEvent = (scope: HTMLElement, resolve: (v: any) => any, reject: (v: any) => any) => {
        scope.onload = (e) => {
            scope.onload = null
            resolve(e)
        }
        scope.onerror = (e) => {
            scope.onerror = null
            reject(e)
        }
    }
    /**
     * 加载js
     * @param src
     */
    const _loadJs = (src: string) => {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script')
            listenEvent(script, resolve, reject)
            script.src = src
            document.head.appendChild(script)
        })
    }
    /**
     * 加载css
     * @param src
     */
    const _loadCss = (src: string) => {
        return new Promise((resolve, reject) => {
            let link = document.createElement('link')
            link.rel = 'stylesheet'
            link.type = 'text/css'
            listenEvent(link, resolve, reject)
            link.href = src
            document.head.appendChild(link)
        })
    }

    return {
        _loadJs,
        _loadCss
    }
}

const loader = createAssetsLoader()

const loading = {}
const hadLoad = new Set()

async function load(type: 'js' | 'css', src: string) {
    const md5Key = md5(src, 16)
    let st = new Date().getTime()
    return new Promise((resolve, reject) => {
        if (hadLoad.has(md5Key)) {
            return resolve(true)
        }
        if (loading[md5Key]) {
            loading[md5Key].push(resolve)
            return
        }
        console.log(`%c 开始加载${type}`, 'color: #ffffff;background-color: #2a5caa;padding: 5px', src)
        loading[md5Key] = [resolve]
        let methods = type === 'js' ? '_loadJs' : '_loadCss'
        loader[methods](src)
            .then(() => {
                const et = new Date().getTime()
                console.log(
                    `%c ${type}加载完成`,
                    'color: #ffffff;background-color: #1d953f;padding: 5px',
                    '耗时：',
                    et - st,
                    '毫秒',
                    src
                )
                loading[md5Key].forEach((fn) => fn(true))
                delete loading[md5Key]
                hadLoad.add(md5Key)
            })
            .catch(reject)
    })
        .then((res) => {
            return res
        })
        .catch((err) => {
            const et = new Date().getTime()
            console.log(
                `%c ${type}加载失败`,
                'color: #ffffff;background-color: #ff0066;padding: 5px',
                '耗时：',
                et - st,
                '毫秒',
                src
            )
            throw err
        })
}

async function loadJs(src: string) {
    return load('js', src)
}

async function loadCss(src: string) {
    return load('css', src)
}

async function loadAssetsList(type: 'js' | 'css', list: string[], async = false) {
    if (async) {
        for (let i = 0; i < list.length; ++i) {
            await load(type, list[i])
        }
        return
    }
    return Promise.all(list.map((src) => load(type, src)))
}

async function loadFromCdn(type: 'js' | 'css', src: string) {
    if (src.indexOf('http') !== 0 && src.indexOf('//') !== 0) {
        src = (CDN_URL || '') + src
    }
    return load(type, src)
}

async function loadJsFromCdn(src: string) {
    return loadFromCdn('js', src)
}

async function loadCssFromCdn(src: string) {
    return loadFromCdn('css', src)
}

async function loadAssetsListFromCdn(type: 'js' | 'css', list: string[], async = false) {
    if (async) {
        for (let i = 0; i < list.length; ++i) {
            await loadFromCdn(type, list[i])
        }
        return
    }
    return Promise.all(list.map((src) => loadFromCdn(type, src)))
}

async function loadFromPublic(type: 'js' | 'css', src: string) {
    if (src.indexOf('http') !== 0 && src.indexOf('//') !== 0) {
        src = (baseUrl || '') + src
    }
    return load(type, src)
}

async function loadJsFromPublic(src: string) {
    return loadFromPublic('js', src)
}

async function loadCssFromPublic(src: string) {
    return loadFromPublic('css', src)
}

async function loadAssetsListFromPublic(type: 'js' | 'css', list: string[], async = false) {
    if (async) {
        for (let i = 0; i < list.length; ++i) {
            await loadFromPublic(type, list[i])
        }
        return
    }
    return Promise.all(list.map((src) => loadFromPublic(type, src)))
}

function useLoadUrl() {
    return {
        baseUrl,
        load,
        loadJs,
        loadCss,
        loadAssetsList,
        loadFromCdn,
        loadJsFromCdn,
        loadCssFromCdn,
        loadAssetsListFromCdn,
        loadFromPublic,
        loadJsFromPublic,
        loadCssFromPublic,
        loadAssetsListFromPublic
    }
}

export type UseLoadUrlReturnValue = ReturnType<typeof useLoadUrl>

CC.install('useLoadUrl', useLoadUrl)
