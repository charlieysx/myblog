const envConfig = {
    dev: {
        API_HOST: 'http://blogapi.codebear.cn/index.php',
        BASE: '/'
    },
    production: {
        API_HOST: 'http://blogapi.codebear.cn/index.php',
        BASE: './'
    }
}

function setEnvConfig(env) {
    if (!envConfig[env]) {
        throw '当前运行环境不存在'
    }
    const config = { ...envConfig[env] }
    const keys = Object.keys(config)
    for (let i = 0; i < keys.length; ++i) {
        let key = 'VITE_APP_' + keys[i]
        process.env[key] = config[keys[i]]
    }
    return config
}

export { envConfig, setEnvConfig }
