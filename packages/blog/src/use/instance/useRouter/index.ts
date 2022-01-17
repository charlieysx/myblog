import { router } from '/@router/index'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'

function useRouter() {
    let routes: RouteLocationNormalizedLoaded | null = null
    try {
        routes = useRoute()
    } catch (e) {}
    return {
        routes,
        router
    }
}

export type UseRouterReturnValue = ReturnType<typeof useRouter>

VV.install('useRouter', useRouter)
