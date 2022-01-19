import { UseDialog } from './type'
import { state, rawState } from './state'
import { ComponentInternalInstance, reactive } from 'vue'

export class Dialog<T extends Record<string, any>> {
    // 数据被监听，渲染用
    private state: UseDialog.DialogData = reactive({
        uuid: '',
        name: '',
        componentName: '',
        props: {} as T,
        opts: {
            maskClose: true,
            animName: 'bounce',
            maskAnimName: 'fade',
            maskBgColor: 'rgba(0, 0, 0, 0.8)'
        },
        isLocal: false,
        isShowing: false
    })
    // 如果是局部组件，这个是获取到的局部组件的配置，不需要放进监听，需要的时候再注册即可
    // 具体注册方式看MiddleComponent.vue
    public componentOptions: any = null
    // 当前弹窗实例，具体获取方式看DialogApp.vue
    public instance: any = null
    // 局部弹窗的话，会有一个父节点，就是这个
    public parent: ComponentInternalInstance = null
    // 创建弹窗，可以传默认配置
    public cacheOpts: UseDialog.DialogOpt = {}
    // 注册弹窗可以设置默认配置
    public componentRegisterOpts: UseDialog.DialogOpt = {}

    public beforeCloseFn = async () => false

    constructor(parent: ComponentInternalInstance, name: string, opts?: UseDialog.DialogOpt) {
        this.state.uuid = `Dialog-${new Date().getTime()}-${Math.floor(Math.random() * 1000000)}`
        this.state.name = name
        this.state.componentName = name
        Object.assign(this.cacheOpts, opts)
        this.parent = parent
        // 优先获取局部组件，不存在就获取全局组件
        // useDialogs是自定义在父组件上的一个对象，用于注册局部组件，类型为UseDialog.DialogRegisterType
        const localConfig = (this.parent?.type as any)?.useDialogs?.[this.state.name]
        if (localConfig) {
            this.state.isLocal = true
            if (localConfig.render) {
                // 属于组件（非配置）
                this.componentOptions = localConfig
                return
            }
            this.state.componentName = localConfig.componentName || this.state.name
            this.componentRegisterOpts = localConfig.opts || {}
            Object.assign(this.state.opts, this.componentRegisterOpts, this.cacheOpts, opts)
            this.componentOptions = localConfig.component
        } else {
            const globalConfig = rawState.dialogMapper.get(this.state.name)
            this.state.componentName = globalConfig?.componentName || this.state.name
            this.componentRegisterOpts = globalConfig?.opts || {}
            Object.assign(this.state.opts, this.componentRegisterOpts, this.cacheOpts, opts)
        }
    }

    public async show(props?: T, opts?: UseDialog.DialogOpt) {
        Object.assign(this.state.props, props)
        Object.assign(this.state.opts, this.componentRegisterOpts, this.cacheOpts, opts)
        if (this.state.isShowing) {
            return
        }
        rawState.dialogMap.set(this.state.uuid, this)
        this.state.isShowing = true
        state.showList.push(this.state)
        return new Promise((resolve) => {
            setTimeout(resolve, 500)
        })
    }

    public async close() {
        const stop = await this.beforeCloseFn()
        if (stop) {
            return
        }
        this.state.isShowing = false
        return new Promise((resolve) => {
            setTimeout(() => {
                const index = state.showList.findIndex((item) => item.uuid === this.state.uuid)
                index >= 0 && state.showList.splice(index, 1)
                rawState.dialogMap.delete(this.state.uuid)
                setTimeout(resolve, 500)
            }, 0)
        })
    }

    public beforeClose(cb: () => Promise<boolean>) {
        this.beforeCloseFn = cb
    }
}
