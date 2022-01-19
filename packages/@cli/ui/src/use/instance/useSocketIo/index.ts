import { io, Socket } from 'socket.io-client'

export type SocketMessage = {
    event: string
    data?: any
}

type SocketType = {
    instance: Socket
    listener: Map<string, Array<{ id: number; func: Function }>>
}

let listenerId = 0
const sockets: Map<string, SocketType> = new Map()

function connSocket(path: string) {
    const user = useStore('user')
    const instance = io(`ws://127.0.0.1:62333/${path}?userId=${user.state.id}`)
    const socket: SocketType = {
        instance,
        listener: new Map<string, Array<{ id: number; func: Function }>>()
    }
    sockets.set(path, socket)
    instance.on('connect', () => {
        const funcList = socket.listener.get('socketConnect')
        funcList?.forEach((item) => item.func())
    })
    instance.on('disconnect', () => {
        const funcList = socket.listener.get('socketDisconnect')
        funcList?.forEach((item) => item.func())
    })
    instance.on('info', (data: SocketMessage) => {
        const funcList = socket.listener.get(data.event)
        funcList?.forEach((item) => item.func(data.data))
    })
    return socket
}

function useSocketIo(path: string) {
    let socket = sockets.get(path)
    if (!socket) {
        socket = connSocket(path)
    }
    return {
        emit: (event: string, data: any) => {
            socket.instance.emit(event, data)
        },
        on: (events: string | string[], func: (data: any) => any) => {
            const funcData = {
                id: listenerId++,
                func
            }
            function setEvent(event: string) {
                if (!socket.listener.has(event)) {
                    socket.listener.set(event, [])
                }
                socket.listener.get(event).push(funcData)
            }
            if (!Array.isArray(events)) {
                events = [events]
            }
            events.forEach(setEvent)
            return () => {
                ;(events as string[]).forEach((event) => {
                    const index = socket.listener.get(event).findIndex((fn) => fn.id === funcData.id)
                    if (index > -1) {
                        socket.listener.get(event).splice(index, 1)
                    }
                })
            }
        }
    }
}

export type UseSocketIoReturnValue = typeof useSocketIo
;(window as any).useSocketIo = useSocketIo
