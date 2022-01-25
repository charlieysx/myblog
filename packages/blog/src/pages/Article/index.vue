<template>
    <div class="article">
        <div class="article-warp" v-if="state.article.id">
            <div class="article-message">
                <p class="article-title">
                    {{ state.article.title }}
                </p>
                <div class="article-info">
                    <i class="iconfont icon-calendar"></i>
                    发表于 {{ state.article.publishTime }} •
                    <i class="iconfont icon-folder"></i>
                    <span class="classify" @click="toList('category', state.category.id)">
                        {{ state.category.name }}
                    </span>
                    •
                    <i class="iconfont icon-eye"></i>
                    {{ state.article.pageview }}次围观
                </div>
                <div class="article-sub-message">{{ state.article.subMessage }}</div>
            </div>
            <MDPreview :content="state.article.htmlContent" />
            <div class="money-wrap" v-if="state.qrcode">
                <p>如果我的文章对您有帮助！有钱的捧个钱场，没钱的捧个人场，谢谢您！</p>
                <div class="money-btn" @click="state.showQrcode = !state.showQrcode">赞赏支持</div>
                <transition name="slide-fade">
                    <div class="qrcode-wrap" v-show="state.showQrcode">
                        <span class="qrcode">
                            <img :src="state.qrcode.wxpayQrcode" />
                            <p>微信支付</p>
                        </span>
                        <span class="qrcode">
                            <img :src="state.qrcode.alipayQrcode" />
                            <p>支付宝支付</p>
                        </span>
                    </div>
                </transition>
            </div>
            <div class="tags">
                <div
                    v-for="(tag, index) in state.tags"
                    :key="index"
                    class="tag"
                    @click="$router.push({ name: 'articleList', query: { type: 'tag', id: tag.id } })"
                >
                    <icon-tag />
                    {{ tag.name }}
                </div>
            </div>
            <div class="pre-next-wrap">
                <span
                    class="pre-wrap"
                    v-if="state.pn.pre"
                    @click="$router.push({ name: 'article', query: { id: state.pn.pre.id } })"
                >
                    <i class="el-icon-arrow-left"></i>
                    {{ state.pn.pre.title }}
                </span>
                <span
                    class="next-wrap"
                    v-if="state.pn.next"
                    @click="$router.push({ name: 'article', query: { id: state.pn.next.id } })"
                >
                    {{ state.pn.next.title }}
                    <i class="el-icon-arrow-right"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, reactive, watch } from 'vue'
import MDPreview from '/@comp/MDPreview/index.vue'
export default defineComponent({
    name: 'Article',
    components: { MDPreview },
    setup() {
        const { routes } = VV.useRouter()
        const state = reactive<{
            id: string
            article: Record<string, any>
            category: Record<string, any>
            tags: any[]
            qrcode: Record<string, any>
            pn: Record<string, any>
            showQrcode: boolean
        }>({
            id: '',
            article: {},
            category: {},
            tags: [],
            qrcode: {},
            pn: {},
            showQrcode: false
        })
        const articleStore = VV.useStore('article')
        function initData() {
            if (!routes) {
                return
            }
            state.id = routes.query.id as string
            getList()
        }
        watch(() => routes?.query, initData, { immediate: true })
        function getList() {
            articleStore.getArticle(state.id).then((res) => {
                state.article = res.article
                state.article.publishTime = dayjs(state.article.publishTime * 1000).format('YYYY年MM月DD日')
                state.category = res.category
                state.tags = res.tags
                state.qrcode = res.qrcode
                state.pn = res.pn
                console.log(res)
            })
        }
        const { router } = VV.useRouter()
        return {
            state,
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
.article {
    position: relative;
    padding: 30px 10px;
    width: 100%;
    .article-warp {
        position: relative;
        animation: show 0.8s;
        padding: 30px;
        width: 100%;
        @media (max-width: 768px) {
            padding: 30px 15px;
        }
        background-color: var(--color-bg-1);
        box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, 0.1);
        .article-message {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .article-title {
                font-size: 26px;
                color: var(--color-text-1);
                @media (max-width: 768px) {
                    font-size: 22px;
                }
                font-weight: bold;
            }
            .article-info {
                font-size: 14px;
                @media (max-width: 768px) {
                    font-size: 12px;
                }
                margin: 20px 0px;
                color: #666666;
                display: flex;
                flex-direction: row;
                justify-content: center;
                flex-wrap: wrap;
                .classify {
                    color: #444444;
                    border-bottom: 1px solid var(--color-text-1);
                    cursor: pointer;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    margin-right: 5px;
                    &:hover {
                        color: var(--color-text-1);
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
                font-size: 14px;
                color: #999999;
                margin-bottom: 20px;
            }
        }
        .money-wrap {
            width: 100%;
            padding: 20px 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            > p {
                line-height: 2;
                color: #555555;
                font-size: 14px;
                margin-top: 20px;
                text-align: center;
            }
            .money-btn {
                margin-top: 10px;
                padding: 10px 24px;
                background-color: #f44336;
                border-radius: 5px;
                color: var(--color-bg-1);
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                transition: background-color 0.3s;
                &:hover {
                    background-color: var(--color-text-1);
                }
            }
            .qrcode-wrap {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                .qrcode {
                    width: 200px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                    padding: 10px;
                    > img {
                        width: 180px;
                        height: 180px;
                    }
                    > p {
                        text-align: center;
                        line-height: 1.5;
                        color: #555555;
                        font-size: 14px;
                    }
                }
            }
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
                transform: scaleY(0.3);
                background-color: var(--color-text-1);
                left: 0;
                bottom: 0;
            }
            .tag {
                color: var(--color-bg-1);
                padding: 5px;
                background-color: var(--color-text-1);
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
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                &:hover {
                    &:before {
                        border-right: 12px solid var(--color-text-1);
                    }
                    background-color: var(--color-text-1);
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
                    border-right: 12px solid var(--color-text-1);
                    transition: all 0.3s;
                }
                .iconfont {
                    font-size: 12px;
                }
            }
        }
        .pre-next-wrap {
            width: 100%;
            padding-top: 25px;
            display: flex;
            flex-direction: row;
            font-size: 14px;
            color: #555555;
            font-weight: bold;
            .pre-wrap {
                padding-right: 10px;
                text-align: left;
            }
            .next-wrap {
                padding-left: 10px;
                text-align: right;
            }
            .pre-wrap,
            .next-wrap {
                flex: 1;
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                &:hover {
                    color: var(--color-text-3);
                }
            }
        }
    }
}

.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
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
