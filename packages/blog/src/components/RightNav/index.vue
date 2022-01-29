<template>
    <div
        v-show="state.show"
        class="right-nav"
        :style="{
            width: commonState.rightNav.show ? '320px' : '0px',
            transition: 'all .3s'
        }"
    >
        <div
            class="right-nav-wrap"
            :style="{
                width: commonState.rightNav.show ? '320px' : '0px',
                transition: 'all .3s'
            }"
        >
            <div class="menu-info-head" v-if="commonState.rightNav.articleMenu.show">
                <span :class="{ active: menuTab.state.show }" @click="menuTab.state.show = true">文章目录</span>
                |
                <span :class="{ active: !menuTab.state.show }" @click="menuTab.state.show = false">站点信息</span>
            </div>
            <div class="content-wrap">
                <transition name="slide-fade">
                    <article-menu
                        class="article-menu"
                        :menu="commonState.rightNav.articleMenu.list"
                        v-show="menuTab.state.show"
                        v-if="!commonState.rightNav.articleMenu.loading"
                    />
                    <div v-else>加载中...</div>
                </transition>
                <transition name="slide-fade">
                    <div class="info-wrap" v-show="!menuTab.state.show">
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
        <div class="toggle" @click="menuTab.toggle" @mouseover="menuTab.setLineData" @mouseout="menuTab.setLineData">
            <span
                class="toggle-line"
                v-for="(line, index) in menuTab.state.lineData"
                :key="index"
                :style="{
                    width: line.width,
                    top: line.top,
                    transform: line.transform,
                    opacity: line.opacity,
                    transition: 'all .3s'
                }"
            ></span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, watch } from 'vue'
import articleMenu from './articleMenu.vue'

function useMenuTab() {
    interface LineData {
        width: string
        top: string
        transform: string
        opacity: string
    }

    const { state: commonState } = VV.useStore('common')
    const lineStyle: {
        normalLineData: LineData[]
        closeLineData: LineData[]
        arrowLineData: LineData[]
    } = {
        normalLineData: [
            {
                width: '100%',
                top: '0px',
                transform: 'rotateZ(0deg)',
                opacity: '1'
            },
            {
                width: '100%',
                top: '0px',
                transform: 'rotateZ(0deg)',
                opacity: '1'
            },
            {
                width: '100%',
                top: '0px',
                transform: 'rotateZ(0deg)',
                opacity: '1'
            }
        ],
        closeLineData: [
            {
                width: '100%',
                top: '6px',
                transform: 'rotateZ(-45deg)',
                opacity: '1'
            },
            {
                width: '100%',
                top: '0px',
                transform: 'rotateZ(0deg)',
                opacity: '0'
            },
            {
                width: '100%',
                top: '-6px',
                transform: 'rotateZ(45deg)',
                opacity: '1'
            }
        ],
        arrowLineData: [
            {
                width: '50%',
                top: '3px',
                transform: 'rotateZ(-45deg)',
                opacity: '1'
            },
            {
                width: '100%',
                top: '0px',
                transform: 'rotateZ(0deg)',
                opacity: '1'
            },
            {
                width: '50%',
                top: '-3px',
                transform: 'rotateZ(45deg)',
                opacity: '1'
            }
        ]
    }

    const state = reactive<{
        show: boolean
        lineData: LineData[]
    }>({
        show: false,
        lineData: lineStyle.normalLineData
    })

    function toggle() {
        commonState.rightNav.show = !commonState.rightNav.show
        state.lineData = commonState.rightNav.show ? lineStyle.closeLineData : lineStyle.normalLineData
    }

    function setLineData(e) {
        if (commonState.rightNav.show) {
            return
        }
        if (e.type === 'mouseover') {
            state.lineData = lineStyle.arrowLineData
        } else {
            state.lineData = lineStyle.normalLineData
        }
    }

    watch(
        () => commonState.rightNav.articleMenu.show,
        () => {
            state.show = commonState.rightNav.articleMenu.show
            commonState.rightNav.show = commonState.rightNav.articleMenu.show
            state.lineData = commonState.rightNav.articleMenu.show ? lineStyle.closeLineData : lineStyle.normalLineData
        },
        { immediate: true }
    )

    const closeListener = VV.useEventListener(window, 'scroll', () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (commonState.rightNav.articleMenu.show) {
            console.log('scroll')
            for (let i = 0, len = commonState.rightNav.articleMenu.source.length; i < len; ++i) {
                let item = commonState.rightNav.articleMenu.source[i]
                let top = document.getElementById(item.id)?.getBoundingClientRect().top || 0
                top += document.body.scrollTop || document.documentElement.scrollTop
                if (scrollTop <= top + 20) {
                    commonState.rightNav.articleMenu.tag = item.tag
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
        toggle,
        setLineData
    }
}

export default defineComponent({
    name: 'RightNav',
    components: { articleMenu },
    setup() {
        const { screen } = VV.useDevice()
        const { router } = VV.useRouter()
        const { state: commonState } = VV.useStore('common')
        const menuTab = useMenuTab()

        const state = reactive({
            show: false
        })

        watch(
            () => screen.width,
            () => {
                state.show = true

                if (screen.width <= 990) {
                    state.show = false
                }
            },
            { immediate: true }
        )

        return {
            commonState,
            state,
            menuTab,
            toView(name: string) {
                router.push({ name })
            }
        }
    }
})
</script>

<style lang="less" scoped>
.right-nav {
    position: relative;
    width: 320px;
    .right-nav-wrap {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        width: 320px;
        background-color: var(--color-text-1);
        color: var(--color-bg-1);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 30px;
        overflow: hidden;
        .menu-info-head {
            margin-bottom: 10px;
            > span {
                color: #999999;
                padding: 5px;
                font-weight: bold;
                cursor: pointer;
                &:hover,
                &.active {
                    color: var(--color-bg-1);
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
                display: flex;
                flex-direction: column;
                align-items: center;
                .avatar {
                    border: 4px solid var(--color-bg-1);
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                }
                .name {
                    color: var(--color-bg-1);
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
                            color: var(--color-bg-1);
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
                            color: var(--color-bg-1);
                        }
                        .iconfont {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    .toggle {
        position: fixed;
        width: 24px;
        height: 24px;
        background-color: transparent;
        right: 10px;
        bottom: 45px;
        padding: 5px;
        z-index: 1050;
        cursor: pointer;
        line-height: 0;
        .toggle-line {
            position: relative;
            display: inline-block;
            vertical-align: top;
            width: 100%;
            height: 2px;
            margin-top: 4px;
            background-color: var(--color-text-1);
            &:first-child {
                margin-top: 0px;
            }
        }
    }
}

.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
}
</style>
