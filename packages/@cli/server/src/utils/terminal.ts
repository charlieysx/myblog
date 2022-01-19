import * as execa from 'execa'
import { TerminalTask, TerminalTaskRecord } from './type.d'

let listenerId = 0
const listenerMap = new Map<string, Map<string, Array<{ id: number, func: Function }>>>()

const taskMap = new Map<string, TerminalTaskRecord>()

function putLog (taskId: string, event: string, data?: any) {
    const taskRecord = taskMap.get(taskId)
    taskRecord?.log?.push({ event, data })
    if (taskRecord?.log?.length >= 500) {
        taskRecord?.log?.shift()
    }
    const listener = listenerMap?.get(taskId)
    const eventFuncs = listener?.get(event)
    eventFuncs?.forEach(item => {
        item.func(data)
    })
}

// run({
//     id: 'test',
//     command: 'yarn',
//     args: ['workspace', 'render', 'serve', '--runEnv', 'jtp-dev']
// })

// setTimeout(() => {
//     cancel('test')
// }, 20000)

function run (task: TerminalTask) {
    console.log('启动任务', task)
    const args = task.args || []
    let child = execa(task.command, [...args], {
        cwd: task.cwd || process.cwd(),
        stdio: ['inherit', 'pipe', 'pipe'],
        shell: true,
        env: { FORCE_COLOR: 'true' }
    })
    let taskRecord = taskMap.get(task.id)
    if (!taskRecord) {
        taskRecord = {
            task,
            child,
            isRunning: true,
            log: []
        }
    } else {
        taskRecord.child = child
        taskRecord.isRunning = true
    }
    taskMap.set(task.id, taskRecord)
    child.then(value => {
        console.log('then', task.id, value.exitCode, value.killed, value.isCanceled, value.failed)
    }).catch((error) => {
        console.log('catch', task.id)
        taskRecord.isRunning = false
        putLog(task.id, 'taskStatus', taskRecord.isRunning)
        putLog(task.id, 'error', error.message)
    })
    putLog(task.id, 'taskStatus', taskRecord.isRunning)
    child.on('exit', (code) => {
        console.log('exit', task.id)
        taskRecord.isRunning = false
        putLog(task.id, 'taskStatus', taskRecord.isRunning)
        putLog(task.id, 'exit', code)
    })
    child.on('close', (code) => {
        console.log('close', task.id)
        taskRecord.isRunning = false
        putLog(task.id, 'taskStatus', taskRecord.isRunning)
        putLog(task.id, 'close', code)
    })
    child.on('disconnect', () => {
        console.log('disconnect', task.id)
        taskRecord.isRunning = false
        putLog(task.id, 'taskStatus', taskRecord.isRunning)
        putLog(task.id, 'disconnect')
    })
    child.on('error', (error) => {
        console.log('error', task.id)
        taskRecord.isRunning = false
        putLog(task.id, 'taskStatus', taskRecord.isRunning)
        putLog(task.id, 'error', error.message)
    })
    child.on('message', (message) => {
        console.log(message)
    })
    child.stdout.on('data', buffer => {
        putLog(task.id, 'stdout', buffer.toString('utf8'))
    })
    child.stderr.on('data', buffer => {
        putLog(task.id, 'stderr', buffer.toString('utf8'))
    })
}

function on (taskId: string, event: string, func: Function) {
    const funcData = {
        id: listenerId++,
        func
    }
    if (!listenerMap.has(taskId)) {
        listenerMap.set(taskId, new Map())
    }
    const listener = listenerMap.get(taskId)
    if (!listener.has(event)) {
        listener.set(event, [])
    }
    listener.get(event).push(funcData)
    return function off () {
        const index = listener.get(event).findIndex(item => item.id === funcData.id)
        if (index > -1) {
            listener.get(event).splice(index, 1)
        }
    }
}

function load (taskId: string) {
    return taskMap.get(taskId)
}

async function cancel (taskId: string) {
    return new Promise(resolve => {
        console.log('取消任务', taskId)
        const taskRecord = load(taskId)
        if (!taskRecord || !taskRecord.isRunning) {
            putLog(taskId, 'taskStatus', false)
            putLog(taskId, 'close', 0)
            resolve(true)
            return
        }
        taskRecord.child.on('close', (code) => {
            resolve(true)
        })
        taskRecord.child.cancel()
    })
}

export const Terminal = {
    run,
    on,
    load,
    cancel
}
