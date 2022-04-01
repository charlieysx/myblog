<template>
    <div class="top-nav" :style="{ width }">
        <div class="bg" :style="{ opacity }"></div>
        <div class="nav-wrap" :style="{ color }">
            <div
                class="logo"
                :style="{
                    'justify-content': !isMobile ? 'space-between' : 'center',
                    padding: !isMobile ? '20px' : '0px'
                }"
                @click="toHomeFromLogo"
            >
                <p v-if="!isMobile" class="line" :style="{ backgroundColor: color }"></p>
                <p class="blog-name">{{ blogInfo.blogName || '博客' }}</p>
                <p v-if="!isMobile" class="line" :style="{ backgroundColor: color }"></p>
            </div>
            <tab-view v-if="!isMobile" :tabs="tabs" @tab-click="selectTab" />
            <div v-if="isMobile" class="toggle" @click="mobileTabs.toggle">
                <span
                    v-for="(line, index) in mobileTabs.state.lineData"
                    :key="index"
                    class="toggle-line"
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

        <div v-show="isMobile && mobileTabs.state.show" class="mobile-tab-wrap">
            <div v-for="(tab, index) in tabs" :key="index" class="tab" @click="selectTab(tab)">
                <i :class="['iconfont', tab.icon]"></i>
                <span>{{ tab.name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import tabView from './tabView.vue'
import { CommonStore } from '/@store/instance/common/type'

function useMobileTab() {
    interface LineData {
        width: string
        top: string
        transform: string
        opacity: string
    }

    const lineStyle: {
        normalLineData: LineData[]
        closeLineData: LineData[]
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
        state.show = !state.show
        state.lineData = state.show ? lineStyle.closeLineData : lineStyle.normalLineData
    }

    return {
        state,
        toggle
    }
}

export default defineComponent({
    name: 'TopNav',
    components: { tabView },
    props: {
        width: {
            type: String,
            default: '100%'
        }
    },
    setup() {
        const { isMobile } = CC.useDevice()
        const commonStore = CC.useStore('common')
        commonStore.initBlogInfo()

        const tabs = [
            {
                name: '首页',
                icon: 'icon-home',
                to: '/'
            },
            {
                name: '分类/标签',
                icon: 'icon-tags',
                to: '/categories'
            },
            {
                name: '归档',
                icon: 'icon-archives',
                to: '/archives'
            },
            {
                name: '关于',
                icon: 'icon-about',
                to: '/about'
            },
            {
                name: '友链',
                icon: 'icon-friend',
                to: '/friends'
            },
            // {
            //     name: '更多',
            //     icon: 'icon-apps',
            //     to: '/morefunc'
            // },
            {
                name: '搜索',
                icon: 'icon-search',
                to: '/search'
            }
        ]
        const { router } = CC.useRouter()

        const mobileTabs = useMobileTab()

        const opacity = ref(0)
        const color = ref('rgb(255, 255, 255)')

        function changeFontColor() {
            if (commonStore.state.theme === CommonStore.BlogTheme.dark) {
                color.value = 'rgb(255, 255, 255)'
                return
            }
            const rgb = 255 * (1 - opacity.value)
            color.value = `rgb(${rgb}, ${rgb}, ${rgb})`
        }

        CC.useEventListener(window, 'scroll', () => {
            const rate = Math.min(1, window.scrollY / window.innerHeight)
            opacity.value = rate
            changeFontColor()
        })

        watch(() => commonStore.state.theme, changeFontColor)

        return {
            color,
            opacity,
            isMobile,
            mobileTabs,
            blogInfo: commonStore.state.blogInfo,
            tabs,
            selectTab(tab) {
                mobileTabs.toggle()
                router.push(tab.to)
            },
            toHomeFromLogo() {
                window.location.href = `${window.location.origin}`
            }
        }
    }
})
</script>

<style lang="less" scoped>
.top-nav {
    .p-f();
    .wh(100%, auto);
    z-index: 999999;
    // transition: width 0.1s;
    > .bg {
        .p-a();
        .wh(100%);
        z-index: 1;
        top: 0;
        left: 0;
        background-color: var(--blog-top-bg);
        box-shadow: 0px 2px 8px 0 var(--blog-color-shadow);
        // opacity: 0;
    }
    > .nav-wrap {
        .p-r();
        z-index: 2;
        max-width: 1000px;
        flex: 1;
        padding: 0 10px;
        margin: 0 auto;
        height: 60px;
        .flex(space-between);
        transition: height 0.3s;
        > .logo {
            .flex-column(space-between);
            font-size: 18px;
            font-weight: bold;
            padding: 25px 0;
            // color: var(--blog-color-black-1);
            &:hover {
                cursor: pointer;
                > .line {
                    width: 0px;
                }
            }
            > .line {
                width: 100%;
                height: 2px;
                animation: logo-line 0.5s;
                transition: width 0.3s;
                background-color: var(--blog-color-black-1);
            }
            > .blog-name {
                animation: logo-name 0.5s;
                margin: 6px 0;
            }
        }

        > .toggle {
            .wh(24px);
            padding: 5px;
            cursor: pointer;
            line-height: 0;
            .toggle-line {
                position: relative;
                display: inline-block;
                vertical-align: top;
                width: 100%;
                height: 2px;
                margin-top: 4px;
                background-color: var(--blog-color-black-1);
                &:first-child {
                    margin-top: 0px;
                }
            }
        }
    }

    .mobile-tab-wrap {
        width: 100%;
        transition: all 0.3s;
        border-top: 1px solid var(--blog-color-black-4);
        .tab {
            position: relative;
            width: 100%;
            padding: 8px 15px;
            font-size: 12px;
            line-height: 1;
            color: var(--blog-color-black-1);
            cursor: pointer;
        }
    }
}
@keyframes logo-name {
    from {
        margin-left: -60px;
        opacity: 0;
    }
    to {
        margin-left: 0px;
        opacity: 1;
    }
}
@keyframes logo-line {
    from {
        width: 0px;
    }
    to {
        width: 70px;
    }
}
</style>
