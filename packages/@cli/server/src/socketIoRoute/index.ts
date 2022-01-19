import { SocketIo } from 'src/socket'

export class CreateRouter {
    private cacheRouters: Array<{path: string, fn: (router: SocketIo.Namespace)=> void}> = []

    create (path: string, fn: (router: SocketIo.Namespace)=> void) {
        this.cacheRouters.push({
            path,
            fn
        })
        return this
    }

    routers () {
        return this.cacheRouters
    }
}

class SocketIoRoute {
    private io: SocketIo.Server

    private routers: {} = {}

    constructor (io: SocketIo.Server) {
        this.io = io
    }

    public use (path: string, fn: (router: SocketIo.Namespace)=> void) {
        if (this.routers[path]) {
            return
        }
        this.routers[path] = true
        const router = this.io.of(path)
        fn(router)
    }

    public useRoutes (routes: Array<{path: string, fn: (router: SocketIo.Namespace)=> void}>) {
        routes.forEach(({ path, fn }) => {
            if (this.routers[path]) {
                return
            }
            this.routers[path] = true
            const router = this.io.of(path)
            fn(router)
        })
    }
}

export {
    SocketIoRoute
}
