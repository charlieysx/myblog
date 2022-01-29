<template>
    <ul class="article-menu">
        <li v-for="item in menu" :key="item.tag">
            <span @click="toMenu(item)" :class="{ active: isCurrent(item) || isParent(item) }">
                {{ item.tag }} {{ item.title }}
            </span>
            <article-menu :menu="item.children" v-show="isParent(item)" />
            <!-- <article-menu :menu="item.children" /> -->
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType } from 'vue'
import { CommonStore } from '/@store/instance/common/type'

export default defineComponent({
    name: 'ArticleMenu',
    props: {
        menu: {
            type: Array as PropType<CommonStore.ArticleMenuTag[]>,
            default: () => []
        }
    },
    setup() {
        const { state } = VV.useStore('common')
        function toMenu(item: CommonStore.ArticleMenuTag) {
            let top = document.getElementById(item.id)?.getBoundingClientRect()?.top || 0
            top += document.body.scrollTop || document.documentElement.scrollTop
            VV.useUtils().scrollToTarget(top)
        }
        function isCurrent(item: CommonStore.ArticleMenuTag) {
            return item.tag === state.rightNav.articleMenu.tag
        }
        function isParent(item: CommonStore.ArticleMenuTag) {
            return state.rightNav.articleMenu.tag.indexOf(item.tag) === 0
        }

        return {
            toMenu,
            isCurrent,
            isParent
        }
    }
})
</script>

<style lang="less" scoped>
.article-menu {
    width: 100%;
    line-height: 1.8;
    font-weight: bold;
    font-size: 14px;
    color: #999;
    > li {
        margin-left: 10px;
        list-style: none;
        > span {
            cursor: pointer;
            transition: all 0.3s;
            border-bottom: 1px solid #555555;
            &.active,
            &:hover {
                color: var(--color-bg-1);
            }
        }
    }
}
</style>
