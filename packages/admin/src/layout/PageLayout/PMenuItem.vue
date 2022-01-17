<template>
    <template v-if="routeItem.meta?.isMenuItem">
        <a-menu-item :key="routeItem.path">
            <a-link :to="routeItem.path">
                <template v-if="routeItem.meta?.icon">
                    <component v-if="routeItem.meta?.icon?.type === 'arco-icon'" :is="routeItem.meta?.icon?.content" />
                </template>
                {{ routeItem.meta?.title }}
            </a-link>
        </a-menu-item>
    </template>
    <template v-else>
        <a-sub-menu :key="routeItem.path">
            <template #title>
                <i v-if="routeItem.meta?.icon" :class="['iconfont', routeItem.meta?.icon]" />
                {{ routeItem.meta?.title }}
            </template>
            <template v-if="routeItem.children?.length">
                <p-menu-item v-for="item in routeItem.children" :key="item.path" :route-item="item" />
            </template>
        </a-sub-menu>
    </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export default defineComponent({
    name: 'PMenuItem',
    props: {
        routeItem: {
            type: Object as PropType<RouteRecordRaw>,
            required: true
        }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="less"></style>
