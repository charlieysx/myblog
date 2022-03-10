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
                    title: '首页',
                    showBtn: true
                }
            },
            {
                path: '/archives',
                name: 'Archives',
                component: () => import('/@pages/Archives/index.vue'),
                meta: {
                    title: '归档',
                    scrollFirstScreen: true
                }
            },
            {
                path: '/categories',
                name: 'Categories',
                component: () => import('/@pages/Categories/index.vue'),
                meta: {
                    title: '分类/标签',
                    scrollFirstScreen: true
                }
            },
            {
                path: '/list',
                name: 'ArticleList',
                component: () => import('/@pages/Categories/list.vue'),
                meta: {
                    title: '分类/标签',
                    scrollFirstScreen: true
                }
            },
            {
                path: '/article',
                name: 'article',
                component: () => import('/@pages/Article/index.vue'),
                meta: {
                    title: '文章详情',
                    halfFirstScreen: true
                }
            },
            {
                path: '/friends',
                name: 'Friends',
                component: () => import('/@pages/Friends/index.vue'),
                meta: {
                    title: '友链',
                    scrollFirstScreen: true
                }
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('/@pages/About/index.vue'),
                meta: {
                    title: '关于',
                    halfFirstScreen: true
                }
            },
            {
                path: '/resume',
                name: 'Resume',
                component: () => import('/@pages/Resume/index.vue'),
                meta: {
                    title: '我的简历',
                    halfFirstScreen: true
                }
            },
            {
                path: '/hello',
                name: 'Hello',
                component: () => import('/@pages/Hello/index.vue'),
                meta: {
                    title: 'Hello'
                }
            }
        ]
    }
]

const router = createRouter({
    scrollBehavior(to) {
        const top = to.meta?.scrollFirstScreen ? window.innerHeight : 0
        return { left: 0, top }
    },
    history: createWebHistory(),
    routes
})

// router.afterEach((to) => {
//     const top = to.meta?.scrollFirstScreen ? window.innerHeight : 0
//     CC.useUtils().scrollToTarget(top)
// })

export { router }
