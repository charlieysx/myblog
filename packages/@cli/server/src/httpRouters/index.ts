import * as Router from 'koa-router'
import auth from '../httpMiddleware/auth'
import response from '../httpMiddleware/response'
import task from './task'

let router = new Router()
router.use('/api', response, auth, task.routes())

export default router
