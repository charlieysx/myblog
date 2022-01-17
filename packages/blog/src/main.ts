import './use'
import store from './use/instance/useStore'
import { createApp, ComponentPublicInstance } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import '@arco-design/web-vue/dist/arco.css'
import '/@styles/iconfont.css'
import '/@styles/less/g-global.less'

const app = createApp(App)
app.config.errorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
    console.error('app-catch-error', err, instance, info)
}

const { router } = VV.useRouter()
store.install(app)
const dialogApp = VV.useDialog().app
Object.assign(app._context.components, dialogApp._context.components)
dialogApp._context.components = app._context.components
dialogApp._context.config.globalProperties = app._context.config.globalProperties
app.use(router).use(ArcoVue).use(ArcoVueIcon).mount('#app')
