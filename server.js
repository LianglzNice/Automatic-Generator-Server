const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'abc'
})

app.listen(8020);