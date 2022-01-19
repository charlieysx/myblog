import { TaskStore } from './type'

const { authPost } = useApi()

const joinTaskRoom = async (taskIds: string[]) => {
    return await authPost('/task/joinRoom', {
        data: taskIds
    })
}

const isRunning = async (taskIds: string[]) => {
    return await authPost('/task/isRunning', {
        data: taskIds
    })
}

const getLog = async (taskIds: string[]) => {
    return await authPost('/task/getTaskLog', {
        data: taskIds
    })
}

const runTask = async (task: TaskStore.Task, saveParams?: any) => {
    return await authPost('/task/run', {
        data: { task, saveParams }
    })
}

const stopTask = async (task: TaskStore.Task) => {
    return await authPost('/task/stop', {
        data: task
    })
}

export { runTask, stopTask, joinTaskRoom, isRunning, getLog }
