<template>
    <div class="article-card">
        <div class="article-card-wrap">
            <div class="article-title" @click="showArticle">
                {{ info.article.title }}
            </div>
            <div class="article-info">
                <i class="iconfont icon-calendar"></i>
                发表于 {{ publishTime }} •
                <i class="iconfont icon-folder"></i>
                <span class="classify" @click="toList('category', info.category.id)">
                    {{ info.category.name }}
                </span>
                •
                <i class="iconfont icon-eye"></i>
                {{ info.article.pageview }}次围观
            </div>
            <div class="article-sub-message">{{ info.article.subMessage }}</div>
            <div class="tags">
                <div v-for="(tag, index) in info.tags" :key="index" class="tag" @click="toList('tag', tag.id)">
                    <icon-tag />
                    {{ tag.name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
export default defineComponent({
    name: 'ArticleCard',
    props: {
        info: {
            type: Object as PropType<Record<string, any> & { tags: any[] }>,
            default: () => {
                return {} as PropType<Record<string, any> & { tags: any[] }>
            },
            required: true
        }
    },
    setup(props) {
        const { dayjs } = VV.useDayjs()

        const cover = computed(() => {
            return props.info?.article?.cover || 'http://blogimg.codebear.cn/FrTy2sZVtGZGYMFj6PAuNe7T6g3__water'
        })

        const publishTime = computed(() => {
            return dayjs(props.info?.article?.publishTime * 1000).format('YYYY年MM月DD日')
        })

        const { router } = VV.useRouter()

        return {
            cover,
            publishTime,
            showArticle() {
                router.push({
                    name: 'article',
                    query: {
                        id: props.info?.article?.id
                    }
                })
            },
            toList(type, id) {
                router.push({
                    name: 'ArticleList',
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
.article-card {
    position: relative;
    background-color: var(--blog-color-white-2);
    padding: 20px;
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0px;
    }
    box-shadow: 0 2px 8px 0 var(--blog-color-shadow);
    &:hover {
        box-shadow: 0 2px 12px 5px var(--blog-color-shadow);
    }
    transition: all 0.2s linear;
    min-height: 183px;
    @media (max-width: 768px) {
        min-height: 151px;
        padding: 10px;
    }
    line-height: 1.2;
    .article-card-wrap {
        position: relative;
        animation: show 0.8s;
        .article-title {
            position: relative;
            display: inline-block;
            font-size: 22px;
            color: var(--blog-color-black-1);
            @media (max-width: 768px) {
                font-size: 18px;
            }
            cursor: pointer;
            &:after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: var(--blog-color-black-1);
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

        .article-info {
            font-size: 14px;
            @media (max-width: 768px) {
                font-size: 12px;
            }
            margin: 10px 0px;
            color: var(--blog-color-black-1);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            .classify {
                .p-r();
                color: var(--blog-color-black-1);
                cursor: pointer;
                margin-right: 5px;
                &:after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background-color: var(--blog-color-black-1);
                    visibility: visible;
                    transform: scale(1, 0.4);
                    transition-duration: 0.2s;
                    transition-timing-function: ease;
                }
                &:hover {
                    &:after {
                        visibility: hidden;
                        transform: scale(0, 0.4);
                        transition-duration: 0.2s;
                        transition-timing-function: ease;
                    }
                }
            }
            .iconfont {
                font-size: 14px;
                @media (max-width: 768px) {
                    font-size: 12px;
                }
                margin: 0 5px;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
        .article-sub-message {
            color: var(--blog-color-black-1);
            border-left: 2px solid var(--blog-color-black-4);
            padding-left: 5px;
            font-size: 16px;
            @media (max-width: 768px) {
                font-size: 14px;
            }
            margin-bottom: 10px;
        }
        .tags {
            width: 100%;
            padding: 10px 0px;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            &:after {
                .p-a();
                content: '';
                width: 100%;
                height: 1px;
                transform: scaleY(0.4);
                background-color: var(--blog-color-black-1);
                left: 0;
                bottom: 0;
            }
            .tag {
                color: var(--blog-color-white-1);
                padding: 5px;
                padding-left: 8px;
                background-color: var(--blog-color-black-1);
                font-size: 12px;
                margin-right: 5px;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                transition: all 0.3s;
                position: relative;
                margin-left: 10px;
                margin-top: 10px;
                line-height: 1;
                cursor: pointer;
                &:hover {
                    &:before {
                        border-right: 12px solid var(--blog-color-black-4);
                    }
                    background-color: var(--blog-color-black-4);
                }
                &:before {
                    position: absolute;
                    left: -12px;
                    top: 0;
                    width: 0;
                    height: 0;
                    content: '';
                    border-top: 11px solid transparent;
                    border-bottom: 11px solid transparent;
                    border-right: 12px solid var(--blog-color-black-1);
                    transition: all 0.3s;
                }
                .iconfont {
                    font-size: 12px;
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
