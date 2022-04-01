<template>
    <ul class="article-directory">
        <li v-for="item in directory" :key="item.tag">
            <span :class="{ active: isCurrent(item) || isParent(item) }" @click="toDirectory(item)">
                {{ item.tag }} {{ item.title }}
            </span>
            <article-directory v-show="isParent(item)" :directory="item.children" />
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CommonStore } from '/@store/instance/common/type'

export default defineComponent({
    name: 'ArticleDirectory',
    props: {
        directory: {
            type: Array as PropType<CommonStore.ArticleDirectoryTag[]>,
            default: () => []
        }
    },
    setup() {
        const { state } = CC.useStore('common')
        function toDirectory(item: CommonStore.ArticleDirectoryTag) {
            let top = document.getElementById(item.id)?.getBoundingClientRect()?.top || 0
            top += document.body.scrollTop || document.documentElement.scrollTop
            CC.useUtils().scrollToTarget(top)
        }
        function isCurrent(item: CommonStore.ArticleDirectoryTag) {
            return item.tag === state.rightNav.articleDirectory.tag
        }
        function isParent(item: CommonStore.ArticleDirectoryTag) {
            return state.rightNav.articleDirectory.tag.indexOf(item.tag) === 0
        }

        return {
            toDirectory,
            isCurrent,
            isParent
        }
    }
})
</script>

<style lang="less" scoped>
.article-directory {
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
            &.active,
            &:hover {
                color: white;
            }
        }
    }
}
</style>
