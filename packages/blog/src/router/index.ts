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
                path: '/archives',
                name: 'Archives',
                component: () => import('/@pages/Archives/index.vue'),
                meta: {
                    title: '归档'
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
                path: '/list',
                name: 'ArticleList',
                component: () => import('/@pages/Categories/list.vue'),
                meta: {
                    title: '分类/标签'
                }
            },
            {
                path: '/article',
                name: 'article',
                component: () => import('/@pages/Article/index.vue'),
                meta: {
                    title: '文章详情'
                }
            },
            {
                path: '/friends',
                name: 'Friends',
                component: () => import('/@pages/Friends/index.vue'),
                meta: {
                    title: '友链'
                }
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('/@pages/About/index.vue'),
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
