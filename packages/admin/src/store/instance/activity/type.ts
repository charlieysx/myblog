export namespace ActivityStore {
    export interface State {
        activityList: {
            loading: boolean
            list: Activity[]
            total: number
            pageOrder: number
            pageNum: number
        }
    }

    export const urlKey = {
        aggregation: '聚合页',
        NineBlock: '九宫格',
        eggMachine: '扭蛋机',
        wheel: '大转盘',
        secondKill: '秒杀',
        guaGuaLe: '刮刮乐',
        testQA: '测试答题'
    }

    export const status = {
        edit: '未发布',
        publish: '已发布'
    }

    export const statusColor = {
        edit: '',
        publish: 'green'
    }

    export interface Activity {
        adminUserName: string
        endTime: string
        id: number
        name: string
        publishVersion: number
        startTime: string
        status: keyof typeof status
        updateAt: string
        url: string
        urlKey: keyof typeof urlKey
    }
}
