<template>
    <div class="resume">
        <div class="resume-warp">
            <div class="resume-message">
                <p class="resume-title">我的简历</p>
            </div>
            <MDPreview :content="state.html" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import MDPreview from '/@comp/MDPreview/index.vue'
export default defineComponent({
    name: 'Resume',
    components: { MDPreview },
    setup() {
        const commonStore = CC.useStore('common')
        const state = reactive<{
            html: string
        }>({
            html: ''
        })
        commonStore.getResume().then((res) => {
            state.html = res.html
        })
        return {
            state
        }
    }
})
</script>

<style lang="less" scoped>
.resume {
    position: relative;
    padding: 30px 10px;
    width: 100%;
    z-index: 10;
    .resume-warp {
        position: relative;
        animation: show 0.8s;
        padding: 30px;
        width: 100%;
        @media (max-width: 768px) {
            padding: 30px 15px;
        }
        background-color: var(--blog-article-bg);
        box-shadow: 0 0 10px 2px var(--blog-color-shadow);
        .resume-message {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .resume-title {
                font-size: 26px;
                color: var(--blog-resume-title-color);
                @media (max-width: 768px) {
                    font-size: 22px;
                }
                font-weight: bold;
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
