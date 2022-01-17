export declare namespace UseRouter {}

import 'vue-router'
declare module 'vue-router' {
    interface RouteMeta {
        isFlat?: boolean
        isMenu?: boolean
        isMenuItem?: boolean
        title?: string
        icon?: {
            type?: string
            content: string
        }
    }
}
