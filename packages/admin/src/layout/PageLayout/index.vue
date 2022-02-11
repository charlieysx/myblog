<template>
    <a-layout class="layout">
        <div class="layout-navbar">
            <NavBar />
        </div>
        <a-layout>
            <a-layout-sider
                class="layout-sider"
                :width="menuWidth"
                :collapsed="collapsed"
                @collapsed="setCollapsed"
                collapsible
                hide-trigger
                breakpoint="xl"
                style="padding-top: 60px"
            >
                <div class="menu-wrapper">
                    <a-menu
                        :collapsed="collapsed"
                        auto-open
                        :selected-keys="selectedKeys"
                        @menu-item-click="onClickMenuItem"
                    >
                        <p-menu-item v-for="item in routers" :key="item.path" :route-item="item" />
                    </a-menu>
                </div>

                <div class="collapse-btn" @click="toggleCollapse">
                    <icon-menu-unfold v-if="collapsed" />
                    <icon-menu-fold v-else />
                </div>
            </a-layout-sider>
            <a-layout class="layout-content" :style="{ paddingLeft: menuWidth + 'px' }">
                <a-layout-content>
                    <router-view />
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import NavBar from '/@comp/NavBar/index.vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import PMenuItem from './PMenuItem.vue'

export default defineComponent({
    name: 'PageLayout',
    setup() {
        const router = useRouter()

        const collapsed = ref(false)
        const menuWidth = computed(() => (collapsed.value ? 48 : 220))
        const selectedKeys = computed(() => [router.currentRoute.value.path])

        function setCollapsed(value) {
            collapsed.value = value
        }

        function onClickMenuItem(key) {
            console.log(key)
            router.push(key)
        }

        function pushMenuChildren(route: RouteRecordRaw, menus: RouteRecordRaw[]) {
            // 独立item
            if (route.meta?.isMenuItem) {
                menus.push(route)
                return
            }
            // 平铺
            if (route.meta?.isFlat) {
                route.children?.forEach((item) => {
                    pushMenuChildren(item, menus)
                })
                return
            }
            // 文件夹形式
            const newRoute: RouteRecordRaw = { ...route }
            newRoute.children = []
            menus.push(newRoute)
            route.children?.forEach((item) => {
                pushMenuChildren(item, newRoute.children as RouteRecordRaw[])
            })
        }

        const routers = computed(() => {
            const menus: RouteRecordRaw[] = []
            router.options.routes.forEach((item) => {
                if (item.meta?.isMenu) {
                    item.children?.forEach((child) => {
                        pushMenuChildren(child, menus)
                    })
                } else if (item.meta?.isMenuItem) {
                    menus.push(item)
                }
            })
            return menus
        })

        return {
            collapsed,
            menuWidth,
            selectedKeys,
            onClickMenuItem,
            setCollapsed,
            routers,
            toggleCollapse() {
                setCollapsed(!collapsed.value)
            }
        }
    },
    components: { NavBar, PMenuItem }
})
</script>

<style lang="less">
@page-layout-container-padding: 20px;

.page-layout-container {
    padding: @page-layout-container-padding;
}
</style>

<style lang="less" scoped>
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
    width: 100%;
    height: 100%;
}

.layout-navbar {
    position: fixed;
    width: 100%;
    min-width: @layout-max-width;
    top: 0;
    left: 0;
    height: @nav-size-height;
    z-index: 100;
}

.layout-sider {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    box-sizing: border-box;

    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: -1px;
        width: 1px;
        height: 100%;
        background-color: var(--blog-color-black-4);
    }

    > :global(.arco-layout-sider-children) {
        overflow-y: hidden;
    }

    .collapse-btn {
        height: 24px;
        width: 24px;
        background-color: var(--color-fill-1);
        color: var(--blog-color-black-3);
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        // 位置
        position: absolute;
        bottom: 12px;
        right: 12px;

        &:hover {
            background-color: var(--color-fill-3);
        }
    }
}

.menu-wrapper {
    overflow: auto;
    height: 100%;
}

.layout-content {
    background-color: var(--color-fill-2);
    min-width: @layout-max-width;
    min-height: 100vh;
    transition: padding-left 0.2s;
    box-sizing: border-box;
    padding-left: 220px;
    padding-top: 60px;
}

.spin {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 400px;
}
</style>
