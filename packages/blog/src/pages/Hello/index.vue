<template>
    <div class="hello">
        <textarea id="mytextarea" class="preview-content">Hello, World!</textarea>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'HelloVue',
    setup() {
        onMounted(() => {
            ;(window as any).tinymce.init({
                selector: '#mytextarea',
                language: 'zh_CN',
                skin: 'oxide',
                plugins: ['charmap hr insertdatetime lists advlist image media table link code searchreplace '],
                toolbar:
                    'bullist numlist image media table wordcount code insertdatetime searchreplace link charmap hr',
                paste_data_images: true,
                width: '375px',
                height: '603px',
                images_upload_handler: () => {}
            })
        })
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
