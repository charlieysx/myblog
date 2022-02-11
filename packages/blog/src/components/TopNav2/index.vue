<template>
    <div class="top-nav">
        <div class="nav-wrap">
            <div
                class="logo"
                :style="{
                    'justify-content': !isMobile ? 'space-between' : 'center',
                    padding: !isMobile ? '20px' : '0px'
                }"
                @click="toHomeFromLogo"
            >
                <p class="line" v-if="!isMobile"></p>
                <p class="blog-name">{{ blogInfo.blogName || '博客' }}</p>
                <p class="line" v-if="!isMobile"></p>
            </div>
            <tab-view v-if="!isMobile" :tabs="tabs" @tab-click="selectTab" />
            <div class="toggle" v-if="isMobile" @click="mobileTabs.toggle">
                <span
                    class="toggle-line"
                    v-for="(line, index) in mobileTabs.state.lineData"
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

        <div class="mobile-tab-wrap" v-show="isMobile && mobileTabs.state.show">
            <div class="tab" v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab)">
                <component :is="tab.icon"></component>
                <span>{{ tab.name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import tabView from './tabView.vue'

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
    components: { tabView },
    name: 'TopNav',
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
                icon: 'icon-tag',
                to: '/categories'
            },
            {
                name: '归档',
                icon: 'icon-calendar',
                to: '/archives'
            },
            {
                name: '关于',
                icon: 'icon-user',
                to: '/about'
            },
            {
                name: '友链',
                icon: 'icon-share-alt',
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

        return {
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
    .p-r();
    .wh(100%, auto);
    background-color: var(--blog-color-white-1);
    z-index: 999999;
    box-shadow: -8px 2px 8px 0 var(--blog-color-shadow);
    transition: width 0.3s;
    > .nav-wrap {
        .p-r();
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
            color: var(--blog-color-black-1);
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
