<template>
    <el-container
        v-loading="loading"
        element-loading-text="socket连接中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <el-header>
            <div class="title">开发工具</div>
        </el-header>
        <el-container>
            <el-aside>
                <div class="task-list">
                    <task-item
                        v-for="(task, index) in taskList"
                        :key="index"
                        :selected="selectIndex === index"
                        :task="task"
                        @click="select(index)"
                    />
                </div>
            </el-aside>
            <el-container>
                <el-main>
                    <serve-task-view v-if="selectIndex === 0" />
                    <!-- <build-task-view v-else-if="selectIndex === 1" /> -->
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script lang="ts">
import ServeTaskView from '@/components/task/ServeTaskView.vue'
import BuildTaskView from '@/components/task/BuildTaskView.vue'
import TaskItem from '@/components/task/TaskItem.vue'
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
    name: 'Index',
    components: { TaskItem, ServeTaskView, BuildTaskView },
    setup() {
        const selectIndex = ref(0)
        const taskList = reactive([
            {
                name: 'serve',
                description: '编译和热更新（用于开发）'
            }
            // {
            //     name: 'build',
            //     description: '编译并压缩（用于打包代码）'
            // }
        ])

        const { on } = useSocketIo('status')
        const loading = ref(true)
        on('socketDisconnect', () => {
            loading.value = true
        })
        on('connect', () => {
            loading.value = false
        })

        return {
            loading,
            selectIndex,
            taskList,
            select(index: number) {
                selectIndex.value = index
            }
        }
    }
})
</script>

<style lang="less" scoped>
.el-header {
    background-color: #35495f;
    color: #ffffff;
    padding: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    height: 32px;
    z-index: 1;
    box-sizing: content-box;
    > .title {
        font-size: 28px;
        font-weight: 300;
    }
}

.el-aside {
    background-color: #2c3e50;
    color: #ffffff;
    text-align: center;
    height: calc(100vh - 60px);
}

.el-main {
    background-color: #304357;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
}
</style>
