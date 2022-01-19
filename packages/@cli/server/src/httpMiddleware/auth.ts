export default async function auth (ctx, next) {
    const userId = ctx.header.userid
    if (!userId) {
        ctx.status = 401
        ctx.body = {
            code: -1,
            msg: '没有userId'
        }
        return
    }
    ctx.userId = userId
    await next()
}
