let query = window._query
let hQuery = window._hQuery || (window as any)._hquery
let mQuery = Object.assign({}, query, hQuery)

function useWindow() {
    return {
        mQuery,
        query,
        hQuery
    }
}

export type UseWindowReturnValue = ReturnType<typeof useWindow>
;(window as any).useWindow = useWindow
