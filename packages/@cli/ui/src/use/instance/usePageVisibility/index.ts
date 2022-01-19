import { UseEventBus } from '../useEventBus/type'

let isHidden = false

let hiddenProperty = null
if ('hidden' in document) {
    hiddenProperty = 'hidden'
} else if ('webkitHidden' in document) {
    hiddenProperty = 'webkitHidden'
} else if ('mozHidden' in document) {
    hiddenProperty = 'mozHidden'
}

if (hiddenProperty) {
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
    const { emit } = useEventBus()
    useEventListener(document, visibilityChangeEvent, (e) => {
        if (document[hiddenProperty]) {
            isHidden = true
            emit(UseEventBus.KEY.WEB_HIDDEN)
        } else {
            isHidden = false
            emit(UseEventBus.KEY.WEB_RESUME)
        }
    })
}

function usePageVisibility() {
    return {
        isHidden
    }
}

export type UsePageVisibilityReturnValue = ReturnType<typeof usePageVisibility>
;(window as any).usePageVisibility = usePageVisibility
