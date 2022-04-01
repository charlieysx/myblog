<template>
    <div class="page-layout">
        <div class="left-content">
            <top-nav :width="viewWrapWidth" />
            <div class="page-banner" :class="{ half: halfFirstScreen }">
                <div class="shooting-star-box">
                    <div v-for="(item, index) in stars" :key="index" class="star" :style="item"></div>
                </div>
                <div class="banner-front"></div>
                <div class="text">学无止境</div>
                <div class="desc">{{ desc.join('') }}</div>
                <div v-if="showBtn" class="read-btn" @click="startRead">开始阅读</div>
            </div>
            <div
                class="page-view"
                :class="{ half: halfFirstScreen }"
                :style="{
                    width: viewWrapWidth
                }"
            >
                <router-view />
            </div>
        </div>
        <right-nav />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
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

        const { screen } = CC.useDevice()
        const { state: commonState } = CC.useStore('common')
        const { routes } = CC.useRouter()

        const halfFirstScreen = computed(() => routes?.meta.halfFirstScreen)
        const showBtn = computed(() => routes?.meta.showBtn)

        watch(
            () => [screen.width, commonState.rightNav.show],
            () => {
                let temp = 0
                if (screen.width > 960 && commonState.rightNav.show) {
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

        const stars = ref<Array<{ top: string; left: string; animationDelay: string }>>([])

        for (let i = 0; i < 40; i++) {
            stars.value.push({
                top: randomDistance(0, -100),
                left: randomDistance(window.innerWidth * 1.5, 300),
                animationDelay: i % 6 == 0 ? '0s' : i * 0.8 + 's'
            })
        }

        function randomDistance(max: number, min: number) {
            var distance = Math.floor(Math.random() * (max - min + 1) + min)
            return distance + 'px'
        }

        return {
            halfFirstScreen,
            showBtn,
            viewWrapWidth,
            desc,
            stars,
            startRead() {
                CC.useUtils().scrollToTarget(window.innerHeight)
            }
        }
    }
})
</script>

<style lang="less" scoped>
body[arco-theme='dark'] {
    .left-content {
        > .page-banner {
            &:after {
                background-color: rgba(0, 0, 0, 0.7);
            }
        }
    }
}
.page-layout {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    min-width: 320px;
    display: flex;
    .left-content {
        flex: 1;
        position: relative;
        transition: width 0.3s;
        > .page-banner {
            .p-r();
            .wh(100%, 100vh);
            .cover();
            background-image: url(/@imgs/bg-behind.jpeg);
            z-index: 1;
            transition: height 0.3s linear;
            &.half {
                height: 50vh;
            }
            > .shooting-star-box {
                .p-a();
                .wh(100%);
                overflow: hidden;
                > .star {
                    display: block;
                    width: 1px;
                    background: transparent;
                    position: relative;
                    opacity: 0;
                    animation: star-fall 5s linear infinite;
                    &:after {
                        content: '';
                        display: block;
                        border: 0px solid #fff;
                        border-width: 0px 90px 2px 90px;
                        border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
                        box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
                        transform: rotate(-45deg) translate3d(1px, 3px, 0);
                        transform-origin: 0% 100%;
                    }
                }
            }
            > .banner-front {
                .p-a();
                bottom: 0;
                left: 0;
                .wh(100%, 100vh);
                .cover();
                background-image: url(/@imgs/bg-front.png);
            }
            &:after {
                .p-a();
                content: '';
                top: 0;
                left: 0;
                .wh(100%);
                z-index: 1;
                background-color: rgba(0, 0, 0, 0.6);
                transition: background-color 0.3s linear;
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
            > .read-btn {
                .center-row();
                z-index: 2;
                bottom: 10vh;
                font-size: 14px;
                color: white;
                border: 1px solid white;
                padding: 5px 12px;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s linear;
                &:hover {
                    background-color: white;
                    color: black;
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
            z-index: 10;
            &.half {
                margin-top: -15vh;
            }
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
@keyframes star-fall {
    0% {
        opacity: 0;
        transform: scale(0.5) translate3d(0, 0, 0);
    }
    50% {
        opacity: 1;
        transform: translate3d(-400px, 400px, 0);
    }
    100% {
        opacity: 0;
        transform: scale(1.2) translate3d(-800px, 800px, 0);
    }
}
</style>
