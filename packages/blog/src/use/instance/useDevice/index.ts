import { reactive, ref } from 'vue'

let isMobile = ref(window.innerWidth <= 768)
let screen = reactive({
    width: window.innerWidth,
    height: window.innerHeight
})

VV.useEventListener(window, 'resize', (e) => {
    screen.width = window.innerWidth
    screen.height = window.innerHeight
    if (window.innerWidth <= 768) {
        isMobile.value = true
    } else {
        isMobile.value = false
    }
})

function useDevice() {
    return {
        screen,
        isMobile
    }
}

export type UseDeviceReturnValue = ReturnType<typeof useDevice>

VV.install('useDevice', useDevice)
