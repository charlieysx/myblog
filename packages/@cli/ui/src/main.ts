import { ComponentPublicInstance, createApp } from 'vue'
import './use'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons'

const app = createApp(App)
app.config.errorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
    console.error('app-catch-error', err, instance, info)
}
app.use(ElementPlus, { size: 'mini' })
for (let key in ElIcons) {
    app.component(`ElIcon${key}`, ElIcons[key])
}
app.use(router).mount('#app')
