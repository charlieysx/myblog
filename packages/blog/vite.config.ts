import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { useAlias } from './config/useAlias'
import { useEnvConfig } from './config/useEnvConfig'

const envConfig = useEnvConfig()

// https://vitejs.dev/config/
export default defineConfig({
    base: envConfig.BASE,
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: `@import "${resolve(__dirname, 'src/styles/less/mixin.less')}";`
            }
        }
    },
    resolve: {
        alias: useAlias()
    },
    build: {
        outDir: `dist/${envConfig.RUN_ENV}/`
    },
    server: {
        port: 30035,
        host: '0.0.0.0'
    }
})
