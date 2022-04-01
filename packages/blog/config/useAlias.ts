import { resolve } from 'path'
import tsconfig from '../tsconfig.json'

// 将 tsconfig.json 中的 paths，转换为 webpack 能解析的别名
export function useAlias() {
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
