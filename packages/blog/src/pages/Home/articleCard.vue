<template>
    <div class="article-card">
        <div class="article-card-wrap">
            <div
                class="article-cover"
                :style="{
                    backgroundImage: 'url(' + cover + ')'
                }"
                @click="showArticle"
            >
                <div class="article-title">
                    <span>{{ info.article.title }}</span>
                </div>
            </div>
            <div class="article-info">
                <i class="iconfont icon-calendar"></i>
                发表于 {{ publishTime }} •
                <i class="iconfont icon-folder"></i>
                <span class="classify" @click="toList('category', info.category.id)">
                    {{ info.category.name }}
                </span>
                •
                <icon-eye />
                {{ info.article.pageview }}次围观
            </div>
            <div class="article-sub-message">{{ info.article.subMessage }}</div>
            <div class="tags" v-if="info.tags.length > 0">
                <div v-for="(tag, index) in info.tags" :key="index" class="tag" @click="toList('tag', tag.id)">
                    <icon-tag />
                    {{ tag.name }}
                </div>
            </div>
            <div class="read-more" @click="showArticle">阅读全文 >></div>
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
            return dayjs(props.info.article?.publishTime * 1000).format('YYYY年MM月DD日')
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
    min-height: 603px;
    @media (max-width: 768px) {
        min-height: 285.5px;
        padding: 10px;
    }
    line-height: 1.2;
    animation: show 0.8s;
    .article-card-wrap {
        position: relative;
        .article-cover {
            position: relative;
            width: 100%;
            background-position: center;
            background-size: cover;
            cursor: pointer;
            &:before {
                top: 0;
                left: 0;
                width: 100%;
                padding-top: 50%;
                content: ' ';
                background: rgba(0, 0, 0, 0.5);
                display: block;
            }
            .article-title {
                position: absolute;
                font-size: 24px;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                @media (max-width: 768px) {
                    font-size: 18px;
                }
                font-weight: bold;
                color: white;
                .flex();
                padding: 10px;
                span {
                    position: relative;
                    &:after {
                        content: '';
                        position: absolute;
                        bottom: 0px;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background-color: white;
                        visibility: hidden;
                        transform: scaleX(0);
                        transition-duration: 0.2s;
                        transition-timing-function: ease;
                    }
                }
            }

            &:hover {
                .article-title {
                    span {
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

        .article-info {
            font-size: 14px;
            @media (max-width: 768px) {
                font-size: 12px;
            }
            margin: 20px 0px;
            color: var(--blog-color-black-1);
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            .classify {
                .p-r();
                color: var(--blog-color-black-3);
                cursor: pointer;
                margin-right: 5px;
                &:after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background-color: var(--blog-color-black-3);
                    visibility: visible;
                    transform: scale(1, 0.4);
                    transition-duration: 0.2s;
                    transition-timing-function: ease;
                }
                &:hover {
                    color: var(--blog-color-black-1);
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
        }
        .read-more {
            .p-r();
            display: inline-block;
            font-size: 14px;
            margin-top: 20px;
            color: var(--blog-color-black-1);
            @media (max-width: 768px) {
                font-size: 12px;
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
        .tags {
            .p-r();
            width: 100%;
            padding: 10px 0px;
            .flex(flex-start);
            flex-wrap: wrap;
            margin-bottom: 10px;
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
                padding-right: 10px;
                background-color: var(--blog-color-black-1);
                font-size: 12px;
                margin-right: 12px;
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
