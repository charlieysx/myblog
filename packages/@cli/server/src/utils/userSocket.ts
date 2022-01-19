import { SocketIo } from '../socket'

let router: SocketIo.Namespace = null

const userSocketMap = new Map<string, {
    router: SocketIo.Namespace,
    socket: SocketIo.Socket
}>()

const userRoomMap = new Map<string, Set<string>>()

function set (userId: string, router: SocketIo.Namespace, socket: SocketIo.Socket) {
    userSocketMap.set(userId, { router, socket })
}

function get (userId: string) {
    return userSocketMap.get(userId)
}

function setRouter (_router: SocketIo.Namespace) {
    router = _router
}

function getRouter () {
    return router
}

function isInRoom (userId: string, roomId: string) {
    return userRoomMap.get(userId)?.has(roomId)
}

function joinRoom (userId: string, roomId: string) {
    let roomSet = userRoomMap.get(userId)
    if (!roomSet) {
        roomSet = new Set()
        userRoomMap.set(userId, roomSet)
    }
    roomSet.add(roomId)
    get(userId)?.socket.join(roomId)
    console.log(userId, '加入房间', roomId)
}

function leaveRoom (userId: string, roomId: string) {
    userRoomMap.get(userId)?.delete(roomId)
    get(userId)?.socket.leave(roomId)
    console.log(userId, '离开房间', roomId)
}

function leave (userId: string) {
    console.log(userId, '离开所有房间')
    userRoomMap.get(userId)?.forEach(value => {
        leaveRoom(userId, value)
    })
}

function sendToRoom (id: string, event: string, data: any) {
    router.to(id).emit('info', { event, data })
}

function sendToUser (userId: string, event: string, data: any) {
    get(userId)?.socket.emit('info', { event, data })
}

export const UserSocket = {
    set,
    get,
    setRouter,
    getRouter,
    sendToRoom,
    sendToUser,
    joinRoom,
    leaveRoom,
    isInRoom,
    leave
}
