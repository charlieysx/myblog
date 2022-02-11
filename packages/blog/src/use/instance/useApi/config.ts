let host = 'https://t01.platform.backend.via.cool'

const { API_HOST } = CC.useEnvConfig()

if (API_HOST) {
    host = API_HOST as string
}

const defaultHeaders = {
    'Content-Type': 'application/json'
}

// 超时时间
const timeout = 30000

export default {
    host,
    defaultHeaders,
    timeout
}
