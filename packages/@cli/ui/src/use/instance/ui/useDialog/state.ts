import { reactive } from 'vue'
import { Dialog } from './dialog'
import { UseDialog } from './type'

// 原始数据，不会监听
export const rawState: {
    refs: Map<string, any>
    dialogMapper: Map<string, UseDialog.DialogRegisterType>
    dialogMap: Map<string, Dialog<any>>
} = {
    refs: new Map(),
    dialogMapper: new Map(),
    dialogMap: new Map()
}

export const state = reactive<{
    showList: UseDialog.DialogData[]
}>({
    showList: []
})
