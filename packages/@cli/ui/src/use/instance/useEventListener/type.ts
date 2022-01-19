export namespace UseEventListener {
    export interface Listener {
        addEventListener: (
            type: string,
            handler: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions
        ) => void
        removeEventListener: (
            type: string,
            handler: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions
        ) => void
        [key: string]: any
    }
}
