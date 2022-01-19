const path = require('path')
const fs = require('fs')
const tsconfig = require('./tsconfig.json')

const resolve = (p) => path.resolve(p)

const isDev = process.env.NODE_ENV === 'development'

const getMode = () => {
    return isDev ? 'development' : 'production'
}

// 将 tsconfig.json 中的 paths，转换为 webpack 能解析的别名
const getAlias = () => {
    const obj = {}
    const paths = tsconfig.compilerOptions.paths
    if (paths.toString() !== '[object Object]') {
        return obj
    }
    Object.entries(paths).forEach(([key, val]) => {
        key = key.replace('/*', '')
        val = val[0].replace('/*', '')
        obj[key] = resolve(val)
    })
    return obj
}

const getOutputDir = () => {
    return path.resolve(__dirname, '../server/public')
}

const getPublicPath = () => {
    return isDev ? '/' : './'
}

const getDevPlugins = () => {
    return []
}

const getProdPlugins = () => {
    return []
}

const getEntry = () => {
    let entry = [resolve('src/main.ts')]
    if (isDev) {
        entry.unshift(resolve('src/mock.ts'))
    }
    return entry
}

const getPlugins = () => {
    if (getMode() === 'production') {
        return getProdPlugins()
    }
    return getDevPlugins()
}

module.exports = {
    publicPath: getPublicPath(),
    outputDir: getOutputDir(),
    configureWebpack: {
        mode: getMode(),
        entry: {
            app: getEntry()
        },
        plugins: getPlugins(),
        resolve: {
            alias: getAlias()
        }
    },
    parallel: require('os').cpus().length > 1,
    productionSourceMap: isDev,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。
        extract: !isDev,
        sourceMap: isDev,
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: false
    },
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            // 定义html文件中需要用到的一些数据
            Object.assign(args[0], {})
            return args
        })
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: ['./src/styles/less/*.less']
        }
    },
    devServer: {
        port: 20001
    }
}
