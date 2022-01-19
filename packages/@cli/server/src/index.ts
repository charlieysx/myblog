import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from 'koa2-cors'
import * as koaStatic from 'koa-static'
import * as path from 'path'
import * as http from 'http'
import { SocketIoRoute } from './socketIoRoute'
import { historyApiFallback } from 'koa2-connect-history-api-fallback'
import { SocketIo } from './socket'
import socketRouters from './socketRouters'
import httpRouters from './httpRouters'

const app = new Koa()
app.use(historyApiFallback({ whiteList: ['/api'] }))
    .use(koaStatic(path.resolve(__dirname, '../public')))
    .use(cors())
    .use(bodyParser())

const server = http.createServer(app.callback())
const io = new SocketIo.Server(server, { cors: { origin: '*' } })
const socketIoRoute = new SocketIoRoute(io)
socketIoRoute.useRoutes(socketRouters.routers())

app.use(httpRouters.routes())
app.use(httpRouters.allowedMethods())

server.listen(62333, () => {
    console.log('starting at port 62333')
})
