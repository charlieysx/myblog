<template>
    <div class="build-task">
        <el-card class="build-task-config-view" shadow="always">
            <el-form ref="form" :model="configForm" label-width="80px">
                <el-form-item label="打包仓库">
                    <div class="build-task-config-item">
                        <el-checkbox
                            v-model="state.pkgCheckAll"
                            :indeterminate="state.pkgCheckIndeterminate"
                            class="build-task-config-select-all"
                            @change="handlePkgCheckAll"
                        >
                            全选
                        </el-checkbox>
                        <el-checkbox-group
                            v-model="configForm.pluginPkg"
                            style="margin-right: 20px"
                            @change="(val) => handlePkgGroupChange('components', val)"
                        >
                            <el-checkbox v-for="pkg in pluginPkgList" :key="pkg.value" :label="pkg.value">
                                {{ pkg.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-checkbox-group
                            v-model="configForm.renderPkg"
                            @change="(val) => handlePkgGroupChange('landing-page', val)"
                        >
                            <el-checkbox v-for="pkg in renderPkgList" :key="pkg.value" :label="pkg.value">
                                {{ pkg.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <el-form-item label="打包环境">
                    <div class="build-task-config-item">
                        <el-checkbox
                            v-model="state.envCheckAll"
                            :indeterminate="state.envCheckIndeterminate"
                            class="build-task-config-select-all"
                            @change="handleEnvCheckAll"
                        >
                            全选
                        </el-checkbox>
                        <el-checkbox-group v-model="configForm.env" @change="handleEnvChange">
                            <el-checkbox
                                v-for="envConfig in envConfigOptions"
                                :key="envConfig.value"
                                :label="envConfig.value"
                            >
                                {{ envConfig.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button
                        :icon="isAllRunning ? 'el-icon-switch-button' : 'el-icon-caret-right'"
                        :type="isAllRunning ? 'danger' : 'primary'"
                        @click="runAllTask"
                    >
                        {{ isAllRunning ? '停止所有' : '开始打包' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="build-task-view">
            <div v-for="(task, index) in taskList" :key="index" class="build-task-terminal">
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
                    <el-tooltip
                        v-if="!task.isRunning && checkCanBuild(task)"
                        content="启动"
                        placement="top"
                        effect="light"
                    >
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
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import TerminalView from '../TerminalView.vue'
import { ElMessage } from 'element-plus'
import { TaskStore } from '@/store/instance/task/type'

export default defineComponent({
    name: 'BuildTaskView',
    components: { TerminalView },
    setup() {
        const configForm = reactive({
            pluginPkg: [],
            renderPkg: [],
            env: []
        })
        const state = reactive({
            pkgCheckAll: false,
            pkgCheckIndeterminate: false,
            envCheckAll: false,
            envCheckIndeterminate: false
        })
        const packageList = ref([
            {
                value: 'components-h5',
                name: '组件h5',
                type: 'components',
                workspace: 'components',
                command: 'build:landing-page',
                scope: 'build:landing-page',
                toSelectOther: ['h5']
            },
            {
                value: 'components-workbench',
                name: '组件workbench',
                type: 'components',
                workspace: 'components',
                command: 'build:workbench',
                scope: 'build:workbench',
                toSelectOther: ['workbench']
            },
            {
                value: 'h5',
                name: 'h5',
                workspace: 'landing-page',
                command: 'build',
                scope: 'build:landing-page'
            },
            {
                value: 'workbench',
                name: 'workbench',
                workspace: 'workbench',
                command: 'build',
                scope: 'build:workbench'
            }
        ])
        const pluginPkgList = computed(() => {
            return packageList.value.filter((pkg) => pkg.type === 'components')
        })
        const renderPkgList = computed(() => {
            return packageList.value.filter((pkg) => pkg.type !== 'components')
        })
        const packageMap = computed(() => {
            const map = {}
            packageList.value.forEach((pkg) => {
                map[pkg.value] = pkg
            })
            return map
        })

        const envConfigOptions = ref([
            {
                value: 'jtp-dev',
                label: '开发环境'
            },
            {
                value: 'jtp-bx',
                label: '并行环境'
            },
            {
                value: 'jtp-test',
                label: '集成环境'
            },
            {
                value: 'jtp-stage',
                label: 'stage环境'
            },
            {
                value: 'jtp-prod',
                label: '生产环境'
            }
        ])
        const taskStore = useStore('task')
        const taskList = taskStore.state.buildTaskList
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
            await taskStore.isRunning(taskIds).then((list) => {
                taskIds = []
                list.forEach((item) => {
                    if (item.isRunning) {
                        taskIds.push(item.id)
                    }
                    // 合并上次打包的配置项
                    const targetConfig = item.saveParams || {}
                    Object.assign(configForm, targetConfig)
                })
            })
            taskStore.getLog(taskIds).then((res) => {
                res.data.list.forEach((task) => {
                    taskRef[`task-${task.id}`]?.addLogList(
                        task.log
                            .filter((item) => ['stderr', 'stdout', 'close'].includes(item.event))
                            .map((item) => (item.event === 'close' ? '已停止运行' : item.data))
                    )
                })
            })
        })

        function checkCanBuild(task) {
            const { pluginPkg, renderPkg, env } = configForm
            const pluginFinded = pluginPkg.find((name) => packageMap.value[name].scope === task.id)
            const renderFinded = renderPkg.find((name) => packageMap.value[name].scope === task.id)
            return !!pluginFinded || !!(renderFinded && env.length)
        }

        function stopTask(task: TaskStore.Task) {
            taskStore.stopTask(task)
        }

        function runTask(task: TaskStore.Task) {
            const { pluginPkg, renderPkg, env } = configForm
            if (!pluginPkg.length && !renderPkg.length) {
                ElMessage.error('没有勾选打包的仓库')
                return
            }
            if (renderPkg.length && !env.length) {
                ElMessage.error('勾选打包的环境')
                return
            }
            const command = []
            // 生成组件的打包
            const plugin = pluginPkg.filter((name) => packageMap.value[name].scope === task.id)
            if (plugin.length) {
                plugin.forEach((name) => {
                    const item = packageMap.value[name]
                    command.push(`yarn workspace ${item.workspace} ${item.command} --color`)
                })
                if (task.id === 'build:render') {
                    command.push(`yarn workspace components moveToRender`)
                } else {
                    command.push(`yarn workspace components moveToWorkbench`)
                }
            }
            // 生成render或者workbench的打包
            const render = renderPkg.filter((name) => packageMap.value[name].scope === task.id)
            if (render.length) {
                render.forEach((name) => {
                    const item = packageMap.value[name]
                    env.forEach((env) => {
                        command.push(`yarn workspace ${item.workspace} ${item.command} --runEnv ${env} --color`)
                    })
                })
            }
            task.command = command.join(' && ')
            if (task.command) {
                taskStore.runTask(task, configForm)
            }
        }

        function restartTask(task: TaskStore.Task) {
            taskStore.restartTask(task, configForm)
        }

        function handlePkgGroupChange(type: string, value) {
            // 限定选择组件，必定要选择对应的render或者工作台
            if (type === 'components') {
                const selectSet = new Set(configForm.renderPkg)
                value.forEach((pkg) => {
                    const toSelectOther = packageMap.value[pkg]?.toSelectOther || []
                    toSelectOther.forEach((other) => {
                        selectSet.add(other)
                    })
                })
                // 修改选中的
                configForm.renderPkg = [...selectSet]
            }
            const checkedCount = [...configForm.pluginPkg, ...configForm.renderPkg].length
            const checkboxLen = packageList.value.length
            state.pkgCheckAll = checkedCount === checkboxLen
            state.pkgCheckIndeterminate = checkedCount > 0 && checkedCount < checkboxLen
        }

        function handlePkgCheckAll(value) {
            configForm.pluginPkg = value ? pluginPkgList.value.map((item) => item.value) : []
            configForm.renderPkg = value ? renderPkgList.value.map((item) => item.value) : []
            state.pkgCheckIndeterminate = false
        }

        function handleEnvChange(value) {
            const checkedCount = value.length
            const checkboxLen = envConfigOptions.value.length
            state.envCheckAll = checkedCount === checkboxLen
            state.envCheckIndeterminate = checkedCount > 0 && checkedCount < checkboxLen
        }

        function handleEnvCheckAll(value) {
            configForm.env = value ? envConfigOptions.value.map((item) => item.value) : []
            state.envCheckIndeterminate = false
        }

        return {
            configForm,
            packageList,
            pluginPkgList,
            renderPkgList,
            envConfigOptions,
            state,
            isAllRunning,
            taskList: taskList as TaskStore.Task[],
            taskRef,
            runAllTask() {
                let taskMethod = runTask
                if (isAllRunning.value) {
                    taskMethod = stopTask
                } else {
                    // 启动任务时，检查是否勾选
                    const { pluginPkg, renderPkg, env } = configForm
                    if (!pluginPkg.length && !renderPkg.length) {
                        ElMessage.error('没有勾选打包的仓库')
                        return
                    }
                    if (renderPkg.length && !env.length) {
                        ElMessage.error('勾选打包的环境')
                        return
                    }
                }
                taskList.forEach(taskMethod)
            },
            checkCanBuild,
            runTask,
            restartTask,
            stopTask,
            handlePkgGroupChange,
            handleEnvChange,
            handlePkgCheckAll,
            handleEnvCheckAll
        }
    }
})
</script>

<style lang="less" scoped>
.build-task {
    display: flex;
    flex-direction: column;
    .wh(100%);
    text-align: left;
    .build-task-config-view {
        background: #1d2935;
        border: 0;
        ::v-deep(.el-form-item__label) {
            color: white;
        }
    }
    .build-task-config-item {
        color: white;
        .build-task-config-select-all {
            margin-right: 30px;
        }
        display: flex;
        .el-checkbox {
            color: white;
        }
    }

    &-view {
        margin-top: 20px;
        display: flex;
        flex: 1;
    }

    &-terminal {
        // width: calc(50% - 6px);
        flex: 1;
        &:nth-child(2n) {
            margin-left: 6px;
        }
    }
}
</style>
