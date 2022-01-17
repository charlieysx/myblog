import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import EmptyLayout from '/@layout/EmptyLayout/index.vue'
import PageLayout from '/@layout/PageLayout/index.vue'

const routes: RouteRecordRaw[] = [
    {
        redirect: '/',
        path: '/:pathMatch(.*)*'
    },
    {
        path: '/',
        component: PageLayout,
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('/@pages/Home/index.vue'),
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('/@pages/Hello/index.vue'),
                meta: {
                    title: '关于'
                }
            }
        ]
    }
]

const router = createRouter({
    scrollBehavior() {
        return { top: 0 }
    },
    history: createWebHashHistory(),
    routes
})

export { router }
