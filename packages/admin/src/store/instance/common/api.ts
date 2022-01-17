const { authPost } = VV.useApi()

const login = async (name: string, password: string) => {
    return await authPost<{ jwt: string }>('/api/backweb/auth/login', { data: { name, password } })
}

export { login }
