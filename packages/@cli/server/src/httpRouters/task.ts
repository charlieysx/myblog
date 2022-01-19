import * as Router from 'koa-router'
import { UserSocket } from '../utils/userSocket'
import { Task } from '../utils/task'
import { Error, Success } from '../utils/statusCode'

let router = new Router({
    prefix: '/task'
})

router.post('/isRunning', async (ctx) => {
    const taskList: string[] = ctx.request.body
    const list = taskList.map(taskId => {
        const task = Task.load(taskId)
        return {
            id: taskId,
            isRunning: task?.isRunning || false,
            saveParams: task?.saveParams || {}
        }
    })
    Success.data(ctx, {
        list
    })
})

router.post('/getTaskLog', async (ctx) => {
    const taskList: string[] = ctx.request.body
    const list = taskList.map(taskId => {
        const task = Task.load(taskId)
        return {
            id: taskId,
            log: task?.log || []
        }
    })
    Success.data(ctx, {
        list
    })
})

router.post('/joinRoom', async (ctx) => {
    const userId = (ctx as any).userId
    const taskList: string[] = ctx.request.body
    taskList.forEach(taskId => {
        UserSocket.joinRoom(userId, taskId)
    })
    Success.data(ctx, {
        status: true
    })
})

router.post('/run', async (ctx) => {
    const { task, saveParams } = ctx.request.body
    Task.run(task)
    const currentTask = Task.load(task.id)
    currentTask.saveParams = saveParams
    Success.data(ctx, {
        isRunning: currentTask.isRunning
    })
})

router.post('/stop', async (ctx) => {
    const task = ctx.request.body
    await Task.stop(task.id)
    const currentTask = Task.load(task.id)
    Success.data(ctx, {
        isRunning: currentTask?.isRunning || false
    })
})

router.post('/restart', async (ctx) => {
    const { task, saveParams } = ctx.request.body
    await Task.stop(task.id)
    Task.run(task)
    const currentTask = Task.load(task.id)
    currentTask.saveParams = saveParams
    Success.data(ctx, {
        isRunning: currentTask.isRunning
    })
})

export default router
