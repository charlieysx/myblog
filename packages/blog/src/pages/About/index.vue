<template>
    <div class="about">
        <div class="about-warp">
            <div class="about-message">
                <p class="about-title">关于我</p>
            </div>
            <MDPreview :content="state.html" />
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
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import MDPreview from '/@comp/MDPreview/index.vue'
export default defineComponent({
    name: 'About',
    components: { MDPreview },
    setup() {
        const commonStore = CC.useStore('common')
        const state = reactive<{
            html: string
            qrcode: Record<string, any>
            showQrcode: boolean
        }>({
            html: '',
            qrcode: {},
            showQrcode: false
        })
        commonStore.getAboutMe().then((res) => {
            console.log(res)
            state.html = res.html
            state.qrcode = res.qrcode
        })
        return {
            state
        }
    }
})
</script>

<style lang="less" scoped>
.about {
    position: relative;
    padding: 30px 10px;
    width: 100%;
    .about-warp {
        position: relative;
        animation: show 0.8s;
        padding: 30px;
        width: 100%;
        @media (max-width: 768px) {
            padding: 30px 15px;
        }
        background-color: var(--blog-color-white-1);
        box-shadow: 0px 0px 5px 0px rgba(38, 42, 48, 0.1);
        .about-message {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .about-title {
                font-size: 26px;
                @media (max-width: 768px) {
                    font-size: 22px;
                }
                font-weight: bold;
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
                color: var(--blog-color-white-1);
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                transition: background-color 0.3s;
                &:hover {
                    background-color: rgba(244, 67, 54, 0.3);
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
