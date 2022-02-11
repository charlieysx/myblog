import { ref } from 'vue'
import { UseEventBus } from '../useEventBus/type'

let isHidden = ref(false)

let hiddenProperty: string | null = null
if ('hidden' in document) {
    hiddenProperty = 'hidden'
} else if ('webkitHidden' in document) {
    hiddenProperty = 'webkitHidden'
} else if ('mozHidden' in document) {
    hiddenProperty = 'mozHidden'
}

if (hiddenProperty) {
    const visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
    const { emit } = CC.useEventBus()
    CC.useEventListener(document, visibilityChangeEvent, (e) => {
        if (!hiddenProperty) {
            return
        }
        if (document[hiddenProperty]) {
            isHidden.value = true
            emit(UseEventBus.KEY.WEB_HIDDEN)
        } else {
            isHidden.value = false
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

CC.install('usePageVisibility', usePageVisibility)
