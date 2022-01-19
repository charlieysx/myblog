import { ParameterizedContext } from 'koa'
import Router from 'koa-router'
import { CustomError } from '../utils/statusCode'

export default async function auth (ctx: ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>, next) {
    try {
        await next()
    } catch (e) {
        if (e instanceof CustomError) {
            const json = e.toJson()
            if (json.code < 10000) {
                ctx.status = json.code
                ctx.body = json
                return
            }
            ctx.body = {
                code: e.code,
                data: e.data
            }
            return
        }
        ctx.status = 400
        ctx.body = {
            code: 400,
            data: e.message || e
        }
    }
}
