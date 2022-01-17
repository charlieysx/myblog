import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import tsconfig from './tsconfig.json'
import mri from 'mri'
import { setEnvConfig } from './config'

const argv = mri(process.argv)
const mode = argv.mode
console.log('当前运行环境：', mode)
const envConfig = setEnvConfig(mode)
console.log(envConfig)

// 将 tsconfig.json 中的 paths，转换为 webpack 能解析的别名
const getAlias = () => {
    const obj = {}
    const paths = tsconfig.compilerOptions.paths
    if (paths.toString() !== '[object Object]') {
        return obj
    }
    Object.entries(paths).forEach(([key, val]) => {
        key = key.replace('/*', '')
        obj[key] = resolve(val[0].replace('/*', ''))
    })
    return obj
}

// https://vitejs.dev/config/
export default defineConfig({
    base: envConfig.BASE,
    plugins: [vue()],
    resolve: {
        alias: getAlias()
    },
    build: {
        outDir: `dist/${mode}/`
    },
    server: {
        port: 30035,
        host: '0.0.0.0'
    }
})
