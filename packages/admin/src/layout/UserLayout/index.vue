<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'UserLayout',
    setup() {
        // const { routes } = VV.useRouter()
        // // 所有菜单路由
        // const menuData = ref<RoutesDataItem[]>(vueRoutes(UserLayoutRoutes, '/user'))
        // // 当前路由 item
        // const routeItem = computed<RoutesDataItem>(() => getRouteItem(routes?.path, menuData.value as RoutesDataItem[]))
        // // 设置title
        // useTitle(routeItem)
    }
})
</script>

<style lang="less"></style>
