export namespace UseWindow {
    export enum Env {
        dev = 'dev',
        prod = 'prod'
    }
}

declare global {
    interface Window {
        __loadAssetsList: (type: string, list: string[], callback: Function) => any
        __loadJs: (src: string, callback: Function) => any
        __loadCss: (src: string, callback: Function) => any
        __loadAssetsListFromCdn: (type: string, list: string[], callback: Function) => any
        __loadJsFromCdn: (name: string, callback: Function) => any
        __loadCssFromCdn: (name: string, callback: Function) => any
        __env: UseWindow.Env
        _query: Record<string, any>
        _hQuery: Record<string, any>
    }
}
