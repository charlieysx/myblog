<template>
    <div class="hello"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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
        .wh(750, 1206);
    }
}
</style>
