import { SocketIo } from '../socket'
import { UserSocket } from '../utils/userSocket'

export default function (router: SocketIo.Namespace) {
    UserSocket.setRouter(router)
    router.on('connection', (socket: SocketIo.Socket) => {
        const userId: string = socket.handshake.query.userId as string
        UserSocket.set(userId, router, socket)
        console.log(userId, '连接')
        socket.on('disconnect', () => {
            UserSocket.leave(userId)
        })
    })
}
