<template>
    <div class="task">
        <div class="task-confing-view">
            <el-button
                :icon="isAllRunning ? 'el-icon-switch-button' : 'el-icon-caret-right'"
                :type="isAllRunning ? 'danger' : 'primary'"
                class="run-btn"
                @click="runAllTask"
            >
                {{ isAllRunning ? '停止' : '运行' }}
            </el-button>
        </div>
        <div class="serve-task-view">
            <div v-for="(task, index) in taskList" :key="index" class="task-terminal-view">
                <terminal-view
                    :ref="(el) => (taskRef[`task-${task.id}`] = el)"
                    :cols="10000"
                    :rows="24"
                    :title="task.title"
                    :open-links="true"
                    :options="{
                        scrollback: 5000,
                        disableStdin: true,
                        useFlowControl: true
                    }"
                >
                    <el-select
                        v-if="task.id === 'serve:landing-page' || task.id === 'serve:workbench'"
                        v-model="task.args[4]"
                        size="mini"
                        placeholder="请选择环境"
                        :disabled="task.isRunning"
                    >
                        <el-option
                            v-for="item in envConfigOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-tooltip v-if="task.isRunning" content="重新启动" placement="top" effect="light">
                        <el-icon class="btn" @click="restartTask(task)">
                            <el-icon-refresh-left />
                        </el-icon>
                    </el-tooltip>
                    <el-tooltip v-if="task.isRunning" content="停止" placement="top" effect="light">
                        <el-icon class="btn" @click="stopTask(task)">
                            <el-icon-video-pause />
                        </el-icon>
                    </el-tooltip>
                    <el-tooltip v-if="!task.isRunning" content="启动" placement="top" effect="light">
                        <el-icon class="btn" @click="runTask(task)">
                            <el-icon-video-play />
                        </el-icon>
                    </el-tooltip>
                </terminal-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { TaskStore } from '@/store/instance/task/type'
import { computed, defineComponent, onMounted, ref } from 'vue'
import TerminalView from '../TerminalView.vue'

export default defineComponent({
    name: 'ServeTaskView',
    components: { TerminalView },
    setup() {
        const envConfigOptions = ref([
            {
                value: 'dev',
                label: '开发环境'
            }
        ])
        const taskStore = useStore('task')
        const taskList = taskStore.state.serveTaskList
        const taskRef = {}
        const isAllRunning = computed(() => {
            return taskList.some((task) => task.isRunning)
        })
        const socket = useSocketIo('task')
        socket.on('close', (res) => {
            taskRef[`task-${res.id}`]?.addLog('已停止运行')
        })
        socket.on(['stdout', 'stderr'], (res) => {
            taskRef[`task-${res.id}`]?.addLog(res.data)
        })

        onMounted(async () => {
            let taskIds = taskList.map((item) => item.id)
            await taskStore.isRunning(taskIds).then((list: Array<any>) => {
                taskIds = list.filter((item) => item.isRunning).map((item) => item.id)
            })
            if (taskIds.length === 0) {
                return
            }
            taskStore.getLog(taskIds).then((res) => {
                res.data.list.forEach((task) => {
                    taskRef[`task-${task.id}`].addLogList(task.log.map((item) => item.data))
                })
            })
        })

        function stopTask(task: TaskStore.Task) {
            taskStore.stopTask(task)
        }

        function runTask(task: TaskStore.Task) {
            taskStore.runTask(task)
        }

        function restartTask(task: TaskStore.Task) {
            taskStore.restartTask(task)
        }

        return {
            envConfigOptions,
            isAllRunning,
            taskList: taskList as TaskStore.Task[],
            taskRef,
            runAllTask() {
                const taskMethod = isAllRunning.value ? stopTask : runTask
                taskList.forEach(taskMethod)
            },
            runTask,
            restartTask,
            stopTask
        }
    }
})
</script>

<style lang="less" scoped>
.task {
    .flex-column();
    .wh(100%);
    .task-confing-view {
        padding: 16px;
        padding-top: 0;
        .flex(flex-start);
        width: 100%;
        .run-btn {
            margin-right: 6px;
        }
    }
    .serve-task-view {
        .wh(100%);
        flex: 1;
        .flex();
        flex-wrap: wrap;
        > .task-terminal-view {
            .wh(calc(50% - 6px));
            &:nth-child(2n) {
                margin-left: 6px;
            }
            &:nth-child(1),
            &:nth-child(2) {
                margin-bottom: 6px;
            }
        }
    }
}
</style>
