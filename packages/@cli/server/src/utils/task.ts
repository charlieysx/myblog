import { TerminalTask } from './type.d'
import { Terminal } from '../utils/terminal'
import { UserSocket } from './userSocket'

const listenerList = new Map<string, Function[]>()

function clearTerminalEvent (id: string) {
    const list = listenerList.get(id)
    if (!list) {
        return
    }
    while (list.length > 0) {
        list.pop()()
    }
}

function addTerminalEvent (id: string, event: string, func: Function) {
    let list = listenerList.get(id)
    if (!list) {
        list = []
        listenerList.set(id, list)
    }
    list.push(Terminal.on(id, event, func))
}

function run (task: TerminalTask) {
    const taskRecord = Terminal.load(task.id)
    if (!taskRecord || !taskRecord.isRunning) {
        initEvent(task.id)
        Terminal.run({
            id: task.id,
            command: task.command,
            args: task.args,
            cwd: task.cwd
        })
    }
}

function load (id: string) {
    return Terminal.load(id)
}

async function stop (id: string) {
    return Terminal.cancel(id)
}

function initEvent(taskId: string) {
    addTerminalEvent(taskId, 'taskStatus', (res) => {
        UserSocket.sendToRoom(taskId, 'taskStatus', {
            id: taskId,
            data: res
        })
    })
    addTerminalEvent(taskId, 'close', (res) => {
        UserSocket.sendToRoom(taskId, 'close', {
            id: taskId,
            data: res
        })
        clearTerminalEvent(taskId)
    })
    addTerminalEvent(taskId, 'stdout', (res) => {
        UserSocket.sendToRoom(taskId, 'stdout', {
            id: taskId,
            data: res
        })
    })
    addTerminalEvent(taskId, 'stderr', (res) => {
        UserSocket.sendToRoom(taskId, 'stderr', {
            id: taskId,
            data: res
        })
    })
}

export const Task = {
    run,
    load,
    stop,
    clearTerminalEvent,
    addTerminalEvent
}
