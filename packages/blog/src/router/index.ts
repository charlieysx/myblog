import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
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
                path: '/categories',
                name: 'Categories',
                component: () => import('/@pages/Categories/index.vue'),
                meta: {
                    title: '分类/标签'
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
    history: createWebHistory(),
    routes
})

export { router }
