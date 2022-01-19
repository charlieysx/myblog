<template>
    <div id="page-content">
        <router-view />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App'
})
</script>

<style lang="less">
@import '~element-plus/dist/index.css';
* {
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #3a5169;
        border: 3px solid transparent;
        background-clip: padding-box;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track-piece {
        background: 0 0;
    }
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100vw;
    height: 100%;
    font-size: 16px;
    font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
    color: #ffffff;
    overflow: hidden;
    margin: 0;
}
#page-content {
    height: 100%;
}

.el-popper.is-light {
    color: #1d2935;
}
</style>
