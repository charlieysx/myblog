export namespace UseEnvConfig {
    export type NODE_ENV_TYPE = 'production' | 'development'
    export type EnvConfig = Record<string, string> & {
        isProd: boolean
        NODE_ENV: NODE_ENV_TYPE
        BASE_URL: string
        CDN_URL: string
        REAL_ENV: 'prod' | 'stage' | 'test' | 'bx'
    }
}
