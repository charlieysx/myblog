<template>
    <transition name="right-nav-fade">
        <div
            v-show="state.show"
            class="right-nav-container"
            :style="{
                width: commonState.rightNav.show ? '320px' : '0px'
            }"
        >
            <div
                class="right-nav-wrap"
                :style="{
                    right: commonState.rightNav.show ? '0px' : '-320px'
                }"
            >
                <div class="menu-info-head" v-if="commonState.rightNav.articleDirectory.show">
                    <span :class="{ active: directory.state.show }" @click="directory.changeShow(true)">文章目录</span>
                    |
                    <span :class="{ active: !directory.state.show }" @click="directory.changeShow(false)">
                        站点信息
                    </span>
                </div>
                <div class="content-wrap">
                    <transition name="slide-fade">
                        <article-directory
                            class="article-menu"
                            :directory="commonState.rightNav.articleDirectory.list"
                            v-show="directory.state.show"
                            v-if="!commonState.rightNav.articleDirectory.loading"
                        />
                        <div v-else v-show="directory.state.show">加载中...</div>
                    </transition>
                    <transition name="slide-fade">
                        <div class="info-wrap" v-show="!directory.state.show">
                            <img class="avatar" :src="commonState.blogInfo.avatar" />
                            <p class="name">{{ commonState.blogInfo.blogName || '博客' }}</p>
                            <p class="motto">{{ commonState.blogInfo.sign || '-' }}</p>
                            <div class="menu-wrap">
                                <span class="menu-item" @click="toView('Archives')">
                                    <p class="count">{{ commonState.blogInfo.articleCount || 0 }}</p>
                                    <p>文章</p>
                                </span>
                                <span class="menu-item" @click="toView('Categories')">
                                    <p class="count">{{ commonState.blogInfo.categoryCount || 0 }}</p>
                                    <p>分类</p>
                                </span>
                                <span class="menu-item" @click="toView('Categories')">
                                    <p class="count">{{ commonState.blogInfo.tagCount || 0 }}</p>
                                    <p>标签</p>
                                </span>
                            </div>
                            <div class="social-wrap">
                                <a
                                    class="social-item"
                                    :href="commonState.blogInfo.github"
                                    target="_blank"
                                    v-if="commonState.blogInfo.github"
                                >
                                    <i class="iconfont icon-github"></i>
                                    github
                                </a>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </transition>
    <icon-toggle v-show="state.show" :isClose="commonState.rightNav.show" @click="toggleRightNav" />
    <icon-theme />
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref, toRaw, toRef, watch } from 'vue'
import ArticleDirectory from './articleDirectory.vue'
import IconTheme from './iconTheme.vue'
import IconToggle from './iconToggle.vue'

function useDirectory() {
    const { state: commonState } = CC.useStore('common')

    const state = reactive({
        show: false
    })

    function changeShow(isShow: boolean) {
        state.show = isShow
    }

    watch(
        () => commonState.rightNav.articleDirectory.show,
        (value) => {
            changeShow(value)
            commonState.rightNav.show = value
        },
        { immediate: true }
    )

    const closeListener = CC.useEventListener(window, 'scroll', () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (commonState.rightNav.articleDirectory.show) {
            for (let i = 0, len = commonState.rightNav.articleDirectory.source.length; i < len; ++i) {
                let item = commonState.rightNav.articleDirectory.source[i]
                let top = document.getElementById(item.id)?.getBoundingClientRect().top || 0
                top += document.body.scrollTop || document.documentElement.scrollTop
                if (scrollTop <= top + 20) {
                    commonState.rightNav.articleDirectory.tag = item.tag
                    break
                }
            }
        }
    })

    onUnmounted(() => {
        closeListener()
    })

    return {
        state,
        changeShow
    }
}

export default defineComponent({
    name: 'RightNav',
    components: { ArticleDirectory, IconTheme, IconToggle },
    setup() {
        const { screen } = CC.useDevice()
        const { router } = CC.useRouter()
        const { state: commonState } = CC.useStore('common')
        const directory = useDirectory()

        const state = reactive({
            show: false
        })

        watch(
            () => screen.width,
            () => {
                state.show = true

                if (screen.width <= 960) {
                    state.show = false
                }
            },
            { immediate: true }
        )

        function toggleRightNav() {
            commonState.rightNav.show = !commonState.rightNav.show
        }

        return {
            commonState,
            state,
            directory,
            toggleRightNav,
            toView(name: string) {
                router.push({ name })
            }
        }
    }
})
</script>

<style lang="less" scoped>
.right-nav-container {
    position: relative;
    width: 320px;
    transition: width 0.3s;
    // box-shadow: -1px 0px 4px 0 var(--blog-color-shadow);
    &::before {
        .p-a();
        content: ' ';
        width: 1px;
        height: 100%;
        left: 0;
        top: 0;
        background-color: var(--blog-color-shadow);
        z-index: 99999;
        transform: scaleX(0.1);
    }
    .right-nav-wrap {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 320px;
        background-color: #17181a;
        color: white;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 90px;
        overflow: hidden;
        transition: right 0.3s;
        .menu-info-head {
            margin-bottom: 10px;
            color: white;
            > span {
                color: #999999;
                padding: 5px;
                font-weight: bold;
                cursor: pointer;
                &:hover,
                &.active {
                    color: white;
                }
            }
        }
        .content-wrap {
            position: relative;
            width: 100%;
            max-height: calc(100vh - 150px);
            overflow-y: auto;
            flex: 1;
            .article-menu {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                padding: 5px;
            }
            .info-wrap {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                .flex-column();
                padding-top: 12px;
                .avatar {
                    border: 2px solid white;
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                }
                .name {
                    color: white;
                    padding: 15px;
                    font-size: 18px;
                    font-weight: bold;
                }
                .motto {
                    color: #999999;
                    padding: 5px 15px;
                    font-size: 14px;
                    font-weight: bold;
                    text-align: center;
                }
                .menu-wrap {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: 15px;
                    .menu-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border-right: 1px solid #555555;
                        font-size: 14px;
                        padding: 0 15px;
                        color: #999999;
                        transition: all 0.3s;
                        cursor: pointer;
                        font-weight: bold;
                        &:last-child {
                            border-right: 0px;
                        }
                        &:hover {
                            color: white;
                        }
                        .count {
                            margin-bottom: 5px;
                            font-size: 20px;
                        }
                    }
                }
                .social-wrap {
                    padding: 20px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    flex-wrap: wrap;
                    .social-item {
                        padding: 8px;
                        border: 1px solid #fc6423;
                        border-radius: 5px;
                        font-size: 14px;
                        line-height: 1;
                        color: #fc6423;
                        transition: all 0.3s;
                        cursor: pointer;
                        &:hover {
                            background-color: #fc6423;
                            color: var(--blog-color-white-1);
                        }
                        .iconfont {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }
}
</style>
<style>
.right-nav-fade-enter-active {
    transition: all 0.3s;
}
.right-nav-fade-leave-active {
    transition: all 0.3s;
}
.right-nav-fade-enter-from,
.right-nav-fade-leave-to {
    opacity: 0;
}
</style>
