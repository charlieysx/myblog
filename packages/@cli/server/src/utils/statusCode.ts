export class CustomError {
    private _code: number = 400
    private _data: any = {}

    public code (code: number) {
        this._code = code
        return this
    }

    public data (data: any) {
        this._data = data
        return this
    }

    public toJson () {
        return {
            code: this._code,
            data: this._data
        }
    }
}

export const Error = {
    common: (code: number, data: any) => new CustomError().code(code).data(data),
    noAuth: () => new CustomError().code(401).data('未登录'),
    params: () => new CustomError().code(400).data('参数错误')
}

export const Success = {
    data: (ctx, data: any) => {
        ctx.body = { code: 0, data }
    }
}
