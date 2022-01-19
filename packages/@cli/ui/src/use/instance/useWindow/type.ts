export namespace UseWindow {
    export enum Env {
        dev = 'dev',
        prod = 'prod'
    }
}

declare global {
    interface Window {
        _query: Record<string, any>
        _hQuery: Record<string, any>
    }
}
