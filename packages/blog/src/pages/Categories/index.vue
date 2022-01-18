<template>
    <div class="categories">
        <p class="title">分类</p>
        <div class="categories-wrap">
            <div
                v-for="(category, index) in categories"
                :key="index"
                class="category-item"
                @click="toList('category', category.categoryId)"
            >
                {{ category.categoryName }}
                <span>{{ category.articleCount }}篇</span>
            </div>
        </div>
        <p class="title">标签</p>
        <div class="tags-wrap">
            <div
                v-for="(tag, index) in tags"
                :key="index"
                class="tag-item"
                :style="{
                    fontSize: getFontSize(tag.articleCount),
                    opacity: getColor(tag.articleCount)
                }"
                @click="toList('tag', tag.tagId)"
            >
                {{ tag.tagName }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'Categories',
    setup() {
        const articleStore = VV.useStore('article')
        const categories = ref<any[]>([])
        articleStore.getCategoryList().then((res) => {
            categories.value = res.list
        })
        const tags = ref<any[]>([])
        articleStore.getTagList().then((res) => {
            tags.value = res.list
        })

        const { router } = VV.useRouter()

        return {
            categories,
            tags,
            getFontSize(count) {
                let size = 14
                if (count < 3) {
                    size = 14
                } else if (count < 6) {
                    size = 18
                } else if (count < 9) {
                    size = 24
                } else if (count < 12) {
                    size = 32
                } else {
                    size = 40
                }
                return `${size}px`
            },
            getColor(count) {
                let alpha = 0.4
                if (count < 3) {
                    alpha = 0.4
                } else if (count < 6) {
                    alpha = 0.55
                } else if (count < 9) {
                    alpha = 0.7
                } else if (count < 12) {
                    alpha = 0.85
                } else {
                    alpha = 1
                }
                return alpha
            },
            toList(type, id) {
                router.push({
                    name: 'articleList',
                    query: {
                        type: type,
                        id: id
                    }
                })
            }
        }
    }
})
</script>

<style lang="less" scoped>
@import '/@styles/less/g-mixin.less';

.categories {
    position: relative;
    padding: 30px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: show 0.8s;
    .title {
        font-size: 22px;
        color: var(--color-text-1);
        @media (max-width: 768px) {
            font-size: 18px;
        }
        font-weight: blod;
        margin-bottom: 20px;
    }
    .categories-wrap {
        max-width: 600px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 60px;
        align-items: center;
        justify-content: center;
        .category-item {
            padding: 5px 10px;
            margin: 5px;
            border: 1px solid var(--color-text-4);
            border-radius: 5px;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            color: var(--color-text-1);
            transition: all 0.3s;
            font-size: 16px;
            @media (max-width: 768px) {
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color: #999999;
            }
            &:hover {
                background-color: var(--color-text-1);
                color: var(--color-bg-1);
            }
        }
    }
    .tags-wrap {
        max-width: 600px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 20px;
        align-items: flex-end;
        justify-content: center;
        .tag-item {
            position: relative;
            padding: 5px 10px;
            margin: 5px;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            color: var(--color-text-1);
            &:after {
                content: '';
                position: absolute;
                bottom: 0px;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: var(--color-text-1);
                visibility: hidden;
                transform: scaleX(0);
                transition-duration: 0.2s;
                transition-timing-function: ease;
            }
            &:hover {
                &:after {
                    visibility: visible;
                    transform: scaleX(1);
                    transition-duration: 0.2s;
                    transition-timing-function: ease;
                }
            }
        }
    }
}

@keyframes show {
    from {
        margin-top: -10px;
        opacity: 0;
    }
    to {
        margin-top: 0px;
        opacity: 1;
    }
}
</style>
