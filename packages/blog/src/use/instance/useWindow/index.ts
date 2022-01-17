let query = window._query
let hQuery = window._hQuery || (window as any)._hquery
let mQuery = Object.assign({}, query, hQuery)

const loadUrl = {
    loadAssetsList: window.__loadAssetsList,
    loadJs: window.__loadJs,
    loadCss: window.__loadCss,
    loadAssetsListFromCdn: window.__loadAssetsListFromCdn,
    loadJsFromCdn: window.__loadJsFromCdn,
    loadCssFromCdn: window.__loadCssFromCdn
}

function useWindow() {
    return {
        mQuery,
        query,
        hQuery,
        ...loadUrl
    }
}

export type UseWindowReturnValue = ReturnType<typeof useWindow>

VV.install('useWindow', useWindow)
