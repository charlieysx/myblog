<template>
    <div class="toggle" @click="$emit('click')" @mouseover="setLineData" @mouseout="setLineData">
        <span
            class="toggle-line"
            v-for="(line, index) in lineData"
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
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
export default defineComponent({
    name: 'IconToggle',
    props: {
        isClose: {
            type: Boolean,
            default: false
        }
    },
    emits: ['click'],
    setup(props) {
        interface LineData {
            width: string
            top: string
            transform: string
            opacity: string
        }

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

        const lineData = ref<LineData[]>(lineStyle.normalLineData)

        function setLineData(e) {
            if (props.isClose) {
                lineData.value = lineStyle.closeLineData
                return
            }
            if (e.type === 'mouseover') {
                lineData.value = lineStyle.arrowLineData
            } else {
                lineData.value = lineStyle.normalLineData
            }
        }

        watch(() => props.isClose, setLineData)

        return {
            lineData,
            setLineData
        }
    }
})
</script>

<style lang="less" scoped>
.toggle {
    position: fixed;
    width: 24px;
    height: 24px;
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
</style>
