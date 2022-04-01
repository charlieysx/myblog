<template>
    <transition name="slide-fade">
        <div v-show="show" class="to-top" @click="scrollToTop">
            <span
                v-for="(line, index) in lineData"
                :key="index"
                class="to-top-line"
                :style="{
                    height: line.height,
                    left: line.left,
                    transform: line.transform
                }"
            ></span>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref } from 'vue'
export default defineComponent({
    name: 'IconToTop',
    setup() {
        const show = ref(true)
        const lineData = reactive([
            {
                height: '50%',
                left: '1px',
                transform: 'rotateZ(45deg)'
            },
            {
                height: '100%',
                top: '0px',
                transform: 'rotateZ(0deg)'
            },
            {
                height: '50%',
                left: '-1px',
                transform: 'rotateZ(-45deg)'
            }
        ])

        function check() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop >= 60) {
                show.value = true
            } else {
                show.value = false
            }
        }
        check()

        const closeListener = CC.useEventListener(window, 'scroll', check)

        onUnmounted(() => {
            closeListener()
        })

        return {
            show,
            lineData,
            scrollToTop() {
                CC.useUtils().scrollToTarget(0)
            }
        }
    }
})
</script>

<style lang="less" scoped>
.to-top {
    position: fixed;
    width: 24px;
    height: 24px;
    background-color: var(--blog-color-black-1);
    right: 10px;
    bottom: 15px;
    padding: 5px;
    z-index: 1050;
    cursor: pointer;
    line-height: 0;
    display: flex;
    align-items: flex-start;
    > .to-top-line {
        position: relative;
        flex-shrink: 0;
        width: 2px;
        height: 100%;
        margin-left: 2px;
        background-color: var(--blog-color-white-1);
    }
    &:first-child {
        margin-left: 0px;
    }
}
</style>
