import state from './state'
import * as apis from './apis'
import { TaskStore } from './type'

function getTask(id: string) {
    return [...state.serveTaskList, ...state.buildTaskList].find((task) => task.id === id)
}

function isRunning(taskId: string[]) {
    return apis.isRunning(taskId).then((res) => {
        if (res.code === 0) {
            res.data.list.forEach((item) => {
                const task = getTask(item.id) || ({} as any)
                task.isRunning = item.isRunning || false
            })
            return res.data.list
        }
        return []
    })
}

function getLog(taskId: string[]) {
    return apis.getLog(taskId)
}

async function runTask(task: TaskStore.Task, saveParams?: any) {
    if (!task || task.isRunning) {
        return
    }
    await apis.runTask(task, saveParams)
}

async function stopTask(task: TaskStore.Task) {
    if (!task || !task.isRunning) {
        return
    }
    await apis.stopTask(task)
}

async function restartTask(task: TaskStore.Task, saveParams?: any) {
    if (task.isRunning) {
        await stopTask(task)
    }
    await runTask(task, saveParams)
}

export default {
    getTask,
    runTask,
    stopTask,
    restartTask,
    isRunning,
    getLog
}
