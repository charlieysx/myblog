export namespace TaskStore {
    export type Task = {
        id: string
        command: string
        args?: string[]
        cwd?: string
        // 前端用
        isRunning: boolean
        title: string
    }
    export interface State {
        serveTaskList: Task[]
        buildTaskList: Task[]
    }
}
