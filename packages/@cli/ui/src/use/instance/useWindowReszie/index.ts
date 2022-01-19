import { ref, onMounted, onUnmounted, Ref } from 'vue'

export default function useWindowSize(cb: (width: Ref<number>, height: Ref<number>) => void): void {
    const width = ref(window.innerWidth)
    const height = ref(window.innerHeight)
    const update = () => {
        width.value = window.innerWidth
        height.value = window.innerHeight
        cb(width, height)
    }

    onMounted(() => {
        window.addEventListener('resize', update)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', update)
    })
}
