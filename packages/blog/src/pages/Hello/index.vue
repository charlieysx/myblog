<template>
    <div class="hello"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'HelloVue',
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped>
.hello {
    .preview-content {
        .wh(3.75, 6.03);
    }
}
</style>
