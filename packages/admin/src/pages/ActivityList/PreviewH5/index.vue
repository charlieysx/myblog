<template>
    <div class="preview-h5-container">
        <div class="title">{{ title }}</div>
        <iframe class="preview-iframe" border="0" :src="url" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'PriviewH5',
    props: {
        title: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            required: true
        }
    },
    setup() {
        return {}
    }
})
</script>

<style lang="less" scoped>
@import '/@styles/less/g-mixin.less';
.preview-h5-container {
    .p-r();
    width: calc(750 / 1206 * 80vh);
    height: 80vh;
    background-color: var(--blog-color-white-1);

    > .title {
        .p-a();
        width: 100%;
        height: 60px;
        .flex();
        font-size: 16px;
        left: 0;
        top: 0;
        transform: translateY(-100%);
        background-color: var(--blog-color-white-1);
        color: var(--blog-color-black-1);
    }
    > .preview-iframe {
        .p-r();
        .wh(100%);
        border: none;
    }
}
</style>
