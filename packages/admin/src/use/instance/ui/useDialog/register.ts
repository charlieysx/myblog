import { App } from 'vue'
import { UseDialog } from './type'

// 注册全局组件，配置默认配置，如果不需要默认配置，直接全局注册即可
const list: Array<UseDialog.DialogRegisterType> = []

export default list

export function install(app: App<Element>) {}
