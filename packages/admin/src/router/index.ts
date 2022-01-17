import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import PageLayout from '/@layout/PageLayout/index.vue'
import EmptyLayout from '/@layout/EmptyLayout/index.vue'

const routes: RouteRecordRaw[] = [
    {
        redirect: '/user',
        path: '/:pathMatch(.*)*'
    },
    {
        path: '/',
        component: () => import('/@layout/AuthLayout/index.vue'),
        meta: {
            isMenu: true
        },
        children: [
            {
                path: '/',
                component: PageLayout,
                redirect: '/templates',
                meta: {
                    isFlat: true
                },
                children: [
                    {
                        path: '/templates',
                        name: 'templates',
                        component: () => import('/@pages/ActivityTemplate/index.vue'),
                        meta: {
                            isMenuItem: true,
                            title: '活动模板',
                            icon: {
                                type: 'arco-icon',
                                content: 'icon-dashboard'
                            }
                        }
                    },
                    {
                        path: '/activity/list',
                        name: 'activity-list',
                        component: () => import('/@pages/ActivityList/index.vue'),
                        meta: {
                            isMenuItem: true,
                            title: '活动列表',
                            icon: {
                                type: 'arco-icon',
                                content: 'icon-apps'
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/user',
        redirect: '/user/login',
        component: () => import('/@layout/UserLayout/index.vue'),
        children: [
            {
                path: '/user/login',
                name: 'user-login',
                component: () => import('/@pages/LoginPage/index.vue'),
                meta: {
                    title: '登录'
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
