import { CreateRouter } from '../socketIoRoute'
import status from './status'
import task from './task'

const createRouter = new CreateRouter()
createRouter
    .create('status', status)
    .create('task', task)

export default createRouter
