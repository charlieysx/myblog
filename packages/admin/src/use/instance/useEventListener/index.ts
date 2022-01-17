import { UseEventListener } from './type'

export let supportsPassive = false

try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
        get() {
            supportsPassive = true
        }
    })
    window.addEventListener('test-passive', null as any, opts)
} catch (e) {}

function useEventListener(
    scope: UseEventListener.Listener,
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
) {
    if (options && typeof options !== 'boolean') {
        const { passive = false, capture = false } = options
        options = supportsPassive ? { capture, passive } : capture
    }
    scope.addEventListener(type, handler, options)
    return () => {
        scope.removeEventListener(type, handler, options)
    }
}

export type UseEventListenerReturnValue = typeof useEventListener

VV.install('useEventListener', useEventListener)
