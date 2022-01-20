<template>
    <div class="app-index">
        <div class="content-wrap">
            <top-nav />
            <div class="page-view" :style="{ width: viewWrapWidth }">
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
            () => [screen.width, commonState.showRightNav],
            () => {
                let temp = 20
                if (screen.width > 990 && commonState.showRightNav) {
                    temp = 340
                }
                viewWrapWidth.value = screen.width - temp + 'px'
            },
            { immediate: true }
        )

        return {
            viewWrapWidth
        }
    }
})
</script>

<style lang="less" scoped>
.app-index {
    width: 100%;
    min-height: 100%;
    min-width: 320px;
    display: flex;
    flex-direction: row;
    position: relative;
    .content-wrap {
        flex: 1;
        position: relative;
        .page-view {
            max-width: 1000px;
            min-width: 320px;
            margin: 0 auto;
            padding: 0 10px;
            transition: width 0.3s;
            min-height: calc(100vh - 120px);
            transition: width 0.3s;
        }
    }
}
</style>
