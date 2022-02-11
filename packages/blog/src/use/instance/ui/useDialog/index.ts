import { createApp, getCurrentInstance } from 'vue'
import DialogApp from './DialogApp.vue'
import { UseDialog } from './type'
import { state, rawState } from './state'
import registerList, { install } from './register'
import { Dialog } from './dialog'

const app = createApp(DialogApp)
app.mount('#app-dialog')
install(app)

/**
 * 注册弹窗，显示弹窗之前，先要有注册，否则会读取不到弹窗配置
 * @param dialog
 */
function registerDialog(dialog: UseDialog.DialogRegisterType) {
    rawState.dialogMapper.set(dialog.dialogName || dialog.name, dialog)
}

registerList.forEach(registerDialog)

export function useDialog() {
    // 先从当前组件获取，看是否有注册局部弹窗，没有再获取全局的
    const parent = getCurrentInstance()

    return {
        registerDialog,
        app,
        state,
        rawState,
        get: (name: string, opts?: UseDialog.DialogOpt) => new Dialog(false, parent, name, opts),
        getSingle: (name: string, opts?: UseDialog.DialogOpt) => {
            const singleDialog = rawState.singleDialogMap.get(name)
            return singleDialog || new Dialog(true, parent, name, opts)
        },
        getInstance: (uuid: string) => rawState.dialogMap.get(uuid),
        closeAll: () => {
            while (state.showList.length) {
                const item = state.showList.pop() as UseDialog.DialogData
                rawState.dialogMap.get(item.uuid)?.close()
                rawState.singleDialogMap.get(item.name)?.close()
            }
        }
    }
}

CC.install('useDialog', useDialog)
