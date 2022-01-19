import { nextTick } from 'vue'
import { createState } from '../../base/index'
import { TaskStore } from './type'
import * as apis from './apis'

const state = createState<TaskStore.State>({
    serveTaskList: [
        {
            id: 'serve',
            command: 'yarn',
            args: ['workspace', 'blog', 'serve'],
            title: 'blog',
            isRunning: false
        }
    ],
    buildTaskList: [
        {
            id: 'build',
            command: 'yarn',
            // args: ['workspace', 'landing-page', 'build', '--runEnv', 'jtp-dev', '--color'],
            title: 'build landing-page',
            isRunning: false
        }
    ]
})

nextTick(async () => {
    const socket = useSocketIo('task')
    const taskList = [...state.serveTaskList, ...state.buildTaskList]
    socket.on('socketConnect', () => {
        const taskIds = taskList.map((task) => task.id)
        apis.joinTaskRoom(taskIds)
    })
    socket.on('taskStatus', (res) => {
        const task = taskList.find((item) => item.id === res.id)
        if (task) {
            task.isRunning = res.data
        }
    })
})

export default state
