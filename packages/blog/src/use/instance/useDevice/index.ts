import { ref } from 'vue'

let isMobile = ref(window.innerWidth <= 768)

VV.useEventListener(window, 'resize', (e) => {
    if (window.innerWidth <= 768) {
        isMobile.value = true
    } else {
        isMobile.value = false
    }
})

function useDevice() {
    return {
        isMobile
    }
}

export type UseDeviceReturnValue = ReturnType<typeof useDevice>

VV.install('useDevice', useDevice)
