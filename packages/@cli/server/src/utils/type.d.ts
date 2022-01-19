import * as execa from 'execa'

export type TerminalTask = {
    id: string
    command: string
    args?: string[]
    cwd?: string
}

export type TerminalTaskRecord = {
    task: TerminalTask
    child: execa.ExecaChildProcess<string>
    log: Array<{event: string, data: any}>
    isRunning: boolean
    saveParams?: any
}
