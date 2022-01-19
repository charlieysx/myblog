<template>
    <div class="dialog-content-confirm">
        {{ message }}
        <el-button type="danger" @click="$emit('close')">关闭</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Confirm',
    props: {
        message: {
            type: String,
            default: ''
        }
    },
    emits: ['close']
})
</script>

<style lang="less" scoped>
.dialog-content-confirm {
    width: 50vw;
    height: 100px;
    .flex();
    border-radius: 0.1rem;
    background-color: white;
    color: black;
}
</style>
