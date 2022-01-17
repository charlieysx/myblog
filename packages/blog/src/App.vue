<template>
    <div class="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
    setup() {
        return {}
    }
})
</script>

<style lang="less">
@import '/@styles/less/g-mixin.less';
.app {
    .wh(100vw, 100%);
    min-height: 100vh;
    background-color: var(--color-fill-2);
}
.root-spin {
    width: 100%;
    height: 100%;
    > .arco-spin-mask {
        z-index: 99999 !important;
        width: 100vw !important;
        height: 100vh !important;
    }
}
</style>
