const envConfig = {
    dev: {
        API_HOST: 'https://t01.platform.backend.via.cool',
        BASE: '/',
        WORKBENCH_URL: 'https://cdn.via.cool/platform/t01/workbench/index.html'
    },
    production: {
        API_HOST: 'https://platform.backend.via.cool',
        BASE: './',
        WORKBENCH_URL: 'https://cdn.via.cool/platform/t01/workbench/index.html'
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
