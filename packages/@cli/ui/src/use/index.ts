// 纯函数，可在最外层直接使用
import './instance/useEnvConfig'
import './instance/useWindow'
import './instance/useWindowReszie'
import './instance/useEventListener'
import './instance/useEventBus'
import './instance/useDayjs'
import './instance/useStorage'
import './instance/useUtils'
// 有引用其他use的
import './instance/useLoadUrl'
import './instance/usePageVisibility'
import './instance/useApi'
import './instance/useStore'
import './instance/useSocketIo'
// 以下是有引用use的，需要在函数中使用

import './instance/ui/useDialog'
