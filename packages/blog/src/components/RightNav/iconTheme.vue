<template>
    <div class="icon-container" @click="$store.common.changeTheme">
        <i :class="['iconfont', $store.common.state.theme === 'light' ? 'icon-sun' : 'icon-moon']"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'IconTheme'
})
</script>

<style lang="less" scoped>
.icon-container {
    .p-f();
    right: 10px;
    bottom: 80px;
    z-index: 1050;
    width: 24px;
    height: 24px;
    background-color: var(--blog-color-black-1);
    color: var(--blog-color-white-1);
    .flex();
    cursor: pointer;
}
</style>
