<template>
    <component :is="componentName" v-if="hadInit" :ref="createRef" v-bind="componentProps" @close="$emit('close')" />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, provide, ref, watch } from 'vue'
import { rawState } from './state'
// 中转组件，用于渲染组件，自动处理局部组件or全局组件
export default defineComponent({
    name: 'MiddleComponent',
    props: {
        uuid: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        componentName: {
            type: String,
            default: ''
        },
        isLocal: {
            type: Boolean,
            default: false
        },
        componentProps: {
            type: Object,
            default: () => {}
        }
    },
    emits: ['createRef', 'close'],
    setup(props, ctx) {
        const instance = getCurrentInstance()
        const hadInit = ref(!props.isLocal)
        provide('uuid', props.uuid)

        function registerLocalComponent() {
            if (!(instance as any).components) {
                ;(instance as any).components = {}
            }
            ;(instance as any).components[props.componentName] = rawState.dialogMap.get(props.uuid)?.componentOptions
            hadInit.value = true
        }

        watch(
            () => props.isLocal,
            () => {
                hadInit.value = false
                if (props.isLocal) {
                    registerLocalComponent()
                } else {
                    delete (instance as any)?.components?.[props.componentName]
                    hadInit.value = true
                }
            }
        )

        onMounted(() => {
            if (props.isLocal) {
                hadInit.value = false
                registerLocalComponent()
            }
        })

        return {
            hadInit,
            createRef(el: any) {
                ctx.emit('createRef', el)
            }
        }
    }
})
</script>
