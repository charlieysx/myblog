import { UseEnvConfig } from './instance/useEnvConfig/type'
import { UseDayjs } from './instance/useDayjs/type'
import { UseStore } from './instance/useStore/type'
import { UseStorageReturnValue } from './instance/useStorage'
import { UseApiReturnValue } from './instance/useApi'
import { UseWindowReturnValue } from './instance/useWindow'
import { UseUtilsReturnValue } from './instance/useUtils'
import { UseEventBusReturnValue } from './instance/useEventBus'
import { UseEventListenerReturnValue } from './instance/useEventListener'
import { UsePageVisibilityReturnValue } from './instance/usePageVisibility'
import { UseLoadUrlReturnValue } from './instance/useLoadUrl'
import { UseRouterReturnValue } from './instance/useRouter'
import { UseDialog } from './instance/ui/useDialog/type'
import { UseDeviceReturnValue } from './instance/useDevice'

interface UseFunc {
    install(key: string, useFunc: Function): any
    useEnvConfig(): UseEnvConfig.EnvConfig
    useDayjs(): UseDayjs.ReturnValue
    useStore: UseStore.UseStore
    useAllStore: UseStore.UseAllStore
    useStorage(): UseStorageReturnValue
    useApi(): UseApiReturnValue
    useWindow(): UseWindowReturnValue
    useUtils(): UseUtilsReturnValue
    useEventBus(): UseEventBusReturnValue
    useEventListener: UseEventListenerReturnValue
    usePageVisibility(): UsePageVisibilityReturnValue
    useDevice(): UseDeviceReturnValue
    useLoadUrl(): UseLoadUrlReturnValue
    useDialog: UseDialog.useDialogType
    useRouter(): UseRouterReturnValue
}

declare global {
    const CC: UseFunc
}
