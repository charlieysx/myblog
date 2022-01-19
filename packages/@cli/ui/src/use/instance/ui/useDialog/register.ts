import { App } from 'vue'
import { UseDialog } from './type'
import Confirm from './ui/Confirm.vue'

// 注册全局组件，配置默认配置，如果不需要默认配置，直接全局注册即可
const list: Array<UseDialog.DialogRegisterType> = [
    {
        name: 'Confirm',
        componentName: 'Confirm',
        opts: {
            maskClose: true,
            animName: 'fade-down',
            maskBgColor: 'rgba(0, 0, 0, 0.7)'
        }
    }
]

export default list

export function install(app: App<Element>) {
    app.component('Confirm', Confirm)
}
