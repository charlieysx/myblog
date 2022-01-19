import { TaskStore } from './instance/task'
import { UserStore } from './instance/user'

export interface Store {
    user: UserStore
    task: TaskStore
}
