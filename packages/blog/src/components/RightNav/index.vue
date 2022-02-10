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
        </div>
    </transition>
    <div
        class="toggle"
        @click="menuTab.toggle"
        @mouseover="menuTab.setLineData"
        @mouseout="menuTab.setLineData"
        v-show="state.show"
    >
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
    <div class="icon-container" @click="change">
        <icon-moon-fill v-if="theme === 'light'" />
        <icon-sun-fill v-else />
    </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref, watch } from 'vue'
import ArticleMenu from './articleMenu.vue'

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
    components: { ArticleMenu },
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

                if (screen.width <= 768) {
                    state.show = false
                }
            },
            { immediate: true }
        )

        const { load, save } = VV.useStorage()
        const defaultTheme = load('theme', 'light')
        const theme = ref(defaultTheme)
        function changeTheme() {
            if (theme.value === 'dark') {
                document.body.setAttribute('arco-theme', 'dark')
            } else {
                document.body.removeAttribute('arco-theme')
            }
        }
        changeTheme()

        return {
            commonState,
            state,
            menuTab,
            theme,
            change() {
                theme.value = theme.value === 'light' ? 'dark' : 'light'
                save('theme', theme.value)
                changeTheme()
            },
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
        background-color: white;
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
        padding-top: 30px;
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
}

.toggle {
    position: fixed;
    width: 24px;
    height: 24px;
    background-color: transparent;
    background-color: var(--blog-color-black-1);
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
        background-color: var(--blog-color-white-1);
        &:first-child {
            margin-top: 0px;
        }
    }
}

.icon-container {
    .p-f();
    right: 10px;
    bottom: 80px;
    z-index: 1050;
    width: 24px;
    height: 24px;
    background-color: var(--blog-color-black-1);
    color: var(--blog-color-white-1);
    .flex();
    cursor: pointer;
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
