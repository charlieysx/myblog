import './use'
import store from './use/instance/useStore'
import { createApp, ComponentPublicInstance } from 'vue'
import App from './App.vue'
import '/@styles/iconfont.css'
import '/@styles/less/global.less'
import '/@styles/less/theme.less'
import '/@styles/less/theme.dark.less'

const app = createApp(App)
app.config.errorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
    console.error('app-catch-error', err, instance, info)
}

const { initTheme } = CC.useStore('common')
initTheme()

const { router } = CC.useRouter()
store.install(app)
const dialogApp = CC.useDialog().app
Object.assign(app._context.components, dialogApp._context.components)
dialogApp._context.components = app._context.components
dialogApp._context.config.globalProperties = app._context.config.globalProperties
app.use(router).mount('#app')
