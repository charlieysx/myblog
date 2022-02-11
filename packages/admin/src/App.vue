<template>
    <a-spin :loading="$store.common.state.loading" class="root-spin">
        <router-view />
    </a-spin>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
    setup() {
        const common = VV.useStore('common')
        common.checkLogin()
        return {}
    }
})
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}
html,
body {
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-appearance: none;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--blog-color-white-1);
    width: 100vw;
    height: 100%;
}

li {
    list-style: none;
}
// #root {
//   height: 100%;
// }

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
