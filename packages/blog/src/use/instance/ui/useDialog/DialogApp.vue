<template>
    <div class="dialog-components">
        <transition-group name="fade" appear>
            <div
                v-for="item in state.showList"
                :id="`dialog-${item.name}`"
                :key="`dialog-${item.name}`"
                class="dialog-box"
            >
                <transition :name="item.opts.maskAnimName" apper>
                    <div
                        v-if="item.isShowing"
                        class="mask"
                        :style="{
                            backgroundColor: item.opts.maskBgColor
                        }"
                    ></div>
                </transition>
                <div class="dialog-content">
                    <div class="click-mask" @click="close(item, true)"></div>
                    <transition :name="item.opts.animName" appear>
                        <div v-if="item.isShowing" class="content">
                            <middle-component
                                :uuid="item.uuid"
                                :is-local="item.isLocal"
                                :component-props="item.props"
                                :name="item.name"
                                :component-name="item.componentName"
                                @create-ref="(el) => createRef(el, item)"
                                @close="close(item)"
                            />
                        </div>
                    </transition>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MiddleComponent from './MiddleComponent.vue'
import { state } from './state'
import { UseDialog } from './type'

export default defineComponent({
    name: 'DialogApp',
    components: { MiddleComponent },
    setup() {
        function close(item: UseDialog.DialogData, isClickMask = false) {
            if (isClickMask) {
                if (!item.opts.maskClose) {
                    return
                }
            }
            const dialog = CC.useDialog()
            dialog.getInstance(item.uuid)?.close()
        }
        return {
            state,
            close,
            createRef(el, item) {
                const instance = CC.useDialog().getInstance(item.uuid)
                instance && (instance.el = el)
            }
        }
    }
})
</script>

<style lang="less" scoped>
.dialog-components {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1002;
    .dialog-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1002;
        &.closing {
            pointer-events: none;
        }
        > .mask {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--color-mask-bg);
        }
        > .dialog-content {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            > .click-mask {
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            > .content {
                z-index: 1;
                position: relative;
            }
        }
    }
}
.fade {
    &-enter,
    &-leave-to {
        opacity: 0;
    }
    &-enter-active,
    &-leave-active {
        transition: all 0.5s;
    }
}

.bounce {
    &-enter-active {
        animation: bounceIn 0.5s;
    }
    &-leave-active {
        animation: bounceOut 0.5s;
    }
}

.fade-right {
    &-enter-active {
        animation: fadeInRight 0.5s;
    }
    &-leave-active {
        animation: fadeOutRight 0.5s;
    }
}

.fade-down {
    &-enter-active {
        animation: fadeInUp 0.5s;
    }
    &-leave-active {
        animation: fadeOutDown 0.5s;
    }
}

@keyframes bounceIn {
    0%,
    20%,
    40%,
    60%,
    80%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }

    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
        transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
        transform: scale3d(0.97, 0.97, 0.97);
    }

    to {
        opacity: 1;
        transform: scaleX(1);
    }
}

@keyframes bounceOut {
    20% {
        transform: scale3d(0.9, 0.9, 0.9);
    }

    50%,
    55% {
        opacity: 1;
        transform: scale3d(1.1, 1.1, 1.1);
    }

    to {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }
}

@keyframes fadeInRight {
    0% {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    to {
        opacity: 1;
        transform: translateZ(0);
    }
}
@keyframes fadeOutRight {
    0% {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }
}

@keyframes fadeOutDown {
    0% {
        opacity: 1;
    }

    to {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        transform: translateZ(0);
    }
}
</style>
