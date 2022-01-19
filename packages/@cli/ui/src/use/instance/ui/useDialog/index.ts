import { createApp, getCurrentInstance } from 'vue'
import DialogApp from './DialogApp.vue'
import { UseDialog } from './type'
import { state, rawState } from './state'
import registerList, { install } from './register'
import router from '@/router'
import ElementPlus from 'element-plus'
import { Dialog } from './dialog'

const app = createApp(DialogApp)
app.use(ElementPlus, { size: 'mini' })
app.use(router).mount('#app-dialog')
install(app)

/**
 * 注册弹窗，显示弹窗之前，先要有注册，否则会读取不到弹窗配置
 * @param dialog
 */
function registerDialog(dialog: UseDialog.DialogRegisterType) {
    rawState.dialogMapper.set(dialog.name, dialog)
}

registerList.forEach(registerDialog)

export function useDialog() {
    // 先从当前组件获取，看是否有注册局部弹窗，没有再获取全局的
    const parent = getCurrentInstance()

    return {
        state,
        rawState,
        get: (name: string, opts?: UseDialog.DialogOpt) => new Dialog(parent, name, opts),
        getInstance: (uuid: string) => rawState.dialogMap.get(uuid)
    }
}

;(window as any).useDialog = useDialog
