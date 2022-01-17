export namespace UseEnvConfig {
    export type NODE_ENV_TYPE = 'production' | 'development'
    export type EnvConfig = Record<string, string | boolean | undefined> & {
        isProd: boolean
        NODE_ENV: NODE_ENV_TYPE
        BASE: string
        BASE_URL: string
        API_HOST: string
        WORKBENCH_URL: string
    }
}
