<template>
    <top-nav />
    <div class="page-view">
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopNav from '/@comp/TopNav/index.vue'

export default defineComponent({
    name: 'PageLayout',
    components: {
        TopNav
    }
})
</script>

<style lang="less" scoped>
.page-view {
    max-width: 1000px;
    min-width: 320px;
    margin: 0 auto;
    padding: 0 10px;
    transition: width 0.3s;
}
</style>
