import { useDialog } from './index'
export declare namespace UseDialog {
    export type useDialogType = typeof useDialog
    export type DialogOpt = Partial<{
        maskClose: boolean // 是否可以点击背景触发关闭弹窗
        animName: string // 弹窗内容显示动画
        maskAnimName: string // 弹窗背景蒙版显示动画（黑色遮罩）
        maskBgColor: string // 弹窗蒙版背景色
    }>

    export type DialogData = {
        uuid: string
        name: string
        componentName: string
        props: Record<string, any>
        opts: DialogOpt
        isLocal: boolean // 是否局部弹窗
        isShowing: boolean
    }

    export type DialogRegisterType = Record<string, any> & {
        name: string
        componentName?: string
        opts: DialogOpt
    }
}
