import { UseEnvConfig } from './type'

const envConfig: UseEnvConfig.EnvConfig = {} as UseEnvConfig.EnvConfig
const suffix = 'VUE_APP_'
const config = process.env

const keys = Object.keys(config)
for (let i = 0; i < keys.length; ++i) {
    let key = keys[i]
    if (key.startsWith(suffix)) {
        key = key.substring(suffix.length)
    }
    envConfig[key] = config[keys[i]]
}
envConfig.isProd = envConfig.NODE_ENV === 'production'

function useEnvConfig() {
    return envConfig
}

;(window as any).useEnvConfig = useEnvConfig
