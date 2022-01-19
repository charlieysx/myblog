import { SocketIo } from '../socket'

const sockets = []

function onDisConnect (socket: SocketIo.Socket) {
    const index = sockets.findIndex(s => s.id === socket.id)
    sockets.splice(index, 1)
}

function onConnection (socket: SocketIo.Socket) {
    sockets.push(socket)
    socket.on('disconnect', () => {
        onDisConnect(socket)
    })
    socket.emit('info', { event: 'connect' })
}

export default function (router: SocketIo.Namespace) {
    router.on('connection', onConnection)
}
