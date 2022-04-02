const envConfig: Record<string, Record<string, string>> = {
    dev: {
        API_HOST: 'http://blogapi.codebear.cn/index.php',
        BASE: '/'
    },
    production: {
        API_HOST: 'http://blogapi.codebear.cn/index.php',
        BASE: '//oss.codebear.cn/blog/'
    },
    local: {
        API_HOST: 'http://blogapi.codebear.cn/index.php',
        BASE: '/'
    }
}

const env = process.env.runEnv
console.log('当前运行环境：', env)

export function useEnvConfig() {
    if (!envConfig[env]) {
        throw '当前运行环境不存在'
    }
    const config = { ...envConfig[env] }
    config.RUN_ENV = env
    const keys = Object.keys(config)
    for (let i = 0; i < keys.length; ++i) {
        let key = `VITE_APP_${keys[i]}`
        process.env[key] = config[keys[i]]
    }
    console.log('当前环境变量：', config)
    return config
}
