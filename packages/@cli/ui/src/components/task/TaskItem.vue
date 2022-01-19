<template>
    <div class="task-item" :class="{ selected }">
        <div class="content">
            <div class="name">{{ task.name }}</div>
            <div class="description">{{ task.description }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        task: {
            type: Object,
            required: true
        },

        selected: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        return {}
    }
})
</script>

<style lang="less" scoped>
.task-item {
    user-select: none;
    cursor: pointer;
    padding: 16px;
    &:hover {
        background: rgba(66, 185, 131, 0.05);
    }
    &.selected {
        background: rgba(66, 185, 131, 0.08);
        > .content {
            > .name {
                color: #409eff;
            }
        }
    }
    > .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        > .description {
            color: #6a8bad;
        }
    }
}
</style>
