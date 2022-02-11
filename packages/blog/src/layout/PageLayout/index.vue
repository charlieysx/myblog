<template>
    <div class="page-layout">
        <div class="left-content">
            <top-nav :width="viewWrapWidth" />
            <div class="home-banner">
                <div class="text">学无止境</div>
                <div class="desc">{{ desc.join('') }}</div>
            </div>
            <div class="page-view">
                <router-view />
            </div>
        </div>
        <right-nav />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import TopNav from '/@comp/TopNav/index.vue'
import RightNav from '/@comp/RightNav/index.vue'

export default defineComponent({
    name: 'PageLayout',
    components: {
        TopNav,
        RightNav
    },
    setup() {
        const viewWrapWidth = ref('1000px')

        const { screen } = VV.useDevice()
        const { state: commonState } = VV.useStore('common')

        watch(
            () => [screen.width, commonState.rightNav.show],
            () => {
                let temp = 0
                if (screen.width > 768 && commonState.rightNav.show) {
                    temp = 320
                }
                viewWrapWidth.value = screen.width - temp + 'px'
            },
            { immediate: true }
        )

        const desc = ref<string[]>([])
        const descList = ['业精于勤，荒于嬉；行成于思，毁于随。', '养得胸中一种恬静。']

        async function delay(time: number) {
            return new Promise((resolve) => setTimeout(resolve, time))
        }

        async function draw() {
            while (descList.length > 0) {
                const item = descList[0]
                descList.shift()
                for (let i = 0; i < item.length; ++i) {
                    desc.value.push(item[i])
                    await delay(200)
                }
                await delay(1000)
                while (desc.value.length > 0) {
                    desc.value.pop()
                    await delay(100)
                }
                await delay(500)
                descList.push(item)
            }
        }
        draw()

        return {
            viewWrapWidth,
            desc
        }
    }
})
</script>

<style lang="less" scoped>
.page-layout {
    width: 100vw;
    min-height: 100vh;
    min-width: 320px;
    display: flex;
    flex-direction: row;
    position: relative;
    .left-content {
        flex: 1;
        position: relative;
        transition: width 0.3s;
        > .home-banner {
            .p-r();
            .wh(100%, 100vh);
            .cover();
            // margin-top: -60px;
            background-image: url(/@imgs/bg.jpeg);
            &:after {
                .p-a();
                content: '';
                top: 0;
                left: 0;
                .wh(100%);
                z-index: 1;
                background-color: rgba(0, 0, 0, 0.6);
            }
            > .text {
                .center();
                z-index: 2;
                font-size: 64px;
                color: white;
                transform: translate(-50%, -120%);
            }
            > .desc {
                .center();
                z-index: 2;
                font-size: 24px;
                color: white;
                &:after {
                    content: '|';
                    margin-left: 2px;
                    animation: flashing 0.75s infinite;
                }
            }
        }
        .page-view {
            max-width: 1000px;
            min-width: 320px;
            margin: 0 auto;
            padding: 0 10px;
            padding-top: 60px;
            min-height: calc(100vh - 120px);
        }
    }
}
@keyframes flashing {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
