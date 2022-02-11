<template>
    <div class="tab-view">
        <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="$emit('tab-click', tab)">
            <i :class="['iconfont', tab.icon]"></i>
            <span class="name">{{ tab.name }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
    name: 'TabView',
    props: {
        tabs: {
            type: Array as PropType<
                Array<{
                    icon: string
                    name: string
                }>
            >,
            default: () => {
                return []
            }
        }
    },
    emits: ['tab-click']
})
</script>

<style lang="less" scoped>
.tab-view {
    .p-r();
    font-size: 14px;
    cursor: default;
    animation: show 0.5s;
    > .tab {
        padding: 5px 8px;
        display: inline-block;
        cursor: pointer;
        color: var(--blog-color-black-1);
        transition: all 0.5s;
        border-radius: 5px;
        margin-right: 12px;
        &:last-child {
            margin-right: 0px;
        }
        &:hover {
            color: var(--blog-color-white-1);
            background-color: var(--blog-color-black-1);
        }
        .name {
            margin-left: 5px;
        }
        > .iconfont {
            font-size: 14px;
        }
    }
}
@keyframes show {
    from {
        margin-top: -30px;
        opacity: 0;
    }
    to {
        margin-top: 0px;
        opacity: 1;
    }
}
</style>
