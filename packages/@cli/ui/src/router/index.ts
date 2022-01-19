import { watch } from 'vue'
import { RouteRecordRaw, createRouter, RouteLocationNormalizedLoaded, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'index',
        component: () => import('@views/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export const toRouter = (path: string) => {
    router.push(path)
}

export const watchRouter = (cb: (route: RouteLocationNormalizedLoaded) => void) => {
    watch(router.currentRoute, () => {
        cb(router.currentRoute.value)
    })
}

export const back = () => {
    router.back()
}

export default router
