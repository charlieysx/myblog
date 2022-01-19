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
import { UseSocketIoReturnValue } from './instance/useSocketIo'
import { UseDialog } from './instance/ui/useDialog/type'

declare global {
    function useEnvConfig(): UseEnvConfig.EnvConfig
    function useDayjs(): UseDayjs.ReturnValue
    const useStore: UseStore.UseStore
    const useAllStore: UseStore.UseAllStore
    function useStorage(): UseStorageReturnValue
    function useApi(): UseApiReturnValue
    function useWindow(): UseWindowReturnValue
    function useUtils(): UseUtilsReturnValue
    function useEventBus(): UseEventBusReturnValue
    const useEventListener: UseEventListenerReturnValue
    function usePageVisibility(): UsePageVisibilityReturnValue
    function useLoadUrl(): UseLoadUrlReturnValue
    const useSocketIo: UseSocketIoReturnValue
    const useDialog: UseDialog.useDialogType
}
